import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import SkeletonCard from "./skeleton";

interface Project {
  title: string;
  description: string;
  link: string;
}
interface PerUserProjectProps {
  userId: string | string[];
}

const truncatedDescription = (description: any, maxLength: any) => {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  }
  return description;
};

const ProjectCard: React.FC<Project> = ({ title, description, link }) => {
  const truncateDescription = truncatedDescription(description, 100);
  return (
    <div className="max-w-md bg-white border-2 border-gray-300 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{truncateDescription}</p>
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

const PerUserProject: React.FC<PerUserProjectProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [userProjects, setUserProjects] = useState<{ data: Project[] }>();
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
        setLoading(false);
      };
      fetchData();
    }
  }, [userId]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-screen-xl mt-10">
      {loading ? (
        <div className="flex gap-32">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        userProjects &&
        userProjects.data.map((data) => (
          <ProjectCard
            key={data.title}
            title={data.title}
            description={data.description}
            link={`${data.link}`}
          />
        ))
      )}
    </div>
  );
};
export default PerUserProject;
