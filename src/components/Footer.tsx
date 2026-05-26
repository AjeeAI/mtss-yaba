'use client';
import Link from 'next/link';
import StaggerContainer from '@/components/animations/StaggerContainer';
import FadeUpItem from '@/components/animations/FadeUpItem';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3B2353] text-white py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      <StaggerContainer onScroll={true} delay={0.1} stagger={0.1} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* 1. Brand Section */}
        <FadeUpItem>
          <h4 className="font-serif font-bold mb-4 text-[#D4AF37] text-2xl tracking-widest">MTSS</h4>
          <p className="text-sm italic opacity-90 leading-relaxed pr-4">
            "Raising an army of valiant Christian scholars equipped to lead and transform their generation."
          </p>
        </FadeUpItem>

        {/* 2. Quick Links */}
        <FadeUpItem>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#D4AF37]">Quick Links</h4>
          <ul className="text-sm space-y-4 opacity-80">
            <li>
              <Link href="/#about" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> About Us
              </Link>
            </li>
            <li>
              <Link href="/#academics" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> Academics
              </Link>
            </li>
            <li>
              <Link href="/#campus-life" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> Campus Life
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> Full Gallery
              </Link>
            </li>
          </ul>
        </FadeUpItem>

        {/* 3. Admissions & Portal */}
        <FadeUpItem>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#D4AF37]">Admissions</h4>
          <ul className="text-sm space-y-4 opacity-80">
            <li>
              <Link href="/#admissions" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> How to Apply
              </Link>
            </li>
            <li>
              <a href="https://form.typeform.com/to/lcW39zo1" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> Start Application
              </a>
            </li>
            <li>
              <Link href="/login" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> Student Portal
              </Link>
            </li>
          </ul>
        </FadeUpItem>

        {/* 4. Contact / Location & Socials */}
        <FadeUpItem>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#D4AF37]">Contact Us</h4>
          <address className="text-sm space-y-3 opacity-80 not-italic leading-relaxed mb-6">
            <p className="flex items-start gap-3">
              <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Mountain Top City,<br/>Lagos-Ibadan Expressway,<br/>Ogun State, Nigeria.</span>
            </p>
            <p className="flex items-center gap-3 pt-2">
              <svg className="w-5 h-5 shrink-0 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:mountaintopiwaya@gmail.com" className="hover:text-[#D4AF37] transition-colors duration-300">
                mountaintopiwaya@gmail.com
              </a>
            </p>
          </address>

          {/* Social Media Links (Left Aligned to match reference image) */}
          <div className="flex justify-start items-center gap-6 pt-2">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/mountaintop_school?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </FadeUpItem>

      </StaggerContainer>

      {/* Bottom Copyright Bar */}
      <FadeUpItem className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
        <p>© {currentYear} Mountain Top Secondary School. All rights reserved.</p>
        <p>Built with purpose and excellence.</p>
      </FadeUpItem>
    </footer>
  );
}