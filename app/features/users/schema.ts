import {
    bigint, boolean,
    index,
    jsonb,
    pgEnum,
    pgTable, primaryKey,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { products } from "~/features/products/schema";
import { posts } from "~/features/community/schema";
import { USER_ROLE_CONSTANT } from "~/features/users/usersConstants";
import { relations } from "drizzle-orm";
import { authUsers } from "drizzle-orm/supabase";


export const roles = pgEnum("role", USER_ROLE_CONSTANT.map(range => range) as [string, ...string[]]);

export const profiles = pgTable("profiles", {
    profile_id: uuid().primaryKey().references(() => authUsers.id, { onDelete: "cascade" }),
    avatar: text(),
    name: text().notNull(),
    username: text().notNull(),
    headline: text(),
    bio: text(),
    role: roles().default("developer").notNull(),
    stats: jsonb().$type<{ followers: number; following: number; }>(),
    views: jsonb(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
});

export const profileRelations = relations(profiles, ({ many }) => ({
    notifications: many(notifications, {
        relationName: "profile_notifications"
    })
}));

export const follows = pgTable("follows", {
    follower_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade", }).notNull(),
    following_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade", }).notNull(),
    created_at: timestamp().notNull().defaultNow(),
});

export const notificationType = pgEnum("notification_type", [
    "follow",
    "review",
    "reply",
]);

export const notifications = pgTable("notifications", {
    notification_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    source_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade", }),
    product_id: bigint({ mode: "number" }).references(() => products.product_id, { onDelete: "cascade", }),
    post_id: bigint({ mode: "number" }).references(() => posts.post_id, { onDelete: "cascade", }),
    target_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade", }).notNull(),
    type: notificationType().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    seen: boolean().default(false).notNull(),
});


export const notificationRelations = relations(notifications, ({ one }) => ({
    source: one(profiles, {
        fields: [notifications.source_id],
        references: [profiles.profile_id],
    }),
    target: one(profiles, {
        fields: [notifications.target_id],
        references: [profiles.profile_id],
        relationName: "profile_notifications"
    }),
    product: one(products, {
        fields: [notifications.product_id],
        references: [products.product_id],
    }),
    post: one(posts, {
        fields: [notifications.post_id],
        references: [posts.post_id],
    }),
}));


export const messageRooms = pgTable("message_rooms", {
    message_room_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().notNull().defaultNow(),
});

export const messageRoomRelations = relations(messageRooms, ({ many }) => ({
    members: many(messageRoomMembers),
    messages: many(messages)
}));

export const messageRoomMembers = pgTable("message_room_members", {
        message_room_id: bigint({ mode: "number" }).references(() => messageRooms.message_room_id, { onDelete: "cascade", }).notNull(),
        profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade", }).notNull(),
        created_at: timestamp().notNull().defaultNow(),
    },
    (table) => [
        primaryKey({ columns: [table.message_room_id, table.profile_id] }),
        index("idx_message_room_members_profile_id").on(table.profile_id)
    ]
);

export const messageRoomMemberRelations = relations(messageRoomMembers, ({ one }) => ({
    member: one(profiles, {
        fields: [messageRoomMembers.profile_id],
        references: [profiles.profile_id],
    }),
    room: one(messageRooms, {
        fields: [messageRoomMembers.message_room_id],
        references: [messageRooms.message_room_id],
    })
}));



export const messages = pgTable("messages", {
    message_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    message_room_id: bigint({ mode: "number" }).references(() => messageRooms.message_room_id, { onDelete: "cascade", }).notNull(),
    sender_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade", }).notNull(),
    content: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
});

export const messageRelations = relations(messages, ({ one }) => ({
    sender: one(profiles, {
        fields: [messages.sender_id],
        references: [profiles.profile_id],
    }),
    room: one(messageRooms, {
        fields: [messages.message_room_id],
        references: [messageRooms.message_room_id],
    })

}));