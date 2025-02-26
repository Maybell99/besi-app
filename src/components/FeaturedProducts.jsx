import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import products from '../data/products';

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Filter featured products
    const featured = products.filter(product => product.featured);
    setFeaturedProducts(featured);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our most popular nutritious snacks made from millet and groundnut.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;