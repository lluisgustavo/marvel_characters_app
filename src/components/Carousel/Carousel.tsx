import { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import ShieldLogo from '@/assets/logo.svg'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getImageUrl } from '@/utils/character'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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

interface ArrowProps {
  offset: number
  direction: 'left' | 'right'
  onClick?: () => void
  total: number
}

const Arrow = ({ offset, direction, onClick, total }: ArrowProps) => (
  <div
    onClick={onClick}
    className={`z-10 mt-24 flex justify-center md:absolute ${
      direction === 'left' ? 'left-1' : 'right-1'
    } top-1/2 -translate-y-1/2 cursor-pointer`}
  >
    {direction === 'left' && offset !== 0 && <ArrowLeft size={64} />}
    {direction === 'right' && offset !== total - 1 && <ArrowRight size={64} />}
  </div>
)

export function Carousel({ images }: CarouselProps) {
  const [offset, setOffset] = useState(0)
  const total = images.length

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 1500,
    prevArrow: <Arrow offset={offset} total={total} direction="left" />,
    nextArrow: <Arrow offset={offset} total={total} direction="right" />,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
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
    beforeChange: function (currentSlide, nextSlide) {
      setOffset(nextSlide)
    },
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
            <div className="flex justify-center px-24 py-12 text-justify text-2xl text-zinc-200">
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
