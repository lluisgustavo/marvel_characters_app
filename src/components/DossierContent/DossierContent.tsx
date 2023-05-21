import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { SuperbeingCard } from '../SuperbeingCard/SuperbeingCard'

export interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface DossierContentProps {
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
    <div className="flex h-full flex-col items-center justify-between space-y-8 pb-12 md:px-12 lg:flex-row">
      <div className="mt-8 lg:mt-0">
        <ArrowLeftCircle
          onClick={() => handleOffset('left')}
          size={60}
          className={`${
            offset !== 0
              ? 'text-zinc-400 hover:text-zinc-100'
              : 'text-transparent'
          }  transition-colors `}
          data-testid="left-arrow"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 md:gap-8 lg:grid-cols-2 lg:p-6 xl:grid-cols-3 2xl:grid-cols-5">
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
      <div className="">
        {offset !== total && (
          <ArrowRightCircle
            onClick={() => handleOffset('right')}
            size={60}
            className={`${
              offset !== total
                ? 'text-zinc-400 hover:text-zinc-100'
                : 'text-transparent'
            }  transition-colors `}
            data-testid="right-arrow"
          />
        )}
      </div>
    </div>
  )
}
