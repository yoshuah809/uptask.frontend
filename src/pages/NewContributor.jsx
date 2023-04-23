import { useEffect } from "react";
import ContributorForm from "../components/ContributorForm";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import AddIcon from "../helpers/AddIcon";
import Alert from "../components/Alert";

const NewContributor = () => {
  const { getProject, project, loading, contributor, addContributor, alert } =
    useProjects();
  const params = useParams();
  const { username, email, _id: userId } = contributor;

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (!project._id) return <Alert alert={alert} />;
  return (
    <div>
      <h2 className="text-4xl font-black">
        Add Contributor to <span className=" text-md">{project.name} </span>
      </h2>
      <div className="mt-10 flex justify-center">
        <ContributorForm />
      </div>
      {loading ? (
        <p className="text-center">Loading ...</p>
      ) : (
        userId && (
          <div className="mt-10 flex justify-center">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">Result</h2>
              <div className="flex justify-between items-center">
                <p>{username}</p>
                <p>{email}</p>
                <button
                  onClick={() => addContributor({ email })}
                  type="button"
                  className="bg-sky-600 p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-800 text-center uppercase transition-colors"
                >
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default NewContributor;
