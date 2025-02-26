import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import One from "../assets/images/one.webp";
import Two from "../assets/images/two.jpg";
import Three from "../assets/images/three.jpg";

function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="relative bg-gradient-to-r from-primary/90 to-primary">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Text Content */}
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

          {/* Right Side: Image Slider */}
          <div className="w-full">
            <Slider {...settings}>
              <div>
                <img src={One} alt="Product 1" className="rounded-lg shadow-lg object-cover h-96 w-full"/>
              </div>
              <div>
                <img src={Two} alt="Product 2" className="rounded-lg shadow-lg object-cover h-96 w-full"/>
              </div>
              <div>
                <img src={Three} alt="Product 3" className="rounded-lg shadow-lg object-cover h-96 w-full"/>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
