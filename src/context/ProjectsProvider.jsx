import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);
  const [taskFormModal, setTaskFormModal] = useState(false);
  const [task, setTask] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [modalDeleteContributor, setModalDeleteContributor] = useState(false);
  const [contributor, setContributor] = useState({});

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
      setAlert({
        message: data.message,
        error: false,
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteProject = async (id) => {
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

      const { data } = await axiosClient.delete(`/projects/${id}`, config);

      //Updating the state
      const updatedProjects = projects.filter((project) => project._id !== id);

      setProjects(updatedProjects);
      setAlert({
        message: data.message,
        error: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setAlert({});
      navigate("/projects");
    }, 2000);
  };
  const handleTaskModal = () => {
    setTaskFormModal(!taskFormModal);
    setTask({});
  };
  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(`/tasks`, task, config);

      //Add Task to the state
      const updatedProject = { ...project };
      updatedProject.tasks = [...project.tasks, data];
      setProject(updatedProject);
      setAlert({});
      setTaskFormModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const editTask = async (task) => {
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
        `/tasks/${task.taskId}`,
        task,
        config
      );

      //Add Task to the state
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.map((tmpTask) =>
        tmpTask._id === data._id ? data : tmpTask
      );

      setProject(updatedProject);
      setAlert({});
      setTaskFormModal(!taskFormModal);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTask = async (task) => {
    if (task?.taskId) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const handleModalEditTask = (task) => {
    setTask(task);
    setTaskFormModal(!taskFormModal);
  };
  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const deleteTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete(`/tasks/${task._id}`, config);
      setAlert({
        message: data.message,
        error: false,
      });
      //Remove Task From the state
      const updatedProject = { ...project };

      updatedProject.tasks = updatedProject.tasks.filter(
        (tmpTask) => tmpTask._id !== task._id
      );

      setProject(updatedProject);
      setModalDeleteTask(!modalDeleteTask);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
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

  const submitContributor = async (email) => {
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
      const { data } = await axiosClient.post(
        "/projects/contributors",
        { email },
        config
      );
      setContributor(data);
      setAlert({});
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const addContributor = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/projects/contributors/${project._id}`,
        email,
        config
      );
      setAlert({
        message: data.message,
        error: false,
      });
      setContributor({});
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

  const handleModalDeleteContributor = (contributor) => {
    setModalDeleteContributor(!modalDeleteContributor);
    setContributor(contributor);
  };

  const deleteContributor = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/projects/delete-contributor/${project._id}`,
        { id: contributor._id },
        config
      );

      const updatedProject = { ...project };

      //console.log(updatedProjectcontributors);
      updatedProject.members = updatedProject.members.filter(
        (tmpContributor) => tmpContributor._id !== contributor._id
      );
      // console.log(updatedProject.contribuitors);

      setProject(updatedProject);
      setModalDeleteContributor(!modalDeleteContributor);
      setAlert({
        message: data.message,
        error: false,
      });
      setContributor({});
      setModalDeleteContributor(false);
    } catch (error) {
      setAlert({
        message: error.response,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

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
        deleteProject,
        handleTaskModal,
        taskFormModal,
        submitTask,
        handleModalEditTask,
        task,
        modalDeleteTask,
        handleModalDeleteTask,
        deleteTask,
        submitContributor,
        contributor,
        addContributor,
        modalDeleteContributor,
        handleModalDeleteContributor,
        deleteContributor,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export { ProjectsProvider };
export default ProjectsContext;
