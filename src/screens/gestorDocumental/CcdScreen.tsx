import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import Subtitle from '../../components/Subtitle';
import { AgGridReact } from 'ag-grid-react';
import CrearSeries from '../../components/Dialog/CrearSeries';
import useCCD from './hooks/useCCD';
import SearchCcdModal from '../../components/Dialog/SearchCcdModal';

const CcdScreen = () => {
  const columnAsigancion = [
    {
      headerName: 'Sección',
      field: 'sección',
      minWidth: 150,
      maxWidth: 200
    },

    {
      headerName: 'Subseccón',
      field: 'Subseccón',
      minWidth: 150,
      maxWidth: 200
    },

    {
      headerName: 'serie',
      field: 'serie',
      minWidth: 150,
      maxWidth: 200
    },
    {
      headerName: 'subserie',
      field: 'subserie',
      minWidth: 150,
      maxWidth: 200
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      cellRendererFramework: (params) => (
        <div>
          <button className='btn text-capitalize ' type='button' title='Editar'>
            <i className='fa-regular fa-pen-to-square fs-4'></i>
          </button>
          <button
            className='btn text-capitalize '
            type='button'
            title='Eliminar'
          >
            <i className='fa-regular fa-trash-can fs-4'></i>
          </button>
        </div>
      )
    }
  ];
  const rowData = [
    {
      sección: 'Direccion general',
      Subseccón: 'Gestion ambiental',
      subserie: '1',
      serie: '1,3,7,9'
    },
    {
      sección: 'Direccion general',
      Subseccón: '',
      subserie: '2',
      serie: '5,8,3,9'
    },
    {
      sección: 'Direccion general',
      Subseccón: 'Oficina juridica',
      subserie: '4',
      serie: '1,10,9,25'
    },
    {
      sección: 'Direccion general',
      Subseccón: 'Oficina juridica',
      idsubserie: '5',
      idserie: '3,6'
    }
  ];

  //Hooks
  const {
    //States
    listUnitys,
    listOrganigrams,
    title,
    createIsactive,
    consultaCcdIsactive,
    control,
    controlCreateCCD,
    defaultColDef,
    errors,
    errorsCreateCCD,
    saveCCD,
    //Edita States
    setTitle,
    setCreateIsactive,
    setConsultaCcdIsactive,
    //Functions
    onSubmitCreateCCD,
    registerCreateCCD,
    handleSubmit,
    handleSubmitCreateCCD,
    cleanCCD
  } = useCCD();

  return (
    <div className='row min-vh-100'>
      <div className='col-lg-12 col-md-10 col-12 mx-auto'>
        <div className='multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative '>
          <form
            className='row'
            onSubmit={handleSubmitCreateCCD(onSubmitCreateCCD)}
            id='configForm'
          >
            <Subtitle
              title='Cuadro de clasificación documental'
              mt={3}
              mb={3}
            />
            <div className='row'>
              <div className='col-12 col-lg-3  mt-3'>
                <label className='text-terciary'>
                  Organigrama
                  <samp className='text-danger'>*</samp>
                </label>
                <Controller
                  name='organigrama'
                  rules={{ required: true }}
                  control={controlCreateCCD}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      options={listOrganigrams}
                      placeholder='Seleccionar'
                    />
                  )}
                />
                {errorsCreateCCD.organigrama && (
                  <div className='col-12'>
                    <small className='text-center text-danger'>
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className='col-12 col-lg-3  mt-3'>
                <label className='text-terciary'> Unidades</label>
                <Controller
                  name='unidades_organigrama'
                  control={controlCreateCCD}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      options={listUnitys}
                      placeholder='Seleccionar'
                    />
                  )}
                />
              </div>
              <div className='col-12 col-lg-3  mt-3'>
                <div>
                  <label className='ms-2 text-terciary'>
                    Nombre del CCD<samp className='text-danger'>*</samp>
                  </label>
                  <input
                    className='form-control border border-terciary border rounded-pill px-3'
                    type='text'
                    placeholder='Nombre del CCD'
                    {...registerCreateCCD('nombreCcd', {
                      required: true
                    })}
                  />
                  {errorsCreateCCD.nombreCcd && (
                    <div className='col-12'>
                      <small className='text-center text-danger'>
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>

              <div className='col-12 col-lg-3  mt-3'>
                <div>
                  <label className='ms-2 text-terciary'>
                    Versión<samp className='text-danger'>*</samp>
                  </label>
                  <input
                    className='form-control border border-terciary border rounded-pill px-3'
                    type='text'
                    placeholder='Versión'
                    {...registerCreateCCD('version', {
                      required: true
                    })}
                  />
                  {errorsCreateCCD.version && (
                    <div className='col-12'>
                      <small className='text-center text-danger'>
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>

              <div className='row d-flex justify-content-end'>
                <div className='col-12 col-lg-2 d-flex justify-content-end mt-3'>
                  <button
                    className='btn   text-capitalize'
                    type='button'
                    title='Buscar'
                    onClick={() => {
                      setConsultaCcdIsactive(true);
                      setTitle('Consultar CCD');
                    }}
                  >
                    <i className='fa-solid fa-magnifying-glass fs-3'></i>
                  </button>
                  <button
                    className='btn text-capitalize'
                    type='submit'
                    title='Guardar'
                  >
                    <i className='fa-regular fa-floppy-disk fs-3'></i>
                  </button>
                  <button
                    className='btn  text-capitalize'
                    type='button'
                    onClick={() => cleanCCD()}
                    title='Limpiar'
                  >
                    <i className='fa-solid fa-eraser fs-3'></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
          {saveCCD && (
            <form
              className='row'
              onSubmit={handleSubmit(onSubmitCreateCCD)}
              id='configForm'
            >
              <Subtitle title='Registro de series y subseries' mt={1} mb={3} />
              <div className='row'>
                <div className='col-12 col-lg-3  mt-4'>
                  <label className='text-terciary'>Ver series</label>
                  <Controller
                    name='sries'
                    control={control}
                    render={() => (
                      <Select
                        options={[
                          { label: 'primera serie', value: 'primera' },
                          { label: 'segunda serie', value: 'segunda' },
                          { label: 'tercera serie', value: 'tercera' }
                        ]}
                        placeholder='Seleccionar'
                      />
                    )}
                  />
                  {errors.sries && (
                    <div className='col-12'>
                      <small className='text-center text-danger'>
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className='col-12 col-lg-3 '>
                  <div className='d-grid gap-2  mx-2'>
                    <button
                      className='btn btn-primary text-capitalize border rounded-pill px-3 btn-min-width'
                      type='button'
                      onClick={() => {
                        setCreateIsactive(true);
                        setTitle('Crear series');
                      }}
                    >
                      Crear series
                    </button>
                  </div>
                  <div className='d-grid gap-2 mx-2'>
                    <button
                      disabled
                      className='btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width'
                      type='button'
                    >
                      Clonar
                    </button>
                  </div>
                  <div className='d-grid gap-2 mx-2'>
                    <button
                      disabled
                      className='btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width'
                      type='button'
                    >
                      Previzualizar
                    </button>
                  </div>
                </div>
                <div className='col-12 col-lg-3  mt-4'>
                  <label className='text-terciary'>Ver subseries</label>
                  <Controller
                    name='subSerie'
                    control={control}
                    render={() => (
                      <Select
                        options={[
                          { label: 'primera subserie', value: 'primerasub' },
                          { label: 'segunda subserie', value: 'segundasub' },
                          { label: 'tercera subserie', value: 'tercerasub' }
                        ]}
                        placeholder='Seleccionar'
                      />
                    )}
                  />
                  {errors.subSerie && (
                    <div className='col-12'>
                      <small className='text-center text-danger'>
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className='col-12 col-lg-3 '>
                  <div className='d-grid gap-2 mx-2'>
                    <button
                      className='btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width'
                      type='button'
                      onClick={() => {
                        setCreateIsactive(true);
                        setTitle('Crear subseries');
                      }}
                    >
                      Crear subseries
                    </button>
                  </div>
                  <div className='d-grid gap-2 mx-2'>
                    <button
                      disabled
                      className='btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width'
                      type='button'
                    >
                      Clonar
                    </button>
                  </div>
                  <div className='d-grid gap-2 mx-2'>
                    <button
                      disabled
                      className='btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width'
                      type='button'
                    >
                      Previzualizar
                    </button>
                  </div>
                </div>
              </div>
              <Subtitle title='Asignaciones' mb={3} />
              <div className='row'>
                <div className='col-12 col-lg-3  mt-3'>
                  <label className='text-terciary'>
                    {' '}
                    Unidades
                    <samp className='text-danger'>*</samp>
                  </label>
                  <Controller
                    name='unidades_asignacion'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        options={listUnitys}
                        placeholder='Seleccionar'
                      />
                    )}
                  />
                  {errors.unidades_asignacion && (
                    <div className='col-12'>
                      <small className='text-center text-danger'>
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className='col-12 col-lg-3  mt-3'>
                  <label className='text-terciary'>
                    Series
                    <samp className='text-danger'>*</samp>
                  </label>
                  <Controller
                    name='sries_asignacion'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={() => (
                      <Select
                        options={[
                          { label: 'primera serie', value: 'primera' },
                          { label: 'segunda serie', value: 'segunda' },
                          { label: 'tercera serie', value: 'tercera' }
                        ]}
                        placeholder='Seleccionar'
                      />
                    )}
                  />
                  {errors.sries_asignacion && (
                    <div className='col-12'>
                      <small className='text-center text-danger'>
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className='col-12 col-lg-3  mt-3'>
                  <label className='text-terciary'>
                    Subseries
                    <samp className='text-danger'>*</samp>
                  </label>
                  <Controller
                    name='subSerie_asignacion'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={() => (
                      <Select
                        isMulti
                        options={[
                          { label: 'primera subserie', value: 'primerasub' },
                          { label: 'segunda subserie', value: 'segundasub' },
                          { label: 'tercera subserie', value: 'tercerasub' }
                        ]}
                        placeholder='Seleccionar'
                      />
                    )}
                  />
                  {errors.subSerie_asignacion && (
                    <div className='col-12'>
                      <small className='text-center text-danger'>
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className='col-12 col-lg-3 '>
                  <div className='d-grid gap-2 mt-4 mx-2'>
                    <button
                      className='btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width'
                      type='button'
                    >
                      guardar relación
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div id='myGrid' className='ag-theme-alpine mt-4'>
                  <div className='ag-theme-alpine' style={{ height: '400px' }}>
                    <AgGridReact
                      columnDefs={columnAsigancion}
                      rowData={rowData}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-end'>
                <div className='col-12 col-lg-3 '>
                  <div className='d-grid gap-2 mt-4 mx-2'>
                    <button
                      className='mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize'
                      type='button'
                    >
                      Terminar
                    </button>
                  </div>
                </div>
                <div className='col-12 col-lg-3 '>
                  <div className='d-grid gap-2 mt-4 mx-2'>
                    <button
                      className='mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize'
                      type='button'
                    >
                      Reanudar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
          <CrearSeries
            isModalActive={createIsactive}
            setIsModalActive={setCreateIsactive}
            title={title}
          />
          <SearchCcdModal
            isModalActive={consultaCcdIsactive}
            setIsModalActive={setConsultaCcdIsactive}
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default CcdScreen;
