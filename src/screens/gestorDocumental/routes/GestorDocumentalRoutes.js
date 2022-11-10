import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import GestorDocumental from "..";
import { EdicionOrganigramaScreen } from "../EdicionOrganigramaScreen";

const GestionDocumentalRoutes = () => {
  return (
    <Routes>

      <Route index element={<GestorDocumental />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />

      <Route path="edicion-organigrama" element={<EdicionOrganigramaScreen/>}/>



    </Routes>
  );
};

export default GestionDocumentalRoutes;
