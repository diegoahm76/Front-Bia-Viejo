// import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import React, { useRef, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function AgregarViveroScreen() {
  const { register, control, handleSubmit, formState: { errors }, } = useForm();
  const [inputList, setInputList] = useState([{ Latitud: "", longitud: "" }]);
  const gridRef = useRef(); // Optional - for accessing Grid's API

  const [vivero, setVivero] = useState("");
  const [siembra, setSiembra] = useState("");

  const handleAddGrid = (dataAdd) => {
    console.log(dataAdd)

  }

  const onSubmit = (data) => {
    console.log(data)
    setVivero(data.seleccioneVivero.value);
    setSiembra(data.periodoSiembra.value);
  };

  const options = [
    { label: "Acacías", value: "Acac" },
    { label: "Barranca de Upía", value: "Barra" },
    { label: "Cabuyaro", value: "Cabuy" },
    { label: "Castilla La Nueva", value: "Cast" },
    { label: "Cubarral", value: "Cuba" },
    { label: "Cumaral", value: "Cuma" },
    { label: "El Calvario", value: "Elca" },
  ];
  const opcionMunicipio = [
    { label: "Acacías", value: "Acac" },
    { label: "Barranca de Upía", value: "Barra" },
    { label: "Cabuyaro", value: "Cabuy" },
    { label: "Castilla La Nueva", value: "Cast" },
    { label: "Cubarral", value: "Cuba" },
    { label: "Cumaral", value: "Cuma" },
    { label: "El Calvario", value: "Elca" },
  ];

  // Each Column Definition results in one Column.
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
            className="btn bg-gradient-danger me-md-2"
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
    editable: true,
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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Agregar Vivero</h3>
        {/* <p className="lead font-weight-normal opacity-8 mb-7 text-center">
          This information will let us know more about you.
        </p> */}
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          {/* <!--single form panel--> */}
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >

            <div className="multisteps-form__content">
              <div class="row">
                <div className="row my-3">
                  <div className="form-group mt-3 col-12 col-sm-6">
                    <label className="font-weight" for="cantidadKg">
                      Nombre:
                    </label>
                    <div className="input-group input-group-dynamic ">
                      <input
                        className="multisteps-form__input form-control ms-1"
                        type="text"
                        placeholder="Ingresa el nombre del vivero"
                        name="nombre"
                        {...register("nombre", { required: true })}
                      />
                    </div>
                    {errors.nombre && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>
                </div>
                <div className="row my-2">
                  <div className="form-group mt-3 col-12 col-sm-6">
                    <label className="font-weight" for="cantidadKg">
                      Municipio:
                    </label>

                    <Controller
                      name="asignarViverista"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          placeholder="Selecciona municipio"
                        />
                      )}
                    />
                    {errors.nombre && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>
                </div>
              </div>



              <div className="row my-3">
                <div className="form-group mt-3 col-12 col-sm-6">
                  <label className="font-weight" for="cantidadKg">
                    Dirección de:
                  </label>
                  <div className="input-group input-group-dynamic ">
                    <input
                      className="multisteps-form__input form-control ms-1"
                      type="text"
                      rules={{ required: true }}
                      placeholder="Ingresa ubicación de vivero"
                      name="nombre"
                      {...register("nombre", { required: true })}
                    />
                  </div>
                  {errors.nombre && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>

              <div className="row my-3">
                <div className="form-group mt-3 col-12 col-sm-6">
                  <label className="font-weight" for="cantidadKg">
                    Área:
                  </label>
                  <div className="input-group input-group-dynamic ms-1">
                    <input
                      className="multisteps-form__input form-control "
                      type="text"
                      placeholder="Ingresa área para el vivero"
                      name="nombre"
                      {...register("nombre", { required: true })}
                    />
                  </div>
                  {errors.nombre && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>
              <div className="row my-3">
                <div className="form-group mt-3 col-12 col-sm-6">
                  <label className="font-weight" for="cantidadKg">
                    Área de propagación:
                  </label>
                  <div className="input-group input-group-dynamic ms-1">
                    <input
                      className="multisteps-form__input form-control "
                      type="text"
                      placeholder="Selecciona cantidad de área"
                      name="nombre"
                      {...register("nombre", { required: true })}
                    />
                  </div>
                  {errors.nombre && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group mt-3 col-4 col-sm-4">
                  <label className="font-weight" for="cantidadKg">
                    Georreferenciación:
                    <span className="text-danger mt-0 ms-1">*</span>
                  </label>
                  <div className="input-group input-group-dynamic flex-column">
                    <label htmlFor="exampleFormControlInput1">Latitud</label>
                    <input
                      className="multisteps-form__input form-control w-auto"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-group mt-auto col-4 col-sm-4">
                  <div className="input-group input-group-dynamic flex-column">
                    <label htmlFor="exampleFormControlInput1">Longitud</label>
                    <input
                      className="multisteps-form__input form-control w-auto"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-4 col-sm-4 mt-5">
                  <button
                    className="btn bg-gradient-primary "
                    type="button"
                    title="Send"
                    handleAddGrid={handleAddGrid}
                    
                  >
                    Guardar
                  </button>
                </div>

                <div
                  className="ag-theme-alpine mt-3 mb-2 "
                  style={{ height: "225px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    handleAddGrid={handleAddGrid}
                    
                  ></AgGridReact>
                  <div></div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 col-sm-4">
                  <div className="input-group input-group-dynamic">
                    <label className="font-weight">área de produccion</label>
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
                          Si
                        </label>
                        <input
                          className="form-check-input ms-2"
                          type="radio"
                          name="radioBoton"
                          id="radioBotonSi"
                        ></input>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-check">
                        <label
                          className="form-check-label mb-2"
                          for="radioBotonNo"
                        >
                          No
                        </label>
                        <input
                          className="form-check-input ms-2"
                          type="radio"
                          name="radioBoton"
                          id="radioBotonNo"
                        ></input>
                        <span className="text-danger mt-0 ms-1">*</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Col></Col>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-sm-4">
                  <div className="input-group input-group-dynamic">
                    <label className="font-weight">
                      área de preparación de sustrato
                    </label>
                  </div>
                </div>
                <div className="col-12 col-sm-4 ">
                  <Row>
                    <Col>
                      <div className="form-check">
                        <label
                          className="form-check-label mb-2"
                          for="flexRadioDefault1"
                        >
                          Si
                        </label>
                        <input
                          className="form-check-input ms-2"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-check">
                        <label
                          className="form-check-label mb-2"
                          for="flexRadioDefault1"
                        >
                          No
                        </label>
                        <input
                          className="form-check-input ms-2"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                        <span className="text-danger mt-0 ms-1">*</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Col></Col>
              </div>

              <Row>
                <div className="col-6 col-sm-5">
                  <div className="input-group input-group-dynamic flex-column col-6 col-sm-5">
                    <label htmlFor="exampleFormControlInput1">
                      Area de embolsado
                    </label>
                    <input
                      className="multisteps-form__input form-control p-0 w-auto  ms-1"
                      type="text"
                      placeholder="Nombre"
                      name="nombre"
                      {...register("nombre", { required: true })}
                    />
                  </div>
                  <div className="col-6 col-sm-4"></div>
                  {errors.nombre && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </Row>

              <Row>
                <div className="col-6 col-sm-5">
                  <div className="input-group input-group-dynamic flex-column col-6 col-sm-5 my-3">
                    <label htmlFor="exampleFormControlInput1">
                      Numero de bodegas
                    </label>
                    <input
                      className="multisteps-form__input form-control p-0 w-auto ms-1"
                      type="number"
                      placeholder="Cantidad de bodegas"
                      name="nombre"
                      {...register("nombre", { required: true })}
                    />
                  </div>
                  <div className="col-6 col-sm-4"></div>
                  {errors.nombre && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </Row>

              <div className="row mt-3">
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
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                        <label
                          className="form-check-label mb-2"
                          for="flexRadioDefault1"
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
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                        <label
                          className="form-check-label mb-2"
                          for="flexRadioDefault1"
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
                <div className="col-6 col-sm-5">
                  <div className="input-group input-group-dynamic flex-column col-6 col-sm-5">
                    <label htmlFor="exampleFormControlInput1">
                      Asignar viverista
                    </label>
                    <Controller
                      name="opcionViverista"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          placeholder="Seleccione"
                        />
                      )}
                    />
                  </div>
                  <div className="col-6 col-sm-4"></div>
                  {errors.nombre && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </Row>

              <div className="col-8 col-sm-5 my-3">
                <div className="input-group input-group-dynamic flex-column">
                  <label htmlFor="exampleFormControlInput1">
                    Vivero creado por medio de:
                  </label>
                  <input
                    className="multisteps-form__input form-control p-0 w-auto"
                    type="number"
                    placeholder="Recursos propios de la corporacion"
                    name="nombre"
                    {...register("nombre", { required: true })}
                  />
                </div>
                {errors.nombre && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>

              {/* <div className="row mt-3">
                  <div className="col-5 col-sm-3">
                    <div className="input-group input-group-dynamic">
                      <label className="font-weight">
                        Anexar documentación:
                      </label>
                    </div>
                  </div>
                  <div className="col-7 col-sm-8 ">
                    <Row>
                      <Col>
                         <div className="input-group input-group-dynamic">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >

                          </label>
                          <input
                            className="multisteps-form__input form-control"
                            type="file"
                            {...register("option5")}
                          />
                        </div>
                        

                      </Col>

                    </Row>
                  </div>
                </div> */}
              <div className="row">
                <div className=" mb-3 col-8 col-sm-6">
                  <label for="formFileMultiple" class="form-label">
                    Anexar archivos
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
                  className="btn bg-gradient-primary ms-auto mb-0"
                  type="button"
                  title="Send"
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
