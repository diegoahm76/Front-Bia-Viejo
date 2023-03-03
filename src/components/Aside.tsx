import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import LogoCormacarena from '../assets/logos/Web-Bia-logo.png';
import IconoTablerosDeControl from '../assets/sub-sistema-Tablerosdecontrol1.svg';
import Vineta from '../assets/iconosAlmacen/white-circle-svgrepo-com.svg';
import IconoUser from '../assets/imgs/perfil.svg';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { logoutUser } from '../store/slices/Login';

const Aside = ({ showAside }) => {
  const { permisos, userinfo, userSesion } = useAppSelector(
    (state) => state.login
  );
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    logoutUser(dispatch);
  };

  if (permisos.length > 0) {
    return (
      <aside
        className={`collapse sidenav navbar navbar-vertical ${
          showAside && 'navbar-expand-xs'
        } fixed-start bg-terciary`}
        id='sidenav-main'
        style={{
          minWidth: '273px'
        }}
      >
        <Scrollbars style={{ width: '100%', height: '100%' }} autoHide>
          <div className='sidenav-header text-center mb-2'>
            <Link className='m-0 text-center' to='/dashboard'>
              <img
                src={LogoCormacarena}
                className='h-100'
                alt='main_logo'
                style={{ padding: '15px 0' }}
              />
            </Link>
          </div>
          <div
            className='collapse navbar-collapse w-auto h-auto'
            id='sidenav-collapse-main'
          >
            <ul className='navbar-nav'>
              <img
                src={IconoUser}
                className='px-5 mb-3 rounded rounded-circle'
                alt='user'
              />
              <li className='nav-item mb-2 mt-0'>
                <a
                  data-bs-toggle='collapse'
                  href='#ProfileNav'
                  className='text-white text-center'
                  aria-controls='ProfileNav'
                  role='button'
                  aria-expanded='false'
                >
                  <span className='nav-link-text ms-2 ps-1 d-block text-center'>
                    {userSesion ? userSesion : userinfo?.nombre_de_usuario}
                  </span>
                </a>
                <div className='collapse' id='ProfileNav'>
                  <ul className='nav '>
                    <li className='nav-item'>
                      <Link
                        className='nav-link text-white'
                        onClick={logoutHandler}
                        to={''}
                      >
                        <span className='sidenav-mini-icon'> F </span>
                        <span className='sidenav-normal  ms-3  ps-1'>
                          Cerrar sesión
                        </span>
                      </Link>
                    </li>
                    {!userinfo.is_superuser && (
                      <>
                        <li className='nav-item active'>
                          <Link
                            to='usuario/actualizar-datos-persona'
                            className='nav-link text-white'
                          >
                            <span className='sidenav-mini-icon'> P </span>
                            <span className='sidenav-normal  ms-2  ps-1'>
                              Actualizar Datos
                            </span>
                          </Link>
                        </li>
                        <li className='nav-item active'>
                          <Link
                            to='usuario/actualizar-datos-empresa'
                            className='nav-link text-white'
                          >
                            <span className='sidenav-mini-icon'> E </span>
                            <span className='sidenav-normal  ms-2  ps-1'>
                              Actualizar Datos
                            </span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </li>
              <hr className='horizontal light mt-0' />
              {permisos.map((e: any, i: number) => {
                return (
                  <li className='nav-item mb-2 mt-0' key={i}>
                    <a
                      data-bs-toggle='collapse'
                      href={`#${e.subsistema}`}
                      className='nav-link text-white'
                      aria-controls={`${e.subsistema}`}
                      role='button'
                      aria-expanded='false'
                    >
                      <span className='sidenav-mini-icon'>
                        {' '}
                        <img
                          src={IconoTablerosDeControl}
                          alt='Tableros de control'
                        />{' '}
                      </span>

                      <span className='nav-link-text ms-2 ps-1'>
                        {e.desc_subsistema}
                      </span>
                    </a>
                    <div className='collapse' id={`${e.subsistema}`}>
                      <ul className='nav'>
                        {e.modulos.map((m: any, km: number) => {
                          return (
                            <li className='nav-item' key={km}>
                              <Link
                                className='nav-link text-white '
                                to={m.ruta_formulario}
                              >
                                <span className='sidenav-mini-icon'>
                                  <img src={Vineta} alt='vineta' />
                                </span>
                                <span className='sidenav-normal  ms-2  ps-1'>
                                  {m.nombre_modulo}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Scrollbars>
      </aside>
    );
  } else {
    return <div>No tiene permisos</div>;
  }
};
export default Aside;
