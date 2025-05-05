const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have any questions or need support with your auction experience? Reach
          out to us below.
        </p>

        <form className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
          </div>

          <div>
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
