import React from 'react'
import Slider, { Settings } from 'react-slick'
import ShieldLogo from '@/assets/logo.svg'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getImageUrl } from '@/utils/character'

interface CarouselImage {
  id: number
  thumbnail: {
    path: string
    extension: string
  }
  title: string
  description: string
}

interface CarouselProps {
  images: CarouselImage[]
}

export function Carousel({ images }: CarouselProps) {
  const settings: Settings = {
    dots: false,
    infinite: false,
    centerPadding: '60px',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    lazyLoad: 'ondemand', // Set the value of lazyLoad to 'ondemand' or 'progressive' based on your requirements
    autoplay: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex h-full min-h-[600px] w-full flex-col items-center justify-center space-y-24">
        <Image className="w-3/12" src={ShieldLogo} alt="Nothing Found"></Image>
        <p className="text-3xl">No records found in our database</p>
      </div>
    )
  }

  return (
    <Slider {...settings}>
      {images.map((image) => {
        const imageUrl =
          image.thumbnail && image.thumbnail.path && image.thumbnail.extension
            ? getImageUrl(image.thumbnail)
            : ShieldLogo

        return (
          <div key={image.id}>
            <div className="flex justify-center">
              <p className="p-4 text-center text-2xl font-bold uppercase leading-relaxed tracking-wider text-zinc-200">
                {image.title}
              </p>
            </div>
            <div className="flex justify-center">
              {image.thumbnail &&
                image.thumbnail.path &&
                image.thumbnail.extension && (
                  <Image
                    src={imageUrl}
                    alt={image.title}
                    width={400}
                    height={400}
                  />
                )}
            </div>
            <div className="flex justify-center p-12 text-justify text-2xl text-zinc-200">
              {image.description && image.description !== '' ? (
                <p>{image.description}</p>
              ) : (
                <p>
                  Agent, we regret to inform you that the description has gone
                  missing. Investigation underway.
                </p>
              )}
            </div>
          </div>
        )
      })}
    </Slider>
  )
}
