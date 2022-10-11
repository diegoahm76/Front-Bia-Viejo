import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import AsignarActivosCalidadPrestamoScreen from "../gestionInventario/AsignarActivosCalidadPrestamoScreen";
import AsignarActivoScreen from "../gestionInventario/AsignarActivoScreen";
import DespacharElementosConsumoScreen from "../gestionInventario/DespacharElementosConsumoScreen";
import DespachoElementosSinSolicitudScreen from "../gestionInventario/DespachoElementosSinSolicitudScreen";
import DevolverActivoAsignadoScreen from "../gestionInventario/DevolverActivoAsignadoScreen";
import DevolverActivoCalidadPrestamoScreen from "../gestionInventario/DevolverActivoCalidadPrestamoScreen";
import DevolverElementosSubasignadosResponsableScreen from "../gestionInventario/DevolverElementosSubasignadosResponsableScreen";
import ReasignarElementosEntreFuncionariosScreen from "../gestionInventario/ReasignarElementosEntreFuncionariosScreen";
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
        <Route path="reasignarelementosentrefuncionarios" element={<ReasignarElementosEntreFuncionariosScreen />} />
        <Route path="despacharelementosconsumo" element={<DespacharElementosConsumoScreen />} />
        <Route path="asignaractivoscalidadprestamo" element={<AsignarActivosCalidadPrestamoScreen />} />
        <Route path="despachoelementossinsolicitud" element={<DespachoElementosSinSolicitudScreen />} />
        <Route path="devolverelementossubasignadosresponsable" element={<DevolverElementosSubasignadosResponsableScreen />} />
        <Route path="devolveractivoasignado" element={<DevolverActivoAsignadoScreen />} />
        <Route path="devolveractivocalidadprestamo" element={<DevolverActivoCalidadPrestamoScreen />} />
      </Route>

    </Routes>
  );
};

export default AlmacenRoutes;
