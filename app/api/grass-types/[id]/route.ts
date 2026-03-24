import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(_req: Request, ctx: RouteContext<"/api/grass-types/[id]">) {
  const { id } = await ctx.params;

  const { data, error } = await supabaseAdmin
    .from("grass_types")
    .select("*, products(*)")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}
