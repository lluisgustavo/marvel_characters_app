import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { SuperbeingCard } from './SuperbeingCard'

interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface DossierContentProps {
  offset: number
  total: number
  handleOffset: (direction: 'left' | 'right') => void
  characters: Character[]
}

export function DossierContent({
  offset,
  total,
  handleOffset,
  characters,
}: DossierContentProps) {
  return (
    <div className="flex h-full items-center justify-between px-12">
      <div>
        <ArrowLeftCircle
          onClick={() => handleOffset('left')}
          size={60}
          className={`${
            offset !== 0
              ? 'text-zinc-400 hover:text-zinc-100'
              : 'text-transparent'
          }  transition-colors `}
        />
      </div>
      <div className="container mx-auto grid grid-cols-5 gap-8 p-6">
        {characters.map((character) => (
          <SuperbeingCard
            key={character.id}
            characterId={character.id}
            name={character.name}
            description={character.description}
            thumbnail={character.thumbnail}
          />
        ))}
      </div>
      {offset !== total && (
        <ArrowRightCircle
          onClick={() => handleOffset('right')}
          size={60}
          className={`${
            offset !== total
              ? 'text-zinc-400 hover:text-zinc-100'
              : 'text-transparent'
          }  transition-colors `}
        />
      )}
    </div>
  )
}
