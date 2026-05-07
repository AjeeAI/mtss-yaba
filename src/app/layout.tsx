import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mountain Top Secondary School | Onike Yaba",
    template: "%s | MTSS Onike Yaba",
  },
  description: "Raising a Total Child: Spiritually, Academically, and Morally Sound. Join the Army of Valiant Christian Scholars at Mountain Top Secondary School, Onike Yaba.",
  keywords: ["MTSS", "Mountain Top Secondary School", "Olukoya School", "Best Schools in Yaba", "Christian Schools Lagos", "Secondary School Admissions Nigeria"],
  authors: [{ name: "MTSS Onike Yaba" }],
  creator: "MTSS Onike Yaba",
  
  // Open Graph (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://mtssonikeyaba.sch.ng", // Update this when you buy your actual domain
    siteName: "MTSS Onike Yaba",
    title: "Mountain Top Secondary School | Admissions Open",
    description: "Start your child's journey at MTSS. Academic excellence meets spiritual fire.",
    images: [
      {
        // Using the Cloudinary URL you provided earlier
        url: "https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089560/imgi_19_655211024_18082785305364612_6761735849518066849_n_xd77bt.jpg", 
        width: 1200,
        height: 630,
        alt: "Mountain Top Secondary School Campus",
      },
    ],
  },

  // Twitter/X Card
  twitter: {
    card: "summary_large_image",
    title: "MTSS Onike Yaba - Raising a Total Child",
    description: "Enroll your child in the Army of Valiant Christian Scholars.",
    images: ["https://res.cloudinary.com/dzt3imk5w/image/upload/v1778089560/imgi_19_655211024_18082785305364612_6761735849518066849_n_xd77bt.jpg"],
  },

  // Favicon/Icons
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      {/* Added MTSS custom highlight colors for text selection */}
      <body className="min-h-full flex flex-col bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-[#3B2353]">
        {children}
      </body>
    </html>
  );
}