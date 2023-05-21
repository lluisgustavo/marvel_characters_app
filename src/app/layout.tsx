import './globals.css'
import { Roboto_Flex as Roboto, Poppins, Special_Elite } from 'next/font/google'
import { ReactNode } from 'react'
import { Logo } from '@/components/Logo/Logo'

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
        className={`${poppins.variable} ${specialElite.variable} ${roboto.variable} m-4 max-h-screen bg-darkgrey font-sans text-gray-100 sm:m-6 md:m-8 lg:m-16`}
      >
        <Logo />
        {children}
      </body>
    </html>
  )
}
