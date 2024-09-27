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
import useAllProducts from "@/hooks/use-all-products";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import OverlayLoader from "./overlay-loader";

export default function ProductsTable() {
  const router = useRouter();
  const { products, loading, getProducts } = useAllProducts();
  const [rendring, setRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getProducts();
  }, [rendring]);

  const FORMAT = "dddd, MMMM D, YYYY h:mm A";

  console.log(products);

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
      console.error(error.response.data);
      toast({
        title: "Error",
        description: error.response.data,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex w-full justify-between flex-row">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </div>
        <div>
          <Button
            onClick={() =>
              router.push("/auth/dashboard/products/create-product")
            }
          >
            Add product
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Quantity</TableHead>
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
            {products.map(
              (product: {
                _id: string;
                name: string;
                description: string;
                images: { url: string }[];
                link: string;
                price: number;
                createdAt: any;
                stockQuantity: any;
              }) => (
                <TableRow key={product?._id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product?.images[0]?.url}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product?.name}</TableCell>
                  {/* <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell> */}
                  <TableCell>GHC {product?.price}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stockQuantity} pcs
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {dayjs(product.createdAt).format(FORMAT)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(
                              `/auth/dashboard/products/${product?._id}`
                            );
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            deleteProduct(product?._id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
