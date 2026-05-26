'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StaggerContainer from '@/components/animations/StaggerContainer';
import FadeUpItem from '@/components/animations/FadeUpItem';

// Mock images - Replace these with your actual Cloudinary URLs
const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089560/imgi_19_655211024_18082785305364612_6761735849518066849_n_xd77bt.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089560/imgi_17_649229275_17934758772036996_4687217421726587641_n_aoercy.jpg", 
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089556/imgi_18_653753436_18117685210631705_1956906471125708863_n_pt4krk.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089556/imgi_30_651248121_17988676949944360_3706324190513641573_n_zlnmpt.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089552/imgi_31_655968132_18091464995176591_2496918486464619544_n_ifxl3u.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089551/imgi_29_655693639_18108656683630961_3591965194167793292_n_n7hcjp.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089551/imgi_28_649859305_17975274029843285_1120475462290340074_n_ip9oml.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089557/imgi_15_627673929_18102173224804523_5969366431362652229_n_xaglkm.jpg" 
];

export default function CampusGallery() {
  const [radius, setRadius] = useState(250);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(150);
      } else if (window.innerWidth < 1024) {
        setRadius(200);
      } else {
        setRadius(250);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-24 px-4 overflow-hidden relative" id="campus-life">
      {/* Wrapped in StaggerContainer so the text and the roulette load sequentially */}
      <StaggerContainer onScroll={true} delay={0.2} stagger={0.2} className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Section Headers */}
        <FadeUpItem>
          <p className="text-sm font-bold tracking-[0.2em] text-[#A93226] uppercase mb-4">
            Campus Life
          </p>
        </FadeUpItem>
        
        <FadeUpItem>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3B2353] mb-12 lg:mb-24">
            Experience MTSS
          </h2>
        </FadeUpItem>

        {/* The Roulette Container - Glides up as one unified element */}
        <FadeUpItem>
          <div 
            className="relative mx-auto flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px] w-full max-w-[600px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* The Spinning Track */}
            <div 
              className="absolute inset-0 flex items-center justify-center w-full h-full"
              style={{
                animation: 'spin-slow 40s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running'
              }}
            >
              {GALLERY_IMAGES.map((src, index) => {
                const angle = (index / GALLERY_IMAGES.length) * 360;
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <div
                    key={index}
                    className="absolute group"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    {/* The Image Container */}
                    <div 
                      className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white transition-all duration-300 group-hover:scale-[1.8] group-hover:z-50 cursor-pointer"
                      style={{
                         animation: 'counter-spin-slow 40s linear infinite',
                         animationPlayState: isHovered ? 'paused' : 'running'
                      }}
                    >
                      <Image
                        src={src}
                        alt={`Campus Life ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                      />
                      
                      {/* Dimming overlay on non-hovered images */}
                      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'group-hover:opacity-0 opacity-100' : 'opacity-0'}`}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The Fixed Center Button */}
            <div className="absolute z-20 flex items-center justify-center w-full h-full pointer-events-none">
              <Link 
                href="/gallery" 
                className="pointer-events-auto flex items-center justify-center w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-[#3B2353] text-[#D4AF37] border-8 border-white shadow-2xl hover:bg-[#A93226] hover:text-white transition-all duration-300 group"
              >
                <div className="flex flex-col items-center">
                  <span className="font-serif font-bold text-lg sm:text-xl text-center leading-tight">
                    View Full<br/>Gallery
                  </span>
                  <svg 
                    className="w-6 h-6 mt-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>

          </div>
        </FadeUpItem>
      </StaggerContainer>

      {/* Global Styles for the Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}} />
    </section>
  );
}