'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export default function GalleryClientFilter() {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  // 1. Fetch Categories
  const { data: dynamicCategories = [] } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      if (!res.ok) return [];
      const data = await res.json();
      return data.categories.filter((cat: string) => cat !== "All");
    }
  });

  // Auto-select first category
  useEffect(() => {
    if (dynamicCategories.length > 0 && !activeCategory) {
      setActiveCategory(dynamicCategories[0]);
    }
  }, [dynamicCategories, activeCategory]);

  // 2. Fetch Images for the Category
 // Inside components/GalleryClientFilter.tsx

const fetchImages = async ({ pageParam = 0 }) => {
  // We point to our new API route which queries Supabase
  const res = await fetch(`/api/gallery?category=${activeCategory}&cursor=${pageParam}`);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
  queryKey: ['gallery', activeCategory],
  queryFn: fetchImages,
  // The API now returns a numeric cursor, so we use 0 as the initial page
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  enabled: !!activeCategory,
});
  const allImages = data ? data.pages.flatMap(page => page.images) : [];

  const groupedAlbums = useMemo(() => {
    const groups: Record<string, any[]> = {};
    allImages.forEach(img => {
      const albumName = img.album || "Miscellaneous";
      if (!groups[albumName]) groups[albumName] = [];
      groups[albumName].push(img);
    });
    return groups;
  }, [allImages]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveAlbum(null); 
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* --- STYLIZED CATEGORY PILLS --- */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
        {dynamicCategories.map((category: string) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-500 overflow-hidden ${
                isActive 
                  ? "text-white shadow-[0_8px_30px_rgb(169,50,38,0.3)] scale-105" 
                  : "text-gray-600 bg-white border border-gray-200 hover:border-transparent hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {/* Animated Background for Active State */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#A93226] to-[#8E281F] z-0"></div>
              )}
              <span className="relative z-10">{category.replace(/_/g, ' ')}</span>
            </button>
          );
        })}
      </div>

      {/* --- LOADING & ERROR STATES --- */}
      {status === 'pending' && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-10 h-10 border-4 border-[#A93226]/20 border-t-[#A93226] rounded-full animate-spin"></div>
          <p className="text-[#3B2353] font-medium animate-pulse">Loading breathtaking moments...</p>
        </div>
      )}
      {status === 'error' && (
        <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-red-600 font-medium">We couldn't load the gallery right now.</p>
        </div>
      )}

      {/* --- VIEW 1: ALBUM GRID (Sleek Cards) --- */}
      {/* --- VIEW 1: ALBUM GRID (Sleek Cards) --- */}
      {status === 'success' && !activeAlbum && (
        <div className="flex flex-wrap justify-center gap-8 xl:gap-10">
          {Object.keys(groupedAlbums).length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32 text-gray-400 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium text-gray-500">No albums in this category yet</p>
            </div>
          ) : (
            Object.keys(groupedAlbums).map((albumName) => {
              const albumImages = groupedAlbums[albumName];
              const coverImage = albumImages[0]; 

              return (
                <div 
                  key={albumName} 
                  onClick={() => setActiveAlbum(albumName)}
                  // 🚨 FIX: Using flex-none + width constraint to ensure card stays at a perfect size
                  className="group flex-none w-[320px] sm:w-[350px] cursor-pointer rounded-3xl overflow-hidden bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 border border-gray-50 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#3B2353]/5 to-[#A93226]/5">
                    {coverImage ? (
                      <Image
                        src={coverImage.src}
                        alt={albumName}
                        fill
                        unoptimized
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, 350px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                        <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wide px-4 py-1.5 rounded-full shadow-lg">
                      {albumImages.length} {albumImages.length === 1 ? 'Photo' : 'Photos'}
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between bg-white relative">
                    <h3 className="text-xl font-bold text-[#3B2353] group-hover:text-[#A93226] transition-colors line-clamp-2">
                      {albumName.replace(/_/g, ' ')}
                    </h3>
                    <div className="flex items-center mt-4 text-sm font-semibold text-gray-400 group-hover:text-[#A93226] transition-colors">
                      Explore Album 
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      
      {/* --- VIEW 2: SINGLE ALBUM DETAIL --- */}
      {status === 'success' && activeAlbum && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-gray-100 gap-4">
            <div>
              <button 
                onClick={() => setActiveAlbum(null)}
                className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#A93226] transition-colors mb-4"
              >
                <div className="p-1.5 rounded-full bg-gray-50 group-hover:bg-[#A93226]/10 transition-colors">
                  <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                Back to Albums
              </button>
              <h2 className="text-4xl font-serif font-bold text-[#3B2353] capitalize tracking-tight">
                {activeAlbum.replace(/_/g, ' ')}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-bold text-[#A93226] bg-[#A93226]/5 px-5 py-2.5 rounded-full border border-[#A93226]/10 w-fit">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {groupedAlbums[activeAlbum]?.length} Shots
            </div>
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {groupedAlbums[activeAlbum].map((image: any, i: number) => (
              <div 
                key={image.id} 
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-zoom-in"
                style={{ animationDelay: `${i * 50}ms` }} // Slight stagger effect
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Darken slightly on hover for focus */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- LOAD MORE BUTTON --- */}
      {hasNextPage && activeAlbum && (
        <div className="mt-20 flex justify-center pb-12">
          <button 
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={`flex items-center gap-2 px-10 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${
              isFetchingNextPage 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-[#3B2353] border border-gray-200 hover:border-[#3B2353] hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            {isFetchingNextPage ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              'Load More Discoveries'
            )}
          </button>
        </div>
      )}
    </div>
  );
}