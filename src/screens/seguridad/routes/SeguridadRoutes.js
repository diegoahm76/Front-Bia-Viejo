import { Navigate, Route, Routes } from "react-router-dom";
import AdministradorDePersonasScreen from "../AdministradorDePersonasScreen";
import AuditoriaScreen from "../AuditoriaScreen";
import RolesScreen from "../RolesScreen";
import AdministradorDeEmpresasScreen from "../AdministradorDeEmpresasScreen";
import AdministradosDeUsuario from "../AdministradosDeUsuario";

const SeguridadRoutes = () => {
  return (
    <Routes>
      <Route path="auditoria" element={<AuditoriaScreen />} />

      <Route path="roles" element={<RolesScreen />} />

      <Route
        path="administradordepersonas"
        element={<AdministradorDePersonasScreen />}
      />

      <Route
        path="administradordeempresas"
        element={<AdministradorDeEmpresasScreen />}
      />

      <Route
        path="administradordeusuario"
        element={<AdministradosDeUsuario />}
      />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
export default SeguridadRoutes;
