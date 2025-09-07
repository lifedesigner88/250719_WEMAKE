import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { notificationRelations, notifications, profileRelations, profiles } from "~/features/users/schema";
import { products } from "~/features/products/schema";
import { posts } from "~/features/community/schema";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(client, {
    schema: {
        notifications,
        notificationRelations,

        products,
        posts,

        profiles,
        profileRelations,
    }
});


export default db;
