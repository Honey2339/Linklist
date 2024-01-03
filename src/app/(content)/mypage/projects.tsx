import { UserProjects } from "@/app/utils";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ title, description, link }: UserProjects) => {
  return (
    <div className="max-w-md bg-white border-2 border-gray-300 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-500 hover:underline"
      >
        Live Demo
        <FaExternalLinkAlt className="ml-1" />
      </a>
    </div>
  );
};

export default function Projects() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-screen-xl mt-10">
      <ProjectCard
        title="Project 1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        link="https://example.com/project1"
      />
      <ProjectCard
        title="Project 2"
        description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        link="https://example.com/project2"
      />
    </div>
  );
}
