"use client";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const space = Space_Grotesk({ subsets: ["latin"], weight: "600" });
export default function NavBar() {
  const { data: session } = useSession();
  const handleSignOutGithub = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-white border-b shadow-lg p-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6 items-center">
        <div className="flex gap-6">
          <Link
            href={"/"}
            className={cn(
              space.className,
              "font-medium flex items-center gap-2 text-[20px]"
            )}
          >
            <Image src="/LinkTreeLogo.png" width={35} height={10} alt="logo" />
            LinkList
          </Link>

          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href="/about">
              <span className="hover:bg-gray-200 p-2 rounded">About</span>
            </Link>
            <Link href="/contact">
              <span className="hover:bg-gray-200 p-2 rounded">Contact</span>
            </Link>
          </nav>
        </div>
        {session?.user?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image ?? "/LinkTreeLogo.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-black font-medium">{session.user.name}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <a href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </a>
              <a href="/mypage">
                <DropdownMenuItem className="cursor-pointer">
                  My Page
                </DropdownMenuItem>
              </a>
              <DropdownMenuItem>Analytics</DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem> */}
              <div className="flex justify-center">
                <Button onClick={handleSignOutGithub} variant="destructive">
                  Logout
                </Button>
              </div>
              {/* </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <nav className="flex gap-4 text-sm text-slate-500">
            <button className="border-2 border-zinc-500 hover:border-zinc-950 text-zinc-900 py-1 px-3 rounded">
              <Link href={"/login"}>Login</Link>
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-950 text-white py-1 px-3 rounded">
              <Link href={"/register"}>Create Account</Link>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
