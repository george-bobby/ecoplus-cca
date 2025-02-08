"use client";
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaFax, FaEnvelope, FaGlobe } from 'react-icons/fa';

export default function Footer() {
    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll effect
        });
    };

    return (
        <footer className="bg-[#D7ECD9] py-10">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 text-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Details */}
                    <div>
                        <h2 className="text-[#376d08] font-bold text-lg">CHRIST</h2>
                        <p className="text-sm text-[#376d08]">(Deemed to be University)</p>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center text-[#376d08] gap-4">
                                <FaMapMarkerAlt className="text-l flex-shrink-0" />
                                <p className="text-sm text-[#376d08] sm:text-base">
                                    Hosur Main Road, Bhavani Nagar, S.G. Palya, <br />
                                    Bengaluru - 560029, Karnataka, India
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaPhoneAlt className="text-l text-[#376d08] flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-[#376d08] sm:text-base">+91 804012 9100</p>
                                    <p className="text-sm text-[#376d08] sm:text-base">+91 804012 9600</p>
                                </div>
                            </div>

                            <div className="flex items-start text-[#376d08] gap-4">
                                <FaFax className="text-l" />
                                <p className="text-sm text-[#376d08] sm:text-base">Fax : 40129000</p>
                            </div>
                            <div className="flex items-start text-[#376d08] gap-4">
                                <FaEnvelope className="text-l text-[#376d08] flex-shrink-0" />
                                <a
                                    href="mailto:mail@christuniversity.in"
                                    className="hover:text-sky-400 text-[#376d08] transition text-sm sm:text-base"
                                    style={{ color: 'inherit' }}
                                >
                                    mail@christuniversity.in
                                </a>
                            </div>

                            <div className="flex items-start text-[#376d08] gap-4">
                                <FaGlobe className="text-l" />
                                <a
                                    href="http://www.christuniversity.in"
                                    className="hover:text-sky-400 text-[#376d08] transition text-sm sm:text-base"
                                >
                                    www.christuniversity.in
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Vision and Mission */}
                    <div>
                        <h3 className="text-[#376d08] font-serif text-base sm:text-lg font-semibold mb-4">Vision</h3>
                        <p className="font-serif text-sm sm:text-base leading-relaxed text-[#376d08]">
                            EXCELLENCE AND SERVICE
                        </p>
                        <h3 className="text-[#376d08] font-serif text-base sm:text-lg font-semibold mt-6 mb-4">Mission</h3>
                        <p className="font-serif text-sm sm:text-base leading-relaxed text-[#376d08]">
                            CHRIST (Deemed to be University) is a nurturing ground for an individual's
                            holistic development to make an effective contribution to society in a dynamic
                            environment.
                        </p>
                    </div>

                    {/* About Us */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <img 
                            src="ccalogo.webp" 
                            alt="CCA Logo" 
                            className="mb-2 w-48 h-48 object-contain max-w-full max-h-full"
                            style={{ marginTop: '-16px', marginBottom: '8px' }} // Reduce blank space above the logo
                        />
                        <h3 className="text-[#376d08] font-serif text-base sm:text-lg font-semibold mb-3">About Us</h3>
                        <p className="font-serif text-sm sm:text-base leading-relaxed text-[#376d08] max-w-md">
                            Christites for Climate Action (CCA) is a student-led initiative at CHRIST (Deemed to be University). Focused on promoting sustainability and raising awareness about climate change, CCA inspires eco-friendly practices and aligns with global efforts like the United Nations Sustainable Development Goals, particularly Goal 13.
                        </p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-gray-500 pt-6 text-center text-[#376d08] text-sm">
                    <p>Copyright © CHRIST (Deemed to be University) 2025</p>
                </div>
            </div>

        </footer>
    );
}
