'use client'
import { deleteCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function Return() {
  const router = useRouter()
  async function handleReturnClick() {
    if (hasCookie('isAgent')) deleteCookie('isAgent')
    router.push('/')
  }
  return (
    <button
      onClick={() => handleReturnClick()}
      className="py-4 text-center text-5xl font-bold text-white shadow-md hover:underline md:text-start"
    >
      Return
    </button>
  )
}
