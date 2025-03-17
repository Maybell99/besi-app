import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa'; // Added FaArrowLeft import
import { PaystackButton } from "react-paystack"; // Ensure PaystackButton is correctly imported

function Checkout() {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const publicKey = "pk_test_2a3467018d801785590349b2a546b85a831e4491";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          console.error("Error fetching product:", response.status, response.statusText);
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setErrors("Product not found. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  const totalAmount = product ? (product.price * quantity).toFixed(2) : "0.00";
  const amount = Number(totalAmount) * 100; // Amount for Paystack (in Kobo)

  const generateReference = () => `BESI_${Math.floor(Math.random() * 1000000000)}`;

  const handleSuccess = async (response) => {
    console.log("Payment Successful:", response);
    alert(`Payment Successful! Reference: ${response.reference}`);
  };

  const handleClose = () => {
    alert("Transaction was not completed.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for empty fields
    if (!name.trim() || !email.trim() || !address.trim()) {
      setErrors("Please fill in all fields before proceeding.");
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrors("Please enter a valid email address.");
      return;
    }

    setErrors("");
    setIsSubmitting(true);  // Start submitting process
  };

  return (
    <div className="container mx-auto py-16 px-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <button
        className="flex items-center text-primary hover:text-accent font-medium mb-4"
        onClick={() => navigate('/products')}
      >
        <FaArrowLeft className="mr-2 size-8" />
        Back to Products
      </button>
      <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>

      {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}

      {product ? (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">GH₵ {product.price}</p>
              </div>
              <div>
                <p className="font-semibold">GH₵ {product.price}</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-m font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const qty = Math.max(1, parseInt(e.target.value, 10)); // Ensure quantity is at least 1
                  setQuantity(qty);
                }}
                min="1"
                className="w-20 text-center border border-gray-300 rounded-md mt-2"
              />
            </div>

            <h2 className="text-xl font-bold mt-4">Total: GH₵ {totalAmount}</h2>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your delivery address"
              />
            </div>

            <div className="text-center mt-6">
              <PaystackButton
                className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold"
                amount={amount}
                currency="GHS"
                email={email}
                publicKey={publicKey}
                reference={generateReference()}
                onSuccess={handleSuccess}
                onClose={handleClose}
                text={`Pay GH₵ ${totalAmount}`}
                disabled={isSubmitting} // Disable button while submitting
              />
            </div>
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
