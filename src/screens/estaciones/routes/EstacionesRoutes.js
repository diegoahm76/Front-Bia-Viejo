import { Navigate, Route, Routes } from "react-router-dom";
import AdministradorDeEstaciones from "../AdministradorDeEstaciones";
import ReportesScreen from "../ReportesScreen";

const EstacionesRoutes = () => {
  return (
    <Routes>
      <Route path="/reportes" element={<ReportesScreen />} />

      <Route path="/administrador-de-estaciones" element={<AdministradorDeEstaciones />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
export default EstacionesRoutes;
