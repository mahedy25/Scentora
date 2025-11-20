
import { sanityFetch } from '@/sanity/lib/live'
import { defineQuery } from 'next-sanity'
import { FloatingDockClient } from './NavbarClient'



const NAVIGATION_QUERY =
  defineQuery(`*[_type == "navigation"] | order(order asc){
  title,
  href,
  icon,
  isExternal
}`)

export async function Navbar() {
  const { data: navItems } = await sanityFetch({ query: NAVIGATION_QUERY })

  if (!navItems || navItems.length === 0) {
    return null
  }

  return <FloatingDockClient navItems={navItems} />
}
