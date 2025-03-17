import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProductList({ userEmail }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/products`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products - Status: ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API.");
      }

      setAllProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter products when category or search term changes
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    setFilteredProducts(
      allProducts.filter((product) => {
        const categoryMatch =
          activeCategory === "all" || (product.category && product.category.toLowerCase() === activeCategory);
        const searchMatch =
          term === "" ||
          product.name.toLowerCase().includes(term) ||
          (product.description && product.description.toLowerCase().includes(term));
        return categoryMatch && searchMatch;
      })
    );
  }, [activeCategory, searchTerm, allProducts]);

  // Get unique categories (Optimized with useMemo)
  const categories = useMemo(() => {
    return ["all", ...new Set(allProducts.map((product) => product.category?.toLowerCase()).filter(Boolean))];
  }, [allProducts]);

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-500">{error}</h3>
        <button onClick={fetchProducts} className="mt-4 bg-primary text-white px-4 py-2 rounded-md">
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                activeCategory === category ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 w-full md:w-64 px-4 py-2 border rounded-md"
        />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <ProductCard product={product} userEmail={userEmail} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
