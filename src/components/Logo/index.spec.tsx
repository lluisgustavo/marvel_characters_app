import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Logo', () => {
  test('renders the logo with correct classnames when on homepage', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')

    render(<Logo />)

    const logo = screen.getByAltText(
      'Strategic Homeland Intervention, Enforcement and Logistics Division',
    )
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass('w-96')
    expect(logo).not.toHaveClass('w-40')
    expect(logo).not.toHaveClass('w-24')
  })

  test('renders the logo with correct classnames when not on homepage', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/other')

    render(<Logo />)

    const logo = screen.getByAltText(
      'Strategic Homeland Intervention, Enforcement and Logistics Division',
    )
    expect(logo).toBeInTheDocument()
    expect(logo).not.toHaveClass('w-96')
    expect(logo).toHaveClass('w-40')
    expect(logo).not.toHaveClass('w-24')
  })

  test('renders the logo with correct classnames when on profile page', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/profile')

    render(<Logo />)

    const logo = screen.getByAltText(
      'Strategic Homeland Intervention, Enforcement and Logistics Division',
    )
    expect(logo).toBeInTheDocument()
    expect(logo).not.toHaveClass('w-96')
    expect(logo).not.toHaveClass('w-40')
    expect(logo).toHaveClass('w-24')
  })
})
