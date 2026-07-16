import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch unique categories from Supabase
    const { data, error } = await supabase
      .from('gallery_media')
      .select('category');

    if (error) throw error;

    // Extract unique category names
    const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
    
    // Ensure "All" is always the first option
    const categories = ["All", ...uniqueCategories.filter(cat => cat !== "All")];

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ categories: ["All"] });
  }
}