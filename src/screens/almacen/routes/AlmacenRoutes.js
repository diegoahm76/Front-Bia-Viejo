import { Route, Router, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import RegistroDeMantenimientoDeVehiculo from "../gestionDeVehiculos/RegistroDeMantenimientoDeVehiculo";
import ConsultarSolicitudesDeVehiculosScreen from "../gestionDeVehiculos/ConsultarSolicitudesDeVehiculosScreen";
import InspeccionDiariaDeVehiculoScreen from "../gestionDeVehiculos/InspeccionDiariaDeVehiculoScreen";
import SolicitudesEnColaDeEsperaScreen from "../gestionDeVehiculos/SolicitudesEnColaDeEsperaScreen";
import ReportesScreen from "../ReportesScreen";
import AutorizarSolicitudActivoPrestamoScreen from "../solicitudesArticulos/AutorizarSolicitudActivoPrestamoScreen";
import AutorizarSolicitudAsignacionArticuloActivoScreen from "../solicitudesArticulos/AutorizarSolicitudAsignacionArticuloActivoScreen";
import AutorizarSolicitudesConsumoScreen from "../solicitudesArticulos/AutorizarSolicitudesConsumoScreen";
import SolicitarArticulosConsumoScreen from "../solicitudesArticulos/SolicitarArticulosConsumoScreen";
import SolicitarElementoConsumoViveroScreen from "../solicitudesArticulos/SolicitarElementoConsumoViveroScreen";
import SolicitudActivoPrestamoScreen from "../solicitudesArticulos/SolicitudActivoPrestamoScreen";
import SolicitudAsignacionArticuloActivoScreen from "../solicitudesArticulos/SolicitudAsignacionArticuloActivoScreen";
import SolicitudesAsignacionPendientesScreen from "../solicitudesArticulos/SolicitudesAsignacionPendientesScreen";
import SolicitudesAutorizadasPendientesScreen from "../solicitudesArticulos/SolicitudesAutorizadasPendientesScreen";
import SolicitudesPendientesAutorizarScreen from "../solicitudesArticulos/SolicitudesPendientesAutorizarScreen";
import SolicitudVehiculoScreen from "../solicitudesArticulos/SolicitudVehiculoScreen";
import AlertasMantenimientoActivoScreen from "../configuracion/AlertasMantenimientoActivoScreen";
import AlertasMantenimientoVehiculosScreen from "../configuracion/AlertasMantenimientoVehiculosScreen";
import AlertasLlegadaVehiculosScreen from "../configuracion/AlertasLlegadaVehiculosScreen";
import AlertasVencimientoDocumentacionVehiculosScreen from"../configuracion/AlertasVencimientoDocumentacionVehiculoScreen";
import AlertasDevolucionPrestamoScreen from"../configuracion/AlertasDevolucionPrestamoScreen";
import BusquedaPersonalScreen from "../configuracion/BusquedaPersonalScreen";
import CreacionBodegaScreen from"../configuracion/CreacionBodegaScreen";
import RegistroConductoresExternosScreen from"../configuracion/RegistroConductoresExternosScreen";
import TraspasoElementosBodegasScreen from "../configuracion/TraspasoElementosBodegasScreen"
import ReprogramarSolicitudVehiculoScreen from "../gestionDeVehiculos/ReprogramarSolicitudVehiculoScreen";
import AsignacionVehiculoScreen from "../gestionDeVehiculos/AsignacionVehiculoScreen";
import SolicitudesAutorizadasPorEjecutraScreen from "../gestionDeVehiculos/SolicitudesAutorizadasPorEjecutraScreen";
import MarcarVehiculoComoEntregadoScreen from "../gestionDeVehiculos/MarcarVehiculoComoEntregadoScreen";
import SolicitudesDeVehiculoEnEjecucionScreen from "../gestionDeVehiculos/SolicitudesDeVehiculoEnEjecucionScreen";
import SolicitudesPendientesPorAutorizarScreen from "../gestionDeVehiculos/SolicitudesPendientesPorAutorizarScreen";
import SolicitudesDeVehiculoVencidasScreen from "../gestionDeVehiculos/SolicitudesDeVehiculoVencidasScreen";

const AlmacenRoutes = () => {
  return (
    <Routes>
      <Route index element={<Almacen />} />
     

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="reportes" element={<ReportesScreen />} />
      
      <Route path ="configuracion">
        <Route path="alertasmantenimientoactivo" element={<AlertasMantenimientoActivoScreen/>} />
        <Route path="alertasmantenimientovehiculo" element={<AlertasMantenimientoVehiculosScreen/>} />
        <Route path="alertasllegadavehiculos" element={<AlertasLlegadaVehiculosScreen/>} />
        <Route path="alertasvencimientodocumentacionvehiculos" element={<AlertasVencimientoDocumentacionVehiculosScreen/>} />
        <Route path="alertasdevolucionprestamo" element={<AlertasDevolucionPrestamoScreen/>} />
        <Route path="busquedapersonal" element={<BusquedaPersonalScreen/>} />
        <Route path="creacionbodega" element={<CreacionBodegaScreen/>} />
        <Route path="registroconductoresexternos" element={<RegistroConductoresExternosScreen/>} />
        <Route path="traspasoelementosbodegas" element={<TraspasoElementosBodegasScreen/>} />
      </Route>
      
      <Route path="solicitudes-articulos">
        <Route
          path="autorizar-solicitud-activo-prestamo"
          element={<AutorizarSolicitudActivoPrestamoScreen />}
        />
        <Route
          path="solicitudes-pendientes-autorizar"
          element={<SolicitudesPendientesAutorizarScreen />}
        />
        <Route
          path="solicitar-articulos-consumo"
          element={<SolicitarArticulosConsumoScreen />}
        />
        <Route
          path="autorizar-solicitudes-consumo"
          element={<AutorizarSolicitudesConsumoScreen />}
        />
        <Route
          path="solicitudes-asignacion-pendientes"
          element={<SolicitudesAsignacionPendientesScreen />}
        />
        <Route
          path="solicitud-asignacion-articulo-activo"
          element={<SolicitudAsignacionArticuloActivoScreen />}
        />
        <Route
          path="autorizar-solicitud-asignacion-articulo-activo"
          element={<AutorizarSolicitudAsignacionArticuloActivoScreen />}
        />
        <Route
          path="solicitud-activo-prestamo"
          element={<SolicitudActivoPrestamoScreen />}
        />
        <Route path="solicitud-vehiculo" element={<SolicitudVehiculoScreen />} />
        <Route
          path="solicitar-elemento-consumo-vivero"
          element={<SolicitarElementoConsumoViveroScreen />}
        />
        <Route
          path="solicitudes-autorizadas-pendientes"
          element={<SolicitudesAutorizadasPendientesScreen />}
        />
      </Route>

      <Route path="gestion-de-vehiculos">
        <Route
          path="reprogramar-solicitud-vehiculo"
          element={<ReprogramarSolicitudVehiculoScreen />}
        />
        <Route
          path="asignacion-vehiculo"
          element={<AsignacionVehiculoScreen />}
        />

        <Route
          path="inspeccion-diaria-de-vehiculo"
          element={<InspeccionDiariaDeVehiculoScreen />}
        />

        <Route
          path="registro-de-mantenimiento-de-vehiculo"
          element={<RegistroDeMantenimientoDeVehiculo />}
        />

        <Route
          path="consultar-solicitudes-de-vehiculos"
          element={<ConsultarSolicitudesDeVehiculosScreen />}
        />

        <Route
          path="solicitudes-en-cola-de-espera"
          element={<SolicitudesEnColaDeEsperaScreen />}
        />
        
        <Route
        path="solicitudesautorizadasporejecutar"
        element={<SolicitudesAutorizadasPorEjecutraScreen />}
      />

      <Route
        path="marcarvehiculocomoentregado"
        element={<MarcarVehiculoComoEntregadoScreen />}
      />

      <Route
        path="solicitudesdevehiculoenejecucion"
        element={<SolicitudesDeVehiculoEnEjecucionScreen />}
      />

      <Route
        path="solicitudespendientesporautorizar"
        element={<SolicitudesPendientesPorAutorizarScreen />}
      />

      <Route
        path="solicitudesdevehiculovencidas"
        element={<SolicitudesDeVehiculoVencidasScreen />}
      />
      </Route>

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AlmacenRoutes;
