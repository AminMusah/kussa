"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import useGetCart from "@/hooks/use-cart-items";
import { useModal } from "@/hooks/use-modal-store";
import { twoDecimalPlaces } from "@/helper/function";
import axios from "axios";

// Define the type for cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  _id: string; // {{ edit_1 }} Add _id property
  productId: {
    name: string;
    category: any;
    images: { url: string }[]; // {{ edit_1 }} Add images property
  };
  quantity: number; // {{ edit_2 }} Add quantity property
  // Add other properties as needed
}

interface Cart {
  items: CartItem[];
}

export default function CheckOut() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const { render } = useModal();
  const { getCart, cart }: any = useGetCart();

  // get a product

  useEffect(() => {
    getCart();
  }, [render]);

  const subtotal =
    cart?.items?.reduce((acc: number, item: CartItem) => {
      // {{ edit_1 }} Calculate subtotal
      return acc + item.price * item.quantity; // Multiply price by quantity
    }, 0) || 0;

  const validation = {
    name,
    email,
    phone,
    address,
    city,
    state,
    zip,
    country,
  } as any;

  const initiatePayment = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: subtotal,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const data = await response.json();
      // console.log("Payment initiated:", data);
      // Handle successful payment initiation here
      toast({
        title: "Success",
        description: data?.message,
        variant: "success",
      });
      router.push(data?.data?.authorization_url);
    } catch (error) {
      console.error("Error initiating payment:", error);
      //   toast({
      //     variant: "destructive",
      //     title: "Error!",
      //     description: JSON.parse(JSON.stringify(err?.errors[0]?.message)),
      //   });
    } finally {
      setIsSubmitting(false);
    }
  };

  const placeOrder = async () => {
    try {
      for (let field in validation) {
        if (!validation[field]) {
          toast({
            title: "Error",
            description: `Please ${field} field is required`,
            variant: "destructive",
          });
          return;
        }
      }

      setIsOrdering(true);

      const userOrderingInfo = {
        name,
        email,
        phone,
        address,
        city,
        state,
        zip,
        country,
      };

      const response = await axios.post(
        "/api/order/place",
        { userOrderingInfo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Success",
        description: "Order placed successfully!, kindly make payment :)",
        variant: "success",
      });
      initiatePayment();
    } catch (error: any) {
      // console.error(error?.response);
      toast({
        title: "Error",
        description: error?.response?.data,
        variant: "destructive",
      });
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="grid items-start grid-cols-4 py-28 px-2 ">
      <div className="col-span-4 md:col-span-2  flex flex-col ">
        <div className="md:pr-6 ">
          <h1 className="text-4xl font-bold mb-4">Order Summary</h1>
          <p className="text-gray-600 mb-6">
            Review your order carefully. Once you're ready, click 'Proceed to
            Payment' to complete your purchase.
          </p>

          {/* <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">
              Tracking number
            </h2>
            <p className="text-blue-600">515478787555458481512</p>
          </div> */}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {cart?.items?.map(
                (
                  item: CartItem // Use the defined CartItem type
                ) => (
                  <div className="flex space-x-4 " key={item?._id}>
                    <Image
                      src={item?.productId?.images[0]?.url}
                      alt={item?.productId?.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="flex-1 justify-start items-start">
                      <h3 className="font-semibold text-sm">
                        {item?.productId?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item?.productId?.category?.label}
                      </p>
                      {/* <p className="text-sm text-gray-600">L</p> */}
                    </div>
                    <p className="font-semibold">
                      GHC {twoDecimalPlaces(item?.price * item?.quantity)}
                    </p>
                  </div>
                )
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-semibold">
                    GHC {twoDecimalPlaces(subtotal)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="font-semibold">GHC 0.00</p>
                </div>
                <div className="flex justify-between">
                  <p>Taxes</p>
                  <p className="font-semibold">GHC 0.00</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold">
                    GHC {twoDecimalPlaces(subtotal)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
              <p>Kristin Watson</p>
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON N3Y 4H8</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Payment Information
              </h2>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded">
                  VISA
                </div>
                <p>Ending with 4242</p>
              </div>
              <p>Expires 12 / 21</p>
            </div>
          </div> */}
        </div>
      </div>
      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl">Checkout</CardTitle>
          <CardDescription>
            Please provide your details and delivery information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder=""
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Delivery Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Anytown"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input
                    id="zip"
                    placeholder="12345"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="specialInstructions">
                Special Delivery Instructions (Optional)
              </Label>
              <Textarea
                id="specialInstructions"
                placeholder="E.g., Leave at the door, Ring doorbell, etc."
                rows={4}
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full rounded-full"
            onClick={() => {
              placeOrder();
            }}
          >
            {isOrdering ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
