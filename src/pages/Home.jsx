import React from 'react';
import bgImage from '../assets/i3.jpeg';
import Glimpse from '../components/Glimpse';

export default function Home() {
  return (
    <div className="relative min-h-screen text-white font-[Inter]">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-[-1] brightness-[0.6]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 py-10">
        <div className="mt-auto text-center md:max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight drop-shadow-lg">
            Step into the Heart of India’s Most Grand Celebrations
          </h1>
          <p className="mt-5 text-lg md:text-xl font-light drop-shadow-md text-white/90">
            Not just an invitation — a story woven with color, rhythm, and age-old traditions. Come, be part of a wedding that welcomes the world.
          </p>
        </div>
      </div>

      <div className="bg-white text-gray-900 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            A Journey into Living Culture
          </h2>
          <p className="text-lg text-center text-gray-600 mt-4 mb-12 max-w-3xl mx-auto">
            Experience the soul of India where tradition meets celebration.
          </p>

          <div className="grid md:grid-cols-2 gap-10 text-lg text-gray-700">
            <div className="space-y-6">
              <p className='font-bold'>
                For the true traveler — one who seeks meaning beyond landmarks and souvenirs — there’s no experience more immersive than a traditional Indian wedding.
              </p>
              <p className='font-bold' >
                Here, the soul of a culture unfolds in real time — vibrant rituals, joyful chaos, sacred traditions, and heartfelt moments woven into a celebration like no other.
              </p>
            </div>

            <div className="space-y-6">
              <p className='font-bold'>
                Thanks to the warmth of Indian couples who open their hearts and guest lists to the world, you’re not just invited — you’re welcomed as family.
              </p>
              <p className='font-bold'>
                Adorn yourself in traditional attire, savor exquisite regional flavors, sway to hypnotic rhythms, and take part in ceremonies passed down through generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Glimpse/>
    </div>
  );
}
