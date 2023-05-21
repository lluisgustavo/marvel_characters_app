import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReturnButton, ReturnButtonProps } from './ReturnButton'

describe('ReturnButton', () => {
  let onClickMock: jest.Mock<void, []>
  let props: ReturnButtonProps

  beforeEach(() => {
    onClickMock = jest.fn()
    props = {
      onClick: onClickMock,
    }
  })

  test('renders button with correct text', () => {
    render(<ReturnButton {...props} />)

    const buttonElement = screen.getByText('Encrypt Database')

    expect(buttonElement).toBeInTheDocument()
  })

  test('triggers onClick callback when button is clicked', () => {
    render(<ReturnButton {...props} />)

    const buttonElement = screen.getByText('Encrypt Database')

    fireEvent.click(buttonElement)

    expect(onClickMock).toHaveBeenCalled()
  })
})
