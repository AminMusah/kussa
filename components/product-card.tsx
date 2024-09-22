"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import { ShoppingBasket } from "lucide-react";

type ProductProps = {
  name: any;
  desc: string;
  imageUrl: string;
  link: string;
  _id: string;
  price: Number;
};

const ProductCard = ({
  name,
  desc,
  imageUrl,
  link,
  _id,
  price,
}: ProductProps) => {
  const router = useRouter();

  return (
    <div className="m-2 ">
      <div className="col-span-1 cursor-pointer group">
        <div
          className="flex flex-col gap-2 w-full"
          onClick={() => router.push(`/products/${_id}`)}
        >
          <div className="aspect-square  relative overflow-hidden rounded-xl">
            <Image
              fill
              sizes="(max-width: 4px) 100vw, (max-width: 4px) 80vw, 1200px"
              className="object-cover h-full w-full group-hover:scale-110 transition"
              src={imageUrl}
              alt="Listing"
            />
            <div className="absolute top-3 right-3">
              <p className="text-white text-xs font-thin bg-[#772432] px-2 py-1 rounded-full">
                New arrival
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-semibold text-lg overflow-hidden truncate w-36">
              {name}
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push(`${link}`)}
                className="bg-[#772432] hover:bg-[#923847] rounded-full"
              >
                <span className="mr-4">Add to cart</span>
                <ShoppingBasket size={16} />
              </Button>
            </div>
          </div>

          <div className="font-semibold text-lg overflow-hidden truncate w-36">
            GHC {price.toString()}
          </div>
          <div className="font-light text-neutral-500 overflow-hidden truncate">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
