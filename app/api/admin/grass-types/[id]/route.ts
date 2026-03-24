import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PUT(request: Request, ctx: RouteContext<"/api/admin/grass-types/[id]">) {
  const { id } = await ctx.params;
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("grass_types")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/grass-types/[id]">) {
  const { id } = await ctx.params;

  const { error } = await supabaseAdmin
    .from("grass_types")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
