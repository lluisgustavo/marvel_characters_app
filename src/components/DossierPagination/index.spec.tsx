import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { DossierPagination, DossierPaginationProps } from './DossierPagination'

describe('DossierPagination', () => {
  const pagination: DossierPaginationProps['pagination'] = {
    count: 10,
    limit: 5,
    offset: 0,
    total: 20,
  }

  it('should render pagination information correctly', () => {
    const { getByText } = render(<DossierPagination pagination={pagination} />)

    const start = pagination.offset + 1
    const end = Math.min(pagination.offset + pagination.count, pagination.total)

    const paginationInfo = getByText(
      `Revealing ${pagination.limit} subjects: #${start} to #${end} out of ${pagination.total} known subjects`,
    )
    const classifiedInfo = getByText('Classified information.')

    expect(paginationInfo).toBeInTheDocument()
    expect(classifiedInfo).toBeInTheDocument()
  })
})
