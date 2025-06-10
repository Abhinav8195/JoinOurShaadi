import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


import guestIcon from '../assets/guest.png'; 
import wedding from '../assets/wedding.png'; 

const guestFaqs = [
  {
    question: "Why should I join an Indian wedding?",
    answer:
      "Indian weddings are grand, colorful celebrations full of music, rituals, and joy. You'll experience the warmth of Indian hospitality and traditions up close.",
  },
  {
    question: "Is it safe to attend through JoinOurShaadi?",
    answer:
      "Absolutely. All weddings are verified and curated. We prioritize safety and cultural integrity for every guest.",
  },
  {
    question: "What’s included in my experience?",
    answer:
      "You'll participate in real ceremonies, enjoy traditional cuisine, interact with locals, and become part of a beautiful celebration.",
  },
  {
    question: "Do I need to pay to join?",
    answer:
      "Yes, a small fee helps support the hosts and operations. However, listing your interest and exploring is completely free.",
  },
];

const hostFaqs = [
  {
    question: "Why list my wedding?",
    answer:
      "You get to showcase your culture to the world, add excitement to your big day, and earn extra income when guests attend.",
  },
  {
    question: "Is listing free?",
    answer:
      "Yes. Listing your wedding is 100% free. We only charge a small service fee when a guest books and attends.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "You receive payment automatically once a guest confirms and joins your wedding. Payments are secure and fast.",
  },
  {
    question: "Why would anyone want to join our wedding?",
    answer:
      "Many global travelers seek authentic cultural experiences — and what’s more magical than an Indian shaadi full of color, food, music, and love?",
  },
];

const MoreAbout = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true });
  }, []);

  return (
     <section className="px-6 md:px-20 py-20 bg-gradient-to-br from-[#FFF1F8] via-[#FFF7F2] to-[#FFEFEF] text-gray-800">
      <h2
        className="text-4xl md:text-5xl font-bold text-center text-[#AD4379] mb-16"
        data-aos="fade-up"
      >
        More About JoinOurShaadi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Hosts */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-2xl font-bold text-[#AD4379] mb-6 flex items-center gap-2">
            <img src={wedding} alt="Host Icon" className="w-6 h-6" />
            For Hosts
          </h3>
          <div className="space-y-6">
            {hostFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-orange-100/50 border border-[#F6D0C6] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <h4 className="text-lg font-semibold text-[#8C2F5A] mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-700 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl font-bold text-[#AD4379] mb-6 flex items-center gap-2">
            <img src={guestIcon} alt="Guest Icon" className="w-6 h-6" />
            For Guests
          </h3>
          <div className="space-y-6">
            {guestFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-pink-100/50 border border-[#F3C9D2] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <h4 className="text-lg font-semibold text-[#8C2F5A] mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-700 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Find Out More Button */}
      <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="300">
      <button className="group px-8 py-3 rounded-full bg-gradient-to-r from-[#AD4379] to-[#F47D7D] text-white font-semibold text-lg shadow-lg transition duration-300">
                <span className="inline-block transition-transform duration-300 group-hover:scale-90">
                    Find Out More
                </span>
                </button>

      </div>
    </section>
  );
};

export default MoreAbout;
