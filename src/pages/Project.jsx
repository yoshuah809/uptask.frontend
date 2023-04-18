import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import TaskFormModal from "../components/TaskFormModal";
import Task from "../components/Task";

const Project = () => {
  const { getProject, project, loading, handleTaskModal } = useProjects();

  const { id } = useParams();

  const { name } = project;
  useEffect(() => {
    return () => {
      getProject(id);
      //console.log(project);
    };
  }, []);

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>
        <div className="text-sky-600 flex items-center gap-2 hover:text-sky-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <Link className="font-bold uppercase" to={`/projects/edit/${id}`}>
            Edit
          </Link>
        </div>
      </div>
      <button
        onClick={handleTaskModal}
        type="button"
        className="mt-5 text-sm px-5 py-3 w-full md:w-auto rounded uppercase font-bold bg-sky-500 hover:bg-sky-600 cursor-pointer text-white text-center flex gap-2 justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        new task
      </button>
      <p className="font-bold textxl mt-10">Project Tast</p>
      <div className="bg-white shadow mt-10 rounded">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10 text-sky-400">
            There is no Task for this project
          </p>
        )}
      </div>
      <TaskFormModal />
    </>
  );
};

export default Project;
