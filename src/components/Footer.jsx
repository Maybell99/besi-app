import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Besi Ventures</h3>
            <p className="mb-4 text-gray-300">
              Providing nutritious local, easy and ready-to-eat instant meals made from millet and groundnut.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span className="text-gray-300">Accra, Ghana</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <span className="text-gray-300">+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span className="text-gray-300">info@besiventures.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} Besi Ventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;