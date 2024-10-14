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
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import MultipleImageUpload from "@/components/multiple-image-uplaod";
import useAllCategories from "@/hooks/use-all-categories";

export default function CreateProduct({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { categories, getCategories } = useAllCategories();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [render, setRender] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [images, setImages] = useState<string[]>([]); // Specify type as string[]
  const [category, setCategory] = useState("");
  const [progress, setProgress] = useState("");
  const [imageFiles, setImageFiles] = useState<
    { file: File; preview: string }[]
  >([]);

  const handCategoryInputChange = (value: any) => {
    setCategory(value);
  };

  const [product, setProduct] = useState<any>({});

  // get a product
  const getProduct = async (id: any) => {
    try {
      // setLoading(true);
      const response = await axios.get(`/api/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setProduct(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setCategory(response.data.category);
      setStockQuantity(response.data.stockQuantity);
      setImages(response.data.images);
      setPrice(response.data.price);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getProduct(params.id);
  }, [params.id, render]);

  const submit = async () => {
    try {
      setLoading(true);

      const imgUrls = [
        ...images.map((item: any) =>
          typeof item === "string" ? { url: item } : { ...item }
        ),
      ];

      const payload = {
        name,
        description,
        price: +price,
        stockQuantity: +stockQuantity,
        images: imgUrls,
        category,
      };

      const response = await axios.patch(`/api/product/${params.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Success",
        description: "Product updated successfully!!",
        variant: "success",
      });
      setRender(!render);
    } catch (error: any) {
      console.error(error?.response?.data);
      toast({
        title: "Error",
        description: error?.response?.data,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update product</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  value={stockQuantity}
                  placeholder="Enter stock quantity"
                  onChange={(e) => setStockQuantity(+e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) => {
                    handCategoryInputChange(value);
                  }}
                  defaultValue={category}
                  value={category}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category: any) => (
                      <React.Fragment key={category._id}>
                        <SelectItem value={category._id}>
                          {category?.label}
                        </SelectItem>
                      </React.Fragment>
                    ))}
                  </SelectContent>
                  {/* <SelectContent>
                    <SelectItem value="lemon">Lemon</SelectItem>
                    <SelectItem value="coconut">Coconut</SelectItem>
                    <SelectItem value="citronella">Citronella</SelectItem>
                    <SelectItem value="perfume">Perfume</SelectItem>
                    <SelectItem value="lavender">Lavender</SelectItem>
                    <SelectItem value="natural">Natural</SelectItem>
                    <SelectItem value="coconut oil">Coconut oil</SelectItem>
                    <SelectItem value="soaps">Soaps</SelectItem>
                    <SelectItem value="beard oil">Beard oil</SelectItem>
                    <SelectItem value="body oil">Body oil</SelectItem>
                    <SelectItem value="hampers">Hampers</SelectItem>
                    <SelectItem value="diffusers">Diffusers</SelectItem>
                    <SelectItem value="hair products">Hair products</SelectItem>
                    <SelectItem value="gift sets">Gift sets</SelectItem>
                  </SelectContent> */}
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  rows={10}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
            </div>
            <MultipleImageUpload
              getImages={setImages}
              getProgress={setProgress}
              setImageFiles={setImageFiles}
              imageFiles={imageFiles}
              useImages={images}
              productId={params.id}
              rendring={render}
              setRendering={setRender}
              progress={progress}
            />

            <Button
              type="submit"
              // className="w-full"
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              Update product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
