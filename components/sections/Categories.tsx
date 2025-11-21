import Link from 'next/link'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { Category } from '@/sanity.types'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default async function Categories() {
  const categories: Category[] = await getAllCategories()

  return (
    <section className='w-full px-6 py-14'>
      {/* Title */}
      <h1
        className={`text-2xl sm:text-3xl md:text-4xl ${lobster.className} text-[#670626] hover:text-[#670626]/90 cursor-pointer tracking-wide mb-4 text-center md:mb-6`}
      >
        Shop by Category
      </h1>

      {/* Fancy Divider */}
      <div className='relative w-28 sm:w-32 md:w-40 h-1 mx-auto mt-4 mb-10'>
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
        <div className='absolute inset-0 blur-lg bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60 rounded-full'></div>
      </div>

      {/* Categories Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat.slug?.current}`}
            className='group p-6 rounded-xl bg-white border border-[#670626]/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.05] hover:border-[#D9004C]/50 hover:bg-[#670626]/5'
          >
            <p className='text-center font-semibold text-[#670626] group-hover:text-[#D9004C] tracking-wide transition-colors'>
              {cat.title}
            </p>

            {/* Glow underline on hover */}
            <div className='mt-2 h-0.5 w-0 bg-linear-to-r from-[#670626] to-[#D9004C] mx-auto rounded-full transition-all group-hover:w-16'></div>
          </Link>
        ))}
      </div>
    </section>
  )
}
