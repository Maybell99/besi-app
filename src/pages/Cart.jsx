import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const calculateTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2);
  }, [cartItems]);

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl">Your cart is empty</h2>
          <p>Add some nutritious snacks to your cart!</p>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Price: GH₵ {Number(item.price).toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Total: GH₵ {calculateTotal}</h2>
            <button
              onClick={clearCart}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate('/checkout')} // Navigate to Checkout Page
              className="mt-4 ml-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
