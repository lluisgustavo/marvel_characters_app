import Image from 'next/image'
import {
  formatCharacterName,
  formatDescription,
  getImageUrl,
} from '@/utils/character'
import { useRouter } from 'next/navigation'

export interface CharacterCard {
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
  const router = useRouter()
  const imageUrl = getImageUrl(thumbnail)
  const nameFormatted = formatCharacterName(name)
  const descriptionFormatted = formatDescription(description)

  async function showProfileCard() {
    try {
      router.push(`/dossier/profile/${characterId}`)
    } catch (error) {
      console.error('Error fetching character profile:', error)
    }
  }

  return (
    <div
      onClick={() => showProfileCard()}
      className="group flex min-h-[500px] flex-1 cursor-pointer flex-col bg-transparent p-2 transition-colors hover:border-2 hover:border-teal-300 hover:bg-slate-900"
      data-testid="superbeing-card"
    >
      <h2 className="mb-2 flex h-24 items-center justify-center whitespace-pre-wrap text-center text-2xl font-bold uppercase leading-relaxed tracking-wide text-zinc-300 transition-colors group-hover:text-zinc-100">
        {nameFormatted}
      </h2>
      <Image
        data-testid="superbeing-card-image"
        className="aspect-square h-[250px] w-[250px] object-cover"
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
