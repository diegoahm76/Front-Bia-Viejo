import { Route, Routes } from "react-router-dom"
import ActualizarDatosEmpresaScreen from "../ActualizarDatosEmpresaScreen"
import ActualizarDatosPersonaScreen from "../ActualizarDatosPersonaScreen"

const UsuarioRoutes = () => {
  return (
    <Routes>
      <Route path="actualizar-datos-empresa" element={<ActualizarDatosEmpresaScreen />} />

      <Route path="actualizar-datos-persona" element={<ActualizarDatosPersonaScreen />} />

    </Routes>
  )
}
export default UsuarioRoutes