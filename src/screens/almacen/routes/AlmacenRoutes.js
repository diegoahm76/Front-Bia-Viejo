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
import Ejercicio5 from "../gestionInventario/Ejercicio5";
import Ejercicio6 from "../gestionInventario/Ejercicio6";
import FormularioRevisionInventarioScreen from "../gestionInventario/FormularioRevisionInventarioScreen";

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
      
      <Route
        path="inspecciondiariadevehiculo"
        element={<InspeccionDiariaDeVehiculoScreen />}
      />


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
        <Route path="formulariorevisioninventario" element={<FormularioRevisionInventarioScreen />} />
        <Route path="ejercicio5" element={<Ejercicio5 />} />
        <Route path="ejercicio6" element={<Ejercicio6 />} />
      </Route>

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
