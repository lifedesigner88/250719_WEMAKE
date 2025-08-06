import { createClient } from '@supabase/supabase-js';
import type { Database as SupabaseDatabase } from "@/database.types";
import type { MergeDeep, SetFieldType, SetNonNullable } from "type-fest";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

type Database = MergeDeep<
    SupabaseDatabase,
    {
        public: {
            Views: {
                community_post_list_view: {
                    Row: SetFieldType<
                        SetNonNullable<
                            SupabaseDatabase["public"]["Views"]["comunity_post_list_view"]["Row"]
                        >,
                        "avatarSrc", string | null
                    >;
                };
            };
        };
    }
>;

const supabase = createClient<Database>(supabaseUrl!, supabaseKey!);

export default supabase