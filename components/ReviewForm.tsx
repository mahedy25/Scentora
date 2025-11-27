'use client'

import { useState } from 'react'

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0)
  const [userName, setUserName] = useState('')
  const [title, setTitle] = useState('')
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
        title,
        comment,
      }),
    })

    setLoading(false)

    if (res.ok) {
      setSuccess(true)
      setRating(0)
      setUserName('')
      setTitle('')
      setComment('')
    }
  }

  return (
    <div className='p-6 border rounded-xl mt-10 shadow-sm bg-white'>
      <h2 className='text-2xl font-bold mb-4'>Write a Review</h2>

      {/* Rating stars */}
      <div className='flex gap-2 mb-4'>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`text-2xl ${
              rating >= n ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <input
        type='text'
        className='border p-2 w-full mb-3 rounded'
        placeholder='Your name'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <input
        type='text'
        className='border p-2 w-full mb-3 rounded'
        placeholder='Review title (optional)'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className='border p-2 w-full mb-3 rounded'
        placeholder='Write your review...'
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className='bg-[#670626] cursor-pointer text-white px-5 py-2 rounded-lg'
      >
        {loading ? 'Posting...' : 'Submit Review'}
      </button>

      {success && (
        <p className='text-green-600 mt-3'>Review posted successfully!</p>
      )}
    </div>
  )
}
