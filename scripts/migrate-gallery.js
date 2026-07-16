// scripts/migrate-gallery.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' }); // Loads local environment variables

// 1. Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: Supabase credentials missing in .env.local");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Configure Cloudinary Credentials
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("❌ Error: Cloudinary credentials missing in .env.local");
  process.exit(1);
}

async function migrate() {
  console.log("🚀 Starting Cloudinary to Supabase migration...");
  
  let nextCursor = null;
  let totalMigrated = 0;
  const basicAuth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

  do {
    try {
      // Fetch a batch of up to 50 assets from Cloudinary
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuth}`
        },
        body: JSON.stringify({
          expression: 'folder:"pictures_mtss/*"',
          max_results: 50,
          next_cursor: nextCursor || undefined
        })
      });

      if (!response.ok) {
        throw new Error(`Cloudinary API responded with status ${response.status}`);
      }

      const data = await response.json();
      const resources = data.resources || [];
      nextCursor = data.next_cursor;

      if (resources.length === 0) {
        console.log("ℹ️ No more resources found in Cloudinary.");
        break;
      }

      const payload = resources.map((img) => {
        const actualFolder = img.asset_folder || img.folder || "";
        
        let categoryName = "Uncategorized";
        let albumName = "Miscellaneous";

        if (actualFolder) {
          const folderParts = actualFolder.split('/');
          // Expecting structure: ["pictures_mtss", "CategoryName", "AlbumName"]
          if (folderParts.length >= 2) {
            categoryName = folderParts[1].replace(/_/g, ' '); // Clean formatting
          }
          if (folderParts.length >= 3) {
            albumName = folderParts[2].replace(/_/g, ' ');
          }
        }

        return {
          media_type: 'image',
          url: img.secure_url,
          category: categoryName,
          album: albumName,
          alt_text: img.public_id ? img.public_id.split('/').pop() : 'MTSS Gallery Image',
          created_at: new Date(img.created_at).toISOString()
        };
      });

      // Bulk insert this batch into Supabase
      const { error } = await supabase
        .from('gallery_media')
        .insert(payload);

      if (error) {
        console.error("❌ Supabase Insertion Error for batch:", error.message);
      } else {
        totalMigrated += payload.length;
        console.log(`✅ Successfully processed and indexed ${payload.length} items (Total: ${totalMigrated})`);
      }

    } catch (err) {
      console.error("❌ Migration loop encountered an error:", err);
      break;
    }

  } while (nextCursor);

  console.log(`\n🎉 Migration complete! Total assets indexed in Supabase: ${totalMigrated}`);
}

migrate();