import { Link } from "react-router-dom";
import Inno from "../assets/images/inno.jpg";

function About() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-extrabold mb-6">About Besi Ventures</h1>
          <p className="text-2xl">
            Providing nutritious local snacks made from millet and groundnut.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-800 mt-20">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                This is <span className="font-bold">Hafisatu Adams</span>, a visionary blind entrepreneur from Wenchi 
                in the Bono Region. She identified a pressing need for nutritious, easy-to-eat meals and developed 
                an innovative solution—Besi. This dried, ready-to-eat meal, made from millet and groundnuts, offers 
                a healthier alternative to traditional options like gari. Packed with fiber, protein, and B-vitamins, 
                Besi is an excellent choice for students, particularly those in boarding schools. With overwhelming 
                support from parents and students, Hafisatu is now seeking resources to expand production and make 
                Besi accessible to communities across Ghana and beyond.
              </p>
            </div>
            <div>
              <img
                src={Inno}
                alt="A bowl of millet grains, one of Besi's main ingredients"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nutritional Benefits */}
      <section className="py-20 bg-gradient-to-b from-primary to-secondary text-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-10">Nutritional Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Millet - The Super Grain</h3>
              <p className="text-lg leading-relaxed">
                Millet is a highly nutritious grain rich in fiber, protein, and essential vitamins and minerals. 
                It provides sustained energy and promotes digestive health while being gluten-free, making it an 
                excellent option for people with gluten sensitivities. It is also packed with antioxidants and aids 
                in reducing cholesterol levels.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Groundnut - The Protein Powerhouse</h3>
              <p className="text-lg leading-relaxed">
                Groundnuts (peanuts) are a great source of plant-based protein and healthy fats. They support heart 
                health, improve brain function, and help maintain a healthy weight. They are also rich in essential 
                vitamins like Vitamin E and B-complex, which contribute to overall well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              To provide nutritious, convenient, and delicious snacks that promote health and well-being.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Nutrition First",
                text: "We prioritize the nutritional value of our products, ensuring they provide essential nutrients that support overall health.",
              },
              {
                title: "Local Sourcing",
                text: "We source our ingredients locally to support Ghanaian farmers and reduce our carbon footprint.",
              },
              {
                title: "Accessibility",
                text: "We strive to make our products accessible to everyone, regardless of their location or economic status.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-semibold mb-4 text-primary">{item.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-6">Experience the Besi Difference</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Try our nutritious millet and groundnut products today and discover a new way to snack healthy.
          </p>
          <Link
            to="/products"
            className="py-4 px-8 rounded-lg bg-white text-primary font-semibold text-lg hover:bg-gray-200 transition-all duration-300"
          >
            Browse Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
