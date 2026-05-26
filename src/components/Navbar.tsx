'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useScrollspy } from '@/hooks/useScrollspy';

const navLinks = [
  { name: 'Home', href: '/#home', id: 'home' },
  { name: 'About MTSS', href: '/#about', id: 'about' },
  { name: 'Academics', href: '/#academics', id: 'academics' },
  { name: 'Campus Life', href: '/#campus-life', id: 'campus-life' },
  { name: 'Reviews', href: '/#testimonials', id: 'testimonials' },
  { name: 'Full Gallery', href: '/gallery', id: 'gallery' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  const hashIds = navLinks.filter(link => link.href.includes('#')).map(link => link.id);
  const activeSection = useScrollspy(hashIds);

  useEffect(() => {
    const handleScrollBackground = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScrollBackground);
    return () => window.removeEventListener('scroll', handleScrollBackground);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    setIsOpen(false); 

    const isHomePage = pathname === '/';
    const isHashLink = href.startsWith('/#');

    if (isHomePage && isHashLink) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (isHomePage && href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const checkIsActive = (linkHref: string, linkId: string) => {
    if (pathname === '/') {
      if (linkHref === '/') return activeSection === 'home' || activeSection === '';
      if (linkHref.startsWith('/#')) return activeSection === linkId;
      return false;
    } else {
      return pathname.startsWith(linkHref) && linkHref !== '/';
    }
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== '/' 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 py-1' 
          : 'bg-transparent border-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section Replaced */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="relative block w-14 h-14 md:w-16 md:h-16 transition-transform hover:scale-105 duration-300"
            >
              <Image 
                src="https://res.cloudinary.com/dzt3imk5w/image/upload/v1779699881/ChatGPT_Image_May_25_2026_12_29_14_AM_ruhvv5.png" 
                alt="MTSS Logo" 
                fill
                className="object-contain drop-shadow-md"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link.href, link.id);
              
              return (
                <div key={link.name} className="relative flex flex-col items-center group h-20 justify-center">
                  <div className={`absolute top-0 w-full h-[3px] bg-[#D4AF37] transition-transform duration-300 origin-top ${
                    isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'
                  }`}></div>
                  
                  <Link 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isScrolled || pathname !== '/'
                        ? (isActive ? 'text-[#3B2353] font-bold' : 'text-gray-800 hover:text-[#A93226]')
                        : (isActive ? 'text-white font-bold drop-shadow-md' : 'text-white/90 hover:text-[#D4AF37] drop-shadow-md')
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/#admissions"
              onClick={(e) => handleNavClick(e, '/#admissions', 'admissions')} 
              className={`px-5 py-2 text-sm font-bold bg-[#D4AF37] text-[#3B2353] rounded hover:bg-[#c5a130] transition-colors cursor-pointer ${
                isScrolled || pathname !== '/' ? 'shadow-sm' : 'shadow-lg'
              }`}
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors duration-300 ${
                isScrolled || pathname !== '/' ? 'text-[#3B2353]' : 'text-white drop-shadow-md'
              }`}
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
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 pb-4 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link.href, link.id);
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive ? 'text-[#3B2353] bg-[#D4AF37]/10 border-l-4 border-[#D4AF37]' : 'text-gray-700 hover:text-[#A93226] hover:bg-white/50 border-l-4 border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-col space-y-3 px-3">
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-center px-5 py-3 text-sm font-bold border border-[#3B2353] text-[#3B2353] rounded hover:bg-[#3B2353] hover:text-white transition-colors">
                Portal Login
              </Link>
              <Link 
                href="/#admissions" 
                onClick={(e) => handleNavClick(e, '/#admissions', 'admissions')} 
                className="text-center px-5 py-3 text-sm font-bold bg-[#D4AF37] text-[#3B2353] rounded hover:bg-[#c5a130] transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}