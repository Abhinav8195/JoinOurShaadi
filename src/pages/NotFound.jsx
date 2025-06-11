import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-[#fff1f5] via-[#ffd8e4] to-[#fcb6c8]">
      <div
        data-aos="zoom-in"
        className="relative w-full max-w-xl text-center p-10 sm:p-16 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_4px_60px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        {/* Gradient Glow Border */}
        <div className="absolute inset-0 z-[-1] rounded-3xl bg-gradient-to-br from-[#ffffff33] via-[#ffe4ec33] to-[#ffc4d633] shadow-inner border border-white/10" />

        <h1 className="text-7xl sm:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#cc2b5e] to-[#753a88]">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold text-[#AD4379] mb-3">
          Lost in the Celebration?
        </h2>

        <p className="text-gray-800 text-base sm:text-lg mb-8 leading-relaxed">
          This page didn’t get the wedding invite. <br />
          Let’s get you back to the festivities!
        </p>

        <button
          onClick={() => navigate('/')}
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#AD4379] to-[#F47D7D] text-white font-semibold text-base shadow-md hover:scale-95 transition-transform"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
