'use client';

import Link from 'next/link';
import { Menu, Search, Bell, HelpCircle, User } from 'lucide-react';

interface TopNavProps {
  onToggleSidebar: () => void;
}

export default function TopNav({ onToggleSidebar }: TopNavProps) {
  return (
    <header className="bg-admin-surface text-admin-primary shadow-sm border-b border-gray-200 h-16 flex justify-between items-center px-4 md:px-8 shrink-0">
      
      {/* Left Section: Mobile Toggle & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-admin-primary hover:bg-gray-100 rounded transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        
        <div className="font-black text-xl text-admin-primary md:hidden">
          MTSSAdmin
        </div>
        
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-admin-primary focus-within:ring-2 focus-within:ring-admin-primary-container/20 transition-all">
          <Search size={20} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search Announcements..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-64 ml-2 outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Right Section: Quick Links & Profile */}
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          <Link href="/" className="hover:text-admin-primary transition-colors text-gray-500">
            Public Site
          </Link>
          <span className="text-admin-primary border-b-2 border-admin-primary pb-1">
            Dashboard
          </span>
        </nav>
        
        <div className="flex items-center gap-3 ml-4">
          <button className="p-2 text-gray-500 hover:text-admin-primary transition-colors rounded-full hover:bg-gray-100">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-admin-primary transition-colors rounded-full hover:bg-gray-100">
            <HelpCircle size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-admin-primary text-white flex items-center justify-center ml-2 overflow-hidden border border-gray-200 shadow-sm cursor-pointer">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}