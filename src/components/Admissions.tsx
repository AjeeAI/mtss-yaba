import Link from 'next/link';

export default function Admissions() {
  const requirements = [
    "Age 10-16 years",
    "Photocopy of Birth Certificate",
    "Last School report/testimonial",
    "Certified medical report",
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-20" id="admissions">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#A93226] mb-12 max-w-3xl mx-auto leading-tight">
          Enroll Your Child in the Army of Valiant Christian Scholars
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Requirements Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#3B2353] hover:shadow-xl transition-shadow duration-300">
            <h3 className="font-bold text-[#3B2353] text-xl mb-6 flex items-center gap-2">
              {/* Clipboard Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Requirements
            </h3>
            <ul className="space-y-4">
              {requirements.map((req) => (
                <li key={req} className="flex items-start text-sm text-gray-700">
                  {/* Custom Checkmark SVG */}
                  <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notice Card */}
          <div className="md:col-span-2 bg-red-50 p-8 md:p-10 rounded-xl border-2 border-dashed border-[#A93226] relative overflow-hidden group">
            
            {/* Background Watermark SVG (Bank/Institution) */}
            <svg 
              className="absolute -right-4 -bottom-4 w-64 h-64 text-[#A93226] opacity-5 transform group-hover:scale-105 transition-transform duration-700" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z" />
            </svg>

            <div className="relative z-10">
              <h3 className="text-[#A93226] font-bold text-xl flex items-center gap-2 mb-4">
                {/* Warning Triangle SVG */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Important Notice
              </h3>
              
              <p className="font-bold text-lg md:text-xl mb-4 text-gray-900 uppercase tracking-wide">
                Please NOTE: No Cash Payments Are Allowed. Only official bank transactions are recognized.
              </p>
              
              <p className="text-base text-gray-700 mb-8 max-w-2xl leading-relaxed">
                Ensure all payments are made through our secure online portal or designated banking partners to secure your child's placement. Beware of fraudulent accounts.
              </p>
              
              {/* Linked CTA Button */}
              <Link 
                href="/apply" 
                className="inline-flex items-center justify-center bg-[#A93226] text-white px-8 py-3.5 rounded-md font-bold tracking-wide hover:bg-[#8B281F] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Start Online Application
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}