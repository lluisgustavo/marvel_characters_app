'use client'
import { DossierContent } from '@/components/DossierContent/DossierContent'
import { DossierPagination } from '@/components/DossierPagination/DossierPagination'
import { ReturnButton } from '@/components/ReturnButton/ReturnButton'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { fetchCharacters } from '@/lib/api/api'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { LoadingDossier } from './loading'
import { Character, Pagination } from '@/lib/types'

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
  const oldTotalRef = useRef<number>(0)

  useEffect(() => {
    // Update the oldTotalRef value after fetching characters
    oldTotalRef.current = pagination.total
  }, [pagination.total])

  function handleOffset(direction: 'left' | 'right' | number) {
    if (typeof direction === 'number') {
      const clickedOffset = Math.max((direction - 1) * pagination.limit, 0)
      return setOffset(clickedOffset)
    }

    const newOffset =
      direction === 'left'
        ? Math.max(offset - pagination.limit, 0)
        : Math.min(
            offset + pagination.limit,
            pagination.total - pagination.limit,
          )

    return setOffset(newOffset)
  }

  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        setLoading(true)

        // Reset the offset to 0 with every new search

        const { pagination, characters } = await fetchCharacters(
          query,
          offset,
          queryLimit,
        )

        if (pagination.total > 0 && pagination.count === 0) {
          return setOffset(0)
        }

        setPagination(pagination)
        setCharacters(characters)

        // Adjust the offset when the total number of characters changes
        if (oldTotalRef.current !== pagination.total) {
          // Perform actions or updates specific to when total changes
          // For example, resetting the offset to 0
          return setOffset(0)
        }
      } catch (error) {
        console.error(error)
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
          <DossierPagination {...pagination} />
          <DossierContent
            pagination={pagination}
            handleOffset={handleOffset}
            characters={characters}
          />
        </>
      )}
    </>
  )
}
