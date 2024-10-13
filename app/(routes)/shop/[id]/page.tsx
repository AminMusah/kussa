"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  Dot,
  Heart,
  Loader2,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Product({ params }: { params: { id: string } }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  // get a product
  const getProduct = async (id: any) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProduct(response.data);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct(params.id);
  }, [params.id]);

  const submit = async (id: string) => {
    try {
      setSubmitting(true);

      const payload = {
        productId: id,
        quantity: +quantity,
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

  // console.log(product);

  const data = [];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? product?.images?.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    const isLastSlide = currentIndex === product?.images?.length - 1;
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
    <div className="mb-48">
      <div className="grid sm:grid-cols-1  md:grid-cols-3 pt-28 md:pt-44 mb-5 h-full md:h-screen p-10 ">
        <div className="flex justify-between flex-col col-span-3 md:col-span-3 xl:col-span-1">
          <div className="px-0 xl:px-10 mb-5">
            <h1 className="text-5xl mb-10">{product.name}</h1>
            <span className="text-5xl ">GHC {product.price}</span>
          </div>
          <div>
            <div className="px-0 xl:px-10">
              <h1 className="border-b mb-5">Details</h1>
              <span>{product.description}</span>
            </div>
            {/* <div className="px-0 xl:px-10 mt-5">
              <h1 className="border-b mb-5">Product info</h1>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate voluptatem delectus laboriosam repudiandae minima et
                atque in quam, natus est sunt tenetur aliquam eaque ab enim
                tempore asperiores magni iste.
              </span>
            </div> */}
          </div>
        </div>

        <div className="relative col-span-3 md:col-span-2 xl:col-span-1 my-10 sm:mt-10  h-[300px] xl:mt-0  md:h-full rounded-xl  overflow-hidden group w-full">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 ">
            <div className="relative w-full h-full">
              {product?.images?.map((slide: any, index: any) => (
                <Image
                  key={slide._id}
                  src={slide.url}
                  alt={slide.alt || "kussa product"}
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
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          </div>

          {/* Content */}

          {/* Navigation Arrows */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20">
            <ArrowLeft onClick={prevSlide} size={15} />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20">
            <ArrowRight onClick={nextSlide} size={15} />
          </div>

          {/* Dot Navigation */}
        </div>

        <div className="px-2 col-span-3 md:col-span-1 xl:col-span-1 sm:mt-10 xl:mt-0 flex flex-col justify-between">
          <p className="md:px-10 text-gray-400 my-5 md:my-0 text-start">
            All contents on this website are properties of KUSSA SHEA BLISS
          </p>
          <div className="flex justify-between md:px-10 flex-col  items-start">
            <div className="flex w-full  my-5 ">
              <div
                className="w-[50px] h-[50px] mr-4 cursor-pointer border border-black   border-opacity-50 rounded-full flex justify-center items-center bg-black text-white py-6 group"
                // onClick={() => router.push(`/shop`)}
              >
                <Minus
                  size={28}
                  strokeWidth={1}
                  className="group-hover:border-white  transition-all duration-300"
                  onClick={() => updateQuantity(-1)}
                />
              </div>
              <span
                className="w-[50px] h-[50px] text-4xl mr-4 cursor-pointer border-opacity-50 rounded-full flex justify-center items-center  py-6 group"
                // onClick={() => router.push(`/shop`)}
              >
                {quantity}
                {/* <Heart
                  size={28}
                  strokeWidth={1}
                  className="group-hover:border-white group-hover:text-[#772432]  transition-all duration-300"
                /> */}
              </span>
              <div
                className="w-[50px] h-[50px] mr-4 cursor-pointer border border-black   border-opacity-50 rounded-full flex justify-center items-center bg-black text-white py-6 group"
                // onClick={() => router.push(`/shop`)}
              >
                <Plus
                  size={28}
                  strokeWidth={1}
                  className="group-hover:border-white  transition-all duration-300"
                  onClick={() => updateQuantity(1)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full md:mt-10">
              <div
                className="w-[50px] h-[50px] mr-4 cursor-pointer hover:bg-white border border-black hover:border-[#772432]  border-opacity-50 rounded-full flex justify-center items-center bg-black text-white group"
                // onClick={() => router.push(`/shop`)}
              >
                <Heart
                  size={28}
                  strokeWidth={1}
                  className="group-hover:border-white group-hover:text-[#772432]  transition-all duration-300"
                />
              </div>

              <Button
                onClick={() => submit(params?.id)}
                type="submit"
                className="w-9/12 h-[50px] rounded-full px-3 py-2  hover:bg-white border border-black hover:border-[#772432] group-hover:border-white hover:text-[#772432]  transition-all duration-300  border-opacity-50 focus:outline-none group-invalid:pointer-events-none group-invalid:opacity-70"
              >
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
