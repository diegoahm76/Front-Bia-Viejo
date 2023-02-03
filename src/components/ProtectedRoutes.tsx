import React from 'react';
import { Navigate, Outlet } from 'react-router-dom/dist';
import { useAppSelector } from '../store/hooks/hooks';

const ProtectedRoutes = ({ redirectTo, negate }) => {
  const userInfo = useAppSelector((state) => state.login.userinfo);

  let validation = userInfo.tokens.access !== '';

  if (negate) {
    validation = !validation;
  }

  if (validation) {
    return <Outlet />;
  }
  return <Navigate to={redirectTo} />;
};

ProtectedRoutes.defaultProps = {
  negate: false
};

export default ProtectedRoutes;
