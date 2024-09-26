"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload } from "lucide-react";

interface MultipleImageUploadProps {
  getImages: any;
}

export default function MultipleImageUpload({
  getImages,
}: MultipleImageUploadProps) {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
      getImages((prevImages: any) => [...prevImages, ...newImages]);
    }
  };

  // console.log(images);

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      URL.revokeObjectURL(updatedImages[index].preview);
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              Upload product images
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add one or more images for your product
            </p>
            <div className="mt-6">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  triggerFileInput();
                }}
              >
                Select Images
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <img
                src={image.preview}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-40 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
