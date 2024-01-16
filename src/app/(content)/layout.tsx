import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "../context/provider";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import { boolean } from "zod";
import NavBar from "../components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkList",
  description: "One Click Link To Every Social",
};

type RootLayoutProps = {
  children: React.ReactNode;
  session: Session;
};

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <NavBar />
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
