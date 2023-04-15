import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";
import axiosClient from "../config/axiosClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        message: "Please enter a valid email address",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(`/users/forgot-password`, {
        email,
      });
      setAlert({ message: data.msg, error: false });
    } catch (error) {
      setAlert({ message: error.response.data.msg, error: true });
    }
  };
  const { message } = alert;

  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Recover your password work your{" "}
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
            className="w-full mt-2 p-3 border border-sky-600 rounded-lg  text-gray-600 bg-gray-200"
            id="email"
            valued={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>

        <div className="my-5 w-full">
          <button
            type="submit"
            className="bg-sky-700 px-2 py-3 rounded-lg w-full text-white uppercase font-bold hover:bg-sky-600"
          >
            Send reset Link in
          </button>
        </div>
      </form>
      <nav className="md:flex lg:justify-between">
        <Link className="text-center my-5 text-slate-500" to="/">
          {" "}
          Have An account? Sign In
        </Link>
        <Link className="text-center my-5 text-slate-500" to="/register">
          {" "}
          Don't Have An account? Register
        </Link>
      </nav>
    </div>
  );
};

export default ForgotPassword;
