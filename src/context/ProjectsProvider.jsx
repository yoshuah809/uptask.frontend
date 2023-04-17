import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const displayAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };
  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await addProject(project);
    }
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
      setProjects([...projects, data]);
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
    }, 2000);
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/projects/${project.id}`,
        project,
        config
      );
      // Syncing the state
      const updatedProjects = projects.map((currentProject) =>
        currentProject._id === data._id ? data : currentProject
      );
      setProjects(updatedProjects);
      //displaying alert
      setAlert({
        message: "Project updated Successfully",
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setAlert({});
      navigate("/projects"); //redict the user via navigation
    }, 2000);
  };
  const getProject = async (id) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.get(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient("/projects", config);

        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      getProjects();
    };
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        displayAlert,
        alert,
        addProject,
        getProject,
        project,
        loading,
        submitProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export { ProjectsProvider };
export default ProjectsContext;
