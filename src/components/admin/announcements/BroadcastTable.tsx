import React from 'react';
import { Broadcast } from '@/types/broadcast';
import { List, Filter, RefreshCw, Clock, Trash2, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  broadcasts: Broadcast[];
  onDelete: (id: string | number) => void;
  onEdit: (broadcast: Broadcast) => void; // New prop added
}

export default function BroadcastsTable({ broadcasts, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden h-full flex flex-col">
      
      {/* Table Header Controls */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="text-lg font-bold text-admin-primary flex items-center gap-2">
          <List size={20} />
          Manage Broadcasts
        </h3>
        <div className="flex gap-2">
          <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors" title="Filter">
            <Filter size={20} />
          </button>
          <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors" title="Refresh">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-6 text-gray-500 font-bold uppercase text-xs w-1/2">Announcement Title</th>
              <th className="py-3 px-6 text-gray-500 font-bold uppercase text-xs w-1/4">Date Created</th>
              <th className="py-3 px-6 text-gray-500 font-bold uppercase text-xs w-1/4">Expiry</th>
              <th className="py-3 px-6 text-gray-500 font-bold uppercase text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {broadcasts.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">No active broadcasts found.</td>
              </tr>
            ) : (
              broadcasts.map((broadcast) => (
                <tr key={broadcast.id} className="hover:bg-admin-primary/5 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="text-admin-primary text-sm font-semibold">{broadcast.title}</div>
                    <div className="text-gray-500 text-xs mt-1 truncate max-w-xs">{broadcast.body}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{broadcast.createdAt}</td>
                  <td className="py-4 px-6">
                    {broadcast.expiresAt ? (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider gap-1">
                        <Clock size={12} /> {broadcast.expiresAt}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                        None
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {/* Actions container: only visible on row hover */}
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(broadcast)}
                        className="text-gray-400 hover:text-admin-primary p-1.5 rounded hover:bg-admin-primary/10 transition-colors" 
                        title="Edit"
                      >
                        <Pencil size={20} />
                      </button>
                      <button 
                        onClick={() => onDelete(broadcast.id)}
                        className="text-gray-400 hover:text-admin-error p-1.5 rounded hover:bg-red-50 transition-colors" 
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between text-sm">
        <span className="text-gray-500 font-medium">Showing {broadcasts.length} active announcements</span>
        <div className="flex gap-1">
          <button className="p-1 text-gray-300 cursor-not-allowed">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
}