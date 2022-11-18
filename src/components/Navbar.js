import { useDispatch } from "react-redux";
import { openModalSesionAction } from "../actions/userActions";

const Navbar = ({ setShowAside, showAside }) => {
  const dispatch = useDispatch()

  const handleChangeEntorno = () => {
    dispatch(openModalSesionAction())
  }
  return (
    <nav
      className="navbar navbar-main navbar-expand-lg top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky pt-3"
      id="navbarBlur"
      data-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <div className="sidenav-toggler sidenav-toggler-inner d-xl-block d-none">
          <div className="d-flex justify-content-center align-items-baseline">
            <button
              onClick={() => setShowAside(!showAside)}
              className="btn border-none ms-10 mb-0"
            >
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line"></i>
                <i className="sidenav-toggler-line"></i>
                <i className="sidenav-toggler-line"></i>
              </div>
            </button>
            
            <button
              className="btn btn-tablas bg-gradient-primary mb-0 d-block ms-auto text-capitalize"
              type="button"
              onClick={handleChangeEntorno}
            >
              Cambiar Entorno
            </button>
          </div>
        </div>
        <div
          className="collapse justify-content-end navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <button
                onClick={() => setShowAside(!showAside)}
                className="btn border-none"
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </button>
            </li>
            <li className="nav-item dropdown pe-2 ms-2">
              <a
                href="https"
                className="nav-link text-body p-0 position-relative"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="material-icons cursor-pointer">notifications</i>
                <span className="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger border border-white small py-1 px-2">
                  <span className="small">1</span>
                  <span className="visually-hidden">unread notifications</span>
                </span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end p-2 me-sm-n4"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="https">
                    <div className="d-flex align-items-center py-1">
                      <span className="material-icons">email</span>
                      <div className="ms-2">
                        <h6 className="text-sm font-weight-normal my-auto">
                          Check new messages
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="https">
                    <div className="d-flex align-items-center py-1">
                      <span className="material-icons">podcasts</span>
                      <div className="ms-2">
                        <h6 className="text-sm font-weight-normal my-auto">
                          Manage podcast session
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item border-radius-md" href="https">
                    <div className="d-flex align-items-center py-1">
                      <span className="material-icons">shopping_cart</span>
                      <div className="ms-2">
                        <h6 className="text-sm font-weight-normal my-auto">
                          Payment successfully completed
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
