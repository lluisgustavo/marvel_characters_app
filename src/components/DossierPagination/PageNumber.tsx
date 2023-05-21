import { Pagination } from '@/app/dossier/page'
import { useMemo } from 'react'

type PaginationRange = Array<number | '...'>

type GetPageNumbersProps = {
  total: number
  limit: number
  siblingCount: number
  currentPage: number
}

const getPageNumbers = ({
  total,
  limit,
  siblingCount,
  currentPage,
}: GetPageNumbersProps): PaginationRange => {
  const totalPageCount = Math.ceil(total / limit)

  // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*'...'
  const totalPageNumbers = siblingCount + 5

  /*
    Case 1:
    If the number of pages is less than the page numbers we want to show in our
    pagination component, we return the range [1..totalPageCount]
  */
  if (totalPageNumbers >= totalPageCount) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1)
  }

  /*
    Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
  */
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

  /*
    We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
  */
  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

  const firstPageIndex = 1
  const lastPageIndex = totalPageCount

  /*
    Case 2: No left dots to show, but rights dots to be shown
  */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)

    return [...leftRange, '...', totalPageCount]
  }

  /*
    Case 3: No right dots to show, but left dots to be shown
  */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPageCount - rightItemCount + 1 + i,
    )

    return [firstPageIndex, '...', ...rightRange]
  }

  /*
    Case 4: Both left and right dots to be shown
  */
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    )

    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
  }

  return []
}

export default function PageNumber({
  pagination,
  handleOffset,
}: {
  pagination: Pagination
  handleOffset: (direction: 'left' | 'right' | number) => void
}) {
  const { limit, offset } = pagination

  const currentPage = Math.floor(offset / limit) + 1
  const siblingCount = 1

  const paginationRange = useMemo(() => {
    return getPageNumbers({
      total: pagination.total,
      limit: pagination.limit,
      siblingCount,
      currentPage,
    })
  }, [pagination.total, pagination.limit, currentPage])

  // If there are less than 2 items in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    if (currentPage === Number(lastPage) - 1) {
      // Go directly to the last page
      handleOffset(Number(lastPage))
    } else {
      // Increment the page number
      handleOffset('right')
    }
  }

  const onPrevious = () => {
    handleOffset('left')
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul
      data-testid="pagination-component"
      className="my-8 flex items-center justify-center space-x-2 text-2xl"
    >
      {/* Left navigation arrow */}
      <li
        className={`cursor-pointer ${currentPage === 1 ? 'hidden' : ''}`}
        onClick={onPrevious}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full">
          {'<'}
        </div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render dots
        if (pageNumber === '...') {
          return <li key={index}>...</li>
        }

        // Render our Page Pills
        return (
          <li
            key={index}
            className={`cursor-pointer ${
              pageNumber === currentPage
                ? 'text-5xl font-extrabold text-zinc-100'
                : ''
            }`}
            onClick={() => handleOffset(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {/* Right Navigation arrow */}
      <li
        className={`cursor-pointer ${currentPage === lastPage ? 'hidden' : ''}`}
        onClick={onNext}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full ">
          {'>'}
        </div>
      </li>
    </ul>
  )
}
