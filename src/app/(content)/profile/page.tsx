"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ImageUpload from "./image-uploader";
import BannerUpload from "./banner-uploader";
import AddSocialsSheet from "./addsocialsheet";
import { useEffect, useState } from "react";
import { UserData, UserDataSchema, initialUserData } from "@/app/utils";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const space = Space_Grotesk({ subsets: ["latin"], weight: "500" });

const Avatar: React.FC<{ src?: string }> = ({ src }) => {
  return (
    <AvatarComponent className="border-4 border-white h-32 w-32 shadow-lg">
      <AvatarFallback>
        <div className="bg-gray-200 rounded-full p-2"></div>
      </AvatarFallback>
      <AvatarImage
        src={src}
        alt="Profile Image"
        className="rounded-full w-full h-full"
      />
    </AvatarComponent>
  );
};

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [validationError, setValidationError] = useState<string[]>([]);
  const userId = session?.user?.id;
  const { toast } = useToast();

  console.log(session?.user.id);
  console.log(session);
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const response = await fetch("/api/routes/getUserData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const existingUserData = await response.json();
        if (existingUserData?.Message?.displayName) {
          setUserData(existingUserData.Message);
        }
      };
      fetchData();
    }
  }, [userId]);

  const handleUploadUserData = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const userId = session?.user?.id;
    try {
      const parsedUserData = UserDataSchema.parse(userData);
      const response = await fetch("/api/routes/userdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          userData: parsedUserData,
        }),
      }).then((data) => {
        setUserData(initialUserData);
        toast({
          variant: "success",
          title: "Page Created",
          description: "Your One Link Page Is Successfully Created",
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message);
        setValidationError(errorMessage);
        console.log(errorMessage);
      }
      console.error(error);
    }
  };
  return (
    <main className="h-[91vh] flex items-center justify-center">
      <section className="min-h-[80vh] w-[1300px] max-lg:mt-20 rounded-xl border-2 border-gray-200 shadow-lg">
        <Image
          src={session?.user.banner ?? "/defaultBanner.jpg"}
          height={50}
          width={1000}
          className="w-full h-[200px] object-cover"
          alt="banner"
        />
        <div className={cn("flex flex-col px-20 mt-4")}>
          <div className="flex items-center gap-10">
            <Avatar src={session?.user?.image ?? "/defaultBanner.jpg"} />
            <div className="flex flex-col gap-3">
              <ImageUpload setUserData={setUserData} />
              <BannerUpload setUserData={setUserData} />
            </div>
          </div>
          <div>
            <h1
              className={cn(
                space.className,
                "text-gray-700 text-lg font-medium mt-10"
              )}
            >
              DISPLAY NAME
            </h1>
            <Input
              className="bg-gray-200 max-w-sm"
              placeholder="Your Display Name..."
              value={userData.displayName}
              onChange={(e) =>
                setUserData((prevdata) => ({
                  ...prevdata,
                  displayName: e.target.value,
                }))
              }
            />

            <h1
              className={cn(
                space.className,
                "text-gray-700 text-lg font-medium mt-5"
              )}
            >
              LOCATION
            </h1>
            <Input
              className="bg-gray-200 max-w-sm"
              placeholder="Location..."
              value={userData.location}
              onChange={(e) =>
                setUserData((prevdata) => ({
                  ...prevdata,
                  location: e.target.value,
                }))
              }
            />
            <h1
              className={cn(
                space.className,
                "text-gray-700 text-lg font-medium mt-5"
              )}
            >
              BIO
            </h1>
            <Textarea
              className="bg-gray-200 max-w-sm resize-none"
              placeholder="Location..."
              value={userData.bio}
              onChange={(e) =>
                setUserData((prevdata) => ({
                  ...prevdata,
                  bio: e.target.value,
                }))
              }
            />
            <div className="flex items-center mt-4 space-x-2">
              <AddSocialsSheet userData={userData} setUserData={setUserData} />
            </div>
            <div className="mt-2">
              <Button
                className="bg-sky-600 hover:bg-blue-700"
                onClick={handleUploadUserData}
              >
                Submit
              </Button>
            </div>
          </div>
          <div className="max-w-lg mt-5 mb-5">
            {validationError.map((err) => (
              <p key={err} className="text-sm text-destructive">
                • {err}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default Profile;
