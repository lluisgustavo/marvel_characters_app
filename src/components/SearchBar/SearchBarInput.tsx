'use client'

import { SearchBarInputProps } from '@/lib/types'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import { ChangeEvent, useState, useCallback, useEffect } from 'react'

export default function SearchBarInput({ setQuery }: SearchBarInputProps) {
  const [query, setLocalQuery] = useState('')

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setLocalQuery(newQuery)
  }

  const handleSearch = useCallback(() => {
    setQuery(query)
  }, [setQuery, query])

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      handleSearch()
    }, 1000)

    const throttledSearch = throttle(() => {
      debouncedSearch()
    }, 1000)

    throttledSearch()

    return () => {
      throttledSearch.cancel()
      debouncedSearch.cancel()
    }
  }, [handleSearch, query])

  return (
    <input
      value={query}
      onChange={handleQueryChange}
      type="search"
      id="search"
      className="h-16 max-w-[200px] rounded-lg border-2 border-gray-300 bg-zinc-950 p-2 pl-10 font-sans text-xl uppercase leading-relaxed text-zinc-300 focus:ring-0 sm:max-w-[400px] md:max-w-none md:text-3xl"
      placeholder="Search for potential threats"
    />
  )
}
