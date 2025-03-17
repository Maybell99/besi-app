import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('All fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const mailtoLink = `mailto:besiventures@email.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}%0AEmail: ${formData.email}%0A%0A${formData.message}`)}`;
    
    window.location.href = mailtoLink;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <form onSubmit={handleSendEmail} className="max-w-2xl mx-auto space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg font-medium transition-colors bg-primary text-white hover:bg-primary-dark"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
