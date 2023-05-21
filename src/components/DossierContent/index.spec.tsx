import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { DossierContent } from './DossierContent'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: any) => <img {...props} alt="" />,
}))

describe('DossierContent', () => {
  const pagination = {
    total: 100,
    count: 20,
    offset: 0,
    limit: 20,
  }

  const handleOffsetMock = jest.fn()

  const characters = [
    {
      id: 1,
      name: '3-D Man',
      description: '',
      thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
        extension: 'jpg',
      },
    },
    {
      id: 2,
      name: 'A-Bomb (HAS)',
      description:
        "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
      thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
        extension: 'jpg',
      },
    },
  ]

  test('renders the pagination component', () => {
    render(
      <DossierContent
        pagination={pagination}
        handleOffset={handleOffsetMock}
        characters={characters}
      />,
    )

    const paginationElement = screen.getAllByTestId('pagination-component')[0]
    expect(paginationElement).toBeInTheDocument()
  })

  test('renders the superbeing cards', () => {
    render(
      <DossierContent
        pagination={pagination}
        handleOffset={handleOffsetMock}
        characters={characters}
      />,
    )

    const superbeingCards = screen.getAllByTestId('superbeing-card')
    expect(superbeingCards.length).toBe(characters.length)
  })

  test('calls handleOffset when left arrow is clicked', () => {
    render(
      <DossierContent
        pagination={pagination}
        handleOffset={handleOffsetMock}
        characters={characters}
      />,
    )

    fireEvent.click(screen.getByTestId('left-arrow'))
    expect(handleOffsetMock).toHaveBeenCalledWith('left')
  })

  test('calls handleOffset when right arrow is clicked', () => {
    render(
      <DossierContent
        pagination={pagination}
        handleOffset={handleOffsetMock}
        characters={characters}
      />,
    )

    fireEvent.click(screen.getByTestId('right-arrow'))
    expect(handleOffsetMock).toHaveBeenCalledWith('right')
  })

  test('renders "No superbeings detected" message when characters are empty', () => {
    render(
      <DossierContent
        pagination={pagination}
        handleOffset={handleOffsetMock}
        characters={[]}
      />,
    )

    const textElement = screen.getByText(
      'No superbeings detected with these parameters.',
    )

    expect(textElement).toBeInTheDocument()
  })
})
