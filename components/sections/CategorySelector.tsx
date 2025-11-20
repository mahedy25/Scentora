'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Category } from '@/sanity.types'

interface CategorySelectorProps {
  categories: Category[]
}

export function CategorySelector({ categories }: CategorySelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const router = useRouter()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full max-w-[250px] mx-auto flex justify-center items-center space-x-2 bg-linear-to-r from-[#670626] to-[#D9004C] text-white hover:text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105 transition-all'
        >
          {value
            ? categories.find((category) => category._id === value)?.title
            : 'Select a category'}
          <ChevronsUpDown className='ml-2 h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full max-w-[250px] mx-auto p-0'>
        <Command>
          <CommandInput
            className='h-15'
            placeholder='Search category...'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                )
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id)
                  router.push(`/categories/${selectedCategory.slug.current}`)
                }
                setOpen(false)
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  className='cursor-pointer'
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    setValue(value === category._id ? '' : category._id)
                    router.push(`/categories/${category.slug?.current}`)
                    setOpen(false)
                  }}
                >
                  {category.title}
                  <Check
                    className={`ml-auto h-4 w-4 ${
                      value === category._id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
