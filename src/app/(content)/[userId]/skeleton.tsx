import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonCard() {
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 mt-10 gap-10 opacity-50 mr-20">
      <div className="flex items-center space-x-4 mt-10">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-6">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-10 w-[80px] mt-10" />
        </div>
      </div>
    </div>
  );
}
