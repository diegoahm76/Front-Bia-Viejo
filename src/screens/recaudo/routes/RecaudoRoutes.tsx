import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Recaudo from "..";
import CrearArticulosFijosScreen from "../gestorInstanciaCobro/CrearArticulosFijosScreen";
import CatalogoDeBienesScreen from "../gestorInstanciaCobro/CatalogoDeBienesScreen";
import FacturacionScreen from "../FacturacionScreen";
import { OficioInvitacionFormalScreen } from "../gestorNotificacion/OficioInvitacionFormalScreen";
import { SegmentacionDeDeudoresScreen } from "../gestorDeudores/SegmentacionDeDeudoresScreen";
import { ReporteMinAmbienteScreen } from "../gestorNotificacion/ReporteMinAmbienteScreen";
import { InformeBDMEScreen } from "../gestorDeudores/InformeBDMEScreen";
import { InformacionDeudaScreen } from "../gestorDeudores/InformacionDeudaScreen";
import { AsignacionFuncionariosScreen } from "../gestorInstanciaCobro/AsignacionFuncionariosScreen";
import { PresentacionExcepcionesScreen } from "../gestorInstanciaCobro/PresentacionExcepcionesScreen";
import { CalculadoraInteresScreen } from "../gestorInstanciaCobro/CalculadoraInteresScreen";
import SeguimientoCondicionesTuaTrScreen from "../gestorInstanciaCobro/SeguimientoCondicionesTuaTrScreen";
import BienesProcesoExtincionDominioScreen from "../gestorInstanciaCobro/BienesProcesoExtincionDominioScreen";
import InformacionCuencasScreen from "../gestorInstanciaCobro/InformacionCuencasScreen";
import DocumentoCobroTUAScreen from "../gestorInstanciaCobro/DocumentoCobroTUAScreen";
import AutodeclaracionTuaScreen from "../gestorInstanciaCobro/AutodeclaracionTuaScreen";
import { obtenerTodosBienes } from "../../../store/slices/catalogoBienes/indexCatalogoBien";
import { useAppDispatch } from "../../../store/hooks/hooks";

const RecaudoRoutes = () => {
  const dispatch = useAppDispatch();
  // obtenerTodosBienes(dispatch);
  return (
    <Routes>
      <Route index element={<Recaudo />} />

      <Route path="gestor-notificacion">
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

      <Route path="facturacion" element={<FacturacionScreen />} />

      <Route
        path="oficioinvitacionformal"
        element={<OficioInvitacionFormalScreen />}
      />

      <Route
        path="segmentaciondeudores"
        element={<SegmentacionDeDeudoresScreen />}
      />

      <Route path="reporteminambiente" element={<ReporteMinAmbienteScreen />} />

      <Route path="informeBDME" element={<InformeBDMEScreen />} />

      <Route path="informaciondeuda" element={<InformacionDeudaScreen />} />

      <Route
        path="asignacionfuncionarios"
        element={<AsignacionFuncionariosScreen />}
      />

      <Route
        path="presentacionexcepciones"
        element={<PresentacionExcepcionesScreen />}
      />

      <Route path="calculadorainteres" element={<CalculadoraInteresScreen />} />

      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default RecaudoRoutes;
