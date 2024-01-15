"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NoNavbarLayout from "./layout";
import Image from "next/image";
import { SiYoutube, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import Link from "next/link";
import PerUserProject from "./projects";
import { SyncLoader } from "react-spinners";
import SkeletonCard from "./skeleton";
import { Button } from "@/components/ui/button";

export default function PerUserPage() {
  const { userId } = useParams();
  console.log(userId);
  const [gotUserData, setGotUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      };
      fetchData();
    }
  }, [userId]);
  return (
    <NoNavbarLayout>
      <main className="h-[100vh] flex items-center justify-center">
        <section className="h-[97vh] w-[1800px] rounded-xl border-2 border-gray-200 shadow-xl">
          {gotUserData?.Message?.displayName ? (
            <div>
              <div className="absolute top-60 left-1/2 transform -translate-x-1/2">
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
                <div className="text-center mt-32">
                  <h1 className="text-2xl font-semibold">
                    {gotUserData?.Message?.displayName}
                  </h1>
                  <h1 className="text-gray-600 text-sm">
                    {gotUserData.Message.bio}
                  </h1>
                  <h1 className="text-gray-600 text-sm">
                    {gotUserData.Message.location}
                  </h1>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  {gotUserData?.Message?.linkedIn ? (
                    <Link href={`${gotUserData?.Message?.linkedIn}`}>
                      <SiLinkedin fill={"#0051ff"} />
                    </Link>
                  ) : null}
                  {gotUserData?.Message?.instagram ? (
                    <Link href={`${gotUserData?.Message?.instagram}`}>
                      <SiInstagram fill={"#fccc63"} />
                    </Link>
                  ) : null}
                  {gotUserData?.Message?.youtube ? (
                    <Link href={`${gotUserData?.Message?.youtube}`}>
                      <SiYoutube fill={"#FF0000"} />
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
                <PerUserProject userId={userId} />
              </div>
              <div className="mt-32 flex justify-center items-center">
                <a href="http://linklist-honey.vercel.app">
                  <Button variant="link" className="text-sm">
                    Create Your Own List
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <div className="h-[80vh] flex flex-col justify-center items-center text-2xl mt-20 text-center">
              <SyncLoader color="#000000" loading={loading} />
            </div>
          )}
        </section>
      </main>
    </NoNavbarLayout>
  );
}
