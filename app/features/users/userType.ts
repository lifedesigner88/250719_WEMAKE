import type { Tables } from "@/database.types";


export type getProducdtsByUserIdForDashBoardType = Pick<Tables<"products">, "name" | 'product_id'>
