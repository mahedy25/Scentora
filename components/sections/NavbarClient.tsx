import Link from 'next/link'
import { DynamicIcon } from '../DynamicIcon'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

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
        className='
          fixed bottom-6 left-1/2 -translate-x-1/2 
          z-9999 pointer-events-none group/dock
          transition-all duration-300
        '
      >
        <div
          className='
            flex items-center gap-3 px-4 py-3 
            rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.45)]
            pointer-events-auto transition-all duration-300

            /* New premium theme */
            bg-linear-to-br from-[#2b0011]/90 via-[#3a0014]/70 to-black/60
            backdrop-blur-2xl
            border border-[#ff0055]/10
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
      className={`${cinzel.className}
        absolute font-semibold px-3 py-1.5 rounded-xl backdrop-blur-xl
        bg-black/85 text-white tracking-wide
        border border-white/10 shadow-2xl whitespace-nowrap
        opacity-0 scale-90 group-hover:opacity-100 
        group-hover:scale-100 transition-all duration-300
        ${
          isHorizontal
            ? '-top-11 left-1/2 -translate-x-1/2'
            : 'right-14 top-1/2 -translate-y-1/2'
        }
      `}
    >
      {title}

      <div
        className={`
          absolute w-2 h-2 rotate-45 bg-black
          border border-white/10
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
  onItemClick,
}: {
  item: DockLink
  isVertical: boolean
  onItemClick?: () => void
}) {
  const baseIconClasses =
    'relative flex items-center justify-center w-full h-full rounded-full transition-all'


  const horizontalIconClasses = `
    ${baseIconClasses}
    bg-white backdrop-blur-xl
    border border-[#ff0055]/20
    hover:border-[#ff0055]/40
    hover:bg-black/60 
    hover:scale-125 hover:-translate-y-2
    shadow-[0_0_18px_rgba(255,0,90,0.2)]
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
      <div className={horizontalIconClasses}>
        <div
          className='
            w-6 h-6 text-white
             group-hover/dock:text-white 
           transition-colors duration-300
          '
        >
          {item.icon}
        </div>
      </div>

      <DockTooltip direction={'horizontal'} title={item.title || 'Untitled'} />
    </>
  )

  const wrapperClasses =
    'group relative flex items-center justify-center w-12 h-12 rounded-full'

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
