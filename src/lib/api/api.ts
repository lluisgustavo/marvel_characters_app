import axios, { AxiosError } from 'axios'
import md5 from 'md5'

interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface Comic {
  id: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface Event {
  id: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface Series {
  id: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface Pagination {
  count: number
  limit: number
  offset: number
  total: number
}

/**
 * Base URL for the Marvel API.
 * @type {string}
 */
const baseURL: string = 'https://gateway.marvel.com/v1/public/'

/**
 * Public key for accessing the Marvel API.
 * @type {string}
 */
const publicKey: string = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY as string

/**
 * Private key for accessing the Marvel API.
 * @type {string}
 */
const privateKey: string = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY as string

/**
 * Current timestamp as a number.
 * @type {number}
 */
const ts: number = Number(new Date())

/**
 * MD5 Hash generated using the timestamp, private key, and public key.
 * @type {string}
 */
const hash: string = md5(ts + privateKey + publicKey)

/**
 * Axios instance with predefined configuration for the Marvel API.
 * @type {import('axios').AxiosInstance}
 */
const api: import('axios').AxiosInstance = axios.create({
  baseURL,
  params: {
    ts,
    apikey: publicKey,
    hash,
    limit: 10,
  },
})

/**
 * Fetches data for a specific character.
 * @param {number} characterId - The ID of the character.
 * @returns {Promise<object> | undefined} The fetched data.
 */
export const fetchData = async (
  characterId: number,
): Promise<
  | {
      character?: Character | undefined
      comics: Comic[]
      events: Event[]
      series: Series[]
    }
  | undefined
> => {
  try {
    const responses = await Promise.all([
      api.get(`/characters/${characterId}`),
      api.get(`/characters/${characterId}/comics`),
      api.get(`/characters/${characterId}/events`),
      api.get(`/characters/${characterId}/series`),
    ])

    const characterResult = responses[0].data.data.results[0]
    const comicsResult = responses[1].data.data.results
    const eventsResult = responses[2].data.data.results
    const seriesResult = responses[3].data.data.results

    return {
      character: characterResult,
      comics: comicsResult,
      events: eventsResult,
      series: seriesResult,
    }
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response && axiosError.response.status === 500) {
      throw new Error('Internal Server Error')
    } else {
      throw new Error('Error fetching characters')
    }
  }
}

/**
 * Fetches characters based on the provided query, offset, and limit.
 * @param {string} query - The search query.
 * @param {number} characterOffset - The offset for pagination.
 * @param {number} queryLimit - The limit for the number of characters to fetch.
 * @returns {Promise<{ pagination: Pagination, characters: Character[] }>} The fetched characters and pagination information.
 * @throws {Error} Error fetching characters.
 */ export const fetchCharacters = async (
  query: string,
  characterOffset: number,
  queryLimit: number,
): Promise<{ pagination: Pagination; characters: Character[] }> => {
  const queryParams = query !== '' ? { nameStartsWith: query } : {}

  try {
    const response = await api.get(`/characters`, {
      params: { ...queryParams, limit: queryLimit, offset: characterOffset },
    })

    const {
      offset,
      limit,
      total,
      count,
      results,
    }: {
      offset: number
      limit: number
      total: number
      count: number
      results: any[]
    } = response.data.data

    return {
      pagination: { offset, limit, total, count },
      characters: results,
    }
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response && axiosError.response.status === 500) {
      throw new Error('Internal Server Error')
    } else {
      throw new Error('Error fetching characters')
    }
  }
}

export default api
