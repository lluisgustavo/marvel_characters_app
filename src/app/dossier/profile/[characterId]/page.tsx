'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { fetchData } from '@/lib/api'
import { notFound } from 'next/navigation'
import {
  formatCharacterName,
  parseDescription,
  getImageUrl,
} from '@/utils/character'
import { Carousel } from '@/components/Carousel'
import ShieldLogo from '@/assets/logo.svg'

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
        className="flex gap-2 text-2xl text-zinc-300 hover:text-zinc-100 md:ps-12"
        href="/dossier"
      >
        <ArrowLeft size={32} /> Back
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 lg:pe-8">
          <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
            <h2 className="mt-12 text-center text-xl font-bold uppercase leading-relaxed tracking-wider text-zinc-200 lg:text-5xl">
              {formatCharacterName(character?.name ?? '')}
            </h2>
            <Image
              src={imageUrl}
              width={600}
              height={600}
              alt={character?.name ?? ''}
            />
            <p
              className={`my-8 text-justify text-xl leading-relaxed tracking-wide text-zinc-200 lg:my-0 lg:p-8 lg:text-3xl`}
            >
              {descriptionFormatted}
            </p>
          </div>
        </div>
        <div className="border-2 lg:col-span-3">
          <div className="text-5xl font-medium uppercase">
            <nav className="md:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select your country
              </label>
              <select
                id="tabs"
                className="block h-16 w-full border-zinc-50 bg-zinc-950 p-2.5 text-center text-3xl font-extrabold uppercase text-zinc-100 sm:text-3xl"
              >
                <option>Comics</option>
                <option>Events</option>
                <option>Series</option>
              </select>
            </nav>
            <nav className="-mb-px hidden h-16 flex-wrap text-4xl font-extrabold md:flex md:flex-nowrap">
              <button
                onClick={() => setActiveTab(1)}
                className={`w-full px-2 py-4 text-center font-extrabold uppercase lg:w-1/3 lg:px-0 ${
                  activeTab === 1
                    ? 'border-e-2 border-zinc-50 text-zinc-100'
                    : 'border-b-2 text-zinc-500'
                }`}
              >
                Comics
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`w-full px-2 py-4 text-center font-extrabold uppercase lg:w-1/3 lg:px-0 ${
                  activeTab === 2
                    ? 'border-e-2 border-s-2 border-zinc-50 text-zinc-100'
                    : 'border-b-2 text-zinc-500'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab(3)}
                className={`w-full px-2 py-4 text-center font-extrabold uppercase lg:w-1/3 lg:px-0 ${
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
