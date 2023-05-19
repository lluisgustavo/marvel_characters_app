'use client'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleAgentClick = () => {
    setCookie('isAgent', true)
    router.push('/dossier')
  }

  const handleCivilianClick = () => {
    setCookie('isAgent', false)
    router.push('/join')
  }

  return (
    <main className="flex w-full flex-col items-center space-y-12 text-center font-classified text-5xl">
      <h1>Are you a S.H.I.E.L.D agent?</h1>
      <button
        className="w-1/2 font-bold text-white hover:underline"
        onClick={() => handleAgentClick()}
      >
        Absolutely
      </button>
      <button
        className="w-1/2 font-bold text-white hover:underline"
        onClick={() => handleCivilianClick()}
      >
        Nah, I&apos;m just a civilian passing by
      </button>
    </main>
  )
}
