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

interface AgentDossierProps {
  characters: Character[]
}

export function AgentDossier({ characters }: AgentDossierProps) {
  return (
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
  )
}
