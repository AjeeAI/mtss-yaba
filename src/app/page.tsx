import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FounderMessage from '@/components/FounderMessage';
import Admissions from '@/components/Admissions';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FounderMessage />
      <Admissions />
      <Footer />
    </main>
  );
}