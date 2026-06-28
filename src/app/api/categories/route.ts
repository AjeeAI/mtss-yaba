import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/folders/pictures_mtss`;
  const basicAuth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Basic ${basicAuth}` },
      cache: 'no-store'
    });

    if (!response.ok) throw new Error('Failed to fetch folders');

    const data = await response.json();
    
    // We explicitly add "All" to the very front of the dynamic list here!
    const categories = ["All", ...data.folders.map((folder: any) => folder.name)];

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ categories: ["All"] }); 
  }
}