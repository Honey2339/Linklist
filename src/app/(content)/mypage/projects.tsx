import { UserProjects } from "@/app/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaTrash } from "react-icons/fa";

interface ApiResponse {
  data: UserProjects[];
}

const truncateDescription = (description: any, maxLength: any) => {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  }
  return description;
};

const ProjectCard = ({
  title,
  description,
  link,
  deleteProject,
}: UserProjects) => {
  const truncatedDescription = truncateDescription(description, 100);
  return (
    <div className="max-w-md bg-gradient-to-r from-slate-100 to-zinc-300 border-2 border-zinc-400 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-800 mb-4">{truncatedDescription}</p>
      <div className="flex justify-between">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:underline"
        >
          Live Demo
          <FaExternalLinkAlt className="ml-1" />
        </a>
        <button onClick={deleteProject}>
          <FaTrash className="fill-destructive hover:fill-destructive/60" />
        </button>
      </div>
    </div>
  );
};

export default function Projects() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [userProjects, setUserProjects] = useState<ApiResponse | undefined>();
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const response = await fetch("/api/routes/getProjectsById", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const userProject = await response.json();
        setUserProjects(userProject);
      };
      fetchData();
    }
  }, [userId]);

  const deleteProjectByTitle = async (title: string | null | undefined) => {
    await fetch("api/routes/deleteProjectByTitle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title }),
    }).then((data) => console.log(data));
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-auto max-w-screen-xl mt-10">
      {userProjects &&
        userProjects?.data.map((data) => (
          <ProjectCard
            key={data.title}
            title={data.title}
            description={data.description}
            link={`${data.link}`}
            deleteProject={() => deleteProjectByTitle(data.title)}
          />
        ))}
    </div>
  );
}
