import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, customer, creator } = project;

  return (
    <div className="border-b p-5 flex justify-between">
      <div className="flex items-center gap-2 ">
        <p className="flex-1">
          {name}
          <span className="text-sm text-sky-600 font-bold uppercase ml-5">
            {" "}
            {customer}
          </span>
        </p>
        {auth._id !== creator && (
          <p className="p-2 bg-green-600 text-white rounded-xl text-xs text-bold">
            Collaborator
          </p>
        )}
      </div>
      <Link
        className="bg-gray-500 mx-3 p-2 rounded-lg text-white hover:bg-gray-600 cursor-pointer text-sm uppercase"
        to={`${_id}`}
      >
        View Project
      </Link>
    </div>
  );
};

export default PreviewProject;
