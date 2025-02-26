import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [submitted, setSubmitted] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the checkout process, e.g., send data to an API
    setSubmitted(true);
    clearCart(); // Clear the cart after submission
  };

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold mb-4">Checkout</h1>
      {submitted ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Thank you for your order!</h2>
          <p>Your order has been placed successfully.</p>
        </div>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl">Your cart is empty</h2>
              <p>Add some items to your cart before checking out!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <h2 className="text-2xl mb-4">Order Summary</h2>
              <ul className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>Price: ${item.price.toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <h2 className="text-xl mb-4">Total: ${calculateTotal()}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bankTransfer">Bank Transfer</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
              >
                Complete Purchase
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Checkout; 