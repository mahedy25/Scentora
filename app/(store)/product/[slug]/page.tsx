import AddToCart from '@/components/AddToCart'
import ProductGallery from '@/components/sections/ProductGallary'
import ReviewForm from '@/components/ReviewForm'

import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { PortableText } from 'next-sanity'
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

  if (!product) return notFound()

  const price = typeof product.price === 'number' ? product.price : undefined
  const discount =
    typeof product.discountPrice === 'number'
      ? product.discountPrice
      : undefined

  const percentOff =
    price && discount ? Math.round(((price - discount) / price) * 100) : null

  const isOutOfStock = product.stock != null && product.stock <= 0

  const avgRating = product.ratings?.length
    ? (
        product.ratings.reduce((sum, r) => sum + (r.rating || 0), 0) /
        product.ratings.length
      ).toFixed(1)
    : null

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-10 py-14 md:py-20'>
      {/* GRID */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-20 items-start'>
        {/* GALLERY */}
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-[500px] lg:max-w-[540px]'>
            <ProductGallery product={product} />
          </div>
        </div>

        {/* DETAILS */}
        <div className='space-y-10'>
          {/* TITLE + RATING */}
          <div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15]'>
              {product.name}
            </h1>

            <div className='mt-4'>
              {avgRating ? (
                <p className='text-yellow-600 font-semibold text-lg flex items-center gap-1'>
                  ⭐ {avgRating}
                  <span className='text-gray-600 text-sm font-normal'>
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </p>
              ) : (
                <p className='text-gray-500 text-sm'>No ratings yet</p>
              )}
            </div>
          </div>

          {/* PRICE BOX */}
          <div className='bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-gray-200'>
            {discount && price ? (
              <div className='flex items-center flex-wrap gap-4'>
                <p className='text-4xl font-extrabold text-gray-900'>
                  ${discount.toFixed(2)}
                </p>

                <p className='text-xl line-through text-gray-500'>
                  ${price.toFixed(2)}
                </p>

                {percentOff !== null && (
                  <span className='px-3 py-1 text-sm bg-[#D9004C] text-white rounded-full font-medium shadow'>
                    Save {percentOff}%
                  </span>
                )}
              </div>
            ) : price ? (
              <p className='text-4xl font-extrabold text-gray-900'>
                ${price.toFixed(2)}
              </p>
            ) : (
              <p className='text-4xl font-bold text-gray-900'>—</p>
            )}

            {isOutOfStock && (
              <p className='text-red-600 mt-2 font-medium text-sm'>
                Out of Stock
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className='prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed'>
            {Array.isArray(product.description) && (
              <PortableText value={product.description} />
            )}
          </div>

          {/* ADD TO CART */}
          <AddToCart product={product} disabled={isOutOfStock} />
        </div>
      </div>

      {/* REVIEW FORM */}
      <div className='mt-24 border-t pt-16'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-8 tracking-tight text-gray-900'>
          Write a Review
        </h2>
        <ReviewForm productId={product._id} />
      </div>

      {/* REVIEW LIST */}
      <div className='mt-24'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-10 tracking-tight text-gray-900'>
          Customer Reviews
        </h2>

        {product.reviews?.length ? (
          <div className='space-y-6'>
            {product.reviews.map((review, i) => (
              <div
                key={i}
                className='p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-200'
              >
                <p className='text-yellow-500 text-xl mb-1'>
                  {'★'.repeat(review.rating || 0)}
                  {'☆'.repeat(5 - (review.rating || 0))}
                </p>

                <h3 className='text-lg font-semibold text-gray-900'>
                  {review.title}
                </h3>

                <p className='text-sm text-gray-500 mb-2'>
                  by {review.userName}
                </p>

                <p className='text-gray-700 leading-relaxed'>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600 text-lg'>
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  )
}
