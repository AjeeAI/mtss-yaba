'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { BellPlus, Send, Loader2 } from 'lucide-react';
import { Announcement, FormErrors } from '@/types/announcement';
import { Broadcast } from '@/types/broadcast';

interface CreateFormProps {
  onAdd: (newBroadcast: Broadcast) => void;
}

export default function CreateForm({ onAdd }: CreateFormProps) {
  const [formData, setFormData] = useState<Announcement>({
    title: '',
    body: '',
    expiresAt: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (!formData.body.trim()) newErrors.body = 'Message body is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newBroadcast: Broadcast = {
      id: Date.now(),
      title: formData.title,
      body: formData.body,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expiresAt: formData.expiresAt || null
    };

    onAdd(newBroadcast);
    setFormData({ title: '', body: '', expiresAt: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-bold text-admin-primary flex items-center gap-2">
          <BellPlus size={20} />
          New Announcement
        </h3>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-900 uppercase text-xs font-bold" htmlFor="title">
              Title <span className="text-admin-error">*</span>
            </label>
            <input 
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter headline"
              className={`w-full rounded bg-white border px-4 py-2 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 transition-all text-gray-900 placeholder:text-gray-400 ${errors.title ? 'border-admin-error ring-admin-error/20' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.title && <p className="text-admin-error text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-900 uppercase text-xs font-bold" htmlFor="body">
              Message <span className="text-admin-error">*</span>
            </label>
            <textarea 
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Draft your announcement here..."
              className={`w-full rounded bg-white border px-4 py-2 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 transition-all text-gray-900 placeholder:text-gray-400 resize-none ${errors.body ? 'border-admin-error ring-admin-error/20' : 'border-gray-300'}`}
              rows={4}
              disabled={isSubmitting}
            />
            {errors.body && <p className="text-admin-error text-xs mt-1">{errors.body}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-900 uppercase text-xs font-bold" htmlFor="expiry">
              Expiration (Optional)
            </label>
            <input 
              type="datetime-local"
              id="expiry"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
              className="w-full rounded bg-white border border-gray-300 px-4 py-2 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 transition-all text-gray-900 text-sm"
              disabled={isSubmitting}
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-admin-gold text-admin-primary-container font-semibold py-2.5 px-4 rounded hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Send size={20} />
                  <span>Broadcast Announcement</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}