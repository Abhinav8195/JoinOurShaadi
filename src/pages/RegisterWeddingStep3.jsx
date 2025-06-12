import React, { useEffect, useState } from 'react';
import { Sparkles, Plus, Minus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import ShaadiInfo from '../components/ShaadiInfo';

const ToggleSwitch = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between mb-6">
    <span className="text-base font-medium text-gray-700">{label}</span>

    <div
      onClick={() => onChange(!value)}
      className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
        value ? 'bg-pink-200' : 'bg-gray-300'
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          value ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
      <span
        className={`absolute top-1/2 transform -translate-y-1/2 text-xs font-semibold px-1 ${
          value ? 'left-2 text-[#BF3366]' : 'right-2 text-gray-600'
        }`}
      >
        {value ? 'Yes' : 'No'}
      </span>
    </div>
  </div>
);


const RegisterWeddingStep3 = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState(1);
  const [foodType, setFoodType] = useState('');
  const [alcohol, setAlcohol] = useState(false);
  const [mainLanguage, setMainLanguage] = useState('');
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('weddingStep2');
    if (!saved) navigate('/register/step2');
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!foodType.trim()) newErrors.foodType = 'Please specify the food type.';
    if (!mainLanguage.trim()) newErrors.mainLanguage = 'Main language is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      const step3Data = {
        days,
        foodType,
        alcohol: alcohol ? 'yes' : 'no',
        mainLanguage,
        otherLanguages,
      };
      localStorage.setItem('weddingStep3', JSON.stringify(step3Data));
      navigate('/register/step4');
    }
  };

  const addLanguageField = () => {
    setOtherLanguages([...otherLanguages, '']);
  };

  const handleLangChange = (value, index) => {
    const updated = [...otherLanguages];
    updated[index] = value;
    setOtherLanguages(updated);
  };

  const removeLangField = (index) => {
    const updated = [...otherLanguages];
    updated.splice(index, 1);
    setOtherLanguages(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-20 px-4 font-[Inter]">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200">

        {/* Header */}
        <div className="mb-8">
          <div className="w-full h-2 rounded-full bg-gray-200 mb-3">
            <div className="h-full w-3/4 rounded-full bg-[#BF3366]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#BF3366] flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Step 3: Share your wedding details
          </h2>
        </div>

        {/* Info Box */}
        <div className="bg-yellow-100/60 text-sm text-gray-700 border-l-4 border-yellow-400 p-4 rounded mb-8">
          You are required to offer food and drinks (non-alcoholic) at the wedding. Accommodation and transportation are not included in the price travelers pay, but you can offer these after they book.
        </div>

        {/* Days Counter */}
        <div className="mb-8">
  <label className="flex items-center gap-2 text-[17px] font-semibold text-[#BF3366] mb-3">
    <CalendarDays size={20} className="text-[#BF3366]" />
    How many days will your wedding go for?
  </label>

  <div className="bg-white/70 backdrop-blur-sm border border-[#f3d3e2] shadow-md rounded-2xl px-6 py-4 max-w-md flex items-center justify-between transition hover:shadow-lg">
    <button
      onClick={() => setDays((prev) => Math.max(1, prev - 1))}
      className="w-10 h-10 bg-white shadow border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#fce4ec] transition-all duration-200"
    >
      <Minus size={18} className="text-[#BF3366]" />
    </button>

    <span className="text-[19px] font-bold text-[#BF3366] tracking-wide">
      {days} {days === 1 ? 'Day' : 'Days'}
    </span>

    <button
      onClick={() => setDays((prev) => Math.min(3, prev + 1))}
      className="w-10 h-10 bg-white shadow border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#fce4ec] transition-all duration-200"
    >
      <Plus size={18} className="text-[#BF3366]" />
    </button>
  </div>

  <p className="mt-3 text-sm text-gray-500 max-w-md leading-relaxed">
    You can select between 1 to 3 days. Each day adds more celebration for your guests!
  </p>
</div>


        {/* Food Type */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-2">
            What kind of food will be offered? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={foodType}
            onChange={(e) => {
              setFoodType(e.target.value);
              setErrors((prev) => ({ ...prev, foodType: '' }));
            }}
            placeholder="e.g. Vegetarian, North Indian"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.foodType && <p className="text-red-500 text-sm mt-1">{errors.foodType}</p>}
        </div>

        {/* Alcohol Toggle */}
        <ToggleSwitch
          label="Will alcohol be offered at the event?"
          value={alcohol}
          onChange={setAlcohol}
        />

        {/* Main Language */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Main language(s) of the wedding <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={mainLanguage}
            onChange={(e) => {
              setMainLanguage(e.target.value);
              setErrors((prev) => ({ ...prev, mainLanguage: '' }));
            }}
            placeholder="e.g. English, Hindi"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.mainLanguage && <p className="text-red-500 text-sm mt-1">{errors.mainLanguage}</p>}
        </div>

        {/* Other Languages */}
        <div className="mb-8">
          <label className="block text-base font-semibold text-gray-800 mb-2">Add other language(s)</label>
          {otherLanguages.map((lang, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={lang}
                onChange={(e) => handleLangChange(e.target.value, index)}
                placeholder={`Language ${index + 1}`}
                className="flex-1 p-3 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => removeLangField(index)}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={addLanguageField}
            className="text-sm px-4 py-2 border border-[#BF3366] text-[#BF3366] rounded hover:bg-pink-100 transition"
          >
            + Add another language
          </button>
        </div>

       <div className="mb-12">
  <h3 className="text-lg font-semibold text-gray-800 mb-6">Wedding Event Details</h3>

  {[...Array(days)].map((_, i) => (
    <div key={i} className="py-8 border-t border-gray-200 first:border-0">
      <h4 className="text-base font-semibold text-[#BF3366] mb-4">
        Day {i + 1}
      </h4>
      <ShaadiInfo index={i} />
    </div>
  ))}
</div>


        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/register/step2')}
            className="px-6 py-3 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded bg-[#BF3366] hover:bg-[#a52c58] text-white font-medium transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWeddingStep3;
