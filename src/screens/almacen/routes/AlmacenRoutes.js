import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import ReportesScreen from "../ReportesScreen";
import AutorizarSolicitudActivoPrestamoScreen from "./solicitudesArticulos/AutorizarSolicitudActivoPrestamoScreen";

const AlmacenRoutes = () => {
  return (
    <Routes>

      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="reportes" element={<ReportesScreen />} />

      <Route path="solicitudesarticulos">
        <Route path="autorizarsolicitudactivoprestamo" element={<AutorizarSolicitudActivoPrestamoScreen/>}/>
      </Route>

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default AlmacenRoutes;
