import type { Tables } from "@/database.types";


export type getProducdtsByUserIdForDashBoardType = Pick<Tables<"products">, "name" | 'product_id'>


export type getUserProfileByIdForEditType = Pick<Tables<"profiles">, "name" | "avatar" | "headline" | "role"| "bio"| "username">