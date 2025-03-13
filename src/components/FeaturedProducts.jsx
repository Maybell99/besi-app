import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import products from "../data/products";

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    try {
      const featured = products.filter((product) => product.featured);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error("Error loading featured products:", error);
      setFeaturedProducts([]);
    }
  }, []);

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants} transition={{ duration: 0.5 }}>
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.div className="col-span-full text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-gray-500">No featured products available.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
