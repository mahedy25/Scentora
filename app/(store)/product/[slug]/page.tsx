// app/product/[slug]/page.tsx  (example path)
import AddToCartButton from '@/components/AddToCartButton'
import { imageUrl } from '@/lib/ImageUrl'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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
  const price = typeof product.price === 'number' ? product.price : undefined
  const discount =
    typeof product.discountPrice === 'number'
      ? product.discountPrice
      : undefined
  const percentOff =
    price && discount ? Math.round(((price - discount) / price) * 100) : null

  return (
    <div className='container mx-auto px-6 py-16 min-h-svh'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
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
        <div className='flex flex-col justify-start'>
          <div>
            <h1
              className={`text-4xl sm:text-5xl font-bold text-[#670626] mb-4`}
            >
              {product.name}
            </h1>

            <div className='mb-4'>
              {discount && price ? (
                <div className='flex items-baseline gap-4'>
                  <div className='text-3xl font-extrabold text-gray-900'>
                    ${discount.toFixed(2)}
                  </div>
                  <div className='text-lg text-gray-500 line-through'>
                    ${price.toFixed(2)}
                  </div>
                  {percentOff !== null && (
                    <div className='ml-2 inline-block px-2 py-1 text-sm font-semibold bg-[#D9004C] text-white rounded'>
                      Save {percentOff}%
                    </div>
                  )}
                </div>
              ) : price ? (
                <div className='text-2xl font-semibold text-gray-800'>
                  ${price.toFixed(2)}
                </div>
              ) : (
                <div className='text-2xl font-semibold text-gray-800'>—</div>
              )}
            </div>

            <div className='prose max-w-none text-gray-700'>
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>

          <div className='mt-8'>
            <AddToCartButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  )
}
