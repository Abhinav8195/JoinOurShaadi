import React, { useEffect } from 'react';
import bgImage from '../assets/i1.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Host = () => {
  const navigate=useNavigate();
   const { isSignedIn, user } = useUser();

    useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0); 
  }, []);

   
  return (
    <div className="relative min-h-screen text-white font-[Inter]">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-[-1] brightness-[0.65]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="fixed top-0 left-0 w-full h-screen bg-black/40 z-[-1]" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 py-10">
        <div className="mt-auto text-center md:max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight drop-shadow-lg">
            Invite the World to Celebrate With You
          </h1>
          <p className="mt-5 text-lg md:text-xl font-light drop-shadow-md text-white/90">
            Let your wedding become a story the world never forgets — vibrant, soulful, and filled with love. Share your rituals, music, food, and heartfelt traditions with global travelers who admire cultural beauty.
          </p>
          {isSignedIn ? (
          <button onClick={()=>navigate('/registerWedding')} className="mt-6 bg-[#BF3366] hover:bg-[#a42b59] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
            Register Your Shaadi
          </button>
                      ) : (
         <SignInButton mode="modal">
            <button  className="mt-6 bg-[#BF3366] hover:bg-[#a42b59] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
            Register Your Shaadi
          </button>
         </SignInButton>
                      )}
        </div>
      </div>

      {/* Why Couples Host Section */}
      <div className="bg-white text-gray-900 px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#BF3366] mb-12">
            Why Couples Love Sharing Their Wedding Experience
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-rose-50 p-8 rounded-2xl shadow hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-[#BF3366] mb-4">Support for Your Celebration</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Thoughtful contributions from guests help ease your wedding budget, turning cultural exchange into meaningful support.
              </p>
            </div>

            <div className="bg-rose-50 p-8 rounded-2xl shadow hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-[#BF3366] mb-4">Meaningful Global Bonds</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Welcome curious travelers who cherish authenticity. You'll share stories, smiles, and create friendships that cross continents.
              </p>
            </div>

            <div className="bg-rose-50 p-8 rounded-2xl shadow hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-[#BF3366] mb-4">A Platform to Celebrate Heritage</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Let guests immerse in your vibrant traditions — from haldi and mehendi to music, rituals, and local flavors — and leave inspired.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How Hosting Works Section */}
      <div className="bg-[#FFF7F9] text-gray-900 px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#BF3366] mb-14">
            How Hosting Works
          </h2>

          <div className="space-y-14 text-[15px] leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-[#BF3366] mb-3">1. Create Your Wedding Listing</h3>
              <p>
                Begin by submitting your wedding for hosting. Share key details — dates, location (kept private), traditions, photos or videos, and what makes your wedding unique. Couples or their close representatives can complete this simple form in just a few minutes. Listings are reviewed for authenticity before going live.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#BF3366] mb-3">2. Connect With Guests Worldwide</h3>
              <p>
                Once your listing is published, it becomes discoverable by travelers eager to experience real Indian weddings. When someone books, you’ll receive full guest details and can reach out to welcome them in advance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#BF3366] mb-3">3. Celebrate and Share</h3>
              <p>
                On your wedding day, embrace your guests as extended family. Let them feel the joy of your traditions — the colors, the music, the blessings — and give them a memory to treasure forever.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#BF3366] mb-3">4. Receive Your Wedding Gift</h3>
              <p>
                Traveler contributions are collected securely at the time of booking and transferred to you shortly after your ceremony as a heartfelt token of appreciation and cultural exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
