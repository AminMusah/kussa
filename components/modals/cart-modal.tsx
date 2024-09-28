import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import useGetCart from "@/hooks/use-cart-items";

// Define the type for cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  _id: string; // {{ edit_1 }} Add _id property
  productId: {
    name: string;
    category: string;
    images: { url: string }[]; // {{ edit_1 }} Add images property
  };
  quantity: number; // {{ edit_2 }} Add quantity property
  // Add other properties as needed
}

interface Cart {
  items: CartItem[];
}

export default function CartModal() {
  const router = useRouter();
  const { isOpen, onOpen, onClose, type, data, onRender } = useModal();
  const { getCart, cart }: any = useGetCart();
  const isModalOpen = isOpen && type === "toggleCart";

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    getCart();
  }, []);

  const price = cart?.items?.map((item: any) => item.price);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed inset-y-0 right-0 w-full   z-50 "
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 overflow-hidden"
            // {{ edit_1 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={handleClose}
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {cart.items.map(
                        (
                          item: CartItem // Use the defined CartItem type
                        ) => (
                          <div className="mt-8" key={item._id}>
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item?.productId?.images[0]?.url}
                                      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">
                                            {" "}
                                            {item?.productId?.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          GHC {item?.price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item?.productId?.category}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {item.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          <Trash2 color="#000" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          GHC{" "}
                          {price
                            .reduce((acc: any, curr: any) => acc + curr, 0)
                            .toFixed(2)}
                        </p>
                      </div>
                      {/* <p className="mt-0.5 text-sm text-gray-500">
    Shipping and taxes calculated at checkout.
  </p> */}
                      <div className="mt-6 ">
                        <Button
                          onClick={() => {
                            router.push("/checkout");
                            handleClose();
                          }}
                          className="w-full h-[50px] rounded-full px-3 py-2  hover:bg-white border border-black hover:border-[#772432] group-hover:border-white hover:text-[#772432]  transition-all duration-300  border-opacity-50 focus:outline-none group-invalid:pointer-events-none group-invalid:opacity-70"
                        >
                          Checkout
                        </Button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-black hover:text-gray-400 "
                            onClick={handleClose}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
