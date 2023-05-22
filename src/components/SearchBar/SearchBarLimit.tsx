import { SearchBarLimitProps } from '@/lib/types'
import { useState, ChangeEvent, useEffect } from 'react'

export default function SearchBarLimit({ setLimit }: SearchBarLimitProps) {
  const [limit, setLocalLimit] = useState(10)

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value)
    setLocalLimit(newLimit)
    setLimit(newLimit)
  }

  useEffect(() => {
    setLimit(limit)
  }, [limit, setLimit])

  return (
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
  )
}
