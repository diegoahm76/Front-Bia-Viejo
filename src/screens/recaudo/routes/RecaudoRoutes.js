import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

import Recaudo from "../";
// import CobroCoactivoScreen from "../CobroCoactivoScreen";
// import CobroPersuasivoScreen from "../CobroPersuasivoScreen";
// import FacilidadesDePagoScreen from "../FacilidadesDePagoScreen";
// import FacturacionScreen from "../FacturacionScreen";
// import GestorDeudoresScreen from "../GestorDeudoresScreen";
// import PagosEnLineaScreen from "../PagosEnLineaScreen";
// import PortalReportesScreen from "../PortalReportesScreen";

// import ProcesoDeNotificacionScreen from '../gestorNotificacion/ProcesoDeNotificacionScreen'
// import EstadoNotificacionDocumentoCobroScreen from '../gestorNotificacion/EstadoNotificacionDocumentoCobroScreen'

// import DecretoIncumplimientoFacilidadPagoScreen from '../gestorAcuerdosDePago/DecretoIncumplimientoFacilidadPagoScreen'
// import BienesProcesoExtincionDominioScreen from '../gestorInstanciaCobro/BienesProcesoExtincionDominioScreen'
// import DocumentoCobroTUAScreen from '../gestorInstanciaCobro/DocumentoCobroTUAScreen'
// import InformacionCuencasScreen from '../gestorInstanciaCobro/InformacionCuencasScreen'

import ArticulosFijosScreen from '../gestorInstanciaCobro/ArticulosFijosScreen'
import CrearArticulosFijosScreen from '../gestorInstanciaCobro/CrearArticulosFijosScreen'
import CatalogoDeBienesScreen from '../gestorInstanciaCobro/CatalogoDeBienesScreen'

// import ReportesFacilidadesPagoScreen from '../gestorReportes/ReportesFacilidadesPagoScreen'
// import AlertaPreinscripcionScreen from '../gestorReportes/AlertaPreinscripcionScreen'
// import ReportesIngresosDeRecaudosScreen from '../gestorReportes/ReporteIngresosDeRecaudosScreen'
// import OficiosEpsScreen from '../gestorReportes/OficiosEpsScreen'
// import OficioEntidadesBancariasScreen from '../gestorReportes/OficioEntidadesBancariasScreen'
// import OficioRegistraduriaScreen from '../gestorReportes/OficioRegistraduriaScreen'
// import OficioRegistroPropiedadScreen from '../gestorReportes/OficioRegistroPropiedadScreen'

// import PagoDeObligacionesEnLineaScreen from '../gestorPagosEnLinea/PagoDeObligacionesEnLineaScreen'
// import RevisionPagoDeLaObligacionScreen from '../gestorPagosEnLinea/RevisionPagoDeLaObligacionScreen'

// import SeguimientoCondicionesTuaTrScreen from '../gestorInstanciaCobro/SeguimientoCondicionesTuaTrScreen'

//import OficioDianScreen from '../gestorReportes/OficioDianScreen'
const RecaudoRoutes = () => {
  return (
    <Routes>

      <Route index element={<Recaudo />} />

      {/* <Route path="facturacion" element={<FacturacionScreen />} />

      <Route path="cobrocoactivo" element={<CobroCoactivoScreen />} />

      <Route path="cobropersuasivo" element={<CobroPersuasivoScreen />} />

      <Route path="facilidadesdepago" element={<FacilidadesDePagoScreen />} />

      <Route path="gestordeudores" element={<GestorDeudoresScreen />} />

      <Route path="pagosenlinea" element={<PagosEnLineaScreen />} />

      <Route path="portalreportes" element={<PortalReportesScreen />} /> */}


      <Route path="gestor-notificacion">

        {/* <Route path="proceso-de-notificacion" element={<ProcesoDeNotificacionScreen />} />

        <Route path="estado-de-notificacion-documentos" element={<EstadoNotificacionDocumentoCobroScreen />} />

        <Route path="decreto-incumplimiento-pago" element={<DecretoIncumplimientoFacilidadPagoScreen />} /> */}

        {/* <Route path="pago-oblicaciones-linea" element={<PagoDeObligacionesEnLineaScreen />} />

        <Route path="revision-pago-obligacion" element={<RevisionPagoDeLaObligacionScreen />} />

        <Route path="seguimiento-condiciones" element={<SeguimientoCondicionesTuaTrScreen />} />

        <Route path="reportes-ingresos-recaudos" element={<ReportesIngresosDeRecaudosScreen />} />
        
        <Route path="alerta" element={<AlertaPreinscripcionScreen />} />

        <Route path="reportes-facilidad" element={<ReportesFacilidadesPagoScreen />} />

        <Route path="oficio-dian" element={<OficioDianScreen />} />

        <Route path="oficio-eps" element={<OficiosEpsScreen />} />

        <Route path="oficio-entidades-bancos" element={<OficioEntidadesBancariasScreen />} />

        <Route path="oficio-de-registraduria" element={<OficioRegistraduriaScreen />} />

        <Route path="oficio-registro-propiedad" element={<OficioRegistroPropiedadScreen />} /> */}
        {/* <Route path="bienes-proceso-extincion-dominio" element={<BienesProcesoExtincionDominioScreen />} />
        <Route path="documento-cobro-tua" element={<DocumentoCobroTUAScreen />} />
        <Route path="informacion-cuencas-hidricas" element={<InformacionCuencasScreen />} /> */}
        {/* //Eliminar Almacen// */}
        <Route path="entrada-articulos-fijos" element={<ArticulosFijosScreen/>} />
        <Route path="crear-entrada-articulos-fijos" element={<CrearArticulosFijosScreen/>} />
        <Route path="catalogo-bienes-Screen" element={<CatalogoDeBienesScreen/>} />

      </Route>



      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};

export default RecaudoRoutes;
