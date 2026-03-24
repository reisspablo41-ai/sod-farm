import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const BUCKET = "sod-storage";

// Ensure the bucket is public so uploaded images are viewable without auth
async function ensureBucketPublic() {
  await supabaseAdmin.storage.updateBucket(BUCKET, { public: true });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  await ensureBucketPublic();

  const ext = file.name.split(".").pop();
  const fileName = `grass-types/${Date.now()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, buffer, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
