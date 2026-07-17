'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Trash2, Upload, Video, Image as ImageIcon, X, Loader2, ImagePlus, ArrowLeft, FolderOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';


export default function AdminGalleryPage() {
  // Grid & Hierarchy State
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All'); 
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null); 

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form & Premium Features State
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [album, setAlbum] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_media')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setMedia(data);
    if (error) console.error("Error fetching media:", error);
    setLoading(false);
  }

  async function deleteMedia(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await supabase.from('gallery_media').delete().eq('id', id);
    fetchMedia();
  }

  // --- Hierarchy, Filtering & Cascading Dropdown Logic ---
  
  // 1. For the UI Filter Pills
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(media.map(item => item.category).filter(Boolean)));
    return ['All', ...uniqueCategories];
  }, [media]);

  // 2. For the Modal Dropdowns
  const allUniqueCategories = useMemo(() => {
    return Array.from(new Set(media.map(item => item.category).filter(Boolean)));
  }, [media]);

  // Cascading Album Logic. Only shows albums belonging to the typed category
  const contextualAlbums = useMemo(() => {
    if (!category.trim()) {
      return Array.from(new Set(media.map(item => item.album).filter(Boolean)));
    }
    
    const relevantMedia = media.filter(
      (item) => item.category?.toLowerCase() === category.trim().toLowerCase()
    );
    return Array.from(new Set(relevantMedia.map(item => item.album).filter(Boolean)));
  }, [media, category]);

  // 3. Grid display logic
  const filteredMedia = useMemo(() => {
    return activeCategory === 'All' 
      ? media 
      : media.filter(item => item.category === activeCategory);
  }, [media, activeCategory]);

  const albums = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredMedia.forEach(item => {
      const albumName = item.album || 'Uncategorized';
      if (!groups[albumName]) groups[albumName] = [];
      groups[albumName].push(item);
    });
    return groups;
  }, [filteredMedia]);

  useEffect(() => {
    if (activeAlbum && (!albums[activeAlbum] || albums[activeAlbum].length === 0)) {
      setActiveAlbum(null);
    }
  }, [albums, activeAlbum]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveAlbum(null); 
  };

  // ----------------------------------

  // --- Premium Upload Handlers ---
  const handleFileSelect = async (selectedFile: File | null) => {
    if (!selectedFile) {
      clearFileState();
      return;
    }

    setIsConverting(true);
    setImageError(false);

    try {
      const headerBuffer = await selectedFile.slice(0, 16).arrayBuffer();
      const headerString = Array.from(new Uint8Array(headerBuffer))
        .map(b => String.fromCharCode(b))
        .join('');
      
      const isHeic = 
        selectedFile.type === 'image/heic' || 
        selectedFile.type === 'image/heif' ||
        selectedFile.name.toLowerCase().match(/\.(heic|heif)$/) ||
        (headerString.includes('ftyp') && (headerString.includes('heic') || headerString.includes('mif1') || headerString.includes('hevc')));

      if (isHeic) {
        const buffer = await selectedFile.arrayBuffer();
        const blobData = new Blob([buffer], { type: 'image/heic' });

        // ✅ DYNAMICALLY IMPORT IT HERE ONLY WHEN NEEDED
        const heic2any = (await import('heic2any')).default;

        const convertedBlob = await heic2any({
          blob: blobData,
          toType: 'image/jpeg',
          quality: 0.8,
        });

        const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        
        const newFileName = selectedFile.name.replace(/\.(heic|heif|jpeg|jpg)$/i, '.jpg');
        const convertedFile = new File([finalBlob], newFileName, { type: 'image/jpeg' });
        
        setFile(convertedFile);
        setPreviewUrl(URL.createObjectURL(convertedFile));
      } else {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    } catch (error) {
      console.error("File processing failed:", error);
      setFile(selectedFile);
      setPreviewUrl('fallback'); 
    } finally {
      setIsConverting(false);
    }
  };

  const clearFileState = () => {
    setFile(null);
    if (previewUrl && previewUrl !== 'fallback') URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setImageError(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isConverting) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (isConverting) return; 

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (!previewUrl && !isConverting) {
      fileInputRef.current?.click();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearFileState();
    setCategory('');
    setAlbum('');
  };

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !category || !album) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mtss_website_preset'); 

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const cloudinaryData = await res.json();
      if (!res.ok) throw new Error(cloudinaryData.error?.message || 'Cloudinary upload failed');
      
      let imageUrl = cloudinaryData.secure_url;
      
      if (imageUrl.toLowerCase().endsWith('.heic')) {
        imageUrl = imageUrl.replace(/\.heic$/i, '.jpg');
      }

      const { error } = await supabase.from('gallery_media').insert([
        {
          media_type: 'image',
          url: imageUrl,
          category: category.trim(),
          album: album.trim(),
          alt_text: file.name
        }
      ]);

      if (error) throw error;
      
      closeModal();
      fetchMedia();

    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload. Check console.");
    } finally {
      setIsUploading(false);
    }
  }

  const formatUrl = (url: string) => url ? url.replace(/\.(heic|heif)$/i, '.jpg') : '';

  return (
    <div className="max-w-[var(--max-content-width)] mx-auto w-full animate-fade-in relative pb-12">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-admin-primary">Gallery Manager</h2>
          <p className="text-gray-500 mt-2 font-medium">Add, categorize, and manage public media.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-admin-gold text-admin-primary-container px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
        >
          <Upload size={20} /> Upload New
        </button>
      </header>

      {/* Dynamic Category Filters */}
      {!activeAlbum && !loading && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8 items-center justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat 
                  ? 'bg-admin-primary text-white shadow-md transform scale-105' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-admin-primary" size={32} /></div>
      ) : (
        <div className="animate-in fade-in duration-300">
          
          {/* VIEW 1: ALBUM FOLDERS */}
          {!activeAlbum ? (
            Object.keys(albums).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <FolderOpen size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No albums found for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.entries(albums).map(([albumName, items]) => {
                  const coverItem = items[0];
                  
                  return (
                    <div 
                      key={albumName} 
                      onClick={() => setActiveAlbum(albumName)}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group relative transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        {coverItem.media_type === 'image' ? (
                          <img 
                            src={formatUrl(coverItem.url)} 
                            alt={albumName} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            loading="lazy" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Video size={48} className="text-admin-primary" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                          {items.length} {items.length === 1 ? 'Photo' : 'Photos'}
                        </div>
                        <div className="absolute inset-0 bg-admin-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                      </div>
                      <div className="p-4 bg-white z-10">
                        <h3 className="font-bold text-gray-800 text-lg truncate">{albumName}</h3>
                        <p className="text-sm text-admin-primary font-medium mt-1 flex items-center gap-1">
                          Explore Album <ArrowLeft size={14} className="rotate-180" />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            
            /* VIEW 2: MEDIA INSIDE SELECTED ALBUM */
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                <button 
                  onClick={() => setActiveAlbum(null)}
                  className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                  title="Back to Albums"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{activeAlbum}</h3>
                  <p className="text-sm text-gray-500 font-medium">{albums[activeAlbum]?.length} Items in {activeCategory === 'All' ? albums[activeAlbum][0].category : activeCategory}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {albums[activeAlbum]?.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group relative transition-transform hover:-translate-y-1 hover:shadow-md">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                      {item.media_type === 'image' ? (
                        <img 
                          src={formatUrl(item.url)} 
                          alt={item.alt_text || 'Gallery Image'} 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/600x400/f8fafc/94a3b8?text=Image+Unavailable';
                          }}
                        />
                      ) : (
                        <Video size={48} className="text-admin-primary" />
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          deleteMedia(item.id);
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 hover:scale-110 shadow-sm"
                        title="Delete Asset"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-sm text-gray-800 truncate">{item.album}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Premium Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ImagePlus size={20} className="text-admin-primary" />
                Upload Asset
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 hover:rotate-90 transition-all rounded-full p-1 hover:bg-gray-200">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 flex flex-col gap-5">
              
              <div 
                onClick={triggerFileInput}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-xl transition-all overflow-hidden cursor-pointer ${
                  isDragging 
                    ? 'border-admin-primary bg-admin-primary/5 scale-[1.02]' 
                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100/50'
                }`}
              >
                {isConverting && (
                  <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Loader2 size={32} className="animate-spin text-admin-primary mb-2" />
                    <span className="text-sm font-bold text-gray-800">Reading Image Data...</span>
                    <span className="text-xs text-gray-500 mt-1">Checking format structure</span>
                  </div>
                )}

                {previewUrl ? (
                  <div className="relative w-full h-full group">
                    {previewUrl === 'fallback' || imageError ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500">
                        <ImageIcon size={48} className="mb-2 opacity-40" />
                        <p className="text-sm font-medium">Ready to upload</p>
                        <p className="text-xs truncate max-w-[200px] mt-1">{file?.name}</p>
                      </div>
                    ) : (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-contain bg-black/5" 
                        onError={() => setImageError(true)} 
                      />
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          clearFileState();
                        }}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} /> Remove Asset
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 flex flex-col items-center pointer-events-none">
                    <div className="p-4 bg-white rounded-full shadow-sm mb-3">
                      <Upload className="h-8 w-8 text-admin-primary" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      <span className="text-admin-primary font-bold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG, GIF, or HEIC (max. 10MB)</p>
                  </div>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*,.heic,.heif"
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                <div>
                  <label htmlFor="category-input" className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <input 
                    id="category-input"
                    type="text" 
                    list="category-suggestions"
                    value={category}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCategory(val);
                      if (val.trim() === '') {
                        setAlbum('');
                      }
                    }}
                    placeholder="Select or type new"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary outline-none transition-all shadow-sm"
                    required
                    autoComplete="off"
                  />
                  <datalist id="category-suggestions">
                    {allUniqueCategories.map((cat, idx) => (
                      <option key={idx} value={cat as string} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label htmlFor="album-input" className="block text-sm font-semibold text-gray-700 mb-1.5">Album</label>
                  <input 
                    id="album-input"
                    type="text" 
                    list="album-suggestions"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    placeholder={category.trim() ? "Select or type new" : "Select a category first"}
                    disabled={!category.trim()}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary outline-none transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100"
                    required
                    autoComplete="off"
                  />
                  <datalist id="album-suggestions">
                    {contextualAlbums.map((alb, idx) => (
                      <option key={idx} value={alb as string} />
                    ))}
                  </datalist>
                </div>

              </div>

              <div className="mt-2 pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading || !file || isConverting}
                  className="px-6 py-2.5 bg-admin-primary text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-sm hover:shadow"
                >
                  {isUploading ? (
                    <><Loader2 size={18} className="animate-spin" /> Processing...</>
                  ) : (
                    <>Upload & Save</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}