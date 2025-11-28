import Link from 'next/link'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { Category } from '@/sanity.types'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export default async function Categories() {
  const categories: Category[] = await getAllCategories()

  return (
    <section className='w-full px-6 py-16'>
      <h1
        className={`
      text-3xl sm:text-4xl md:text-5xl
      font-semibold
      ${cinzel.className}
      text-[#670626]
      tracking-wide
      text-center
    `}
      >
        Shop by Category
      </h1>

      {/* Divider */}
      <div className='relative w-32 sm:w-40 h-1 mx-auto mt-4 mb-12'>
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
        <div className='absolute inset-0 blur-xl bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-40 rounded-full'></div>
      </div>

      <div className='w-full flex justify-center'>
        <div
          className='
      grid
      grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
      gap-6
      w-full
      max-w-7xl   
      px-4
      justify-items-center
      place-items-center
    '
        >
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat.slug?.current}`}
              className='group p-6 rounded-xl bg-white border border-[#670626]/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.05] hover:border-[#D9004C]/50 hover:bg-[#670626]/5'
            >
              <p className='text-center font-semibold text-[#670626] group-hover:text-[#D9004C] tracking-wide transition-colors'>
                {cat.title}
              </p>

              <div className='mt-2 h-0.5 w-0 bg-linear-to-r from-[#670626] to-[#D9004C] mx-auto rounded-full transition-all group-hover:w-16'></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
