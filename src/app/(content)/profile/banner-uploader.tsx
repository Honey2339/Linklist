"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserData } from "@/app/utils";

interface AddSocialsSheetProps {
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function BannerUpload({ setUserData }: AddSocialsSheetProps) {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onUpload = async (result: any) => {
    const userEmail = session?.user?.email;
    const newBanner = result.info.secure_url;
    const response = await fetch("/api/routes/onUploadBannerApi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: userEmail,
        newBanner: newBanner,
      }),
    });
    const updatedUser = await response.json();
    setUserData((prevData) => ({
      ...prevData,
      banner: newBanner,
    }));
    console.log("User updated:", updatedUser);
    console.log("Banner Changed");
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" variant="default" onClick={onClick}>
              Update Banner
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
