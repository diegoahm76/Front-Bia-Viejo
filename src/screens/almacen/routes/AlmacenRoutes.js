import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import ReportesScreen from "../ReportesScreen";
import { EntradaDeArticuloScreen } from "../EntradaDeArticuloScreen";

const AlmacenRoutes = () => {
  return (
    <Routes>

      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="reportes" element={<ReportesScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="entrada-articulos" element={<EntradaDeArticuloScreen/>}/>
      

    </Routes>
  );
};

export default AlmacenRoutes;
