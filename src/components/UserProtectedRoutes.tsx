import React from 'react';
import { Navigate, Outlet } from 'react-router-dom/dist';
import { useAppSelector } from '../store/hooks/hooks';

const UserProtectedRoutes = () => {
  const userInfo = useAppSelector((state) => state.login.userinfo);

  if (!userInfo.is_superuser) {
    return <Outlet />;
  }
  return <Navigate to={'/dashboard'} />;
};

export default UserProtectedRoutes;
