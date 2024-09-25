"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { CarTaxiFront, Heart, Search, ShoppingCart } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsScrolled(scrollPosition >= viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/shop`,
      label: "Shop",
      active: pathname === `/shop`,
    },
    {
      href: `/explore`,
      label: "Explore",
      active: pathname === `/explore`,
    },

    {
      href: `/contact`,
      label: "Contact Us",
      active: pathname === `/contact`,
    },
  ];

  return (
    <div
      className={`fixed top-0 z-20 w-full py-5 transition-all duration-300 ease-in-out ${
        isScrolled || pathname !== `/`
          ? "bg-white  opacity-80"
          : "bg-transparent"
      } ${pathname === `/auth/dashboard` ? "hidden" : ""}`}
    >
      <div className="flex h-16 items-center  overflow-hidden w-full justify-between">
        <Image
          className="aspect-square object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          alt="Image"
          src={`/images/IMG-logo-removebg-.png`}
          width={100}
          height={100}
          sizes="(max-width: 4px) 100vw, (max-width: 4px) 80vw, 1200px"
          onClick={() => router.push("/")}
        />
        <nav
          className={cn(
            "hidden sm:flex items-center space-x-4 sm:space-x-6",
            className
          )}
          {...props}
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              <span
                className={`relative mb-2 font-thin ${
                  isScrolled || pathname !== `/` ? "text-black" : "text-white"
                } transition-colors duration-300 ease-in-out`}
              >
                {route.label}
              </span>
              <span
                className={cn(
                  `absolute bottom-[-8px] left-0 w-full h-[1px] ${
                    isScrolled || pathname !== `/` ? "bg-black" : "bg-white"
                  } transition-all duration-300 ease-in-out`,
                  route.active
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                )}
              ></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4 px-2">
          <Heart
            className={`cursor-pointer transition-transform duration-300 hover:scale-110   ${
              isScrolled || pathname !== `/` ? "text-black" : "text-white"
            } `}
          />
          <ShoppingCart
            onClick={() => router.push("/cart")}
            className={`cursor-pointer transition-transform   ${
              isScrolled || pathname !== `/` ? "text-black" : "text-white"
            }  duration-300 hover:scale-110`}
          />
        </div>
      </div>
    </div>
  );
}
