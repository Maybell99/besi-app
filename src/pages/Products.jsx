import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Products:", data);

        if (!Array.isArray(data)) throw new Error("Invalid API response format");

        setAllProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
        localStorage.setItem("products_lastFetch", Date.now());
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    const cachedData = localStorage.getItem("products");
    const lastFetchTime = localStorage.getItem("products_lastFetch");
    const expiryTime = 10 * 60 * 1000; // 10 minutes

    if (cachedData && lastFetchTime && Date.now() - lastFetchTime < expiryTime) {
      try {
        const parsedData = JSON.parse(cachedData);
        if (Array.isArray(parsedData)) {
          setAllProducts(parsedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error parsing cached data:", error);
      }
    } else {
      fetchProducts();  // Fetch if no cached data or cache is expired
    }
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return allProducts.filter((product) => {
      const categoryMatch =
        activeCategory === "all" ||
        (product.category && product.category.toLowerCase() === activeCategory);
      const searchMatch =
        term === "" ||
        product.name.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchTerm, allProducts]);

  const categories = useMemo(
    () => ["all", ...new Set(allProducts.map((product) => product.category?.toLowerCase()).filter(Boolean))],
    [allProducts]
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold">Loading products...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-500">{error}</h3>
        <button onClick={() => window.location.reload()} className="mt-4 bg-primary text-white px-4 py-2 rounded-md">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl">Discover our range of nutritious millet and groundnut snacks.</p>
        </div>
      </div>

      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex overflow-x-auto gap-2 py-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${activeCategory === category ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                if (!product.id) {
                  console.error("Product without an id:", product);
                  return null; // Skip rendering this product if no 'id'
                }

                return (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <ProductCard product={product} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;
