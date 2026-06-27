import Image from 'next/image';
import StaggerContainer from '@/components/animations/StaggerContainer';
import FadeUpItem from '@/components/animations/FadeUpItem';

export default function FounderMessage() {
  const values = [
    { 
      title: "Spirit-Led Education", 
      desc: "Guided by faith and divine purpose.",
      // Flame Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      )
    },
    { 
      title: "Academic Prowess", 
      desc: "Rigorous curriculum for global readiness.",
      // Book Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      title: "Moral Integrity", 
      desc: "Character building based on biblical truth.",
      // Scale/Balance Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    { 
      title: "Total Discipline", 
      desc: "Structuring minds for leadership.",
      // Shield Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Proprietor Image */}
        {/* We wrap the image block in a StaggerContainer so it animates when in view */}
        <StaggerContainer onScroll={true} className="relative w-full max-w-md mx-auto lg:mx-0">
          <FadeUpItem>
            {/* Decorative offset border */}
            <div className="absolute inset-0 bg-[#D4AF37] rounded-lg translate-x-4 translate-y-4"></div>
            
            <div className="relative h-[550px] w-full rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dzt3imk5w/image/upload/v1782462437/IMG-20260625-WA0014_ydze7t.jpg" 
                alt="Dr. D.K. Olukoya" 
                className="object-cover w-full h-full" 
              />
            </div>
          </FadeUpItem>
        </StaggerContainer>

        {/* Right Side: Text Content */}
        {/* We use onScroll={true} so this sequence starts only when the user reaches this section */}
        <StaggerContainer onScroll={true} delay={0.2} stagger={0.15} className="flex flex-col">
          
          <FadeUpItem>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3B2353] mb-3 leading-tight">
              A Word from Our Proprietor
            </h2>
          </FadeUpItem>
          
          <FadeUpItem>
            <p className="text-sm font-bold tracking-[0.2em] text-[#A93226] uppercase mb-8">
              Dr. D.K. Olukoya
            </p>
          </FadeUpItem>
          
          <FadeUpItem>
            <blockquote className="relative text-xl md:text-2xl font-serif italic text-gray-700 border-l-4 border-[#D4AF37] pl-8 mb-12 leading-relaxed">
              <span className="absolute -top-4 -left-3 text-5xl text-[#D4AF37] opacity-40 font-serif">"</span>
              Nobody comes to the Mountain of Fire and Miracles Ministries by chance. God brings people... so that their potentials may be made manifest, their destinies recovered, and to become what God wants them to become.
            </blockquote>
          </FadeUpItem>
          
          {/* 2x2 Core Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {values.map((v) => (
              // Each core value card fades up individually in sequence
              <FadeUpItem key={v.title} className="flex flex-col items-start group">
                <div className="mb-3 p-3 bg-red-50 rounded-lg group-hover:bg-[#A93226] transition-colors duration-300">
                  <div className="text-[#A93226] group-hover:text-white transition-colors duration-300">
                    {v.icon}
                  </div>
                </div>
                <h4 className="font-bold text-[#3B2353] text-lg mb-1">{v.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </FadeUpItem>
            ))}
          </div>
          
        </StaggerContainer>
      </div>
    </section> 
  );
}