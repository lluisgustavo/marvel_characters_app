'use client'
import { AgentDossier } from '@/components/AgentDossier'
import { DossierPagination } from '@/components/DossierPagination'
import { SearchBar } from '@/components/SearchBar'
import api from '@/lib/api'
import { deleteCookie } from 'cookies-next'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
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
      <div className="flex w-full items-center justify-center">
        <button
          className="mb-12 text-center text-3xl text-zinc-300"
          onClick={() => handleReturnClick()}
        >
          Encrypt Database
        </button>
      </div>
      <SearchBar setQuery={setQuery} setLimit={setQueryLimit} />
      <DossierPagination pagination={pagination} />
      <div className="flex h-full items-center justify-between px-12">
        {offset !== 0 ? (
          <div>
            <ArrowLeftCircle
              onClick={() => handleOffset('left')}
              size={60}
              className="text-zinc-400 transition-colors hover:text-zinc-100"
            />
          </div>
        ) : (
          ''
        )}
        <AgentDossier characters={characters} />
        {offset !== pagination.total ? (
          <ArrowRightCircle
            onClick={() => handleOffset('right')}
            size={60}
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}
