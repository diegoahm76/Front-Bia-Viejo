import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import RecursoHidricoScreen from "..";
import AdministradorDeEstaciones from "../estaciones/AdministradorDeEstaciones";
import AlertasScreen from "../estaciones/AlertasScreen";
import ConfiguracionesScreen from "../estaciones/ConfiguracionesScreen";
import ReportesScreen from "../estaciones/ReportesScreen";

const RecursoHidricoRoutes = () => {
  return (
    <Routes>
      <Route index element={<RecursoHidricoScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="estaciones">
        <Route path="reportes" element={<ReportesScreen />} />

        <Route
          path="administrador-de-estaciones"
          element={<AdministradorDeEstaciones />}
        />

        <Route path="alertas" element={<AlertasScreen />} />

        <Route path="configuraciones" element={<ConfiguracionesScreen />} />
      </Route>
    </Routes>
  );
};

export default RecursoHidricoRoutes;
