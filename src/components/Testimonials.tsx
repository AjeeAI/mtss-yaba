'use client';
import React, { useState, useEffect, useCallback } from 'react';
import StaggerContainer from '@/components/animations/StaggerContainer';
import FadeUpItem from '@/components/animations/FadeUpItem';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "MTS is more than just a school; it is a place where destinies are nurtured, character is built, and future leaders are raised. I strongly recommend it to every parent.",
      author: "Mrs. Odunayo Adewale",
      role: "Parent",
      rating: 5
    },
    {
      id: 2,
      quote: "Mountain Top Schools is a wonderful experience, an experience in the upbringing of wonderful children where in area of children development in Academic, moral and spiritual is top notch, and in all these area what you have is what you get no bending the rule and this build strong confidence in the children and they are able to hold up there own in all area they found themselves, based on the strong foundation they are built upon. All we can say is to pray for the management and teachers, the Proprietor and the parents for God to continue to grant all, the strength to take our school to the greater height we desire because this is just the beginning IJN AMEN",
      author: "Adewale Adeyanju",
      role: "PTF CHAIRMAN",
      rating: 5
    },
    {
      id: 3,
      quote: "Mountain Top Primary School not only build children academically, they also build positive self esteem in children. An average mountain Top student is bold.",
      author: "Mrs Rebecca Temitope Oluwadurotimi",
      role: "Parent",
      rating: 5
    },
    {
      id: 4,
      quote: "Choosing a school for your child is one of the most significant decisions a parent can make, and our experience with MOUNTAINTOP SCHOOL has been nothing short of transformative. What truly sets this school apart is its beautiful blend of rigorous academic standards and deeply rooted moral values. In a world where education often focuses solely on grades, MOUNTAINTOP SCHOOL focuses on the whole person. The dedicated teachers and staff don’t just instruct; they mentor, guide, and model the values of compassion, integrity, and service every single day. Our child has not only excelled academically but has also grown into an empathetic, community-minded individual with a strong sense of purpose. The nurturing, faith-filled environment provides a safe space for students to explore their potential, build lifelong friendships, and develop a resilient character. If you are looking for an institution that champions both intellectual growth and spiritual grounding, MOUNTAINTOP SCHOOL is the perfect place. It is more than just a school—it is a community and a family.....",
      author: "Grace Chukwuemeka",
      role: "PTF",
      rating: 5
    },
    {
      id: 5,
      quote: "It has been a wonderful years knowing Mountain Top Schools. Enrolling my children at Mountain Top School has been one of the best decisions me and my wife made as a parent. The teachers and the non-teaching staffs are incredibly patient, communicative, and passionate about what they do. I have seen massive exponential development in my children's confidence, academic skills, and their spiritual life. Thanks to the administration and staffs of Mountain Top School for always creating a safe, engaging environment for their students. God Almighty will reward you and your home with great things, my wife and I really appreciate all your good works, care, and love towards the children. God bless you all in Jesus name, Amen.",
      author: "Mr. Owolabi",
      role: "Parent",
      rating: 5
    },
    {
      id: 6,
      quote: "Mountain Top Secondary School has truly been a wonderful school. It has been a citadel of learning, gift and talent development, and spiritual growth for the children. I sincerely appreciate the efforts of the management and teachers in positively shaping the lives of the students. I pray that God will continue to bless them all and increase the school on every side. Amen.",
      author: "Mrs. Taiwo Samuel",
      role: "Parent",
      rating: 5
    }
  ];

  // Component State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [maxLength, setMaxLength] = useState(160); // Default to mobile length for SSR safety

  // Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive Truncation Logic
  useEffect(() => {
    const handleResize = () => {
      // If screen is tablet/desktop (>= 768px), allow 320 chars (~4 lines). Otherwise 160.
      setMaxLength(window.innerWidth >= 768 ? 320 : 160);
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation Logic
  const nextTestimonial = useCallback(() => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  }, [testimonials.length]);

  // Swipe Handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  // Current Card Configuration
  const currentTestimonial = testimonials[activeIndex];
  const needsTruncation = currentTestimonial.quote.length > maxLength;
  const displayQuote = needsTruncation 
    ? currentTestimonial.quote.substring(0, maxLength).trim() + "..." 
    : currentTestimonial.quote;

  // Auto-rotate effect with Dependency Array controls
  useEffect(() => {
    if (isModalOpen || isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isModalOpen, isPaused, nextTestimonial]);

  return (
    <section id="testimonials" className="bg-[#3B2353] py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      
      {/* Custom Scrollbar Styling */}
      <style jsx global>{`
        .sleek-scrollbar::-webkit-scrollbar { width: 4px; }
        .sleek-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .sleek-scrollbar::-webkit-scrollbar-thumb { 
          background-color: rgba(255, 255, 255, 0.2); 
          border-radius: 10px; 
        }
        .sleek-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(255, 255, 255, 0.4); }
      `}</style>

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <svg className="absolute -top-24 -right-24 w-96 h-96 text-white" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      <StaggerContainer onScroll={true} delay={0.2} stagger={0.2} className="max-w-4xl mx-auto relative z-10 pb-16">
        <FadeUpItem className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-2">The MTSS Experience</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Hear From Our Community</h2>
        </FadeUpItem>

        {/* Carousel Wrapper with Events */}
        <div className="relative group">
          
          {/* Left Navigation Arrow */}
          <button 
            onClick={prevTestimonial}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Previous Testimonial"
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-[#D4AF37] transition-colors focus:outline-none hidden sm:block"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <FadeUpItem className="relative">
            {/* Main Card */}
            <div 
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white shadow-2xl transition-all duration-500 ease-in-out h-[420px] md:h-[450px] flex flex-col justify-between"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              
              {/* Text container */}
              <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-8 select-none">
                <div className="flex gap-1 mb-6 justify-center text-[#D4AF37]">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current shrink-0" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>

                <blockquote className="text-base md:text-xl leading-relaxed italic text-center text-white/95">
                  "{displayQuote}"
                </blockquote>
                
                {/* Trigger button for the modal */}
                {needsTruncation && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 mx-auto text-[#D4AF37] font-bold text-sm hover:underline tracking-wide uppercase transition-colors"
                  >
                    Read Full Testimony
                  </button>
                )}
              </div>

              {/* Author Section */}
              <div className="flex items-center justify-center gap-4 border-t border-white/20 py-6 px-8 md:px-12 shrink-0 bg-black/10 rounded-b-2xl">
                <div className="w-10 h-10 bg-[#A93226] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {currentTestimonial.author.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm">{currentTestimonial.author}</p>
                  <p className="text-xs text-white/70">{currentTestimonial.role}</p>
                </div>
              </div>
            </div>
          </FadeUpItem>

          {/* Right Navigation Arrow */}
          <button 
            onClick={nextTestimonial}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Next Testimonial"
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-[#D4AF37] transition-colors focus:outline-none hidden sm:block"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </StaggerContainer>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000); // Resume auto-play after 5s
            }}
            aria-label={`Go to testimonial ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === index ? 'w-6 h-1.5 bg-[#D4AF37]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Modal - Conditional Rendering */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#3B2353] border border-white/20 p-8 md:p-10 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative shadow-2xl animate-fade-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
            >
              ✕
            </button>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto pr-2 sleek-scrollbar">
               <div className="flex gap-1 mb-6 text-[#D4AF37]">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <blockquote className="text-base md:text-lg leading-relaxed italic text-white/95 mb-8">
                "{currentTestimonial.quote}"
              </blockquote>
            </div>

            {/* Modal Author Footer */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/20 shrink-0">
              <div className="w-12 h-12 bg-[#A93226] rounded-full flex items-center justify-center font-bold text-lg text-white">
                {currentTestimonial.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white text-base">{currentTestimonial.author}</p>
                <p className="text-sm text-[#D4AF37]">{currentTestimonial.role}</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}