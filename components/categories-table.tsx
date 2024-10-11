"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import OverlayLoader from "./overlay-loader";
import { useModal } from "@/hooks/use-modal-store";
import useAllCategories from "@/hooks/use-all-categories";
export const revalidate = 60;

export default function CategoriesTable() {
  const router = useRouter();
  const { categories, loading, getCategories } = useAllCategories();
  const [rendring, setRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { onOpen, isOpen, data, render } = useModal();

  useEffect(() => {
    getCategories();
  }, [rendring]);

  const FORMAT = "dddd, MMMM D, YYYY h:mm A";

  // console.log(products);

  const deleteProduct = async (id: string) => {
    try {
      setIsLoading(true);

      const response = await axios.delete(`/api/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Success",
        description: "Product deleted successfully!!",
        variant: "success",
      });
      setRendering(!rendring);
    } catch (error: any) {
      console.error(error?.response?.data);
      toast({
        title: "Error",
        description: error?.response?.data,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(categories);

  return (
    <Card>
      <CardHeader className="flex w-full justify-between flex-row">
        <div>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your categories.</CardDescription>
        </div>
        <div>
          <Button onClick={() => onOpen("createCategory")}>Add category</Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Description</TableHead>
              {/* <TableHead className="hidden md:table-cell">Description</TableHead> */}
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <OverlayLoader
            isLoading={isLoading}
            text="Processing your request..."
          />

          <TableBody>
            {categories.map((category: any) => (
              <TableRow key={category?._id}>
                <TableCell className="font-medium">{category?.label}</TableCell>

                <TableCell className="hidden md:table-cell">
                  {category?.desc}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {dayjs(category.createdAt).format(FORMAT)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onOpen("editCategory")}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          deleteProduct(category?._id);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {/* <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter> */}
    </Card>
  );
}
