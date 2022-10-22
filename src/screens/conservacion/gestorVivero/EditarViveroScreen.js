// import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


const rowDataInicial = [
  { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
  { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
];

const options = [
  { label: "Vivero1", value: "Vivero1" },
  { label: "Vivero2", value: "Vivero2" },
  { label: "Vivero3", value: "Vivero3" },
  { label: "Vivero4", value: "Vivero4" },
  { label: "Vivero5", value: "Vivero5" },
  { label: "Vivero6", value: "Vivero6" },
  { label: "Vivero7", value: "Vivero7" },
];


function AgregarViveroScreen() {
  const { register, control, handleSubmit, formState: { errors }, } = useForm();
  const [rowData] = useState(rowDataInicial)

  // const gridRef = useRef(); // Optional - for accessing Grid's API

  const [selecOpciones, setSelecOpciones] = useState({
    asignarViverista: ""
  });
  const guardarDatos = () => {
    //agarrar datos de latitud y longitud, acomodarlos en un objeto
  }
  const onSubmit = (data) => {
    setSelecOpciones({
      asignarViverista: data.asignarViverista,
    });
  };
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
      headerName: "Acción", field: "accion", cellRendererFramework: (params) => (
        <div>
          <button className="btn btn-danger me-md-2" type="button" title="Send">
            Eliminar
          </button>
        </div>
      ),
    },


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
  // const onExportClick = () => {
  //   gridApi.exportDataAsCsv();
  // };

  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // handle click event of the Remove button
  // const handleRemoveClick = (index) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Editar vivero</h3>
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

            <div className="row my-2  align-items-center  ">
              <div className="form-group mt-3 col-6 col-sm-6">
                <label className="font-weight" for="cantidadKg">
                  Selecciona vivero:
                </label>

                <Controller
                  name="asignarViverista"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.asignarViverista && (
                  <small className="text-danger">Este campo es obligatorio</small>
                )}

              </div>
              <div class="col-6 mt-5">
                <button
                  className="btn bg-gradient-primary mb-0 text-capitalize"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Buscar
                </button>
              </div>
            </div>


            {
              selecOpciones.asignarViverista && (

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
                        {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="form-group mt-3 col-12 col-sm-6">
                        <label className="font-weight" for="cantidadKg">
                          Municipio:
                        </label>

                        <Controller
                          name="municipio"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              opcionMunicipio={opcionMunicipio}
                              placeholder="Selecciona municipio"
                            />
                          )}
                        />
                                        {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                      </div>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="form-group mt-3 col-12 col-sm-6">
                      <label className="font-weight" for="cantidadKg">
                        Municipio:
                      </label>
                      <div className="input-group input-group-dynamic ms-1">
                        <input
                          className="multisteps-form__input form-control "
                          type="text"
                          placeholder="Escribe la dirección"
                          name="nombre"
                          {...register("nombre", { required: true })}
                        />
                      </div>
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                    </div>
                  </div>

                  <div className="row my-3">
                    <div className="form-group mt-3 col-12 col-sm-6">
                      <label className="font-weight" for="cantidadKg">
                        Dirección de:
                      </label>
                      <div className="input-group input-group-dynamic ms-1">
                        <input
                          className="multisteps-form__input form-control "
                          type="text"
                          placeholder="Ingresa ubicación de vivero"
                          name="nombre"
                          {...register("nombre", { required: true })}
                        />
                      </div>
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

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
                        className="btn btn-primary"
                        type="button"
                        title="Send"
                        onClick={guardarDatos}
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
                      ></AgGridReact>
                      <div></div>
                    </div>
                  </div>

                  <div className="row my-2">
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
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                    </div>
                  </div>

                  <div className="row my-2">
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
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

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
                              for="RadioBotonSustratoSi"
                            >
                              Si
                            </label>
                            <input
                              className="form-check-input ms-2"
                              type="radio"
                              name="RadioBotonSustrato"
                              id="RadioBotonSustratoSi"
                            ></input>
                          </div>
                        </Col>
                        <Col>
                          <div className="form-check">
                            <label
                              className="form-check-label mb-2"
                              for="RadioBotonSustratoNo"
                            >
                              No
                            </label>
                            <input
                              className="form-check-input ms-2"
                              type="radio"
                              name="RadioBotonSustrato"
                              id="RadioBotonSustratoNo"
                            ></input>
                            <span className="text-danger mt-0 ms-1">*</span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <Col></Col>
                  </div>

                  <div className="row my-2">
                    <div className="form-group mt-3 col-12 col-sm-6">
                      <label className="font-weight" for="cantidadKg">
                        Área de embolsado:
                      </label>
                      <div className="input-group input-group-dynamic ms-1">
                        <input
                          className="multisteps-form__input form-control "
                          type="text"
                          placeholder="Selecciona cantidad de embolsado"
                          name="nombre"
                          {...register("nombre", { required: true })}
                        />
                      </div>
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="form-group mt-3 col-12 col-sm-6">
                      <label className="font-weight" for="cantidadKg">
                        Número de bodegas:
                      </label>
                      <div className="input-group input-group-dynamic ms-1">
                        <input
                          className="multisteps-form__input form-control "
                          type="text"
                          placeholder="Selecciona cantidad de bodegas"
                          name="nombre"
                          {...register("nombre", { required: true })}
                        />
                      </div>
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="form-group mt-3 col-12 col-sm-6">
                      <label className="font-weight" for="cantidadKg">
                        Número de bodegas:
                      </label>
                      <div className="input-group input-group-dynamic ms-1">
                        <button
                          type="button"
                          placeholder="Selecciona cantidad de bodegas"
                          name="nombre"
                          className="btn btn-secondary"
                          {...register("nombre", { required: true })}
                        >
                          Fuera de servicio
                        </button>
                        <button
                          type="button"
                          placeholder="Selecciona cantidad de bodegas"
                          name="nombre"
                          className="btn btn-secondary"
                          {...register("nombre", {
                            required: true,
                            disabled: true,
                          })}
                        >
                          Habilitar
                        </button>
                      </div>
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mt-3 col-12 col-sm-6">
                      <div className="input-group input-group-dynamic flex-column my-auto">
                        <label htmlFor="exampleFormControlTextArea">
                          Observación
                        </label>

                        <textarea
                          className="multisteps-form__textarea form-control p-0 w-auto ms-1"
                          type="number"
                          placeholder="Describir la razón"
                          name="nombre"
                          {...register("nombre", { required: true })}
                        />
                      </div>
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                    </div>
                  </div>

                  <div class="my-3">
                    <label for="formFileMultiple" class="form-label">
                      Anexar archivos
                    </label>
                    <input
                      class="form-control ms-1"
                      type="file"
                      id="formFileMultiple"
                      multiple
                    />
                  </div>

                  {/* <div className="col-8 col-sm-5 my-3">
                  <div className="input-group input-group-dynamic flex-column">
                    <label htmlFor="exampleFormControlInput1">Vivero creado por medio de:</label>
                    <input
                      className="multisteps-form__input form-control p-0 w-auto"
                      type="number"
                      placeholder="Recursos propios de la corporacion"
                      name="nombre"
                      {...register("nombre", { required: true })}
                    />
                  </div>
                  {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}
                </div> */}

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

                  <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    <button
                      className="btn btn-primary ms-auto mb-0"
                      type="button"
                      title="Send"
                    >
                      Crear vivero
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarViveroScreen;
