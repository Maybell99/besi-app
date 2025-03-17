import express from "express";
import { google } from "googleapis";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Paystack from "paystack-api";

// Load environment variables
const envPath = path.resolve(process.cwd(), "backend", ".env");
dotenv.config({ path: envPath });

// Configuration validation
const requiredEnvVars = ['SPREADSHEET_ID', 'PAYSTACK_SECRET_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error(`❌ Missing environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const {
  SPREADSHEET_ID,
  PAYSTACK_SECRET_KEY,
  PORT = 5000,
  BASE_URL = "http://localhost:5000"
} = process.env;

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(fs.readFileSync(
    path.resolve(process.cwd(), "backend", "google-credentials.json"), 
    "utf-8"
  )),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});
const sheets = google.sheets({ version: "v4", auth });

// Verify Google Sheets access on startup
async function verifyGoogleAccess() {
  try {
    const token = await auth.getAccessToken();
    console.log("✅ Google authentication successful");

    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
      fields: "sheets.properties.title"
    });

    const sheetNames = spreadsheet.data.sheets?.map(sheet => sheet.properties?.title);
    if (!sheetNames?.includes("Sheet1")) {
      throw new Error('Sheet "Sheet1" not found in spreadsheet');
    }

    console.log("✅ Spreadsheet access verified");
  } catch (error) {
    console.error("❌ Google Sheets verification failed:", error.message);
    process.exit(1);
  }
}

// Initialize Express
const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',  // Local development URL
    'https://my-app-besi-ventures.netlify.app'  // Production URL on Netlify
  ]
})); // Make sure to add all the domains you want to allow for cross-origin requests
app.use(express.json());


// Enhanced product data fetcher with better error handling and input validation
async function fetchProductData() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A2:H",
      valueRenderOption: "UNFORMATTED_VALUE",
      dateTimeRenderOption: "FORMATTED_STRING"
    });

    if (!response.data.values || response.data.values.length === 0) {
      throw new Error("No data found in spreadsheet");
    }

    return response.data.values
      .filter(row => row.length >= 6) // At least 6 columns of data
      .map((row, index) => ({
        id: (row[0] || `prod-${index + 2}`).toString().trim().toLowerCase(), // +2 for 1-based sheet index
        name: row[1]?.trim() || "Unnamed Product",
        price: Number(row[2]) || 0,
        category: row[3]?.trim() || "Uncategorized",
        description: row[4]?.trim() || "No description",
        imageUrl: row[5]?.trim() || "https://via.placeholder.com/150",
        stock: Math.max(0, parseInt(row[6], 10)) || 0,
        rating: Math.min(5, Math.max(0, Number(row[7]))) || 0
      }));
  } catch (error) {
    console.error("❌ Error fetching product data:", error.message);
    throw new Error("PRODUCT_FETCH_FAILED: " + error.message);
  }
}

// Products endpoints
app.get("/api/products", async (req, res) => {
  try {
    const products = await fetchProductData();
    console.log(`✅ Fetched ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error("❌ Product fetch error:", error.message);
    res.status(500).json({
      error: "PRODUCT_FETCH_FAILED",
      message: error.message,
      details: error.stack
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await fetchProductData();
    const product = products.find(p => p.id === req.params.id.toLowerCase());

    if (!product) {
      return res.status(404).json({
        error: "PRODUCT_NOT_FOUND",
        message: `Product with ID '${req.params.id}' not found`
      });
    }

    res.json(product);
  } catch (error) {
    console.error("❌ Product lookup error:", error.message);
    res.status(500).json({
      error: "PRODUCT_LOOKUP_FAILED",
      message: error.message
    });
  }
});

// Payment endpoints
const paystack = Paystack(PAYSTACK_SECRET_KEY);

app.post("/api/payment", async (req, res) => {
  try {
    const { email, amount, productId } = req.body;

    if (!email || !amount || !productId) {
      return res.status(400).json({
        error: "MISSING_FIELDS",
        message: "Email, amount, and productId are required"
      });
    }

    const response = await paystack.transaction.initialize({
      email,
      amount: Math.round(amount * 100),
      reference: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      currency: "NGN",
      callback_url: `${BASE_URL}/api/payment/verify`,
      metadata: { productId }
    });

    res.json({
      authorizationUrl: response.data.authorization_url,
      reference: response.data.reference
    });
  } catch (error) {
    console.error("❌ Payment initialization error:", error.message);
    res.status(500).json({
      error: "PAYMENT_INIT_FAILED",
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
  verifyGoogleAccess(); // Verify Google Sheets access at startup
});
