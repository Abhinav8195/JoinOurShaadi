import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const RegisterWeddingStep5 = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('weddingStep4');
    if (!saved) navigate('/register/step4');
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleSubmit = () => {
    if (paymentMethod === 'paypal' && !paypalEmail.includes('@')) {
      setError('Please enter a valid PayPal email address');
      return;
    }
    if (paymentMethod !== 'paypal' && !bankDetails.trim()) {
      setError('Please provide your account details');
      return;
    }

    const paymentInfo = {
      method: paymentMethod,
      paypalEmail,
      bankDetails,
    };
    localStorage.setItem('weddingPaymentInfo', JSON.stringify(paymentInfo));
    navigate('/register/complete');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-20 px-4 font-[Inter]">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200">

        {/* Header */}
        <div className="mb-8">
          <div className="w-full h-2 rounded-full bg-gray-200 mb-3">
            <div className="h-full w-[100%] rounded-full bg-[#BF3366]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#BF3366] flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Step 5: Receive traveler contributions
          </h2>
        </div>

        {/* Info Box */}
        <div className="bg-pink-50 border-l-4 border-pink-300 p-5 rounded-xl mb-8 text-sm text-gray-700 space-y-2">
          <p>
            From each traveler attending your wedding you will receive <strong>60% of the traveler contribution</strong> (minimum of USD 60) as a wedding gift through JoinOurShaadi.
          </p>
          <p className="font-medium">Traveler contributions include:</p>
          <ul className="list-disc ml-5">
            <li>Access to the wedding on the chosen day</li>
            <li>Connection with Ceremony Guide</li>
            <li>Access to meals on the chosen day</li>
          </ul>
          <p className="font-medium mt-2">Traveler contributions do <strong>not</strong> include:</p>
          <ul className="list-disc ml-5">
            <li>Transportation to the wedding venue</li>
            <li>Accommodation at the wedding</li>
          </ul>
          <p className="mt-2">
            Payment details and information will be kept safe within JoinOurShaadi and will not be shared with third parties.
          </p>
        </div>

        {/* Payment Method Dropdown */}
        <div className="mb-6">
          <label className="block font-medium mb-1">How would you like to receive your wedding contribution?</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="paypal">PayPal</option>
            <option value="bank">Bank transfer / Other</option>
          </select>
        </div>

        {/* Conditional Inputs */}
        {paymentMethod === 'paypal' && (
          <div className="mb-6">
            <label className="block font-medium mb-1">PayPal email address *</label>
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="e.g. you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        )}

        {paymentMethod === 'bank' && (
          <div className="mb-6">
            <label className="block font-medium mb-1">Please provide account details *</label>
            <textarea
              rows={4}
              value={bankDetails}
              onChange={(e) => setBankDetails(e.target.value)}
              placeholder="Bank name, account number, IFSC/SWIFT code, etc."
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Info Below Form */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-sm text-gray-700 mb-10">
          <strong className="block mb-1">When will I receive the traveler contributions?</strong>
          Money collected from bookings will be deposited into the JoinOurShaadi account and will be transferred to you after the last day of your wedding is over.
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/register/step4')}
            className="px-6 py-3 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded bg-[#BF3366] hover:bg-[#a52c58] text-white font-medium transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWeddingStep5;
