import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Cube Fashion')
    
    .items([
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('order').title('Orders'),
      S.documentTypeListItem('sale').title('Sales'),
      S.documentTypeListItem('newsletter').title('Newsletter Subscriptions'),
      S.documentTypeListItem('navigation').title('Navigation'),
      S.divider(),
     ...S.documentTypeListItems().filter(
      (item) => item.getId() && !['product', 'category', 'order', 'sale','newsletter', 'navigation'].includes(item.getId()!)
     )
    ])
