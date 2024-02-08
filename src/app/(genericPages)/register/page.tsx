"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

const space = Space_Grotesk({ subsets: ["latin"], weight: "700" });

const FormSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(2, { message: "Username must be atleast 2 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password Does not Match",
    path: ["confirmPassword"],
  });
export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user.name) {
    router.push("/profile");
  }
  const form = useForm({ resolver: zodResolver(FormSchema) });
  const [errorMsg, setErrorMsg] = useState<string | null | undefined>(null);

  const handleGithubLogin = () => {
    signIn("github", { callbackUrl: "/mypage" });
  };

  async function onSubmit(data: any) {
    console.log(data);
    const flag = 99;
    const res = await signIn("credentials", {
      email: data.email,
      name: data.username,
      password: data.password,
      flag: flag,
      redirect: false,
    }).then((data) => {
      console.log(data);
      setErrorMsg(data?.error);
      setTimeout(() => {
        setErrorMsg(null);
      }, 2000);
      if (data?.status == 200) {
        router.push("/mypage");
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] ">
      <div className="max-w-xl bg-white rounded-lg p-10 shadow-lg shadow-gray-700/20 ">
        <h1
          className={cn(
            space.className,
            "mb-10 font-medium text-3xl text-center underline"
          )}
        >
          Register
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="placeholder@example.com"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username..." {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password..."
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-Type The Password..."
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button
                className="text-base px-10"
                type="button"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
        <div className="h-[0.5px] w-auto bg-gray-800 my-3"></div>
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 bg-[#18181B] text-white py-2 text-sm px-3 rounded-md cursor-pointer">
            <FaGithub size={20} />
            <button onClick={handleGithubLogin}>Sign up with GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
