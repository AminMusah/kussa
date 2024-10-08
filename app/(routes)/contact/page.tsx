"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="container mx-auto px-4 pt-28 pb-16">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <Card className="lg:order-1 shadow-none border-none">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder=""
                    required
                    // onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={12} />
              </div>
              <Button type="submit" className="">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="relative h-full min-h-[600px] rounded-lg overflow-hidden">
          <Image
            src="/images/IMG_9439.jpg"
            alt="Contact Us"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
            <h2 className="text-white text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-white mb-4">
              We'd love to hear from you. Our team is always here to assist you.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white">
                <MapPin className="h-5 w-5" />
                <span>6th link, Accra</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Phone className="h-5 w-5" />
                <span>0244650892/0598608660</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Mail className="h-5 w-5" />
                <span>info@kussasheabliss.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
