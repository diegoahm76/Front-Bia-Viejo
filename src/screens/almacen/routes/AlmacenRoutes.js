import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import ReportesScreen from "../ReportesScreen";


import ReporteHistoricoDeActivoScreen from "../reportes/ReporteHistoricoDeActivoScreen";
import ConsultaPazYSalvoScreen from "../reportes/ConsultaPazYSalvoScreen";
import PracticaScreen from "../reportes/PracticaScreen";



const AlmacenRoutes = () => {
  return (
    <Routes>

      <Route index element={<Almacen />} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="reportes">

        <Route path="reportehistoricoactivo" element= {<ReporteHistoricoDeActivoScreen/>}/>

        <Route path="consultapazysalvo" element= {<ConsultaPazYSalvoScreen/>}/>

        <Route path="practica" element= {<PracticaScreen/>}/>

      </Route>

    </Routes>

      



    
  );
};

export default AlmacenRoutes;
