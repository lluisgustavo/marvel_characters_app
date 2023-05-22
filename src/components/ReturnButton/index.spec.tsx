import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ReturnButton } from './ReturnButton'
import React from 'react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('ReturnButton', () => {
  test('renders button with correct text', () => {
    render(<ReturnButton />)

    const buttonElement = screen.getByText('Encrypt Database')

    expect(buttonElement).toBeInTheDocument()
  })
})
