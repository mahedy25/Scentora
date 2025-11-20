import AddToCartButton from '@/components/AddToCartButton'
import { imageUrl } from '@/lib/ImageUrl'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export const dynamic = 'force-static'
export const revalidate = 60

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return notFound()
  }

  const isOutOfStock = product.stock != null && product.stock <= 0

  return (
    <div className='container mx-auto px-6 py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        {/* Product Image */}
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-xl ${
            isOutOfStock ? 'opacity-60' : ''
          }`}
        >
          {product.image && (
            <Image
              className='object-contain transition-transform duration-300 transform hover:scale-105'
              src={imageUrl(product.image).url()}
              alt={product.name || 'Product Image'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          )}

          {isOutOfStock && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg'>
              <span className='text-white text-lg font-semibold tracking-wider'>
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className='flex flex-col justify-between'>
          <div>
            <h1
              className={`${lobster.className} text-4xl sm:text-5xl font-extrabold text-[#670626] mb-4`}
            >
              {product.name}
            </h1>
            <div className='text-2xl font-semibold text-gray-800 mb-6'>
              ${product.price?.toFixed(2)}
            </div>
            <div className='prose max-w-none text-gray-700'>
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          <div className='mt-6'>
            <AddToCartButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  )
}
