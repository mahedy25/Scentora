import ProductCard from './ProductCard'
import { getOnSaleProducts } from '@/sanity/lib/products/getOnSaleProducts'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default async function OnSaleProducts() {
  const products = await getOnSaleProducts()

  return (
    <section className='w-full px-6 py-10'>
      <h1
        className={`text-2xl sm:text-3xl md:text-4xl ${lobster.className} text-[#670626] hover:text-[#670626]/90 cursor-pointer tracking-wide mb-4 text-center md:mb-6`}
      >
        On Sale Products
      </h1>

      <div className='relative w-32 h-1 mx-auto mb-8'>
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
        <div className='absolute inset-0 blur-md bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60'></div>
      </div>

      {products.length === 0 ? (
        <p className='text-gray-500 text-center'>
          No products on sale right now.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
          {products.map((product) => (
            <div key={product._id} className='flex justify-center'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
