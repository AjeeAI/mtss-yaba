'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', active: true },
    { name: 'About Us', href: '/about' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Academics', href: '/academics' },
    { name: 'Student Life', href: '/student-life' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    // GURU TWEAK: Replaced 'bg-white' with 'bg-white/70 backdrop-blur-md'
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif font-bold text-[#3B2353] tracking-widest">
              MTSS
            </Link>
          </div>

          {/* 2. Desktop Navigation (Centered) */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative flex flex-col items-center group h-20 justify-center">
                {/* Gold Active Indicator Line */}
                {link.active && (
                  <div className="absolute top-0 w-full h-[3px] bg-[#D4AF37]"></div>
                )}
                <Link 
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    link.active ? 'text-[#3B2353] font-bold' : 'text-gray-600 hover:text-[#800000]'
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* 3. CTA Buttons (Right Aligned) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              // Added background opacity to the button hover state to match the glass theme
              className="px-5 py-2 text-sm font-bold border border-gray-300 text-[#3B2353] rounded hover:bg-white/50 transition-colors"
            >
              Portal Login
            </Link>
            <Link 
              href="/admissions" 
              className="px-5 py-2 text-sm font-bold bg-[#D4AF37] text-[#3B2353] rounded hover:bg-[#c5a130] transition-colors shadow-sm"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Hamburger Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-[#3B2353] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        // GURU TWEAK: Applied glassmorphism to the mobile menu as well
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-100 pb-4 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  link.active ? 'text-[#3B2353] bg-[#D4AF37]/10 border-l-4 border-[#D4AF37]' : 'text-gray-700 hover:text-[#800000] hover:bg-white/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-col space-y-3 px-3">
              <Link href="/login" className="text-center px-5 py-3 text-sm font-bold border border-gray-300 text-[#3B2353] rounded hover:bg-white/50">
                Portal Login
              </Link>
              <Link href="/admissions" className="text-center px-5 py-3 text-sm font-bold bg-[#D4AF37] text-[#3B2353] rounded hover:bg-[#c5a130]">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}