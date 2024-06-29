import { createClient } from "@supabase/supabase-js";
import envs from "@/config/envs";

const url = String(new URL(envs.SUPABASE_URL, document.baseURI));

export const supabase = createClient(url, envs.SUPABASE_KEY);