import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import AsignarActivoScreen from "../gestionInventario/AsignarActivoScreen";
import ReportesScreen from "../ReportesScreen";

const AlmacenRoutes = () => {
  return (
    <Routes>

      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="reportes" element={<ReportesScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="gestionInventario">
      <Route index element={<Navigate to="/dashboard/almacen" />} />
      <Route path="asignaractivo" element={<AsignarActivoScreen />} />
      </Route>

    </Routes>
  );
};

export default AlmacenRoutes;
