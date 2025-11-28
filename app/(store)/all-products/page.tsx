import ProductsView from '@/components/sections/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export default async function AllProducts() {
  const products = await getAllProducts()
  const categories = await getAllCategories()

  return (
    <main className='flex flex-col items-center px-4 py-10'>
      <div className='w-full max-w-7xl text-center mx-auto px-4'>
        {/* Responsive Headline */}
        <h1
          className={`
            ${cinzel.className}
            text-[#670626]
            tracking-wide
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            mb-4
          `}
        >
          All Products
        </h1>

        {/* ✨ Luxury Gradient Divider */}
        <div className='relative w-32 h-1 mx-auto mb-10'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
          <div className='absolute inset-0 blur-md bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60 rounded-full'></div>
        </div>
      </div>

      {/* Products List */}
      <div className='w-full max-w-7xl'>
        <ProductsView products={products} categories={categories} />
      </div>
    </main>
  )
}
