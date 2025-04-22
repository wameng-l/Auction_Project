"use client";

import Slider from "react-slick";
import Image from "next/image";

interface HeroCarouselProps {
  images: { src: string; alt: string }[];
}

const HeroCarousel = ({ images }: HeroCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="w-[90%] mx-auto my-4 rounded-xl h-[200px]">
      <Slider {...settings}>
        {images.map((img, items) => (
          <div key={items} className="relative h-[200px] w-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
