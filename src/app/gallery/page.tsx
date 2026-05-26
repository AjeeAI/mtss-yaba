import Link from 'next/link';
import GalleryClientFilter from '@/components/GalleryClientFilter';
import Providers from '@/components/Providers';

export default function GalleryPage() {
  return (
    // Wrap the page in our new TanStack Provider
    <Providers>
      <main className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <Link 
            href="/#campus-life" 
            className="inline-flex items-center text-[#3B2353] hover:text-[#A93226] font-semibold mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3B2353] mb-4">
              MTSS in Pictures
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the vibrant life of our students. From rigorous academics to deep spiritual growth, see what makes Mountain Top Secondary School unique.
            </p>
          </div>

          <GalleryClientFilter />

        </div>
      </main>
    </Providers>
  );
}