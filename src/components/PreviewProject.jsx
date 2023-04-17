import React from "react";
import { Link } from "react-router-dom";

const PreviewProject = ({ project }) => {
  const { name, _id, customer } = project;
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {name}
        <span className="text-sm text-gray-500 uppercase"> {customer}</span>
      </p>
      <Link
        className="bg-gray-500 mx-3 p-2 rounded text-white hover:bg-gray-600 cursor-pointer text-sm uppercase"
        to={`${_id}`}
      >
        View Project
      </Link>
    </div>
  );
};

export default PreviewProject;
