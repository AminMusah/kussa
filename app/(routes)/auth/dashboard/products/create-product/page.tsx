"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import MultipleImageUpload from "@/components/multiple-image-uplaod";

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [images, setImages] = useState([]); // Specify type as string[]
  const [category, setCategory] = useState("");

  const submit = async () => {
    try {
      setLoading(true);
      console.log(images);
      const response = await axios.post(
        "/api/product/",
        {
          name,
          description,
          price,
          stockQuantity,
          images,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Success",
        description: "Product created successfully!!",
        variant: "success",
      });

      setName("");
      setDescription("");
      setPrice("");
      setStockQuantity("");
      setImages([]);
      setCategory("");
    } catch (error: any) {
      console.error(error.response.data);
      toast({
        title: "Error",
        description: error.response.data,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="Enter price" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  placeholder="Enter stock quantity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lemon">Lemon</SelectItem>
                    <SelectItem value="coconut">Coconut</SelectItem>
                    <SelectItem value="citronella">Citronella</SelectItem>
                    <SelectItem value="perfume">Perfume</SelectItem>
                    <SelectItem value="lavender">Lavender</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                />
              </div>
            </div>
            <MultipleImageUpload getImages={setImages} />
            <Button
              type="submit"
              // className="w-full"
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              Create Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
