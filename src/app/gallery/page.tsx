import Link from 'next/link';
import GalleryClientFilter from '@/components/GalleryClientFilter';
import Providers from '@/components/Providers';

export default function GalleryPage() {
  return (
    // Wrap the page in our TanStack Provider
    <Providers>
      <main className="min-h-screen bg-[#FDFBF7] relative overflow-hidden">
        
        {/* --- DECORATIVE BACKGROUND GRADIENT --- */}
        {/* This creates a soft, premium fade at the top of the page without distracting from the photos */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#3B2353]/5 via-[#A93226]/[0.02] to-transparent pointer-events-none z-0" />
        
        {/* Decorative Blur Orbs (Optional, adds a modern touch) */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#A93226]/5 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute top-[10%] left-[-5%] w-72 h-72 bg-[#3B2353]/5 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          
          {/* --- UPGRADED BACK BUTTON --- */}
          <Link 
            href="/#campus-life" 
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur border border-gray-200 text-sm font-semibold text-gray-500 hover:text-[#A93226] hover:border-[#A93226]/30 hover:shadow-md transition-all duration-300 mb-12 sm:mb-16 w-fit"
          >
            <div className="bg-gray-50 p-1 rounded-full group-hover:bg-[#A93226]/10 transition-colors">
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            Back to Home
          </Link>

          {/* --- ENHANCED HEADER --- */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-[#3B2353] mb-6">
              MTSS in <span className="text-[#A93226] relative inline-block">
                Pictures
                {/* Subtle underline accent */}
                <svg className="absolute w-full h-3 -bottom-1 sm:-bottom-2 left-0 text-[#A93226]/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Explore the vibrant life of our students. From rigorous academics to deep spiritual growth, see what makes Mountain Top Secondary School unique.
            </p>
          </div>

          {/* --- GALLERY COMPONENT --- */}
          <GalleryClientFilter />

        </div>
      </main>
    </Providers>
  );
}