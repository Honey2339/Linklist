"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiYoutube, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import Projects from "./projects";

// onClick = { () => {
//   const elem = document.querySelector('.elementClass');
//   elem.style.background = 'color'
//   } }

const MyPage: React.FC = () => {
  const { data: session } = useSession();
  const [gotUserData, setGotUserData] = useState<any>([]);
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

  return (
    <main className="h-[91vh] flex items-center justify-center">
      <section className="h-[90vh] w-[1800px] rounded-xl border-2 border-gray-200 shadow-lg">
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
          <div className="mt-24">
            <h1 className="text-2xl font-semibold">
              {gotUserData?.Message?.displayName}
            </h1>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Link href={`${gotUserData?.Message?.linkedIn}`}>
              <SiLinkedin />
            </Link>
            <Link href={`${gotUserData?.Message?.instagram}`}>
              <SiInstagram />
            </Link>
            <Link href={`${gotUserData?.Message?.youtube}`}>
              <SiYoutube />
            </Link>
            <Link href={`${gotUserData?.Message?.github}`}>
              <SiGithub />
            </Link>
          </div>
        </div>
        <div className="">
          <Projects />
        </div>
      </section>
    </main>
  );
};

export default MyPage;
