import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sparkles } from 'lucide-react';
import logo from '../assets/arch.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


   useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 20,
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`w-full fixed top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-rose-100/50' 
          : 'bg-gradient-to-r from-rose-50/80 via-white/90 to-pink-50/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="/" 
            className="group flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
            
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relativep-2.5 rounded-xl shadow-lg">
               <img src={logo} className='w-10 h-10'/>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent tracking-tight">
                Join Our Shaadi
              </span>
             
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                 data-aos="fade-down"
                data-aos-delay={index * 100}
                className="relative px-4 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-rose-600 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100 to-pink-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </a>
            ))}
            
            <div className="ml-6 pl-6 border-l border-gray-200" data-aos="zoom-in" data-aos-delay="400">
              <button className="group relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Get Started</span>
                  <Heart className="h-4 w-4" fill="currentColor" />
                </span>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="relative p-2 rounded-xl text-gray-700 hover:text-rose-600 hover:bg-rose-50 focus:outline-none transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-rose-100/50 shadow-lg">
          <nav className="px-6 py-6 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: open ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-4 border-t border-gray-100">
              <button 
                className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  animationDelay: '200ms',
                  animation: open ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <Heart className="h-4 w-4" fill="currentColor" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}