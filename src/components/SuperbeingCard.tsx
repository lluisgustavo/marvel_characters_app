import Image from 'next/image'
import {
  formatCharacterName,
  formatDescription,
  getImageUrl,
} from '@/utils/character'

interface CharacterCard {
  characterId: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export function SuperbeingCard({
  characterId,
  name,
  description,
  thumbnail,
}: CharacterCard) {
  const imageUrl = getImageUrl(thumbnail)
  const nameFormatted = formatCharacterName(name)
  const descriptionFormatted = formatDescription(description)

  async function showProfileCard() {}

  return (
    <div
      onClick={() => showProfileCard()}
      className="group col-span-1 flex flex-1 cursor-pointer flex-col flex-wrap  bg-transparent transition-colors hover:border-2 hover:border-teal-300 hover:bg-slate-900"
    >
      <h2 className="mb-2 flex h-24 items-center justify-center whitespace-pre-wrap text-center text-2xl font-bold uppercase leading-relaxed tracking-wide text-zinc-300 transition-colors group-hover:text-zinc-100">
        {nameFormatted}
      </h2>
      <Image
        className="object-fit aspect-square w-full"
        src={imageUrl}
        width={300}
        height={300}
        alt={name}
      />
      <p
        className={`px-2 py-5 text-center text-base text-zinc-300 transition-colors group-hover:text-zinc-100`}
      >
        {descriptionFormatted}
      </p>
    </div>
  )
}
