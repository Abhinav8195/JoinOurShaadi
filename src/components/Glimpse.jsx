import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import w5 from '../assets/w5.jpg';
import w2 from '../assets/w2.jpg';
import w3 from '../assets/w6.jpg';
import w4 from '../assets/w4.jpeg';
import w7 from '../assets/w7.jpg';
import w8 from '../assets/w8.webp';

const weddingImages = [
  { src: w3, label: 'Reception Celebration' },
  { src: w5, label: 'Mehendi (Henna Ceremony)' },
  { src: w2, label: 'Haldi (Turmeric Ritual)' },
  { src: w8, label: 'DJ Night' },
  { src: w4, label: 'Varmala Ceremony (Garland Exchange)' },
  { src: w7, label: 'Wedding Night (Shaadi ki Raat)' },
];

const Glimpse = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#FFE4EC] via-[#FFF0EA] to-[#FFE6E6] py-20 px-4 sm:px-10 md:px-24 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#AD4379]">
        Feel the Essence of Indian Celebration
      </h2>
      <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
        Dive into a world where colors, rituals, and joy come alive.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {weddingImages.map((image, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="relative overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-shadow duration-300 group"
          >
            <img
              src={image.src}
              alt={`Indian wedding ${index + 1}`}
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Glass Info Box: Always visible on mobile, hover only on larger screens */}
            <div className="absolute bottom-0 left-0 w-full px-4 py-3 
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
              transition-opacity duration-300 
              backdrop-blur-md bg-white/30 border-t border-white/40 rounded-b-3xl"
            >
              <p className="text-white text-lg font-semibold drop-shadow">
                {image.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Glimpse;
