"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAllProducts from "@/hooks/use-all-products";

interface Product {
  name: string;
  price: number;
  quantity: number;
  images: { url: string }[]; // Updated type to an array of objects with a url property
  _id: string;
}

type Order = {
  id: number;
  customerName: string;
  products: Product[];
  total: number;
};

export default function page() {
  const [isOrdering, setIsOrdering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const { toast } = useToast();
  const {
    products,
    loading,
    getProducts,
    filterName,
    accummilatedFilters,
  }: any = useAllProducts();

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddProduct = (productName: string) => {
    const product = products.find((p: Product) => p.name === productName);
    if (product) {
      setSelectedProducts([
        ...selectedProducts,
        {
          name: product.name,
          quantity: 1,
          price: product.price,
          images: product.images,
          _id: product._id,
        },
      ]);
    }
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = Math.max(1, newQuantity);
    setSelectedProducts(updatedProducts);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
  };

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

      const data = selectedProducts.map((product) => {
        return {
          productId: product?._id,
          name: product?.name,
          quantity: product?.quantity,
          price: product?.price,
        };
      });

      const response = await axios.post(
        "/api/order/place-admin-order",
        {
          userOrderingInfo,
          products: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Success",
        description: "Order placed successfully! :)",
        variant: "success",
      });
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setCountry("");
      setDeliveryInstructions("");
      setSelectedProducts([]);
    } catch (error: any) {
      console.error(error?.response);
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
    <div>
      <div className="my-10">
        <h1 className="text-2xl font-bold mb-4">Place order</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Place New Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="product">Add Product</Label>
                <Select onValueChange={handleAddProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product: any) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name} - ${product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-xl">
          {selectedProducts?.map(
            (
              item: any,
              index // Use the defined CartItem type
            ) => (
              <div className="mt-8" key={item?._id}>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    <li className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item?.images[0]?.url}
                          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex justify-between flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3 className="w-36">
                              <a href="#"> {item?.name}</a>
                            </h3>
                            <p className="">
                              GHC{" "}
                              {twoDecimalPlaces(item?.price * item?.quantity)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item?.productId?.category?.label}
                          </p>
                        </div>

                        <div className="flex w-full justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Button
                              disabled={item?.quantity <= 1}
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleQuantityChange(index, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  index,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleQuantityChange(index, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex">
                            <button
                              onClick={() => {
                                handleRemoveProduct(index);
                              }}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <Trash2 color="#000" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardDescription>
            Please provide customer details and delivery information
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
            Proceed to place order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
