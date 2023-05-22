import { Dispatch, SetStateAction } from 'react'

export interface Thumbnail {
  path: string
  extension: string
}

export interface Character {
  id: number
  name: string
  description: string
  thumbnail: Thumbnail
}

export interface Pagination {
  count: number
  limit: number
  offset: number
  total: number
}

export interface CarouselImage {
  id: number
  thumbnail: Thumbnail
  title: string
  description: string
}

export interface CarouselProps {
  images: CarouselImage[]
}

export interface ArrowProps {
  offset: number
  direction: 'left' | 'right'
  onClick?: () => void
  total: number
}

export interface DossierContentProps {
  pagination: Pagination
  handleOffset: (direction: 'left' | 'right' | number) => void
  characters: Character[]
}

export interface SearchBarProps {
  setQuery: Dispatch<SetStateAction<string>>
  setLimit: Dispatch<SetStateAction<number>>
}

export interface SearchBarInputProps {
  setQuery: Dispatch<SetStateAction<string>>
}

export interface SearchBarLimitProps {
  setLimit: Dispatch<SetStateAction<number>>
}

export interface DossierProps {
  characters: Character[]
  pagination: Pagination
  onQueryChange: (query: string) => void
  onOffsetChange: (direction: 'left' | 'right' | number) => void
}
