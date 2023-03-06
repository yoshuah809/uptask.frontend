import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="shadow rounded d-flex flex-column align-items-center justify-content-center">
      <span className="display-1 text-info ls-0 fw-bold text-capitalize mb-2 mt-5">
        Login to view and work your <span className="text-muted">projects</span>
      </span>
      <form className="w-50">
        <div className="form-group">
          <div className="form-floating my-5">
            <input
              type="email"
              className="form-control rounded"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label className="text-uppercase text-info" for="floatingInput">
              Email
            </label>
          </div>
        </div>
        <div className="form-group">
          <div className="form-floating my-5">
            <input
              type="password"
              className="form-control rounded"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label className="text-uppercase text-info" for="floatingInput">
              Password
            </label>
          </div>
          <div>
            <button type="submit " className="btn btn-outline-info mb-5 w-100">
              Sing in
            </button>
          </div>
        </div>
      </form>
      <nav className="d-lg-flex justify-content-between">
        <Link className="d-block text-center my-5 m-5 text-muted" to="register">
          {" "}
          Don't Have An account? Register
        </Link>
        <Link
          className="d-block text-center my-5 text-warning"
          to="forgot-password"
        >
          Forgot Password?
        </Link>
      </nav>
    </div>
  );
};

export default Login;
