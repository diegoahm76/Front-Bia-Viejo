import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import LogoCormacarena from "../assets/logos/Web-Bia-logo.png";
import IconoTablerosDeControl from "../assets/sub-sistema-Tablerosdecontrol1.svg";
import IconoAlmacen from "../assets/Sub-sistema-Almacen.svg";
import IconoRecaudo from "../assets/Sub-sistema-Recaudo.svg";
import IconoSeguimientoPlanes from "../assets/Sub-sistema-SeguimientoPlanes.svg";
import IconoConservacion from "../assets/Sub-sistema-Conservacion.svg";
import IconoGestionDocumental from "../assets/Sub-sistema-GestionDocumental.svg";
import IconoTramitesServicios from "../assets/Sub-sistema-Tramitesyservicios.svg";
import IconoRecursoHidrico from "../assets/Sub-sistema-RecursoHidrico.svg";
import IconoAgregarVivero from "../assets/iconosConservacion/add-svgrepo-com.svg";
import IconoGestorVivero from "../assets/iconosConservacion/leaves-plant-svgrepo-com.svg";
import IconoEditarVivero from "../assets/iconosConservacion/edit-svgrepo-com.svg";
import IconoGMaterialVegetal from "../assets/iconosConservacion/leaves-plant-svgrepo-gestorcom.svg";
import IconoProduccion from "../assets/iconosConservacion/clean-industry-svgrepo-com.svg";
import IconoSolicitudes from "../assets/iconosConservacion/eco-organization-svgrepo-com.svg";
import IconoDistribucion from "../assets/iconosConservacion/ecologic-planet-svgrepo-com.svg";
import IconoCronograma from "../assets/iconosConservacion/calendar-svgrepo-com.svg";
import IconoConfiguracion from "../assets/iconosAlmacen/config-svgrepo-com.svg";
import IconoCentroNotificacion from "../assets/iconosConservacion/paper-plane-svgrepo-com.svg";
import IconoReportes from "../assets/iconosAlmacen/market-research-svgrepo-com.svg";
import IconoSolicitudesArticulo from "../assets/iconosAlmacen/cart-basket-ecommerce-svgrepo-com.svg";
import IconoGestionVehiculo from "../assets/iconosAlmacen/delivery-logistics-vehicle-svgrepo-com.svg";
import Vineta from "../assets/iconosAlmacen/white-circle-svgrepo-com.svg";
import IconoSeguridad from "../assets/sub-sistema-seguridad1.svg";
import IconoUser from "../assets/imgs/perfil.svg";
import IconoEntradaYSalida from "../assets/iconosAlmacen/eco-store-svgrepo-com.svg";
import IconoGestioDeInventario from "../assets/iconosAlmacen/receptionist-svgrepo-com.svg";
import Iconocuarentena from "../assets/iconosConservacion/cuarentena.png"

import IconoEstacionesHidrometereologicas from "../assets/iconosRecursoHidrico/Sub-sistema-EstacionesHidrometereologicas.svg";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { logoutUser } from "../store/slices/Login";

const Aside = ({ showAside }) => {
  const userInfo = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    logoutUser(dispatch);
  };

  return (
    <aside
      className={`collapse sidenav navbar navbar-vertical ${showAside && "navbar-expand-xs"
        } fixed-start bg-terciary`}
      id="sidenav-main"
      style={{
        minWidth: "273px",
      }}
    >
      <Scrollbars style={{ width: "100%", height: "100%" }} autoHide>
        <div className="sidenav-header text-center mb-2">
          <Link className="m-0 text-center" to="/dashboard">
            <img
              src={LogoCormacarena}
              className="h-100"
              alt="main_logo"
              style={{ padding: "15px 0" }}
            />
          </Link>
        </div>
        <div
          className="collapse navbar-collapse w-auto h-auto"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <img
              src={IconoUser}
              className="px-5 mb-3 rounded rounded-circle"
              alt="user"
            />
            <li className="nav-item mb-2 mt-0">
              <a
                data-bs-toggle="collapse"
                href="#ProfileNav"
                className="text-white text-center"
                aria-controls="ProfileNav"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-text ms-2 ps-1 d-block text-center">
                  {userInfo.userSesion
                    ? userInfo?.userSesion
                    : userInfo?.userinfo.nombre_de_usuario}
                </span>
              </a>
              <div className="collapse" id="ProfileNav">
                <ul className="nav ">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      onClick={logoutHandler}
                      to={""}
                    >
                      <span className="sidenav-mini-icon"> F </span>
                      <span className="sidenav-normal  ms-3  ps-1">
                        Cerrar sesión
                      </span>
                    </Link>
                  </li>
                  {!userInfo?.userinfo.is_superuser && (
                    <>
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
                    </>
                  )}
                </ul>
              </div>
            </li>
            <hr className="horizontal light mt-0" />

            {!userInfo?.userinfo.is_superuser && (
              <>
                <li className="nav-item mb-2 mt-0">
                  <a
                    data-bs-toggle="collapse"
                    href="#tablerosDeControl"
                    className="nav-link text-white"
                    aria-controls="tablerosDeControl"
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="sidenav-mini-icon">
                      {" "}
                      <img
                        src={IconoTablerosDeControl}
                        alt="Tableros de control"
                      />{" "}
                    </span>

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
                          href="#panelAlmacen"
                        >
                          <span className="sidenav-mini-icon"> A </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Almacen
                          </span>
                        </a>
                        <div className="collapse " id="panelAlmacen">
                          <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/tablero-de-control/stock"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                    <span className="sidenav-mini-icon">
                      <img src={IconoAlmacen} alt="almacen" />
                    </span>
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
                          <span className="sidenav-mini-icon">
                            <img
                              src={IconoEntradaYSalida}
                              alt="Configuracion"
                            />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Entrada y salida de <br /> articulos
                          </span>
                        </a>
                        <div
                          className="collapse "
                          id="entradaYSalidaDeArticulos"
                        >
                          <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/entrada-y-salida-de-articulos/catalogo-bienes"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Catalogo de bienes
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/entrada-y-salida-de-articulos/entrada-articulo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoConfiguracion} alt="Configuracion" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Configuracion
                          </span>
                        </a>
                        <div className="collapse " id="configuracionAlmacen">
                          <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/configuracion/creacionbodega"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Creación de Bodegas
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/configuracion/alertasmantenimientoactivo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Alertas para mantenimiento <br /> de vehículos
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/configuracion/alertasvencimientodocumentacionvehiculos"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Alertas para vencimiento <br /> de
                                  documentación <br />
                                  de vehículos
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/configuracion/alertasllegadavehiculos"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Búsqueda de Personal <br /> de la corporación
                                </span>
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/configuracion/registroconductoresexternos"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Traspaso de Elementos <br />
                                  en Bodegas
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
                          <span className="sidenav-mini-icon">
                            <img
                              src={IconoGestioDeInventario}
                              alt="Configuracion"
                            />
                          </span>

                          <span className="sidenav-normal  ms-2  ps-1">
                            Gestion de inventario
                          </span>
                        </a>
                        <div className="collapse " id="gestionDeInventario">
                          <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/gestion-de-inventario/cv-otros-activos"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Hoja de vida de <br /> un vehiculo
                                </span>
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/gestion-de-inventario/cv-computo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Hoja de vida de <br /> computo
                                </span>
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/gestion-de-inventario/programacion-mantenimiento"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Programacion de <br /> mantenimiento
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/gestion-de-inventario/busqueda-activos"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Subasignar elementos
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/configuracion/traspasoelementosbodegas"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Transpaso de Elementos <br />
                                  en Bodegas
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/gestion-de-inventario/asignaractivo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Asignación de <br /> activos fijos
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/gestion-de-inventario/reasignarelementosentrefuncionarios"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Devolver elementos <br /> subasignados al
                                  responsable
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/gestion-de-inventario/devolveractivoasignado"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Devolver activo <br /> asignado
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/gestion-de-inventario/devolveractivocalidadprestamo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Formulario de revisión <br /> de inventario
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
                          <span className="sidenav-mini-icon">
                            <img
                              src={IconoSolicitudesArticulo}
                              alt="solicitudesArticulos"
                            />
                          </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Solicitud de asignación <br /> un artículo
                                  activo
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white"
                                to="almacen/solicitudes-articulos/autorizar-solicitud-asignacion-articulo-activo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Autorización de solicitud <br /> de consumo
                                  por jefe
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/solicitudes-articulos/solicitud-activo-prestamo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                          <span className="sidenav-mini-icon">
                            <img
                              src={IconoReportes}
                              alt="solicitudesArticulos"
                            />
                          </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte historico de <br /> un activo
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white"
                                to="almacen/reportes/consulta-paz-y-salvo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de inventario <br /> por persona o
                                  grupo
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/reporte-entrada-de-almacen"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de solicitud de
                                  <br /> asignacion de activo
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/reporte-asignacion-de-activo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de asignacion <br />
                                  de activo
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/reporte-de-devolucion-de-activo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de reasigancion <br /> entre
                                  funcionarios
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/reporte-de-estado-de-activo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de prestamos <br /> pendiente por
                                  devolucion
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/reporte-de-solicitudes-de-vehiculos"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de solicitud <br /> de vehiculo
                                  ejecutada
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/registro-de-mantenimiento-de-computo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de estado de <br /> mantenimiento de
                                  un activo
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/reporte-de-solicitud-de-prestamo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de despacho de <br />
                                  activo en calidad de prestamo
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/reporte-de-devolucion-de-prestamo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reporte de devolucion de <br />
                                  activo en calidad de prestamo
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="almacen/reportes/reporte-de-entrada-de-consumo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                          <span className="sidenav-mini-icon">
                            <img
                              src={IconoGestionVehiculo}
                              alt="gestionVehiculos"
                            />
                          </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
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
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reprogramar solicitud
                                  <br /> de vehiculo
                                </span>
                              </Link>
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
                    href="#pagesExamples"
                    className="nav-link text-white "
                    aria-controls="pagesExamples"
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="sidenav-mini-icon">
                      <img src={IconoRecaudo} alt="Recaudo" />
                    </span>
                    <span className="nav-link-text ms-2 ps-1">Recaudo</span>
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
                    <img
                      src={IconoSeguimientoPlanes}
                      alt="Seguimiento planes"
                    />
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
                    <span className="sidenav-mini-icon">
                      <img src={IconoConservacion} alt="Conservacion" />
                    </span>
                    <span className="nav-link-text ms-2 ps-1">
                      Conservación
                    </span>
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoGestorVivero} alt="Gestor vivero" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Gestor Vivero
                          </span>
                        </a>
                        <div className="collapse " id="Gestor-vivero">
                          <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="conservacion/gestorvivero/administrarvivero"
                              >
                                <img
                                  src={IconoAgregarVivero}
                                  className="sidenav-mini-icon"
                                  alt="Agregar vivero"
                                />
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Administración de Vivero
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="conservacion/gestorvivero/aperturaycierre"
                              >
                                <img
                                  src={IconoEditarVivero}
                                  alt="Apertura y cierre vivero"
                                />
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Apertura y cierre de Vivero
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="conservacion/gestorvivero/cuarentenavivero"
                              >
                                <img
                                  src={Iconocuarentena}
                                  style={{ width: "15px", height: "15px" }}
                                  alt="Cuarentena vivero"
                                />

                                <span className="sidenav-normal  ms-2  ps-1">
                                  Cuarentena de Vivero
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoGMaterialVegetal} alt="vineta" />
                          </span>
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
                                to="conservacion/gestormaterialvegetal/crearmaterialvegetalsembrado"
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoProduccion} alt="Produccion" />
                          </span>
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
                                  Control y seguimiento de <br /> material
                                  vegetal
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoSolicitudes} alt="Solicitudes" />
                          </span>
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoDistribucion} alt="Distribucion" />
                          </span>
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
                                to="conservacion/distribucion/recepcionsolicitudes"
                              >
                                <span className="sidenav-mini-icon"> V </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Gestion de Solicitudes de Material <br />{" "}
                                  Vegetal
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoCronograma} alt="Cronograma" />
                          </span>
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoReportes} alt="Reportes" />
                          </span>
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
                          <span className="sidenav-mini-icon">
                            <img src={IconoConfiguracion} alt="Configuracion" />
                          </span>
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
                          <span className="sidenav-mini-icon">
                            <img
                              src={IconoCentroNotificacion}
                              alt="Centro de notificaciones"
                            />
                          </span>
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
                    <img
                      src={IconoGestionDocumental}
                      alt="Gestion documental"
                    />
                    <span className="nav-link-text ms-2 ps-1">
                      Gestión documental
                    </span>
                  </a>
                  <div className="collapse " id="authExamples">
                    <ul className="nav ">
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white "
                          to="gestordocumental/organigrama/crearorganigrama"
                        >
                          <span className="sidenav-mini-icon">
                            <img src={Vineta} alt="vineta" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Crear <br /> Organigrama
                          </span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white "
                          to="gestordocumental/organigrama/ccd"
                        >
                          <span className="sidenav-mini-icon">
                            <img src={Vineta} alt="vineta" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            CCD
                          </span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white "
                          to="gestordocumental/organigrama/trd"
                        >
                          <span className="sidenav-mini-icon">
                            <img src={Vineta} alt="vineta" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            TRD
                          </span>
                        </Link>
                      </li>
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
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white "
                          to="gestordocumental/edicion-organigrama"
                        >
                          <span className="sidenav-mini-icon"> V </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Edicion Organigrama
                          </span>
                        </Link>
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
                    aria-expanded="true"
                  >
                    {/* <i className="material-icons-round {% if page.brand == 'RTL' %}ms-2{% else %} me-2{% endif %}">
                  upcoming
                </i> */}
                    <img
                      src={IconoTramitesServicios}
                      alt="Tramites y servicios"
                    />
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
                          <span className="sidenav-normal  ms-2  ps-1">
                            {" "}
                            CYS{" "}
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
                      <li className="nav-item">
                        <a
                          data-bs-toggle="collapse"
                          href="#compo"
                          className="nav-link text-white "
                          aria-controls=""
                          role="button"
                          aria-expanded="false"
                        >
                          <img
                            src="/static/media/market-research-svgrepo-com.4a09ad7dc0ce046b1e7f9668fed3b21e.svg"
                            alt="Tramites y servicios"
                          />
                          <span className="nav-link-text ms-2 ps-1">
                            Analitica De Datos
                          </span>
                        </a>
                        <ul className="nav ">
                        </ul>
                        <div className="collapse " id="compo">
                          <li className="nav-item">
                            <Link
                              className="nav-link text-white "
                              to="TramitesYServicios/AnaliticaDeDatosTYS/PqrsdAnalitica"
                            >
                              <span className="sidenav-mini-icon"> P </span>
                              <span className="sidenav-normal  ms-2  ps-1">
                                PQRSD
                              </span>
                            </Link>
                          </li>
                        </div>
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
                    <span className="sidenav-mini-icon">
                      <img src={IconoRecursoHidrico} alt="Recurso hidrico" />
                    </span>
                    <span className="nav-link-text ms-2 ps-1">
                      Recurso hídrico
                    </span>
                  </a>
                  <div className="collapse " id="componentsExamples">
                    <ul className="nav ">
                      <li className="nav-item ">
                        <a
                          className="nav-link text-white "
                          data-bs-toggle="collapse"
                          aria-expanded="false"
                          href="#estaciones"
                        >
                          <span className="sidenav-mini-icon">
                            <img
                              src={IconoEstacionesHidrometereologicas}
                              alt="estaciones hidrometereologicas"
                            />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Estaciones <br /> Hidrometereológicas
                          </span>
                        </a>
                        <div className="collapse " id="estaciones">
                          <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/geolocalizacion"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Geolocalización
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/administrador-de-estaciones"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Estaciones
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/alarmas-estaciones"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Alarmas
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/configuraciones"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Configuración
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/usuarios-estaciones"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Partes Interesadas
                                </span>
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/DashboardEstaciones"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Comportamiento Variable
                                </span>
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/AnaliticaDatos"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Analitica de Datos
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/analitica-datos"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Analitica de Datos
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/monitoreo"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Monitoreo
                                </span>
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                className="nav-link text-white "
                                to="recurso-hidrico/estaciones/reportes"
                              >
                                <span className="sidenav-mini-icon">
                                  <img src={Vineta} alt="vineta" />
                                </span>
                                <span className="sidenav-normal  ms-2  ps-1">
                                  Reportes
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}
            {userInfo?.userinfo.is_superuser && (
              <>
                <li className="nav-item">
                  <a
                    data-bs-toggle="collapse"
                    href="#seguridad"
                    className="nav-link text-white"
                    aria-controls="seguridad"
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="sidenav-mini-icon">
                      <img src={IconoSeguridad} alt="Seguridad" />
                    </span>
                    <span className="nav-link-text ms-2 ps-1">Seguridad</span>
                  </a>
                  <div className="collapse " id="seguridad">
                    <ul className="nav ">
                      <li className="nav-item ">
                        <Link
                          className="nav-link text-white "
                          to="seguridad/administradordepersonas"
                        >
                          <span className="sidenav-mini-icon">
                            <img src={Vineta} alt="vineta" />
                          </span>
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
                          <span className="sidenav-mini-icon">
                            <img src={Vineta} alt="vineta" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Administrador de <br /> empresas
                          </span>
                        </Link>
                      </li>
                      <li className="nav-item ">
                        <Link
                          className="nav-link text-white "
                          to="seguridad/administradordeusuario"
                        >
                          <span className="sidenav-mini-icon">
                            <img src={Vineta} alt="vineta" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Administrador de <br /> usuarios
                          </span>
                        </Link>
                      </li>
                      <li className="nav-item ">
                        <Link
                          className="nav-link text-white "
                          to="seguridad/roles"
                        >
                          <span className="sidenav-mini-icon">
                            <img src={Vineta} alt="vineta" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Administrador de <br /> roles
                          </span>
                        </Link>
                      </li>
                      <li className="nav-item ">
                        <Link
                          className="nav-link text-white "
                          to="seguridad/auditoria"
                        >
                          <span className="sidenav-mini-icon">
                            <img src={Vineta} alt="vineta" />
                          </span>
                          <span className="sidenav-normal  ms-2  ps-1">
                            Auditoria
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </Scrollbars>
    </aside>
  );
};
export default Aside;
