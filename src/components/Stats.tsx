'use client';
import React from 'react';
import StaggerContainer from '@/components/animations/StaggerContainer';
import FadeUpItem from '@/components/animations/FadeUpItem';

export default function Stats() {
  const stats = [
    {
      id: 1,
      value: "100%",
      label: "WAEC Pass Rate",
      description: "Consistent excellence in national examinations year after year."
    },
    {
      id: 2,
      value: "300+",
      label: "Average JAMB Score",
      description: "Preparing scholars for top-tier university admissions."
    },
    {
      id: 3,
      value: "1:15",
      label: "Teacher-Student Ratio",
      description: "Personalized attention to ensure no child is left behind."
    },
    {
      id: 4,
      value: "15+",
      label: "Clubs & Societies",
      description: "From Robotics to Orchestra, we build well-rounded individuals."
    }
  ];

  return (
    <section id="academics" className="py-20 px-6 md:px-12 lg:px-20 border-y border-gray-100 overflow-hidden">
      {/* 1. Wrap the main content in our StaggerContainer */}
      <StaggerContainer onScroll={true} delay={0.2} stagger={0.15} className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        {/* 2. Fade up the header group first */}
        <FadeUpItem className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-[#A93226] uppercase mb-2">
            Proven Excellence
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3B2353]">
            Our Academic Track Record
          </h2>
        </FadeUpItem>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            /* 3. Convert the individual cards into FadeUpItems */
            /* Notice how we just pass the Tailwind classes straight into our custom component! */
            <FadeUpItem 
              key={stat.id} 
              className="group relative p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Subtle accent line on top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#D4AF37] rounded-b-md transition-all duration-300 group-hover:w-full group-hover:bg-[#A93226]"></div>
              
              <div className="text-center mt-4">
                <h3 className="text-5xl font-black text-[#3B2353] mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-lg font-bold text-gray-900 mb-3">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </FadeUpItem>
          ))}
        </div>

      </StaggerContainer>
    </section>
  );
}