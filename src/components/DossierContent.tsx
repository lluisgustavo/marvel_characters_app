import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { AgentDossier } from './AgentDossier'

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
      {offset !== 0 && (
        <div>
          <ArrowLeftCircle
            onClick={() => handleOffset('left')}
            size={60}
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          />
        </div>
      )}
      <AgentDossier characters={characters} />
      {offset !== total && (
        <ArrowRightCircle
          onClick={() => handleOffset('right')}
          size={60}
          className="text-zinc-400 transition-colors hover:text-zinc-100"
        />
      )}
    </div>
  )
}
