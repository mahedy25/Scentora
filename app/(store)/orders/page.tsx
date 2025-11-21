import { formatCurrency } from '@/lib/formatCurrency'
import { imageUrl } from '@/lib/ImageUrl'
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default async function Orders() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const orders = await getMyOrders(userId)

  return (
    <div className='flex flex-col items-center justify-start min-h-screen '>
      <div className='p-6 sm:p-8 rounded-xl  w-full max-w-5xl backdrop-blur'>
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl ${lobster.className} text-[#670626] hover:text-[#670626]/90 cursor-pointer tracking-wide mb-4 text-center md:mb-6`}
        >
          My Orders
        </h1>

        {/* ✨ Modern Gradient Divider */}
        <div className='relative w-32 h-1 mx-auto mb-8'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full'></div>
          <div className='absolute inset-0 blur-md bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-60'></div>
        </div>

        {orders.length === 0 ? (
          <div className='text-center text-gray-600 py-12'>
            <p className='text-lg'>You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <div className='space-y-8'>
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className='bg-white/80 border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg hover:border-gray-300'
              >
                <div className='p-6 border-b border-gray-200'>
                  {/* Order Header */}
                  <div className='flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center'>
                    <div>
                      <p className='text-sm font-semibold text-gray-700'>
                        Order Number
                      </p>
                      <p className='font-mono text-sm text-green-700 break-all mt-1'>
                        {order.orderNumber}
                      </p>
                    </div>

                    <div className='sm:text-right'>
                      <p className='text-sm font-semibold text-gray-700'>
                        Order Date
                      </p>
                      <p className='mt-1 text-gray-900'>
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Status + Total */}
                  <div className='mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-700 font-medium'>
                        Status:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm capitalize font-semibold ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className='sm:text-right'>
                      <p className='text-sm font-semibold text-gray-700'>
                        Total Amount
                      </p>
                      <p className='text-xl font-bold mt-1'>
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </p>
                    </div>
                  </div>

                  {order.amountDiscount ? (
                    <div className='mt-6 p-4 bg-red-50 rounded-lg border border-red-200'>
                      <p className='text-red-600 font-medium'>
                        Discount Applied:{' '}
                        {formatCurrency(order.amountDiscount, order.currency)}
                      </p>
                      <p className='text-sm text-gray-700 mt-1'>
                        Original Subtotal:{' '}
                        {formatCurrency(
                          (order.totalPrice ?? 0) + order.amountDiscount,
                          order.currency
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* Order Items */}
                <div className='p-6'>
                  <p className='text-sm font-semibold text-gray-700 mb-4'>
                    Order Items
                  </p>

                  <div className='space-y-4'>
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 last:border-none'
                      >
                        <div className='flex items-center gap-4'>
                          {product.product?.image && (
                            <div className='relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden shadow-sm'>
                              <Image
                                src={imageUrl(product.product.image).url()}
                                alt={product.product?.name ?? ''}
                                className='object-cover'
                                fill
                              />
                            </div>
                          )}
                          <div>
                            <p className='font-medium text-gray-900'>
                              {product.product?.name}
                            </p>
                            <p className='text-sm text-gray-700 mt-1'>
                              Quantity: {product.quantity ?? 'N/A'}
                            </p>
                          </div>
                        </div>

                        <p className='text-right font-semibold text-gray-900'>
                          {product.product?.price && product.quantity
                            ? formatCurrency(
                                product.product.price * product.quantity,
                                order.currency
                              )
                            : 'N/A'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
