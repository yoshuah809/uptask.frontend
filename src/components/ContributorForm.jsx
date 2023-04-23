import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const ContributorForm = () => {
  const [email, setEmail] = useState("");
  const { displayAlert, alert, submitContributor } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      displayAlert({
        message: "Please enter your email",
        error: true,
      });
      return;
    }
    submitContributor(email);
  };

  const { message } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded shadow"
      onSubmit={handleSubmit}
    >
      {message && <Alert alert={alert} />}
      <div className="my-5">
        <label
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="email"
        >
          Contributor's Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full my-3 p-3 border border-sky-600 rounded-lg  text-gray-600 bg-gray-200 outline-sky-600"
          id="email"
          placeholder="Enter Contributor's email"
        />
      </div>
      <input
        type="submit"
        id="submit"
        className="bg-sky-600 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-800 text-center uppercase transition-colors"
        value="Search"
      />
    </form>
  );
};

export default ContributorForm;
