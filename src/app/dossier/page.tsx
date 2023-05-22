'use client'
import { DossierContent } from '@/components/DossierContent/DossierContent'
import { DossierPagination } from '@/components/DossierPagination/DossierPagination'
import { ReturnButton } from '@/components/ReturnButton/ReturnButton'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { LoadingDossier } from './loading'
import { useDossierData } from '@/components/DossierContent/DossierFetcher'

export default function Dossier() {
  const { characters, pagination, loading, handleOffset, setQuery, setLimit } =
    useDossierData()

  return (
    <>
      <ReturnButton />
      <SearchBar setQuery={setQuery} setLimit={setLimit} />
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
