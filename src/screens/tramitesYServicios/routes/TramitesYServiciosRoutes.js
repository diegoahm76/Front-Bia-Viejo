import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import TramitesYServicios from "../";
import PqrsdAnaliticaScreen from "../AnaliticaDeDatosTYS/PqrsdAnaliticaScreen"

const TramitesYServiciosRoutes = () => {
  return (
    <Routes>

      <Route index element={<TramitesYServicios />} />

      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="AnaliticaDeDatosTYS">
      <Route path="PqrsdAnalitica" element={<PqrsdAnaliticaScreen />} />


      </Route>

    </Routes>
  );
};

export default TramitesYServiciosRoutes;
