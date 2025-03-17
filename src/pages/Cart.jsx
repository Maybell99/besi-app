import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import P1 from "../assets/images/p1.webp";
import P2 from "../assets/images/p2.webp";
import P3 from "../assets/images/p3.webp";
import P4 from "../assets/images/p4.webp";
import P5 from "../assets/images/p5.webp";
import P6 from "../assets/images/p6.webp";

const productImages = { 1: P1, 2: P2, 3: P3, 4: P4, 5: P5, 6: P6 };

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = useMemo(() => {
    return cartItems
      .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
      .toFixed(2);
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ul className="space-y-4">
            {cartItems.map((item) => {
              const image = productImages[item.id] || P1;

              return (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <div className="relative">
                    <img
                      src={image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                      onError={(e) => (e.target.src = P1)}
                    />
                    {item.stock <= 0 && (
                      <div className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">
                      GH₵ {Number(item.price).toFixed(2)} x {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-800">
                    GH₵ {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total: GH₵ {calculateTotal}
            </h2>

            <div className="flex gap-4 mt-4 sm:mt-0">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
