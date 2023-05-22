import { Settings } from 'react-slick'
import { ArrowProps } from '@/lib/types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const Arrow = ({ offset, direction, onClick, total }: ArrowProps) => (
  <div
    onClick={onClick}
    className={`z-10 mt-12 flex justify-center md:absolute ${
      direction === 'left' ? 'left-1' : 'right-1'
    } top-1/2 -translate-y-1/2 cursor-pointer`}
  >
    {direction === 'left' && offset !== 0 && <ArrowLeft size={64} />}
    {direction === 'right' && offset !== total - 1 && <ArrowRight size={64} />}
  </div>
)

export default function GetCarouselSettings(total: number) {
  const [offset, setOffset] = useState<number>(0)

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
    beforeChange: function (_: any, nextSlide: number) {
      setOffset(nextSlide)
    },
  }

  return settings
}
