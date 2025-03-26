import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import P1 from "../assets/images/p1.webp";
import P2 from "../assets/images/p2.webp";
import P3 from "../assets/images/p3.webp";
import P4 from "../assets/images/p4.webp";
import P5 from "../assets/images/p5.webp";
import P6 from "../assets/images/p6.webp";

const productImages = { 1: P1, 2: P2, 3: P3, 4: P4, 5: P5, 6: P6 };

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState("");
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`https://my-backend-lpr5.onrender.com/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");

      const data = await response.json();
      console.log("✅ Fetched Product Data:", data);
      if (data.success && data.product) {
        setProduct(data.product);
      } else {
        setErrors("Invalid product data");
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setErrors("Product not found. Please try again later.");
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (product && product.price) {
      const price = parseFloat(product.price);
      if (!isNaN(price)) {
        setTotalAmount((price * quantity).toFixed(2));
      }
    }
  }, [product, quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !address.trim()) {
      setErrors("Please fill in all fields before proceeding.");
      return;
    }
    setErrors("");
    setLoading(true);

    try {
      const response = await fetch("https://my-backend-lpr5.onrender.com/api/checkout/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: parseFloat(totalAmount) * 100,
          name,
          address,
          product_id: productId,
          quantity,
        }),
      });

      const data = await response.json();

      if (data.status && data.data?.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        setErrors("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrors("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(Number.isNaN(value) || value < 1 ? 1 : value);
  };

  const productImage = product ? product.imageUrl || productImages[productId] || P1 : P1;

  return (
    <div className="container mx-auto py-16 px-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <button className="flex items-center text-primary hover:text-accent font-medium mb-4" onClick={() => navigate("/products")}>
        <FaArrowLeft className="mr-2 size-8" /> Back to Products
      </button>
      <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>
      {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}
      {product ? (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <img
              src={productImage}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-md mx-auto"
              onError={(e) => (e.target.src = P1)}
            />
            <h3 className="text-lg font-semibold text-center mt-4">{product.name}</h3>
            <p className="text-gray-600 text-center">
              GH₵ {product.price ? parseFloat(product.price).toFixed(2) : "Price not available"}
            </p>
            <div className="mt-4">
              <label className="block text-m font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-20 text-center border border-gray-300 rounded-md mt-2"
              />
            </div>
            <h2 className="text-xl font-bold mt-4 text-center">Total: GH₵ {totalAmount}</h2>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Delivery Address" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <button type="submit" className={`w-full py-3 rounded-lg text-lg font-semibold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white"}`} disabled={loading}>
              {loading ? "Processing..." : "Pay with Paystack"}
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Loading product details...</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
