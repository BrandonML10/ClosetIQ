"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const carouselImages = [
  {
    left: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=900&fit=crop",
    right:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=900&fit=crop",
  },
  {
    left: "https://images.unsplash.com/photo-1593111160232-b7112c81e7e3?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    right:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=900&fit=crop",
  },
  {
    left: "https://images.unsplash.com/photo-1595770655797-73e75891d275?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    right:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=900&fit=crop",
  },
  {
    left: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=900&fit=crop",
    right:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=900&fit=crop",
  },
];

export default function AuthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {carouselImages.map((pair, index) => (
        <div
          key={index}
          className="absolute inset-0 flex transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          {/* Left image - taller */}
          <div className="relative w-1/2 h-full">
            <Image
              src={pair.left}
              alt="Moda"
              fill
              className="object-cover object-top"
              sizes="50vw"
              priority={index === 0}
              unoptimized
            />
          </div>
          {/* Right image */}
          <div className="relative w-1/2 h-full">
            <Image
              src={pair.right}
              alt="Moda"
              fill
              className="object-cover object-top"
              sizes="50vw"
              priority={index === 0}
              unoptimized
            />
          </div>
        </div>
      ))}
      {/* Dark gradient overlay at bottom for smooth transition to yellow card */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
}
