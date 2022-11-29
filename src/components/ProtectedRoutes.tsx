import React from "react";
import { Navigate, Outlet } from "react-router-dom/dist";

const ProtectedRoutes = ({ redirectTo, negate }) => {

  // const userInfo = useAppSelector((state) => state.login.initialState.user_info);

  // let validation = userInfo.tokens.access !== "";

  // if (negate) {
  //   validation = !validation;
  // }

  // if (validation) {
  //   return <Outlet />;
  // }
  return <Navigate to={redirectTo} />;
};

ProtectedRoutes.defaultProps = {
  negate: false,
};

export default ProtectedRoutes;
