import { Navigate, Route, Routes } from "react-router-dom";
import AdministradorDeUsuariosScreen from "../AdministradorDeUsuariosScreen";
import ActualizarDatosEmpresaScreen from "../ActualizarDatosEmpresaScreen";
import ActualizarDatosPersonaScreen from "../ActualizarDatosPersonaScreen";
import AuditoriaScreen from "../AuditoriaScreen";
import RolesScreen from "../RolesScreen";

const SeguridadRoutes = () => {
  return (
    <Routes>

      <Route path="auditoria" element={<AuditoriaScreen />} />

      <Route path="actualizardatosempresa" element={<ActualizarDatosEmpresaScreen />} />

      <Route path="actualizardatospersona" element={<ActualizarDatosPersonaScreen />} />

      <Route path="roles" element={<RolesScreen />} />

      <Route path="administradordeusuarios" element={<AdministradorDeUsuariosScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  )
}
export default SeguridadRoutes