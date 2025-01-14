import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import CrearOrganigramaScreen from "../CrearOrganigramaScreen";
import CcdScreen from "../CcdScreen";
import TrdScreen from "../TrdScreen";
import { EdicionOrganigramaScreen } from "../EdicionOrganigramaScreen";

const GestionDocumentalRoutes = () => {
  return (
    <Routes>
      <Route index element={<div>Estamos en el almacen</div>} />
      <Route path="organigrama">
        <Route path="crearorganigrama" element={<CrearOrganigramaScreen />} />
        <Route path="edicion-organigrama" element={<EdicionOrganigramaScreen />} />
        <Route path="ccd" element={<CcdScreen />} />
        <Route path="trd" element={<TrdScreen />} />
      </Route>
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default GestionDocumentalRoutes;
