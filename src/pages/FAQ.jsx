import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../../data';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe3ec] via-[#fff0f5] to-[#fdf6f9] px-4 sm:px-8 md:px-16 py-20 font-sans text-gray-800">
      <div
        className="w-full max-w-5xl mx-auto bg-white/40 rounded-3xl shadow-md px-6 sm:px-10 py-14 transition-all"
        data-aos="fade-up"
      >
        <h1
          className="text-center text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6"
          data-aos="zoom-in"
        >
          Wondering How It All Works?
        </h1>
        <p
          className="text-center text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-14"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Let’s answer the most common questions before you join the vibrant world of Indian wedding celebrations.
        </p>

        {faqData.map((section, secIndex) => (
          <div
            key={section.category}
            className="mb-12"
            data-aos="fade-up"
            data-aos-delay={`${secIndex * 100}`}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-pink-700 mb-4 border-b border-pink-200 pb-2">
              ✦ {section.category}
            </h2>
            <div className="space-y-4">
              {section.questions.map((item, i) => {
                const index = `${secIndex}-${i}`;
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-pink-100 bg-white/30 backdrop-blur-sm shadow-md transition-all"
                    data-aos="fade-up"
                    data-aos-delay={`${i * 100}`}
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-pink-50 transition-colors duration-200"
                    >
                      <span className="text-sm sm:text-base font-medium text-gray-900">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-pink-600 transform transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`px-5 pb-4 text-gray-700 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'max-h-[500px] opacity-100'
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      {item.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
