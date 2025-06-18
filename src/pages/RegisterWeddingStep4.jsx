import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Info } from 'lucide-react';

const RegisterWeddingStep4 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('weddingStep3');
    if (!saved) navigate('/register/step3');
        window.scrollTo(0, 0);
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    relationship: '',
    language: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Please enter Guide's first name";
    if (!formData.lastName.trim()) newErrors.lastName = "Please enter Guide's last name";
    if (!formData.email.includes('@')) newErrors.email = "Please enter Guide's valid email address";
    if (formData.email !== formData.confirmEmail)
      newErrors.confirmEmail = "Email addresses do not match";
    if (!/^\+\d{7,}$/.test(formData.phone))
      newErrors.phone = "Phone number must start with '+' and contain at least 7 digits";
    if (!formData.relationship.trim()) newErrors.relationship = "Please specify relationship";
    if (!formData.language.trim()) newErrors.language = "Please enter at least one language";
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('ceremonyGuide', JSON.stringify(formData));
    localStorage.setItem('weddingStep4', 'true');
    navigate('/register/step5');

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-20 px-4 font-[Inter]">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200">

        {/* Header */}
        <div className="mb-8">
          <div className="w-full h-2 rounded-full bg-gray-200 mb-3">
            <div className="h-full w-[90%] rounded-full bg-[#BF3366]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#BF3366] flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Step 4: Nominate a Ceremony Guide
          </h2>
        </div>

        {/* Info */}
 <div className="bg-yellow-100/60 text-sm text-gray-800 border-l-4 border-yellow-400 p-5 rounded-xl mb-10 space-y-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 mt-1 text-yellow-500 shrink-0" />
            <p>
              <strong>Who is the Ceremony Guide?</strong><br />
              We recognize that couples are busy before and during the wedding. Therefore, please appoint someone who can be asked on your behalf to take care of your JoinOurShaadi guests.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 mt-1 text-yellow-500 shrink-0" />
            <div>
              <strong>What does a Ceremony Guide do?</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>He/she gets in touch with confirmed guests at the wedding to make arrangements based on guest needs of the wedding (eg, exact timing, location and dress code).</li>
                <li>He/she can be contacted by confirmed guests after the booking has been made to discuss any practical details (eg, accommodation recommendation, shopping for traditional wedding attire, etc).</li>
                <li>He/she keeps in touch with confirmed guests regarding any last-minute changes to the wedding.</li>
                <li>He/she welcomes confirmed guests to the wedding and helps them to be part of the celebration.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        {/* Ceremony Guide Form */}
<div className="mb-12 space-y-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Ceremony Guide’s Details</h3>

  <div className="grid sm:grid-cols-2 gap-6">
    <div>
      <label className="block font-medium mb-1">Guide First name *</label>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="e.g. Rahul"
        className="w-full p-3 border rounded-lg border-gray-300"
      />
      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
    </div>
    <div>
      <label className="block font-medium mb-1">Guide Last name *</label>
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="e.g. Sharma"
        className="w-full p-3 border rounded-lg border-gray-300"
      />
      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
    </div>
  </div>

  <div className="grid sm:grid-cols-2 gap-6">
    <div>
      <label className="block font-medium mb-1">Guide Email address *</label>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="e.g. guide@example.com"
        className="w-full p-3 border rounded-lg border-gray-300"
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>
    <div>
      <label className="block font-medium mb-1">Guide Email address again *</label>
      <input
        name="confirmEmail"
        value={formData.confirmEmail}
        onChange={handleChange}
        placeholder="Repeat email"
        className="w-full p-3 border rounded-lg border-gray-300"
      />
      {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
    </div>
  </div>

  <div>
    <label className="block font-medium mb-1">Guide Phone number *</label>
    <input
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="e.g. +919876543210"
      className="w-full p-3 border rounded-lg border-gray-300"
    />
    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
  </div>

  <div>
    <label className="block font-medium mb-1">Guide’s relationship to the couple *</label>
    <input
      name="relationship"
      value={formData.relationship}
      onChange={handleChange}
      placeholder="e.g. Bride’s mom"
      className="w-full p-3 border rounded-lg border-gray-300"
    />
    {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>}
  </div>

  <div>
    <label className="block font-medium mb-1">Guide’s spoken languages *</label>
    <input
      name="language"
      value={formData.language}
      onChange={handleChange}
      placeholder="e.g. English, Hindi"
      className="w-full p-3 border rounded-lg border-gray-300"
    />
    {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
  </div>
</div>


        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/register/step3')}
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

export default RegisterWeddingStep4;
