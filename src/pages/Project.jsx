import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import TaskFormModal from "../components/TaskFormModal";
import Task from "../components/Task";
import AddIcon from "../helpers/AddIcon";
import EditIcon from "../helpers/EditIcon";
import TaskDeleteModal from "../components/TaskDeleteModal";
import Alert from "../components/Alert";
import Contributor from "../components/Contributor";
import ContributorDeleteModal from "../components/ContributorDeleteModal";

const Project = () => {
  const { getProject, project, loading, handleTaskModal, alert } =
    useProjects();

  const { id } = useParams();

  const { name } = project;
  useEffect(() => {
    return () => {
      getProject(id);
      //console.log(project);
    };
  }, []);

  const { message } = alert;

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>
        <div className="text-sky-600 flex items-center gap-2 hover:text-sky-700">
          <EditIcon />
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
        <AddIcon />
        new task
      </button>
      <p className="font-bold textxl mt-10">Project Tast</p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {message && <Alert alert={alert} />}
        </div>
      </div>
      <div className="bg-white shadow mt-10 rounded">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10 text-sky-400">
            There is no Task for this project
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-3xl text-sky-600">Contributors:</p>
        <Link
          to={`/projects/new-contributor/${project._id}`}
          className="flex items-center justify-between text-sky-600 uppercase font-bold hover:text-sky-700"
        >
          <AddIcon />
          Add
        </Link>
      </div>

      <div className="bg-white shadow mt-10 rounded">
        {project.members?.length ? (
          project.members?.map((contributor) => (
            <Contributor key={contributor._id} contributor={contributor} />
          ))
        ) : (
          <p className="text-center my-5 p-10 text-sky-400">
            There are no Colaborators for this project
          </p>
        )}
      </div>

      <TaskFormModal />
      <TaskDeleteModal />
      <ContributorDeleteModal />
    </>
  );
};

export default Project;
