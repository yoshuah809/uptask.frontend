import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/confirm/${id}`
        );
        setAlert({ message: data.message, error: false });
      } catch (error) {
        setAlert({
          message: error.response.data.msg,
          error: true,
        });
        setConfirmedAccount(true);
      }
    };
    return () => {
      confirmAccount();
    };
  }, []);

  const { message } = alert;
  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Confirm Account, work your{" "}
        <span className="text-gray-600">projects</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        <div>{message && <Alert alert={alert} />}</div>
        {confirmedAccount && (
          <Link
            className="block uppercase text-center my-5 text-indigo-600"
            to="/"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default ConfirmAccount;
