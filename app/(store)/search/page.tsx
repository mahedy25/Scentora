import ProductGrid from '@/components/sections/ProductGrid'
import { Button } from '@/components/ui/button'
import { searchPruductsByName } from '@/sanity/lib/products/searchPruductsByName'
import Link from 'next/link'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default async function Search({
  searchParams,
}: {
  searchParams: { query: string }
}) {
  const { query } = await searchParams
  const products = await searchPruductsByName(query)

  // ---- NO RESULTS ----
  if (!products.length) {
    return (
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='bg-white p-10 rounded-xl shadow-sm text-center max-w-md w-full border border-gray-100'>
          <h1
            className={`${cinzel.className} text-2xl font-semibold text-[#670626]`}
          >
            No Results for “<span className='text-[#D9004C]'>{query}</span>”
          </h1>

          <p className='mt-3 text-sm text-gray-600'>
            We couldn’t find any perfumes matching your search. Try another
            fragrance or keyword.
          </p>

          <Link href='/products'>
            <Button className='mt-6 w-full bg-[#D9004C] text-white hover:bg-[#670626] py-3 rounded-md'>
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // ---- RESULTS ----
  return (
    <div className='min-h-screen py-10'>
      <div className='max-w-7xl mx-auto bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
        <h1
          className={`${cinzel.className} text-3xl font-semibold text-[#670626] mb-10 text-center`}
        >
          Search results for <span className='text-[#D9004C]'>{query}</span>
        </h1>

        <ProductGrid products={products} />
      </div>
    </div>
  )
}
