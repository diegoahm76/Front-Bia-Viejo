import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import InspeccionDiariaDeVehiculo from "../gestionDeVehiculos/InspeccionDiariaDeVehiculo";
import ReportesScreen from "../ReportesScreen";

const AlmacenRoutes = () => {
  return (
    <Routes>

      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="reportes" element={<ReportesScreen />} />

      <Route path="inspecciondiariadevehiculo" element={<InspeccionDiariaDeVehiculo />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default AlmacenRoutes;
