import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useToast } from "@/hooks/use-toast";

export const DeleteProductModal = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, type, data, onRender, render, setRender } =
    useModal();
  const { toast } = useToast();
  const isModalOpen = isOpen && type === "deleteProduct";

  const handleClose = () => {
    onClose();
  };

  // delete product
  const submit = async (id: any) => {
    try {
      setLoading(true);

      const response = await axios.delete(`/api/product/${id}`);

      handleClose();
      if (render) {
        setRender();
      } else {
        onRender();
      }
      toast({
        title: "Success",
        description: "product deleted successfully!!",
        variant: "success",
      });
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (
        error?.response ||
        error?.response?.data ||
        error.response?.data?.error ||
        error?.response?.data?.message
      ) {
        errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          "An error occurred";
      }
      toast({
        title: "Error",
        description: errorMessage || "Something went wrong!!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden     max-w-3xl ">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-3xl text-center font-bold">
              Delete product
            </DialogTitle>
          </DialogHeader>
          <p className="text-center">Are you sure?</p>
          <p className="text-center">This action cannot be undone.</p>
          <div className="w-full flex justify-center items-center bg-gray-100 ">
            <DialogFooter className=" bg-gray-100 px-6 py-4">
              <Button
                onClick={() => {
                  onClose();
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => submit(data?.product?._id)}
                variant="destructive"
              >
                {loading ? (
                  <Loader2 size={16} className="mr-2 animate-spin " />
                ) : null}
                Delete
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
