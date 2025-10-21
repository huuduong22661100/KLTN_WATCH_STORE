"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import image from "next/image";
import styles from './HomeBanner.module.css';

type Banner = {
  id: number;
  image: string;
};
const bannerHome: Banner[] = [
  {
    id: 1,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice6.jpg",
  },
  {
    id: 2,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/baby-g-2.jpg",
  },
  {
    id: 3,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/baby-g4.jpg",
  },
  {
    id: 4,
    image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/sheen5.jpg",
  },
  {
    id: 5,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/protrek4.jpg",
  },
  {
    id: 6,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/casio3-2.jpg",
  },
  {
    id: 7,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice.jpg",
  },
];
const bannerGshock: Banner[] = [
  {
    id: 1,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/01/g-shock1.jpg",
  },
  {
    id: 2,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/01/g-shock2.jpg",
  },
  {
    id: 3,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/01/g-shock3.jpg",
  },
  {
    id: 4,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/01/g-shock4.jpg",
  },
  {
    id: 5,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/01/g-shock5.jpg",
  },
  {
    id: 6,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/01/g-shock6.jpg",
  },
  {
    id: 7,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/01/g-shock7.jpg",
  },
  {
    id: 8,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/01/g-shock8.jpg",
  },
];
const bannerGbaby: Banner[] = [
  {
    id: 1,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/baby-g-2.jpg",
  },
  {
    id: 2,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/baby-g3.jpg",
  },
  {
    id: 3,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/baby-g4.jpg",
  },
  {
    id: 4,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/baby-g5.jpg",
  },
  {
    id: 5,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/baby-g6.jpg",
  },
];
const bannerEdifice: Banner[] = [
  {
    id: 1,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/09/z5821556906632_789031b48be9748ccd7327369f98b73a.jpg",
  },
  {
    id: 2,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice2-1.jpg",
  },
  {
    id: 3,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice3.jpg",
  },
  {
    id: 4,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice4.jpg",
  },
  {
    id: 5,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice5.jpg",
  },
  {
    id: 6,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice6.jpg",
  },
  {
    id: 7,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice7.jpg",
  },
  {
    id: 8,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/edifice8.jpg",
  },
];
const bannerSheen1: Banner[] = [
  {
    id: 1,
    image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/sheen1.jpg",
  },
  {
    id: 2,
    image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/sheen2.jpg",
  },
  {
    id: 3,
    image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/sheen3.jpg",
  },
  {
    id: 4,
    image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/sheen4.jpg",
  },
  {
    id: 5,
    image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/sheen5.jpg",
  },
  {
    id: 6,
    image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/sheen6.jpg",
  },
];
const bannerProTrek: Banner[] = [
  {
    id: 1,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/protrek.jpg",
  },
  {
    id: 2,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/protrek2.jpg",
  },
  {
    id: 3,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/protrek3.jpg",
  },
  {
    id: 4,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/protrek4.jpg",
  },
  {
    id: 5,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/protrek5.jpg",
  },
  {
    id: 6,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/07/protrek6.jpg",
  },
];
const bannerCasio: Banner[] = [
  {
    id: 1,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/09/z5834465488940_8fa54646674993b94ea7590072b0450e.jpg",
  },
  {
    id: 2,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/09/z5834462921612_f6e895ab1e8c7cf42aa0e5f00b784b91.jpg",
  },
  {
    id: 3,
    image:
      "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/09/z5834462923433_02b1f64df00308abf77b07c1f93ba4b8.jpg",
  },
];


const HomeBanner = ({ name }: { name: string }) => {
  const isBanner: () => Banner[] = () => {
    switch (name) {
      case "G-Shock":
        return bannerGshock;
      case "Baby-G":
        return bannerGbaby;
      case "Edifice":
        return bannerEdifice;
      case "Sheen":
        return bannerSheen1;
      case "ProTrek":
        return bannerProTrek;
      case "Casio":
        return bannerCasio;
      case "Home":
        return bannerHome;
      default:
        return bannerHome;
    }
  };
  const selectedBanner = isBanner();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className={styles.carouselWrapper}
      onMouseEnter={() => {
        plugin.current.stop();
      }}
      onMouseLeave={() => {
        plugin.current.play();
      }}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {selectedBanner.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className={styles.carouselItemContent}>
              <Image
                src={banner.image}
                alt={`Banner ${banner.id}`}
                fill
                className={styles.bannerImage}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={`${styles.carouselPrevious} ${styles.carouselNavButton}`} />
      <CarouselNext className={`${styles.carouselNext} ${styles.carouselNavButton}`} />
    </Carousel>
  );
};

export default HomeBanner;
