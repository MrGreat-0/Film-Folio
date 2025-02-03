import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-5xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-lg mb-6 text-center">
        We would love to hear from you! If you have any questions, suggestions,
        or just want to connect, feel free to reach out.
      </p>

      <div className="w-full max-w-lg shadow-lg shadow-zinc-400 rounded-lg p-8">
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Get in Touch
        </h2>
        <p className="text-red-600 text-sm mb-4 text-center">
          Note: This form is for demo purposes and does not submit data.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="shadow appearance-none text-zinc-800 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="shadow appearance-none text-zinc-800 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="shadow appearance-none text-zinc-800 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 focus:outline-none focus:shadow-outline"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-10 text-center">
        <h3 className="text-3xl font-semibold mb-4">Connect with Me</h3>
        <p className="text-green-600 text-sm mb-4">
          Note: This section is fully functional and working as expected.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link
            to="https://github.com/MrGreat-0"
            target="_blank"
            className="text-gray-600 hover:text-blue-600"
            aria-label="GitHub"
          >
            <i className="ri-github-line text-3xl"></i>
          </Link>
          <Link
            to="https://in.linkedin.com/in/akash-pundir-31309b234?trk=people-guest_people_search-card"
            target="_blank"
            className="text-gray-600 hover:text-blue-600"
            aria-label="LinkedIn"
          >
            <i className="ri-linkedin-line text-3xl"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
