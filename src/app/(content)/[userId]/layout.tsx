import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import { boolean } from "zod";
import NavBar from "@/app/components/NavBar";
import Provider from "../../context/provider";

export default function NoNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <main>
          <div id="bg-grid">
            <div id="blur-grid"></div>
          </div>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
