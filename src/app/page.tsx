import HomeButton from '@/components/Home/Button'

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center space-y-16 text-center font-classified text-3xl sm:text-4xl md:text-5xl">
      <h1>Are you a S.H.I.E.L.D agent?</h1>
      <HomeButton
        text="Absolutely"
        url="/dossier"
        cookieName="isAgent"
        cookieState={true}
      />
      <HomeButton
        text="Nah, I'm just a civilian passing by"
        url="/join"
        cookieName="isAgent"
        cookieState={false}
      />
    </main>
  )
}
