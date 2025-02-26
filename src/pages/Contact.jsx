import { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to an API
    setSubmitted(true);
    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      {submitted ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Thank you for your message!</h2>
          <p>We will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact; 