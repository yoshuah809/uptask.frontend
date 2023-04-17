import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { useEffect } from "react";
import ProjectForm from "../components/ProjectForm";

const EditProject = () => {
  const { id } = useParams();
  const { getProject, project, loading } = useProjects();

  const { name } = project;

  useEffect(() => {
    return () => {
      getProject(id);
    };
  }, []);

  if (loading) return "Loading...";

  return (
    <>
      <h1 className="font-black text-4xl">
        <span className="text-sky-600"> Edit Project:</span> {name}
      </h1>
      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default EditProject;
