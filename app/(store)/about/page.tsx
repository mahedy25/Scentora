import Image from 'next/image'
import { Cinzel } from 'next/font/google'
import {
  ShieldCheck,
  Heart,
  Sparkles,
  Star,
  Truck,
  BadgeCheck,
  Droplet,
} from 'lucide-react'

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function AboutUs() {
  return (
    <section className='w-full px-6 py-16 max-w-6xl mx-auto'>
      {/* Header */}
      <header className='text-center'>
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl ${cinzel.className} text-[#670626] tracking-wide`}
        >
          Scentora — The Art of Fragrance
        </h1>

        <div className='relative w-40 h-1 mx-auto mt-4 mb-8'>
          <div className='absolute inset-0 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] rounded-full' />
          <div className='absolute inset-0 blur-xl bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] opacity-30 rounded-full' />
        </div>

        <p className='max-w-2xl mx-auto text-[#4b1730] text-base sm:text-lg leading-relaxed'>
          At Scentora we craft more than perfumes — we compose moments. Each
          bottle is designed to capture emotion, memory and elegance using the
          finest ingredients from around the world.
        </p>
      </header>

      {/* Hero / Featured */}
      <div className='mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
        {/* Hero Text */}
        <div className='lg:col-span-2 bg-white border border-[#670626]/10 rounded-2xl p-8 shadow-sm'>
          <h2
            className={`${cinzel.className} text-2xl sm:text-3xl text-[#670626] font-semibold mb-4`}
          >
            Crafted, Not Manufactured
          </h2>
          <p className='text-[#5a2336] leading-relaxed mb-4'>
            Every scent in the Scentora collection is curated by master
            perfumers who blend tradition with innovation. We source rare
            botanicals, precious resins and premium absolutes, then compose them
            into harmonies that evolve beautifully on the skin.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
            <Feature
              title='Fine Ingredients'
              text='Sustainably sourced ingredients chosen for purity and character.'
              icon={<Droplet className='w-6 h-6 text-[#D9004C]' />}
            />
            <Feature
              title='Slow Crafted'
              text='Small-batch blending and careful maturation for lasting depth.'
              icon={<Sparkles className='w-6 h-6 text-[#D9004C]' />}
            />
          </div>
        </div>

        {/* Visual */}
        <div className='relative w-full h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-[#670626]/10'>
          <Image
            src='/images/Dior Sauvage-4.jpg'
            alt='Bottle of Scentora perfume with floral arrangement'
            fill
            className='object-cover'
            priority
          />
        </div>
      </div>

      {/* Mission / Values */}
      <section className='mt-16'>
        <h3
          className={`${cinzel.className} text-2xl text-[#670626] font-semibold text-center mb-8`}
        >
          Our Promise
        </h3>

        <div className='grid gap-6 md:grid-cols-3'>
          <Card
            title='Quality & Transparency'
            desc='We disclose key notes and production methods — so you know exactly what you wear.'
            icon={<ShieldCheck className='w-10 h-10 text-[#D9004C]' />}
          />
          <Card
            title='Ethical Sourcing'
            desc='We partner with growers and cooperatives who share sustainable practices.'
            icon={<BadgeCheck className='w-10 h-10 text-[#D9004C]' />}
          />
          <Card
            title='Designed to Last'
            desc='Concentrated formulas for a refined, enduring scent experience.'
            icon={<Star className='w-10 h-10 text-[#D9004C]' />}
          />
        </div>
      </section>

      {/* How We Create — timeline-like */}
      <section className='mt-16 bg-white border border-[#670626]/10 rounded-2xl p-8 shadow-sm'>
        <h4
          className={`${cinzel.className} text-xl text-[#670626] font-semibold mb-6`}
        >
          How a Scentora Fragrance Is Born
        </h4>

        <ol className='space-y-6'>
          <li className='flex gap-4'>
            <div className='flex-none w-12 h-12 rounded-full bg-[#670626]/5 border border-[#670626]/10 flex items-center justify-center'>
              <span className='font-semibold text-[#670626]'>1</span>
            </div>
            <div>
              <p className='font-medium text-[#4b1730]'>
                Inspiration & Concept
              </p>
              <p className='text-sm text-[#5a2336]'>
                An idea, memory or feeling sets the palette.
              </p>
            </div>
          </li>

          <li className='flex gap-4'>
            <div className='flex-none w-12 h-12 rounded-full bg-[#670626]/5 border border-[#670626]/10 flex items-center justify-center'>
              <span className='font-semibold text-[#670626]'>2</span>
            </div>
            <div>
              <p className='font-medium text-[#4b1730]'>Material Selection</p>
              <p className='text-sm text-[#5a2336]'>
                Only select absolutes, essences and isolates are considered.
              </p>
            </div>
          </li>

          <li className='flex gap-4'>
            <div className='flex-none w-12 h-12 rounded-full bg-[#670626]/5 border border-[#670626]/10 flex items-center justify-center'>
              <span className='font-semibold text-[#670626]'>3</span>
            </div>
            <div>
              <p className='font-medium text-[#4b1730]'>Compose & Mature</p>
              <p className='text-sm text-[#5a2336]'>
                Blends age, are refined, and tested until perfect balance is
                achieved.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Benefits / Why Customers Love Scentora */}
      <section className='mt-16'>
        <h3
          className={`${cinzel.className} text-2xl text-[#670626] font-semibold text-center mb-8`}
        >
          Why Customers Choose Scentora
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <MiniCard
            icon={<Truck className='w-5 h-5 text-[#D9004C]' />}
            text='Fast & secure worldwide shipping'
          />
          <MiniCard
            icon={<Heart className='w-5 h-5 text-[#D9004C]' />}
            text='Loved by fragrance connoisseurs'
          />
          <MiniCard
            icon={<BadgeCheck className='w-5 h-5 text-[#D9004C]' />}
            text='Premium, responsibly-sourced materials'
          />
          <MiniCard
            icon={<Sparkles className='w-5 h-5 text-[#D9004C]' />}
            text='Distinct compositions that evolve beautifully'
          />
        </div>
      </section>

      {/* FAQ */}
      <section className='mt-16'>
        <h4
          className={`${cinzel.className} text-xl text-[#670626] font-semibold text-center mb-6`}
        >
          Frequently Asked
        </h4>

        <div className='space-y-4 max-w-3xl mx-auto'>
          {[
            {
              q: 'How long does shipping take?',
              a: 'Most orders arrive within 3–7 business days depending on destination and shipping method.',
            },
            {
              q: 'Can I return a fragrance?',
              a: 'Yes. Unopened bottles can be returned within 14 days; consult our returns policy for details.',
            },
            {
              q: 'Are your fragrances concentrated?',
              a: 'Our formulations are concentrated for longevity — described on each product as Eau de Parfum or Parfum where applicable.',
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className='group border border-[#670626]/10 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all'
            >
              <summary className='cursor-pointer text-[#670626] font-semibold group-open:text-[#D9004C]'>
                {faq.q}
              </summary>
              <p className='mt-2 text-[#5a2336] text-sm'>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <footer className='mt-16 text-center'>
        <p className='text-[#4b1730] mb-4'>
          Discover our collections and find a scent that tells your story.
        </p>
        <a
          href='/shop'
          className='inline-block px-6 py-3 rounded-md bg-[#670626] text-white hover:bg-[#D9004C] transition'
        >
          Explore Collections
        </a>
      </footer>
    </section>
  )
}

/* -------------------------
   Small presentational components
   (kept inside same file for convenience)
   ------------------------- */

function Feature({
  title,
  text,
  icon,
}: {
  title: string
  text: string
  icon: React.ReactNode
}) {
  return (
    <div className='flex items-start gap-4'>
      <div className='flex-none'>{icon}</div>
      <div>
        <p className='font-medium text-[#4b1730]'>{title}</p>
        <p className='text-sm text-[#5a2336]'>{text}</p>
      </div>
    </div>
  )
}

function Card({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <div className='p-6 bg-white border border-[#670626]/10 rounded-2xl shadow-sm text-center'>
      <div className='flex justify-center mb-3'>{icon}</div>
      <p className='font-semibold text-[#4b1730] mb-2'>{title}</p>
      <p className='text-sm text-[#5a2336]'>{desc}</p>
    </div>
  )
}

function MiniCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className='flex items-center gap-3 p-4 bg-white border border-[#670626]/8 rounded-lg shadow-sm'>
      <div className='flex-none'>{icon}</div>
      <p className='text-sm text-[#5a2336]'>{text}</p>
    </div>
  )
}
