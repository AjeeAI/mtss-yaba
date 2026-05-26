import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FounderMessage from '@/components/FounderMessage';
import Admissions from '@/components/Admissions';
import Footer from '@/components/Footer';
import CampusGallery from '@/components/CampusGallery';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import CiscoBadge from '@/components/CiscoBadge';

export default function Home() {
  return (
    // REMOVED 'bg-white' from this line!
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FounderMessage />
      <Stats />
      <Admissions />
      <CampusGallery />
      <Testimonials />
      <CiscoBadge/>
      <Footer />
    </main>
  );
}