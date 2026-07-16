'use client';

import { useState, useEffect } from 'react';
import { Megaphone, AlertTriangle } from 'lucide-react';

import { Broadcast } from '@/types/broadcast';
import CreateForm from '@/components/admin/announcements/CreateForm';
import BroadcastsTable from '@/components/admin/announcements/BroadcastTable';

export default function AnnouncementsPage() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBroadcasts() {
      setLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockData: Broadcast[] = [
          { 
            id: 1, 
            title: 'Campus Closure - Extreme Weather', 
            body: 'All classes suspended for Tuesday due to impending snowstorm.', 
            createdAt: 'Oct 24, 2023', 
            expiresAt: 'Oct 26, 2023' 
          },
          { 
            id: 2, 
            title: 'Faculty Meeting Moved to Hall B', 
            body: 'The monthly alignment meeting venue has been changed.', 
            createdAt: 'Oct 22, 2023', 
            expiresAt: null 
          },
          { 
            id: 3, 
            title: 'Q3 Grade Submissions Deadline', 
            body: 'Reminder: All final grades must be logged by Friday EOD.', 
            createdAt: 'Oct 20, 2023', 
            expiresAt: 'Oct 30, 2023' 
          }
        ];
        
        setBroadcasts(mockData);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false); 
      }
    }
    
    fetchBroadcasts();
  }, []);

  const handleAddBroadcast = (newBroadcast: Broadcast) => {
    setBroadcasts(prev => [newBroadcast, ...prev]);
  };

  const handleDeleteBroadcast = async (id: string | number) => {
    setBroadcasts(prev => prev.filter(broadcast => broadcast.id !== id));
  };

  return (
    <div className="max-w-[var(--max-content-width)] mx-auto w-full">
      <header className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-3xl font-bold text-admin-primary">Announcements Hub</h2>
        <p className="text-gray-500 mt-2 font-medium">Broadcast critical updates to faculty, students, and staff.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Create Form & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          
          <CreateForm onAdd={handleAddBroadcast} />

          {/* Mini Stats Card */}
          <div className="bg-admin-primary rounded-lg shadow-md p-6 text-white border border-admin-primary-container">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-gold/80 uppercase tracking-wide font-semibold mb-1">Active Broadcasts</p>
                <p className="text-4xl font-bold">{broadcasts.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-admin-primary-container flex items-center justify-center">
                <Megaphone size={24} className="text-admin-gold" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Data Table */}
        <div className="lg:col-span-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md border border-gray-100 min-h-[400px]">
              <div className="w-12 h-12 border-4 border-gray-100 border-t-admin-primary rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Loading broadcasts...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md border border-admin-error min-h-[400px] text-center">
              <AlertTriangle size={48} className="text-admin-error mb-4" />
              <p className="text-admin-error font-bold text-lg mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-admin-error text-white px-6 py-2 rounded font-bold hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          ) : (
            <BroadcastsTable 
              broadcasts={broadcasts} 
              onDelete={handleDeleteBroadcast} 
            />
          )}
        </div>
      </div>
    </div>
  );
}