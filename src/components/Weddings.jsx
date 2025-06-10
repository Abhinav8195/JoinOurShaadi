import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { weddingData } from '../../data';
import { FaHeart } from 'react-icons/fa';

const Weddings = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#FFE4EC] via-[#FFF0EA] to-[#FFE6E6] py-20 px-4 sm:px-10 md:px-24 text-center">
      {/* Header */}
      <div data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-[#AD4379] mb-4">
          Featured Weddings
        </h2>
        <p className="text-lg text-gray-600">
          Which wedding would you like to join?
        </p>
      </div>

      {/* Cards Grid */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {weddingData.map((wedding) => (
          <div
            key={wedding.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={wedding.image}
              alt={wedding.couple}
              loading="lazy"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 text-left">
              <h3 className="text-xl font-semibold text-[#AD4379]">
                {wedding.couple}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{wedding.location}</p>
              <p className="text-sm text-gray-500">{wedding.date}</p>

               <button className="focus:outline-none mt-5 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#AD4379] to-[#E05297] text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition duration-300 hover:shadow-xl">
                <FaHeart className="text-sm" />
                Join Wedding
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div data-aos="fade-up" data-aos-delay="200" className="mt-16">
        <button className="focus:outline-none bg-white border border-[#AD4379] text-[#AD4379] hover:bg-[#AD4379] hover:text-pink-400 transition-all duration-300 px-6 py-3 rounded-full font-semibold text-sm shadow hover:shadow-md">
          See all upcoming weddings
        </button>
      </div>
    </section>
  );
};

export default Weddings;
