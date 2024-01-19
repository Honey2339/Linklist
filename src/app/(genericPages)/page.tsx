"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
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
    <section className="pt-32 p-6 max-w-4xl mx-auto">
      <div className="max-w-sm mb-8">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={h1Animation}
          className="font-bold text-6xl"
        >
          Your one link <br /> for everything
        </motion.h1>
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={h2Animation}
          className="text-gray-500 text-xl mt-6"
        >
          Share your links, Social profiles , contact info and more on one page
        </motion.h2>
      </div>
      <motion.form
        initial="hidden"
        animate="visible"
        variants={h2Animation}
        className="inline-flex items-center shadow-lg shadow-gray-700/20"
      >
        <span className="bg-white py-4 pl-4">linklist.to/</span>
        <input
          type="text"
          className="py-4 focus:outline-none focus:border-none"
          placeholder="username"
        />
        <button
          type="submit"
          className="bg-black text-white py-4 px-6"
          onClick={handleHomeToSignInRedirect}
        >
          Join For Free
        </button>
      </motion.form>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={waveDelay}
        className="ocean"
      >
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </motion.div>
    </section>
  );
}
