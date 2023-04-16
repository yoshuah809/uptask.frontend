import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPassword from "./pages/NewPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./layout/ProtectedRoute";
import Projects from "./pages/Projects";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password/:token" element={<NewPassword />} />
            <Route path="confirm/:id" element={<ConfirmAccount />} />
          </Route>
          <Route path="/projects" element={<ProtectedRoute />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
