import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Call this once: POST /api/admin/setup
// Makes the sod-storage bucket public so all existing and future images are accessible.
export async function POST() {
  const { data, error } = await supabaseAdmin.storage.updateBucket("sod-storage", {
    public: true,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
