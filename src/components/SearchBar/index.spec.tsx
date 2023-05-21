import { render, screen, fireEvent } from '@testing-library/react'
import { Dispatch, SetStateAction } from 'react'
import { SearchBar, SearchBarProps } from './SearchBar'

describe('SearchBar', () => {
  test('triggers setQuery and setLimit correctly on input change', () => {
    const setQueryMock: Dispatch<SetStateAction<string>> = jest.fn()
    const setLimitMock: Dispatch<SetStateAction<number>> = jest.fn()

    const props: SearchBarProps = {
      setQuery: setQueryMock,
      setLimit: setLimitMock,
    }

    render(<SearchBar {...props} />)

    const inputElement = screen.getByPlaceholderText(
      'Search for potential threats',
    ) as HTMLInputElement
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement

    fireEvent.change(inputElement, { target: { value: 'test query' } })
    fireEvent.change(selectElement, { target: { value: '25' } })

    expect(setQueryMock).toHaveBeenCalledWith('test query')
    expect(setLimitMock).toHaveBeenCalledWith(25)
  })

  test('renders input and select elements with correct initial values', () => {
    const setQueryMock: Dispatch<SetStateAction<string>> = jest.fn()
    const setLimitMock: Dispatch<SetStateAction<number>> = jest.fn()

    const props: SearchBarProps = {
      setQuery: setQueryMock,
      setLimit: setLimitMock,
    }

    render(<SearchBar {...props} />)

    const inputElement = screen.getByPlaceholderText(
      'Search for potential threats',
    ) as HTMLInputElement
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement

    expect(inputElement.value).toBe('')
    expect(selectElement.value).toBe('10')
  })

  test('triggers setQuery correctly on input change', () => {
    const setQueryMock: Dispatch<SetStateAction<string>> = jest.fn()
    const setLimitMock: Dispatch<SetStateAction<number>> = jest.fn()

    const props: SearchBarProps = {
      setQuery: setQueryMock,
      setLimit: setLimitMock,
    }

    render(<SearchBar {...props} />)

    const inputElement = screen.getByPlaceholderText(
      'Search for potential threats',
    ) as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'test query' } })

    expect(setQueryMock).toHaveBeenCalledWith('test query')
    expect(setLimitMock).not.toHaveBeenCalled()
  })

  test('triggers setLimit correctly on select change', () => {
    const setQueryMock: Dispatch<SetStateAction<string>> = jest.fn()
    const setLimitMock: Dispatch<SetStateAction<number>> = jest.fn()

    const props: SearchBarProps = {
      setQuery: setQueryMock,
      setLimit: setLimitMock,
    }

    render(<SearchBar {...props} />)

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement

    fireEvent.change(selectElement, { target: { value: '25' } })

    expect(setQueryMock).not.toHaveBeenCalled()
    expect(setLimitMock).toHaveBeenCalledWith(25)
  })
})
