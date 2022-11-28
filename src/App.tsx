import { Navigate, Route, Routes } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import HomeScreen from "./screens/layout/HomeScreen";
import LoginScreen from "./screens/auth/LoginScreen";
// import LogoScreen from "./screens/LogoScreen";

// import AlmacenRoutes from "./screens/almacen/routes/AlmacenRoutes";
// import RecaudoRoutes from "./screens/recaudo/routes/RecaudoRoutes";
// import ConservacionRoutes from "./screens/conservacion/routes/ConservacionRoutes";
// import GestorDocumentalRoutes from "./screens/gestorDocumental/routes/GestorDocumentalRoutes";
// import TramitesYServiciosRoutes from "./screens/tramitesYServicios/routes/TramitesYServiciosRoutes";
// import ProtectedRoutes from "./components/ProtectedRoutes";
// import { getDataFromLocalStorage } from "./actions/userActions";
// import TablerosDeControlRoutes from "./screens/tablerosDeControl/routes/TablerosDeControlRoutes";
// import RegisterPersonaScreen from "./screens/auth/register/RegisterPersonaScreen";
// import SeguridadRoutes from "./screens/seguridad/routes/SeguridadRoutes";
// import RecuperacionDeContrasenaScreen from "./screens/auth/recuperarContrasena/RecuperacionDeContrasenaScreen";
// import ActualizarContrasenaScreen from "./screens/auth/recuperarContrasena/ActualizarContrasenaScreen";
// import RegisterUserScreen from "./screens/auth/register/RegisterUserScreen";
// import UsuarioRoutes from "./screens/usuario/routes/UsuarioRoutes";
// import RecursoHidricoRoutes from "./screens/recursoHidrico/routes/RecursoHidricoRoutes";
// import ConfirmarCuentaScreen from "./screens/auth/ConfirmarCuentaScreen";
// import AdminProtectedRoutes from "./components/AdminProtectedRoutes";
// import UserProtectedRoutes from "./components/UserProtectedRoutes";
// import DesbloqueoUsuarioScreen from "./screens/auth/desbloqueoUsuario/DesbloqueoUsuarioScreen";
// import ActualizarContrasenaScreenBloqueo from "./screens/auth/recuperarContrasena/ActualizarContrasenaScreenBloqueo";
import React from "react";

function App() {
  // const dispatch = useDispatch();

  // dispatch(getDataFromLocalStorage());

  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
    </Routes>
    // <Routes>
    //   <Route>
    //     {/* <Route path="/dashboard" element={<HomeScreen />}>
    //       <Route index element={<LogoScreen />} />

    //       <Route element={<UserProtectedRoutes />}>
    //         <Route
    //           path="tablerosdecontrol/*"
    //           element={<TablerosDeControlRoutes />}
    //         />

    //         <Route path="almacen/*" element={<AlmacenRoutes />} />

    //         <Route path="recaudo/*" element={<RecaudoRoutes />} />

    //         <Route path="conservacion/*" element={<ConservacionRoutes />} />

    //         <Route path="usuario/*" element={<UsuarioRoutes />} />

    //         <Route
    //           path="recurso-hidrico/*"
    //           element={<RecursoHidricoRoutes />}
    //         />

    //         <Route
    //           path="gestordocumental/*"
    //           element={<GestorDocumentalRoutes />}
    //         />

    //         <Route
    //           path="tramitesyservicios/*"
    //           element={<TramitesYServiciosRoutes />}
    //         />
    //       </Route>

    //       <Route element={<AdminProtectedRoutes />}>
    //         <Route path="seguridad/*" element={<SeguridadRoutes />} />
    //       </Route>
    //     </Route> */}

    //     <Route path="/login" element={<LoginScreen />} />
    //   </Route>

    //   {/* <Route
    //     element={<ProtectedRoutes negate={true} redirectTo={"/dashboard"} />}>
    //     <Route path="/login" element={<LoginScreen />} />

    //     <Route path="/register" element={<RegisterPersonaScreen />} />

    //     <Route path="/registeruser" element={<RegisterUserScreen />} />

    //     <Route
    //       path="/confirmar-cuenta/:token"
    //       element={<ConfirmarCuentaScreen />}
    //     />

    //     <Route
    //       path="/desbloqueo-usuario"
    //       element={<DesbloqueoUsuarioScreen />}
    //     />

    //     <Route
    //       path="/recuperar-contrasena"
    //       element={<RecuperacionDeContrasenaScreen />}
    //     />

    //     <Route path="/actualizar-contrasena" element={<ActualizarContrasenaScreen />} />

    //     <Route path="/actualizar-contrasena-bloqueo" element={<ActualizarContrasenaScreenBloqueo />} />

    //     <Route index element={<Navigate to="/login" />} />
    //   </Route> */}
    // </Routes>
  );
}

export default App;
