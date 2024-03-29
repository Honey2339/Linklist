"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user.name) {
    router.push("/profile");
  }
  const handleHomeToSignInRedirect = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push("/register");
  };
  const h1Animation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const h2Animation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
  };
  const waveDelay = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } },
  };
  return (
    <section className="h-[92.2vh] max-2xl:pt-14 text-center pt-28 p-6 max-w-4xl mx-auto">
      <div className="max-w-full mb-8">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={h1Animation}
          className="font-bold max-lg:text-5xl max-sm:text-3xl text-zinc-900/95 text-6xl"
        >
          Your one link for everything
        </motion.h1>
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={h2Animation}
          className="text-zinc-800 max-lg:text-lg max-sm:text-sm text-center text-xl mt-6"
        >
          Share your links, Social profiles , contact info and more on one page
        </motion.h2>
      </div>
      <div className="flex items-center justify-center">
        <motion.form
          initial="hidden"
          animate="visible"
          variants={h2Animation}
          className="inline-flex items-center shadow-lg shadow-gray-700/20"
        >
          <span className="bg-white py-4 pl-4">linklist.to/</span>
          <input
            type="text"
            className="py-4 max-sm:py-4 max-sm:max-w-[100px] focus:outline-none focus:border-none"
            placeholder="username"
          />
          <button
            type="submit"
            className="bg-black text-white max-sm:px-3 py-4 px-6"
            onClick={handleHomeToSignInRedirect}
          >
            Join For Free
          </button>
        </motion.form>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={h2Animation}
        className="flex flex-col items-center justify-center"
      >
        <Image
          src="/betterpic.png"
          height={1200}
          width={1000}
          alt="logo"
          className="max-2xl:w-[600px] max-sm:mt-10 max-xl:w-[900px]"
        />
      </motion.div>
      <div className="flex mt-2 items-center justify-center"></div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={waveDelay}
        className="ocean max-sm:hidden"
      >
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </motion.div>
    </section>
  );
}
