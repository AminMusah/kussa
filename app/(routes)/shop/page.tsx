import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";

export default function Shop() {
  return (
    <div>
      <div className="pt-32 flex justify-center items-center flex-col gap-y-6">
        <div className="relative ">
          <p className="font-thin md:text-5xl text-center max-w-xl mb-4">
            Our products
          </p>
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2  w-1/2 h-[2px] bg-black transition-all duration-300 ease-in-out"></span>
        </div>
        <p className="text-xs md:text-xl font-thin text-center max-w-xl">
          Discover our exquisite range of Kussa Shea Bliss products and find
          your perfect skincare solution. Browse our collection of natural, shea
          butter-infused items, select your favorites, and embark on your
          journey to healthier, more radiant skin.
        </p>
      </div>
      <div className="py-24">
        <div className="pb-24  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-8">
          {Array.from({ length: 24 }).map((_, index) => (
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
      </div>
    </div>
  );
}
