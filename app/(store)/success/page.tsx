'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCartStore } from '../store'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function Success() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')
  const sessionId = searchParams.get('session_id')
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    if (orderNumber && sessionId) {
      clearCart()
      useCartStore.persist.clearStorage()
    }
  }, [orderNumber, sessionId, clearCart])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white px-6 py-10'>
      {/* SUCCESS ICON */}
      <div className='flex justify-center mb-8'>
        <div className='h-24 w-24 bg-[#e9e5dc] rounded-full flex items-center justify-center shadow-md'>
          <svg
            className='h-14 w-14 text-[#198a0b]'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
      </div>

      {/* TITLE */}
      <h1
        className={`${cinzel.className} text-3xl font-semibold text-[#670626] text-center mb-3`}
      >
        Thank You for Your Order
      </h1>

      <p className='text-base text-gray-700 text-center mb-6'>
        Your purchase was successful and is now being processed.
      </p>

      {/* ORDER DETAILS */}
      <div className='space-y-1 mb-8 text-center'>
        {orderNumber && (
          <p className='text-sm text-gray-600'>
            <span className='font-semibold text-[#670626]'>Order Number:</span>{' '}
            {orderNumber}
          </p>
        )}
        {sessionId && (
          <p className='text-sm text-gray-600'>
            <span className='font-semibold text-[#670626]'>Session ID:</span>{' '}
            {sessionId}
          </p>
        )}
      </div>

      {/* FOOTER TEXT */}
      <p className='text-gray-600 text-center mb-8'>
        A confirmation email has been sent to your inbox.
      </p>

      {/* BUTTONS */}
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <Button
          asChild
          className='bg-[#670626] hover:bg-[#D9004C] text-white px-8 py-3 rounded-md'
        >
          <Link href='/orders'>View Order History</Link>
        </Button>

        <Button
          asChild
          variant='outline'
          className='border-[#670626] text-[#670626] hover:bg-[#f8e7eb] px-8 py-3 rounded-md'
        >
          <Link href='/'>Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
