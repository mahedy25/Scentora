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
import { Cinzel } from 'next/font/google'
const cinzel = Cinzel({ weight: '700', subsets: ['latin'] })



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
  const clearSearch = () => setSearchQuery('')

  return (
    <section className='flex flex-wrap justify-between items-center px-6 py-4 bg-white shadow-md'>
      {/* LOGO */}
      <Link
        href='/'
        className={`${cinzel.className} uppercase text-4xl text-[#670626] tracking-[0.12em]`}
      >
        Scentora
      </Link>

      {/* SEARCH BAR */}
      <Form
        action='/search'
        className='w-full sm:flex-1 sm:mx-8 mt-4 sm:mt-0 flex justify-center'
      >
        <div
          className='
        relative w-full max-w-lg
        bg-white/60 backdrop-blur-md border border-[#670626]/20
        shadow-sm rounded-full overflow-hidden
        transition-all focus-within:ring-2 focus-within:ring-[#D9004C]/60
      '
        >
          <input
            type='text'
            name='query'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search Perfume Brands...'
            className='
          text-[#D9004C] font-semibold px-5 py-3 pr-12 w-full
          placeholder:text-black/50 text-base sm:text-lg 
          bg-transparent focus:outline-none
        '
          />

          {/* CLEAR BUTTON */}
          {searchQuery && (
            <button
              type='button'
              onClick={clearSearch}
              className='
            absolute cursor-pointer top-1/2 right-4 -translate-y-1/2
            text-gray-600 hover:text-[#D9004C] transition
          '
            >
              <XIcon className='w-5 h-5' />
            </button>
          )}
        </div>
      </Form>

      {/* RIGHT SIDE — CART / ORDERS / SIGN-IN */}
      <div className='flex items-center ml-auto space-x-3 sm:space-x-4 mt-4 sm:mt-0 text-sm'>
        {/* CART */}
        <Link
          href='/cart'
          className='relative flex justify-center items-center bg-[#D9004C] text-white font-semibold
          py-1.5 px-2 rounded-md transition-all hover:bg-[#A5003D]
          text-xs sm:text-sm'
        >
          <TrolleyIcon className='w-5 h-5 sm:w-6 sm:h-6' />
          <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs'>
            {itemCount}
          </span>
          <span className='hidden sm:block ml-1'>Cart</span>
        </Link>

        <ClerkLoaded>
          <SignedIn>
            {user && (
              <Link
                href='/orders'
                className='flex justify-center items-center bg-[#D9004C] text-white font-semibold 
                py-1.5 px-2 rounded-md transition-all hover:bg-[#A5003D]
                text-xs sm:text-sm'
              >
                <PackageIcon className='w-5 h-5 sm:w-6 sm:h-6' />
                <span className='hidden sm:block ml-1'>Orders</span>
              </Link>
            )}
          </SignedIn>

          {/* USER BUTTON OR SIGN-IN */}
          {user ? (
            <div className='flex items-center space-x-1 sm:space-x-2'>
              <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full  overflow-hidden'>
                <UserButton />
              </div>
            </div>
          ) : (
            <div className='py-1.5 px-3 text-xs sm:text-sm bg-[#D9004C] text-white rounded-full hover:bg-[#A5003D] transition-all'>
              <SignInButton mode='modal' />
            </div>
          )}

          {/* PASSKEY BUTTON */}
          {user?.passkeys.length === 0 && (
            <Button
              onClick={createClerkPasskey}
              className='hidden lg:block text-xs py-1.5 px-3 bg-[#D9004C] text-white rounded-full hover:bg-[#A5003D]'
            >
              Create passkey
            </Button>
          )}
        </ClerkLoaded>
      </div>
    </section>
  )
}
