'use client'
import Image from 'next/image'
import ShieldLogo from '../assets/logo.svg'
import { usePathname } from 'next/navigation'

export function Logo() {
  const pathname = usePathname()
  let logoClassName = 'w-96'

  if (pathname !== '/') {
    logoClassName = 'w-40'
  }

  return (
    <div className="mb-12 flex items-center justify-center">
      <Image
        className={`${logoClassName} transition-transform`}
        src={ShieldLogo}
        alt="Strategic Homeland Intervention, Enforcement and Logistics Division"
      ></Image>
    </div>
  )
}
