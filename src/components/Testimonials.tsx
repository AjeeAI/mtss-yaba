'use client';
import React, { useState, useEffect } from 'react';
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
      quote: "Transferring my son here was the best decision we made. The teachers actually care, and the zero-tolerance policy for indiscipline gives us total peace of mind.",
      author: "Mr. Chukwuma E.",
      role: "Parent of JSS3 Student",
      rating: 5
    },
    {
      id: 3,
      quote: "As an alumnus, I can boldly say that the foundation I got at MTSS prepared me for the rigors of medical school. The standard remains exceptionally high.",
      author: "Dr. Kemi F.",
      role: "MTSS Alumni (Class of '18)",
      rating: 5
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="bg-[#3B2353] py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      
      {/* Decorative Background Elements - Left static for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <svg className="absolute -top-24 -right-24 w-96 h-96 text-white" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg className="absolute -bottom-24 -left-24 w-72 h-72 text-[#D4AF37]" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      {/* We wrap the main content in StaggerContainer */}
      <StaggerContainer onScroll={true} delay={0.2} stagger={0.2} className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <FadeUpItem className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-2">
            The MTSS Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
            Hear From Our Community
          </h2>
        </FadeUpItem>

        {/* Slideshow Container - Fades up as one unit */}
        <FadeUpItem className="relative">
          
          {/* Main Slide Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 text-white shadow-2xl transition-all duration-500 ease-in-out min-h-[300px] flex flex-col justify-between">
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 mb-8 justify-center text-[#D4AF37]">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 italic text-center text-white/95">
                "{testimonials[activeIndex].quote}"
              </blockquote>
            </div>

            {/* Author Info */}
            <div className="flex flex-col items-center gap-2 border-t border-white/20 pt-6">
              <div className="w-14 h-14 bg-[#A93226] rounded-full flex items-center justify-center font-bold text-xl mb-2">
                {testimonials[activeIndex].author.charAt(0)}
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{testimonials[activeIndex].author}</p>
                <p className="text-sm text-white/70">{testimonials[activeIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index 
                    ? 'w-8 h-3 bg-[#D4AF37]' 
                    : 'w-3 h-3 bg-white/30 hover:bg-white/60' 
                }`}
              />
            ))}
          </div>

        </FadeUpItem>
      </StaggerContainer>
    </section>
  );
}