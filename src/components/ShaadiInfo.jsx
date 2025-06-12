import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, CalendarDays } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { addDays } from 'date-fns';

const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="w-full p-3 border border-gray-300 rounded-lg flex justify-between items-center bg-white text-left"
  >
    <span>{value || 'Choose a date'}</span>
    <CalendarDays className="text-gray-400" />
  </button>
));


const ShaadiInfo = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [country, setCountry] = useState('');
  const [showCountryList, setShowCountryList] = useState(false);
  const [countries, setCountries] = useState([]);

  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [venueName, setVenueName] = useState('');

  console.log(countries)

 useEffect(() => {
  fetch('https://countriesnow.space/api/v0.1/countries')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const countryList = data.data.map((c) => c.country);
      setCountries(countryList.sort((a, b) => a.localeCompare(b)));
    })
    .catch((err) => console.error("Failed to fetch countries", err));
}, []);


  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const suffix = i < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${suffix}`;
  });

  return (
    <div className="mb-10">
        <div className="w-full bg-[#FCD6DF] text-[#BF3366] font-semibold text-lg px-4 py-2 rounded-md mb-6 shadow-sm">
  Day 1
</div>

      {/* Date */}
      <label className="block text-base font-semibold text-gray-800 mb-2">
        When does it start? <span className="text-red-500">*</span>
      </label>
      <div className="relative mb-4">
        <DatePicker
  selected={date}
  onChange={(date) => setDate(date)}
   minDate={addDays(new Date(), 2)}
  customInput={<CustomDateInput />}
/>
      </div>

      {/* Time */}
      <label className="block text-base font-semibold text-gray-800 mb-2">
        What time does it start? <span className="text-red-500">*</span>
      </label>
      <div className="relative mb-4">
        <div
          onClick={() => setShowTimePicker(!showTimePicker)}
          className="w-full p-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer bg-white"
        >
          <span>{time || 'Please choose'}</span>
          <Clock className="text-gray-400" />
        </div>
        {showTimePicker && (
          <div className="absolute z-10 top-full mt-2 max-h-60 overflow-y-auto border border-gray-300 bg-white shadow rounded-lg w-full">
            {timeSlots.map((slot, i) => (
              <div
                key={i}
                onClick={() => {
                  setTime(slot);
                  setShowTimePicker(false);
                }}
                className="px-4 py-2 hover:bg-pink-50 cursor-pointer"
              >
                {slot}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <label className="block text-base font-semibold text-gray-800 mb-2 flex items-center gap-1">
        <MapPin className="text-[#BF3366]" size={18} /> Where will the event take place?
      </label>

      {/* Country */}
      <div className="relative mb-4">
        <div
          onClick={() => setShowCountryList(!showCountryList)}
          className="p-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer bg-white"
        >
          <span>{country || 'Select Country *'}</span>
          <ChevronDown size={18} className="text-gray-400" />
        </div>
        {showCountryList && (
          <div className="absolute z-10 top-full mt-2 max-h-60 overflow-y-auto border border-gray-300 bg-white shadow rounded-lg w-full">
            {countries.map((c, i) => (
              <div
                key={i}
                onClick={() => {
                  setCountry(c);
                  setShowCountryList(false);
                }}
                className="px-4 py-2 hover:bg-pink-50 cursor-pointer"
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Remaining Address Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Region (Optional)"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="City *"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Postal Code *"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Street *"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Number *"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Venue Name */}
     <label className="block text-base font-semibold text-gray-800 mb-1">Name of venue (optional)</label>
<textarea
  placeholder="e.g. Raj Mahal Banquet, near Clock Tower, Dehradun"
  value={venueName}
  onChange={(e) => setVenueName(e.target.value)}
  rows={3}
  className="w-full p-3 border border-gray-300 rounded-lg resize-none"
/>
<p className="text-sm text-gray-500 mt-1">
  You can also include nearby landmarks or directions to help travelers.
</p>

    </div>
  );
};

export default ShaadiInfo;
