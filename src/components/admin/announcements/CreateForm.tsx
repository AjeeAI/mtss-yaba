'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { BellPlus, Send, Loader2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Announcement, FormErrors } from '@/types/announcement';
import { Broadcast } from '@/types/broadcast';

interface CreateFormProps {
  onAdd: () => void;
  editingBroadcast: Broadcast | null;
  onCancelEdit: () => void;
}

export default function CreateForm({ onAdd, editingBroadcast, onCancelEdit }: CreateFormProps) {
  const [formData, setFormData] = useState<Announcement>({
    title: '',
    body: '',
    expiresAt: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync the form with the broadcast data when editingBroadcast changes
  useEffect(() => {
    if (editingBroadcast) {
      setFormData({
        title: editingBroadcast.title,
        body: editingBroadcast.body,
        expiresAt: editingBroadcast.expiresAt || ''
      });
    } else {
      setFormData({ title: '', body: '', expiresAt: '' });
    }
  }, [editingBroadcast]);

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

    try {
      if (editingBroadcast) {
        // UPDATE Logic
        const { error } = await supabase
          .from('announcements')
          .update({
            title: formData.title,
            message: formData.body,
            expires_at: formData.expiresAt || null
          })
          .eq('id', editingBroadcast.id);
        
        if (error) throw error;
      } else {
        // INSERT Logic
        const { error } = await supabase
          .from('announcements')
          .insert([{
            title: formData.title,
            message: formData.body,
            expires_at: formData.expiresAt || null,
            is_active: true
          }]);
        
        if (error) throw error;
      }

      setFormData({ title: '', body: '', expiresAt: '' });
      onCancelEdit(); // Clear edit mode
      onAdd();        // Refresh list
    } catch (err: any) {
      console.error("Submission error:", err);
      alert("Failed to save announcement: " + (err.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-admin-primary flex items-center gap-2">
          <BellPlus size={20} /> {editingBroadcast ? 'Edit Announcement' : 'New Announcement'}
        </h3>
        {editingBroadcast && (
          <button onClick={onCancelEdit} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-900 uppercase text-xs font-bold" htmlFor="title">Title <span className="text-admin-error">*</span></label>
            <input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter headline" className="w-full rounded border border-gray-300 px-4 py-2" disabled={isSubmitting} />
            {errors.title && <p className="text-admin-error text-xs">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-900 uppercase text-xs font-bold" htmlFor="body">Message <span className="text-admin-error">*</span></label>
            <textarea id="body" name="body" value={formData.body} onChange={handleChange} placeholder="Draft your announcement..." className="w-full rounded border border-gray-300 px-4 py-2" rows={4} disabled={isSubmitting} />
            {errors.body && <p className="text-admin-error text-xs">{errors.body}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-900 uppercase text-xs font-bold" htmlFor="expiry">Expiration (Optional)</label>
            <input type="datetime-local" id="expiry" name="expiresAt" value={formData.expiresAt} onChange={handleChange} className="w-full rounded border border-gray-300 px-4 py-2" disabled={isSubmitting} />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-admin-gold text-admin-primary-container font-bold py-2.5 rounded flex items-center justify-center gap-2">
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> {editingBroadcast ? 'Update Announcement' : 'Broadcast Announcement'}</>}
          </button>
        </form>
      </div>
    </div>
  );
}