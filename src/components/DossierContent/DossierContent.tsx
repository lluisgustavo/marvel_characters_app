import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { SuperbeingCard } from '../SuperbeingCard/SuperbeingCard'
import PageNumber from '../DossierPagination/PageNumber'
import { Pagination } from '@/app/dossier/page'

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
  pagination: Pagination
  handleOffset: (direction: 'left' | 'right' | number) => void
  characters: Character[]
}

export function DossierContent({
  pagination,
  handleOffset,
  characters,
}: DossierContentProps) {
  return (
    <>
      {characters && characters.length > 0 ? (
        <>
          <PageNumber pagination={pagination} handleOffset={handleOffset} />
          <div className="flex h-full flex-col items-center justify-between space-y-8 pb-12 md:pb-0 lg:flex-row">
            <div className="mt-8 lg:mt-0">
              <ArrowLeftCircle
                onClick={() => handleOffset('left')}
                size={60}
                className={`${
                  pagination.offset !== 0
                    ? 'text-zinc-400 hover:text-zinc-100'
                    : 'text-transparent'
                }  cursor-pointer transition-colors `}
                data-testid="left-arrow"
              />
            </div>
            <div className="container mx-auto my-0 grid grid-cols-1 sm:grid-cols-2 md:gap-8 xl:grid-cols-3 2xl:grid-cols-5">
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
            <div className="mt-8 lg:mt-0">
              <ArrowRightCircle
                onClick={() => handleOffset('right')}
                size={60}
                className={`${
                  pagination.offset + pagination.count < pagination.total
                    ? 'text-zinc-400 hover:text-zinc-100'
                    : 'text-transparent'
                }  cursor-pointer transition-colors `}
                data-testid="right-arrow"
              />
            </div>
          </div>
          <PageNumber pagination={pagination} handleOffset={handleOffset} />
        </>
      ) : (
        <div className="flex h-80 w-full flex-col items-center justify-center text-center ">
          <h1 className="text-xl font-semibold text-white sm:text-4xl">
            No superbeings detected with these parameters.
          </h1>
        </div>
      )}
    </>
  )
}
