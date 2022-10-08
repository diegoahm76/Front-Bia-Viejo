import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import RegistroDeMantenimientoDeVehiculo from "../gestionDeVehiculos/RegistroDeMantenimientoDeVehiculo";
import ConsultarSolicitudesDeVehiculosScreen from "../gestionDeVehiculos/ConsultarSolicitudesDeVehiculosScreen";
import InspeccionDiariaDeVehiculoScreen from "../gestionDeVehiculos/InspeccionDiariaDeVehiculoScreen";
import SolicitudesEnColaDeEsperaScreen from "../gestionDeVehiculos/SolicitudesEnColaDeEsperaScreen";
import ReportesScreen from "../ReportesScreen";

const AlmacenRoutes = () => {
  return (
    <Routes>
      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="reportes" element={<ReportesScreen />} />

      <Route
        path="inspecciondiariadevehiculo"
        element={<InspeccionDiariaDeVehiculoScreen />}
      />

      <Route path="registrodemantenimientodevehiculo" element={<RegistroDeMantenimientoDeVehiculo />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
      <Route
        path="consultarsolicitudesdevehiculos"
        element={<ConsultarSolicitudesDeVehiculosScreen />}
      />

      <Route
        path="solicitudesencoladeespera"
        element={<SolicitudesEnColaDeEsperaScreen />}
      />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AlmacenRoutes;
