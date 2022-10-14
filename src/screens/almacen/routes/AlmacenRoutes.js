import { Route, Routes } from "react-router-dom";
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


const AlmacenRoutes = () => {
  return (
    <Routes>
      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="reportes">
        <Route
          path="reportehistoricoactivo"
          element={<ReporteHistoricoDeActivoScreen />}
        />

        <Route path="consultapazysalvo" element={<ConsultaPazYSalvoScreen />} />

        <Route
          path="reportedeinventario"
          element={<ReporteDeInventarioScreen />}
        />

        <Route
          path="reportedeinventarioporpersonaogrupo"
          element={<ReporteDeInventarioPorPersonaScreen />}
        />

        <Route
          path="reporteentradadealmacen"
          element={<ReporteDeEntradaScreen />}
        />

        <Route
          path="reportesolicituddeasiganacion"
          element={<ReporteSolicitudDeAsignacionScreen />}
        />

        <Route
          path="reporteasignaciondeactivo"
          element={<ReporteAsignacionDeActivoScreen />}
        />

        <Route
          path="reportededevoluciondeactivo"
          element={<ReporteDeDevolucionDeActivoScreen />}
        />

        <Route path="reportedebaja" element={<ReporteDeBajaScreen />} />

        <Route
          path="reportedereasigancionfuncionarios"
          element={<ReporteDeReasignacionFuncionariosScreen />}
        />

        <Route
          path="reportedeestadodeactivo"
          element={<ReporteDeEstadoDeActivosScreen />}
        />

        <Route
          path="reportedeprestamospendientespordevolucion"
          element={<ReportePrestamosPendientesScreen />}
        />

        <Route
          path="reportededesolicitudesdevehiculos"
          element={<ReporteSolicitudDeVehiculosScreen />}
        />

        <Route
          path="reportededesolicitudesdevehiculoscompletada"
          element={<ReporteSolicitudDeVehiculosCompletadaScreen />}
        />

        <Route
          path="registrodemantenimientodecomputo"
          element={<RegistroDeMantenimientoDeComputoScreen />}
        />

        <Route
          path="reportedeestadodemantenimientodeunactivo"
          element={<ReporteEstadoMantenimientoActivoScreen />}
        />

        <Route
          path="reportedesolicitudeprestamo"
          element={<ReporteDeSolicitudDePrestamoScreen />}
        />

        <Route
          path="reportededespachodeprestamodeactivo"
          element={<ReporteDespachoPrestamoScreen />}
        />

        <Route
          path="reportededevoluciondeprestamo"
          element={<ReporteDeDevolucionPrestamoScreen />}
        />

        <Route
          path="reportedeentradadeconsumo"
          element={<ReporteDeEntradaDeConsumoScreen />}
        />

        <Route
          path="reportedesolicituddeconsumo"
          element={<ReporteDeSolicitudDeConsumoScreen />}
        />

        <Route
          path="reportededespachodeconsumo"
          element={<ReporteDeDespachoDeConsumoScreen />}
        />

        <Route
          path="reportedeconsumoporfuncionario"
          element={<ReporteDeFuncionarioPorConsumoScreen />}
        />

        <Route
          path="reporteexistenciasdeconsumo"
          element={<ReporteDeExistenciasConsumoScreen />}
        />

        <Route
          path="reportestockdearticulos"
          element={<ReporteStockScreen />}
        />
      </Route>

      <Route path="solicitudesarticulos">
        <Route
          path="autorizarsolicitudactivoprestamo"
          element={<AutorizarSolicitudActivoPrestamoScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="solicitudespendientesautorizar"
          element={<SolicitudesPendientesAutorizarScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="solicitararticulosconsumo"
          element={<SolicitarArticulosConsumoScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="autorizarsolicitudesconsumo"
          element={<AutorizarSolicitudesConsumoScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="solicitudesasignacionpendientes"
          element={<SolicitudesAsignacionPendientesScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="solicitudasignacionarticuloactivo"
          element={<SolicitudAsignacionArticuloActivoScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="autorizarsolicitudasignacionarticuloactivo"
          element={<AutorizarSolicitudAsignacionArticuloActivoScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="solicitudactivoprestamo"
          element={<SolicitudActivoPrestamoScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route path="solicitudvehiculo" element={<SolicitudVehiculoScreen />} />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="solicitarelementoconsumovivero"
          element={<SolicitarElementoConsumoViveroScreen />}
        />
      </Route>
      <Route path="solicitudesarticulos">
        <Route
          path="solicitudesautorizadaspendientes"
          element={<SolicitudesAutorizadasPendientesScreen />}
        />
      </Route>

      <Route
        path="inspecciondiariadevehiculo"
        element={<InspeccionDiariaDeVehiculoScreen />}
      />

      <Route
        path="registrodemantenimientodevehiculo"
        element={<RegistroDeMantenimientoDeVehiculo />}
      />

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
