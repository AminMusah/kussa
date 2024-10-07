"use client";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { dateConverter, twoDecimalPlaces } from "@/helper/function";
import React from "react"; // Import React for forwardRef
import { useRouter } from "next/navigation";

export default function OrderDetails({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>({});
  const [invoicedata, setInvoice] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null); // Specify the type for the ref
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const route = useRouter();
  // get a product
  const getProduct = async (id: any) => {
    try {
      // setLoading(true);
      const response = await axios.get(`/api/order/all/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setOrder(response.data);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getProduct(params.id);
  }, [params.id, invoiceNumber]);

  return (
    <>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <Button
            onClick={() => {
              route.push(`/auth/dashboard/orders/${params.id}/invoice`);
            }}
          >
            Invoice
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Order #{order.orderNumber}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{dateConverter(order.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <Badge
                  variant={order.status === "Shipped" ? "default" : "secondary"}
                >
                  {order.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {order?.userOrderingInfo?.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {order?.userOrderingInfo?.email}
              </div>
              <div>
                <span className="font-semibold">Shipping Address:</span>
                <p>{order?.userOrderingInfo?.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.items?.map((item: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{item?.productId?.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      GHC {twoDecimalPlaces(item.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      GHC {(item?.quantity * item?.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 ml-auto text-right">
              <div className="text-sm">
                Subtotal:{" "}
                <span className="font-semibold">
                  GHC {twoDecimalPlaces(order?.totalAmount)}
                </span>
              </div>
              {/* <div className="text-sm">
              Shipping:{" "}
              <span className="font-semibold">
                ${order?.shipping?.toFixed(2)}
              </span>
            </div> */}
              <div className="text-sm">
                Tax: <span className="font-semibold">GHC {0}</span>
              </div>
              <Separator />
              <div className="text-lg font-bold">
                Total: GHC {twoDecimalPlaces(order?.totalAmount)}
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Standard Delivery</span>
            </div>
            {/* <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span>Estimated Delivery: June 30, 2023</span>
          </div> */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
