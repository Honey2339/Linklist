"use client";
import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { UserData } from "@/app/utils";

interface AddSocialsSheetProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function AddSocialsSheet({
  userData,
  setUserData,
}: AddSocialsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add Socials</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <SheetTitle>LinkedIn</SheetTitle>
            <SheetDescription>
              Enter Your LinkedIn Profile Link
            </SheetDescription>
            <Input
              className="border-2 border-blue-500"
              value={userData.linkedIn ?? ""}
              onChange={(e) =>
                setUserData((prevdata) => ({
                  ...prevdata,
                  linkedIn: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <SheetTitle>Youtube</SheetTitle>
            <SheetDescription>Enter Your Youtube Profile Link</SheetDescription>
            <Input
              className="border-2 border-red-500"
              value={userData.youtube ?? ""}
              onChange={(e) =>
                setUserData((prevdata) => ({
                  ...prevdata,
                  youtube: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <SheetTitle>Github</SheetTitle>
            <SheetDescription>Enter Your Github Profile Link</SheetDescription>
            <Input
              value={userData.github ?? ""}
              className="border-2 border-black"
              placeholder=""
              onChange={(e) =>
                setUserData((prevdata) => ({
                  ...prevdata,
                  github: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <SheetTitle>Instagram</SheetTitle>
            <SheetDescription>
              Enter Your Instagram Profile Link
            </SheetDescription>
            <Input
              value={userData.instagram ?? ""}
              className="border-2 border-purple-500"
              onChange={(e) =>
                setUserData((prevdata) => ({
                  ...prevdata,
                  instagram: e.target.value,
                }))
              }
            />
          </div>
          <p className="text-sm text-gray-500">
            Make sure to give your profile link!
          </p>
          <SheetTrigger asChild>
            <Button>Save</Button>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}
