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

export default function TransactionTable() {
  const router = useRouter();
  const [rendring, setRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const { toast } = useToast();

  // get all products
  const getTransactions = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("https://api.paystack.co/transaction", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer pk_test_26b8ff5d42befde7b35e08f9f379b26ef3e2c1c2`,
        },
      });

      setTransaction(response?.data?.data);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const FORMAT = "dddd, MMMM D, YYYY h:mm A";

  console.log(transaction);

  return (
    <Card>
      <CardHeader className="flex w-full justify-between flex-row">
        <div>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Manage Transactions.</CardDescription>
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
      <OverlayLoader isLoading={isLoading} text="Getting transactions..." />

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="relative">
            {transaction?.map((transaction: any) => (
              <TableRow key={transaction?.id}>
                <TableCell className="font-medium">
                  {transaction?.customer?.email}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction?.currency} {transaction?.amount / 100}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction?.channel}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">{transaction?.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {dayjs(transaction?.paidAt || transaction?.paid_at).format(
                    FORMAT
                  )}
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
