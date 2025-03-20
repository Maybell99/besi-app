import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState("");
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();
        console.log("✅ Fetched Product Data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setErrors("Product not found. Please try again later.");
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.price) {
      const price = parseFloat(product.price);
      if (!isNaN(price)) {
        const total = price * quantity;
        setTotalAmount(total.toFixed(2));
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
      const response = await fetch("http://localhost:5000/api/checkout/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: parseFloat(totalAmount) * 100, // Convert to kobo
          name,
          address,
          product_id: id,
          quantity,
        }),
      });

      const data = await response.json();

      if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url; // Redirect to Paystack
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

  return (
    <div className="container mx-auto py-16 px-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <button
        className="flex items-center text-primary hover:text-accent font-medium mb-4"
        onClick={() => navigate("/products")}
      >
        <FaArrowLeft className="mr-2 size-8" /> Back to Products
      </button>
      <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>
      {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}
      {product ? (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <h3 className="text-lg font-semibold">{product.name ?? "Loading..."}</h3>
            <p className="text-gray-600">
              GH₵ {product.price ? parseFloat(product.price).toFixed(2) : "0.00"}
            </p>
            <div className="mt-4">
              <label className="block text-m font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                min="1"
                className="w-20 text-center border border-gray-300 rounded-md mt-2"
              />
            </div>
            <h2 className="text-xl font-bold mt-4">Total: GH₵ {totalAmount}</h2>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Delivery Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-lg font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white"
              }`}
              disabled={loading}
            >
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
