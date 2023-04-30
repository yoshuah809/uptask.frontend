import DeleteIcon from "../helpers/DeleteIcon";
import EditIcon from "../helpers/EditIcon";
import formatDate from "../helpers/formatDate";
import useAdmin from "../hooks/useAdmin";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { handleModalEditTask, handleModalDeleteTask, completeTask } =
    useProjects();

  const { name, description, priority, deliveryDate, _id, isCompleted } = task;
  const admin = useAdmin();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-2 text-xl">{name}</p>
        <p className="mb-2 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-2 text-green-700">
          Delivery Date: {formatDate(deliveryDate)}
        </p>
        <p className="mb-2 text-gray-600">Priority: {priority}</p>
      </div>
      <div className="flex gap-2">
        <button
          hidden={!admin ? true : false} // Another way to hide any ui Element if user is not Admin
          className="bg-indigo-600 px-4 py-3 text-white uppercase rounded font-bold hover:bg-indigo-700"
          onClick={() => handleModalEditTask(task)}
        >
          {/* Edit Task */}
          <EditIcon />
        </button>

        <button
          onClick={() => completeTask(_id)}
          className={`${
            isCompleted
              ? "bg-sky-600 hover:bg-sky-700"
              : "bg-gray-600 hover:bg-gray-700"
          } px-4 py-3 text-white uppercase rounded font-bold `}
        >
          {isCompleted ? "Complete" : "Incompleted"}
        </button>

        {/* TODO wrap in useAdminhook */}
        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase rounded font-bold hover:bg-red-700"
            onClick={() => handleModalDeleteTask(task)}
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
