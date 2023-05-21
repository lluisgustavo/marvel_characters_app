import { render, screen, fireEvent } from '@testing-library/react'
import { DossierContent, DossierContentProps } from './DossierContent'
import { useRouter } from 'next/navigation'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt="" />,
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('DossierContent', () => {
  const mockHandleOffset = jest.fn()

  const characters = [
    {
      id: 1,
      name: 'Character 1',
      description: 'Description 1',
      thumbnail: {
        path: 'thumbnail1',
        extension: 'jpg',
      },
    },
    {
      id: 2,
      name: 'Character 2',
      description: 'Description 2',
      thumbnail: {
        path: 'thumbnail2',
        extension: 'jpg',
      },
    },
  ]

  const props: DossierContentProps = {
    offset: 0,
    total: 10,
    handleOffset: mockHandleOffset,
    characters,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the correct number of character cards', () => {
    // Mock the useRouter hook
    ;(useRouter as jest.Mock).mockReturnValue({})

    render(<DossierContent {...props} />)

    const characterCards = screen.queryAllByTestId('superbeing-card')
    expect(characterCards.length).toBe(characters.length)
  })

  test('triggers handleOffset correctly when left arrow is clicked', () => {
    render(<DossierContent {...props} />)

    const leftArrow = screen.getByTestId('left-arrow')
    fireEvent.click(leftArrow)

    expect(mockHandleOffset).toHaveBeenCalledWith('left')
  })

  test('triggers handleOffset correctly when right arrow is clicked', () => {
    render(<DossierContent {...props} />)

    const rightArrow = screen.getByTestId('right-arrow')
    fireEvent.click(rightArrow)

    expect(mockHandleOffset).toHaveBeenCalledWith('right')
  })
})
