import { groq } from "next-sanity"
import { client } from "../client"
import type { Product } from "@/sanity.types"

export const LATEST_PRODUCTS_QUERY = groq`
  *[_type == "product"]
  | order(_createdAt desc)[0...5]
`

export async function getLatestProducts() {
  return await client.fetch<Product[]>(LATEST_PRODUCTS_QUERY)
}
