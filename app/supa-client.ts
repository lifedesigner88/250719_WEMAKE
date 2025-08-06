import { createClient } from '@supabase/supabase-js';
import type { Database } from "@/database.types";
import * as process from "node:process";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase