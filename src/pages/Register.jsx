import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, confirmPassword].includes("")) {
      setAlert({
        message: "All Fields are required",
        error: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        message: "Passwords do not match",
        error: true,
      });
      return;
    }
    if (password.length < 8) {
      setAlert({
        message: "Password is too short minimun length is 8 characters",
        error: true,
      });
      return;
    }
    setAlert({});

    //Create user in the API
    setAlert({ message: "Creating user ......" });
    try {
      //TODO move to an axios client13
      const { data } = await axiosClient.post(`/users`, {
        username: name,
        email,
        password,
      });

      setAlert({ message: data.message, error: false });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true });
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
        onSubmit={handleSubmit}
        className="my-10 bg-white rounded shadow px-10 py-5"
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="name"
            className="w-full mt-2 p-3 border rounded-lg  text-gray-600 bg-gray-200"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full mt-2 p-3 border border-sky-600 rounded-lg  text-gray-600 bg-gray-200"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 p-3 border border-sky-600 rounded-lg text-gray-600 bg-gray-200"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="repeat-password"
          >
            Repeat Password
          </label>
          <input
            type="password"
            className="w-full mt-2 p-3 border border-sky-600 rounded-lg text-gray-600 bg-gray-200"
            id="repeat-password"
            placeholder="Repeat  your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="my-5 w-full">
          <button
            type="submit"
            className="bg-sky-700 px-2 py-3 rounded-lg w-full text-white uppercase font-bold hover:bg-sky-600"
          >
            create account
          </button>
        </div>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block uppercase text-center my-5 text-indigo-600"
          to="/"
        >
          {" "}
          Have An account? Sign In
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

export default Register;
