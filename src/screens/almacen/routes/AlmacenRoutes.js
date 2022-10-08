import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import ReportesScreen from "../ReportesScreen";
import AutorizarSolicitudActivoPrestamoScreen from "./solicitudesArticulos/AutorizarSolicitudActivoPrestamoScreen";
import AutorizarSolicitudAsignacionArticuloActivoScreen from "./solicitudesArticulos/AutorizarSolicitudAsignacionArticuloActivoScreen";
import AutorizarSolicitudesConsumoScreen from "./solicitudesArticulos/AutorizarSolicitudesConsumoScreen";
import SolicitarArticulosConsumoScreen from "./solicitudesArticulos/SolicitarArticulosConsumoScreen";
import SolicitarElementoConsumoViveroScreen from "./solicitudesArticulos/SolicitarElementoConsumoViveroScreen";
import SolicitudActivoPrestamoScreen from "./solicitudesArticulos/SolicitudActivoPrestamoScreen";
import SolicitudAsignacionArticuloActivoScreen from "./solicitudesArticulos/SolicitudAsignacionArticuloActivoScreen";
import SolicitudesAsignacionPendientesScreen from "./solicitudesArticulos/SolicitudesAsignacionPendientesScreen";
import SolicitudesAutorizadasPendientesScreen from "./solicitudesArticulos/SolicitudesAutorizadasPendientesScreen";
import SolicitudesPendientesAutorizarScreen from "./solicitudesArticulos/SolicitudesPendientesAutorizarScreen";
import SolicitudVehiculoScreen from "./solicitudesArticulos/SolicitudVehiculoScreen";

const AlmacenRoutes = () => {
  return (
    <Routes>

      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="reportes" element={<ReportesScreen />} />

      <Route path="solicitudesarticulos">
        <Route path="autorizarsolicitudactivoprestamo" element={<AutorizarSolicitudActivoPrestamoScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitudespendientesautorizar" element={<SolicitudesPendientesAutorizarScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitararticulosconsumo" element={<SolicitarArticulosConsumoScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="autorizarsolicitudesconsumo" element={<AutorizarSolicitudesConsumoScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitudesasignacionpendientes" element={<SolicitudesAsignacionPendientesScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitudasignacionarticuloactivo" element={<SolicitudAsignacionArticuloActivoScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="autorizarsolicitudasignacionarticuloactivo" element={<AutorizarSolicitudAsignacionArticuloActivoScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitudactivoprestamo" element={<SolicitudActivoPrestamoScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitudvehiculo" element={<SolicitudVehiculoScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitarelementoconsumovivero" element={<SolicitarElementoConsumoViveroScreen/>}/>
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitudesautorizadaspendientes" element={<SolicitudesAutorizadasPendientesScreen/>}/>
      </Route>

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default AlmacenRoutes;
