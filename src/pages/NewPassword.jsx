import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const NewPassword = () => {
  const { token } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [modifiedPassword, setModifiedPassword] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          message: error.response.data.msg,
          error: true,
        });
        setConfirmedAccount(true);
      }
    };
    return () => {
      verifyToken();
    };
  }, []);

  const { message } = alert;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        message: "Min Password length is 6 characters",
        error: true,
      });
      return;
    }
    try {
      const url = `/users/forgot-password/${token}`;
      const { data } = await axiosClient.post(url, { password });
      //console.log(data);
      setModifiedPassword(true);
      setAlert({ message: data.msg, error: false });
    } catch (error) {
      setAlert({ message: error.response.data.msg, error: true });
    }
  };
  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Recover your password work your{" "}
        <span className="text-gray-600">projects</span>
      </h1>

      {message && <Alert alert={alert} />}

      {validToken && (
        <form
          className="my-10 bg-white rounded shadow px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              New password
            </label>
            <input
              type="password"
              value={password}
              className="w-full mt-2 p-3 border border-sky-600 rounded-lg  text-gray-600 bg-gray-200"
              id="password"
              placeholder="Enter your new Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5 w-full">
            <button
              type="submit"
              className="bg-sky-700 px-2 py-3 rounded-lg w-full text-white uppercase font-bold hover:bg-sky-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      )}

      {modifiedPassword && (
        <Link
          className="block uppercase text-center my-5 text-indigo-600"
          to="/"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default NewPassword;
