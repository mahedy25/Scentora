
import SaleBanner from "@/components/sections/SaleBanner";


export const dynamic = 'force-static'
export const revalidate = 60;

export default async function Home() {

  return (
    <div className='px-2 mt-4 md:px-6 xl:px-10'>
      <SaleBanner />
    </div>
  )
}
