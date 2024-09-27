"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload } from "lucide-react";
import firebase from "@/firebase/firebase";
import "firebase/compat/storage";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import OverlayLoader from "./overlay-loader";

interface MultipleImageUploadProps {
  getImages: any;
  getProgress: any;
  setImageFiles: any;
  imageFiles: any;
  useImages: any;
  productId: any;
  rendring: any;
  setRendering: any;
  progress: any;
}

// Initialize Firebase Storage

export default function MultipleImageUpload({
  getImages,
  getProgress,
  useImages,
  productId,
  rendring,
  setRendering,
  progress,
}: MultipleImageUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    // Create a reference to the storage bucket

    // Loop through each file
    for (const file of files as any) {
      // Create a reference to the file in the storage bucket
      const storageRef = firebase.storage().ref("/products/" + file.name);

      try {
        // Upload the file
        const uploadTask = storageRef.put(file);
        // Handle upload progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setUploading(true);
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            getProgress(`Upload is ${progress.toString()} done`);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                getProgress("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                getProgress("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error("Upload failed:", error);
          },
          () => {
            // Handle successful uploads
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              getProgress("");
              setUploading(false);
              // Do something with the download URL (e.g., store it in a database)

              getImages((prevImages: any) => [...prevImages, downloadURL]);
            });
          }
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
      }
    }
  };

  const removeImage = async (index: number, id: string, imageId: string) => {
    try {
      setDeleting(true);

      const payload = { imageId: imageId };

      const response = await axios.delete(`/api/product/${id}/image`, {
        data: payload, // Pass payload as data
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Success",
        description: "Image deleted successfully!!",
        variant: "success",
      });
      setRendering(!rendring);
    } catch (error: any) {
      console.error(error.response.data);
      toast({
        title: "Error",
        description: error.response.data,
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const deleteImage = (index: number) => {
    setDeleting(true);
    getImages((prevImages: any) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      console.log(updatedImages, "updated");
      return updatedImages;
    });
    setDeleting(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  console.log(uploading, "uploading");

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

      <OverlayLoader
        isLoading={deleting || uploading}
        text={uploading ? progress : deleting ? "deleting" : ""}
      />

      {useImages?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {useImages.map((image: any, index: any) => (
            <Card
              className="relative group overflow-hidden"
              key={image?._id || index}
            >
              <img
                src={image.url || image}
                alt={image.alt}
                className="w-full h-40 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onClick={() => {
                    if (typeof image === "string") {
                      deleteImage(index);
                    } else {
                      removeImage(index, productId, image?._id);
                    }
                  }}
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
