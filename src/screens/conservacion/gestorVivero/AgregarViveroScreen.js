import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Subtitle from "../../../components/Subtitle"

function AgregarViveroScreen() {
  const { register, control, handleSubmit, formState: { errors }, } = useForm();

  const [setVivero] = useState("");
  const [setSiembra] = useState("");

  // const handleAddGrid = (dataAdd) => {
  //   console.log(dataAdd)
  // }

  const onSubmit = (data) => {
    console.log(data)
    setVivero(data.seleccioneVivero.value);
    setSiembra(data.periodoSiembra.value);
  };

  const optionViveroCreados = [
    { label: "Recursos propios de la corporación", value: "RP" },
    { label: "Compensación", value: "CO" },
    { label: "Donación", value: "DO" },

  ];


  const options = [
    { label: "Acacías", value: "Acac" },
    { label: "Barranca de Upía", value: "Barra" },
    { label: "Cabuyaro", value: "Cabuy" },
    { label: "Castilla La Nueva", value: "Cast" },
    { label: "Cubarral", value: "Cuba" },
    { label: "Cumaral", value: "Cuma" },
    { label: "El Calvario", value: "Elca" },
  ];
  // const opcionMunicipio = [
  //   { label: "Acacías", value: "Acac" },
  //   { label: "Barranca de Upía", value: "Barra" },
  //   { label: "Cabuyaro", value: "Cabuy" },
  //   { label: "Castilla La Nueva", value: "Cast" },
  //   { label: "Cubarral", value: "Cuba" },
  //   { label: "Cumaral", value: "Cuma" },
  //   { label: "El Calvario", value: "Elca" },
  // ];
  let gridApi;
  const columnDefs = [
    { headerName: "Latitud", field: "latitud" },
    { headerName: "Longitud", field: "longitud" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="button-row justify-align-content-center col-12 col-sm-4 col-lg-4">
          <button
            className="btn-min-width border rounded-pill px-3 btn bg-gradient-danger me-md-2"
            type="button"
            title="Send"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];
  const rowData = [
    { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
    { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
  ];
  const defaultColDef = {

    sortable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };
  // const onExportClick = () => {
  //   gridApi.exportDataAsCsv();
  // };

  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // // handle click event of the Remove button
  // const handleRemoveClick = (index) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Agregar Vivero
            </h3>
            <Subtitle title="Creación de vivero" mt={3} />
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Nombre: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  placeholder="Escribe el nombre del vivero"
                  {...register("nombreVivero", { required: true })}
                />
                {errors.nombreVivero && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Municipio:<span className="text-danger">*</span>
                </label>
                <Controller
                  name="municipioOpcion"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      placeholder="Selecciona municipio"
                      {...register("municipioOpcion", { required: true })}

                    />
                  )}
                />
                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Direccion de: <span className="text-danger">*</span>
                </label>
                <input
                  name="ubicacionVivero"
                  placeholder="Ingresa ubicación del vivero"
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("ubicacionVivero", { required: true })}
                />
                {errors.ubicacionVivero && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  placeholder="Ingresa área para el vivero"
                  {...register("nombreVivero", { required: true })}
                />
                {errors.nombreVivero && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área de preparación: <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Ingresa cantidad de area"
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("ubicacionVivero", { required: true })}
                />
                {errors.ubicacionVivero && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            <Subtitle title="Georreferenciacion" mt={3} mb={2} />
            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Latitud: <span className="text-danger">*</span>
                </label>
                <input
                  name="latitudTable"
                  placeholder="Ingresa la latitud"
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("latitudTable", { required: true })}
                />
                {errors.latitudTable && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Longitud: <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Ingresa la longitud"
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("ubicacionVivero", { required: true })}
                />
                {errors.ubicacionVivero && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>

              <div className="col-12 col-md-3 mt-4">
                <button
                  className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                  type="button"
                  title="Send"
                // handleAddGrid={handleAddGrid}
                >
                  Guardar
                </button>
              </div>

              <div id="myGrid" className="ag-theme-alpine my-3">
                <div
                  className="ag-theme-alpine "
                  style={{ height: "225px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  // handleAddGrid={handleAddGrid}
                  ></AgGridReact>
                </div>
              </div>
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área de producción: <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  Si {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonSi"
                  />
                </label>
              </div>

              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  No {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonNo"
                  />
                </label>
              </div>
              {errors.radioBoton && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área de preparacion de sustrato: <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  Si {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton2"
                    id="radioBotonSiProd"
                  />
                </label>
              </div>

              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  No {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton2"
                    id="radioBotonNoProd"
                  />
                </label>
              </div>
              {errors.radioBoton2 && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>


            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área de embolsado: <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Selecciona cantidad de embolsado"
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("embolsado", { required: true })}
                />
                {errors.embolsado && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Número de bodegas: <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Selecciona cantidad de bodegas"
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("numeroBodegas", { required: true })}
                />
                {errors.numeroBodegas && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="row d-flex align-items-center my-2 mx-2">
              <div className="col-12 col-md-3">
                <label className="text-terciary">
                  Tipo de vivero: <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check col-12 col-md-2">
                <label className="text-terciary form-check-label ">
                  Mega vivero {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="tipoDeViveroRadio"
                    id="megaViveroRadio"
                  />

                </label>
              </div>

              <div className="form-check col-12 col-md-2">
                <label className="text-terciary form-check-label ">
                  Vivero saliente {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="tipoDeViveroRadio"
                    id="viveroSalienteRadio"
                  />
                </label>
              </div>
              {errors.radioBoton && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Asignar viverista: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="asignarViverista"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      placeholder="Selecciona usuario"
                      {...register("asignarViverista", { required: true })}
                    />
                  )}
                />

                {errors.asignarViverista && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Vivero creado por medio de: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="viveroCreado"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionViveroCreados}
                      placeholder="Seleccione"
                      {...register("viveroCreado", { required: true })}

                    />
                  )}
                />

                {errors.viveroCreado && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
            </div>

            <div className="row d-flex align-items-center mx-2 mt-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Anexar Documentación <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
              </div>
              <div className="col-12 col-md-3 mb-3 mt-5">
                <label>
                  Documentacion sobre creación de vivero (actas de
                  recibo, contratos, planos, diseños) según sa el
                  caso, acta de inicio, estudios previos, toda la
                  documentación es obligatoria
                </label>
              </div>
            </div>
            <div className="row d-grid justify-content-end mt-3">
              <button
                className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                type="submit"
              >
                Crear vivero
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgregarViveroScreen;
