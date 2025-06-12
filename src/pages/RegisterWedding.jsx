import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const RegisterWedding = () => {
  const { user } = useUser();
   const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    relation: '',
    brideFirstName: '',
    brideLastName: '',
    brideEmail: '',
    bridePhone: '',
    groomFirstName: '',
    groomLastName: '',
    groomEmail: '',
    groomPhone: ''
  });

  const navigate=useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });

    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.emailAddresses[0]?.emailAddress || ''
      }));
    }
  }, [user]);

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };


  const validate = () => {
    const newErrors = {};
    if (!role) newErrors.role = 'Role is required';
    if (role === 'other' && !formData.relation) newErrors.relation = 'Relation is required';

    // General Info
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';

    // Groom
    if (role === 'bride' || role === 'other') {
      if (!formData.groomFirstName) newErrors.groomFirstName = 'Groom first name is required';
      if (!formData.groomLastName) newErrors.groomLastName = 'Groom last name is required';
      if (!formData.groomEmail) newErrors.groomEmail = 'Groom email is required';
      if (!formData.groomPhone) newErrors.groomPhone = 'Groom phone is required';
    }

    // Bride
    if (role === 'groom' || role === 'other') {
      if (!formData.brideFirstName) newErrors.brideFirstName = 'Bride first name is required';
      if (!formData.brideLastName) newErrors.brideLastName = 'Bride last name is required';
      if (!formData.brideEmail) newErrors.brideEmail = 'Bride email is required';
      if (!formData.bridePhone) newErrors.bridePhone = 'Bride phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleNext = () => {
    if (validate()) {
        localStorage.setItem('weddingStep1', JSON.stringify({ formData, role }));
         navigate('/register/step2');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 px-4 py-20 font-[Inter]">
      <div
        data-aos="fade-up"
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl border border-white/30 rounded-2xl p-8 md:p-10"
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#BF3366] h-2 w-1/4 rounded-full animate-pulse" />
          </div>
          <p className="mt-2 text-sm text-[#BF3366] font-semibold">Step 1 of 4: About You</p>
        </div>

        <h2 className="text-3xl font-bold text-[#BF3366] flex items-center gap-2 mb-6">
          <Sparkles className="w-7 h-7 text-[#BF3366]" />
          Let’s Get You Ready to Become a Host
        </h2>

        {/* Role Based Notices */}
        {role === 'bride' || role === 'groom' ? (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg">
            <p className="mb-2 font-medium">Your contact details</p>
            <p className="text-sm">
              Your details are needed for identification purposes and in order for us to get in touch with you.
              You will notice that we have populated this form for you based on your login details, please update if necessary.
            </p>
            <p className="text-sm mt-2">
              <strong>Your wedding listing</strong> will show your first names publicly. Your other contact details,
              including your full names, email address, and phone numbers, will not be visible on the public listing.
              This information will only be shared with people who choose to join your wedding via our secure website.
            </p>
          </div>
        ) : role === 'other' ? (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg">
            <p className="mb-2 font-medium">Registering on behalf of a couple?</p>
            <p className="text-sm">
              If you are registering a wedding on behalf of the to-be-married couple, please clearly indicate your relationship to them.
              It is your responsibility to ensure that the couple approve of their wedding being registered with JoinMyWedding.
            </p>
            <p className="text-sm mt-2">
              <strong>Your contact details</strong> are needed for identification purposes and in order for us to get in touch with you.
              You will notice that we have populated this form for you based on your login details, please update if necessary.
            </p>
            <p className="text-sm mt-2">
              The wedding listing will show the couple’s first names publicly. Other contact details will remain private
              and are only shared securely with guests who join.
            </p>
          </div>
        ) : null}

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Who are you? <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setErrors({ ...errors, role: '' });
            }}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#BF3366]"
          >
            <option value="">Please choose</option>
            <option value="bride">Bride</option>
            <option value="groom">Groom</option>
            <option value="other">Other</option>
          </select>
           {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Relation if Other */}
        {role === 'other' && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Please describe your relationship to the couple <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              placeholder="e.g. Sister of the groom"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
              {errors.relation && <p className="text-red-500 text-sm mt-1">{errors.relation}</p>}
          </div>
        )}

        {/* User Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <input
              className="w-full border p-3 rounded-lg"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
             {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <input
              className="w-full border p-3 rounded-lg"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              className="w-full border p-3 rounded-lg bg-gray-100 cursor-not-allowed"
              value={formData.email}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +919876543210"
              className="w-full border p-3 rounded-lg"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Groom’s Info */}
      {(role === 'bride' || role === 'other') && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-[#BF3366]">Groom's Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {['groomFirstName', 'groomLastName', 'groomEmail', 'groomPhone'].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-1">{field.replace('groom', '').replace(/([A-Z])/g, ' $1')} *</label>
                  <input
                    name={field}
                    placeholder={`Enter ${field.replace('groom', '').replace(/([A-Z])/g, ' $1')}`}
                    onChange={handleChange}
                    className="border p-3 rounded-lg w-full"
                  />
                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

{/* Bride’s Info */}
 {(role === 'groom' || role === 'other') && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-[#BF3366]">Bride's Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {['brideFirstName', 'brideLastName', 'brideEmail', 'bridePhone'].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-1">{field.replace('bride', '').replace(/([A-Z])/g, ' $1')} *</label>
                  <input
                    name={field}
                    placeholder={`Enter ${field.replace('bride', '').replace(/([A-Z])/g, ' $1')}`}
                    onChange={handleChange}
                    className="border p-3 rounded-lg w-full"
                  />
                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Next Button */}
        <div className="text-right">
          <button
            className="px-6 py-3 rounded-lg bg-[#BF3366] text-white font-semibold hover:bg-[#a52c58] transition-all"
           onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWedding;
