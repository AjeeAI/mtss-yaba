import { NextResponse } from 'next/server';

// 🚨 Force Next.js to NEVER cache this route during development/debugging
export const dynamic = 'force-dynamic'; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor') || '';
  const category = searchParams.get('category') || 'All';

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  let expression = 'folder:"pictures_mtss/*"';
  
  if (category !== 'All') {
    expression = `folder:"pictures_mtss/${category}/*"`;
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
      sort_by: [{ created_at: 'desc' }],
      max_results: 30, 
      next_cursor: cursor || undefined, 
    }),
    cache: 'no-store' // 🚨 CRITICAL FIX: Replaces next: { revalidate... }
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch from Cloudinary' }, { status: 500 });
  }

  const data = await response.json();

// 2. Transform data for the frontend (Asset Folders Fix!)
  const images = data.resources?.map((img: any) => {
    
    // Check for the new Asset Folder property, fallback to old folder property, or default to empty string
    const actualFolder = img.asset_folder || img.folder || "";
    
    // DEBUG 3.0: Let's verify the real virtual folder path!
    console.log(`🔍 REAL FOLDER PATH: ${actualFolder}`);
    
    let albumName = "Miscellaneous";
    
    // If Cloudinary provides the virtual folder string (e.g., "pictures_mtss/Excursions/Olumo")
    if (actualFolder) {
      const folderParts = actualFolder.split('/');
      
      // If the image is at least 3 levels deep (Root -> Category -> Album)
      if (folderParts.length >= 3) {
        albumName = folderParts[folderParts.length - 1]; // Grabs the very last folder name! ("Olumo")
      } 
      // If the image is only 2 levels deep (Root -> Category) and missing an album
      else if (folderParts.length === 2) {
        albumName = "Uncategorized"; 
      }
    }

    return {
      id: img.public_id,
      src: img.secure_url,
      album: albumName, 
      category: category === 'All' ? 'MTSS Gallery' : category,
      alt: img.public_id || 'MTSS Gallery Image' 
    };
  }) || [];

  return NextResponse.json({
    images,
    nextCursor: data.next_cursor || null 
  });
}