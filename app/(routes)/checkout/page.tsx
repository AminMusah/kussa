"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function CheckOut() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    for (let field in validation) {
      if (!validation[field]) {
        console.log(`Validation field is empty: ${field}`);
        toast({
          title: "Error",
          description: `Please fill in the ${field} field`,
          variant: "destructive",
        });
        return;
      }
    }
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const data = await response.json();
      console.log("Payment initiated:", data);
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

  return (
    <div className="grid items-center grid-cols-3 py-28 px-2">
      <Card className=" col-span-2">
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
                    placeholder="John Doe"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
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
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Anytown"
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    required
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input
                    id="zip"
                    placeholder="12345"
                    required
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    required
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
              initiatePayment();
            }}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>
      <div className="px-2 col-span-3 md:col-span-1  sm:mt-10 xl:mt-0 flex flex-col ">
        <p className="md:px-10 my-5 md:my-0 text-start text-3xl">Payment</p>
        <div className="flex justify-between md:px-10 flex-col  items-start">
          <div className="flex w-full flex-col  my-5 ">
            {/* <div className="flex justify-between w-full ">
              <span className="text-xl">Sub total</span>
              <span className="text-3xl">GHC 100</span>
            </div> */}
            <div className="h-[1px] bg-black w-full my-5"></div>
            <div className="flex justify-between w-full">
              <span className="text-xl font-bold">Total</span>
              <span className="text-3xl">GHC 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
