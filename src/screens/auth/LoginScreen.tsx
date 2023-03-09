import React, { useRef, useState } from 'react';
import LogoCormacarena from '../../assets/LogosBIAPNG/logoBia.svg';
import Cormacarena from '../../assets/LogosBIAPNG/logoCorma.svg';
import Macarenia from '../../assets/LogosBIAPNG/logoMaca.svg';
import ReCaptcha from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { FilledInput, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRol } from './hooks/LoginHooks';
import { DialogEntorno } from './components/DialogEntorno';

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const captchaRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm();
  const { submitHandler, setIsCaptchaValid, reintentos, isLoading } = useRol();

  const navigate = useNavigate();

  const handleClickToDesbloqueo = () => {
    navigate('/desbloqueo-usuario');
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        className='page-header align-items-start min-vh-100'
        style={{
          backgroundColor: 'rgb(4,47,74)'
        }}
      >
        <div className='container my-auto'>
          <div className='row'>
            <div className='col-lg-4 col-md-8 col-12 mx-auto'>
              <div
                className='card fadeIn3 fadeInBottom align-items-center'
                style={{
                  backgroundColor: 'rgb(4,47,74)',
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                <div className='my-4'>
                  <img
                    src={LogoCormacarena}
                    className='aspect-ratio'
                    alt='logo cormacarena'
                  />
                </div>
              </div>
              <div
                className='card z-index-0 fadeIn3 fadeInBottom'
                style={{
                  borderRadius: '0',
                  borderTopLeftRadius: '40px',
                  borderTopRightRadius: '40px',
                  background:
                    'linear-gradient(360deg, rgba(4,47,74,1) 0%, rgba(0,178,0,1) 32%, rgba(0,191,235,1) 100%)',
                  boxShadow: 'none'
                }}
              >
                <div className='card-body'>
                  <form
                    className='text-start'
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <div className='col-12 mb-3 mt-3'>
                      <label
                        className='text-white'
                        style={{ fontSize: '1.2rem' }}
                      >
                        Email
                      </label>
                      <input
                        className='form-control border rounded-pill px-3 bg-white border border-0'
                        {...register('email')}
                      />
                    </div>
                    <div className='col-12 mb-3 mt-3'>
                      <label
                        className='text-white'
                        style={{ fontSize: '1.2rem' }}
                      >
                        Contraseña
                      </label>
                      <FilledInput
                        id='filled-adornment-password'
                        type={showPassword ? 'text' : 'password'}
                        fullWidth={true}
                        disableUnderline={true}
                        className='rounded-pill bg-white'
                        {...register('password')}
                        style={{
                          height: 40,
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingTop: 5,
                          paddingBottom: 5
                        }}
                        endAdornment={
                          <InputAdornment position='end' style={{ padding: 0 }}>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {/* <input
                        type='password'
                        className='form-control border rounded-pill px-3 bg-white border border-0'
                        {...register('password')}
                      /> */}
                    </div>
                    {reintentos ? (
                      <div>
                        <label className='text-white text-center fw-lighter fs-5'>
                          Su usuario há sido bloqueado
                          <button
                            type='button'
                            className='btn bg-gradient-primary rounded-pill justify-content-center px-5 my-4 mb-2 fw-normal'
                            onClick={handleClickToDesbloqueo}
                          >
                            Desbloquear Usuario
                          </button>
                        </label>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className='mt-4 d-flex justify-content-center'>
                      <ReCaptcha
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        ref={captchaRef}
                        hl='es'
                        onChange={() => setIsCaptchaValid(true)}
                        onExpired={() => setIsCaptchaValid(false)}
                        onError={() => setIsCaptchaValid(false)}
                      />
                    </div>{' '}
                    *
                    <div className='d-flex justify-content-center'>
                      <LoadingButton
                        type='submit'
                        loading={isLoading}
                        className='btn bg-gradient-primary rounded-pill px-5 my-4 mb-2 text-capitalize'
                        style={{ fontSize: '.9rem' }}
                      >
                        Iniciar Sesión
                      </LoadingButton>
                      {/* <button
                        type='submit'
                        className='btn bg-gradient-primary rounded-pill px-5 my-4 mb-2 text-capitalize'
                        style={{ fontSize: '.9rem' }}
                      >
                        Iniciar sesión
                      </button> */}
                    </div>
                  </form>
                  <div className='d-flex justify-content-around my-3 mb-2'>
                    <Link className='text-white' to='/register'>
                      <p>
                        No tienes cuenta? <b>Registrese</b>
                      </p>
                    </Link>
                  </div>
                  <div className='d-flex justify-content-center mb-2'>
                    <Link className='text-white' to='/recuperar-contrasena'>
                      <p>Olvidó su contraseña</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center align-items-center gap-3 mt-2'>
                <span className='text-white'>by:</span>
                <div className='d-flex align-items-end gap-3'>
                  <img src={Macarenia} alt='' />
                  <img src={Cormacarena} alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogEntorno />
    </>
  );
}

export default LoginScreen;
