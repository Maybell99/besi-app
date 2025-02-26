import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Besi Products?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our products are designed with your health and convenience in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/20 p-6 rounded-lg text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Nutritious</h3>
              <p className="text-gray-600">
                Our products are packed with essential nutrients from millet and groundnut to support your health.
              </p>
            </div>
            
            <div className="bg-secondary/20 p-6 rounded-lg text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenient</h3>
              <p className="text-gray-600">
                Ready-to-eat snacks that fit perfectly into your busy lifestyle without compromising on quality.
              </p>
            </div>
            
            <div className="bg-secondary/20 p-6 rounded-lg text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Ingredients</h3>
              <p className="text-gray-600">
                We source high-quality local ingredients to support Ghanaian farmers and ensure freshness.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try Our Products?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Experience the delicious taste and health benefits of our millet and groundnut snacks today.
          </p>
          <a href="/products" className="btn bg-white text-primary hover:bg-gray-100 font-semibold">
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;