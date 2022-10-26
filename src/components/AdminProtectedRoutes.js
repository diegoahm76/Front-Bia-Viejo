import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom/dist";

const AdminProtectedRoutes = () => {
  const userInfo = useSelector((state) => state.user.user);

  if (userInfo.is_superuser) {
    return <Outlet />;
  }
  return <Navigate to={"/dashboard"} />;
};

export default AdminProtectedRoutes;
