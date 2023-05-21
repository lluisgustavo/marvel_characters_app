import { Pagination } from '@/app/dossier/page'

export function DossierPagination({ count, limit, offset, total }: Pagination) {
  const start = offset + 1
  const end = Math.min(offset + count, total)

  return (
    <>
      {total !== undefined && total > 0 && (
        <div className="mt-12">
          <p className="text-center font-roboto text-2xl font-bold uppercase tracking-wide text-zinc-300">
            Revealing {limit} subjects: #{start} to #{end} out of {total} known
            subjects
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
