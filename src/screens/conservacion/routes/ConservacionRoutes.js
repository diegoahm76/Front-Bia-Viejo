import { Routes, Route, Navigate } from "react-router-dom";

import Conservacion from "../";
import AgregarViveroScreen from "../gestorVivero/AgregarViveroScreen";
import ProduccionPropiaScreen from "../configuracion/ConfiguracionScreen";
import PropagacionScreen from "../gestorVivero/inventario/PropagacionScreen";
import CronogramaScreen from "../cronograma/CronogramaScreen";
import DonacionesScreen from "../gestorVivero/inventario/DonacionScreen";

import ProduccionPropiaJohn from "../gestorVivero/inventario/ProduccionPropiaJohn";
import { MoverMaterialVegetalScreen } from "../distribucion/MoverMaterialVegetalScreen";

import EntregasPendientesScreen from "../distribucion/entregamv/EntregasPendientesScreen";
import EntregadosScreen from "../distribucion/entregamv/EntregadosScreen";
import ConfiguracionScreen from "../configuracion/ConfiguracionScreen";

const ConservacionRoutes = () => {
  return (
    <Routes>
      <Route index element={<Conservacion />} />

      <Route path="gestorvivero">
        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        <Route path="agregarvivero" element={<AgregarViveroScreen />} />

        <Route path="inventario">
          <Route index element={<Navigate to="/dashboard/conservacion" />} />

          <Route path="propagacion" element={<PropagacionScreen />} />

          <Route path="produccionpropia" element={<ProduccionPropiaScreen />} />

          <Route
            path="produccionpropiajohn"
            element={<ProduccionPropiaJohn />}
          />

          <Route path="donacion" element={<DonacionesScreen />} />
        </Route>
      </Route>

      <Route path="cronograma" element={<CronogramaScreen />} />

      <Route path="distribucion">
        <Route index element={<Navigate to="/dashboard/conservacion" />} />
        <Route
          path="movermaterialvegetal"
          element={<MoverMaterialVegetalScreen />}
        />

        <Route path="entregamv">
          <Route path="pendientes" element={<EntregasPendientesScreen />} />

          <Route path="entregados" element={<EntregadosScreen />} />
        </Route>
      </Route>

      <Route path="configuracion" element={<ConfiguracionScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default ConservacionRoutes;
