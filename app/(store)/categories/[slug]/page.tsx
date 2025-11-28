import ProductsView from '@/components/sections/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const products = await getProductsByCategory(slug)
  const categories = await getAllCategories()

  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className='flex flex-col items-center min-h-screen px-4 py-10'>
      <div className='w-full  mx-auto'>
        {/* Category Title */}
        <h1
          className={`
    ${cinzel.className}
    text-center
    text-2xl sm:text-3xl md:text-4xl lg:text-5xl
    text-[#670626]
    tracking-wide
  `}
        >
          {title} Collection
        </h1>

        {/* Gradient Divider */}
        <div className='relative w-40 h-1 mx-auto mt-4 mb-10'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full' />
          <div className='absolute inset-0 blur-xl bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-40 rounded-full' />
        </div>

        {/* Products */}
        <div className='w-full mx-auto max-w-7xl'>
          <ProductsView products={products} categories={categories} />
        </div>
      </div>
    </div>
  )
}
