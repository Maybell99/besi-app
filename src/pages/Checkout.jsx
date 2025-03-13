import { useContext, useState } from "react";
import { PaystackButton } from "react-paystack";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [submitted, setSubmitted] = useState(false);

  const publicKey = "pk_test_2a3467018d801785590349b2a546b85a831e4491"; 
  const email = "besiventures@gmail.com"; 

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const amount = Number(calculateTotal()) * 100; 

  const handleSuccess = (response) => {
    console.log("Payment Successful:", response);
    alert(`Payment Successful! Reference: ${response.reference}`);
    setSubmitted(true);
    clearCart();
  };

  const handleClose = () => {
    console.log("Payment closed");
    alert("Transaction was not completed.");
  };

  return (
    <div className="container mx-auto py-16 px-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>
      
      {submitted ? (
        <div className="text-center p-6 bg-green-100 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-600">Thank you for your order!</h2>
          <p className="text-gray-600">Your order has been placed successfully.</p>
        </div>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p>Add some items to your cart before checking out!</p>
            </div>
          ) : (
            <div>
              {/* Order Summary */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">GH₵ {item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <p className="font-semibold">GH₵ {(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
                <h2 className="text-xl font-bold mt-4">Total: GH₵ {calculateTotal()}</h2>
              </div>

              {/* Checkout Form */}
              <form className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Enter your delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  >
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bankTransfer">Bank Transfer</option>
                  </select>
                </div>

                {/* Pay Button */}
                <div className="text-center mt-6">
                  <PaystackButton
                    className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark"
                    amount={amount}
                    email={email}
                    publicKey={publicKey}
                    onSuccess={handleSuccess}
                    onClose={handleClose}
                  >
                    Pay GH₵ {calculateTotal()}
                  </PaystackButton>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Checkout;
