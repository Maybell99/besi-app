import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  console.log("Fetching products from:", `${apiUrl}/api/products`);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  
  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError("");
  
      const response = await fetch(`${apiUrl}/api/products`);
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response from server.");
      }
  
      const data = await response.json();
      console.log("Fetched products response:", data); // Log the entire response to inspect it
  
      // Check if the response structure is correct
      if (data && data.success && Array.isArray(data.products)) {
        const formattedProducts = data.products.slice(0, 4).map((product) => ({
          ...product,
          stock: product.stock ?? product.quantity ?? product.availableStock ?? 0, // Handle different API field names
        }));
  
        setFeaturedProducts(formattedProducts);
      } else {
        // If response is not in the expected format, throw an error
        throw new Error("Unexpected response format. Missing 'success' or 'products' array.");
      }
    } catch (error) {
      console.error("Error fetching featured products:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Besi Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most popular nutritious snacks made from millet and groundnut.
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <motion.div key={product.id} transition={{ duration: 0.5 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div className="col-span-full text-center">
                <p className="text-gray-500">No featured products available.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
