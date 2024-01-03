import { UserProjectsType } from "@/app/utils";
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
import { useState } from "react";

const space = Space_Grotesk({ subsets: ["latin"], weight: "500" });

export default function AddProjectsSheet() {
  const { data: session } = useSession();
  const [userProjects, setUserProjects] = useState<UserProjectsType>();
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
            <Input placeholder="Add Title of your project" />
          </div>
          <div className="space-y-1">
            <SheetTitle className="text-lg">Description :</SheetTitle>
            <Textarea
              className="resize-none"
              placeholder="Add Description of your project"
            />
          </div>
          <div className="space-y-1">
            <SheetTitle className="text-sm">Live Link</SheetTitle>
            <Input className="resize-none" placeholder="http://..." />
          </div>
          <SheetTrigger asChild>
            <Button>Save</Button>
          </SheetTrigger>
        </SheetContent>
      </Sheet>
    </div>
  );
}
