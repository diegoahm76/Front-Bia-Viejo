import { Routes, Route, Navigate } from "react-router-dom";

import Conservacion from "../";
import CentroNotificacionesScreen from "../gestorVivero/CentroNotificacionesScreen"
import EditarViveroScreen from "../gestorVivero/EditarViveroScreen"
import AgregarViveroScreen from "../gestorVivero/AgregarViveroScreen";
import PropagacionScreen from "../gestorVivero/inventario/PropagacionScreen";
import ProduccionPropiaScreen from "../gestorVivero/inventario/ProduccionPropiaScreen";
import CronogramaScreen from "../cronograma/CronogramaScreen";
import DonacionesScreen from "../gestorVivero/inventario/DonacionScreen";
import { MoverMaterialVegetalScreen } from "../distribucion/MoverMaterialVegetalScreen";
import EntregasPendientesScreen from "../distribucion/entregamv/EntregasPendientesScreen";
import EntregadosScreen from "../distribucion/entregamv/EntregadosScreen";
import ConfiguracionScreen from "../configuracion/ConfiguracionScreen";
import CrearProduccionPropiaScreen from "../gestorMaterialVegetal/CrearProduccionPropiaScreen";
import InsumosScreen from "../gestorVivero/inventario/InsumosScreen";
import PlantasEnCuarentenaScreen from "../gestorVivero/inventario/PlantasEnCuarentenaScreen";
import CompensacionScreen from "../gestorVivero/inventario/CompensacionScreen";
import MedidasDeRearciminetoScreen from "../gestorVivero/inventario/MedidasDeRearciminetoScreen";
import HerraminetasScreen from "../gestorVivero/inventario/HerraminetasScreen";
import DisponibleMaterialVegetalScreen from "../gestorVivero/inventario/DisponibleMaterialVegetalScreen";
import CrearMaterialVegetalSembradoScreen from "../gestorMaterialVegetal/CrearMaterialVegetalSembradoScreen";
import EditarMaterialVegetalScreen from "../gestorMaterialVegetal/EditarMaterialVegetalScreen";
import CuarentenaDeMaterialVegetalScreen from "../gestorMaterialVegetal/CuarentenaDeMaterialVegetalScreen";
import ActivarMaterialVegetalScreen from "../gestorMaterialVegetal/ActivarMaterialVegetalScreen";
import ControlSeguimientoDeMaterialVegetalScreen from "../produccion/ControlSeguimientoDeMaterialVegetalScreen";
import EtapasDeMaterialVegetalScreen from "../produccion/EtapasDeMaterialVegetalScreen";
import SolicitudesRealizadasViveroScreen from "../solicitudes/SolicitudesRealizadasViveroScreen";
import HistorialDeSolicitudesScreen from "../solicitudes/HistorialDeSolicitudesScreen";
import ConsultaDeInformesDeCaracterizacionScreen from "../solicitudes/ConsultaDeInformesDeCaracterizacionScreen";
import SolicitudesDeMaterialSreen from "../distribucion/SolicitudesDeMaterialSreen";
import HistorialDeMovimientosScreen from "../distribucion/HistorialDeMovimientosScreen";
import ReportesScreen from "../reportes/ReportesScreen";
import RecepcionDeSolicitudScreen from "../distribucion/RecepcionDeSolicitudScreen";

const ConservacionRoutes = () => {
  return (
    <Routes>
      <Route index element={<Conservacion />} />

      <Route path="gestorvivero">
        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        {/* <Route path="agregarvivero" element={<AgregarViveroScreen />} /> */}

        <Route path="editarvivero" element={<EditarViveroScreen />} />

        <Route path="centronotificaciones" element={<CentroNotificacionesScreen />} />

        

        <Route path="inventario">
          <Route index element={<Navigate to="/dashboard/conservacion" />} />

          <Route path="propagacion" element={<PropagacionScreen />} />

          <Route path="produccionpropia" element={<ProduccionPropiaScreen />} />

          <Route path="editarmaterialvegetal" element={<EditarMaterialVegetalScreen />} />

          <Route
            path="plantasencuarentena"
            element={<PlantasEnCuarentenaScreen />}
          />

          <Route path="compensacion" element={<CompensacionScreen />} />

          <Route path="donacion" element={<DonacionesScreen />} />

          <Route
            path="medidasderesarcimiento"
            element={<MedidasDeRearciminetoScreen />}
          />

          <Route path="insumos" element={<InsumosScreen />} />

          <Route path="herramientas" element={<HerraminetasScreen />} />

          <Route
            path="disponiblematerialvegetal"
            element={<DisponibleMaterialVegetalScreen />}
          />
        </Route>
      </Route>

      <Route path="gestormaterialvegetal">
        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        <Route
          path="crearproduccionpropia"
          element={<CrearProduccionPropiaScreen />}
        />

        <Route
          path="crearmaterialvegetalsembrado"
          element={<CrearMaterialVegetalSembradoScreen />}
        />

        <Route
          path="editarmaterialvegetal"
          element={<EditarMaterialVegetalScreen />}
        />

        <Route
          path="cuarentenadematerialvegetal"
          element={<CuarentenaDeMaterialVegetalScreen />}
        />

        <Route
          path="activarmaterialvegetal"
          element={<ActivarMaterialVegetalScreen />}
        />
      </Route>

      <Route path="produccion">
        <Route
          path="controlyseguimientodematerialvegetal"
          element={<ControlSeguimientoDeMaterialVegetalScreen />}
        />

        <Route
          path="etapasdematerialvegetal"
          element={<EtapasDeMaterialVegetalScreen />}
        />
      </Route>

      <Route path="solicitudes">


        <Route
          path="solicitudesrealizadasavivero"
          element={<SolicitudesRealizadasViveroScreen />}
        />

        <Route
          path="historialdesolicitudes"
          element={<HistorialDeSolicitudesScreen />}
        />

        <Route
          path="consultainformesdecaracterizacion"
          element={<ConsultaDeInformesDeCaracterizacionScreen />}
        />
      </Route>

      <Route path="distribucion">
        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        <Route
          path="solicitudesdematerial"
          element={<SolicitudesDeMaterialSreen />}
        />

        <Route
        path="recepcionsolicitudes"
        element={<RecepcionDeSolicitudScreen/>}
        />
      
        <Route
          path="movermaterialvegetal"
          element={<MoverMaterialVegetalScreen/>}
        />

        <Route
          path="historialdemovimientos"
          element={<HistorialDeMovimientosScreen />}
        />

        <Route path="entregamv">
          <Route path="pendientes" element={<EntregasPendientesScreen />} />

          <Route path="entregados" element={<EntregadosScreen />} />
        </Route>
      </Route>

      <Route path="cronograma" element={<CronogramaScreen />} />

      <Route path="reportes" element={<ReportesScreen />} />

      <Route path="configuracion" element={<ConfiguracionScreen />} />

      {/**
       * Centro de notificacion
       */}

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default ConservacionRoutes;
