import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import GestorDocumental from "..";
import CrearOrganigramaScreen from "../CrearOrganigramaScreen";
import { EdicionOrganigramaScreen } from "../EdicionOrganigramaScreen";

const GestionDocumentalRoutes = () => {
  return (
    <Routes>
      <Route index element={<GestorDocumental />} />
      <Route path="organigrama">
        <Route path="crearorganigrama" element={<CrearOrganigramaScreen />} />
        <Route
          path="edicion-organigrama"
          element={<EdicionOrganigramaScreen />}
        />
      </Route>
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default GestionDocumentalRoutes;
