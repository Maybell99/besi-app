import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Besi Ventures</h2>
            <p className="text-gray-200 max-w-xs">
              Providing nutritious, local, easy, and ready-to-eat instant meals made from millet and groundnut.
            </p>
            <div className="flex space-x-4">
              {[
                { 
                  icon: <FaFacebook size={20} />,
                  label: "Facebook",
                  url: "https://web.facebook.com/profile.php?id=61573636324884"
                },
                {
                  icon: <FaInstagram size={20} />,
                  label: "Instagram",
                  url: "https://www.instagram.com/besiventures/"
                },
                {
                  icon: <FaTiktok size={20} />,
                  label: "TikTok",
                  url: "https://www.tiktok.com/@besi_ventures?lang=en"
                }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-white transition-colors duration-300"
                  aria-label={`Visit our ${social.label} page`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us" },
                { path: "/products", label: "Products" },
                { path: "/contact", label: "Contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-200 hover:text-white transition-colors duration-300 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <address>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-white shrink-0" />
                <span className="text-gray-200">Wenchi, Kumasi</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-2 text-white shrink-0" />
                <a 
                  href="tel:+233246328332" 
                  className="text-gray-200 hover:text-white transition-colors duration-300"
                >
                  +233 246 328 332
                </a>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 text-white shrink-0" />
                <a 
                  href="mailto:besiventures@gmail.com" 
                  className="text-gray-200 hover:text-white transition-colors duration-300"
                >
                  besiventures@gmail.com
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-secondary text-center">
          <p className="text-gray-300 text-sm">
            &copy; {currentYear} Besi Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;