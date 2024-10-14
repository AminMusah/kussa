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
import { ChevronRight, Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const EditCategoryModal = () => {
  const { isOpen, onClose, type, data, onRender } = useModal();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<{ [key: string]: boolean }>({});
  const [deleted, setDeleted] = useState(false);
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

  const addSubcategory = () => {
    if (newSubcategoryName) {
      setSubcategories([...subcategories, newSubcategoryName]); // Append new subcategory to the array
      setNewSubcategoryName(""); // Clear input field after adding
    }
  };

  console.log(subcategories);

  useEffect(() => {
    getCategory(data.category?._id);
  }, [data.category?._id, deleted]);

  // edit category
  const submit = async (id: any) => {
    try {
      setLoading(true);

      const response = await axios.patch(
        `/api/categories/${id}`,
        {
          label: nameInput,
          desc: DescInput,
          subcategories,
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

  const deleteSubcategory = async (subcategoryId: any) => {
    setDeleting((prevLoadingStates) => ({
      ...prevLoadingStates,
      [subcategoryId]: true,
    }));
    try {
      const response = await axios.delete(
        `/api/categories/subcategory/${subcategoryId}`
      );
      setDeleted(!deleted);
      console.log(response.data); // Success message
      toast({
        title: "Success",
        description: response?.data || "deleted successfully!!",
        variant: "success",
      });
    } catch (error: any) {
      console.error("Error deleting subcategory", error);
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
      setDeleting((prevLoadingStates) => ({
        ...prevLoadingStates,
        [subcategoryId]: false,
      }));
    }
  };

  const deleteNewSubcategory = (index: number) => {
    const updatedSubcategories = subcategories.filter(
      (_, subIndex) => subIndex !== index
    );
    setSubcategories(updatedSubcategories);
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
          <form action="" className="m-4" onSubmit={(e) => e.preventDefault()}>
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
            <div className="flex items-end gap-2">
              <div className="flex-grow">
                <Input
                  id="subcategoryName"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  placeholder="Enter subcategory name"
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                />
              </div>
              <Button onClick={() => addSubcategory()}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
            {subcategories?.length > 0 && (
              <ul className="ml-6 space-y-1">
                {subcategories.map((subcategory: any, index) => (
                  <li
                    key={subcategory?._id}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="h-3 w-3" />
                    <span>
                      {subcategory?._id ? subcategory?.label : subcategory}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        subcategory?._id
                          ? deleteSubcategory(subcategory?._id)
                          : deleteNewSubcategory(index)
                      }
                      className="ml-auto"
                    >
                      {deleting[subcategory?._id] ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
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
