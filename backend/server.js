import express from "express";
import { google } from "googleapis";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Paystack from "paystack-api";
import nodemailer from "nodemailer";

// Load environment variables
const envPath = path.resolve(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
    console.error(`❌ ERROR: .env file not found at ${envPath}`);
    process.exit(1);
}
dotenv.config({ path: envPath });

console.log("✅ Environment Variables Loaded");

// Validate required environment variables
const { SPREADSHEET_ID, PAYSTACK_SECRET_KEY, PORT = 5000, BASE_URL = "http://localhost:5000" } = process.env;

if (!SPREADSHEET_ID) {
    console.error("❌ ERROR: Missing SPREADSHEET_ID in .env");
    process.exit(1);
}
if (!PAYSTACK_SECRET_KEY) {
    console.error("❌ ERROR: Missing PAYSTACK_SECRET_KEY in .env");
    process.exit(1);
}

// Initialize Paystack with your secret key
const paystack = Paystack(PAYSTACK_SECRET_KEY);

// Resolve Google Credentials Path
const credentialsPath = path.resolve(process.cwd(), "google-credentials.json");
if (!fs.existsSync(credentialsPath)) {
    console.error(`❌ ERROR: google-credentials.json not found at ${credentialsPath}`);
    process.exit(1);
}

// Load Credentials with Error Handling
let credentials;
try {
    credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
    console.log("✅ Google Credentials Loaded");
} catch (error) {
    console.error("❌ ERROR: Failed to parse google-credentials.json", error.message);
    process.exit(1);
}

// Initialize Express App
const app = express();

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE,OPTIONS", 
    allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

// Authenticate with Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

/**
 * Fetch all products
 */
app.get("/api/products/", async (req, res) => {
    try {
        console.log("🔍 Fetching all products...");

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet1!A2:H", // Ensure your data starts from A2
        });

        if (!response.data.values || response.data.values.length === 0) {
            console.warn("⚠️ No products found in Google Sheets.");
            return res.json([]);
        }

        const products = response.data.values.map((row, index) => {
            const stock = isNaN(parseInt(row[6], 10)) ? 0 : parseInt(row[6], 10);

            return {
                id: row[0]?.toString() || `prod-${index}`,
                name: row[1] || "Unnamed Product",
                price: parseFloat(row[2]) || 0,
                category: row[3] || "Uncategorized",
                description: row[4] || "No description available",
                imageUrl: row[5] || "https://via.placeholder.com/150",
                stock: stock, // Ensuring valid stock
                rating: parseFloat(row[7]) || 0,
            };
        });

        console.log("📦 Processed Products:", products);
        res.json(products);
    } catch (error) {
        console.error("❌ ERROR: Failed to fetch all products:", error.message);
        res.status(500).json({ error: "Google Sheets API Error", message: error.message });
    }
});


 

app.get("/api/products/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet1!A2:H",
        });

        if (!response.data.values || response.data.values.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }

        const products = response.data.values.map((row, index) => {
            const stock = isNaN(parseInt(row[6], 10)) ? 0 : parseInt(row[6], 10);
            return {
                id: row[0]?.toString() || `prod-${index}`,
                name: row[1] || "Unnamed Product",
                price: parseFloat(row[2]) || 0,
                category: row[3] || "Uncategorized",
                description: row[4] || "No description available",
                imageUrl: row[5] || "https://via.placeholder.com/150",
                stock: stock,
                rating: parseFloat(row[7]) || 0,
            };
        });

        // Find the product by ID
        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({ error: `Product with ID ${productId} not found` });
        }

        res.json(product);
    } catch (error) {
        console.error("❌ ERROR: Failed to fetch product:", error.message);
        res.status(500).json({ error: "Google Sheets API Error", message: error.message });
    }
});

/**
 * Create payment link using Paystack
 */
app.post("/api/payment", async (req, res) => {
    const { email, amount, productId } = req.body;

    // Basic Validation
    if (!email || !amount || !productId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Fetch product data dynamically
        const productResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet1!A2:H",
        });

        const products = productResponse.data.values.map((row, index) => ({
            id: row[0]?.toString() || `prod-${index}`,
            name: row[1] || "Unnamed Product",
            price: parseFloat(row[2]) || 0,
        }));

        const product = products.find(p => p.id === productId);
        if (!product) {
            return res.status(404).json({ error: `Product with ID ${productId} not found` });
        }

        const reference = `pay_${Math.floor(Math.random() * 1000000000)}`;
        const paymentPayload = {
            email,
            amount: amount * 100,  // Amount in kobo (Paystack uses kobo, not naira)
            reference,
            currency: "NGN", // Change to your preferred currency
            callback_url: `${BASE_URL}/api/payment/verify`, // Dynamic Callback URL
            metadata: {
                product_id: productId,
                product_name: product.name,
            }
        };

        const paystackResponse = await paystack.transaction.initialize(paymentPayload);
        console.log("✅ Payment Initialized:", paystackResponse);

        res.json({
            status: 'success',
            message: 'Payment initialized successfully.',
            authorization_url: paystackResponse.data.authorization_url,
            reference: paystackResponse.data.reference
        });
    } catch (error) {
        console.error("❌ ERROR: Failed to initialize payment:", error.message);
        res.status(500).json({ error: "Paystack API Error", message: error.message });
    }
});

/**
 * Verify payment status
 */
app.get("/api/payment/verify", async (req, res) => {
    const { reference } = req.query;

    if (!reference) {
        return res.status(400).json({ error: "Missing reference" });
    }

    try {
        const verificationResponse = await paystack.transaction.verify(reference);
        console.log("✅ Payment Verification Response:", verificationResponse);

        if (verificationResponse.data.status === "success") {
            // Payment was successful
            res.json({ status: "success", message: "Payment successful", data: verificationResponse.data });
        } else {
            res.json({ status: "failure", message: "Payment failed", data: verificationResponse.data });
        }
    } catch (error) {
        console.error("❌ ERROR: Failed to verify payment:", error.message);
        res.status(500).json({ error: "Paystack Verification Error", message: error.message });
    }
});


 

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
