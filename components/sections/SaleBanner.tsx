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
        py-12 sm:py-16 lg:py-20
        border border-white/10
      '
    >
      {/* Soft Glows */}
      <div className='absolute -top-24 -right-20 w-72 h-72 bg-[#FF006A]/25 blur-[120px] rounded-full'></div>
      <div className='absolute -bottom-24 -left-20 w-72 h-72 bg-[#FF006A]/15 blur-[120px] rounded-full'></div>

      <div
        className='
          grid 
          grid-cols-1 lg:grid-cols-2
          gap-14 lg:gap-24
          items-center
          relative z-10
          max-w-7xl mx-auto
        '
      >
        {/* LEFT CONTENT */}
        <div className='space-y-6 text-center lg:text-left'>
          <h2
            className={`
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              font-bold leading-tight tracking-tight
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
        </div>

        {/* RIGHT — RESPONSIVE COUPON CARD */}
        <div className='flex justify-center lg:justify-end w-full'>
          <div
            className='
              bg-white/10 backdrop-blur-2xl
              px-8 sm:px-10 md:px-12 
              py-10 sm:py-12 
              rounded-3xl
              border border-white/20
              shadow-[0_0_30px_rgba(255,255,255,0.15)]
              w-full max-w-sm
              flex flex-col items-center
              space-y-8
              text-center
            '
          >
            <p className='text-xs sm:text-sm uppercase tracking-[0.25em] text-white/70'>
              Limited Time Offer
            </p>

            {/* Divider */}
            <div className='w-16 border-t border-white/30 mx-auto'></div>

            {/* COUPON BOX */}
            <span
              className='
                bg-white text-black 
                px-10 sm:px-12 py-4
                rounded-xl
                text-2xl sm:text-3xl font-bold
                tracking-[0.35em]
                shadow-[0_0_25px_rgba(255,255,255,0.2)]
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
