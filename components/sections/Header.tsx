'use client'

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import Link from 'next/link'
import { PackageIcon, TrolleyIcon } from '@sanity/icons'
import { Button } from '../ui/button'
import { useCartStore } from '@/app/(store)/store'
import Form from 'next/form'
import { useState } from 'react'
import { XIcon } from 'lucide-react'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default function Header() {
  const { user } = useUser()
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey()
      console.log(response)
    } catch (err) {
      console.error('Error', JSON.stringify(err, null, 2))
    }
  }

  const [searchQuery, setSearchQuery] = useState('')

  // Clear the search input when X is clicked
  const clearSearch = () => setSearchQuery('')

  return (
    <section className='flex flex-wrap justify-between items-center px-6 py-4 bg-white shadow-md'>
      <Link
        href='/'
        className={`text-4xl ${lobster.className}  text-[#670626] hover:text-[#670626]/90 cursor-pointer tracking-wide`}
      >
        Cube Fashion
      </Link>

      <Form
        action='/search'
        className='w-full sm:w-auto sm:flex-1 sm:mx-6 mt-4 sm:mt-0'
      >
        <div className='relative w-full max-w-full sm:max-w-xl'>
          <input
            type='text'
            name='query'
            value={searchQuery} // Bind the input value to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update the state as the user types
            placeholder='Search for products'
            className='bg-gray-200 text-gray-800 px-5 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#670626] focus:ring-opacity-75 w-full text-lg pr-10'
          />
          {searchQuery && (
            <button
              type='button'
              onClick={clearSearch} // Clear the search when clicked
              className='cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-black'
            >
              <XIcon className='w-5 h-5' />
            </button>
          )}
        </div>
      </Form>

      <div className='flex items-center space-x-4 mt-4 sm:mt-0'>
        <Link
          href='/cart'
          className='relative flex justify-center items-center space-x-2 bg-[#D9004C] text-white hover:bg-[#A5003D] font-semibold py-2 px-4 rounded-lg transition-all'
        >
          <TrolleyIcon className='w-6 h-6' />
          {/* Item count badge */}
          <span className='absolute -top-2 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
            {itemCount}
          </span>
          <span className='hidden sm:block'>Cart</span>
        </Link>

        <ClerkLoaded>
          <SignedIn>
            {user && (
              <Link
                href='/orders'
                className='flex justify-center items-center space-x-2 bg-[#D9004C] text-white hover:bg-[#A5003D] font-semibold py-2 px-4 rounded-lg transition-all'
              >
                <PackageIcon className='w-6 h-6' />
                <span className='hidden sm:block'>Orders</span>
              </Link>
            )}
          </SignedIn>

          {user ? (
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 rounded-full border-2 border-[#670626]'>
                <UserButton />
              </div>

              <div className='hidden sm:flex flex-col items-start'>
                <p className='text-xs text-[#670626] font-medium'>
                  Welcome Back
                </p>
                <p className='text-sm font-semibold'>
                  {user.fullName ?? user.username}
                </p>
              </div>
            </div>
          ) : (
            <div className='py-1 px-3 text-sm bg-[#D9004C] text-white rounded-full hover:bg-[#A5003D] transition-all'>
              <SignInButton mode='modal' />
            </div>
          )}

          {/* Passkey button for users without passkeys */}
          {user?.passkeys.length === 0 && (
            <Button
              onClick={createClerkPasskey}
              className='text-sm py-1.5 px-3 bg-[#D9004C] text-white rounded-full mt-3 sm:mt-0 hover:bg-[#A5003D]'
            >
              Create passkey
            </Button>
          )}
        </ClerkLoaded>
      </div>
    </section>
  )
}
