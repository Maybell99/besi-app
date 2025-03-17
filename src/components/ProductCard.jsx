import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import P1 from "../assets/images/p1.webp";
import P2 from "../assets/images/p2.webp";
import P3 from "../assets/images/p3.webp";
import P4 from "../assets/images/p4.webp";
import P5 from "../assets/images/p5.webp";
import P6 from "../assets/images/p6.webp";

const productImages = { 1: P1, 2: P2, 3: P3, 4: P4, 5: P5, 6: P6 };

function ProductCard({ product }) {
  const { id, name, description, price, stock, availableStock } = product;
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [isAdded, setIsAdded] = useState(cartItems.some((item) => item.id === id));

  const inStock = stock ?? availableStock ?? 0;
  const image = useMemo(() => productImages[id] || P1, [id]);

  const navigate = useNavigate();

  const handleToggleCart = (e) => {
    e.stopPropagation();
    const updatedProduct = { ...product, image }; // Ensure the image is passed

    if (isAdded) {
      removeFromCart(id);
    } else {
      addToCart(updatedProduct); // Pass updatedProduct with image
    }
    setIsAdded(!isAdded);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate("/checkout", { state: { product } });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 relative p-4 ${inStock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
    >
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
        <img src={image} alt={`Image of ${name}`} className="w-full h-56 object-cover rounded-md" />
        {inStock <= 0 && (
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
        </div>

        {inStock > 0 ? (
          <button
            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition cursor-pointer w-full"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        ) : (
          <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed mt-4 w-full">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
