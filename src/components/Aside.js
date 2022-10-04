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
import IconoTablerosDeControl from "../assets/board-svgrepo-com.svg";
import IconoSeguridad from "../assets/padlock-lock-svgrepo-com.svg";

const Aside = () => {
  const userInfo = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  return (
    <aside
      className="collapse sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
      id="sidenav-main"
    >
      <Scrollbars style={{ width: "100%", height: "100%" }} autoHide>
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
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
          className="collapse navbar-collapse  w-auto h-auto"
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
                <span className="nav-link-text ms-2 ps-1">{userInfo.name}</span>
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
                        {" "}
                        Logout{" "}
                      </span>
                    </div>
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
                  <li className="nav-item active">
                    <Link
                      to="almacen/creacion-articulo"
                      className="nav-link text-white"
                    >
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Creación de Artículo{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/dashboards/discover.html"
                    >
                      <span className="sidenav-mini-icon"> I </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Ingreso de Artículos{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/dashboards/sales.html"
                    >
                      <span className="sidenav-mini-icon"> S </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Solicitud de Asignación{" "}
                      </span>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      href="../../pages/dashboards/automotive.html"
                    >
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Asignación de Activos{" "}
                      </span>
                    </a>
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
                        alt="G. Material vegetal"
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
                      {/* <i
                        className="fa-solid fa-bell"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i> */}
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
                      to="seguridad/administradordeusuarios"
                    >
                      <span className="sidenav-mini-icon"> A </span>
                      <span className="sidenav-normal  ms-2  ps-1">
                        Administrador de <br /> usuarios
                      </span>
                    </Link>
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
          </ul>
        </div>
      </Scrollbars>
    </aside>
  );
};
export default Aside;
