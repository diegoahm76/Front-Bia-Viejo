import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import ReportesScreen from "../ReportesScreen";
import { EntradaDeArticuloScreen } from "../EntradaDeArticuloScreen";
import CrearArticuloConsumoScreen from "../CrearArticuloConsumoScreen";
import  ProcesoApropiacionArticulosScreen  from "../ProcesoApropiacionArticulosScreen";
import { VisualizarArticulosScreen } from "../VisualizarArticulosScreen";
import SalidaArticulosScreen from "../SalidaArticulosScreen";


const AlmacenRoutes = () => {
  return (
    <Routes>

      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="creacion-articulo-consumo" element={<CrearArticuloConsumoScreen />} />

      <Route path="apropiacion-articulo" element={<ProcesoApropiacionArticulosScreen />} />

      <Route path="visualizar-articulos" element={<VisualizarArticulosScreen/>}/>

      <Route path="salida-articulos" element={<SalidaArticulosScreen/>}/>

      <Route path="reportes" element={<ReportesScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="entrada-articulos" element={<EntradaDeArticuloScreen/>}/>
      

    </Routes>
  );
};

export default AlmacenRoutes;
