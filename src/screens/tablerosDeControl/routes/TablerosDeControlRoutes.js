import { Routes, Route, Navigate } from "react-router-dom";
import LogoScreen from "../../LogoScreen";
import TableroDeControlConservacion from "../TableroDeControlConservacion";

const TablerosDeControlRoutes = () => {
  return (
    <Routes>

      <Route index element={<LogoScreen />} />

      <Route path="conservacion" element={<TableroDeControlConservacion />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  )
}
export default TablerosDeControlRoutes