'use client'
import { DossierContent } from '@/components/DossierContent/DossierContent'
import { DossierPagination } from '@/components/DossierPagination/DossierPagination'
import { ReturnButton } from '@/components/ReturnButton/ReturnButton'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { fetchCharacters } from '@/lib/api/api'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { LoadingDossier } from './loading'

export interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface Pagination {
  count: number
  limit: number
  offset: number
  total: number
}

export default function Dossier() {
  const router = useRouter()
  const [characters, setCharacters] = useState<Character[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    count: 0,
    limit: 0,
    offset: 0,
    total: 0,
  })
  const [query, setQuery] = useState<string>('')
  const [offset, setOffset] = useState<number>(0)
  const [queryLimit, setQueryLimit] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(false)

  function handleOffset(direction: 'left' | 'right') {
    if (direction === 'left') {
      setOffset(Math.max(offset - pagination.limit, 0))
    } else if (direction === 'right') {
      setOffset(
        Math.min(
          offset + pagination.limit,
          pagination.total - pagination.limit,
        ),
      )
    }
  }

  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        setLoading(true)
        const { pagination, characters } = await fetchCharacters(
          query,
          offset,
          queryLimit,
        )

        setPagination(pagination)
        setCharacters(characters)
      } catch (error) {
        // Handle error if needed
        return {
          notFound: true,
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCharactersData()
  }, [offset, query, queryLimit])

  const handleReturnClick = () => {
    deleteCookie('isAgent')
    router.push('/')
  }

  useEffect(() => {
    setQuery(query)
  }, [query])

  return (
    <>
      <ReturnButton onClick={handleReturnClick} />
      <SearchBar setQuery={setQuery} setLimit={setQueryLimit} />
      {loading ? (
        <LoadingDossier />
      ) : (
        <>
          <DossierPagination pagination={pagination} />
          <DossierContent
            offset={offset}
            total={pagination.total}
            handleOffset={handleOffset}
            characters={characters}
          />
        </>
      )}
    </>
  )
}
