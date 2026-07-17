'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // DEBUG: This will show you exactly what is being sent to Supabase
    console.log("Submitting with:", { email, password });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push('/announcements');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-admin-primary">Admin Login</h2>
        
        {/* Added 'value' prop to ensure synchronization */}
        <input 
          type="email" 
          placeholder="Email" 
          required 
          value={email} 
          className="w-full p-3 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* Added 'value' prop to ensure synchronization */}
        <input 
          type="password" 
          placeholder="Password" 
          required 
          value={password} 
          className="w-full p-3 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-admin-primary text-white py-3 rounded font-bold hover:opacity-90 flex justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
        </button>
      </form>
    </div>
  );
}