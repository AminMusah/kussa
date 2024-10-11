"use client";

import { useEffect, useState } from "react";
import CartModal from "../modals/cart-modal";
import { CreateCategoryModal } from "../modals/create-category-modal";
import { EditCategoryModal } from "../modals/edit-category-modal";
import { DeleteCategoryModal } from "../modals/delete-category-modal";
import { DeleteProductModal } from "../modals/delete-product-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CartModal />
      <CreateCategoryModal />
      <EditCategoryModal />
      <DeleteCategoryModal />
      <DeleteProductModal />
    </>
  );
};
