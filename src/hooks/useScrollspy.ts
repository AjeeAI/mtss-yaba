// src/hooks/useScrollspy.ts
import { useState, useEffect } from 'react';

/**
 * A custom hook to track the active section on the page based on scroll position.
 * @param ids Array of HTML element IDs to spy on.
 * @param offset An optional offset (in pixels) for the navbar height.
 * @returns The ID of the currently active section.
 */
export function useScrollspy(ids: string[], offset: number = 80) {
  const [activeId, setActiveId] = useState<string>(ids[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      // Find all the elements we are spying on
      const elements = ids.map(id => document.getElementById(id));
      
      // Calculate the trigger point (e.g., slightly below the top of the viewport)
      // The offset accounts for the fixed navbar height
      const triggerPosition = window.scrollY + offset + (window.innerHeight / 4);

      // Loop backwards to find the last element that has been passed
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (element) {
          if (element.offsetTop <= triggerPosition) {
            setActiveId(ids[i]);
            break; // Stop looking once we find the current one
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}