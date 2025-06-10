    import React from 'react';
    import {
    Heart,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Sparkles
    } from 'lucide-react';
    import logo from '../assets/arch.png'

    export default function Footer() {
    const footerLinks = {
        services: [
        { name: 'Matchmaking', href: '/services' },
        { name: 'Wedding Planning', href: '/services' },
        { name: 'Photography', href: '/services' },
        { name: 'Event Planning', href: '/services' }
        ],
        company: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/about' },
        { name: 'Success Stories', href: '/testimonials' },
        { name: 'Gallery', href: '/gallery' }
        ],
        support: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/contact' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Youtube, href: '#', label: 'YouTube' }
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Main Footer */}
        <div className="mx-auto px-4 py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div>
                <div className="flex items-start sm:items-center space-x-3 mb-6">
                <div className="relative">
                    <div className="absolute inset-0 rounded-xl blur-lg opacity-30"></div>
                    <div className="relative bg-white  p-2.5 rounded-xl shadow-lg">
                    <img src={logo} className='w-10 h-10' />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 bg-clip-text text-transparent tracking-tight">
                    Join Our Shaadi
                    </span>
                </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                Creating beautiful love stories and unforgettable weddings for over 15 years.
                Your perfect match and dream wedding await.
                </p>

                <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 text-sm">
                    <Phone className="h-4 w-4 text-rose-400" />
                    <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 text-sm">
                    <Mail className="h-4 w-4 text-rose-400" />
                    <span>hello@joinourshaadi.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 text-sm">
                    <MapPin className="h-4 w-4 text-rose-400" />
                    <span>123 Love Street, NY 10001</span>
                </div>
                </div>
            </div>

            {/* Dynamic Link Sections */}
            {['services', 'company', 'support'].map((sectionKey) => (
                <div key={sectionKey}>
                <h3 className="text-lg font-bold mb-6 text-white capitalize">{
                    sectionKey === 'services' ? 'Our Services' : sectionKey
                }</h3>
                <ul className="space-y-3">
                    {footerLinks[sectionKey].map((link, index) => (
                    <li key={index}>
                        <a
                        href={link.href}
                        className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center group"
                        >
                        <span className="w-2 h-2 bg-rose-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.name}
                        </a>
                    </li>
                    ))}
                </ul>

                {sectionKey === 'support' && (
                    <div className="mt-8">
                    <h4 className="text-sm font-semibold mb-4 text-gray-400 uppercase tracking-wide">Follow Us</h4>
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            aria-label={social.label}
                            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                        >
                            <social.icon className="h-4 w-4" />
                        </a>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-gray-300 text-sm">Get the latest love stories and wedding inspiration delivered to your inbox.</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder-gray-400"
                />
                <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Subscribe</span>
                    <Heart className="h-4 w-4" fill="currentColor" />
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="text-gray-400 text-sm">
                © 2025 Join Our Shaadi. All rights reserved. Made with <Heart className="h-4 w-4 inline text-rose-400" fill="currentColor" /> for love.
                </div>
                <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors duration-300">Cookie Policy</a>
                </div>
            </div>
            </div>
        </div>
        </footer>
    );
    }
