const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-200">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Have questions or need support with your auction? Get in touch with
          us!
        </p>

        {/* Contact Form - Placeholder */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
