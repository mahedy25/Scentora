'use client'

import { useState } from 'react'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['600', '700'],
  subsets: ['latin'],
})

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [userName, setUserName] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const submitReview = async () => {
    if (!rating || !userName.trim()) return

    setLoading(true)

    const res = await fetch('/api/review/add', {
      method: 'POST',
      body: JSON.stringify({
        productId,
        rating,
        userName,
        comment,
      }),
    })

    setLoading(false)

    if (res.ok) {
      setSuccess(true)
      setRating(0)
      setHover(0)
      setUserName('')
      setComment('')
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <div className='p-6 border border-[#670626]/15 rounded-2xl mt-10 shadow-sm bg-white'>
      <h2
        className={`text-xl sm:text-2xl font-semibold mb-4 text-[#670626] ${cinzel.className}`}
      >
        Share Your Experience
      </h2>

      {/* Rating Stars */}
      <div className='flex gap-2 mb-5'>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className={`text-3xl transition-all duration-150 ${
              (hover || rating) >= n
                ? 'text-yellow-500 scale-110'
                : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Name Input */}
      <input
        type='text'
        className='border border-[#670626]/20 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9004C]/40 transition'
        placeholder='Your name'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      {/* Comment Input */}
      <textarea
        className='border border-[#670626]/20 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9004C]/40 transition'
        placeholder='Write your review...'
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Submit Button */}
      <button
        onClick={submitReview}
        disabled={loading}
        className='bg-[#670626] font-semibold cursor-pointer text-white px-6 py-3 rounded-xl w-full sm:w-auto transition-all duration-200 hover:bg-[#D9004C] disabled:opacity-50'
      >
        {loading ? 'Posting...' : 'Submit Review'}
      </button>

      {/* Success Message */}
      {success && (
        <p className='text-green-600 mt-3 font-medium'>
          Review posted successfully!
        </p>
      )}
    </div>
  )
}
