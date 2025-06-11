import React from 'react';

const Host = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white text-gray-800 py-10">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#BF3366] mb-4">
          Host Your Wedding with Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Open your celebration to global travelers. Create unforgettable memories and share your special day with the world.
        </p>
        <button className="bg-[#BF3366] hover:bg-[#a42b59] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
          Start Hosting
        </button>
      </section>

      {/* Next Steps or Form will go here */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Add Steps, Process Info, or Form Here */}
        <p className="text-center text-gray-500">More content coming soon...</p>
      </section>
    </div>
  );
};

export default Host;
