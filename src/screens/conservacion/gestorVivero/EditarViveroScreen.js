// import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Subtitle from "../../../components/Subtitle"

const rowDataInicial = [
  { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
  { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
];

const options = [
  { label: "Vivero 1", value: "V1" },
  { label: "Vivero 2", value: "V2" },
  { label: "Vivero 3", value: "V3" },
  { label: "Vivero 4", value: "V4" },
  { label: "Vivero 5", value: "V5" },
  { label: "Vivero 6", value: "V6" },
  { label: "Vivero 7", value: "V7" },
];


function AgregarViveroScreen() {

  const [cambioBoton, setCambioBoton] = useState(false);
  const changeDisabled = () => setCambioBoton(!cambioBoton)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm();

  const [rowData, setRowData] = useState(rowDataInicial)
  const [inactivar, setInactivar] = useState(false)
  const [activar, setActivar] = useState(true)
  const change = () => setInactivar(!inactivar)
  const activate = () => setActivar(activar)

  const onSubmitGuardar = (data) => {
    setBotonGuardar({
      tamano: data.tamano,
      cantidad: data.cantidad,
      etapaMaterialVegetal: data.etapaMaterialVegetal,
    });
  };

  const [botonGuardar, setBotonGuardar] = useState({
    tamano: "",
    cantidad: "",
    etapaMaterialVegetal: "",
  });


  // const gridRef = useRef(); // Optional - for accessing Grid's API


  const [selector, setSelector] = useState({
    seleccioneVivero: "",
  });

  const onSubmit = (data) => {
    setSelector({
      seleccioneVivero: data.seleccioneVivero,
    });
  };
  const onSubmit2 = (data) => {
    setSelector({
      seleccioneVivero: data.seleccioneVivero,
    });
  };



  const guardarDatos = () => {
    //agarrar datos de latitud y longitud, acomodarlos en un objeto
  }

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
        <div className="col-12 ">
          <button className=" border rounded-pill px-3 btn btn-danger me-md-2" type="button" title="Send">
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
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Editar vivero
            </h3>
            <Subtitle title="Edición de vivero" mt={3} />
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Selecciona vivero: <span className="text-danger">*</span>
                </label>

                <Controller
                  name="seleccioneVivero"
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
                {errors.seleccioneVivero && (
                  <small className="text-danger">Este campo es obligatorio</small>
                )}

              </div>
              <div className="col-12 col-md-3">
                <button
                  type="submit"
                  className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
          {
            selector.seleccioneVivero && (
              <form className="row" onSubmit={handleSubmit2(onSubmit2)}>
                <div className="row d-flex align-items-end mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Nombre: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      placeholder="Escribe el nombre del vivero"
                      {...register("nombreViveroEditar", { required: true })}
                    />
                    {errors.nombreViveroEditar && (
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
                      Dirección: <span className="text-danger">*</span>
                    </label>
                    <input
                      name="direccionVivero"
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      placeholder="Escribe la dirección"
                      {...register("direccionVivero", { required: true })}
                    />
                    {errors.direccionVivero && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                </div>

                <Subtitle title="Georreferenciación" mt={3} />
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
                      name="longitudVivero"
                      placeholder="Ingresa la longitud"
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("longitudVivero", { required: true })}
                    />
                    {errors.longitudVivero && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mb-3 mt-5">
                    <button
                      className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                      type="button"
                      title="Send"
                    // handleAddGrid={handleAddGrid}
                    >
                      Guardar
                    </button>
                  </div>

                  <div
                    className="ag-theme-alpine mb-3 "
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

                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Área: <span className="text-danger">*</span>
                    </label>
                    <input
                      name="areaVivero"
                      placeholder="Ingresa área para el vivero"
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("areaVivero", { required: true })}
                    />
                    {errors.areaVivero && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Área de propagación: <span className="text-danger">*</span>
                    </label>
                    <input
                      name="areaPropagacionVivero"
                      placeholder="Selecciona cantidad de área"
                      type="number"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("areaPropagacionVivero", { required: true })}
                    />
                    {errors.areaPropagacionVivero && (
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
                      Area de embolsado: <span className="text-danger">*</span>
                    </label>
                    <input
                      placeholder="Selecciona cantidad de embolsado"
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("areaEmbolsadoVivero", { required: true })}
                    />
                    {errors.areaEmbolsadoVivero && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Numero de bodegas: <span className="text-danger">*</span>
                    </label>
                    <input
                      name="numeroBodegasVivero"
                      placeholder="Selecciona cantidad de bodegas"
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numeroBodegasVivero", { required: true })}
                    />
                    {errors.numeroBodegasVivero && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-4 mb-3">
                    <label className="text-terciary">
                      Estado de bodegas:
                    </label>
                    <div className=" input-group input-group-dynamic ms-1">
                      <button
                        type="button"
                        name="nombre"
                        className="btn btn-primary"
                        onClick={change}
                        onChange={() => setBotonGuardar(true)}
                        disabled={!inactivar ? "false" : ""}
                        {...register("nombre", { required: true })}
                      >
                        Fuera de servicio
                      </button>
                      <button
                        type="button"
                        name="nombre"
                        className="btn btn-primary"
                        onClick={change}
                        disabled={inactivar ? "true" : ""}
                        {...register("nombre", {
                          required: true,
                        })}
                      >
                        Habilitar
                      </button>
                    </div>
                    {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                  </div>
                </div>

                <div className="row d-flex align-items-center mb-2 mx-2">
                  <div className="col-12">
                    <label className="text-terciary">
                      Observación:
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-3"
                      placeholder="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
                      rows={3}
                    />
                  </div>
                  {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}
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
                <div className="d-grid gap-2 d-md-flex justify-content-md-left mt-3">
                  <button
                    type="submit"
                    className="border rounded-pill px-3 btn btn-primary ms-auto mb-0"
                  >
                    Finalizar
                  </button>
                </div>

              </form>
            )
          }
        </div>
      </div>
    </div >
  );
}

export default AgregarViveroScreen;
