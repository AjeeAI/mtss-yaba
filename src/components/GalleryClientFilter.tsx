'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';

const CATEGORIES = ["All", "Academics", "Spiritual Life", "Campus & Hostels", "Sports & Clubs"];

export default function GalleryClientFilter() {
  const [activeCategory, setActiveCategory] = useState("All");

  // 1. The fetcher function that talks to our new API route
  const fetchImages = async ({ pageParam = '' }) => {
    const res = await fetch(`/api/gallery?category=${activeCategory}&cursor=${pageParam}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  };

  // 2. TanStack's Infinite Query Magic
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['gallery', activeCategory], // Cache is uniquely separated by category!
    queryFn: fetchImages,
    getNextPageParam: (lastPage) => lastPage.nextCursor, // Tells TanStack how to get the next batch
    initialPageParam: '',
  });

  // 3. Flatten the pages of data into one single array of images
  const allImages = data ? data.pages.flatMap(page => page.images) : [];

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              activeCategory === category
                ? "bg-[#A93226] text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#A93226] hover:text-[#A93226]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {status === 'pending' && (
        <div className="text-center py-20 text-[#3B2353] font-semibold animate-pulse">
          Loading gallery...
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="text-center py-20 text-red-600">
          Error loading images. Please try again.
        </div>
      )}

      {/* Image Grid */}
      {status === 'success' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allImages.map((image: any) => (
            <div 
              key={image.id} 
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2353]/90 via-[#3B2353]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.category}
                </span>
                <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {status === 'success' && allImages.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p>More images coming soon to this category!</p>
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="mt-16 flex justify-center">
          <button 
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={`border-2 border-[#D4AF37] font-bold py-3 px-10 rounded transition-all duration-300 shadow-sm ${
              isFetchingNextPage 
                ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed" 
                : "bg-white text-[#3B2353] hover:bg-[#D4AF37] hover:text-white hover:shadow-md"
            }`}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More Images'}
          </button>
        </div>
      )}
    </>
  );
}