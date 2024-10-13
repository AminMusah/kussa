"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BillboardProps {
  data: any;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const slides = [
    {
      url: "/images/IMG_9416.jpg",

      title: "KUSSA SHEA BLISS",
      description: "Effortless journey to a healthy skin.",
      buttonText: "Go shopping",
      link: "/shop",
    },
    {
      url: "/images/IMG_9334.jpg",
      title: "Skin care",
      description:
        "KUSSA SHEA BLISS specializes in producing high-quality skincare and personal care products infused with shea butter, a natural ingredient known for its nourishing and moisturizing properties.",
      buttonText: "Explore types of products and benefits",
      link: "/explore",
    },
    {
      url: "/images/IMG-20240818-WA0054.jpg",
      title: "Lemon infused shea butter.",
      description:
        "Our lemon infused shea butter product is solely natural shea butter infused with lemon essential oil. The composition of the product is 90% shea butter and 10% lemon essential oil. The outcome of the product is solid.",
      buttonText: "Shop for lemon infused shea butter",
      link: "/shop",
    },
    {
      url: "/images/IMG_9363.jpg",
      title: "About us",
      description:
        "Kussa Shea Bliss (KSB) is a well-established company in the skincare and personal care industry with three years of successful operations.",
      buttonText: "Read more about us",
      link: "#about",
    },
    {
      url: "/images/IMG_9425.jpg",
      title: "Contact us",
      description:
        "For quick and easy assistance, feel free to contact us anytime. Our team is here to help you with any questions or concerns you may have.",
      buttonText: "Contact us",
      link: "/contact",
    },
    {
      url: "/images/IMG_9425.jpg",
      title: "Our founder",
      description:
        "Kussa Shea Bliss was founded 5 years ago by Ms Irene Atubiga, a passionate entrepreneur with extensive experience in the skincare industry. ",
      buttonText: "Read more about our founder",
      link: "/founder",
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 500); // This should match the transition duration
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 10000);

    // Clear the interval when the component is unmounted or when the currentIndex changes
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <Image
                key={slide.url}
                src={slide.url}
                alt={slide.title || "Billboard image"}
                fill
                style={{
                  objectFit: "cover",
                  opacity: index === currentIndex ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
                priority={index === currentIndex}
                className={isTransitioning ? "transitioning" : ""}
              />
            ))}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center gap-y-6">
          <h2 className="max-w-xl text-white text-3xl md:text-[60px] font-thin  animate-reveal">
            {slides[currentIndex]?.title}
          </h2>
          <div className=" max-w-xl text-sm md:text-base text-white  animate-reveal animation-delay-400">
            {slides[currentIndex]?.description}
          </div>
          <Button
            className="font-thin text-sm max-w-xl rounded-full text-white bg-[#772432] hover:bg-[#923847] py-6 px-16  animate-reveal animation-delay-400"
            onClick={() => router.push(slides[currentIndex]?.link)}
          >
            {slides[currentIndex]?.buttonText}
          </Button>
        </div>

        {/* Navigation Arrows */}
        {/* <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20">
          <ChevronLeft onClick={prevSlide} size={15} />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20">
          <ChevronRight onClick={nextSlide} size={15} />
        </div> */}

        {/* Dot Navigation */}
        <div className="absolute bottom-[1%] left-1/2 transform -translate-x-1/2 flex justify-center py-2 z-20">
          {slides.map((slide: any, slideIndex: any) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <Dot
                size={66}
                className={`text-white ${
                  currentIndex === slideIndex ? "opacity-100" : "opacity-50"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Billboard;
