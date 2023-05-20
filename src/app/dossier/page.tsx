'use client'
import { DossierContent } from '@/components/DossierContent'
import { DossierPagination } from '@/components/DossierPagination'
import { ReturnButton } from '@/components/ReturnButton'
import { SearchBar } from '@/components/SearchBar'
import api from '@/lib/api'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'

interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface Pagination {
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

  const fetchCharacters = useCallback(() => {
    const queryParams = query !== '' ? { nameStartsWith: query } : {}

    api
      .get(`/characters`, {
        params: { ...queryParams, limit: queryLimit, offset },
      })
      .then((response) => {
        const { offset, limit, total, count, results } = response.data.data
        setPagination({ offset, limit, total, count })
        setCharacters(results)
      })
      .catch()
  }, [query, offset, queryLimit])

  useEffect(() => {
    fetchCharacters()
  }, [fetchCharacters])

  const handleReturnClick = () => {
    deleteCookie('isAgent')
    router.push('/')
  }

  return (
    <>
      <ReturnButton onClick={handleReturnClick} />
      <SearchBar setQuery={setQuery} setLimit={setQueryLimit} />
      <DossierPagination pagination={pagination} />
      <DossierContent
        offset={offset}
        total={pagination.total}
        handleOffset={handleOffset}
        characters={characters}
      />
    </>
  )
}
