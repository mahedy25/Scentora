'use client'

import { submitNewsletter } from '@/actions/submit-newsletter'
import { useState, useTransition } from 'react'


export function NewsletterForm() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({
    type: null,
    message: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    startTransition(async () => {
      const result = await submitNewsletter(formData)

      if (result.success) {
        setStatus({ type: 'success', message: "You're subscribed! 🎉" })
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setStatus({ type: null, message: '' }), 4000)
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Something went wrong.',
        })
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-3 w-full max-w-md'
    >
      {status.type && (
        <div
          className={`p-3 rounded-md text-sm ${
            status.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status.message}
        </div>
      )}

      <input
        type='text'
        name='name'
        placeholder='Your name'
        className='px-4 py-2 w-full rounded-md bg-gray-800 text-gray-200 border border-gray-700 
        focus:outline-none focus:border-[#D9004C]'
        required
        disabled={isPending}
      />

      <input
        type='email'
        name='email'
        placeholder='Your email'
        className='px-4 py-2 w-full rounded-md bg-gray-800 text-gray-200 border border-gray-700 
        focus:outline-none focus:border-[#D9004C]'
        required
        disabled={isPending}
      />

      <button
        type='submit'
        disabled={isPending}
        className='px-4 py-2 bg-[#D9004C] hover:bg-[#A5003D] text-white font-semibold rounded-md transition disabled:opacity-50'
      >
        {isPending ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )
}
