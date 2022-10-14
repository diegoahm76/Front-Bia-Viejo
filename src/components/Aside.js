import Scrollbars from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../actions/userActions";
import LogoCormacarena from "../assets/logos/eps/LogoVertical.svg";
import IconoAlmacen from "../assets/ecology-house-svgrepo-com.svg";
import IconoRecaudo from "../assets/voltmeter-power-svgrepo-com.svg";
import IconoSeguimientoPlanes from "../assets/networking-share-svgrepo-com.svg";
import IconoConservacion from "../assets/sprout-tree-svgrepo-com.svg";
import IconoGestionDocumental from "../assets/recycling-environment-svgrepo-com.svg";
import IconoTramitesServicios from "../assets/analytics-bar-chart-svgrepo-com.svg";
import IconoRecursoHidrico from "../assets/h2o-svgrepo-com.svg";
import IconoAgregarVivero from "../assets/iconosConservacion/add-svgrepo-com.svg";
import IconoGestorVivero from "../assets/iconosConservacion/leaf-svgrepo-com.svg";
import IconoEditarVivero from "../assets/iconosConservacion/edit-svgrepo-com.svg";
import IconoGMaterialVegetal from "../assets/iconosConservacion/sprout-tree-svgrepo-com.svg";
import IconoProduccion from "../assets/iconosConservacion/ecologic-leaf-svgrepo-com.svg";
import IconoSolicitudes from "../assets/iconosConservacion/folder-svgrepo-com.svg";
import IconoDistribucion from "../assets/iconosConservacion/delivery-truck-delivery-svgrepo-com.svg";
import IconoCronograma from "../assets/iconosConservacion/calendar-svgrepo-com.svg";
import IconoConfiguracion from "../assets/iconosConservacion/settings-svgrepo-com.svg";
import IconoCentroNotificacion from "../assets/iconosConservacion/paper-plane-svgrepo-com.svg";
import IconoReportes from "../assets/iconosConservacion/chart-presentation-report-svgrepo-com.svg";
import IconoSolicitudesArticulo from "../assets/iconosAlmacen/reception-hotel-svgrepo-com.svg";
import IconoGestionVehiculo from "../assets/iconosAlmacen/volskwagen-van-svgrepo-com.svg";
import Vineta from "../assets/iconosAlmacen/white-circle-svgrepo-com.svg";
import IconoTablerosDeControl from "../assets/board-svgrepo-com.svg";
import IconoSeguridad from "../assets/padlock-lock-svgrepo-com.svg";
import IconoUser from "../assets/user-svgrepo-com.svg";

const Aside = ({ showAside }) => {
  const userInfo = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  return (
    <aside
      className={`collapse sidenav navbar navbar-vertical ${showAside && "navbar-expand-xs"
        } border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark`}
      id="sidenav-main"
    >
      <Scrollbars style={{ width: "100%", height: "100%" }} autoHide>
        <div className="sidenav-header">
          <Link className="navbar-brand m-0" to="/dashboard">
            <img
              src={LogoCormacarena}
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
            <span className="ms-1 font-weight-bold text-white">
              Bia - Cormacarena
            </span>
          </Link>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div
          className="collapse navbar-collapse w-auto h-auto"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item mb-2 mt-0">
              <a
                data-bs-toggle="collapse"
                href="#ProfileNav"
                className="nav-link text-white"
                aria-controls="ProfileNav"
                role="button"
                aria-expanded="false"
              >
                <img src={IconoUser} alt="user" />
                <span className="nav-link-text ms-2 ps-1">{userInfo.nombre_de_usuario}</span>
              </a>
              <div className="collapse" id="ProfileNav">
                <ul className="nav ">
                  <li className="nav-item">
                    <div
                      className="nav-link text-white "
                      onClick={logoutHandler}
                    >
                      <span className="sidenav-mini-icon"> L </span>
                      <span className="sidenav-normal  ms-3  ps-1">
                        Logout
                      </span>
                    </div>
                  </li>
                  <li className="nav-item active">
                    <Link
                      to="usuario/actualizar-datos-persona"
                      className="nav-link text-white"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Actualizar Datos
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link
                      to="usuario/actualizar-datos-empresa"
                      className="nav-link text-white"
                    >
                      <span className="sidenav-mini-icon"> E </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Actualizar Datos
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <hr className="horizontal light mt-0" />
            <li className="nav-item mb-2 mt-0">
              <a
                data-bs-toggle="collapse"
                href="#tablerosDeControl"
                className="nav-link text-white"
                aria-controls="tablerosDeControl"
                role="button"
                aria-expanded="false"
              >
                <img src={IconoTablerosDeControl} alt="Tableros de control" />
                <span className="nav-link-text ms-2 ps-1">
                  Tableros de control
                </span>
              </a>
              <div className="collapse" id="tablerosDeControl">
                <ul className="nav ">
                  <li className="nav-item active">
                    <Link
                      to="tablerosdecontrol/conservacion"
                      className="nav-link text-white"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Conservacion
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Gestor-vivero"
                    >
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Almacen
                      </span>
                    </a>
                    <div className="collapse " id="Gestor-vivero">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/tablero-de-control/stock"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Stock
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/tablero-de-control/busqueda-articulos-prestados"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Busqueda de articulos prestados
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/tablero-de-control/tabla-inventario"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Tabla inventario
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <hr className="horizontal light mt-0" />

            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#almacen"
                className="nav-link text-white"
                aria-controls="almacen"
                role="button"
                aria-expanded="false"
              >
                <img src={IconoAlmacen} alt="almacen" />
                <span className="nav-link-text ms-2 ps-1">Almacén</span>
              </a>
              <div className="collapse" id="almacen">
                <ul className="nav ">
                <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#entradaYSalidaDeArticulos"
                    >
                      <img
                        src={IconoConfiguracion}
                        alt="Configuracion" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Entrada y salida de articulos
                      </span>
                    </a>
                    <div className="collapse " id="entradaYSalidaDeArticulos">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/entrada-y-salida-de-articulos/entrada-articulo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Entrada de Articulos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="almacen/entrada-y-salida-de-articulos/apropiacion-articulo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Apropiación de Articulos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/entrada-y-salida-de-articulos/creacion-articulo-consumo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Creación de Articulos Consumo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/entrada-y-salida-de-articulos/creacion-articulo-devolutivo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Creación de Articulos Devolutivo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/entrada-y-salida-de-articulos/visualizar-articulos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Visualizar Articulos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/entrada-y-salida-de-articulos/salida-articulos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                            Salida de Articulos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/entrada-y-salida-de-articulos/registro-baja"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                             Registro de Baja
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#configuracionAlmacen"
                    >
                      <img
                        src={IconoConfiguracion}
                        alt="Configuracion" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Configuracion
                      </span>
                    </a>
                    <div className="collapse " id="configuracionAlmacen">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/alertasmantenimientoactivo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Alertas para mantenimiento <br /> de activos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="almacen/configuracion/alertasdevolucionprestamo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Alertas para devolución <br /> de préstamos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/alertasmantenimientovehiculo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Alertas para mantenimiento  <br /> de vehículos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/alertasvencimientodocumentacionvehiculos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Alertas para vencimiento <br /> de documentación <br />
                              de vehículos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/alertasllegadavehiculos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Alertas para la llegada <br /> de vehículos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/busquedapersonal"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Búsqueda de Personal  <br /> de la corporación
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/creacionbodega"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Creación de Bodegas
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/registroconductoresexternos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Registro de conductores <br /> Externos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/traspasoelementosbodegas"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Traspaso de Elementos <br />en  Bodegas

                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#gestionDeInventario"
                    >
                      <img
                        src={IconoConfiguracion}
                        alt="Configuracion" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Gestion de inventario
                      </span>
                    </a>
                    <div className="collapse " id="gestionDeInventario">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/busqueda-activos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Busqueda de activos a <br /> subdelegados
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="almacen/gestion-de-inventario/reasignacion-elementos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                             Reasignacion elementos <br /> subasignados
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/subasignar-elementos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Subasignar elementos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/cv-vehiculo-externo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Hoja de vida <br /> vehiculo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/cv-otros-activos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Hoja de vida de <br /> otros activos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/cv-vehiculo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Hoja de vida de  <br /> vehiculos externos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/cv-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Hoja de vida de <br /> activos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/programacion-mantenimiento"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Programacion de mantenimiento
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/configuracion/traspasoelementosbodegas"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Transpaso de Elementos <br />en  Bodegas

                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/reasignarelementosentrefuncionarios"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reasignar elementos <br /> entre funcionarios
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="almacen/gestion-de-inventario/despacharelementosconsumo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                             Despachar elementos <br /> para consumo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/asignaractivoscalidadprestamo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Asignar activos en <br /> calidad de prestamos
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/despachoelementossinsolicitud"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Despacho de elementos <br /> sin solicitud
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                           to="almacen/gestion-de-inventario/devolverelementossubasignadosresponsable"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Devolver elementos <br /> subasignados al responsable
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/devolveractivoasignado"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Devolver activo  <br /> asignado
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-inventario/devolveractivocalidadprestamo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                             Devolver activo en <br /> calidad de préstamo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                           to="almacen/gestion-de-inventario/formulariorevisioninventario"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Formulario de revisión de inventario
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#solicitudesArticulos"
                    >
                      <img
                        src={IconoSolicitudesArticulo}
                        alt="solicitudesArticulos"
                      />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Solicitudes de articulos
                      </span>
                    </a>
                    <div className="collapse " id="solicitudesArticulos">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/solicitud-asignacion-articulo-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitud de asignación <br /> un artículo activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="almacen/solicitudes-articulos/autorizar-solicitud-asignacion-articulo-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Autorizar solicitud de <br /> asignación de un
                              artículo <br /> activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/solicitar-articulos-consumo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitud de artículo <br />
                              de consumo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/solicitar-elemento-consumo-vivero"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitud de artículo <br />
                              de consumo para vivero
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/autorizar-solicitudes-consumo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Autorización de solicitud <br /> de consumo por
                              jefe
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/solicitud-activo-prestamo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitud de Activo <br />
                              en Préstamo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/autorizar-solicitud-activo-prestamo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Autorización de solicitud <br />
                              de activo en préstamo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/solicitud-vehiculo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitud de vehiculo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/solicitudes-asignacion-pendientes"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitudes de asignación
                              <br /> pendientes
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/solicitudes-pendientes-autorizar"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitudes de prestamo <br /> pendientes
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/solicitudes-articulos/solicitudes-autorizadas-pendientes"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitudes autorizadas <br />
                              pendientes
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#reportesAlmacen"
                    >
                      <img
                        src={IconoReportes}
                        alt="solicitudesArticulos"
                      />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Reportes
                      </span>
                    </a>
                    <div className="collapse " id="reportesAlmacen">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-historico-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte historico de un activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="almacen/reportes/consulta-paz-y-salvo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Consultar paz y salvo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-inventario"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de inventario
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-inventario-por-persona-o-grupo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de inventario <br /> por persona o grupo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-entrada-de-almacen"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de entrada de activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-solicitud-de-asiganacion"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de solicitud de<br /> asignacion de activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-asignacion-de-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de asignacion <br />de activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-devolucion-de-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de devolucion <br /> de activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-baja"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de baja
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-reasigancion-funcionarios"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de reasigancion <br /> entre funcionarios
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-estado-de-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte segun el estado <br /> de activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-prestamos-pendientes-por-devolucion"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de prestamos <br /> pendiente por devolucion
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-solicitudes-de-vehiculos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de solicitud <br /> de vehiculo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-solicitudes-de-vehiculos-completada"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de solicitud <br /> de vehiculo ejecutada
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/registro-de-mantenimiento-de-computo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Registro de mantenimiento <br /> de computo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-estado-de-mantenimiento-de-un-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de estado de <br /> mantenimiento de un activo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-solicitud-de-prestamo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de solicitud <br /> de prestamo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-despacho-de-prestamo-de-activo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de despacho de <br />activo en
                              calidad de prestamo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-devolucion-de-prestamo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de devolucion de <br />activo en
                              calidad de prestamo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-entrada-de-consumo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de entrada <br />
                              de consumo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-solicitud-de-consumo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de solicitud <br /> de consumo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-despacho-de-consumo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de despacho <br /> de consumo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-de-consumo-por-funcionario"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de consumo <br /> por funcionario
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-existencias-de-consumo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de existencias <br /> de consumo
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/reportes/reporte-stock-de-articulos"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reporte de stock <br /> maximo y minimo
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#gestionVehiculos"
                    >
                      <img
                        src={IconoGestionVehiculo}
                        alt="gestionVehiculos"
                      />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Gestión de vehículo
                      </span>
                    </a>
                    <div className="collapse " id="gestionVehiculos">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="almacen/gestion-de-vehiculos/asignacion-vehiculo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitud de asignación
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="almacen/gestion-de-vehiculos/reprogramar-solicitud-vehiculo"
                          >
                            <img src={Vineta} alt="vineta" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Reprogramar solicitud<br /> de vehiculo
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="almacen/reportes"
                    >
                      <span className="sidenav-mini-icon"> R </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Reportes{" "}
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#pagesExamples"
                className="nav-link text-white "
                aria-controls="pagesExamples"
                role="button"
                aria-expanded="false"
              >
                <img src={IconoRecaudo} alt="Recaudo" />
                <span className="nav-link-text ms-2 ps-1">Recaudó</span>
              </a>
              <div className="collapse " id="pagesExamples">
                <ul className="nav ">
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="recaudo/facturacion"
                    >
                      <span className="sidenav-mini-icon"> F </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Facturación{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="recaudo/pagosenlinea"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Pagos en linea{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="recaudo/gestordeudores"
                    >
                      <span className="sidenav-mini-icon"> G </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Gestor deudores{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="recaudo/facilidadesdepago"
                    >
                      <span className="sidenav-mini-icon"> F </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Facilidades de pago{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="recaudo/cobropersuasivo"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Cobro persuasivo{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="recaudo/cobrocoactivo"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Cobro coactivo{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="recaudo/portalreportes"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Portal reportes{" "}
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#applicationsExamples"
                className="nav-link text-white "
                aria-controls="applicationsExamples"
                role="button"
                aria-expanded="false"
              >
                <img src={IconoSeguimientoPlanes} alt="Seguimiento planes" />
                <span className="nav-link-text ms-2 ps-1">
                  Seguimiento planes
                </span>
              </a>
              <div className="collapse " id="applicationsExamples">
                <ul className="nav ">
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/crm.html"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Creacion PAI{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/kanban.html"
                    >
                      <span className="sidenav-mini-icon"> S </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Seguimiento PAI{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/wizard.html"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Creacion POAI{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/datatables.html"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Creacion PAA{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/calendar.html"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Consulta de Historicos
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#conservacion"
                className="nav-link text-white"
                aria-controls="conservacion"
                role="button"
                aria-expanded="false"
              >
                <img src={IconoConservacion} alt="Conservacion" />
                <span className="nav-link-text ms-2 ps-1">Conservación</span>
              </a>
              <div className="collapse" id="conservacion">
                <ul className="nav ">
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Gestor-vivero"
                    >
                      <img src={IconoGestorVivero} alt="Gestor vivero" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Gestor Vivero
                      </span>
                    </a>
                    <div className="collapse " id="Gestor-vivero">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestorvivero/agregarvivero"
                          >
                            <img
                              src={IconoAgregarVivero}
                              className="sidenav-mini-icon"
                              alt="Agregar vivero"
                            />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Agregar Vivero
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestorvivero/editarvivero"
                          >
                            <img src={IconoEditarVivero} alt="Editar vivero" />
                            <span className="sidenav-normal  ms-2  ps-1">
                              Editar Vivero
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <a
                            className="nav-link text-white "
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            href="#inventario"
                          >
                            <span className="sidenav-mini-icon"> I </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Inventario
                            </span>
                          </a>
                          <div className="collapse " id="inventario">
                            <ul className="nav nav-sm flex-column">
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/propagacion"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Propagacion
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/produccionpropia"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Produccion propia
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/plantasencuarentena"
                                >
                                  <span className="sidenav-normal ms-2 ps-1">
                                    Plantas en cuarentena
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/compensacion"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Compensacion
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/donacion"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Donacion{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/medidasderesarcimiento"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Medidas de resarcimiento
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/insumos"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Insumos
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/herramientas"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Herramientas
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/disponiblematerialvegetal"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Disponible Material Vegetal
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#GestorMaterialVegetal"
                    >
                      <img
                        src={IconoGMaterialVegetal}
                        alt="vineta"
                      />
                      <span className="sidenav-normal  ms-2  ps-1">
                        G. material vegetal
                      </span>
                    </a>
                    <div className="collapse " id="GestorMaterialVegetal">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestormaterialvegetal/crearproduccionpropia"
                          >
                            <span className="sidenav-mini-icon"> p </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Crear produccion propia
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="conservacion/gestormaterialvegetal/materialvegetalsembrado"
                          >
                            <span className="sidenav-mini-icon"> M </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Material vegetal sembrado
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestormaterialvegetal/editarmaterialvegetal"
                          >
                            <span className="sidenav-mini-icon"> E </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Editar material vegetal
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestormaterialvegetal/cuarentenadematerialvegetal"
                          >
                            <span className="sidenav-mini-icon"> C </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Cuarentena material vegetal
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestormaterialvegetal/activarmaterialvegetal"
                          >
                            <span className="sidenav-mini-icon"> A </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Activar material vegetal
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Produccion"
                    >
                      <img src={IconoProduccion} alt="Produccion" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Produccion
                      </span>
                    </a>
                    <div className="collapse " id="Produccion">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white"
                            to="conservacion/produccion/controlyseguimientodematerialvegetal"
                          >
                            <span className="sidenav-mini-icon"> C </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Control y seguimiento de <br /> material vegetal
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/produccion/etapasdematerialvegetal"
                          >
                            <span className="sidenav-mini-icon"> E </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Etapas de material vegetal
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#projectsExample"
                    >
                      <img src={IconoSolicitudes} alt="Solicitudes" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        solicitudes de <br />
                        material vegetal
                      </span>
                    </a>
                    <div className="collapse " id="projectsExample">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/solicitudes/solicitudesrealizadasavivero"
                          >
                            <span className="sidenav-mini-icon"> G </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitudes realizadas <br />a vivero
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/solicitudes/historialdesolicitudes"
                          >
                            <span className="sidenav-mini-icon"> T </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Historial de solicitudes
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/solicitudes/consultainformesdecaracterizacion"
                          >
                            <span className="sidenav-mini-icon"> N </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Consulta de informes <br />
                              de caracterizacion
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Distrubucion"
                    >
                      <img src={IconoDistribucion} alt="Distribucion" />
                      <span className="sidenav-normal ms-2 ps-1">
                        Distrubucion
                      </span>
                    </a>
                    <div className="collapse " id="Distrubucion">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/distribucion/solicitudesdematerial"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Solicitud de material <br />
                              vegetal
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/distribucion/movermaterialvegetal"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Mover material vegetal
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/distribucion/historialdemovimientos"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Historial de movimientos
                            </span>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          <a
                            className="nav-link text-white "
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            href="#entregaDeMaterial"
                          >
                            <span className="sidenav-mini-icon"> I </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              Entrega de material <br />
                              vegetal
                            </span>
                          </a>
                          <div className="collapse " id="entregaDeMaterial">
                            <ul className="nav nav-sm flex-column">
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/distribucion/entregamv/entregados"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Material vegetal entregado
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/distribucion/entregamv/pendientes"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    Material vegetal pendiente
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="conservacion/cronograma"
                    >
                      <img src={IconoCronograma} alt="Cronograma" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Cronograma
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white"
                      to="conservacion/reportes"
                    >
                      <img src={IconoReportes} alt="Reportes" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Reportes
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="conservacion/configuracion"
                    >
                      <img src={IconoConfiguracion} alt="Configuracion" />
                      <span className="sidenav-normal  ms-2  ps-1">
                        Configuracion
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#CentroNotificaciones"
                    >
                      <img
                        src={IconoCentroNotificacion}
                        alt="Centro de notificaciones"
                      />
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Centro de <br />
                        Notificaciones <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="CentroNotificaciones">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-default.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Default{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/vr/vr-info.html"
                          >
                            <span className="sidenav-mini-icon"> V </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              VR Info{" "}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#authExamples"
                className="nav-link text-white "
                aria-controls="authExamples"
                role="button"
                aria-expanded="false"
              >
                {/* <i className="material-icons-round {% if page.brand == 'RTL' %}ms-2{% else %} me-2{% endif %}">
                  content_paste
                </i> */}
                <img src={IconoGestionDocumental} alt="Gestion documental" />
                <span className="nav-link-text ms-2 ps-1">
                  Gestión documental
                </span>
              </a>
              <div className="collapse " id="authExamples">
                <ul className="nav ">
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/wizard.html"
                    >
                      <span className="sidenav-mini-icon"> R </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Radicación{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/datatables.html"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Ventanilla Única{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/applications/calendar.html"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Gestión de Expedientes{" "}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#basicExamples"
                className="nav-link text-white "
                aria-controls="basicExamples"
                role="button"
                aria-expanded="false"
              >
                {/* <i className="material-icons-round {% if page.brand == 'RTL' %}ms-2{% else %} me-2{% endif %}">
                  upcoming
                </i> */}
                <img src={IconoTramitesServicios} alt="Tramites y servicios" />
                <span className="nav-link-text ms-2 ps-1">
                  Trámites y servicios
                </span>
              </a>
              <div className="collapse " id="basicExamples">
                <ul className="nav ">
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="https://www.creative-tim.com/learning-lab/bootstrap/alerts/material-dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Tramites{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="https://www.creative-tim.com/learning-lab/bootstrap/badge/material-dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1"> CYS </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="https://www.creative-tim.com/learning-lab/bootstrap/buttons/material-dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        PQRSD{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="https://www.creative-tim.com/learning-lab/bootstrap/cards/material-dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sidenav-mini-icon"> O </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Otros{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="https://www.creative-tim.com/learning-lab/bootstrap/cards/material-dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sidenav-mini-icon"> R </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Revision y aprobacion{" "}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#componentsExamples"
                className="nav-link text-white "
                aria-controls="componentsExamples"
                role="button"
                aria-expanded="false"
              >
                <img src={IconoRecursoHidrico} alt="Recurso hidrico" />
                <span className="nav-link-text ms-2 ps-1">Recurso hídrico</span>
              </a>
              <div className="collapse " id="componentsExamples">
                <ul className="nav ">
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="https://www.creative-tim.com/learning-lab/bootstrap/alerts/material-dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Alerts{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="https://www.creative-tim.com/learning-lab/bootstrap/badge/material-dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sidenav-mini-icon"> B </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Badge{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="https://www.creative-tim.com/learning-lab/bootstrap/buttons/material-dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sidenav-mini-icon"> B </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Buttons{" "}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#seguridad"
                className="nav-link text-white"
                aria-controls="seguridad"
                role="button"
                aria-expanded="false"
              >
                <img src={IconoSeguridad} alt="Seguridad" />
                <span className="nav-link-text ms-2 ps-1">Seguridad</span>
              </a>
              <div className="collapse " id="seguridad">
                <ul className="nav ">
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="seguridad/administradordepersonas"
                    >
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Administrador de <br /> personas
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="seguridad/administradordeempresas"
                    >
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Administrador de <br /> empresas
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="seguridad/roles"
                    >
                      <span className="sidenav-mini-icon"> B </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Administrador de <br /> roles
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white "
                      to="seguridad/administradordeusuario"
                    >
                      <span className="sidenav-mini-icon"> B </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Administrador de <br /> usuarios
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </Scrollbars>
    </aside>
  );
};
export default Aside;