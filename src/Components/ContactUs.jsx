import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#141414] text-white  h-max flex flex-col items-center  px-6 md:px-16  lg:px-24 py-12 relative ">
      {/* Navigation Buttons */}
      <div className="absolute top-5 left-7 flex gap-7 items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-xl hover:text-[#E50914] ri-arrow-left-line cursor-pointer"
        ></i>
        <button onClick={handleHomeNavigation} className="text-xl hover:text-[#E50914]">
          <i className="ri-home-9-line"></i>
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#E50914]">
        Contact Us
      </h1>

      {/* Main Content: Flexbox for side-by-side layout */}
      <div className="flex flex-col  md:flex-row md:space-x-8 space-y-8 md:space-y-0 w-full max-w-5xl">
        {/* Contact Form */}
        <div className="bg-[#1f1f1f] p-8 rounded-lg shadow-lg w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 bg-[#2c2c2c] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-[#2c2c2c] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-4 bg-[#2c2c2c] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full p-4 text-lg font-semibold bg-[#E50914] rounded-md hover:bg-[#d40814] transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information & Map */}
        <div className="flex flex-col items-center md:items-start space-y-6 md:w-1/2 text-gray-300">
          <div className="text-center md:text-left">
            <p className="text-lg">We’d love to hear from you!</p>
            <p className="mt-4">
              Whether you have a question, a suggestion, or just want to connect, feel free to reach out.
            </p>
            <p className="mt-4">
              <strong>Email:</strong> yasho130802@gmail.com <br />
              <strong>Phone:</strong> +91 9192919291
            </p>
          </div>
          
          {/* Map Section */}
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9190570904877!2d-122.0838519!3d37.4219991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02cd0a1c21%3A0x98f8d1d5c2baddd0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1633092990123!5m2!1sen!2sus"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              className="rounded-md shadow-lg"
            ></iframe>
          </div>
          
          {/* Social Links */}
          <div className="mt-6 flex space-x-6">
            <a
              href="https://github.com/tripathiyasho"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E50914] text-2xl hover:text-white transition-colors duration-300"
            >
              <i className="ri-github-fill"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/yashonandan-tripathi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E50914] text-2xl hover:text-white transition-colors duration-300"
            >
              <i className="ri-linkedin-box-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
