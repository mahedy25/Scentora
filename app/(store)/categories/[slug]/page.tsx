import ProductsView from '@/components/sections/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
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
    <div className='flex flex-col items-center justify-top min-h-screen  p-4'>
      <div className=' p-8 rounded-lg w-full'>
        {/* Headline with Lobster font */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl ${lobster.className} text-[#670626] hover:text-[#670626]/90 cursor-pointer tracking-wide mb-4 text-center md:mb-6`}
        >
          {title} Collection
        </h1>

        {/* Gradient Divider */}
        <div className='relative w-32 h-1 mx-auto mb-8'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
          <div className='absolute inset-0 blur-md bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60'></div>
        </div>

        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  )
}
