'use client'
import Image from 'next/image'
import Link from 'next/link'
import ShieldLogo from '@/assets/logo.svg'
import { usePathname } from 'next/navigation'

export function Logo() {
  const pathname = usePathname()
  let logoClassName = 'w-96'
  let bgClassName = 'mb-12'

  if (pathname !== '/') {
    logoClassName = 'w-40'
  }

  if (pathname.includes('profile')) {
    logoClassName = 'w-24'
    bgClassName = 'bg-transparent mb-12 sticky'
  }

  return (
    <div className={`${bgClassName} flex items-center justify-center`}>
      <Link href="/">
        <Image
          className={`${logoClassName} transition-transform`}
          src={ShieldLogo}
          alt="Strategic Homeland Intervention, Enforcement and Logistics Division"
        />
      </Link>
    </div>
  )
}
