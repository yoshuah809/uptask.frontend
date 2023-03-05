import React from "react";

const Login = () => {
  return (
    <>
      <span className="display-1 text-info ls-0 fw-bold text-capitalize">
        Login to view and work your <span className="text-muted">projects</span>
      </span>
      <form className="shadow rounded p-5">
        <div className="form-group">
          <div className="form-floating mt-4">
            <input
              type="email"
              className="form-control rounded"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email</label>
          </div>
        </div>
        <div className="form-group">
          <div className="form-floating mt-4">
            <input
              type="password"
              className="form-control rounded"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Password</label>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
