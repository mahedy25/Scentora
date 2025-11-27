'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@/sanity.types'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/app/(store)/store'

interface AddToCartProps {
  product: Product
  disabled?: boolean
  className?: string
}

export default function AddToCart({
  product,
  disabled,
  className,
}: AddToCartProps) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <Button
      size='sm'
      onClick={() => !disabled && addItem(product)}
      disabled={disabled}
      className={cn(
        'bg-black hover:bg-[#bf0042] text-white font-medium px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-[#D9004C]',
        className
      )}
    >
      {disabled ? 'Out of Stock' : 'Add To Cart'}
    </Button>
  )
}
