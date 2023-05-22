'use client'

import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export function ReturnButton() {
  const router = useRouter()
  const handleReturnClick = () => {
    deleteCookie('isAgent')
    router.push('/')
  }

  return (
    <div className="flex w-full items-center justify-center">
      <button
        className="mb-12 text-center text-3xl text-zinc-300"
        onClick={handleReturnClick}
      >
        Encrypt Database
      </button>
    </div>
  )
}
