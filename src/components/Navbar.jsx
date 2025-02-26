import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Besi Ventures</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium">About</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary font-medium">Products</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium">Contact</Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <Link to="/cart" className="relative p-2">
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="ml-4 md:hidden text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;