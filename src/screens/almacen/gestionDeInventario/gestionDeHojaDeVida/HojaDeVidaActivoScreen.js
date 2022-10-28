//import "react-quill/dist/quill.snow.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const options = [
  { label: "Periferico 1", value: "PE" },
  { label: "Accesorio 1", value: "AC" },
  { label: "Others", value: "OT" },
];

const optionsApp = [
  { label: "App 1", value: "AP1" },
  { label: "App 2", value: "AP2" },
  { label: "Others", value: "OT" },
];


const HojaDeVidaActivoScreen = () => {
  const { control } = useForm();

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
  const defaultColDef2 = {
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

  let gridApi;
  const rowData = [
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
  ];
  const asignacionPrestamos = [
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
  ];
  const columnDefs = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
    { headerName: "Fecha", field: "FE", minWidth: 150 },
    { headerName: "Estado", field: "ES", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
  ];
  const columnDefs2 = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
    { headerName: "Grupo", field: "GR", minWidth: 150 },
    { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
    { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Hoja de vida de un activo
        </h3>
        <div className="card">
          <form className="multisteps-form__form">
            <div
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
            >
              <div className="multisteps-form__content">
                <div className="row">
                  <label htmlFor="Activo" className="form-control ms-4 fw-bolder text-left">
                    <n>Activo</n>
                  </label> 

                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic ">
                      <input
                        className="form-control"
                        type="text"
                        disabled="true"
                      />
                      <label htmlFor="160064" className="ms-2">160064</label> 
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        disabled="true"
                      />
                      <label htmlFor="#" className="ms-2">Lenovo Laptop</label> 
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4">
                    <label htmlFor="#" className="form-control ms-0 text-center mt-3 ">
                      <n>Serial</n>
                    </label> 
                  </div>
                  <div className="col-12 col-sm-4 ">
                    <label htmlFor="#" className="form-control ms-0 text-center mt-3  ">
                      <n>Artículo</n>
                    </label> 
                  </div>
                  <div className="col-12 col-sm-4"></div>

                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="text"
                        disabled="true"
                      />
                      <label htmlFor="#" className="ms-2">93rtgd</label> 
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="text"
                        disabled="true"
                      />
                      <label htmlFor="#" className="ms-2">Computador</label> 
                    </div>
                  </div>
                </div>

                <div className="row mb-4 ">
                  
                  <label htmlFor="#" className="form-control ms-4 fw-bolder text-left mt-3  ">
                    <n>Caracteristicas</n>
                  </label> 
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center mt-1 ">
                        <n>Sistema Operativo:</n>
                      </label> 
                    </div>
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center  mt-1 ">
                        <n>Suite ofimatica:</n>
                      </label> 
                    </div>
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center  mt-1 ">
                        <n>Antivirus:</n>
                      </label> 
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">93rtgd</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">Computador</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">McAfee</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2 mt-3">
                        <div className="col-12">
                          <label htmlFor="#" className="form-floating input-group input-group-dynamic ms-2">
                            Otros Aplicaciones{" "}
                            <div className="col-12 ">
                              <Controller
                                name="otrasAplicaciones"
                                control={control}
                                rules={{
                                  required: true,
                                }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    options={optionsApp}
                                    placeholder="Seleccionar"
                                  />
                                )}
                              />
                            </div>
                          </label> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label htmlFor="#" className="form-control ms-4 fw-bolder text-left mt-2">
                    <n>Especificaciones fisicas</n>
                  </label> 
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center mt-1 ">
                        <n>Color:</n>
                      </label> 
                    </div>
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center  mt-1 ">
                        <n>Formato:</n>
                      </label> 
                    </div>
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center  mt-1 ">
                        <n>Estado:</n>
                      </label> 
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">Gris</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">Laptop</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">Bueno</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="#" className="form-control ms-0 text-center  mt-1 ">
                        <n>Marca:</n>
                      </label> 
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="#" className="form-control ms-0 text-center  mt-1 ">
                        <n>Modelo:</n>
                      </label> 
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">Lenovo</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">Ideopad</label> 
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label htmlFor="#" className="form-control ms-4 fw-bolder text-left mt-1">
                    <n>Especificaciones técnicas</n>
                  </label> 
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center mt-1 ">
                        <n>Disco duro:</n>
                      </label> 
                    </div>
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center  mt-1 ">
                        <n>Procesadores:</n>
                      </label> 
                    </div>
                    <div className="col-12 col-sm-4">
                      <label htmlFor="#" className="form-control ms-0 text-center  mt-1 ">
                        <n>RAM:</n>
                      </label> 
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">Disco</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">Procesador</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label htmlFor="#" className="ms-2">RAM</label> 
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2 mt-3">
                        <div className="col-12">
                          <label htmlFor="#" className="form-floating input-group input-group-dynamic ms-2">
                            Otros (Perifericos y accesorios){" "}
                            <div className="col-12 ">
                              <Controller
                                name="otrosPerifericos"
                                control={control}
                                rules={{
                                  required: true,
                                }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    options={options}
                                    placeholder="Seleccionar"
                                  />
                                )}
                              />
                            </div>
                          </label> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label htmlFor="#" className="form-control ms-4 fw-bolder text-left mt-auto ms-4">
                    <n>Mantenimientos</n>
                  </label> 
                  <div
                    className="ag-theme-alpine mt-auto mb-3 px-4"
                    style={{ height: "275px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button 
                    className="btn bg-gradient-primary me-md-2"
                    type="button"
                    title="Send"
                  >
                    Programar
                  </button>
                </div>

                <div className="row">
                  <label htmlFor="#" className="form-control ms-4 fw-bolder text-left mt ms-4">
                    <n>Asignaciones/Préstamos</n>
                  </label> 
                  <div
                    className="ag-theme-alpine mt-auto mb-4 px-4"
                    style={{ height: "275px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs2}
                      rowData={asignacionPrestamos}
                      defaultColDef={defaultColDef2}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn bg-gradient-primary me-md-2"
                    type="button"
                    title="Send"
                  >
                    Historico de archivo
                  </button>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn bg-gradient-primary me-md-2"
                    type="button"
                    title="Send"
                  >
                    Guardar
                  </button>
                  <button
                    className="btn bg-gradient-danger "
                    type="button"
                    title="Send"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaActivoScreen;
