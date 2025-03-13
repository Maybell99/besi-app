import { useState } from "react";
import { PaystackButton } from "react-paystack";
import P1 from "../assets/images/p1.jpg";
import P2 from "../assets/images/p2.jpg";
import P3 from "../assets/images/p3.jpg";
import P4 from "../assets/images/p4.jpg";

const productImages = [P1, P2, P3, P4];

function ProductCard({ product }) {
  const { id, name, description, price, inStock } = product;
  const image = productImages[id - 1] || P1;
  const publicKey = "pk_test_2a3467018d801785590349b2a546b85a831e4491"; // Replace with your actual Paystack public key
  const email = "besiventures@gmail.com"; // Replace with actual customer email

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionRef, setTransactionRef] = useState("");

  const paystackConfig = {
    email,
    amount: price * 100,
    currency: "GHS",
    publicKey,
    onSuccess: (response) => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTransactionRef(response.reference);
    },
    onClose: () => {
      setIsProcessing(false);
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 p-5">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover rounded-md" />
        {!inStock && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-primary font-bold text-lg">GH₵ {price.toFixed(2)}</span>

          {inStock ? (
            paymentSuccess ? (
              <div className="text-green-600 font-semibold text-sm text-center">
                ✅ Payment Successful!  
                <br />
                Ref: {transactionRef}
              </div>
            ) : (
              <PaystackButton
                className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-lg text-sm font-semibold disabled:bg-gray-400"
                {...paystackConfig}
                onClick={() => setIsProcessing(true)}
              >
                {isProcessing ? "Processing..." : "Buy Now"}
              </PaystackButton>
            )
          ) : (
            <button disabled className="bg-gray-400 text-white px-5 py-2 rounded-lg cursor-not-allowed">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
