import { CartProvider } from "./context/CartContext"; // Ensure CartProvider is imported
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop';

import Navbar from './components/Navbar'; // Ensure Navbar is correctly imported
import Footer from './components/Footer'; // Ensure Footer is correctly imported
import Home from './pages/Home'; // Assuming Home page is created
import About from './pages/About'; // Assuming About page is created
import Products from './pages/Products'; // Assuming Products page is created
import ProductDetails from './pages/ProductDetails'; // Assuming ProductDetails page is created
import Contact from './pages/Contact'; // Assuming Contact page is created
import Cart from './pages/Cart'; // Assuming Cart page is created
import Checkout from './pages/Checkout'; // Assuming Checkout page is created

function App() {
  return (
    <Router>
      <CartProvider> {/* Make sure CartProvider wraps all necessary components */}
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Define your routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/:id" element={<Checkout />} /> {/* Checkout route */}
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
