import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor') ? parseInt(searchParams.get('cursor')!) : 0;
  const category = searchParams.get('category') || 'All';
  const limit = 30;

  try {
    let query = supabase
      .from('gallery_media')
      .select('*')
      .order('created_at', { ascending: false })
      .range(cursor, cursor + limit - 1);

    // Apply category filter if it's not "All"
    if (category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform the data to match what GalleryClientFilter expects
    const images = data.map((media) => ({
      id: media.id,
      src: media.url,
      album: media.album,
      category: media.category,
      alt: media.alt_text || 'MTSS Gallery Media',
      mediaType: media.media_type // Passing this down so the frontend knows if it's a video!
    }));

    // Determine the next cursor for infinite scrolling
    const nextCursor = data.length === limit ? cursor + limit : null;

    return NextResponse.json({
      images,
      nextCursor
    });

  } catch (error) {
    console.error("Error fetching gallery media:", error);
    return NextResponse.json({ error: 'Failed to fetch from database' }, { status: 500 });
  }
}