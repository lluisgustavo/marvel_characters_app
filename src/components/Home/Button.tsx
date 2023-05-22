'use client'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

type ButtonProps = {
  text: string
  url: string
  cookieName: string
  cookieState: boolean
}

export default function HomeButton({
  text,
  url,
  cookieName,
  cookieState,
}: ButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    setCookie(cookieName, cookieState)
    router.push(url)
  }

  return (
    <button
      className="font-bold text-white hover:underline md:w-1/2"
      onClick={handleClick}
    >
      {text}
    </button>
  )
}
