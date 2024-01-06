"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { db } from "@/app/api/auth/[...nextauth]/db";
import { useSession } from "next-auth/react";
import { UserData } from "@/app/utils";

interface AddSocialsSheetProps {
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function ImageUpload({ setUserData }: AddSocialsSheetProps) {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onUpload = async (result: any) => {
    const userEmail = session?.user?.email;
    const newImage = result.info.secure_url;
    const response = await fetch("/api/routes/onUploadImageApi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: userEmail,
        newImage: newImage,
      }),
    });
    const updatedUser = await response.json();
    setUserData((prevData) => ({
      ...prevData,
      avatar: newImage,
    }));
    console.log("User updated:", updatedUser);
    console.log("Image Changed");
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" variant="default" onClick={onClick}>
              Update Profile Photo
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
