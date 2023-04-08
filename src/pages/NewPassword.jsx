import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";

const NewPassword = () => {
  const { token } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/users/forgot-password/${token}`
        );
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
  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Recover your password work your{" "}
        <span className="text-gray-600">projects</span>
      </h1>
      {message && <Alert alert={alert} />}
      {validToken && (
        <form className="my-10 bg-white rounded shadow px-10 py-5">
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              New password
            </label>
            <input
              type="password"
              className="w-full mt-2 p-3 border border-sky-600 rounded-lg  text-gray-600 bg-gray-200"
              id="email"
              placeholder="Enter your new Password"
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
    </div>
  );
};

export default NewPassword;
