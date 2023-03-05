import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 p-5 justify-content-center align-items-center">
        <div className="text-center">
          <Outlet />
        </div>
      </main>
      <div className="fw-bold">AuthLayout</div>
    </>
  );
};

export default AuthLayout;
