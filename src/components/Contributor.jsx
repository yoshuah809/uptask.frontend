import DeleteIcon from "../helpers/DeleteIcon";
import useProjects from "../hooks/useProjects";

const Contributor = ({ contributor }) => {
  const { username, email } = contributor;

  const { handleModalDeleteContributor } = useProjects();

  return (
    <div className="border-b flex justify-between p-5">
      <div className="flex justify-around">
        <h1 className="mt-2 mx-5">{username}</h1>
        <h1 className="mt-2 mx-5 text-gray-500 text-sm">{email}</h1>
      </div>
      <button
        className="font-bold uppercase bg-red-600 p-2 text-white rounded hover:bg-red-700"
        onClick={() => handleModalDeleteContributor(contributor)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Contributor;
