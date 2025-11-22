import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { NewsletterForm } from '../NewsletterForm'

export default function Footer() {
  return (
    <footer className='bg-[#0f0f0f] text-gray-300 pt-16 pb-10 mt-auto w-full'>
      {/* Outer Container that protects layout on all screens */}
      <div className='max-w-screen-2xl mx-auto px-6'>
        {/* Top Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Brand */}
          <div>
            <h2 className='text-2xl font-bold text-white tracking-wide'>
              CubeFashion
            </h2>
            <p className='mt-4 text-sm text-gray-400 leading-relaxed'>
              Premium quality products delivered straight to your doorstep.
              Experience the best with YourBrand.
            </p>

            {/* Social Icons */}
            <div className='flex gap-4 mt-6'>
              <Link href='#' className='hover:text-white transition'>
                <Facebook size={20} />
              </Link>
              <Link href='#' className='hover:text-white transition'>
                <Instagram size={20} />
              </Link>
              <Link href='#' className='hover:text-white transition'>
                <Twitter size={20} />
              </Link>
              <Link href='#' className='hover:text-white transition'>
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Shop</h3>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li>
                <Link className='hover:text-white' href='/products'>
                  All Products
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

          {/* Support */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>
              Customer Support
            </h3>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li>
                <Link className='hover:text-white' href='/help'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link className='hover:text-white' href='/shipping'>
                  Shipping Info
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

          {/* Newsletter */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>
              Join Our Newsletter
            </h3>
            <p className='text-sm text-gray-400 mb-4'>
              Be the first to hear about new products and exclusive offers.
            </p>

            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-800 mt-16 pt-6'>
          <p className='text-center text-sm text-gray-500'>
            © {new Date().getFullYear()} CubeFashion — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
