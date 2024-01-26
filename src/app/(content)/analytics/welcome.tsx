"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function WelcomeComponentAnalytics() {
  const { data: session } = useSession();
  return (
    <h1 className="text-zinc-900 text-xl">
      Hello! <span>{session?.user.name}</span>
    </h1>
  );
}
