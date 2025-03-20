import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Products() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        if (data && Array.isArray(data.products)) {
          setAllProducts(data.products);
          localStorage.setItem("products", JSON.stringify(data.products));
          localStorage.setItem("products_lastFetch", Date.now());
        } else {
          throw new Error("Invalid API response format. 'products' should be an array.");
        }
      } catch (err) {
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    const cachedData = localStorage.getItem("products");
    const lastFetchTime = localStorage.getItem("products_lastFetch");
    const expiryTime = 10 * 60 * 1000;

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
      fetchProducts();
    }
  }, []);

  const filteredProducts = useMemo(() => {
    const term = debouncedSearchTerm.toLowerCase().trim();
    return allProducts.filter((product) => {
      const categoryMatch =
        activeCategory === "all" || (product.category && product.category.toLowerCase() === activeCategory);
      const searchMatch =
        term === "" ||
        product.name.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term));

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, debouncedSearchTerm, allProducts]);

  const categories = useMemo(() => {
    return ["all", ...new Set(allProducts.map((product) => product.category?.toLowerCase()).filter(Boolean))];
  }, [allProducts]);

  const Loader = () => (
    <div className="flex justify-center items-center py-12">
      <div className="w-16 h-16 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
    </div>
  );

  if (loading) return <Loader />;

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
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                    activeCategory === category ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
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
                  return null;
                }

                return (
                  <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="cursor-pointer">
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;
