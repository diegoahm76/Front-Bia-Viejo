import { Navigate, Route, Routes } from "react-router-dom";
import ActualizarDatosScreen from "../ActualizarDatosScreen";
import AdministradorDeUsuariosScreen from "../AdministradorDeUsuariosScreen";
import AuditoriaScreen from "../AuditoriaScreen";

const SeguridadRoutes = () => {
  return (
    <Routes>

      <Route path="auditoria" element={<AuditoriaScreen />} />

      <Route path="actualizardatos" element={<ActualizarDatosScreen />} />

      <Route path="administradordeusuarios" element={<AdministradorDeUsuariosScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  )
}
export default SeguridadRoutes