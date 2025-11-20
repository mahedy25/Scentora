import { Category, Product } from '@/sanity.types'
import ProductGrid from './ProductGrid'
import { CategorySelector } from './CategorySelector'

interface ProductsViewProps {
  products: Product[]
  categories: Category[]
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className='flex flex-col gap-6 p-4'>
      {/* Categories Section */}
      <div className='flex justify-center items-center'>
        <div className='w-full max-w-[250px] md:max-w-[300px] lg:max-w-[350px]'>
          <CategorySelector categories={categories} />
        </div>
      </div>

      {/* Products Section */}
      <div className='w-full bg-white rounded-lg'>
        {/* Render All The Products */}
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default ProductsView
