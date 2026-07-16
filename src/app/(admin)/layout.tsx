'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopNav from '@/components/admin/TopNav';
import { useState } from 'react';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Lifting State Up: We manage the sidebar's open/close state in this parent component so it can be passed down to both the TopNav and Sidebar.
  // 2. Using the useState Hook: This creates a piece of state that will trigger a re-render whenever the mobile menu is toggled[cite: 6].
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    // Updating based on previous state ensures accuracy when toggling[cite: 6].
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 
        The Sidebar receives the current state and a function to close itself.
        Data flows DOWN through props.
      */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
        
        {/* 
          The TopNav receives the toggle function as a callback. 
          Events flow UP through this callback to update the parent's state[cite: 5].
        */}
        <TopNav onToggleSidebar={toggleSidebar} />

        {/* 
          The Main Workspace.
          The special `children` prop contains whatever nested page component is currently active in the Next.js router. 
        */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
          {children}
        </main>

      </div>

      {/* Mobile Overlay Background */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#250d3d]/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}