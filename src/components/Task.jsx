import DeleteIcon from "../helpers/DeleteIcon";
import EditIcon from "../helpers/EditIcon";
import formatDate from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { handleModalEditTask, handleModalDeleteTask } = useProjects();

  const { name, description, priority, deliveryDate, _id, isComplete } = task;
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
          className="bg-indigo-600 px-4 py-3 text-white uppercase rounded font-bold hover:bg-indigo-700"
          onClick={() => handleModalEditTask(task)}
        >
          {/* Edit Task */}
          <EditIcon />
        </button>
        {isComplete ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase rounded font-bold">
            Complete
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase rounded font-bold hover:bg-gray-700">
            Incomplete
          </button>
        )}
        <button
          className="bg-red-600 px-4 py-3 text-white uppercase rounded font-bold hover:bg-red-700"
          onClick={() => handleModalDeleteTask(task)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default Task;
