'use client';

import { useEffect } from 'react';
import { X, Megaphone, Clock } from 'lucide-react';

export interface Announcement {
  id: string | number;
  title: string;
  message: string;
  created_at: string;
  expires_at: string | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
}

export default function AnnouncementModal({ isOpen, onClose, announcements }: Props) {
  
  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function: always restore scrolling if the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || announcements.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-admin-primary text-white p-6 pr-12 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-admin-gold rounded-full text-admin-primary">
              <Megaphone size={20} />
            </div>
            <h2 className="text-xl font-bold">Important Updates</h2>
          </div>
          <p className="text-white/80 text-sm">Please read the following announcements from the administration.</p>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Dismiss"
          >
            <X size={24} />
          </button>
        </div>

        {/* Announcement List with Custom Scrollbar */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6 bg-gray-50 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          {announcements.map((announcement, index) => (
            <div key={announcement.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
              {index === 0 && (
                <span className="absolute -top-3 -right-3 bg-admin-error text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  New
                </span>
              )}
              
              <h3 className="font-bold text-gray-900 text-lg mb-2">{announcement.title}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                {announcement.message}
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                <Clock size={14} />
                {new Date(announcement.created_at).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <button 
            onClick={onClose}
            className="w-full bg-admin-primary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            I understand, dismiss
          </button>
        </div>
        
      </div>
    </div>
  );
}