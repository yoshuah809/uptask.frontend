import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const displayAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const addProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/projects/", project, config);
      console.log(data);
      setAlert({
        message: "Project created Successfully",
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setAlert({});
      navigate("/projects");
    }, 3000);
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, displayAlert, alert, addProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export { ProjectsProvider };
export default ProjectsContext;
