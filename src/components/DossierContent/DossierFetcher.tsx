import { useState, useEffect, useRef } from 'react'
import { fetchCharacters } from '@/lib/api/api'
import { Character, Pagination } from '@/lib/types'

export function useDossierData() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    count: 0,
    limit: 0,
    offset: 0,
    total: 0,
  })
  const [query, setQuery] = useState<string>('')
  const [offset, setOffset] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
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
      setLoading(true)
      try {
        const { pagination, characters } = await fetchCharacters(
          query,
          offset,
          limit,
        )

        if (pagination.total > 0 && pagination.count === 0) {
          setOffset(0)
          return
        }

        setPagination(pagination)
        setCharacters(characters)

        // Adjust the offset when the total number of characters changes
        if (oldTotalRef.current !== pagination.total) {
          setOffset(0)
          return
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCharactersData()
  }, [limit, offset, query])

  useEffect(() => {
    if (offset !== 0 && oldTotalRef.current !== pagination.total) {
      setOffset(0)
    }
  }, [query, limit, offset, pagination.total])

  return {
    characters,
    pagination,
    loading,
    handleOffset,
    setQuery,
    setLimit,
  }
}
