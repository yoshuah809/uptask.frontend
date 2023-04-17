import { useState, useEffect } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [customer, setCustomer] = useState("");

  //Calling project from context hook
  const { displayAlert, alert, addProject } = useProjects();

  //HandleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, customer, deliveryDate].includes("")) {
      displayAlert({
        message: "All Fields are required",
        error: true,
      });
      return;
    }

    //send data to context
    await addProject({ name, description, customer, deliveryDate });

    setName("");
    setCustomer("");
    setDescription("");
    setDeliveryDate("");
  };

  const { message } = alert;
  return (
    <form
      className="bg-white py-10 px-5 md:w-2/3 rounded shadow"
      onSubmit={handleSubmit}
    >
      {message && <Alert alert={alert} />}

      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Project Name
        </label>
        <input
          type="text"
          id="name"
          className="border-2 w-full p-2 mt-2 rounded outline-sky-600"
          placeholder="Type your project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="text"
          id="description"
          resize="no"
          className="border-2 w-full p-2 mt-2 rounded outline-sky-600"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          resize="no"
          className="border-2 w-full p-2 mt-2 rounded outline-sky-600"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="customer"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Customer
        </label>
        <input
          type="text"
          id="customer"
          className="border-2 w-full p-2 mt-2 rounded outline-sky-600"
          placeholder="Customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>
      <input
        type="submit"
        id="submit"
        className="bg-sky-600 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-800 text-center uppercase transition-colors"
        value="Create Project"
      />
    </form>
  );
};

export default ProjectForm;
