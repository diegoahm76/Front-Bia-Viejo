import React from 'react';
import { Navigate, Outlet } from 'react-router-dom/dist';
import { useAppSelector } from '../store/hooks/hooks';

const ProtectedRoutes = ({ redirectTo, negate }) => {
  const { isLogged } = useAppSelector((state) => state.login);

  // let validation = userinfo.tokens.access !== '';
  let validation = isLogged;

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
