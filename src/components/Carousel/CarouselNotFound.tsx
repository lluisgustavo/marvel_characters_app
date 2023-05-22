import Image from 'next/image'
import ShieldLogo from '@/assets/logo.svg'

export default function CarouselNotFound() {
  return (
    <div className="flex h-full min-h-[600px] w-full flex-col items-center justify-center space-y-24 sm:py-8">
      <Image
        className="w-3/4 sm:w-3/6"
        src={ShieldLogo}
        alt="Nothing Found"
      ></Image>
      <p className="text-center text-3xl">No records found in our database</p>
    </div>
  )
}
