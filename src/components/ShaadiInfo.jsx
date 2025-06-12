import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, MapPin, ChevronDown, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

  const [events, setEvents] = useState([
    { name: '', description: '', music: null, dressCode: '' }
  ]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((res) => res.json())
      .then((data) => {
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

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const addEvent = () => {
    setEvents([...events, { name: '', description: '', music: null, dressCode: '' }]);
  };

  const removeEvent = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
  };

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
      <label className="block mb-1 text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
      <div className="relative mb-4">
        <div
          onClick={() => setShowCountryList(!showCountryList)}
          className="p-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer bg-white"
        >
          <span>{country || 'Select Country'}</span>
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

      {/* Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Region</label>
          <input
            type="text"
            placeholder="Optional"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Postal Code <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Street <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
      </div>

      {/* Venue Name */}
      <label className="block text-base font-semibold text-gray-800 mb-1">
        Name of venue (optional)
      </label>
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

      {/* Event Details */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Please give us some additional details about the event(s) of this day
        </h3>

        {events.map((event, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 mb-6 bg-[#FFF7F9] relative"
          >
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeEvent(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
            )}

            <h4 className="font-semibold text-[#BF3366] mb-3">Event {index + 1}</h4>

            <label className="block text-sm font-medium mb-1">Name of the event / ceremony *</label>
            <input
              type="text"
              placeholder="e.g. Haldi, Mehndi, Sangeet"
              value={event.name}
              onChange={(e) => handleEventChange(index, 'name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3"
            />

            <label className="block text-sm font-medium mb-1">Event Description</label>
            <textarea
              placeholder="What will happen at this event?"
              value={event.description}
              onChange={(e) => handleEventChange(index, 'description', e.target.value)}
              rows={4}
              maxLength={1000}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 resize-none"
            />

        <label className="block font-medium mb-2">Will there be music and/or dancing?</label>
<div className="mb-4 flex items-center gap-4">
  <span className={`text-sm font-medium ${event.music === true ? 'text-[#BF3366]' : 'text-gray-500'}`}>
    Yes
  </span>
  
  <div
    onClick={() => handleEventChange(index, 'music', !event.music)}
    className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
      event.music ? 'bg-[#BF3366]' : 'bg-gray-300'
    }`}
  >
    <div
      className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
        event.music ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </div>

  <span className={`text-sm font-medium ${event.music === false ? 'text-[#BF3366]' : 'text-gray-500'}`}>
    No
  </span>
</div>



            <label className="block text-sm font-medium mb-1">Dress Code</label>
            <input
              type="text"
              placeholder="e.g. Traditional, Casual, Formal"
              value={event.dressCode}
              onChange={(e) => handleEventChange(index, 'dressCode', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addEvent}
          className="inline-block mt-4 px-4 py-2 bg-[#BF3366] text-white rounded-lg hover:bg-pink-700 transition"
        >
          + Add another function to this day
        </button>
      </div>
    </div>
  );
};

export default ShaadiInfo;
