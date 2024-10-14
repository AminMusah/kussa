"use client";

import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
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
import useAllCategories from "@/hooks/use-all-categories";
import { Label } from "../ui/label";

export const CreateCategoryModal = () => {
  const { isOpen, onClose, type, data, onRender, render, setRender } =
    useModal();
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

  const isModalOpen = isOpen && type === "createCategory";

  const { categories, getCategories } = useAllCategories();

  useEffect(() => {
    getCategories();
  }, []);

  const addSubcategory = () => {
    if (newSubcategoryName) {
      setSubcategories([...subcategories, newSubcategoryName]); // Append new subcategory to the array
      setNewSubcategoryName(""); // Clear input field after adding
    }
  };

  console.log(subcategories);

  // create category
  const submit = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/categories/",
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
        description: "Category created successfully!!",
        variant: "success",
      });
      setDescInput("");
      setNameInput("");
      setSubcategories([]);
      handleClose();
      if (render) {
        setRender();
      } else {
        onRender();
      }
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

  const deleteSubcategory = (index: number) => {
    const updatedSubcategories = subcategories.filter(
      (_, subIndex) => subIndex !== index
    );
    setSubcategories(updatedSubcategories);
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
          <form
            className="m-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
            {subcategories.length > 0 && (
              <ul className="ml-6 space-y-1">
                {subcategories.map((subcategory, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    <span>{subcategory}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSubcategory(index)}
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
