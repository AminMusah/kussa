"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Explore",
    href: "/explore",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
  //   {
  //     name: "About Us",
  //     href: "#about",
  //   },
  {
    name: "Founder",
    href: "/founder",
  },
];

export default function NavToggle({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10 flex flex-col p-4"
          >
            <ul className="space-y-4 mt-16">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link
                    href={item.href}
                    className="text-lg text-gray-800 hover:text-blue-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
