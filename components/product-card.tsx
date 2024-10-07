"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Heart, ShoppingBasket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";

type ProductProps = {
  name: any;
  description: string;
  images: { url: string }[]; // Updated type to an array of objects with a url property
  link: string;
  _id: string;
  price: Number;
};

const ProductCard = ({
  name,
  description,
  images,
  link,
  _id,
  price,
}: ProductProps) => {
  const router = useRouter();

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(0); // Change from Number to number
  const { render, onRender, setRender } = useModal();
  const updateQuantity = (change: number) => {
    setQuantity((prevQuantity) =>
      prevQuantity + change > 0 ? prevQuantity + change : 0
    );
  };

  const submit = async (id: string) => {
    try {
      setSubmitting(true);

      const payload = {
        productId: id,
        quantity: +quantity + 1,
      };

      const response = await axios.post("/api/cart/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (render) {
        setRender();
      } else {
        onRender();
      }

      toast({
        title: "Success",
        description: "Added to cart!!",
        variant: "success",
      });
    } catch (error: any) {
      console.error(error?.response?.data);
      toast({
        title: "Error",
        description: error?.response?.data,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="m-2">
      <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square  relative overflow-hidden rounded-xl">
            <Image
              fill
              sizes="(max-width: 4px) 100vw, (max-width: 4px) 80vw, 1200px"
              className="object-cover h-full w-full group-hover:scale-110 transition"
              src={images[0].url} // Accessing the first object's url
              alt={name}
              onClick={() => router.push(`/shop/${_id}`)}
            />
            <div className="absolute top-3 right-3">
              <Heart fill="#fff" color="#fff" className="" />
            </div>
            <div className="absolute top-3 left-3">
              <p className="text-white text-xs font-thin bg-[#772432] px-2 py-1 rounded-full">
                New arrival
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div
              className="font-semibold text-lg overflow-hidden truncate w-4/6"
              onClick={() => router.push(`/shop/${_id}`)}
            >
              {name}
            </div>
            <div className="flex flex-col gap-2">
              <span
                // onClick={() => router.push(`${link}`)}
                className="underline flex items-center "
              >
                <span
                  className="mr-2 font-light"
                  onClick={() => {
                    submit(_id);
                  }}
                >
                  {submitting ? (
                    <div>
                      <span className="inline-flex items-center gap-px">
                        <span className="animate-blink mx-px h-1.5 w-1.5 rounded-full bg-[#772432]"></span>
                        <span className="animate-blink animation-delay-200 mx-px h-1.5 w-1.5 rounded-full bg-[#772432]"></span>
                        <span className="animate-blink animation-delay-[400ms] mx-px h-1.5 w-1.5 rounded-full bg-[#772432]"></span>
                      </span>
                    </div>
                  ) : (
                    `Add to cart`
                  )}
                </span>
                {/* <ShoppingBasket size={16} /> */}
              </span>
            </div>
          </div>

          <div className="font-semibold text-lg overflow-hidden truncate w-36">
            GHC {price.toString()}
          </div>
          <div className="font-light text-neutral-500 overflow-hidden truncate">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
