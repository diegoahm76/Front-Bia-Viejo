import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import RecursoHidricoScreen from "..";
import AdministradorDeEstaciones from "../estaciones/AdministradorDeEstaciones";
import AlarmasConfiguracionesScreen from "../estaciones/AlarmasConfiguracionesScreen";
import AlarmasScreen from "../estaciones/AlarmasScreen";
import AlertasScreen from "../estaciones/AlertasScreen";
import ConfiguracionesScreen from "../estaciones/ConfiguracionesScreen";
import MonitoreoScreen from "../estaciones/MonitoreoScreen";
import ReportesScreen from "../estaciones/ReportesScreen";
import DashboardsScreen from "../estaciones/DashboardsScreen";
import UsuariosEstacionesScreen from "../estaciones/UsuariosEstacionesScreen";
import Geolocalizacion from "../estaciones/Geolocalizacion/geolocalizacion";

const RecursoHidricoRoutes = () => {
  return (
    <Routes>
      <Route index element={<RecursoHidricoScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="estaciones">
        <Route path="reportes" element={<ReportesScreen />} />

        <Route path="geolocalizacion" element={<Geolocalizacion />} />

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

        <Route path="monitoreo" element={<MonitoreoScreen />} />
        <Route path="DashboardEstaciones" element={<DashboardsScreen />} />

        <Route
          path="alarmas-configuraciones"
          element={<AlarmasConfiguracionesScreen />}
        />
      </Route>
    </Routes>
  );
};

export default RecursoHidricoRoutes;
