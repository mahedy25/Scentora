import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { NewsletterForm } from '../NewsletterForm'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function Footer() {
  return (
    <footer className='bg-black text-gray-300 pt-16 pb-10 mt-auto w-full border-t border-white/10'>
      <div className='max-w-screen-2xl mx-auto px-6'>
        <div
          className='
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-14
        '
        >
          {/* BRAND */}
          <div>
            <h2
              className={`${cinzel.className} text-3xl font-semibold text-white`}
            >
              Scentora
            </h2>

            <p className='mt-4 text-sm text-gray-400 leading-relaxed max-w-xs'>
              Crafting timeless fragrances with elegance and depth. Scentora
              blends luxury with artistry — creating scents that leave a lasting
              impression.
            </p>

            {/* SOCIAL ICONS */}
            <div className='flex gap-4 mt-6'>
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href='#'
                  className='hover:text-white transition-colors'
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3
              className={`${cinzel.className} text-lg font-semibold text-white mb-4`}
            >
              Shop
            </h3>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li>
                <Link className='hover:text-white' href='/products'>
                  All Perfumes
                </Link>
              </li>
              <li>
                <Link className='hover:text-white' href='/on-sale'>
                  On Sale
                </Link>
              </li>
              <li>
                <Link className='hover:text-white' href='/categories'>
                  Categories
                </Link>
              </li>
              <li>
                <Link className='hover:text-white' href='/new-arrivals'>
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3
              className={`${cinzel.className} text-lg font-semibold text-white mb-4`}
            >
              Customer Care
            </h3>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li>
                <Link className='hover:text-white' href='/help'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link className='hover:text-white' href='/shipping'>
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link className='hover:text-white' href='/returns'>
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link className='hover:text-white' href='/contact'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3
              className={`${cinzel.className} text-lg font-semibold text-white mb-4`}
            >
              Join the Scentora Circle
            </h3>
            <p className='text-sm text-gray-400 mb-4 max-w-xs'>
              Receive exclusive launches, rare limited editions, and
              private-member fragrance drops.
            </p>

            <NewsletterForm />
          </div>
        </div>

        {/* DIVIDER */}
        <div className='w-40 h-1 mx-auto mt-16 relative'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
          <div className='absolute inset-0 blur-lg bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60 rounded-full'></div>
        </div>

        {/* COPYRIGHT */}
        <div className='pt-6 text-center text-sm text-gray-500 mb-20'>
          © {new Date().getFullYear()} Scentora — The Art of Fragrance.
        </div>
      </div>
    </footer>
  )
}
