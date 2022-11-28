
import React from 'react'
import { Navigate, Outlet } from "react-router-dom/dist";
import { useAppSelector } from "../store/store";

const UserProtectedRoutes = () => {
  const userInfo = useAppSelector((state ) => state.login.initialState.user_info);

  if (!userInfo.is_superuser) {
    return <Outlet />;
    
  }
  return <Navigate to={"/dashboard"} />;
};

export default UserProtectedRoutes;
