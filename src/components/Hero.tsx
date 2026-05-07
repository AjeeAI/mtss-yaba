'use client'; // Required because we are using useState and useEffect
import { useState, useEffect } from 'react';

// Define your 9 images here
const backgroundImages = [
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089560/imgi_19_655211024_18082785305364612_6761735849518066849_n_xd77bt.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089560/imgi_17_649229275_17934758772036996_4687217421726587641_n_aoercy.jpg", // Placeholder 2
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089556/imgi_18_653753436_18117685210631705_1956906471125708863_n_pt4krk.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089556/imgi_30_651248121_17988676949944360_3706324190513641573_n_zlnmpt.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089552/imgi_31_655968132_18091464995176591_2496918486464619544_n_ifxl3u.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089551/imgi_29_655693639_18108656683630961_3591965194167793292_n_n7hcjp.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089551/imgi_28_649859305_17975274029843285_1120475462290340074_n_ip9oml.jpg",
  "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089557/imgi_15_627673929_18102173224804523_5969366431362652229_n_xaglkm.jpg" // Placeholder 3
  // ... Add the rest of your 9 images here
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Set up the timer to change the image every 5 seconds (5000ms)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      
      {/* 1. The Image Slideshow */}
      {backgroundImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url("${src}")` }}
        />
      ))}
      
      {/* 2. Dark Overlay for Text Readability (Increased z-index to sit above images) */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 3. Bottom Gradient Fade (Blends smoothly into the next section) */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent z-10" />

      {/* 4. Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 flex flex-col items-center pb-12">
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-bold text-white mb-6 leading-[1.15] drop-shadow-lg">
          Raising a Total Child: Spiritually, Academically, and Morally Sound.
        </h1>
        
        <p className="text-lg md:text-xl text-white/95 font-light mb-10 max-w-3xl drop-shadow-md">
          Welcome to Mountain Top Secondary School, where academic excellence meets spiritual fire.
        </p>
        
        <button className="bg-[#D4AF37] hover:bg-[#c5a130] text-[#3B2353] font-bold py-4 px-10 rounded text-sm tracking-wide transition-all shadow-xl hover:-translate-y-1">
          Discover Our Mission
        </button>
      </div>
    </section>
  );
}