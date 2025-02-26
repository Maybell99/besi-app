import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);
  
  useEffect(() => {
    // Filter products based on category and search term
    let result = allProducts;
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [activeCategory, searchTerm, allProducts]);
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl">Discover our range of nutritious millet and groundnut snacks.</p>
        </div>
      </div>
      
      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-12">
        <div className="container-custom">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                  <ProductCard product={product} />
                </div>
              ))}
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