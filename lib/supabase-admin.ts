import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPBASE_SECRET_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
