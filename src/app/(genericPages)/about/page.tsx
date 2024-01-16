import React from "react";

const AboutPage = () => {
  return (
    <div className="h-[50vh] flex flex-col items-center text-left justify-center about-container p-8">
      <h1 className="text-4xl font-bold mb-4">About This Project</h1>
      <p className="text-lg mb-6">
        Welcome to the about page! This project is open source, and you can
        check out the source code on{" "}
        <a
          href="https://github.com/Honey2339/linklist"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub
        </a>
        .
      </p>
      <p className="text-lg mb-6">
        In this project, I have utilized the following technologies:
      </p>
      <ul className="list-disc ml-8">
        <li>Next.js</li>
        <li>Prisma</li>
        <li>PostgreSQL (Supabase)</li>
        <li>Typescript</li>
        <li>Tailwind CSS</li>
      </ul>
      <p className="text-lg mt-6">
        Feel free to explore and contribute to the project. If you have any
        questions or suggestions, dont hesitate to{" "}
        <a href="/contact" rel="noopener noreferrer" className="underline">
          reach out
        </a>
      </p>
    </div>
  );
};

export default AboutPage;
