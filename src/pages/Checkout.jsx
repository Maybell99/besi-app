import { useContext, useState } from "react";
import { PaystackButton } from "react-paystack";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cartItems, clearCart, updateQuantity } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState("");

  const publicKey = "pk_test_2a3467018d801785590349b2a546b85a831e4491";

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const amount = Number(calculateTotal()) * 100;

  const generateReference = () => `BESI_${Math.floor(Math.random() * 1000000000)}`;

  const handleSuccess = async (response) => {
    console.log("Payment Successful:", response);
    alert(`Payment Successful! Reference: ${response.reference}`);
    clearCart();
  };

  const handleClose = () => {
    alert("Transaction was not completed.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !address.trim()) {
      setErrors("Please fill in all fields before proceeding.");
      return;
    }
    setErrors("");
  };

  return (
    <div className="container mx-auto py-16 px-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p>Add some items to your cart before checking out!</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">GH₵ {item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 bg-gray-300 rounded-md"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const qty = parseInt(e.target.value, 10);
                        updateQuantity(item.id, qty > 0 ? qty : 1);
                      }}
                      className="w-12 text-center border border-gray-300 rounded-md"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold">GH₵ {(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <h2 className="text-xl font-bold mt-4">Total: GH₵ {calculateTotal()}</h2>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your delivery address"
              />
            </div>

            {errors && <p className="text-red-500 text-sm">{errors}</p>}

            <div className="text-center mt-6">
              <PaystackButton
                className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold"
                amount={amount}
                currency="GHS"
                email={email}
                publicKey={publicKey}
                reference={generateReference()}
                onSuccess={handleSuccess}
                onClose={handleClose}
                text={`Pay GH₵ ${calculateTotal()}`}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Checkout;
