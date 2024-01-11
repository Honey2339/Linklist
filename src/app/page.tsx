"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleHomeToSignInRedirect = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/register");
  }
  return (
    <main>
      <section className="pt-32 p-6 max-w-4xl mx-auto">
        <div className="max-w-sm mb-8">
          <h1 className="font-bold text-6xl">
            Your one link <br /> for everything
          </h1>
          <h2 className="text-gray-500 text-xl mt-6">
            Share your links, Social profiles , contact info and more on one
            page
          </h2>
        </div>
        <form className="inline-flex items-center shadow-lg shadow-gray-700/20">
          <span className="bg-white py-4 pl-4">linklist.to/</span>
          <input type="text" className="py-4 focus:outline-none focus:border-none" placeholder="username" />
          <button type="submit" className="bg-blue-500 text-white py-4 px-6" onClick={handleHomeToSignInRedirect}>
            Join For Free
          </button>
        </form>
      </section>
    </main>
  );
}
