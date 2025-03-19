import { motion } from "framer-motion";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaTimes } from "react-icons/fa";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Inno from "../assets/images/inno.jpg";
import { Link } from 'react-router-dom';

function Home() {
  const [isSocialVisible, setIsSocialVisible] = useState(false);

  // Animation variants
  const sectionVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 1 },
    },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="overflow-hidden">
      {/* Floating Social Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2"
        onClick={() => setIsSocialVisible(true)}
        aria-label="Open social media links"
      >
        <span className="hidden sm:inline">Connect</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </motion.button>

      {/* Social Links Pop-up */}
      {isSocialVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popupVariants}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg p-8 max-w-md relative text-center shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-primary"
              onClick={() => setIsSocialVisible(false)}
              aria-label="Close social media pop-up"
            >
              <FaTimes size={24} />
            </button>

            <motion.img
              src={Inno}
              alt="Hafisatu Adams, founder of Besi Ventures"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary"
              loading="lazy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />

            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Connect with Besi Ventures
            </h3>

            <div className="flex justify-center gap-6 mb-6">
              {[
                { icon: <FaFacebook />, link: "#", label: "Facebook" },
                { icon: <FaTwitter />, link: "#", label: "Twitter" },
                { icon: <FaInstagram />, link: "#", label: "Instagram" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className="text-primary hover:text-secondary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit our ${social.label} page`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <p className="text-gray-600">Follow us for updates and special offers!</p>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Hero />
      </motion.div>

      {/* Featured Products */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <FeaturedProducts />
      </motion.section>

      {/* Innovator Section */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-16 bg-gradient-to-r from-primary to-accent text-white"
      >
        <div className="container-custom flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h2 className="text-4xl font-bold mb-10">Meet the Innovator</h2>
            <p className="text-lg leading-relaxed">
              <strong className="block text-xl">Hafisatu Adams</strong>
              A visionary blind entrepreneur from Wenchi in the Bono Region 
              saw the need for nutritious, convenient food options and created{" "}
              <strong className="font-semibold">Besi</strong>. Made from 
              millet and groundnut, Besi is a ready-to-eat meal packed with 
              essential nutrients. Her mission is to make healthy eating 
              accessible for students and families across Ghana and beyond.
            </p>
          </div>
          <figure className="md:w-1/2 flex flex-col items-center md:items-start md:pl-12 mt-8 md:mt-0">
            <img
              src={Inno}
              alt="Hafisatu Adams, founder of Besi Ventures"
              className="rounded-lg shadow-xl w-full max-w-[450px] border-4 border-secondary"
              loading="lazy"
            />
            <figcaption className="mt-4 text-xl font-bold text-gray-700 ml-16">
              Hafisatu Adams
            </figcaption>
          </figure>
        </div>
      </motion.section>
    







      <section className="py-16 bg-white" aria-labelledby="benefits-heading">
        <div className="container-custom">
          <header className="text-center mb-12">
            <h2 id="benefits-heading" className="text-3xl font-bold text-gray-800">
              Why Choose Besi Products?
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our products are designed with your health and convenience in mind.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Nutritious", 
                text: "Packed with essential nutrients from millet and groundnut to support your health.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                aria: "Healthy heart icon"
              },
              { 
                title: "Convenient", 
                text: "Ready-to-eat snacks that fit perfectly into your busy lifestyle.",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                aria: "Clock icon"
              },
              { 
                title: "Local Ingredients", 
                text: "High-quality local ingredients supporting Ghanaian farmers.",
                icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
                aria: "Farm icon"
              }
            ].map((item, index) => (
              <article 
                key={index}
                className="bg-secondary/10 p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div 
                  className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="2"
                    role="img"
                    aria-label={item.aria}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d={item.icon} 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-16 bg-white"
        aria-labelledby="benefits-heading"
      >
        {/* Additional content can be added here */}
      </motion.section>

      <section className="py-16 bg-accent text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try Our Products?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Experience the delicious taste and health benefits of our millet and groundnut snacks today.
          </p>
          <Link 
            to="/products"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            role="button"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;