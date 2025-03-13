import { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import P1 from "../assets/images/p1.webp";
import P2 from "../assets/images/p2.webp";
import P3 from "../assets/images/p3.webp";
import P4 from "../assets/images/p4.webp";
import P5 from "../assets/images/p5.webp";
import P6 from "../assets/images/p6.webp";

const productImages = { 1: P1, 2: P2, 3: P3, 4: P4, 5: P5, 6: P6 };

function ProductCard({ product, userEmail }) {
  const { id, name, description, price, inStock } = product;
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const image = productImages[id] || P1;
  const publicKey = "pk_test_2a3467018d801785590349b2a546b85a831e4491";

  useEffect(() => {
    setIsAdded(cartItems.some((item) => item.id === id));
  }, [cartItems, id]);

  const handleToggleCart = () => {
    isAdded ? removeFromCart(id) : addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 relative p-4">
      {/* Heart Button */}
      <button
        className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full transition duration-300 bg-white shadow-md z-10"
        onClick={handleToggleCart}
        aria-label={isAdded ? "Remove from cart" : "Add to cart"}
        aria-pressed={isAdded}
      >
        <FaHeart size={22} className={isAdded ? "text-red-600" : "text-gray-400"} />
      </button>

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
          <span className="text-primary font-bold text-lg">GH₵ {Number(price).toFixed(2)}</span>
          {inStock ? (
            <PaystackButton
              email={userEmail || "besiventures@gmail.com"}
              amount={Number(price) * 100}
              currency="GHS"
              publicKey={publicKey}
              onSuccess={(response) =>
                alert("Payment Successful! Transaction Reference: " + response.reference)
              }
              onClose={() => alert("Transaction was not completed")}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
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
