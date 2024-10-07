"use client";

import Image from "next/image";
import { Loader2, MoreHorizontal } from "lucide-react";
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

export default function InventoryTable() {
  const router = useRouter();
  const [rendring, setRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const { toast } = useToast();

  // get all products
  const getOrders = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/product/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setInventory(response.data);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const FORMAT = "dddd, MMMM D, YYYY h:mm A";

  // console.log(inventory);

  return (
    <Card>
      <CardHeader className="flex w-full justify-between flex-row">
        <div>
          <CardTitle>Inevntory</CardTitle>
          <CardDescription>Manage Inventory.</CardDescription>
        </div>
        {/* <div>
          <Button
            onClick={() =>
              router.push("/auth/dashboard/products/create-product")
            }
          >
            Add product
          </Button>
        </div> */}
      </CardHeader>
      <OverlayLoader isLoading={isLoading} text="Getting inventory..." />

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Stock Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total value</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="relative">
            {inventory.map((inventory: any) => (
              <TableRow key={inventory?._id}>
                <TableCell className="font-medium">{inventory?.name}</TableCell>
                <TableCell className="font-medium">
                  {inventory.stockQuantity}{" "}
                  {inventory?.stockQuantity === 1 ? "pc" : "pcs"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {inventory?.price}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  GHC {inventory?.price * inventory?.stockQuantity}
                </TableCell>
                {/* <TableCell>
                  <Badge variant="outline">Draft</Badge>
                </TableCell> */}
                <TableCell className="hidden md:table-cell">
                  {dayjs(inventory?.createdAt).format(FORMAT)}
                </TableCell>
                {/* <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(
                            `/auth/dashboard/orders/${inventory?._id}`
                          );
                        }}
                      >
                        view more details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell> */}
              </TableRow>
            ))}
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
