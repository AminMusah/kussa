"use client";

import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  return (
    <div className="pt-28 pb-10">
      {" "}
      <div className="px-2 ">
        <h1 className="font-bold text-black text-4xl md:text-7xl">
          Shopping cart
        </h1>
        <p className="text-sm text-[#384853]">Manage your cart</p>
      </div>
      <div className="grid grid-cols-3 pt-4 px-2">
        <div className="col-span-4 xl:col-span-2 border rounded-3xl px-5 py-2 w-full">
          <div className="grid grid-cols-4 items-end w-full border-b">
            <span className="text-2xl py-2 col-span-1 ">Product</span>
            <span className="text-2xl py-2 col-span-1 text-end">Quantity</span>
            <span className="text-2xl py-2 col-span-1 text-end">Total</span>
            <span className="text-2xl py-2 col-span-1 text-end">Action</span>
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="grid  grid-cols-4 py-5" key={index}>
              <div className="flex items-center col-span-1 ">
                <div className="relative w-[100px] h-[100px] overflow-hidden rounded-xl mr-2">
                  <Image
                    src="/images/IMG-20240818-WA0054.jpg"
                    alt={"product image"}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  />
                </div>
                <span className="text-2xl">Product</span>
              </div>
              <div className="flex justify-end items-center rounded-full col-span-1  ">
                <div
                  className="w-[25px] h-[25px] mr-4 cursor-pointer border border-black   border-opacity-50 rounded-full flex justify-center items-center bg-black text-white  group"
                  // onClick={() => router.push(`/shop`)}
                >
                  <Minus
                    size={20}
                    strokeWidth={1}
                    className="group-hover:border-white  transition-all duration-300"
                  />
                </div>{" "}
                <span className="text-start px-5">0</span>
                <div
                  className="w-[25px] h-[25px] mr-4 cursor-pointer border border-black   border-opacity-50 rounded-full flex justify-center items-center bg-black text-white  group"
                  // onClick={() => router.push(`/shop`)}
                >
                  <Plus
                    size={20}
                    strokeWidth={1}
                    className="group-hover:border-white  transition-all duration-300"
                  />
                </div>{" "}
              </div>
              <div className="flex justify-end items-center col-span-1 ">
                <span className="font-bold">GHC 100</span>
              </div>
              <div className="flex justify-end items-center col-span-1 ">
                <Trash2 className="cursor-pointer " />
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 col-span-3 md:col-span-1 xl:col-span-1 sm:mt-10 xl:mt-0 flex flex-col justify-between">
          <p className="md:px-10 my-5 md:my-0 text-start text-3xl">
            Order Summary
          </p>
          <div className="flex justify-between md:px-10 flex-col  items-start">
            <div className="flex w-full flex-col  my-5 ">
              <div className="flex justify-between w-full ">
                <span className="text-xl">Sub total</span>
                <span className="text-3xl">GHC 100</span>
              </div>
              <div className="h-[1px] bg-black w-full my-5"></div>
              <div className="flex justify-between w-full">
                <span className="text-xl font-bold">Total</span>
                <span className="text-3xl">GHC 100</span>
              </div>
            </div>
            <div className="flex justify-between items-center w-full md:mt-10">
              <Button
                type="submit"
                className="w-full h-[50px] rounded-full px-3 py-2  hover:bg-white border border-black hover:border-[#772432] group-hover:border-white hover:text-[#772432]  transition-all duration-300  border-opacity-50 focus:outline-none group-invalid:pointer-events-none group-invalid:opacity-70"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
