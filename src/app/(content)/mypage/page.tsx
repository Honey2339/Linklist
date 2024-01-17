"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiYoutube, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import Projects from "./projects";
import AddProjectsSheet from "./addprojectssheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiClipboard } from "react-icons/hi";
import copy from "clipboard-copy";
import { useToast } from "@/components/ui/use-toast";

// onClick = { () => {
//   const elem = document.querySelector('.elementClass');
//   elem.style.background = 'color'
//   } }

const MyPage: React.FC = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [gotUserData, setGotUserData] = useState<any>([]);
  const [errorMsg, setErrorMsg] = useState<{ Message?: string }>({});
  const userId = session?.user?.id;
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const response = await fetch("/api/routes/getUserData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const userData = await response.json();
        console.log(userData);
        setGotUserData(userData);
      };
      fetchData();
    }
  }, [userId]);

  const handleCopyToClipboard = async () => {
    try {
      if (userId) {
        await copy(`http://linklist-honey.vercel.app/${userId}`);
        toast({ variant: "success", title: "Link copied to clipboard!" });
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <main className="h-[91vh] flex items-center justify-center">
      <section className="h-[90vh] w-[1800px] rounded-xl border-2 border-gray-200 shadow-lg">
        {gotUserData?.Message?.displayName ? (
          <div>
            <div className="absolute top-64 left-1/2 transform -translate-x-1/2">
              <Image
                src={gotUserData?.Message?.avatar ?? "/LinkTreeLogo.png"}
                width={150}
                height={100}
                className="rounded-full border-4 border-white shadow-lg shadow-black"
                alt="avatar"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={gotUserData?.Message?.banner ?? "/defaultBanner.jpg"}
                height={50}
                width={1000}
                className="w-full h-[250px] object-cover rounded-t-lg"
                alt="banner"
              />
              <div className="text-center mt-24">
                <h1 className="text-2xl font-semibold">
                  {gotUserData?.Message?.displayName}
                </h1>
                <h1 className="text-gray-600">{gotUserData.Message.bio}</h1>
              </div>
              <div className="mt-2 flex items-center gap-4">
                {gotUserData?.Message?.linkedIn ? (
                  <Link href={`${gotUserData?.Message?.linkedIn}`}>
                    <SiLinkedin />
                  </Link>
                ) : null}
                {gotUserData?.Message?.instagram ? (
                  <Link href={`${gotUserData?.Message?.instagram}`}>
                    <SiInstagram />
                  </Link>
                ) : null}
                {gotUserData?.Message?.youtube ? (
                  <Link href={`${gotUserData?.Message?.youtube}`}>
                    <SiYoutube />
                  </Link>
                ) : null}
                {gotUserData?.Message?.github ? (
                  <Link href={`${gotUserData?.Message?.github}`}>
                    <SiGithub />
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="">
              <h1 className="text-destructive font-sm text-center">
                {errorMsg.Message}
              </h1>
              <Projects />
            </div>
            <div className="mt-16 text-center">
              <AddProjectsSheet setErrorMsg={setErrorMsg} />
            </div>
            <div className="flex mt-2 justify-center items-center">
              <h1 className="mr-2">Your Link :</h1>
              <div className="relative">
                <Input
                  className="border-2 border-blue-400 pr-10"
                  value={`http://linklist-honey.vercel.app/${userId}`}
                  readOnly
                />
                <button
                  onClick={handleCopyToClipboard}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <HiClipboard className="text-gray-500 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-2xl mt-20 text-center">
            <h1 className="mb-5">Please Fill Your Profile First</h1>
            <a href="/profile">
              <Button>Click Me!</Button>
            </a>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyPage;
