import Link from 'next/link';

export default function Footer() {
  // Dynamically grab the current year so you never have to update this again
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-mt-purple text-white py-12 px-8">
      {/* Added sm:grid-cols-2 for better tablet responsiveness */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* 1. Brand Section */}
        <div>
          <h4 className="font-serif font-bold mb-4 text-mt-gold text-xl tracking-wide">MTSS</h4>
          <p className="text-xs italic opacity-90">"Your destiny is secure in Christ."</p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="text-xs space-y-3 opacity-80">
            <li>
              <Link href="/admissions" className="hover:text-mt-gold transition-colors duration-200">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/curriculum" className="hover:text-mt-gold transition-colors duration-200">
                Curriculum
              </Link>
            </li>
            <li>
              <Link href="/campuses" className="hover:text-mt-gold transition-colors duration-200">
                Campuses
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Legal & Spirit */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Legal & Spirit</h4>
          <ul className="text-xs space-y-3 opacity-80">
            <li>
              <Link href="/privacy-policy" className="hover:text-mt-gold transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/spiritual-life" className="hover:text-mt-gold transition-colors duration-200">
                Spiritual Life
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Contact / Location (Filling the 4th Grid Column) */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
          {/* Using the semantic <address> tag */}
          <address className="text-xs space-y-2 opacity-80 not-italic">
            <p>Mountain Top City</p>
            <p>Lagos-Ibadan Expressway</p>
            <p className="pt-2">
              <a href="mailto:info@mtss.edu.ng" className="hover:text-mt-gold transition-colors duration-200">
                info@mtss.edu.ng
              </a>
            </p>
          </address>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="mt-12 pt-8 border-t border-white/20 text-center text-xs opacity-60">
        <p>© {currentYear} Mountain Top Secondary School. Raising a Total Child.</p>
      </div>
    </footer>
  );
}