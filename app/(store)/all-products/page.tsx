import ProductsView from '@/components/sections/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default async function AllProducts() {
  const products = await getAllProducts()
  const categories = await getAllCategories()

  return (
    <main className='flex flex-col items-center justify-center px-4 py-8  '>
      <div className='w-full max-w-7xl text-center mx-auto px-4 py-8'>
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl ${lobster.className} text-[#670626] hover:text-[#670626]/90 cursor-pointer tracking-wide mb-4 text-center md:mb-6`}
        >
          All Products
        </h1>

        {/* ✨ Modern Gradient Divider */}
        <div className='relative w-32 h-1 mx-auto mb-8'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
          <div className='absolute inset-0 blur-md bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60'></div>
        </div>
      </div>

      <div className='w-full'>
        {/* Products View */}
        <ProductsView products={products} categories={categories} />
      </div>
    </main>
  )
}
