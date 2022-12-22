import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Almacen from "..";
import CatalogoDeBienesScreen from "../../recaudo/gestorInstanciaCobro/CatalogoDeBienesScreen";
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
import FormularioRevisionInventarioScreen from "../gestionInventario/FormularioRevisionInventarioScreen";
import { EntradaDeArticuloScreen } from "../entradaYSalidaDeArticulos/EntradaDeArticuloScreen";
import CrearArticuloConsumoScreen from "../entradaYSalidaDeArticulos/CrearArticuloConsumoScreen";
import ProcesoApropiacionArticulosScreen from "../entradaYSalidaDeArticulos/ProcesoApropiacionArticulosScreen";
import { VisualizarArticulosScreen } from "../entradaYSalidaDeArticulos/VisualizarArticulosScreen";
import SalidaArticulosScreen from "../entradaYSalidaDeArticulos/SalidaArticulosScreen";
import { RegistroDeBajaScreen } from "../entradaYSalidaDeArticulos/RegistroDeBajaScreen";
import CreacionArticuloScreen from "../entradaYSalidaDeArticulos/CreacionArticuloScreen";
import HojaDeVidaVehiculoScreen from "../gestionDeInventario/gestionDeHojaDeVida/HojaDeVidaVehiculoScreen";
import HojaDeVidaOtrosActivosScreen from "../gestionDeInventario/gestionDeHojaDeVida/HojaDeVidaOtrosActivosScreen";
import HojaDeVidaVehiculoExternoScreen from "../gestionDeInventario/gestionDeHojaDeVida/HojaDeVidaVehiculoExternoScreen";
import BusquedaActivosSubdelegadosScreen from "../gestionDeInventario/subdelegacion/BusquedaActivosSubdelegadosScreen";
import ReasignacionElementosSubAsignadosScreen from "../gestionDeInventario/subdelegacion/ReasignacionElementosSubAsignadosScreen";
import SubasignarElementosScreen from "../gestionDeInventario/subdelegacion/SubasignarElementosScreen";
import BusquedaArticuloPrestadoScreen from "../tableroDeControl/BusquedaArticuloPrestadoScreen";
import StockMaximoMinimoScreen from "../tableroDeControl/StockMaximoMinimoScreen";
import TablaInventarioScreen from "../tableroDeControl/TablaInventarioScreen";
import ProgamacionDeMantenimientoScreen from "../gestionDeInventario/gestionDeHojaDeVida/mantenimiento/ProgamacionDeMantenimiento";
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
import AlertasVencimientoDocumentacionVehiculosScreen from "../configuracion/AlertasVencimientoDocumentacionVehiculoScreen";
import AlertasDevolucionPrestamoScreen from "../configuracion/AlertasDevolucionPrestamoScreen";
import BusquedaPersonalScreen from "../configuracion/BusquedaPersonalScreen";
import CreacionBodegaScreen from "../configuracion/CreacionBodegaScreen";
import RegistroConductoresExternosScreen from "../configuracion/RegistroConductoresExternosScreen";
import TraspasoElementosBodegasScreen from "../configuracion/TraspasoElementosBodegasScreen";
import ReprogramarSolicitudVehiculoScreen from "../gestionDeVehiculos/ReprogramarSolicitudVehiculoScreen";
import AsignacionVehiculoScreen from "../gestionDeVehiculos/AsignacionVehiculoScreen";
import SolicitudesAutorizadasPorEjecutraScreen from "../gestionDeVehiculos/SolicitudesAutorizadasPorEjecutraScreen";
import MarcarVehiculoComoEntregadoScreen from "../gestionDeVehiculos/MarcarVehiculoComoEntregadoScreen";
import SolicitudesDeVehiculoEnEjecucionScreen from "../gestionDeVehiculos/SolicitudesDeVehiculoEnEjecucionScreen";
import SolicitudesPendientesPorAutorizarScreen from "../gestionDeVehiculos/SolicitudesPendientesPorAutorizarScreen";
import SolicitudesDeVehiculoVencidasScreen from "../gestionDeVehiculos/SolicitudesDeVehiculoVencidasScreen";
import ReporteHistoricoDeActivoScreen from "../reportes/ReporteHistoricoDeActivoScreen";
import ConsultaPazYSalvoScreen from "../reportes/ConsultaPazYSalvoScreen";
import ReporteDeInventarioScreen from "../reportes/ReporteDeInventarioScreen";
import ReporteDeInventarioPorPersonaScreen from "../reportes/ReporteDeInventarioPorPersonaScreen";
import ReporteDeEntradaScreen from "../reportes/ReporteDeEntradaScreen";
import ReporteSolicitudDeAsignacionScreen from "../reportes/ReporteSolicitudDeAsignacionScreen";
import ReporteAsignacionDeActivoScreen from "../reportes/ReporteAsignacionDeActivoScreen";
import ReporteDeDevolucionDeActivoScreen from "../reportes/ReporteDeDevolucionDeActivoScreen";
import ReporteDeBajaScreen from "../reportes/ReporteDeBajaScreen";
import ReporteDeReasignacionFuncionariosScreen from "../reportes/ReporteDeReasignacionFuncionariosScreen";
import ReporteDeEstadoDeActivosScreen from "../reportes/ReporteDeEstadoDeActivosScreen";
import ReportePrestamosPendientesScreen from "../reportes/ReportePrestamosPendientesScreen";
import ReporteSolicitudDeVehiculosScreen from "../reportes/ReporteSolicitudDeVehiculosScreen";
import ReporteSolicitudDeVehiculosCompletadaScreen from "../reportes/ReporteSolicitudDeVehiculosCompletadaScreen";
import RegistroDeMantenimientoDeComputoScreen from "../reportes/RegistroDeMantenimientoDeComputoScreen";
import ReporteEstadoMantenimientoActivoScreen from "../reportes/ReporteEstadoMantenimientoActivoScreen";
import ReporteDeSolicitudDePrestamoScreen from "../reportes/ReporteDeSolicitudDePrestamoScreen";
import ReporteDespachoPrestamoScreen from "../reportes/ReporteDespachoPrestamoScreen";
import ReporteDeDevolucionPrestamoScreen from "../reportes/ReporteDeDevolucionPrestamoScreen";
import ReporteDeEntradaDeConsumoScreen from "../reportes/ReporteDeEntradaDeConsumoScreen";
import ReporteDeSolicitudDeConsumoScreen from "../reportes/ReporteDeSolicitudDeConsumoScreen";
import ReporteDeDespachoDeConsumoScreen from "../reportes/ReporteDeDespachoDeConsumoScreen";
import ReporteDeFuncionarioPorConsumoScreen from "../reportes/ReporteDeFuncionarioPorConsumoScreen";
import ReporteDeExistenciasConsumoScreen from "../reportes/ReporteDeExistenciasConsumoScreen";
import ReporteStockScreen from "../reportes/ReporteStockScreen";
import AdministradorBodegasScreen from "../configuracion/AdministradorBodegasScreen";
import EditarBodegaScreen from "../configuracion/EditarBodegaScreen";
import HojaDeVidaComputoScreen from "../gestionDeInventario/gestionDeHojaDeVida/HojaDeVidaComputoScreen";


const AlmacenRoutes = () => {
  return (
    <Routes>
      <Route index element={<Almacen />} />

      <Route path="tablero-de-control">
        <Route path="stock" element={<StockMaximoMinimoScreen />} />

        <Route path="tabla-inventario" element={<TablaInventarioScreen />} />

        <Route
          path="busqueda-articulos-prestados"
          element={<BusquedaArticuloPrestadoScreen />}
        />
      </Route>

      <Route path="gestion-de-inventario">
        <Route path="asignaractivo" element={<AsignarActivoScreen />} />
        <Route
          path="reasignarelementosentrefuncionarios"
          element={<ReasignarElementosEntreFuncionariosScreen />}
        />
        <Route
          path="despacharelementosconsumo"
          element={<DespacharElementosConsumoScreen />}
        />
        <Route
          path="asignaractivoscalidadprestamo"
          element={<AsignarActivosCalidadPrestamoScreen />}
        />
        <Route
          path="despachoelementossinsolicitud"
          element={<DespachoElementosSinSolicitudScreen />}
        />
        <Route
          path="devolverelementossubasignadosresponsable"
          element={<DevolverElementosSubasignadosResponsableScreen />}
        />
        <Route
          path="devolveractivoasignado"
          element={<DevolverActivoAsignadoScreen />}
        />
        <Route
          path="devolveractivocalidadprestamo"
          element={<DevolverActivoCalidadPrestamoScreen />}
        />
        <Route
          path="formulariorevisioninventario"
          element={<FormularioRevisionInventarioScreen />}
        />
        <Route
          path="programacion-mantenimiento"
          element={<ProgamacionDeMantenimientoScreen />}
        />
        <Route path="cv-computo" element={<HojaDeVidaComputoScreen />} />
        <Route path="cv-vehiculo" element={<HojaDeVidaVehiculoScreen />} />
        <Route
          path="cv-otros-activos"
          element={<HojaDeVidaOtrosActivosScreen />}
        />
        <Route
          path="cv-vehiculo-externo"
          element={<HojaDeVidaVehiculoExternoScreen />}
        />
        <Route
          path="busqueda-activos"
          element={<BusquedaActivosSubdelegadosScreen />}
        />
        <Route
          path="reasignacion-elementos"
          element={<ReasignacionElementosSubAsignadosScreen />}
        />
        <Route
          path="subasignar-elementos"
          element={<SubasignarElementosScreen />}
        />
      </Route>

      <Route path="entrada-y-salida-de-articulos">
        <Route path="catalogo-bienes" element={<CatalogoDeBienesScreen />} />
        <Route path="entrada-articulo" element={<EntradaDeArticuloScreen />} />
        <Route
          path="creacion-articulo-devolutivo"
          element={<CreacionArticuloScreen />}
        />
        <Route
          path="creacion-articulo-consumo"
          element={<CrearArticuloConsumoScreen />}
        />
        <Route
          path="apropiacion-articulo"
          element={<ProcesoApropiacionArticulosScreen />}
        />
        <Route
          path="visualizar-articulos"
          element={<VisualizarArticulosScreen />}
        />
        <Route path="salida-articulos" element={<SalidaArticulosScreen />} />
        <Route path="registro-baja" element={<RegistroDeBajaScreen />} />
      </Route>

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="reportes">
        <Route
          path="reporte-historico-activo"
          element={<ReporteHistoricoDeActivoScreen />}
        />

        <Route
          path="consulta-paz-y-salvo"
          element={<ConsultaPazYSalvoScreen />}
        />

        <Route
          path="reporte-de-inventario"
          element={<ReporteDeInventarioScreen />}
        />

        <Route
          path="reporte-de-inventario-por-persona-o-grupo"
          element={<ReporteDeInventarioPorPersonaScreen />}
        />

        <Route
          path="reporte-entrada-de-almacen"
          element={<ReporteDeEntradaScreen />}
        />

        <Route
          path="reporte-solicitud-de-asiganacion"
          element={<ReporteSolicitudDeAsignacionScreen />}
        />

        <Route
          path="reporte-asignacion-de-activo"
          element={<ReporteAsignacionDeActivoScreen />}
        />

        <Route
          path="reporte-de-devolucion-de-activo"
          element={<ReporteDeDevolucionDeActivoScreen />}
        />

        <Route path="reporte-de-baja" element={<ReporteDeBajaScreen />} />

        <Route
          path="reporte-de-reasigancion-funcionarios"
          element={<ReporteDeReasignacionFuncionariosScreen />}
        />

        <Route
          path="reporte-de-estado-de-activo"
          element={<ReporteDeEstadoDeActivosScreen />}
        />

        <Route
          path="reporte-de-prestamos-pendientes-por-devolucion"
          element={<ReportePrestamosPendientesScreen />}
        />

        <Route
          path="reporte-de-solicitudes-de-vehiculos"
          element={<ReporteSolicitudDeVehiculosScreen />}
        />

        <Route
          path="reporte-de-solicitudes-de-vehiculos-completada"
          element={<ReporteSolicitudDeVehiculosCompletadaScreen />}
        />

        <Route
          path="registro-de-mantenimiento-de-computo"
          element={<RegistroDeMantenimientoDeComputoScreen />}
        />

        <Route
          path="reporte-de-estado-de-mantenimiento-de-un-activo"
          element={<ReporteEstadoMantenimientoActivoScreen />}
        />

        <Route
          path="reporte-de-solicitud-de-prestamo"
          element={<ReporteDeSolicitudDePrestamoScreen />}
        />

        <Route
          path="reporte-de-despacho-de-prestamo-de-activo"
          element={<ReporteDespachoPrestamoScreen />}
        />

        <Route
          path="reporte-de-devolucion-de-prestamo"
          element={<ReporteDeDevolucionPrestamoScreen />}
        />

        <Route
          path="reporte-de-entrada-de-consumo"
          element={<ReporteDeEntradaDeConsumoScreen />}
        />

        <Route
          path="reporte-de-solicitud-de-consumo"
          element={<ReporteDeSolicitudDeConsumoScreen />}
        />

        <Route
          path="reporte-de-despacho-de-consumo"
          element={<ReporteDeDespachoDeConsumoScreen />}
        />

        <Route
          path="reporte-de-consumo-por-funcionario"
          element={<ReporteDeFuncionarioPorConsumoScreen />}
        />

        <Route
          path="reporte-existencias-de-consumo"
          element={<ReporteDeExistenciasConsumoScreen />}
        />

        <Route
          path="reporte-stock-de-articulos"
          element={<ReporteStockScreen />}
        />
      </Route>

      <Route path="configuracion">
        <Route
          path="alertasmantenimientoactivo"
          element={<AlertasMantenimientoActivoScreen />}
        />
        <Route
          path="alertasmantenimientovehiculo"
          element={<AlertasMantenimientoVehiculosScreen />}
        />
        <Route
          path="alertasllegadavehiculos"
          element={<AlertasLlegadaVehiculosScreen />}
        />
        <Route
          path="alertasvencimientodocumentacionvehiculos"
          element={<AlertasVencimientoDocumentacionVehiculosScreen />}
        />
        <Route
          path="alertasdevolucionprestamo"
          element={<AlertasDevolucionPrestamoScreen />}
        />
        <Route path="busquedapersonal" element={<BusquedaPersonalScreen />} />
        <Route path="creacionbodega" element={<CreacionBodegaScreen />} />
        <Route
          path="registroconductoresexternos"
          element={<RegistroConductoresExternosScreen />}
        />
        <Route
          path="traspasoelementosbodegas"
          element={<TraspasoElementosBodegasScreen />}
        />
        <Route
          path="administrador-bodegas"
          element={<AdministradorBodegasScreen />}
        />
        <Route
          path="editar-bodegas"
          element={<EditarBodegaScreen />}
        ></Route>
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
        <Route
          path="solicitud-vehiculo"
          element={<SolicitudVehiculoScreen />}
        />
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
