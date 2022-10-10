import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import Almacen from "../";
import CreacionArticulo from "../CreacionArticuloScreen";
import ReportesScreen from "../ReportesScreen";
import AlertasMantenimientoActivoScreen from "../configuracion/AlertasMantenimientoActivoScreen";
import AlertasDevolucionPrestamoScreen from "../configuracion/AlertasDevolucionPrestamoScreen";
import AlertasLlegadaVehiculosScreen from "../configuracion/AlertasLlegadaVehiculosScreen";
import AlertasMantenimientoVehiculosScreen from "../configuracion/AlertasMantenimientoVehiculosScreen";
import AlertasVencimientoDocumentacionVehiculoScreen from "../configuracion/AlertasVencimientoDocumentacionVehiculoScreen";
import BusquedaPersonalScreen from "../configuracion/BusquedaPersonalScreen";
import CreacionBodegaScreen from "../configuracion/CreacionBodegaScreen";
import RegistroConductoresExternosScreen from "../configuracion/RegistroConductoresExternosScreen";
import TraspasoElementosBodegasScreen from "../configuracion/TraspasoElementosBodegasScreen";


const AlmacenRoutes = () => {
  return (
    <Routes>

      <Route index element={<Almacen />} />
      <Route path="almacenconfiguracionalertasmantenimienotactivo" element={<AlertasMantenimientoActivoScreen/>} />

      <Route path="creacion-articulo" element={<CreacionArticulo />} />

      <Route path="reportes" element={<ReportesScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
      
      <Route path="configuracion">
        
        <Route path="busqueda/personas" element={<BusquedaPersonalScreen/>} />
        <Route path="creacion/bodega" element={<CreacionBodegaScreen/>} />
        <Route path="registro/conductores/externos" element={<RegistroConductoresExternosScreen/>} />
        <Route path="traspaso/elementos/bodega" element={<TraspasoElementosBodegasScreen/>} />
        <Route path="alertas/mantenimiento/activo" element={<AlertasMantenimientoActivoScreen/>} />
        <Route path="alertas/devolucion/prestamos" element={<AlertasDevolucionPrestamoScreen/>} />
        <Route path="alertas/llegada/vehiculos" element={<AlertasLlegadaVehiculosScreen/>} />
        <Route path="alertas/mantenimiento/vehiculos" element={<AlertasMantenimientoVehiculosScreen/>} />
        <Route path="alertas/vencimiento/documentos/vehiculos" element={<AlertasVencimientoDocumentacionVehiculoScreen/>} />



      </Route>

    </Routes>
  );
};

export default AlmacenRoutes;
