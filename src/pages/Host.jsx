import React from 'react';
import bgImage from '../assets/i1.webp';

const Host = () => {
  return (
    <div className="relative min-h-screen text-white font-[Inter]">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-[-1] brightness-[0.7]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="fixed top-0 left-0 w-full h-screen bg-black/30 z-[-1]" />

      <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 py-10">
        <div className="mt-auto text-center md:max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight drop-shadow-lg">
            Invite the World to Celebrate With You
          </h1>
          <p className="mt-5 text-lg md:text-xl font-light drop-shadow-md text-white/90">
            Every wedding tells a story — let yours be one the world remembers, rich with tradition, color, and connection.
          </p>
          <button className="mt-6 bg-[#BF3366] hover:bg-[#a42b59] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
            Register Your Shaadi
          </button>
        </div>
      </div>

      <div className="bg-white text-gray-900 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#BF3366] mb-12">
            Why Our Couples Love Welcoming Travelers to Their Weddings ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-rose-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#BF3366] mb-2">Receive Thoughtful Contributions</h3>
              <p className="text-gray-600 text-sm">
                Hosting guests from around the world helps support your wedding expenses while creating meaningful shared moments.
              </p>
            </div>

            <div className="bg-rose-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#BF3366] mb-2">Build Global Friendships</h3>
              <p className="text-gray-600 text-sm">
                Connect with curious, respectful travelers who are excited to be part of your special day and story.
              </p>
            </div>

            <div className="bg-rose-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#BF3366] mb-2">Celebrate Your Culture</h3>
              <p className="text-gray-600 text-sm">
                Share your customs, cuisine, and ceremonies with an audience that deeply appreciates cultural authenticity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
