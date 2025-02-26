import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, name, description, price, image, inStock } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <div className="relative">
          <img 
            src={image || "https://placehold.co/300x200/8B4513/FFF?text=Besi+Product"} 
            alt={name} 
            className="w-full h-48 object-cover"
          />
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
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`btn btn-primary text-sm py-1 px-3 ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;