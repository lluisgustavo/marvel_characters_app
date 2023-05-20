import axios, { AxiosError } from 'axios'
import md5 from 'md5'
import { notFound } from 'next/navigation'

const baseURL = 'http://gateway.marvel.com/v1/public/'
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY as string
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY as string
const ts = Number(new Date())
const hash = md5(ts + privateKey + publicKey)

const api = axios.create({
  baseURL,
  params: {
    ts,
    apikey: publicKey,
    hash,
    limit: 10,
  },
})

export const fetchData = async (characterId: number) => {
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

    if (axiosError.response && axiosError.response.status === 404)
      return notFound()

    console.error(err)
  }
}

export const fetchCharacters = async (
  query: string,
  characterOffset: number,
  queryLimit: number,
) => {
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

    if (results.length === 0) notFound()
    return {
      pagination: { offset, limit, total, count },
      characters: results,
    }
  } catch {
    throw new Error('Error fetching characters')
  }
}

export default api
