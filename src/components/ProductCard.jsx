import { PaystackButton } from "react-paystack";
import P1 from "../assets/images/p1.jpg";
import P2 from "../assets/images/p2.jpg";
import P3 from "../assets/images/p3.jpg";
import P4 from "../assets/images/p4.jpg";

const productImages = [P1, P2, P3, P4];

function ProductCard({ product }) {
  const { id, name, description, price, inStock } = product;
  const image = productImages[id - 1] || P1; // Select correct image
  const publicKey = "your-paystack-public-key"; // Replace with your actual Paystack public key

  const paystackConfig = {
    email: "customer@example.com", // Replace with dynamic email if needed
    amount: price * 100, // Convert to kobo
    currency: "GHS",
    publicKey,
    onSuccess: (response) => {
      alert("Payment Successful! Transaction Reference: " + response.reference);
    },
    onClose: () => {
      alert("Transaction was not completed");
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />
        {!inStock && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-5 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-primary font-bold text-lg">GH₵ {price.toFixed(2)}</span>
          {inStock ? (
            <PaystackButton
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
              {...paystackConfig}
            >
              Buy Now
            </PaystackButton>
          ) : (
            <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
