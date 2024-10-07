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
import { Package, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { dateConverter, twoDecimalPlaces } from "@/helper/function";
import dayjs from "dayjs";
import { useReactToPrint } from "react-to-print";
import React from "react"; // Import React for forwardRef

export default function Invoice({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>({});
  const [invoicedata, setInvoice] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null); // Specify the type for the ref
  const [invoiceNumber, setInvoiceNumber] = useState("");
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

  const generateOrderNumber = () => {
    setInvoice(true);
    const timestamp = Date.now(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 10000);
    const newInvoiceNumber = `INV-${timestamp}-${randomNum}`;
    setInvoiceNumber(newInvoiceNumber); // Update state first
    // Set invoicedata to true to prepare for printing
    setTimeout(handlePrint, 0); // Call handlePrint after state update
  };

  useEffect(() => {
    getProduct(params.id);
  }, [params.id, invoiceNumber]);

  const invoice = {
    number: invoiceNumber,
    date: "June 23, 2023",
    dueDate: "July 23, 2023",
    company: {
      name: "Kussa shea bliss",
      address: "6th link, Accra",
      phone: "0244650892/0598608660",
      email: "kussasheabliss@gmail.com",
    },
    customer: {
      name: "John Doe",
      address: "456 Customer Ave, Anytown, AN 67890",
      email: "john@example.com",
    },
    items: [
      { id: 1, description: "Product 1", quantity: 2, price: 19.99 },
      { id: 2, description: "Product 2", quantity: 1, price: 29.99 },
      { id: 3, description: "Product 3", quantity: 3, price: 9.99 },
    ],
    subtotal: 99.94,
    tax: 8.39,
    total: 108.33,
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
  });

  const InvoiceComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
    <div
      className="container mx-auto p-6 max-w-3xl bg-white "
      id="printContainer"
      ref={ref} // Forward the ref here
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Invoice</h1>
          <p className="text-sm text-muted-foreground">
            Invoice #{invoice.number}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold">{invoice.company.name}</h2>
          <p className="text-sm">{invoice.company.address}</p>
          <p className="text-sm">{invoice.company.phone}</p>
          <p className="text-sm">{invoice.company.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Bill To</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{order?.userOrderingInfo?.name}</p>
            <p>{order?.userOrderingInfo?.address}</p>
            <p>{order?.userOrderingInfo?.email}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <span>Invoice Date:</span>
              <span>{dayjs(order.createdAt).format("YYYY-MM-DD")}</span>
            </div>
            {/* <div className="flex justify-between">
              <span>Due Date:</span>
              <span>{order?.dueDate ? order.dueDate : ""}</span>
            </div> */}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.items?.map((item: any, index: any) => (
                <TableRow key={item._id}>
                  <TableCell>{item.productId.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {twoDecimalPlaces(item.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {twoDecimalPlaces(item.quantity * item.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <div className="w-1/2 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>GHC {twoDecimalPlaces(order.totalAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>GHC 0</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>GHC {twoDecimalPlaces(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        <p>
          Thank you for your business and enjoy an effortless journey to a
          healthy skin.
        </p>
        <p>
          If you have any questions, please contact us at{" "}
          {invoice.company.email}.
        </p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            generateOrderNumber();
          }}
        >
          Print invoice
        </Button>
      </div>

      <InvoiceComponent ref={componentRef} />
    </>
  );
}
