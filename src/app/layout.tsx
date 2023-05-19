import './globals.css'
import { Roboto_Flex as Roboto, Poppins, Special_Elite } from 'next/font/google'
import ShieldLogo from '../assets/logo.svg'
import Image from 'next/image'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-classified',
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title:
    'Strategic Homeland Intervention, Enforcement and Logistics Division Database',
  description: 'Consumindo API da Marvel',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${specialElite.variable} ${roboto.variable} max-h-full bg-darkgrey font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
