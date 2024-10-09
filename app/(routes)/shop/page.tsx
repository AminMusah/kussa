"use client";

import ProductCard from "@/components/product-card";
import { SkeletonCard } from "@/components/product-skeleton-card";
import { Button } from "@/components/ui/button";
import useAllProducts from "@/hooks/use-all-products";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function Shop() {
  const { products, loading, getProducts, filterName, accummilatedFilters } =
    useAllProducts();
  const [name, setName] = useState("");

  useEffect(() => {
    getProducts();
  }, [accummilatedFilters]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      filterName(name);
    }
  };

  return (
    <div className="explore">
      <div className="pt-32 flex justify-center items-center flex-col gap-y-6 ">
        <div className="relative ">
          <p className="font-thin md:text-5xl text-center max-w-xl mb-4">
            Our products
          </p>
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2  w-1/2 h-[2px] bg-black transition-all duration-300 ease-in-out"></span>
        </div>
        <p className="text-xs md:text-xl font-thin text-center max-w-xl">
          Kussa Shea Bliss (KSB) is a well-established company in the skincare
          and personal care industry with over three years of successful
          operations.
        </p>
        <p className="text-xs md:text-xl font-thin text-center max-w-xl">
          KSB specializes in producing high-quality skincare and personal care
          products infused with shea butter, a natural ingredient known for its
          nourishing and moisturizing properties.
        </p>
        <p className="text-xs md:text-xl font-thin text-center max-w-xl">
          The company has gained a solid reputation for its commitment to using
          ethically sourced and sustainable ingredients, as well as its
          dedication to providing exceptional customer experience.
        </p>
        <p className="text-xs md:text-xl font-thin text-center max-w-xl">
          Browse through our range of products including Natural and Infused
          Shea Butter creams, Shower Gels made with African Black Soap, Hair
          Products, Oils & more.
        </p>
      </div>
      <div className="flex justify-center items-center flex-col w-full">
        <div className="flex flex-wrap mt-4 ">
          <input
            type="text"
            placeholder="Search products"
            className="rounded-full mr-4 p-2 px-4 md:min-w-[600px] outline-none border mt-4"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress} // Changed to onKeyDown
          />
          <div className="flex mt-4">
            {/* <div
              className="w-[50px] h-[50px] mr-4 cursor-pointer hover:bg-white border border-black border-opacity-50 rounded-full flex justify-center items-center py-6 group"
              // onClick={() => router.push(`/shop`)}
            >
              <SlidersHorizontal
                size={28}
                className="group-hover:border-white group-hover:text-[#772432]  transition-all duration-300"
              />
            </div> */}
            <div
              className="w-[50px] h-[50px] mr-4 cursor-pointer hover:bg-white border border-black hover:border-[#772432]  border-opacity-50 rounded-full flex justify-center items-center bg-black text-white py-6 group"
              // onClick={() => router.push(`/shop`)}
            >
              <Search
                size={28}
                strokeWidth={1}
                className="group-hover:border-white group-hover:text-[#772432]  transition-all duration-300"
                onClick={() => filterName(name)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-14">
        <div className="pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }, (_, index) => (
                <SkeletonCard key={index} />
              ))
            : products.map(
                (
                  product: {
                    _id: string;
                    name: string;
                    description: string;
                    images: [];
                    link: string;
                    price: number;
                  },
                  index
                ) => <ProductCard {...product} key={product?._id} />
              )}
        </div>
      </div>
    </div>
  );
}
