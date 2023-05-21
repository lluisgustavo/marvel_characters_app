'use client'

import { Search } from 'lucide-react'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'

export interface SearchBarProps {
  setQuery: Dispatch<SetStateAction<string>>
  setLimit: Dispatch<SetStateAction<number>>
}

export function SearchBar({ setQuery, setLimit }: SearchBarProps) {
  const [query, setLocalQuery] = useState('')
  const [limit, setLocalLimit] = useState(10)

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setLocalQuery(newQuery)
  }

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value)
    setLocalLimit(newLimit)
  }

  // Register function once
  const handleSearch = useCallback(() => {
    setQuery(query)
  }, [setQuery, query])

  // Debounce the handleSearch function by 1000ms
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

  useEffect(() => {
    setLimit(limit)
  }, [limit, setLimit])

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-0">
      <label
        htmlFor="search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search for potential threats
      </label>
      <div className="relative h-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-500 " />
        </div>
        <input
          value={query}
          onChange={handleQueryChange}
          type="search"
          id="search"
          className="h-16 max-w-[200px] rounded-lg border-2 border-gray-300 bg-zinc-950 p-2 pl-10 font-sans text-xl uppercase leading-relaxed text-zinc-300 focus:ring-0 sm:max-w-[400px] md:max-w-none md:text-3xl"
          placeholder="Search for potential threats"
        />
      </div>
      <div className="h-full">
        <select
          value={limit}
          onChange={handleLimitChange}
          className="ml-4 h-16 rounded-lg border-2 border-gray-300 bg-zinc-950 p-2 font-sans text-xl text-zinc-300 focus:ring-0 md:text-3xl"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  )
}
