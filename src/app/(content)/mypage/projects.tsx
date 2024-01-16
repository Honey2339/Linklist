import { UserProjects } from "@/app/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ApiResponse {
  data: UserProjects[];
}

const truncateDescription = (description: any, maxLength: any) => {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  }
  return description;
};

const ProjectCard = ({ title, description, link }: UserProjects) => {
  const truncatedDescription = truncateDescription(description, 100);
  return (
    <div className="max-w-md bg-white border-2 border-gray-300 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{truncatedDescription}</p>
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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-screen-xl mt-10">
      {userProjects &&
        userProjects?.data.map((data) => (
          <ProjectCard
            key={data.title}
            title={data.title}
            description={data.description}
            link={`${data.link}`}
          />
        ))}
    </div>
  );
}
