"use client";

import Billboard from "@/components/billboard";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dot, Globe, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Billboard data={[]} />
      <div className="group/wrap relative">
        <div className="relative scroll-smooth">
          <div className="group flex h-[300px] md:h-screen w-full items-center justify-center">
            <div>
              <div className="overflow-hidden font-clash text-7xl font-medium">
                <h2 className="group-hover/wrap:translate-y-full group-hover:animate-reveal text-xs md:text-xl font-thin text-center">
                  Welcome to Kussa shea bliss
                </h2>
              </div>
              <div className="overflow-hidden font-clash text-7xl font-medium">
                <p className="group-hover/wrap:translate-y-full group-hover:animate-reveal group-hover:animation-delay-300 text-xl md:text-5xl text-center max-w-xl">
                  Effortless journey to a healthy skin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 mx-2">
        <Button
          className="cursor-pointer border border-black border-opacity-50 flex justify-between rounded-full bg-white text-black hover:text-white py-6 hover:border-white  min-w-[250px] group hover:bg-[#772432]"
          onClick={() => router.push(`/shop`)}
        >
          <span className="font-thin">View all</span>
          <ArrowRight
            size={28}
            strokeWidth={1}
            className="border border-black border-opacity-50 rounded-full group-hover:border-white group-hover:-rotate-45 transition-all duration-300"
          />
        </Button>
      </div>

      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCard
            name="Shea Butter"
            desc="Shea Butter is a natural moisturizer that is good for the skin."
            imageUrl="/images/IMG_9330.jpg"
            link="/products/1"
            _id="1"
            price={100}
            key={index}
          />
        ))}
      </div>
      <div className="group/wrap relative">
        <div className="relative scroll-smooth">
          <div className="group flex h-[300px] md:h-screen w-full items-center justify-center">
            <div>
              <div className="overflow-hidden font-clash text-7xl font-medium">
                <p className="group-hover/wrap:translate-y-full group-hover:animate-reveal  text-xl md:text-5xl text-center max-w-xl">
                  Discover an effortless
                </p>
              </div>
              <div className="overflow-hidden font-clash text-7xl font-medium">
                <p className="group-hover/wrap:translate-y-full group-hover:animate-reveal group-hover:animation-delay-300 text-xl md:text-5xl text-center max-w-xl">
                  journey to a healthy skin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 h-[500px] md:h-[700px]">
        <div className="relative rounded-xl overflow-hidden group h-full bg-[url('/images/IMG_9458.jpg')] bg-cover bg-center">
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center text-center md:gap-y-6 p-8">
            <h2 className="max-w-xl text-white md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
              Natural shea butter
            </h2>

            <Button className="font-thin text-sm max-w-xl text-white md:py-5 md:px-8 rounded-full transition-all duration-300 bg-[#772432] hover:bg-[#923847] ">
              See more
            </Button>
          </div>
        </div>

        <div
          className="relative rounded-xl overflow-hidden group h-full "
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
          <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 right-0 z-10 flex flex-col items-center text-center md:gap-y-6 p-8">
            <h2 className="max-w-xl text-white md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
              Shower gel
            </h2>

            <Button className="font-thin text-sm max-w-xl text-white md:py-5 md:px-8 rounded-full transition-all duration-300 bg-[#772432] hover:bg-[#923847] ">
              See more
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 p-2 h-[500px] md:h-[700px]">
        <div
          className="relative rounded-xl overflow-hidden group h-full"
          style={{
            backgroundImage: "url('/images/20240625_115236.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
          <div className="absolute top-0 left-0  z-10 flex flex-col items-start text-center md:gap-y-6 p-8">
            <h2 className="max-w-xl text-white md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
              Exhibitions attended
            </h2>

            <Button className="font-thin text-sm max-w-xl text-white md:py-5 md:px-8 rounded-full transition-all duration-300 bg-[#772432] hover:bg-[#923847] ">
              See more
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 h-[500px] md:h-[700px]">
        <div
          className="relative rounded-xl overflow-hidden group h-full "
          style={{
            backgroundImage: "url('/images/1000007077.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center text-center md:gap-y-6 p-8">
            <h2 className="max-w-xl text-white md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
              Diffusers
            </h2>

            <Button className="font-thin text-sm max-w-xl text-white md:py-5 md:px-8 rounded-full transition-all duration-300 bg-[#772432] hover:bg-[#923847] ">
              See more
            </Button>
          </div>
        </div>
        <div
          className="relative rounded-xl overflow-hidden group h-full"
          style={{
            backgroundImage: "url('/images/IMG_9440.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
          <div className="absolute top-0  right-0 z-10 flex flex-col items-end text-center md:gap-y-6 p-8">
            <h2 className="max-w-xl text-white md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
              Types of products, uses and benefits
            </h2>
            <Button className="font-thin text-sm max-w-xl text-white py-5 px-8 rounded-full transition-all duration-300 bg-[#772432] hover:bg-[#923847] ">
              Learn more
            </Button>
          </div>
        </div>
      </div>
      <div className="group/wrap relative">
        <div className="relative scroll-smooth">
          <div className="group flex h-[300px] md:h-screen w-full items-center justify-center">
            <div>
              <div className="overflow-hidden font-clash text-7xl font-medium">
                <p className="group-hover/wrap:translate-y-full group-hover:animate-reveal  text-3xl md:text-5xl text-center max-w-xl">
                  Our story
                </p>
              </div>
              <div className="overflow-hidden font-clash text-7xl font-medium">
                {/* <p className="group-hover/wrap:translate-y-full group-hover:animate-reveal group-hover:animation-delay-300 text-xl md:text-5xl text-center max-w-xl">
                  journey to a healthy skin.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 p-2 h-[500px] md:h-[700px]">
        <div
          className="relative rounded-xl overflow-hidden group col-span-1  mb-2 md:mb-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
        </div>
        <div
          className="bg-[#f1e6e9] rounded-xl overflow-hidden group h-full col-span-2"
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full h-full">
            <h2 className="md:text-3xl font-bold transition-transform duration-300 w-full p-2 md:p-8">
              About
            </h2>

            <div className="flex  flex-col w-full p-2 md:p-8 pt-12">
              <div className="flex flex-col">
                <p className="text-xs md:text-2xl">
                  Kussa Shea Bliss (KSB) is a well-established company in the
                  skincare and personal care industry with three years of
                  successful operations.
                </p>
              </div>
              <div className="flex flex-col py-8">
                <p className=" text-xs sm:text-xl md:text-2xl ">
                  KSB specializes in producing high-quality skincare and
                  personal care products infused with shea butter, a natural
                  ingredient known for its nourishing and moisturizing
                  properties. The company has gained a solid reputation for its
                  commitment to using ethically sourced and sustainable
                  ingredients, as well as its dedication to providing
                  exceptional customer experiences. Our products can be
                  purchased worldwide from our website and within some shops
                  across Africa.
                </p>
              </div>
              <div>
                <Button className="font-thin text-sm max-w-xl text-white md:py-5 md:px-8 rounded-full transition-all duration-300 bg-[#772432] hover:bg-[#923847] ">
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="group/wrap relative">
        <div className="relative scroll-smooth">
          <div className="group flex h-[300px] md:h-screen w-full items-center justify-center">
            <div>
              <div className="overflow-hidden font-clash text-7xl font-medium">
                <p className="group-hover/wrap:translate-y-full group-hover:animate-reveal  text-3xl md:text-5xl text-center max-w-xl">
                  Our story
                </p>
              </div>
              <div className="overflow-hidden font-clash text-7xl font-medium">
                {/* <p className="group-hover/wrap:translate-y-full group-hover:animate-reveal group-hover:animation-delay-300 text-xl md:text-5xl text-center max-w-xl">
                  journey to a healthy skin.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:gap-2 p-2 h-[700px]">
        <div
          className="bg-[#f1e6e9] rounded-xl overflow-hidden group h-full col-span-2"
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full justify-between h-full">
            <h2 className=" md:text-3xl font-bold transition-transform duration-300 w-full p-2 md:p-8 ">
              Kussa Shea Bliss was founded 5 years ago by Ms Irene Atubiga, a
              passionate entrepreneur with extensive experience in the skincare
              industry. Irene's vision was to develop a skincare brand that
              celebrates the richness of shea butter while prioritizing ethical
              practices and customer satisfaction. Since its inception, KSB has
              experienced consistent growth and garnered a loyal customer base.
            </h2>
            <div className="bg-black h-[1px]  w-full" />

            <div className="flex justify-between w-full p-2 md:p-8">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-2">
                  <div className="border md:h-[50px] md:w-[50px] bg-black border-black border-opacity-50 rounded-full flex justify-center items-center">
                    <Globe size={28} strokeWidth={1} color="#fff" />
                  </div>

                  <span className="text-xs md:text-3xl">Mission</span>
                </div>
                <p className="max-w-[400px] text-xs md:text-base">
                  KSB's vision is to enhance the well-being of individuals by
                  providing them with premium skincare and personal care
                  products that nurture and restore their natural beauty.
                </p>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-2">
                  <div className="border md:h-[50px] md:w-[50px] bg-black border-black border-opacity-50 rounded-full flex justify-center items-center">
                    <Leaf size={28} strokeWidth={1} color="#fff" />
                  </div>

                  <span className=" text-xs md:text-3xl">Vision</span>
                </div>
                <p className="max-w-[400px] text-xs md:text-base">
                  The company's mission is to create innovative and sustainable
                  solutions that promote self-care, confidence, and overall
                  wellness.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative rounded-xl overflow-hidden group col-span-1 mt-2 md:mt-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
          <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 right-0 z-10 flex flex-col items-center text-center md:gap-y-6 p-8">
            <h2 className="max-w-xl text-white md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
              Our founder
            </h2>

            <Button className="font-thin text-sm max-w-xl text-white md:py-5 md:px-8 rounded-full transition-all duration-300 bg-[#772432] hover:bg-[#923847] ">
              Read more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
