import Image from 'next/image'
import { Button } from '../ui/button'
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode'
import { COUPON_CODES } from '@/sanity/lib/sales/couponCodes'
import { Lobster } from 'next/font/google'

// Define the Lobster font
const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default async function SaleBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY25)

  if (!sale?.isActive) return null

  return (
    <div className='bg-linear-to-r from-[#670626] to-[#D9004C] text-white py-8 px-6 sm:px-10 font-medium shadow-lg rounded-lg flex flex-col sm:flex-row items-center justify-between'>
      {/* Left Side - Text */}
      <div className='sm:w-1/2 text-center sm:text-left mb-6 sm:mb-0 flex flex-col justify-center'>
        <h2
          className={`text-3xl sm:text-5xl font-extrabold leading-tight ${lobster.className}`}
        >
          🎉 {sale.title}
        </h2>
        <p className='mt-4 text-lg sm:text-xl'>{sale.description}</p>
        <div className='mt-6'>
          <h3 className='text-lg sm:text-xl font-semibold'>
            Use Code:{' '}
            <span className='font-extrabold text-yellow-300'>
              {sale.couponCode}
            </span>
          </h3>
          <h4 className='text-md sm:text-lg mt-2'>
            for <span className='font-extrabold'>{sale.discountAmount}%</span>{' '}
            off on a<span className='font-bold'> $30 or more purchase</span>
          </h4>
        </div>
        <div>
          <Button className='mt-8 py-3 px-8 text-lg bg-[#D9004C] hover:bg-[#670626] rounded-lg uppercase tracking-wide'>
            Shop Now
          </Button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className='hidden sm:w-1/2 mt-6 sm:mt-0 md:flex justify-center sm:justify-end'>
        <Image
          src='/images/sale.jpg' // Add your sale-related image here
          alt='Weekend Sale'
          width={300} // Adjust the width and height as needed
          height={300}
          className='object-contain rounded-lg shadow-2xl'
        />
      </div>
    </div>
  )
}
