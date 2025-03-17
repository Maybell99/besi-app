import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaHeartbeat, FaSeedling, FaAppleAlt, FaHandHoldingHeart } from "react-icons/fa";
import Inno from "../assets/images/inno2.jpg";

function About() {
  const missionCards = [
    {
      icon: <FaLeaf className="text-accent text-5xl" />,
      title: "Nutrition First",
      text: "Prioritizing essential nutrients in every product to support overall health"
    },
    {
      icon: <FaSeedling className="text-accent text-5xl" />,
      title: "Local Sourcing",
      text: "Supporting Ghanaian farmers through local ingredient sourcing"
    },
    {
      icon: <FaHandHoldingHeart className="text-accent text-5xl" />,
      title: "Accessibility",
      text: "Making healthy snacks available to all, regardless of location or income"
    }
  ];

  const nutritionBenefits = [
    {
      icon: <FaAppleAlt className="text-primary text-5xl" />,
      title: "Millet - The Super Grain",
      content: "Rich in fiber, protein, and B-vitamins, millet is a gluten-free grain that supports digestive health, boosts energy, and reduces cholesterol levels.",
      bg: "bg-primary-50 border-2 border-primary-100"
    },
    {
      icon: <FaHeartbeat className="text-accent text-5xl" />,
      title: "Groundnut - Protein Powerhouse",
      content: "Packed with plant-based protein and healthy fats, groundnuts improve heart health, brain function, and weight management.",
      bg: "bg-secondary-50 border-2 border-secondary-100"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <header className="bg-primary text-white py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            About Besi Ventures
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed"
          >
            Providing nutritious local snacks made from millet and groundnut
          </motion.p>
        </div>
      </header>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-gray-50">
  <div className="container-custom">
    {/* Section Heading */}
    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
      Our Story
    </h2>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Text Content */}
      <article className="space-y-8">
        <motion.p
          className="text-lg md:text-xl leading-loose text-gray-600"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Meet <strong className="font-semibold text-gray-800">Hafisatu Adams</strong>,
          a visionary entrepreneur from Wenchi in the Bono Region.
          She identified a pressing need for nutritious, easy-to-eat meals
          and developed an innovative solution—Besi.
        </motion.p>
        <motion.p
          className="text-lg md:text-xl leading-loose text-gray-600"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          This dried, ready-to-eat meal made from millet and groundnuts
          offers a healthier alternative to traditional options. Packed
          with fiber and protein, Besi is now expanding to communities
          across Ghana and beyond.
        </motion.p>
      </article>

      {/* Image Section */}
      <motion.figure
        className="relative overflow-hidden rounded-xl border-4 border-accent shadow-lg max-w-[350px] md:max-w-[400px] mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={Inno}
          alt="Hafisatu Adams, founder of Besi Ventures"
          className="rounded-xl w-full object-cover"
          loading="lazy"
        />
        <figcaption className="sr-only">
          Founder of Besi Ventures, Hafisatu Adams
        </figcaption>
      </motion.figure>
    </div>
  </div>
</section>



      
<section className="py-16 md:py-24 bg-gray-200">
  <div className="container-custom">
    <h2 className="text-4xl md:text-4xl font-bold text-gray-800 text-center mb-12">
      Nutritional Benefits
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {nutritionBenefits.map((item, index) => (
        <motion.article
          key={index}
          className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-primary`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span aria-hidden="true">{item.icon}</span>
            <h3 className="text-3xl font-bold text-gray-800">{item.title}</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {item.content}
          </p>
        </motion.article>
      ))}
    </div>
  </div>
</section>


      {/* Our Mission */}
      <section className="py-16 md:py-24 bg-secondary-50">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-800">
            Our Mission
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto mt-6">
            To provide nutritious, convenient, and delicious snacks that promote 
            health and well-being
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {missionCards.map((item, index) => (
              <motion.article 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex justify-center mb-6" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-accent text-white text-center">
        <div className="container-custom">
          <motion.h2 
            className="text-4xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Experience the Besi Difference
          </motion.h2>
          <motion.p
            className="text-2xl mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Try our nutritious millet and groundnut products today
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/products"
              className="inline-block px-12 py-5 bg-white text-primary rounded-xl font-bold text-lg
              hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 
              focus:ring-white focus:ring-offset-2 focus:ring-offset-primary shadow-lg hover:shadow-xl"
              role="button"
            >
              Browse Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;