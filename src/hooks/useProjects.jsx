import { useContext, useEffect } from "react";
import ProjectsContext from "../context/ProjectsProvider";

const useProjects = () => {
  return useContext(ProjectsContext);
};

export default useProjects;
