import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Provider from "./context/provider";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import { boolean } from "zod";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkList",
  description: "One Click Link To Every Social",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <main>
            <div id="bg-grid">
              <div id="blur-grid"></div>
            </div>
            {children}
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  );
}
