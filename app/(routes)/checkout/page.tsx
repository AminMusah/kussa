"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function CheckOut() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const initiatePayment = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000,
          email: "taylorsnupe77@gmail.com",
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
      });
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
    <div className="h-dvh grid items-center">
      <Button
        onClick={() => {
          initiatePayment();
        }}
      >
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
        Initaite
      </Button>
    </div>
  );
}
