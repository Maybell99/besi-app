import { useParams, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);

        if (!response.ok) {
          console.error("Error fetching product:", response.status, response.statusText);
          throw new Error(`Product not found (ID: ${id})`);
        }

        const data = await response.json();
        console.log("Fetched product:", data);
        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <p className="text-red-500 text-center">{error}. Please try again later.</p>;
  if (!product) return <p className="text-center">Product not found.</p>;

  // Using `stock` directly for availability
  const inStock = product.stock || 0;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button 
        className="bg-blue-500 text-white p-2 rounded mt-4 mb-8" 
        onClick={() => navigate("/products")} 
      >
        Back to Products
      </button>

      <h1 className="text-2xl font-bold text-center mb-4">{product.name}</h1>
      <p className="text-center mb-4">{product.description}</p>
      <p className="text-center font-semibold mb-4">Price: GH₵ {product.price}</p>
      <p className={`text-center font-bold ${inStock <= 0 ? 'text-red-600' : 'text-green-600'}`}>
        {inStock <= 0 ? "Out of Stock" : `${inStock} in Stock`}
      </p>
    </div>
  );
}

export default ProductDetails;
