import { Navigate, Route, Routes } from "react-router-dom";
import ActualizarDatosScreen from "../ActualizarDatosScreen";
import AuditoriaScreen from "../AuditoriaScreen";

const SeguridadRoutes = () => {
  return (
    <Routes>

      <Route path="auditoria" element={<AuditoriaScreen />} />

      <Route path="actualizardatos" element={<ActualizarDatosScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  )
}
export default SeguridadRoutes