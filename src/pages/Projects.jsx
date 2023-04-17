import PreviewProject from "../components/PreviewProject";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects();

  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>
      <div className="bg-white shadow mt-10 rounded">
        {projects.length > 0 ? (
          projects.map((project) => (
            <PreviewProject project={project} key={project._id} />
          ))
        ) : (
          <p className="text-gray-600 uppercase text-center p-5">
            There is not projects
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
