'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  GraduationCap, 
  School, 
  Settings, 
  X, 
  Building2, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Store the actual Lucide component reference in the array
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Announcements', path: '/announcements', icon: Megaphone },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Faculty', path: '/faculty', icon: GraduationCap },
    { name: 'Classes', path: '/classes', icon: School },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside 
      className={`
        bg-admin-primary text-white w-[280px] h-screen fixed left-0 top-0 z-50 flex flex-col py-6 
        transition-transform duration-300 ease-in-out md:relative overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Brand Header */}
      <div className="px-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">MTSS Admin</h1>
          <p className="text-xs text-gray-300 opacity-80 mt-1 uppercase tracking-wider">Management Portal</p>
        </div>
        <button 
          onClick={onClose} 
          className="md:hidden text-white p-2 hover:bg-admin-primary-container rounded transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* School Crest / Avatar */}
      <div className="px-6 mb-8 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-admin-primary-container overflow-hidden border-2 border-admin-gold/30 flex items-center justify-center shadow-inner">
          <Building2 size={32} className="text-admin-gold" />
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname?.includes(link.path);
          const Icon = link.icon; // Extract component to render it
          
          return (
            <li key={link.path}>
              <Link 
                href={link.path}
                onClick={() => onClose()} 
                className={`
                  flex items-center gap-4 py-3 px-6 transition-colors
                  ${isActive 
                    ? 'bg-admin-primary-container text-admin-gold font-bold border-l-4 border-admin-gold' 
                    : 'text-gray-300 hover:bg-admin-primary-container hover:text-white border-l-4 border-transparent'
                  }
                `}
              >
                <Icon size={20} className={isActive ? "fill-admin-gold/20" : ""} />
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      
      {/* Footer Area */}
      <div className="px-6 pt-6 border-t border-admin-primary-container mt-auto">
        <button className="flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors w-full py-2">
          <LogOut size={20} />
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}