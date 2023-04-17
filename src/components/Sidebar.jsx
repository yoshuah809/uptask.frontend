import { Link } from "react-router-dom";
import react from "react";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl text-sky-600 font-bold">Hi: {auth.username}</p>
      <Link
        className="bg-sky-600 w-full p-3 uppercase block text-white rounded text-center font-bold hover:bg-sky-700 mt-5"
        to="create-project"
      >
        new project
      </Link>
    </aside>
  );
};

export default Sidebar;
