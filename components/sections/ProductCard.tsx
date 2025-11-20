import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/sanity.types'
import { imageUrl } from '@/lib/ImageUrl'

export default function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0

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
      ? description.substring(0, 50) + '...'
      : description

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col items-start justify-between gap-6 p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
        isOutOfStock ? 'opacity-50 pointer-events-none' : ''
      } max-w-[300px] h-[400px] shrink-0`}
    >
      {/* Image */}
      <div className='relative w-full h-[220px] overflow-hidden rounded-lg'>
        {product.image && (
          <Image
            className='object-cover transition-transform duration-300'
            src={imageUrl(product.image).url()}
            alt={product.name || 'Product Image'}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        )}

        {isOutOfStock && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg'>
            <span className='text-white text-sm font-semibold'>
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className='w-full mt-4 flex flex-col justify-between h-[150px]'>
        <h2 className='text-lg font-semibold text-gray-800'>{product.name}</h2>
        <p className='mt-2 text-sm text-gray-600 line-clamp-3'>
          {truncatedDescription}
        </p>
        <p className='mt-4 text-lg font-bold text-gray-900'>
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}
