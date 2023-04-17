import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-sky-600 text-4xl text-center font-bold uppercase">
          Uptask
        </h2>
        <input
          type="text"
          id="search"
          placeholder="Search Project"
          className="rounded lg:w-96 block p-2 border border-gray-300 outline-sky-600"
        />
        <div>
          <Link className="text-sky-800 uppercase font-bold" to="/projects">
            Projects
          </Link>
          <button
            className="px-3 rounded border bg-sky-600 text-white p-2 uppercase font-bold ml-3 hover:bg-sky-700"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
