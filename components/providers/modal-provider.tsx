"use client";

import { useEffect, useState } from "react";
import CartModal from "../modals/cart-modal";

// import { CreateBillBoardModal } from "../modals/create-billboad-modal";
// import { CreateProductModal } from "../modals/create-product-modal";
// import { EditProductModal } from "../modals/edit-product-modal";
// import { CreateCategoryModal } from "../modals/create-category-modal";

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
    </>
  );
};
