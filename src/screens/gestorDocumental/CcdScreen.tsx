import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import Subtitle from "../../components/Subtitle";
import { AgGridReact } from "ag-grid-react";
import CrearSeries from "../../components/Dialog/CrearSeries";
import useCCD from "./hooks/useCCD";

const CcdScreen = () => {
  const [CrearseriesIsactive, SetcrearseriesIsactive] = useState(false);

  const columnAsigancion = [
    {
      headerName: "Sección",
      field: "sección",
      minWidth: 150,
      maxWidth: 200,
    },

    {
      headerName: "Subseccón",
      field: "Subseccón",
      minWidth: 150,
      maxWidth: 200,
    },

    {
      headerName: "serie",
      field: "serie",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "subserie",
      field: "subserie",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Acciones",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button className="btn text-capitalize " type="button" title="Editar">
            <i className="fa-regular fa-pen-to-square fs-4"></i>
          </button>
          <button
            className="btn text-capitalize "
            type="button"
            title="Eliminar"
          >
            <i className="fa-regular fa-trash-can fs-4"></i>
          </button>
        </div>
      ),
    },
  ];
  const rowData = [
    {
      sección: "Direccion general",
      Subseccón: "Gestion ambiental",
      subserie: "1",
      serie: "1,3,7,9",
    },
    {
      sección: "Direccion general",
      Subseccón: "",
      subserie: "2",
      serie: "5,8,3,9",
    },
    {
      sección: "Direccion general",
      Subseccón: "Oficina juridica",
      subserie: "4",
      serie: "1,10,9,25",
    },
    {
      sección: "Direccion general",
      Subseccón: "Oficina juridica",
      idsubserie: "5",
      idserie: "3,6",
    },
  ];

  //Hooks
  const {
    //States
    listUnitys,
    listOrganigrams,
    columnDefsMaintenance,
    columnDefs2,
    columnDefsArticles,
    asignacionPrestamos,
    articuloEncontrado,
    otrasAplicaciones,
    busquedaArticuloModalOpen,
    otrasPerisfericos,
    control,
    initialState,
    file,
    defaultColDef,
    errors,
    //Edita States
    setArticuloEncontrado,
    setOtrasAplicaciones,
    setOtrasPerisfericos,
    setBusquedaArticuloModalOpen,
    setFile,
    setValue,
    //Functions
    // handledSearch,
    onSubmit,
    register,
    handleSubmit,
    reset,
    // handleUpload
  } = useCCD();

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <Subtitle title="Cuadro de clasificación documental" mt={3} mb={3} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">
                  Organigrama
                  <samp className="text-danger">*</samp>
                </label>
                <Controller
                  name="organigrama"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      options={listOrganigrams}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.organigrama && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">
                  {" "}
                  Unidades
                  <samp className="text-danger">*</samp>
                </label>
                <Controller
                  name="unidades_organigrama"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      options={listUnitys}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.unidades_organigrama && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre del CCD<samp className="text-danger">*</samp></label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre del CCD"
                    {...register("nombreCcd", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Versión<samp className="text-danger">*</samp></label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Versión"
                    {...register("version", {
                      required: true,
                    })}
                  />
                </div>
              </div>
            </div>

            <Subtitle title="Registro de series y subseries" mt={3} mb={3} />
            <div className="row">
              <div className="col-12 col-lg-3  mt-4">
                <label className="text-terciary">
                  Series
                  <samp className="text-danger">*</samp>
                </label>
                <Controller
                  name="sries"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={() => (
                    <Select
                      options={[
                        { label: "primera serie", value: "primera" },
                        { label: "segunda serie", value: "segunda" },
                        { label: "tercera serie", value: "tercera" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.organigrama && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3 ">
                <div className="d-grid gap-2  mx-2">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 btn-min-width"
                    type="button"
                    onClick={() => SetcrearseriesIsactive(true)}
                  >
                    Crear series
                  </button>
                </div>
                <div className="d-grid gap-2 mx-2">
                  <button
                    disabled
                    className="btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width"
                    type="button"
                  >
                    Clonar
                  </button>
                </div>
                <div className="d-grid gap-2 mx-2">
                  <button
                    disabled
                    className="btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width"
                    type="button"
                  >
                    Previzualizar
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-4">
                <label className="text-terciary">
                  Subseries
                  <samp className="text-danger">*</samp>
                </label>
                <Controller
                  name="subSerie"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={() => (
                    <Select
                      options={[
                        { label: "primera subserie", value: "primerasub" },
                        { label: "segunda subserie", value: "segundasub" },
                        { label: "tercera subserie", value: "tercerasub" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.organigrama && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3 ">
                <div className="d-grid gap-2 mx-2">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width"
                    type="button"
                    onClick={() => SetcrearseriesIsactive(true)}
                  >
                    Crear subseries
                  </button>
                </div>
                <div className="d-grid gap-2 mx-2">
                  <button
                    disabled
                    className="btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width"
                    type="button"
                  // onClick={() => SetcrearseriesIsactive(true)}
                  >
                    Clonar
                  </button>
                </div>
                <div className="d-grid gap-2 mx-2">
                  <button
                    disabled
                    className="btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width"
                    type="button"
                  // onClick={() => SetcrearseriesIsactive(true)}
                  >
                    Previzualizar
                  </button>
                </div>
              </div>
            </div>
            <Subtitle title="Asignaciones" mb={3} />
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">
                  {" "}
                  Unidades
                  <samp className="text-danger">*</samp>
                </label>
                <Controller
                  name="unidades_asignacion"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={() => (
                    <Select
                      options={[
                        { label: "Salen todas las", value: "tos" },
                        { label: "unidades creadas en el ", value: "los" },
                        { label: "organigrama seleccionado", value: "fn" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.unidades_asignacion && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">
                  Series
                </label>
                <Controller
                  name="sries_asignacion"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={() => (
                    <Select
                      options={[
                        { label: "primera serie", value: "primera" },
                        { label: "segunda serie", value: "segunda" },
                        { label: "tercera serie", value: "tercera" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.sries_asignacion && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">
                  Subseries
                </label>
                <Controller
                  name="subSerie_asignacion"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={() => (
                    <Select
                      options={[
                        { label: "primera subserie", value: "primerasub" },
                        { label: "segunda subserie", value: "segundasub" },
                        { label: "tercera subserie", value: "tercerasub" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.subSerie_asignacion && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3 ">
                <div className="d-grid gap-2 mt-4 mx-2">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="button"
                  >
                    guardar relación
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div id="myGrid" className="ag-theme-alpine mt-4">
                <div className="ag-theme-alpine" style={{ height: "400px" }}>
                  <AgGridReact
                    columnDefs={columnAsigancion}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-end">
              <div className="col-12 col-lg-3 ">
                <div className="d-grid gap-2 mt-4 mx-2">
                  <button
                    className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                    type="button"
                  >
                    Terminar
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-3 ">
                <div className="d-grid gap-2 mt-4 mx-2">
                  <button
                    className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                    type="button"
                  >
                    Reanudar
                  </button>
                </div>
              </div>
            </div>
          </form>
          <CrearSeries
            isModalActive={CrearseriesIsactive}
            setIsModalActive={SetcrearseriesIsactive}
          />
        </div>
      </div>
    </div>
  );
};

export default CcdScreen;
