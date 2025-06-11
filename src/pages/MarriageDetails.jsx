import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useUser, SignInButton } from '@clerk/clerk-react';

const MarriageDetails = () => {
  const { state } = useLocation();
  const wedding = state?.wedding;
  const { isSignedIn, user } = useUser();

  
  const [showModal, setShowModal] = useState(false);
  const [showInfoStep, setShowInfoStep] = useState(false);

  
  const [selectedDays, setSelectedDays] = useState([]);
  const [travellers, setTravellers] = useState(1);
  const pricePerPerson = 250;
  const total = travellers * pricePerPerson;

  
   const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [source, setSource] = useState('');
  const [attendanceError, setAttendanceError] = useState('');


  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, []);

   useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  if (!wedding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff0f4] to-[#fffdfc]">
        <p className="text-lg text-gray-500">No wedding details found.</p>
      </div>
    );
  }

  const toggleDay = (index) => {
    setSelectedDays(prev =>
      prev.includes(index) ? prev.filter(d => d !== index) : [...prev, index]
    );
  };

  const handleConfirm = () => {
  const phoneRegex = /^\+\d{6,15}$/;
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number with country code (e.g., +91XXXXXXXXXX)');
    return;
  }

  alert(
    `Confirmed for ${firstName} ${lastName} (${email}), ${travellers} traveller(s)` +
    ` on ${selectedDays.length} day(s).`
  );

  // Clear form fields
  setSelectedDays([]);
  setTravellers(1);
  setFirstName('');
  setLastName('');
  setPhone('');
  setLocation('');
  setSource('');

  
  setShowModal(false);
  setShowInfoStep(false);
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fff0f4] to-[#fffdfc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-10 md:px-20 py-14">

        {/* Header */}
        <div
          className="bg-white/40 backdrop-blur-md border border-gray-200 shadow-lg rounded-3xl mt-10 p-6 md:flex gap-8 items-center mb-12"
          data-aos="fade-up"
        >
          <img
            src={wedding.image}
            alt={wedding.couple}
            className="w-full md:w-[300px] h-auto object-cover rounded-2xl shadow-md"
          />
          <div className="flex-1 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-4xl font-bold text-[#BF3366]">{wedding.couple}</h1>
            <p className="text-gray-600 mt-2 text-base">
              {wedding.date} • {wedding.location}
            </p>
          </div>
        </div>

        {/* About the Hosts */}
        <div
          className="bg-white/40 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-8 mb-12"
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-semibold text-[#BF3366] mb-4">
            About the Hosts
          </h2>
          <p className="text-gray-700 text-[16px] leading-relaxed whitespace-pre-line">
            {wedding.story}
          </p>
        </div>

        {/* Overview & Invitation */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {/* Snapshot */}
          <div
            className="bg-white border border-gray-200 rounded-3xl shadow-md p-8"
            data-aos="zoom-in-up"
          >
            <h3 className="text-xl font-medium text-[#AD4379] mb-4">
              Wedding Snapshot
            </h3>
            <ul className="space-y-3 text-gray-700 text-base">
              <li><strong>📍 Location:</strong> {wedding.location}</li>
              <li><strong>📅 Date:</strong> {wedding.date}</li>
              <li><strong>🗣️ Language:</strong> {wedding.language}</li>
              <li><strong>🥗 Diet:</strong> {wedding.diet}</li>
              <li><strong>🍷 Alcohol:</strong> {wedding.alcohol}</li>
            </ul>
          </div>

          {/* Gift Info */}
          <div
            className="bg-white border border-gray-200 rounded-3xl shadow-md p-8 flex flex-col justify-between"
            data-aos="zoom-in-left"
          >
            <div>
              <h3 className="text-xl font-medium text-[#AD4379] mb-4">
                Your Gift to the Couple
              </h3>
              <p className="text-gray-700 text-base mb-4">
                Your contribution is a gift and includes entry to all ceremonies.
              </p>
              <p className="text-2xl font-bold text-[#BF3366] mb-2">
                ${pricePerPerson}
                <span className="text-base font-medium text-gray-600">
                  {' '}USD per person
                </span>
              </p>
            </div>

            {isSignedIn ? (
              <button
                className="mt-4 bg-[#BF3366] hover:bg-[#a42b59] text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300"
                onClick={() => setShowModal(true)}
              >
                GET YOUR INVITATION
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="mt-4 bg-[#BF3366] hover:bg-[#a42b59] text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300">
                  GET YOUR INVITATION
                </button>
              </SignInButton>
            )}
          </div>
        </div>

        {/* Itinerary */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-[#C43C6C] mb-10 border-b pb-3 border-pink-100">
            Wedding Itinerary
          </h2>
          <div className="space-y-10">
            {wedding.itinerary.map((item, i) => (
              <div
                key={i}
                className="relative bg-white border-l-4 border-[#C43C6C] shadow rounded-3xl px-8 py-6"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <h3 className="text-xl font-semibold text-[#AD4379] mb-1">
                  Day {item.day} • {item.date}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {item.location} • Starts around {item.time}
                </p>
                <ul className="text-gray-700 text-base space-y-1">
                  <li><strong>🎯 Ceremony:</strong> {item.ceremony}</li>
                  <li><strong>📍 Venue & Contact:</strong> Disclosed upon booking</li>
                  <li><strong>🛏️ Accommodation:</strong> Not included</li>
                  <li><strong>🚗 Transportation:</strong> Not included</li>
                </ul>
                <p className="text-gray-600 text-sm mt-4 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* === JOIN THIS WEDDING Modal === */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">

            {/* close */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-rose-500"
              onClick={() => {
                setShowModal(false);
                setShowInfoStep(false);
              }}
            >
              ✕
            </button>

            {/* Step 1 */}
            {!showInfoStep ? (
              <>
                <h2 className="text-2xl font-bold text-[#BF3366] mb-6">JOIN THIS WEDDING</h2>

                <div className="mb-6">
                  <p className="text-lg font-medium mb-3">1. Your Attendance</p>
                  <p className="text-sm text-gray-500 mb-3">
                    Select the day(s) you plan to attend:
                  </p>
                  <div className="flex flex-col space-y-2">
                    {wedding.itinerary.map((item, idx) => (
                      <label key={idx} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedDays.includes(idx)}
                          onChange={() => toggleDay(idx)}
                          className="accent-rose-500"
                        />
                        <span>
                          Day {item.day}, {item.date} ({item.location})
                        </span>
                      </label>
                    ))}
                  </div>
                   {attendanceError && (
    <p className="text-sm text-red-600 font-medium mt-2">{attendanceError}</p>
  )}
                </div>

                

                <div className="mb-6">
                  <label className="block font-medium mb-2">
                    2. Number of Travellers
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={travellers}
                    onChange={e => setTravellers(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-gray-600">Total Contribution</p>
                  <p className="text-xl font-bold text-[#BF3366]">
                    ${total} USD
                  </p>
                </div>

                <button
                  className="w-full bg-[#BF3366] hover:bg-[#a42b59] text-white font-semibold py-3 rounded-xl transition-all duration-300"
                   onClick={() => {
                if (selectedDays.length === 0) {
                    setAttendanceError('Please select at least one day to attend the wedding.');
                } else {
                    setAttendanceError('');
                    setShowInfoStep(true);
                }
                }}
                >
                  Next
                </button>
              </>
            ) : (
              /* Step 2 */
              <>
                <h2 className="text-2xl font-bold text-[#BF3366] mb-6">
                  2. Your Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your Email Address *
                    </label>
                    <input
                       type="email"
                        value={email}
                        readOnly
                        className="w-full border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed rounded-lg px-4 py-2"
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Managed by {user?.primaryEmailAddress?.emailAddress.split('@')[1] || 'your provider'}, cannot change domain.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your Phone Number *
                    </label>
                    <input
                    type="tel"
                    value={phone}
                    onChange={e => {
                        const value = e.target.value;
                        if (value === '' || /^\+\d*$/.test(value)) {
                        setPhone(value);
                        }
                    }}
                    placeholder="+91XXXXXXXXXX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                    Include country code (e.g., +91) — numbers only.
                    </p>

                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Where are you visiting from? *
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Where did you hear about JoinMyWedding? *
                    </label>
                    <input
                      type="text"
                      value={source}
                      onChange={e => setSource(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>

                <button
                  className="w-full mt-6 bg-[#BF3366] hover:bg-[#a42b59] text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  onClick={handleConfirm}
                >
                  Confirm My Place
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default MarriageDetails;
