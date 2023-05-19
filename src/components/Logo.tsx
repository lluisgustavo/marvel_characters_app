import Image from 'next/image'
import ShieldLogo from '../assets/logo.svg'

export function Logo() {
  return (
    <div className="flex items-center justify-center py-10">
      <Image
        className={`w-32 transition-transform`}
        src={ShieldLogo}
        alt="Strategic Homeland Intervention, Enforcement and Logistics Division"
      ></Image>
    </div>
  )
}
