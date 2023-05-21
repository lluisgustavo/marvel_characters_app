import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { SuperbeingCard } from './SuperbeingCard'
import { useRouter } from 'next/navigation'

const mockRouterPush = jest.fn()

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt="" />,
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('SuperbeingCard', () => {
  const characterId = 1011334
  const name = '3-D Man'
  const description = ''
  const thumbnail = {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
    extension: 'jpg',
  }

  beforeAll(async () => {
    render(
      <SuperbeingCard
        characterId={characterId}
        name={name}
        description={description}
        thumbnail={thumbnail}
      />,
    )
  })

  it('renders the character name', () => {
    const nameElement = screen.getByText(name)

    expect(nameElement).toBeInTheDocument()
    expect(nameElement.textContent).toEqual('3-D Man')
  })

  it('renders the character description', () => {
    const descriptionElement = screen.getByText(description)

    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement.textContent).toEqual('')
  })

  // it('calls router.push when clicked', () => {
  //   const cardElement = screen.getByRole('button', { hidden: true })

  //   console.log(cardElement)
  //   // fireEvent.click(container.firstChild.)
  //   expect(mockRouterPush).toHaveBeenCalledWith(
  //     `/dossier/profile/${characterId}`,
  //   )
  // })

  // it('renders the image correctly', async () => {
  //   const imageElement = screen.getByTestId('superbeing-card-image')

  //   expect(imageElement).toBeInTheDocument()
  //   expect(imageElement.getAttribute('src')).toEqual(
  //     'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg',
  //   )
  //   expect(imageElement.getAttribute('width')).toEqual('300')
  //   expect(imageElement.getAttribute('height')).toEqual('300')
  // })
})
