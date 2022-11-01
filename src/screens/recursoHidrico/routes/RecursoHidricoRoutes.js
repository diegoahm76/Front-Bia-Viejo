import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import RecursoHidricoScreen from "..";
import AdministradorDeEstaciones from "../estaciones/AdministradorDeEstaciones";
import AlarmasConfiguracionesScreen from "../estaciones/AlarmasConfiguracionesScreen";
import AlarmasScreen from "../estaciones/AlarmasScreen";
import AlertasScreen from "../estaciones/AlertasScreen";
import ConfiguracionesScreen from "../estaciones/ConfiguracionesScreen";
import NotificacionesEstacionesScreen from "../estaciones/NotificacionesEstacionesScreen";
import ReportesScreen from "../estaciones/ReportesScreen";
import UsuariosEstacionesScreen from "../estaciones/UsuariosEstacionesScreen";

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

        <Route
          path="usuarios-estaciones"
          element={<UsuariosEstacionesScreen />}
        />

        <Route path="alertas" element={<AlertasScreen />} />

        <Route path="configuraciones" element={<ConfiguracionesScreen />} />

        <Route path="alarmas-estaciones" element={<AlarmasScreen />} />

        <Route
          path="alarmas-configuraciones"
          element={<AlarmasConfiguracionesScreen />}
        />

        <Route
          path="notificaciones-estaciones"
          element={<NotificacionesEstacionesScreen />}
        />
      </Route>
    </Routes>
  );
};

export default RecursoHidricoRoutes;
