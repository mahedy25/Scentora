import { groq } from "next-sanity";
import { client } from "../client";
import type { Product } from "@/sanity.types";

export const ON_SALE_PRODUCTS_QUERY = groq`
  *[
    _type == "product" &&
    defined(discountPrice) &&
    discountPrice < price
  ]
  | order(_createdAt desc)
`;

export async function getOnSaleProducts() {
  return await client.fetch<Product[]>(ON_SALE_PRODUCTS_QUERY);
}
