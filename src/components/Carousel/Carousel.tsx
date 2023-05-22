import Slider from 'react-slick'
import ShieldLogo from '@/assets/logo.svg'
import Image from 'next/image'
import { getImageUrl } from '@/utils/character'
import { CarouselProps } from '@/lib/types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import getCarouselSettings from './CarouselSettings'
import CarouselNotFound from './CarouselNotFound'

export function Carousel({ images }: CarouselProps) {
  const total = images.length
  const settings = getCarouselSettings(total)

  if (!images || images.length === 0) {
    return <CarouselNotFound />
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
              <p className="mx-4  px-4 text-center text-2xl font-bold uppercase leading-relaxed tracking-wider text-zinc-200 md:mx-8">
                {image.title}
              </p>
            </div>
            <div className="m-8 flex justify-center md:min-h-[500px]">
              {image.thumbnail &&
                image.thumbnail.path &&
                image.thumbnail.extension && (
                  <Image
                    className="object-contain"
                    src={imageUrl}
                    alt={image.title}
                    width={400}
                    height={400}
                  />
                )}
            </div>
            <div className="flex items-center justify-center text-justify text-2xl text-zinc-200">
              <p className="m-8 px-12 pt-2 text-start md:mx-12">
                {image.description && image.description !== ''
                  ? image.description
                  : 'Agent, we regret to inform you that the description has gone missing. Investigation underway.'}
              </p>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}
