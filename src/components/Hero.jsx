import { Link } from 'react-router-dom';
import One from "../assets/images/one.webp";

function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary/90 to-primary">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nutritious Local Snacks for Everyone
            </h1>
            <p className="text-lg mb-8">
              Besi Ventures provides healthy and nutritious snacks made from millet and groundnut. 
              Easy to eat, ready to go, and good for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn bg-white text-primary hover:bg-gray-100 font-semibold">
                Shop Now
              </Link>
              <Link to="/about" className="btn border-2 border-white text-white hover:bg-white/10 font-semibold">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src={One} 
              alt="Millet and groundnut products" 
              className="rounded-lg shadow-lg object-cover h-96 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;