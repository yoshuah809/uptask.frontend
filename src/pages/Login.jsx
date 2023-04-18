import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  // Accessing Auth Context
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        message: "All Fields are required",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(`/users/login`, {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem("token", data.token);

      setAuth(data);

      await navigate("/projects");
    } catch (error) {
      setAlert({ message: error.response.data.msg, error: true });
    }
  };

  const { message } = alert;
  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Login to view and work your{" "}
        <span className="text-gray-600">projects</span>
      </h1>
      {message && <Alert alert={alert} />}
      <form
        className="my-10 bg-white rounded shadow px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-sky-600 rounded-lg  text-gray-600 bg-gray-200"
            id="email"
            placeholder="Enter Email"
          />
        </div>

        <div className="">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border border-sky-600 rounded-lg text-gray-600 bg-gray-200"
            id="password"
            placeholder="Enter your email"
          />
        </div>
        <div className="my-5 w-full">
          <button
            type="submit"
            className="bg-sky-700 px-2 py-3 rounded-lg w-full text-white uppercase font-bold hover:bg-sky-600"
          >
            Sing in
          </button>
        </div>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block uppercase text-center my-5 text-indigo-600"
          to="/register"
        >
          {" "}
          Don't Have An account? Register
        </Link>
        <Link
          className="block uppercase text-center my-5 text-warning"
          to="/forgot-password"
        >
          Forgot Password?
        </Link>
      </nav>
    </div>
  );
};

export default Login;
