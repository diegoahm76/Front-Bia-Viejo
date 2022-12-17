import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Recaudo from "../";
import ArticulosFijosScreen from "../gestorInstanciaCobro/ArticulosFijosScreen";
import CrearArticulosFijosScreen from "../gestorInstanciaCobro/CrearArticulosFijosScreen";
import CatalogoDeBienesScreen from "../gestorInstanciaCobro/CatalogoDeBienesScreen";

import InformacionCuencasScreen from "../gestorInstanciaCobro/InformacionCuencasScreen";
import DocumentoCobroTUAScreen from "../gestorInstanciaCobro/DocumentoCobroTUAScreen";
import BienesProcesoExtincionDominioScreen from "../gestorInstanciaCobro/BienesProcesoExtincionDominioScreen";
import SeguimientoCondicionesTuaTrScreen from "../gestorInstanciaCobro/SeguimientoCondicionesTuaTrScreen";
import AutodeclaracionTuaScreen from "../gestorInstanciaCobro/AutodeclaracionTuaScreen";

const RecaudoRoutes = () => {
  return (
    <Routes>
      <Route index element={<Recaudo />} />

      <Route path="gestor-notificacion">
        <Route
          path="entrada-articulos-fijos"
          element={<ArticulosFijosScreen />}
        />
        <Route
          path="crear-entrada-articulos-fijos"
          element={<CrearArticulosFijosScreen />}
        />
        <Route
          path="catalogo-bienes-Screen"
          element={<CatalogoDeBienesScreen />}
        />



        <Route
          path="seguimiento-condiciones-tua"
          element={<SeguimientoCondicionesTuaTrScreen />}
        />
        <Route
          path="bienes-proceso-extincion-dominio"
          element={<BienesProcesoExtincionDominioScreen />}
        />
        <Route
          path="informacion-cuencas"
          element={<InformacionCuencasScreen />}
        />
        <Route
          path="documento-cobro-tua"
          element={<DocumentoCobroTUAScreen />}
        />
        <Route
          path="autodeclaracion-tua"
          element={<AutodeclaracionTuaScreen />}
        />
        
      </Route>

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default RecaudoRoutes;
