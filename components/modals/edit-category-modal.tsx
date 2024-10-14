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
import { ChevronRight, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const EditCategoryModal = () => {
  const { isOpen, onClose, type, data, onRender } = useModal();
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [DescInput, setDescInput] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const { toast } = useToast();

  const handleNameInputChange = (e: any) => {
    setNameInput(e.target.value);
  };

  const handleDescInputChange = (e: any) => {
    setDescInput(e.target.value);
  };

  const isModalOpen = isOpen && type === "editCategory";

  const router = useRouter();

  // get a category
  const getCategory = async (id: any) => {
    try {
      // setLoading(true);
      const response = await axios.get(`/api/categories/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setNameInput(response.data.label);
      setDescInput(response.data.desc);
      setSubcategories(response.data.subcategories);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      // setLoading(false);
    }
  };

  console.log(subcategories);

  useEffect(() => {
    getCategory(data.category?._id);
  }, [data.category?._id]);

  // edit category
  const submit = async (id: any) => {
    try {
      setLoading(true);

      const response = await axios.patch(
        `/api/categories/${id}`,
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
        description: "Category updated successfully!!",
        variant: "success",
      });

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
              Edit Category
            </DialogTitle>
          </DialogHeader>
          <form action="" className="m-4">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 mb-3"
              placeholder="Category Name"
              onChange={handleNameInputChange}
              value={nameInput}
            />
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 mb-3"
              placeholder="Short Description"
              onChange={handleDescInputChange}
              value={DescInput}
            />
            {subcategories?.length > 0 && (
              <ul className="ml-6 space-y-1">
                {subcategories.map((subcategory, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    <span>{subcategory}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      // onClick={() => deleteSubcategory(index)}
                      className="ml-auto"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </form>

          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button onClick={() => submit(data?.category?._id)}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
