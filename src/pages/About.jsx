import { Link } from 'react-router-dom';
import Two from "../assets/images/two.jpg"

function About() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">About Besi Ventures</h1>
          <p className="text-xl">Providing nutritious local snacks made from millet and groundnut.</p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Besi Ventures was founded with a simple mission: to solve the problem of unavailability of nutritious local, easy and ready-to-eat instant meals for everyone.
              </p>
              <p className="text-gray-600 mb-4">
                We recognized that many people struggle to find healthy snack options that are both convenient and nutritious. Thats why we decided to create products that supplement existing local snacks by providing more healthy and nutritious alternatives.
              </p>
              <p className="text-gray-600">
                Our products are primarily made from millet and groundnut, two nutrient-rich ingredients that have been staples in Ghanaian cuisine for generations. Weve taken these traditional ingredients and transformed them into modern, convenient snacks that everyone can enjoy.
              </p>
            </div>
            <div>
              <img 
                src={Two} 
                alt="Millet grains" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              To provide nutritious, convenient, and delicious snacks that promote health and well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">Nutrition First</h3>
              <p className="text-gray-600">
                We prioritize the nutritional value of our products, ensuring they provide essential nutrients that support overall health.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">Local Sourcing</h3>
              <p className="text-gray-600">
                We source our ingredients locally to support Ghanaian farmers and reduce our carbon footprint.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">Accessibility</h3>
              <p className="text-gray-600">
                We strive to make our products accessible to everyone, regardless of their location or economic status.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ingredients */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Key Ingredients</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-secondary/20 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Millet</h3>
              <p className="text-gray-600 mb-4">
                Millet is a highly nutritious grain thats rich in fiber, protein, and essential minerals. Its also gluten-free, making it suitable for those with gluten sensitivities.
              </p>
              <p className="text-gray-600">
                Benefits of millet include:
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                <li>High in antioxidants</li>
                <li>Good source of protein</li>
                <li>Rich in fiber</li>
                <li>Contains essential minerals like magnesium, phosphorus, and iron</li>
              </ul>
            </div>
            
            <div className="bg-secondary/20 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Groundnut</h3>
              <p className="text-gray-600 mb-4">
                Groundnuts (peanuts) are packed with healthy fats, protein, and various vitamins and minerals. They add a delicious flavor and creamy texture to our products.
              </p>
              <p className="text-gray-600">
                Benefits of groundnuts include:
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                <li>Excellent source of plant-based protein</li>
                <li>Contains heart-healthy monounsaturated fats</li>
                <li>Rich in vitamins E and B</li>
                <li>Good source of minerals like magnesium and phosphorus</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Besi Difference</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Try our nutritious millet and groundnut products today and discover a new way to snack healthy.
          </p>
          <Link to="/products" className="btn bg-white text-primary hover:bg-gray-100 font-semibold">
            Browse Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;