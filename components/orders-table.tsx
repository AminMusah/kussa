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
export const revalidate = 60;

// Define a type for the transaction
type Transaction = {
  customer: {
    email: string;
  };
  status: string; // Add status property
  gateway_response?: string; // Add gateway_response property
  paidAt?: string;
  amount: number;
  // Add other properties as needed
};

// Define a type for the order
type Order = {
  _id: string;
  userOrderingInfo: {
    name: string;
    email: string;
    phone: string;
  };
  totalAmount: number;
  createdAt: string;

  // Add other properties as needed
};

export default function OrdersTable() {
  const router = useRouter();
  const [rendring, setRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]); // Specify the type for orders
  const [transaction, setTransaction] = useState<Transaction[]>([]); // Specify the type for transaction
  const { toast } = useToast();

  // get all products
  const getOrders = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/order/all/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setOrders(response.data);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactions = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("https://api.paystack.co/transaction", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer sk_test_3dad8c2379e59ee618e545c99d08819c4e208f3e`,
        },
      });
      // console.log(response.data.data);
      const revenue = response?.data?.data.filter(
        (success: { status: string }) => success.status === "success"
      ); // Specify type for success

      setTransaction(response.data.data);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const orderEmails = new Set(
    orders.map((order) => order.userOrderingInfo.email)
  ); // Create a Set of order emails

  // Get matching transactions
  const matchingTransactions = transaction.filter(
    (trans) => orderEmails.has(trans.customer.email) // Filter transactions based on matching emails
  ); // Filter transactions based on matching emails

  // Get unmatched transactions
  const unmatchedTransactions = transaction.filter(
    (trans) => !orderEmails.has(trans.customer.email) // Filter transactions that do not match
  );

  // console.log(matchingTransactions); // Log the matching transactions
  // console.log(unmatchedTransactions); // Log the unmatched transactions

  const FORMAT = "dddd, MMMM D, YYYY h:mm A";

  // After fetching orders and transactions
  const updatedOrders = orders.map((order) => {
    const matchedTransaction = matchingTransactions.find(
      (trans) => trans.customer.email === order.userOrderingInfo.email
    );

    return {
      ...order,
      success: !!matchedTransaction, // Attach success status
      status: matchedTransaction?.status, // Attach status
      gateway_response: matchedTransaction?.gateway_response, // Attach gateway_response
      paidAt: matchedTransaction?.paidAt, // Attach paidAt
      paidAmount: matchedTransaction?.amount, // Attach paidAmount
      // paymentStatus: matchedTransaction?.status,
    };
  });

  // console.log(updatedOrders, "orders");

  // Update the orders state
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Card>
      <CardHeader className="flex w-full justify-between flex-row">
        <div>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage and track all orders.</CardDescription>
        </div>
        <div>
          <Button
            onClick={() => router.push("/auth/dashboard/orders/place-order")}
          >
            Place order
          </Button>
        </div>
      </CardHeader>
      <OverlayLoader isLoading={isLoading} text="Getting orders..." />

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">
                Order number
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">
                Order value
              </TableHead>
              <TableHead>Amount paid</TableHead>
              <TableHead className="hidden md:table-cell">Paid at</TableHead>
              <TableHead className="hidden md:table-cell">Ordered at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="relative">
            {updatedOrders.map((orders: any) => (
              <TableRow key={orders?._id}>
                <TableCell className="hidden md:table-cell">
                  {orders.orderNumber}
                </TableCell>
                <TableCell className="font-medium">
                  {orders.userOrderingInfo?.name}
                </TableCell>
                <TableCell className="font-medium">
                  {orders.userOrderingInfo?.email}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {orders?.userOrderingInfo?.phone}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  GHC {orders?.totalAmount}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  GHC{" "}
                  {orders?.paidAmount && orders?.paidAt
                    ? orders?.paidAmount / 100
                    : 0}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {orders?.paidAmount > 0
                    ? dayjs(orders?.paidAt).format(FORMAT)
                    : ""}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {dayjs(orders?.createdAt).format(FORMAT)}
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
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(`/auth/dashboard/orders/${orders?._id}`);
                        }}
                      >
                        view more details
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
