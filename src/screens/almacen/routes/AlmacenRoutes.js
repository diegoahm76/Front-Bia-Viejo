import { Route, Router, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import RegistroDeMantenimientoDeVehiculo from "../gestionDeVehiculos/RegistroDeMantenimientoDeVehiculo";
import ConsultarSolicitudesDeVehiculosScreen from "../gestionDeVehiculos/ConsultarSolicitudesDeVehiculosScreen";
import InspeccionDiariaDeVehiculoScreen from "../gestionDeVehiculos/InspeccionDiariaDeVehiculoScreen";
import SolicitudesEnColaDeEsperaScreen from "../gestionDeVehiculos/SolicitudesEnColaDeEsperaScreen";
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
import AlertasMantenimientoActivoScreen from "../configuracion/AlertasMantenimientoActivoScreen";
import AlertasMantenimientoVehiculosScreen from "../configuracion/AlertasMantenimientoVehiculosScreen";
import AlertasLlegadaVehiculosScreen from "../configuracion/AlertasLlegadaVehiculosScreen";
import AlertasVencimientoDocumentacionVehiculosScreen from"../configuracion/AlertasVencimientoDocumentacionVehiculoScreen";
import AlertasDevolucionPrestamoScreen from"../configuracion/AlertasDevolucionPrestamoScreen";
import BusquedaPersonalScreen from "../configuracion/BusquedaPersonalScreen";
import CreacionBodegaScreen from"../configuracion/CreacionBodegaScreen";
import RegistroConductoresExternosScreen from"../configuracion/RegistroConductoresExternosScreen";
import TraspasoElementosBodegasScreen from "../configuracion/TraspasoElementosBodegasScreen"





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
