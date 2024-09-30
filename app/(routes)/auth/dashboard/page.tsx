"use client";

import { Activity, CreditCard, DollarSign } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import { twoDecimalPlaces } from "@/helper/function";

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

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  const getOrders = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/order/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setOrders(response.data);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/product/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  // get all products
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

      setTransaction(revenue);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    getOrders();
    getProducts();
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

  const subtotal =
    matchingTransactions?.reduce((acc: number, item: any) => {
      // {{ edit_1 }} Calculate subtotal
      return acc + item.amount; // Multiply price by quantity
    }, 0) || 0;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Card className=" border-[1px] shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="h-4 w-4 text-muted-foreground">GHC</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              GHC {twoDecimalPlaces(subtotal / 100)}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card className=" border-[1px] shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{orders.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card className=" border-[1px] shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active products
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{products.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
        <Card className="">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/auth/dashboard/transactions">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction?.slice(0, 7)?.map((transaction: any, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">
                        {transaction?.customer?.first_name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {transaction?.customer?.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">
                      GHC {twoDecimalPlaces(transaction.amount / 100)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stock levels</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {products?.slice(0, 5)?.map((orders: any, index) => (
              <div
                className="flex items-center gap-4"
                key={orders?._id + "orders" + index + 1}
              >
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{orders?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {orders?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orders?.category}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {orders?.stockQuantity}{" "}
                  {orders?.stockQuantity === 1 ? "pc" : "pcs"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
