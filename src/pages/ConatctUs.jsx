import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import founderImage from '../assets/arch.png'; 

const ConatctUs = () => {
  useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true });
    window.scrollTo(0, 0); 
  }, []);

  const [result, setResult] = useState("");


  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_WEB3FORM_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Form Submitted Successfully!");
      event.target.reset();
    } else {
      console.error("Error:", data);
      setResult(`❌ ${data.message}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#FFE4EC] via-[#FFF0EA] to-[#FFE6E6] min-h-screen px-6 py-40 sm:px-10 md:px-24 ">
      {/* Header */}
      <div className="text-center mb-16" data-aos="fade-up">
        <h1 className="text-4xl md:text-5xl font-bold text-[#AD4379] mb-4">Get in Touch 💌</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions, suggestions, or just want to connect? We’re always here to help you join or host unforgettable wedding experiences.
        </p>
      <div className="mt-6 flex justify-center">
  <a
    href="mailto:contact@joinoursaadi.com"
    className="backdrop-blur-md bg-white/40 border border-rose-200 text-rose-500 hover:bg-rose-100/70 hover:text-rose-600 transition-all duration-300 px-6 py-2.5 rounded-full shadow-lg font-medium text-sm sm:text-base tracking-wide"
  >
    📧 contact@joinoursaadi.com
  </a>
</div>



      </div>

      {/* Contact Form */}
      <div
        className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#AD4379] focus:border-[#AD4379]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#AD4379] focus:border-[#AD4379]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Type your message here..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#AD4379] focus:border-[#AD4379]"
            />
          </div>
          <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#AD4379] to-[#E05297] text-white font-semibold py-2.5 rounded-full hover:shadow-lg transition duration-300 focus:outline-none focus:ring-0"
      >
        Send Message
      </button>
        </form>

        {result && (
  <div
    className={`mt-6 text-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
      result.startsWith("✅")
        ? "bg-green-100 text-green-700 border border-green-300"
        : "bg-red-100 text-red-700 border border-red-300"
    }`}
  >
    {result}
  </div>
)}
      </div>

      {/* Founder & Mission */}
      <div
        className="mt-24 grid md:grid-cols-2 gap-12 items-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Founder Info */}
        <div className="flex items-center space-x-5">
          <img
            src={founderImage}
            alt="Founder"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#AD4379]"
          />
          <div>
            <p className="text-xl font-semibold text-[#AD4379]">Ankita</p>
            <p className="text-gray-600 text-sm">Founder, Ambala, India</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div>
          <h3 className="text-xl font-semibold text-[#AD4379] mb-2">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            We believe every culture is a beautiful story, and weddings are the perfect chapters to experience it. Our mission is to foster meaningful connections through these timeless celebrations, opening hearts and homes to the world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConatctUs;
