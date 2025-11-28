import { Category, Product } from '@/sanity.types'
import ProductGrid from './ProductGrid'
import { CategorySelector } from './CategorySelector'

interface ProductsViewProps {
  products: Product[]
  categories: Category[]
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className='flex flex-col gap-10  py-4'>
      {/* CATEGORY DROPDOWN */}
      <div className='flex justify-center'>
        <div className='w-full max-w-xs sm:max-w-sm md:max-w-md'>
          <CategorySelector categories={categories} />
        </div>
      </div>

      {/* PRODUCTS LIST */}
      <div
        className='
          bg-white rounded-xl 
        '
      >
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default ProductsView
