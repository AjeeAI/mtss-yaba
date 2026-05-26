'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StaggerContainer from '@/components/animations/StaggerContainer';
import FadeUpItem from '@/components/animations/FadeUpItem';

const backgroundImages = [
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089560/imgi_19_655211024_18082785305364612_6761735849518066849_n_xd77bt.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089560/imgi_17_649229275_17934758772036996_4687217421726587641_n_aoercy.jpg", 
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089556/imgi_18_653753436_18117685210631705_1956906471125708863_n_pt4krk.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089556/imgi_30_651248121_17988676949944360_3706324190513641573_n_zlnmpt.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089552/imgi_31_655968132_18091464995176591_2496918486464619544_n_ifxl3u.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089551/imgi_29_655693639_18108656683630961_3591965194167793292_n_n7hcjp.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089551/imgi_28_649859305_17975274029843285_1120475462290340074_n_ip9oml.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089557/imgi_15_627673929_18102173224804523_5969366431362652229_n_xaglkm.jpg"
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Slideshow Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#3B2353]">
      
      {/* 1. The Image Slideshow Background */}
      {backgroundImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center mix-blend-overlay transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-40' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url("${src}")` }}
        />
      ))}

      {/* 2. Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* 3. Foreground Content with Framer Motion Stagger */}
      {/* Notice we use your original text here now! */}
      <StaggerContainer delay={0.3} stagger={0.2} className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center pb-12 text-center">
        
        <FadeUpItem>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-bold text-white my-10 mb-6 leading-[1.15] drop-shadow-lg">
            Raising a Total Child: <br className="hidden md:block"/>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">Spiritually, Academically, and Morally Sound.</span>
          </h1>
        </FadeUpItem>
        
        <FadeUpItem>
          <p className="text-lg md:text-xl text-white/95 font-light mb-10 max-w-3xl drop-shadow-md">
            Welcome to Mountain Top Secondary School, where academic excellence meets spiritual fire.
          </p>
        </FadeUpItem>
        
        <FadeUpItem className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/#about" 
            className="bg-[#D4AF37] hover:bg-[#c5a130] text-[#3B2353] font-bold py-4 px-10 rounded text-sm tracking-wide transition-all shadow-xl hover:-translate-y-1"
          >
            Discover Our Mission
          </Link>
          <Link 
            href="/#admissions" 
            className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-10 rounded text-sm tracking-wide transition-all shadow-xl hover:bg-white/20 hover:-translate-y-1"
          >
            Apply Now
          </Link>
        </FadeUpItem>

      </StaggerContainer>
      
      {/* 4. Bottom Gradient Fade (Reduced height and opacity) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent z-10 pointer-events-none" />

    </section>
  );
}