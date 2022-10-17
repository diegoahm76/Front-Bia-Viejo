import { Navigate, Route, Routes } from "react-router-dom";
import AlertasScreen from "../AlertasScreen";
import ConfiguracionesScreen from "../ConfiguracionesScreen";
import ReportesScreen from "../ReportesScreen";

const EstacionesRoutes = () => {
  return (
    <Routes>
      <Route path="/reportes" element={<ReportesScreen />} />

      <Route path="/alertas" element={<AlertasScreen />} />

      <Route path="/configuraciones" element={<ConfiguracionesScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
export default EstacionesRoutes;
