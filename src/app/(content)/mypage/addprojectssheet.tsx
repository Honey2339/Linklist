import { UserProjectsType, initialUserProjectData } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Space_Grotesk } from "next/font/google";
import { title } from "process";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const space = Space_Grotesk({ subsets: ["latin"], weight: "500" });

export default function AddProjectsSheet({ setErrorMsg }: any) {
  const { data: session } = useSession();
  const [userProjects, setUserProjects] = useState<UserProjectsType>(
    initialUserProjectData
  );
  const userId = session?.user.id;
  const handleUserProjects = async () => {
    if (userId) {
      const response = await fetch("/api/routes/sendProjectData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userProjects }),
      });
      const data = await response.json();
      console.log(data);
      setErrorMsg(data);
      setTimeout(() => {
        setErrorMsg([]);
      }, 3000);
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Add Projects</Button>
        </SheetTrigger>
        <SheetContent className="space-y-2">
          <SheetTitle
            className={cn(
              space.className,
              "text-gray-700 text-2xl underline mb-5"
            )}
          >
            ADD PROJECTS
          </SheetTitle>
          <div className="space-y-1">
            <SheetTitle className="text-lg">Title :</SheetTitle>
            <Input
              placeholder="Add Title of your project"
              onChange={(e) =>
                setUserProjects((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <SheetTitle className="text-lg">Description :</SheetTitle>
            <Textarea
              className="resize-none"
              placeholder="Add Description of your project"
              onChange={(e) =>
                setUserProjects((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <SheetTitle className="text-sm">Live Link</SheetTitle>
            <Input
              className="resize-none"
              placeholder="http://..."
              onChange={(e) =>
                setUserProjects((prevData) => ({
                  ...prevData,
                  link: e.target.value,
                }))
              }
            />
          </div>
          <SheetTrigger asChild>
            <Button onClick={handleUserProjects}>Save</Button>
          </SheetTrigger>
        </SheetContent>
      </Sheet>
    </div>
  );
}
