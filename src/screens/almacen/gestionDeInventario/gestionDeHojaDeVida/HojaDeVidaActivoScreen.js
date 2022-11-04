//import "react-quill/dist/quill.snow.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Subtitle from '../../../../components/Subtitle'

const options = [
  { label: "Aplicativo 1", value: "A1" },
  { label: "Aplicativo 2", value: "A2" },
  { label: "Aplicativo 3", value: "A3" },
  { label: "Aplicativo 4", value: "A4" },
];

const options2 = [
  { label: "Periferico 1", value: "P1" },
  { label: "Periferico 1", value: "P2" },
  { label: "Accesorio 1", value: "A1" },
  { label: "Accesorio 1", value: "A2" },
];

const HojaDeVidaActivoScreen = () => {

  const onSubmit = (data) => {
    console.log(data)
  };

  const { register, control, handleSubmit } = useForm();

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
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Hoja de vida de un activo
            </h3>
            <MarcaDeAgua1>
              <Subtitle title="Activo" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Codigo:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Nombre:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Serial:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-lg-4 col-sm-4 mb-3">
                  <label>
                    Tipo de articulo:
                  </label>
                  <input
                    disabled="true"
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Caracteristicas" mt={3} />

              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Sistema operativo:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("sistemasOperativosCaracteristicas", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Suite ofimática:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("suiteOfimaticaCaracteristicas", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Antivirus:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("antivirusCaracteristicas", { required: true })}
                  />
                </div>
                <div className="col-12 col-lg-4 col-sm-4 mb-3">
                  <label className="text-terciary">
                    Otros aplicativos{" "}
                  </label>
                  <Controller
                    name="tipoDocumentoResponsable"
                    control={control} rules={{
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
              </div>

              <Subtitle title="Especificaciones físicas" mt={3} />

              <div className="row d-flex align-items-center mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Color:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("colorEspecificaciones", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Marca:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("marcaEspecificaciones", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Formato:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("formatoEspecificaciones", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Modelo:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("modeloEspecificaciones", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Estado:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("estadoEspecificaciones", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Especificaciones técnicas" mt={3} />
              <div className="row d-flex align-items-center mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Disco duro:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("discoDuro", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Suite ofimática:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("suiteOfimaticaCaracteristicas", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Antivirus:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("antivirusCaracteristicas", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Otros (Perifericos y accesorios){" "}
                  </label>
                  <Controller
                    name="otrosPerifericos"
                    control={control} rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={options2}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>

              <Subtitle title="Mantenimientos" mt={3} mb={3}/>

              <div className="row d-flex align-items-center mt-2 mx-2">
                <div className="col-12 mb-3">
                  <div
                    className="ag-theme-alpine mt-auto mb-3 px-auto"
                    style={{ height: "275px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
                      defaultColDef={defaultColDef}
                    // onGridReady={onGridReady}
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                    type="button"
                    title="Send"
                  >
                    Programar
                  </button>
                </div>
              </div>

              <Subtitle title="Mantenimientos" mt={3} mb={3}/>
              <div className="row d-flex align-items-center mt-2 mx-2">

                <div className="col-12 mb-3">                  <div
                  className="ag-theme-alpine mt-auto mb-3 px-auto"
                  style={{ height: "275px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs2}
                    rowData={asignacionPrestamos}
                    defaultColDef={defaultColDef2}
                  // onGridReady={onGridReady}
                  />
                </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                    type="button"
                    title="Send"
                  >
                    Historico de archivo
                  </button>
                </div>
              </div>

              <div className="row mb-3">
                <div className="d-grid gap-2 d-md-flex justify-content-md-left col-12 col-lg-6 col-sm-6">

                  <button
                    className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Orden de la compra
                  </button>

                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end col-12 col-lg-6 col-sm-6">
                  <button
                    className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Guardar
                  </button>
                  <button
                    className="border rounded-pill px-3 btn bg-gradient-danger mb-3 text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Salir
                  </button>

                </div>
              </div>
            </MarcaDeAgua1>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaActivoScreen;
