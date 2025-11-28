import { Button } from '../ui/button'
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode'
import { COUPON_CODES } from '@/sanity/lib/sales/couponCodes'
import Link from 'next/link'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export default async function SaleBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY25)

  if (!sale?.isActive) return null

  return (
    <div
      className='
        bg-linear-to-br from-[#D9004C] via-[#7A002A] to-black
        text-white rounded-2xl shadow-2xl
        px-8 py-14 sm:px-12 lg:px-20
        border border-white/10
      '
    >
      <div
        className='
          grid 
          grid-cols-1 md:grid-cols-2 
          gap-12 md:gap-20
          items-center
        '
      >
        {/* LEFT — HEADLINE + DESCRIPTION */}
        <div className='space-y-6 lg:space-y-8'>
          <h2
            className={`
              text-4xl sm:text-5xl lg:text-6xl 
              font-bold leading-tight tracking-tight
              ${cinzel.className}
            `}
          >
            {sale.title}
          </h2>

          <p
            className='
              text-lg sm:text-xl lg:text-2xl
              text-white/85 leading-relaxed 
              max-w-xl
            '
          >
            {sale.description}
          </p>
        </div>

        {/* RIGHT — COUPON CARD */}
        <div className='flex md:justify-end'>
          <div
            className='
              bg-white/10 backdrop-blur-2xl
              px-8 py-7 rounded-2xl
              border border-white/20
              shadow-xl 
              w-full sm:w-auto
              space-y-4
              text-center md:text-left
            '
          >
            <p className='text-sm sm:text-base uppercase tracking-wide text-white/70'>
              Use Code
            </p>

            <span
              className='
                bg-white text-black 
                px-8 py-3 rounded-md 
                text-xl sm:text-2xl 
                font-bold tracking-widest 
                inline-block shadow-md
              '
            >
              {sale.couponCode}
            </span>

            <p className='text-sm sm:text-base text-white/75'>
              {sale.discountAmount}% off orders over{' '}
              <span className='font-semibold'>$30</span>
            </p>

            <Link href='/all-products'>
              <Button
                className='
                  mt-2 py-3 px-10
                  text-base sm:text-lg 
                  font-semibold uppercase 
                  tracking-wide w-full md:w-auto
                '
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
