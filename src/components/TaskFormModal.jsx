import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";
import { useParams } from "react-router-dom";

const PRIORITY = ["Low", "Medium", "High"];

const defaultFormFields = {
  name: "",
  taskId: "",
  description: "",
  priority: "",
  deliveryDate: "",
};

const ModalFormularioTarea = () => {
  const {
    handleTaskModal,
    taskFormModal,
    displayAlert,
    alert,
    submitTask,
    task,
  } = useProjects();

  //   const [name, setName] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [priority, setPriority] = useState("");
  //   const [deliveryDate, setDeliveryDate] = useState("");

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, description, priority, deliveryDate, taskId } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const { id } = useParams();

  useEffect(() => {
    if (task._id) {
      setFormFields({
        name: task.name,
        taskId: task._id,
        description: task.description,
        priority: task.priority,
        deliveryDate: task.deliveryDate?.split("T")[0],
      });
      return;
    }
    setFormFields(defaultFormFields);
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formFields);

    if ([name, description, priority, deliveryDate].includes("")) {
      //console.log("all fields are required");
      displayAlert({
        message: "All Fields are required",
        error: true,
      });
      return;
    }
    await submitTask({
      name,
      description,
      priority,
      deliveryDate,
      project: id,
      taskId,
    });
    //reset fields after submition
    setFormFields(defaultFormFields);
  };

  const { message } = alert;

  return (
    <Transition.Root show={taskFormModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleTaskModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleTaskModal}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="mt-3 text-lg leading-6 font-bold text-sky-600 text-center uppercase"
                  >
                    {taskId ? "Edit Task" : "Create Task"}
                  </Dialog.Title>
                  {message && <Alert alert={alert} />}
                  <form className="my-10" onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Task name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="border-2 w-full p-2 mt-2 rounded outline-sky-600"
                        placeholder="Type your task name"
                        required
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="description"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        resize="no"
                        required
                        className="border-2 w-full p-2 mt-2 rounded outline-sky-600"
                        placeholder="Task Description"
                        value={description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="deliveryDate"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        required
                        resize="no"
                        className="border-2 w-full p-2 mt-2 rounded outline-sky-600"
                        value={deliveryDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="priority"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        className="border-2 w-full p-2 mt-2 rounded outline-sky-600"
                        value={priority}
                        required
                        onChange={handleChange}
                      >
                        <option value="">--Select Priority--</option>
                        {PRIORITY.map((opt, index) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      id="submit"
                      className="bg-sky-600 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-800 text-center uppercase transition-colors"
                      value={taskId ? "Save Changes" : "Create task"}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioTarea;
