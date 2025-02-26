import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PaystackButton } from "react-paystack";
import Three from "../assets/images/three.jpg";

const publicKey = "pk_test_1234567890abcdef"; // Replace with your real Paystack key

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, name, description, price, image, inStock } = product;

  const paystackConfig = {
    email: "customer@example.com", // Change to dynamic user email
    amount: price * 100, // Convert to kobo (Paystack uses kobo)
    publicKey: publicKey,
    text: "Pay Now",
    onSuccess: (response) => {
      console.log("Payment Successful!", response);
      alert("Payment Successful!");
    },
    onClose: () => {
      console.log("Payment window closed.");
    },
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <div className="relative">
          <img src={Three} alt={name} className="w-full h-48 object-cover" />
          {!inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-primary font-bold">GH₵ {price.toFixed(2)}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
              disabled={!inStock}
              className={`btn btn-primary text-sm py-1 px-3 ${!inStock ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Add to Cart
            </button>
          </div>
          {/* Paystack Button */}
          <div className="mt-4">
            <PaystackButton {...paystackConfig} className="btn bg-orange-950 ml-24 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary focus:ring-2 focus:ring-neutral-100 focus:outline-none" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
