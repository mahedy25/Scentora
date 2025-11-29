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
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function Cart() {
  const groupedItems = useCartStore((state) => state.getGroupedItems())
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => setIsClient(true), [])

  if (!isClient) return <Loader />

  // EMPTY CART
  if (groupedItems.length === 0) {
    return (
      <div className='container min-h-screen mx-auto p-4 flex flex-col items-center h-screen justify-center'>
        <div className='flex justify-center'>
          <h1
            className={`text-3xl ${cinzel.className} text-[#670626] mb-2 text-center`}
          >
            My Shopping Cart
          </h1>
        </div>

        {/* Elegant Divider */}
        <div className='w-28 h-1 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full mb-6'></div>

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
      if (checkoutUrl) window.location.href = checkoutUrl
    } catch (error) {
      console.log('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container min-h-screen mx-auto p-4 max-w-6xl'>
      {/* Heading */}
      <h1
        className={`text-3xl ${cinzel.className} text-[#670626] mb-2 text-center`}
      >
        My Shopping Cart
      </h1>

      <div className='w-28 h-1 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full mx-auto mb-10'></div>

      <div className='flex flex-col lg:flex-row gap-10'>
        {/* CART ITEMS */}
        <div className='grow'>
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className='p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white flex flex-col sm:flex-row items-center gap-4 mb-4'
            >
              <div
                className='flex items-center flex-1 cursor-pointer'
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className='w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden'>
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? 'Product image'}
                      width={96}
                      height={96}
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>

                <div className='ml-4'>
                  <h2 className='text-lg font-semibold'>{item.product.name}</h2>
                  <p className='text-sm text-gray-600 mt-1'>
                    Price: ${item.product.price?.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className='shrink-0'>
                <AddToCartButton product={item.product} />
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className='w-full lg:w-80 bg-white p-6 border rounded-xl shadow-lg h-fit'>
          <h3 className={`text-xl font-semibold mb-4 ${cinzel.className}`}>
            Order Summary
          </h3>

          <div className='space-y-3'>
            <p className='flex justify-between text-gray-700'>
              <span>Items:</span>
              <span>
                {groupedItems.reduce((t, item) => t + item.quantity, 0)}
              </span>
            </p>

            <p className='flex justify-between text-2xl font-bold border-t pt-3 text-[#670626]'>
              <span>Total:</span>
              <span>${useCartStore.getState().getTotalPrice().toFixed(2)}</span>
            </p>
          </div>

          {isSignedIn ? (
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className='mt-5 w-full bg-[#670626] text-white hover:bg-[#D9004C] py-3 rounded-md transition disabled:bg-gray-400'
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </Button>
          ) : (
            <SignInButton mode='modal'>
              <Button className='mt-5 w-full bg-[#670626] text-white hover:bg-[#D9004C] py-3 rounded-md transition'>
                Sign in to Checkout
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  )
}
