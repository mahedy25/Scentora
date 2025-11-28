import Link from 'next/link'
import { DynamicIcon } from '../DynamicIcon'

interface NavItem {
  title?: string | null
  href?: string | null
  icon?: string | null
  isExternal?: boolean | null
}

interface NavbarClientProps {
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

export function NavbarClient({ navItems }: NavbarClientProps) {
  const links: DockLink[] = navItems.map((item) => ({
    title: item.title || 'Untitled',
    href: item.href || '#',
    icon: <DynamicIcon iconName={item.icon || 'IconHome'} />,
    isExternal: item.isExternal,
  }))

  const mobile = getVisibleLinks(links, MAX_VISIBLE_ITEMS_MOBILE)

  return (
    <>
      {/* Floating Dock */}
      <div
        className='fixed bottom-0 left-1/2 -translate-x-1/2 md:-translate-y-1/2 
        z-9999 pointer-events-none group/dock transition-all duration-300'
      >
        <div
          className='
            flex items-center gap-2 px-3 py-2.5 rounded-xl md:rounded-2xl
            bg-white/70 dark:bg-[#1f1f1f]/70
            backdrop-blur-xl
            border border-white/60 dark:border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
            dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]
            hover:bg-white/80 dark:hover:bg-[#2a2a2a]/80
            pointer-events-auto transition-all duration-300
          '
        >
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

/* Tooltip */
function DockTooltip({
  direction,
  title,
}: {
  direction: 'vertical' | 'horizontal'
  title: string
}) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div
      className={`
        absolute px-3 py-1.5 rounded-xl backdrop-blur-xl
        bg-white dark:bg-[#111]
        text-neutral-900 dark:text-neutral-200
        border border-black/10 dark:border-white/10
        shadow-xl whitespace-nowrap
        opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
        transition-all duration-300
        ${
          isHorizontal
            ? '-top-10 left-1/2 -translate-x-1/2'
            : 'right-14 top-1/2 -translate-y-1/2'
        }
      `}
    >
      {title}

      <div
        className={`
          absolute w-2 h-2 rotate-45 
          bg-white dark:bg-[#111]
          border border-black/10 dark:border-white/10
          ${
            isHorizontal
              ? '-bottom-1 left-1/2 -translate-x-1/2'
              : '-right-1 top-1/2 -translate-y-1/2'
          }
        `}
      ></div>
    </div>
  )
}

/* Dock Icon Component */
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
    'relative flex items-center justify-center w-full h-full rounded-full backdrop-blur-xl transition-all'

  const verticalIconClasses = `
    ${baseIconClasses}
    bg-white/40 dark:bg-white/20
    border border-white/50 dark:border-white/30
    hover:scale-110
    hover:bg-white/50 dark:hover:bg-white/30
    hover:border-white/70 dark:hover:border-white/40
    duration-300
  `

  const horizontalIconClasses = `
    ${baseIconClasses}
    bg-black/5 dark:bg-white/10
    border border-black/10 dark:border-white/20
    group-hover/dock:bg-black/10 dark:group-hover/dock:bg-white/20
    group-hover/dock:border-black/20 dark:group-hover/dock:border-white/40
    hover:scale-125 hover:-translate-y-2 md:hover:-translate-y-3
    transition-all duration-300
  `

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
          className={`
            w-6 h-6 md:w-6 md:h-6
            text-neutral-700 dark:text-neutral-200
            group-hover/dock:text-neutral-900 dark:group-hover/dock:text-white
            transition-colors duration-300
          `}
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
    'group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12 rounded-full'

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
