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
        relative overflow-hidden rounded-3xl 
        bg-linear-to-br from-[#B3003C] via-[#5A001D] to-black
        px-6 sm:px-10 md:px-16 lg:px-24 
        py-14 sm:py-18 lg:py-24
        border border-white/10
        shadow-xl
      '
    >
      {/* Soft Glows */}
      <div className='absolute -top-28 -right-24 w-88 h-88 bg-[#FF006A]/25 blur-[140px] rounded-full'></div>
      <div className='absolute -bottom-28 -left-24 w-88 h-88 bg-[#FF006A]/15 blur-[140px] rounded-full'></div>

      <div
        className='
          grid grid-cols-1 lg:grid-cols-2
          gap-16 lg:gap-28
          items-center
          relative z-10
          max-w-7xl mx-auto
        '
      >
        {/* LEFT CONTENT */}
        <div className='space-y-7 text-center lg:text-left'>
          <h2
            className={`
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              font-bold leading-[1.15] tracking-tight
              ${cinzel.className}
              text-white
            `}
          >
            {sale.title}
          </h2>

          <p
            className='
              text-base sm:text-lg md:text-xl
              text-white/85 leading-relaxed 
              max-w-xl mx-auto lg:mx-0
            '
          >
            {sale.description}
          </p>

          {/* Discount Badge */}
          {sale.discountAmount && (
            <div className='flex justify-center lg:justify-start'>
              <span
                className='
                  bg-white/15 text-white backdrop-blur-xl
                  px-6 py-2
                  rounded-full
                  text-lg sm:text-xl font-semibold
                  border border-white/20
                  shadow-[0_0_20px_rgba(255,255,255,0.18)]
                '
              >
                Save {sale.discountAmount}% in every order
              </span>
            </div>
          )}
        </div>

        {/* RIGHT — RESPONSIVE COUPON CARD */}
        <div className='flex justify-center lg:justify-end w-full'>
          <div
            className='
              bg-white/10 backdrop-blur-2xl
              px-10 sm:px-12 md:px-14 
              py-12 sm:py-14 
              rounded-3xl
              border border-white/20
              shadow-[0_0_35px_rgba(255,255,255,0.15)]
              w-full max-w-sm
              flex flex-col items-center
              space-y-9
              text-center
            '
          >
            <p className='text-xs sm:text-sm uppercase tracking-[0.28em] text-white/70'>
              Limited Time Offer
            </p>

            <div className='w-20 border-t border-white/30 mx-auto'></div>

            {/* Coupon Box */}
            <span
              className='
                bg-white text-black 
                px-12 py-4
                rounded-2xl
                text-2xl sm:text-3xl font-bold
                tracking-[0.35em]
                shadow-[0_0_35px_rgba(255,255,255,0.25)]
              '
            >
              {sale.couponCode}
            </span>

            <Link href='/all-products' className='w-full'>
              <Button
                className='
                  w-full py-4 sm:py-5
                  text-base sm:text-lg
                  font-semibold uppercase 
                  tracking-wide
                  rounded-xl
                  shadow-lg shadow-black/10
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
