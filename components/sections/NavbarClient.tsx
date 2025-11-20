'use client'

import Link from 'next/link'
import { DynamicIcon } from '../DynamicIcon'

interface NavItem {
  title?: string | null
  href?: string | null
  icon?: string | null
  isExternal?: boolean | null
}

interface FloatingDockClientProps {
  navItems: NavItem[]
}

interface DockLink {
  title: string
  href?: string
  icon: React.ReactNode
  isExternal?: boolean | null
  onClick?: () => void
}

const MAX_VISIBLE_ITEMS_MOBILE = 8

const getVisibleLinks = (links: DockLink[], maxItems: number) => {
  const shouldShowMore = links.length > maxItems
  return {
    shouldShowMore,
    visible: shouldShowMore ? links.slice(0, maxItems) : links,
    hidden: shouldShowMore ? links.slice(maxItems) : [],
  }
}

export function FloatingDockClient({ navItems }: FloatingDockClientProps) {
  // Remove sidebar state logic
  const links: DockLink[] = navItems.map((item) => ({
    title: item.title || 'Untitled',
    href: item.href || '#',
    icon: <DynamicIcon iconName={item.icon || 'IconHome'} />,
    isExternal: item.isExternal,
  }))

  const mobile = getVisibleLinks(links, MAX_VISIBLE_ITEMS_MOBILE)

  return (
    <>
      {/* Floating Dock - Now always visible */}
      <div className='fixed z-9999 transition-all duration-300 pointer-events-none group/dock bottom-0 left-1/2 -translate-x-1/2 md:-translate-y-1/2'>
        <div className='flex items-center gap-2 px-3 py-2.5 rounded-xl md:rounded-2xl bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-all duration-300'>
          {mobile.visible.map((item) => (
            <DockIcon
              key={`${item.title}-${item.href}`}
              item={item}
              isVertical={false}
            />
          ))}
        </div>
      </div>
    </>
  )
}

const DockTooltip = ({
  direction,
  title,
}: {
  direction: 'vertical' | 'horizontal'
  title: string
}) => {
  const isHorizontal = direction === 'horizontal'
  return (
    <div
      className={`absolute px-3 py-1.5 ${
        isHorizontal ? 'rounded-xl' : 'rounded-lg'
      } bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 ${
        isHorizontal ? 'text-xs md:text-sm' : 'text-sm'
      } font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] ${
        isHorizontal
          ? '-top-9 md:-top-12 left-1/2 -translate-x-1/2 group-hover:-translate-y-2'
          : 'right-14 top-1/2 -translate-y-1/2 group-hover:-translate-x-1'
      }`}
    >
      {title}
      <div
        className={`absolute w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 ${
          isHorizontal
            ? '-bottom-1 left-1/2 -translate-x-1/2 border-r border-b'
            : '-right-1 top-1/2 -translate-y-1/2 border-r border-t'
        } border-white/40 dark:border-white/20`}
      />
    </div>
  )
}

function DockIcon({
  item,
  isVertical,
  onItemClick,
}: {
  item: DockLink
  isVertical: boolean
  onItemClick?: () => void
}) {
  const baseIconClasses =
    'relative flex items-center justify-center w-full h-full rounded-full backdrop-blur-md transition-all'
  const verticalIconClasses = `${baseIconClasses} bg-white/40 dark:bg-white/20 border border-white/50 dark:border-white/30 duration-300 hover:scale-110 hover:bg-white/50 dark:hover:bg-white/30 hover:border-white/70 dark:hover:border-white/40`
  const horizontalIconClasses = `${baseIconClasses} bg-white/10 dark:bg-white/5 group-hover/dock:bg-white/40 dark:group-hover/dock:bg-white/20 backdrop-blur-md border border-white/20 dark:border-white/10 group-hover/dock:border-white/50 dark:group-hover/dock:border-white/30 duration-500 ease-out hover:scale-125 hover:-translate-y-2 md:hover:-translate-y-3 hover:!bg-white/50 dark:hover:!bg-white/30 hover:!border-white/70 dark:hover:!border-white/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]`

  const handleClick = (e?: React.MouseEvent) => {
    if (item.onClick) {
      e?.preventDefault()
      item.onClick()
    }
    onItemClick?.()
  }

  const content = (
    <>
      <div className={isVertical ? verticalIconClasses : horizontalIconClasses}>
        <div
          className={`w-6 h-6 md:w-6 md:h-6 ${
            isVertical
              ? 'text-neutral-500 dark:text-neutral-300'
              : 'text-neutral-400/60 group-hover/dock:text-neutral-500 dark:text-neutral-300/60 dark:group-hover/dock:text-neutral-300 group-hover:text-neutral-600! dark:group-hover:text-neutral-200! transition-colors duration-300'
          }`}
        >
          {item.icon}
        </div>
      </div>
      <DockTooltip
        direction={isVertical ? 'vertical' : 'horizontal'}
        title={item.title || 'Untitled'}
      />
    </>
  )

  const wrapperClasses =
    'group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12'

  return item.onClick ? (
    <button type='button' onClick={handleClick} className={wrapperClasses}>
      {content}
    </button>
  ) : (
    <Link
      href={item.href || '#'}
      target={item.isExternal ? '_blank' : undefined}
      rel={item.isExternal ? 'noopener noreferrer' : undefined}
      className={wrapperClasses}
      scroll={!item.isExternal}
      onClick={onItemClick}
    >
      {content}
    </Link>
  )
}
