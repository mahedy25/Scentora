import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { orderType } from './orderType'
import { salesType } from './saleType'
import navigationType from './navigationType'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    blockContentType,
    categoryType,
    orderType,
    salesType,
    navigationType
  ],
}
