import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { weddingData } from '../../data';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';

const Weddings = ({ title, subtitle, button }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredWeddings, setFilteredWeddings] = useState(weddingData);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const formatted = format(selectedDate, 'yyyy-MM-dd');
      const filtered = weddingData.filter(w => w.date === formatted);
      setFilteredWeddings(filtered);
    } else {
      setFilteredWeddings(weddingData);
    }
  }, [selectedDate]);

  return (
    <section
      className={`bg-gradient-to-br from-[#FFE4EC] via-[#FFF0EA] to-[#FFE6E6] ${
        filteredWeddings.length === 0 ? 'py-12' : 'py-20'
      } px-4 sm:px-10 md:px-24 text-center`}
    >
      {/* Header */}
      <div data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-[#AD4379] mb-4">{title}</h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Calendar */}
      {!button && (
        <div className="mt-12 flex justify-center" data-aos="fade-up">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Choose a wedding date"
            dateFormat="yyyy-MM-dd"
            isClearable
            calendarClassName="custom-datepicker"
            customInput={
              <div className="relative flex items-center px-5 py-2 pl-4 pr-10 rounded-full border border-[#AD4379] bg-white text-[#AD4379] shadow-md hover:border-[#E05297] transition duration-300 cursor-pointer">
                <CalendarDays className="w-5 h-5 text-[#AD4379] mr-2" />
                <span className="text-sm truncate">
                  {selectedDate ? format(selectedDate, 'dd MMM yyyy') : 'Choose a wedding date'}
                </span>
              </div>
            }
          />
        </div>
      )}

      {/* Cards Grid */}
      <div
        className={`${
          filteredWeddings.length === 0 ? 'mt-8 mb-40' : 'mt-16 mb-0'
        } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`}
      >
        {filteredWeddings.length > 0 ? (
          filteredWeddings.map((wedding) => (
            <div
              key={wedding.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={wedding.image}
                alt={wedding.couple}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold text-[#AD4379]">{wedding.couple}</h3>
                <p className="text-sm text-gray-600 mt-1">{wedding.location}</p>
                <p className="text-sm text-gray-500">{wedding.date}</p>

                <button  onClick={() => navigate('/details', { state: { wedding } })} className="focus:outline-none mt-5 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#AD4379] to-[#E05297] text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition duration-300 hover:shadow-xl">
                  <FaHeart className="text-sm" />
                  Join Wedding
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center py-20 min-h-[200px] flex items-center justify-center">
            No weddings found for the selected date.
          </p>
        )}
      </div>

      {/* CTA Button */}
      {button && (
        <div data-aos="fade-up" data-aos-delay="200" className="mt-16">
            <button
              onClick={() => navigate('/weddings')}
              className="focus:outline-none bg-white border border-[#AD4379] text-[#AD4379]  hover:border-pink-400 hover:text-pink-400 transition-all duration-300 px-6 py-3 rounded-full font-semibold text-sm shadow hover:shadow-md"
            >
              See all upcoming weddings
            </button>
        </div>
      )}
    </section>
  );
};

export default Weddings;
