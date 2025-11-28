'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/sanity.types'
import { imageUrl } from '@/lib/ImageUrl'
import AddToCart from '@/components/AddToCart'

export default function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0

  const price = typeof product.price === 'number' ? product.price : undefined
  const discount =
    typeof product.discountPrice === 'number'
      ? product.discountPrice
      : undefined

  // Extract description
  const description = product.description
    ? product.description
        .map((block) =>
          block._type === 'block'
            ? block.children?.map((child) => child.text).join('')
            : ''
        )
        .join('')
    : 'No description available'

  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 90) + '...'
      : description

  const percentOff =
    price && discount && price > 0
      ? Math.round(((price - discount) / price) * 100)
      : null

  return (
    <div
      className={`
        group flex flex-col 
        p-5 rounded-xl 
        border border-gray-200 
        shadow-sm hover:shadow-xl 
        hover:border-[#D9004C]/40
        transition-all duration-300 
        bg-white 
        ${isOutOfStock ? 'opacity-50' : ''}
      `}
    >
      {/* IMAGE */}
      <Link
        href={`/product/${product.slug?.current}`}
        className='relative w-full h-[220px] overflow-hidden rounded-lg block'
      >
        {discount && (
          <span className='absolute top-3 left-3 z-10 px-2 py-1 text-xs font-semibold rounded-md bg-[#D9004C] text-white shadow-md'>
            {percentOff ? `${percentOff}% OFF` : 'Sale'}
          </span>
        )}

        {product.image && (
          <Image
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            src={imageUrl(product.image).url()}
            alt={product.name || 'Product Image'}
            fill
          />
        )}

        {isOutOfStock && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg'>
            <span className='text-white text-sm font-semibold'>
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* TEXT */}
      <Link
        href={`/product/${product.slug?.current}`}
        className='mt-4 block flex-1'
      >
        <h2 className='text-lg font-semibold text-gray-900 leading-tight group-hover:text-[#D9004C] transition-colors'>
          {product.name}
        </h2>

        <p className='mt-2 text-sm text-gray-600 line-clamp-3'>
          {truncatedDescription}
        </p>
      </Link>

      {/* PRICE + ADD TO CART */}
      <div className='mt-5 flex items-center justify-between w-full'>
        {/* PRICE SECTION */}
        <div className='flex flex-col'>
          {discount && price ? (
            <>
              <span className='text-xl font-bold text-gray-900'>
                ${discount.toFixed(2)}
              </span>
              <span className='text-sm text-gray-500 line-through'>
                ${price.toFixed(2)}
              </span>
            </>
          ) : price ? (
            <span className='text-xl font-bold text-gray-900'>
              ${price.toFixed(2)}
            </span>
          ) : (
            <span className='text-xl font-bold text-gray-900'>—</span>
          )}
        </div>

        {/* CART BUTTON */}
        <div onClick={(e) => e.stopPropagation()} className='shrink-0'>
          <AddToCart product={product} disabled={isOutOfStock} />
        </div>
      </div>
    </div>
  )
}
