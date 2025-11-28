import ProductCard from './ProductCard'
import { getOnSaleProducts } from '@/sanity/lib/products/getOnSaleProducts'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export default async function OnSaleProducts() {
  const products = await getOnSaleProducts()

  return (
    <section className='w-full px-4 sm:px-6 lg:px-10 py-12'>
      {/* Header */}
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl font-semibold ${cinzel.className}
          text-[#670626] tracking-wide text-center mb-2`}
      >
        On Sale Products
      </h1>

      {/* Gradient Divider */}
      <div className='relative w-40 h-1 mx-auto mb-10'>
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full' />
        <div className='absolute inset-0 blur-xl opacity-70 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626]' />
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className='text-gray-500 text-center'>
          No products on sale right now.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
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
