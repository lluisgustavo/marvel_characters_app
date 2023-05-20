'use client'
import { useState, useEffect } from 'react'
import { fetchData } from '@/lib/api'
import { notFound } from 'next/navigation'
import {
  formatCharacterName,
  parseDescription,
  getImageUrl,
} from '@/utils/character'
import Image from 'next/image'
import { Carousel } from '@/components/Carousel'
import ShieldLogo from '@/assets/logo.svg'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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

interface ImageProps {
  id: number
  thumbnail: {
    path: string
    extension: string
  }
  title: string
  description: string
}

const mapDataToImages = (data: Event[] | Series[] | Comic[]): ImageProps[] => {
  return data.map((item) => ({
    id: item.id,
    thumbnail: {
      path: item.thumbnail.path,
      extension: item.thumbnail.extension,
    },
    title: item.title,
    description: item.description,
  }))
}

export default function Profile({
  params,
}: {
  params: { characterId: number }
}) {
  const { characterId } = params
  const [activeTab, setActiveTab] = useState(1)
  const [data, setData] = useState<{
    character?: Character
    comics: Comic[]
    events: Event[]
    series: Series[]
  }>({
    character: undefined,
    comics: [],
    events: [],
    series: [],
  })

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const fetchedData = await fetchData(characterId)

        if (fetchedData) {
          return setData(fetchedData)
        }

        return notFound()
      } catch (error) {
        notFound()
      }
    }

    fetchDataFromApi()
  }, [characterId])

  const { character, comics, events, series } = data
  const imageUrl = character?.thumbnail
    ? getImageUrl(character.thumbnail)
    : ShieldLogo
  const descriptionFormatted = parseDescription(character?.description ?? '')

  const comicImages = mapDataToImages(comics)
  const eventImages = mapDataToImages(events)
  const seriesImages = mapDataToImages(series)

  return (
    <div className="mt-8 min-h-screen overflow-x-hidden overflow-y-scroll pb-8">
      <Link
        className="flex gap-2 ps-12 text-2xl text-zinc-300 hover:text-zinc-100"
        href="/dossier"
      >
        <ArrowLeft size={32} /> Back
      </Link>
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
            <h2 className="text-center text-5xl font-bold uppercase leading-relaxed tracking-wider text-zinc-200">
              {formatCharacterName(character?.name ?? '')}
            </h2>
            <Image
              src={imageUrl}
              width={600}
              height={600}
              alt={character?.name ?? ''}
            />
            <p
              className={`p-8 text-justify text-3xl leading-relaxed tracking-wide text-zinc-200`}
            >
              {descriptionFormatted}
            </p>
          </div>
        </div>
        <div className="col-span-3 border-2">
          <div className="text-5xl font-medium uppercase">
            <nav className="-mb-px flex h-16 text-4xl font-extrabold">
              <button
                onClick={() => setActiveTab(1)}
                className={`w-1/3 py-4 text-center font-extrabold uppercase ${
                  activeTab === 1
                    ? 'border-e-2 border-zinc-50 text-zinc-100'
                    : 'border-b-2 text-zinc-500'
                }`}
              >
                Comics
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`w-1/3 py-4 text-center font-extrabold uppercase ${
                  activeTab === 2
                    ? 'border-e-2 border-s-2 border-zinc-50 text-zinc-100'
                    : 'border-b-2 text-zinc-500'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab(3)}
                className={`w-1/3 py-4 text-center font-extrabold uppercase ${
                  activeTab === 3
                    ? 'border-s-2 border-zinc-50 text-zinc-100'
                    : 'border-b-2 text-zinc-500'
                }`}
              >
                Series
              </button>
            </nav>
          </div>
          <div className="mt-4">
            {activeTab === 1 && <Carousel images={comicImages ?? []} />}

            {activeTab === 2 && <Carousel images={eventImages ?? []} />}

            {activeTab === 3 && <Carousel images={seriesImages ?? []} />}
          </div>
        </div>
      </div>
    </div>
  )
}
