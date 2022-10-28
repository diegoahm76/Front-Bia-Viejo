import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

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
        <div>
          <button
            className="form-control border rounded-pill px-3 btn bg-gradient-danger me-md-2"
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
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

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
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Agregar Vivero</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <div className="multisteps-form__content">
              <div class="row">
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label>
                    Nombre: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="nombreVivero"
                    type="text"
                    className="form-control border rounded-pill px-3"
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
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label htmlFor="municipioOption">
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
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label>
                    Direccion de: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="ubicacionVivero"
                    placeholder="Ingresa ubicación del vivero"
                    type="text"
                    className="form-control border rounded-pill px-3"
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

              <div class="row mb-3">
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label>
                    Área: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="nombreVivero"
                    type="text"
                    className="form-control border rounded-pill px-3"
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
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label>
                    Área de preparación: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="ubicacionVivero"
                    placeholder="Ingresa cantidad de area"
                    type="text"
                    className="form-control border rounded-pill px-3"
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

              <div className="multisteps-form__content mb-3">
                <div className="row">
                  <label className="form-control border rounded-pill px-3 bg-success mt-3">
                    <n>Georreferenciación</n>
                  </label>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label>
                    Latitud: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="latitudTable"
                    placeholder="Ingresa la latitud"
                    type="text"
                    className="form-control border rounded-pill px-3"
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
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label>
                    Longitud: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="ubicacionVivero"
                    placeholder="Ingresa la longitud"
                    type="text"
                    className="form-control border rounded-pill px-3"
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
                <div class="col-4 col-sm-4 mt-auto">
                  <button
                    className="form-control border rounded-pill px-3 btn bg-gradient-primary"
                    type="button"
                    title="Send"
                  // handleAddGrid={handleAddGrid}
                  >
                    Guardar
                  </button>
                </div>

                <div
                  className="ag-theme-alpine my-3 "
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

              <div class="row mb-3">
                <div className="col-12 col-sm-4">
                  <div className="input-group input-group-dynamic">
                    <label className="font-weight">Área de produccion</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4 ">
                  <Row>
                    <Col>
                      <div className="form-check">
                        <label
                          className="form-check-label mb-2"
                          for="radioBotonSi"
                        >
                          Si {""}
                          <input
                            className="form-check-input ms-2"
                            type="radio"
                            name="radioBoton"
                            id="radioBotonSi"
                          />
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-check">
                        <label
                          className="form-check-label mb-2"
                          for="radioBotonNo"
                        >
                          No {""}

                          <input
                            className="form-check-input ms-2"
                            type="radio"
                            name="radioBoton"
                            id="radioBotonNo"
                          />
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                    </Col>
                    {errors.radioBoton && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </Row>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-4">
                  <div className="input-group input-group-dynamic">
                    <label className="font-weight">
                      Área de preparación de sustrato
                    </label>
                  </div>
                </div>
                <div className="col-12 col-sm-4 ">
                  <Row>
                    <Col>
                      <div className="form-check">
                        <label
                          className="form-check-label mb-2"
                          for="radioBotonSiProd"
                        >
                          Si {""}

                          <input
                            className="form-check-input ms-2"
                            type="radio"
                            name="radioBoton2"
                            id="radioBotonSiProd"
                          />
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-check">
                        <label
                          className="form-check-label mb-2"
                          for="radioBotonNoProd"
                        >
                          No {""}
                          <input
                            className="form-check-input ms-2"
                            type="radio"
                            name="radioBoton2"
                            id="radioBotonNoProd"
                          />
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                    </Col>
                    {errors.radioBoton2 && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </Row>
                </div>
              </div>


              <div className="row mb-3">
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label>
                    Área de embolsado: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="embolsado"
                    placeholder="Selecciona cantidad de embolsado"
                    type="text"
                    className="form-control border rounded-pill px-3"
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
                <div className="col-12 col-sm-4 col-lg-4 mb-3">
                  <label>
                    Número de bodegas: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="numeroBodegas"
                    placeholder="Selecciona cantidad de bodegas"
                    type="number"
                    className="form-control border rounded-pill px-3"
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

              <div className="row mb-3">
                <div className="col-12 col-sm-4">
                  <div className="input-group input-group-dynamic">
                    <label className="font-weight">Tipo de vivero</label>
                  </div>
                </div>
                <div className="col-12 col-sm-8 ">
                  <Row>
                    <Col>
                      <div className="form-check">
                        <input
                          className="form-check-input ms-2"
                          type="radio"
                          name="tipoDeViveroRadio"
                          id="megaViveroRadio"
                        ></input>
                        <label
                          className="form-check-label mb-2"
                          for="megaViveroRadio"
                        >
                          mega vivero
                        </label>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-check">
                        <input
                          className="form-check-input ms-2"
                          type="radio"
                          name="tipoDeViveroRadio"
                          id="viveroSalienteRadio"
                        ></input>
                        <label
                          className="form-check-label "
                          for="viveroSalienteRadio"
                        >
                          vivero saliente
                        </label>
                        <span className="text-danger mt-0 ms-1">*</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <Col></Col>
              <Row>
                <div className="row mb-3">
                  <div className="col-12 col-sm-4 col-lg-4 mb-3">
                    <div className="input-group input-group-dynamic flex-column col-6 col-sm-5">
                      <label htmlFor="asignarViverista">
                        Asignar viverista: <span className="text-danger">*</span>
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
                      </label>
                      {errors.asignarViverista && (
                        <p className="text-danger">Este campo es obligatorio</p>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-lg-4 mb-3">
                    <div className="input-group input-group-dynamic flex-column col-6 col-sm-5">
                      <label htmlFor="viveroCreado">
                        Vivero creado por medio de: <span className="text-danger">*</span>
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
                      </label>
                      {errors.viveroCreado && (
                        <p className="text-danger">Este campo es obligatorio</p>
                      )}
                    </div>
                  </div>
                </div>
              </Row>

              <div className="row">
                <div className=" mb-3 col-8 col-sm-6">
                  <label for="formFileMultiple" class="form-label">
                    Anexar Documentación <span className="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFileMultiple"
                    multiple
                  />
                </div>
                <div className="col-4 col-sm-4 mt-4">
                  <label className="mt-5">
                    Documentacion sobre creación de vivero (actas de
                    recibo, contratos, planos, diseños) según sa el
                    caso, acta de inicio, estudios previos, toda la
                    documentación es obligatoria
                  </label>
                </div>
              </div>
              <div className="button-row ">
                <button
                  className="form-control border rounded-pill px-3 btn bg-gradient-primary mb-0 text-capitalize"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Crear vivero
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarViveroScreen;
