'use client';

import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  GraduationCap, 
  IdCard, 
  Megaphone, 
  History, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

// Define our data interfaces
interface DashboardStats {
  totalStudents: number;
  totalFaculty: number;
  activeBroadcasts: number;
}

interface RecentActivity {
  id: number;
  action: string;
  timestamp: string;
}

export default function DashboardPage() {
  // 1. State Management
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch Data on Mount
  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);
      
      try {
        // In production, this points to your FastAPI backend
        // const response = await fetch('http://localhost:8000/api/dashboard-stats');
        // if (!response.ok) throw new Error('Failed to fetch dashboard data');
        // const data = await response.json();
        
        // Simulating the API response delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockStats: DashboardStats = {
          totalStudents: 1245,
          totalFaculty: 84,
          activeBroadcasts: 3
        };

        const mockActivities: RecentActivity[] = [
          { id: 1, action: 'Broadcast created: Campus Closure', timestamp: '2 hours ago' },
          { id: 2, action: 'New student enrolled: Grade 10', timestamp: '5 hours ago' },
          { id: 3, action: 'Broadcast deleted: Friday Bake Sale', timestamp: '1 day ago' },
        ];

        setStats(mockStats);
        setActivities(mockActivities);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while loading the dashboard.');
      } finally {
        // This always runs, whether the fetch was a success or resulted in an error
        setLoading(false); 
      }
    }
    
    fetchDashboardData();
  }, []); // The empty array ensures this effect only runs once on mount

  // 3. Conditional Rendering for Loading and Error States
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-admin-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-semibold animate-pulse">Loading dashboard metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-lg shadow-sm border border-admin-error p-8 text-center">
        <AlertTriangle size={48} className="text-admin-error mb-4" />
        <p className="text-admin-error font-bold text-xl mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-admin-error text-white px-6 py-2 rounded shadow hover:opacity-90 transition-opacity"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // 4. Main Dashboard UI
  return (
    <div className="max-w-[var(--max-content-width)] mx-auto w-full animate-fade-in">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-admin-primary">Admin Overview</h2>
        <p className="text-gray-500 mt-2 font-medium">Welcome back. Here is what is happening at Mountain Top Secondary School today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-admin-primary text-white p-6 rounded-lg shadow-md border border-admin-primary-container flex items-center justify-between hover:-translate-y-1 transition-transform">
          <div>
            <p className="text-admin-gold text-sm font-bold uppercase tracking-wider mb-1">Total Students</p>
            <h3 className="text-4xl font-black">{stats?.totalStudents.toLocaleString()}</h3>
          </div>
          <div className="w-14 h-14 rounded-full bg-admin-primary-container flex items-center justify-center">
            <GraduationCap size={32} className="text-admin-gold" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex items-center justify-between hover:-translate-y-1 transition-transform">
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Active Faculty</p>
            <h3 className="text-4xl font-black text-admin-primary">{stats?.totalFaculty}</h3>
          </div>
          <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
            <IdCard size={32} className="text-admin-primary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex items-center justify-between hover:-translate-y-1 transition-transform">
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Live Broadcasts</p>
            <h3 className="text-4xl font-black text-admin-primary">{stats?.activeBroadcasts}</h3>
          </div>
          <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
            <Megaphone size={32} className="text-admin-primary" />
          </div>
        </div>
      </div>

      {/* Activity Feed & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-admin-primary flex items-center gap-2">
              <History size={20} />
              Recent Activity
            </h3>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-gray-100">
              {activities.map((activity) => (
                <li key={activity.id} className="p-6 hover:bg-gray-50 transition-colors flex items-start gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-admin-gold shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
            {activities.length === 0 && (
               <div className="p-8 text-center text-gray-500">No recent activity found.</div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-admin-surface rounded-lg shadow-md border border-gray-100 p-6">
             <h3 className="text-lg font-bold text-admin-primary mb-4 flex items-center gap-2">
               <Zap size={20} />
               Quick Actions
             </h3>
             <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded border border-gray-200 hover:border-admin-primary hover:bg-gray-50 transition-all font-medium text-admin-primary flex items-center justify-between group">
                  <span>Create Broadcast</span>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-admin-primary transition-colors" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded border border-gray-200 hover:border-admin-primary hover:bg-gray-50 transition-all font-medium text-admin-primary flex items-center justify-between group">
                  <span>Register Student</span>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-admin-primary transition-colors" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded border border-gray-200 hover:border-admin-primary hover:bg-gray-50 transition-all font-medium text-admin-primary flex items-center justify-between group">
                  <span>View System Logs</span>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-admin-primary transition-colors" />
                </button>
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}