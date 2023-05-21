export interface DossierPaginationProps {
  pagination: {
    count: number
    limit: number
    offset: number
    total: number
  }
}

export function DossierPagination({ pagination }: DossierPaginationProps) {
  const start = pagination.offset + 1
  const end = Math.min(pagination.offset + pagination.count, pagination.total)

  return (
    <>
      {pagination && pagination.total > 0 && (
        <div className="mt-12">
          <p className="text-center font-roboto text-2xl font-bold uppercase tracking-wide text-zinc-300">
            Revealing {pagination.limit} subjects: #{start} to #{end} out of{' '}
            {pagination.total} known subjects
          </p>
          <p className="mt-2 text-center font-classified text-2xl uppercase text-gray-400">
            {' '}
            Classified information.
          </p>
        </div>
      )}
    </>
  )
}
