import { Navigate, Route, Routes } from "react-router-dom";
import ReportesScreen from "../ReportesScreen";

const EstacionesRoutes = () => {
  return (
    <Routes>
      <Route path="/reportes" element={<ReportesScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
export default EstacionesRoutes;
