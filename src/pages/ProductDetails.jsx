import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const DefaultImage = 'https://via.placeholder.com/150'; // Fallback image

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Product ID is missing.');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product (ID: ${id})`);
        }

        const data = await response.json();
        console.log("Fetched product data:", data); // Debugging

        // Ensure we extract the actual product object
        if (!data || !data.success || !data.product) {
          throw new Error(`Invalid product data for ID: ${id}`);
        }

        setProduct(data.product);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="spinner"><div></div></div>;
  if (error) return <p className="text-red-500 text-center">{error}. Please try again later.</p>;
  if (!product) return <p className="text-center">Product not found.</p>;

  // Extract stock and handle cases where it's missing or undefined
  const inStock = product.stock !== undefined ? Number(product.stock) : 0;
  const productImage = product.imageUrl || DefaultImage;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        className="flex items-center text-primary hover:text-accent font-medium mb-4"
        onClick={() => navigate(`/products`)}
      >
        <FaArrowLeft className="mr-2 text-2xl" />
        Back to Products
      </button>

      {/* Product Image */}
      <div className="flex justify-center mb-6">
        <img
          src={productImage}
          alt={product.name}
          className="max-w-full h-auto rounded-lg shadow-md"
        />
      </div>

      <h1 className="text-3xl font-bold text-center mb-4">{product.name}</h1>
      <p className="text-center text-lg mb-4">{product.description}</p>
      <p className="text-center text-xl font-semibold mb-4">Price: GH₵ {product.price}</p>
      <p className={`text-center font-bold ${inStock <= 0 ? 'text-red-600' : 'text-green-600'}`}>
        {inStock <= 0 ? 'Out of Stock' : `${inStock} in Stock`}
      </p>

      {/* Show Checkout button only if the product is in stock */}
      {inStock > 0 && (
        <button
          className="w-full bg-accent hover:bg-primary text-white py-3 rounded-lg mt-8 text-lg font-semibold"
          onClick={() => navigate(`/checkout/${id}`)}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default ProductDetails;
