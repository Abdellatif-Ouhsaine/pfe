import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const getUserRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.type || null;
    } catch {
      return null;
    }
  };

  const role = getUserRole();

  console.log(role)

  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
