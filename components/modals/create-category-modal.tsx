"use client";

import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const CreateCategoryModal = () => {
  const { isOpen, onClose, type, data, onRender } = useModal();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [DescInput, setDescInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const { toast } = useToast();
  const handleNameInputChange = (e: any) => {
    setNameInput(e.target.value);
  };

  const handleDescInputChange = (e: any) => {
    setDescInput(e.target.value);
  };

  const isModalOpen = isOpen && type === "createCategory";

  const router = useRouter();

  // create category
  const submit = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/categories/",
        {
          label: nameInput,
          desc: DescInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Success",
        description: "Category created successfully!!",
        variant: "success",
      });
      setDescInput("");
      setNameInput("");
      handleClose();
      onRender();
    } catch (error: any) {
      console.error(error.response.data);
      toast({
        title: "Error",
        description: error?.response?.data || "Something went wrong!!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Create Category
            </DialogTitle>
          </DialogHeader>
          <form action="" className="m-4">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 mb-3"
              placeholder="Category Name"
              onChange={handleNameInputChange}
            />
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 mb-3"
              placeholder="Short Description"
              onChange={handleDescInputChange}
            />
          </form>

          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button onClick={submit}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
