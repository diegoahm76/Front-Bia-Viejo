import Scrollbars from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../actions/userActions";
import LogoCormacarena from "../assets/logos/eps/LogoVertical.svg";


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
        {/* <div class="mobile-toggler d-xl-none">
          <button data-bs-toggle="modal" data-bs-target="#navbModal">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div> */}

        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <Link
            className="navbar-brand m-0"
            to="dashboard"
            target="_blank"
            rel="noreferrer"
          >
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
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#almacen"
                className="nav-link text-white"
                aria-controls="almacen"
                role="button"
                aria-expanded="false"
              >
                <i class="fa-solid fa-warehouse"></i>
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
                <i class="fa-solid fa-money-check"></i>
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
                <i class="fa-solid fa-magnifying-glass-chart"></i>
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
                        {" "}
                        Consulta de Historicos{" "}
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
                <i className="fas fa-sharp fa-solid fa-seedling"></i>
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
                      <i
                        className="fas fa-solid fa-leaf"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Gestor Vivero <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Gestor-vivero">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestorvivero/agregarvivero"
                          >
                            <span className="sidenav-mini-icon"> A </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Agregar Vivero{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion/gestorvivero/editarvivero"
                          >
                            <span className="sidenav-mini-icon"> E </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Editar Vivero{" "}
                            </span>
                          </Link>
                        </li>
                        {/* <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/profile/messages.html"
                          >
                            <span className="sidenav-mini-icon"> I </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Inventario{" "}
                            </span>
                          </a>
                        </li> */}
                        <li className="nav-item ">
                          <a
                            className="nav-link text-white "
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            href="#inventario"
                          >
                            <span className="sidenav-mini-icon"> I </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Inventario{" "}
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
                                    {" "}
                                    Propagacion{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion/gestorvivero/inventario/produccionpropia"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Produccion propia{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Plantas en cuarentena{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Compensacion{" "}
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
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Medidas de resarcimiento{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Insumos{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Herramientas{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  className="nav-link text-white "
                                  to="conservacion-gestorvivero-agregarvivero"
                                >
                                  <span className="sidenav-normal  ms-2  ps-1">
                                    {" "}
                                    Disponible Material Vegetal{" "}
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
                      <i
                        className="fa fa-brands fa-pagelines"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        G. material vegetal <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="GestorMaterialVegetal">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/users/new-user.html"
                          >
                            <span className="sidenav-mini-icon"> C </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Consultar solicitudes <br />
                              realizadas a vivero{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/users/new-user.html"
                          >
                            <span className="sidenav-mini-icon"> C </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Consultar informes <br />
                              de caracterizacion{" "}
                            </span>
                          </a>
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
                      <i
                        className="fa fa-solid fa-gears"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Produccion <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Produccion">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/account/settings.html"
                          >
                            <span className="sidenav-mini-icon"> S </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Settings{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/account/billing.html"
                          >
                            <span className="sidenav-mini-icon"> B </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/account/invoice.html"
                          >
                            <span className="sidenav-mini-icon"> I </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Invoice{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/account/security.html"
                          >
                            <span className="sidenav-mini-icon"> S </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Security{" "}
                            </span>
                          </a>
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
                      <i
                        className="fa-solid fa-arrow-up-right-from-square"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
                      <span className="sidenav-normal  ms-2  ps-1 text-center">
                        {" "}
                        solicitudes de <br />
                        material vegetal <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="projectsExample">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/projects/general.html"
                          >
                            <span className="sidenav-mini-icon"> G </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              General{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/projects/timeline.html"
                          >
                            <span className="sidenav-mini-icon"> T </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Timeline{" "}
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link text-white "
                            href="../../pages/pages/projects/new-project.html"
                          >
                            <span className="sidenav-mini-icon"> N </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              New Project{" "}
                            </span>
                          </a>
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
                      <i
                        className="fa-solid fa-truck"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Distrubucion <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Distrubucion">
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

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Cronograma"
                    >
                      <i
                        className="fa-solid fa-calendar-days"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Cronograma <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Cronograma">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            className="nav-link text-white "
                            to="conservacion-cronograma-calendario"
                          >
                            <span className="sidenav-mini-icon"> C </span>
                            <span className="sidenav-normal  ms-2  ps-1">
                              {" "}
                              Calendario{" "}
                            </span>
                          </Link>
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

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Reportes"
                    >
                      <i
                        className="fa-regular fa-file"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Reportes <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Reportes">
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

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#Configuracion"
                    >
                      <i
                        className="fa-solid fa-sliders"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
                      <span className="sidenav-normal  ms-2  ps-1">
                        {" "}
                        Configuracion <b className="caret"></b>
                      </span>
                    </a>
                    <div className="collapse " id="Configuracion">
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

                  <li className="nav-item ">
                    <a
                      className="nav-link text-white "
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#CentroNotificaciones"
                    >
                      <i
                        className="fa-solid fa-bell"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--bs-primary)",
                        }}
                      ></i>
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
                <i className="material-icons-round {% if page.brand == 'RTL' %}ms-2{% else %} me-2{% endif %}">
                  content_paste
                </i>
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
                <i className="material-icons-round {% if page.brand == 'RTL' %}ms-2{% else %} me-2{% endif %}">
                  upcoming
                </i>
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
                <i class="fa-solid fa-hand-holding-droplet"></i>
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
          </ul>
        </div>
      </Scrollbars>
    </aside>
  );
};
export default Aside;
