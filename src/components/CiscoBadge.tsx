'use client';
import Image from 'next/image';
import StaggerContainer from '@/components/animations/StaggerContainer';
import FadeUpItem from '@/components/animations/FadeUpItem';

export default function CiscoBadge() {
  return (
    <section className="py-16 bg-[#3B2353] relative z-10 border-t border-white/10">
      <StaggerContainer onScroll={true} className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        <FadeUpItem>
          <p className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-8">
            Official Technology Partner & Academy
          </p>
        </FadeUpItem>

        <FadeUpItem>
          {/* 🚨 WRAPPED IN AN ANCHOR TAG TO ENABLE NAVIGATION */}
          <a 
            href="https://unitesict.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block relative w-40 h-40 md:w-56 md:h-56 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
          >
            
            <div className="relative w-full h-full">
              <Image
                src="https://res.cloudinary.com/dzt3imk5w/image/upload/v1779741408/ChatGPT_Image_May_25_2026_09_35_34_PM_e0tre9.png" 
                alt="Cisco Certified Academy Badge"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 160px, 224px"
              />
            </div>
          </a>
        </FadeUpItem>
        
        <FadeUpItem>
          <p className="text-sm text-white/90 font-medium mt-8 max-w-lg mx-auto leading-relaxed">
            MTSS is a proudly certified Cisco Networking Academy, equipping our scholars with globally recognized IT skills for the future.
          </p>
        </FadeUpItem>

      </StaggerContainer>
    </section>
  );
}