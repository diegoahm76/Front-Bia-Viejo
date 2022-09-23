import { Routes, Route, Navigate } from "react-router-dom";

import Conservacion from "../";
import AgregarViveroScreen from "../gestorVivero/AgregarViveroScreen";
import EditarViveroScreen from "../gestorVivero/EditarViveroScreen";
import ProduccionPropiaScreen from "../gestorVivero/inventario/ProduccionPropiaScreen";
import PropagacionScreen from "../gestorVivero/inventario/PropagacionScreen";
import CronogramaScreen from "../cronograma/CronogramaScreen";
import DonacionesScreen from "../gestorVivero/inventario/DonacionScreen";

const ConservacionRoutes = () => {
  return (
    <Routes>

      <Route index element={<Conservacion />} />

      <Route path="gestorvivero">

        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        <Route path="agregarvivero" element={<AgregarViveroScreen />} />

        <Route path="editarvivero" element={<EditarViveroScreen />} />

        <Route path="inventario">

          <Route index element={<Navigate to="/dashboard/conservacion" />} />

          <Route path="propagacion" element={<PropagacionScreen />} />

          <Route path="produccionpropia" element={<ProduccionPropiaScreen />} />

          <Route path="donacion" element={<DonacionesScreen />} />

        </Route>

      </Route>

      <Route path="cronograma">

        <Route index element={<Navigate to="/dashboard/conservacion" />} />

        <Route path="calendario" element={<CronogramaScreen />} />

      </Route>

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default ConservacionRoutes;
