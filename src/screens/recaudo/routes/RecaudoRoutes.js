import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Recaudo from "../";
import ArticulosFijosScreen from "../gestorInstanciaCobro/ArticulosFijosScreen";
import CrearArticulosFijosScreen from "../gestorInstanciaCobro/CrearArticulosFijosScreen";
import CatalogoDeBienesScreen from "../gestorInstanciaCobro/CatalogoDeBienesScreen";

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
      </Route>

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default RecaudoRoutes;
