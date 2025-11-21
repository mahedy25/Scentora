'use client'

import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'
import { imageUrl } from '@/lib/ImageUrl'
import Loader from '@/components/Loader'
import { useCartStore } from '../store'
import {
  createCheckoutSession,
  Metadata,
} from '@/actions/createCheckoutSession'
import { Button } from '@/components/ui/button'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default function Cart() {
  const groupedItems = useCartStore((state) => state.getGroupedItems())
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Wait for the client to mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <Loader />
  }

  if (groupedItems.length === 0) {
    return (
      <div className='container mx-auto p-4 flex flex-col items-center justify-start h-screen'>
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl ${lobster.className} text-[#670626] hover:text-[#670626]/90  cursor-pointer tracking-wide mb-4 text-center md:mb-6`}
        >
          My Shopping Cart
        </h1>

        {/* ✨ Modern Gradient Divider */}
        <div className='relative w-32 h-1 mx-auto mb-8'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
          <div className='absolute inset-0 blur-md bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60'></div>
        </div>
        <p className='text-gray-600 text-lg'>Your cart is currently empty</p>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return
    setIsLoading(true)

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? 'Unknown',
        customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
        clerkUserId: user!.id,
      }
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata)
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }
    } catch (error) {
      console.log('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container mx-auto p-4 max-w-6xl h-screen'>
      <h1
        className={`text-2xl sm:text-3xl md:text-4xl ${lobster.className} text-[#670626] hover:text-[#670626]/90 cursor-pointer tracking-wide mb-4 text-center md:mb-6`}
      >
        My Shopping Cart
      </h1>

      {/* ✨ Modern Gradient Divider */}
      <div className='relative w-32 h-1 mx-auto mb-8'>
        <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
        <div className='absolute inset-0 blur-md bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60'></div>
      </div>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='grow'>
          {groupedItems?.map((item) => (
            <div
              key={item.product._id}
              className='mb-4 p-4 border rounded flex items-center justify-between'
            >
              <div
                className='flex items-center cursor-pointer flex-1 min-w-0'
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className='w-20 h-20 sm:w-24 sm:h-24 shrink-0 mr-4'>
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? 'Product image'}
                      className='w-full h-full object-cover rounded'
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className='min-w-0'>
                  <h2 className='text-lg sm:text-xl font-semibold truncate'>
                    {item.product.name}
                  </h2>
                  <div className='text-sm sm:text-base'>
                    <p className='text-sm sm:text-base'>
                      Price: $
                      {(item.product.price ?? 0 * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex items-center ml-4 shrink-0'>
                <AddToCartButton product={item.product} />
              </div>
            </div>
          ))}
        </div>
        <div className='w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last shadow-lg lg:shadow-md mt-8 lg:mt-0'>
          <h3 className='text-xl font-semibold mb-4'>Order Summary</h3>
          <div className='mt-4 space-y-2'>
            <p className='flex justify-between'>
              <span>Items:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className='flex justify-between text-2xl font-bold border-t pt-2'>
              <span>Total:</span>
              <span>${useCartStore.getState().getTotalPrice().toFixed(2)}</span>
            </p>
          </div>
          {isSignedIn ? (
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className='mt-4 w-full  px-4 py-2 rounded  disabled:bg-gray-400'
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </Button>
          ) : (
            <SignInButton mode='modal'>
              <Button className='mt-4 w-full bg-[#670626] text-white px-4 py-2 rounded hover:bg-[#D9004C]'>
                Sign in to Checkout
              </Button>
            </SignInButton>
          )}
        </div>
        <div className='h-64 lg:h-0'>
          {/* Spacer for fixed checkout on mobile */}
        </div>
      </div>
    </div>
  )
}
