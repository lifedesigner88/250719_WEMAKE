import db from "@/db";
import { products } from "~/features/products/schema";


export type CreateProductType = typeof products.$inferInsert;

export const createProduct = async (data: CreateProductType) => {
    const [product] = await db.insert(products).values(data).returning()
    return product;
}