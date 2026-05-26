import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor') || '';
  const category = searchParams.get('category') || 'All';

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // 1. Tell Cloudinary to filter by your specific tags directly!
  let expression = 'folder:"pictures_mtss"';
  if (category !== 'All') {
    expression += ` AND tags:"${category}"`;
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
  const basicAuth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuth}`
    },
    body: JSON.stringify({
      expression,
      with_field: 'tags',
      sort_by: [{ created_at: 'desc' }],
      max_results: 16, // Only fetch 16 images per network request!
      next_cursor: cursor || undefined, // The secret to Cloudinary pagination
    }),
    next: { revalidate: 3600 } 
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch from Cloudinary' }, { status: 500 });
  }

  const data = await response.json();

  // 2. Transform data for the frontend
  const images = data.resources?.map((img: any) => {
    const assignedCategory = img.tags && img.tags.length > 0 ? img.tags[0] : "Campus & Hostels";
    return {
      id: img.public_id,
      src: img.secure_url,
      category: assignedCategory,
      alt: `MTSS Gallery Image`
    };
  }) || [];

  return NextResponse.json({
    images,
    nextCursor: data.next_cursor || null // If there are more images, Cloudinary sends this token
  });
}