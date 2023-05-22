'use client'

import { Search } from 'lucide-react'
import { SearchBarProps } from '@/lib/types'
import SearchBarInput from './SearchBarInput'
import SearchBarLimit from './SearchBarLimit'

export function SearchBar({ setQuery, setLimit }: SearchBarProps) {
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
        <SearchBarInput setQuery={setQuery} />
      </div>
      <div className="h-full">
        <SearchBarLimit setLimit={setLimit} />
      </div>
    </div>
  )
}
