'use client'
import { deleteCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function Join() {
  const router = useRouter()
  async function handleReturnClick() {
    if (hasCookie('isAgent')) deleteCookie('isAgent')
    router.push('/')
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-16 pb-10 text-justify font-classified">
      <div className="max-w-[960px] space-y-12">
        <h1 className="mb-6 text-center text-5xl font-bold">
          Join S.H.I.E.L.D.
        </h1>
        <p className="mb-8 text-2xl leading-relaxed tracking-wide">
          Are you ready to become part of something extraordinary? S.H.I.E.L.D.
          is seeking brave individuals like you to join our elite team of agents
          and protect Earth from imminent threats. As a S.H.I.E.L.D. agent, you
          will have the opportunity to work alongside legendary superheroes,
          uncover classified information, and make a difference in the world.
        </p>
        <div>
          <h2 className="text-3xl font-bold leading-relaxed tracking-wide">
            Benefits of Joining:
          </h2>
          <ul className="list-inside list-image-[url(~/src/assets/shield.png)] align-middle text-2xl leading-relaxed tracking-wide">
            <li>Access to advanced technology and resources</li>
            <li>Intensive training programs to enhance your skills</li>
            <li>Thrilling missions and adventures</li>
            <li>Collaborate with renowned superheroes and experts</li>
            <li>Make a significant impact on global security</li>
          </ul>
        </div>
        <p className="text-2xl leading-relaxed tracking-wide">
          If you possess courage, integrity, and a relentless drive to protect
          humanity, then seize this opportunity to join our ranks. Submit your
          application today and embark on an incredible journey as a
          S.H.I.E.L.D. agent.
        </p>
        <p className="text-4xl leading-relaxed tracking-wide">
          Remember, the world needs heroes. Will you answer the call?
        </p>
        <p className="text-2xl leading-relaxed tracking-wide">
          We appreciate your interest in joining S.H.I.E.L.D. However, please
          note that revealing the location of our headquarters is strictly
          prohibited. If you try to find us, our highly trained agents will
          track you down with precision. To report any suspicious activities or
          information, call our dedicated hotline at{' '}
          <span className="bg-white px-2 py-1 text-white">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          .
        </p>
        <button
          onClick={() => handleReturnClick()}
          className="py-4 text-5xl font-bold text-white shadow-md hover:underline"
        >
          Return
        </button>
      </div>
    </div>
  )
}
