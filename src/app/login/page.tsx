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
import { signIn } from "next-auth/react";

const space = Space_Grotesk({ subsets: ["latin"], weight: "700" });
// Define form schema using Zod
const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function LoginPage() {
  const form = useForm({ resolver: zodResolver(FormSchema) });
  const handleGithubLogin = () => {
    signIn("github", { callbackUrl: "/mypage" });
  };
  function onSubmit(data: any) {
    console.log(data);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] ">
      <div className="max-w-xl bg-white rounded-lg p-10 shadow-lg shadow-gray-700/20">
        <div className="flex items-center">
          <h1
            className={cn(
              space.className,
              "mb-10 font-medium text-3xl text-center underline"
            )}
          >
            Login
          </h1>
        </div>
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
            <div className="flex justify-center">
              <Button className="text-base px-10" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
        <div className="h-[0.5px] w-auto bg-gray-800 my-3"></div>
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 bg-[#18181B] text-white py-2 text-sm px-3 rounded-md cursor-pointer">
            <FaGithub size={20} />
            <button onClick={handleGithubLogin}>Login with GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
