//import "react-quill/dist/quill.snow.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";


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
              <MarcaDeAgua1>
                <div className="row mb-3">
                  <div className="multisteps-form__content">
                    <div className="row mb-3">
                      <label className="form-control border rounded-pill px-3 bg-success mt-3 text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                        <n>Activo</n>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Codigo:
                    </label>
                    <input
                      name="codigoActivo"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Nombre:
                    </label>
                    <input
                      name="nombreActivo"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Serial:
                    </label>
                    <input
                      name="serialActivo"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Tipo de articulo:
                    </label>
                    <input
                      name="tipoArticuloActivo"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="multisteps-form__content">
                    <div className="row mb-3">
                      <label className="form-control border rounded-pill px-3 bg-success text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                        <n>Caracteristicas</n>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Sistema operativo:
                    </label>
                    <input
                      name="sistemasOperativosCaracteristicas"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Suite ofimática:
                    </label>
                    <input
                      name="suiteOfimaticaCaracteristicas"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Antivirus:
                    </label>
                    <input
                      name="antivirusCaracteristicas"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
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

                <div className="row mb-3">
                  <div className="multisteps-form__content">
                    <div className="row mb-3">
                      <label className="form-control border rounded-pill px-3 bg-success text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                        <n>Especificaciones fisicas</n>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Color:
                    </label>
                    <input
                      name="colorEspecificaciones"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Marca:
                    </label>
                    <input
                      name="marcaEspecificaciones"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Formato:
                    </label>
                    <input
                      name="formatoEspecificaciones"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Modelo:
                    </label>
                    <input
                      name="modeloEspecificaciones"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Estado:
                    </label>
                    <input
                      name="estadoEspecificaciones"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="multisteps-form__content">
                    <div className="row mb-3">
                      <label className="form-control border rounded-pill px-3 bg-success text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                        <n>Especificaciones tecnicas</n>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Disco duro:
                    </label>
                    <input
                      name="discoDuro"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Suite ofimática:
                    </label>
                    <input
                      name="suiteOfimaticaCaracteristicas"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
                      Antivirus:
                    </label>
                    <input
                      name="antivirusCaracteristicas"
                      disabled="true"
                      type="text"
                      className="form-control border rounded-pill px-3"
                    // {...register("nombreUsuario", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4 mb-3">
                    <label>
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

                <div className="multisteps-form__content">
                  <div className="row">
                    <div className="multisteps-form__content">
                      <div className="row mb-3">
                        <label className="form-control border rounded-pill px-3 bg-success text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                          <n>Mantenimientos</n>
                        </label>
                      </div>
                    </div>

                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
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
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                      type="button"
                      title="Send"
                    >
                      Programar
                    </button>
                  </div>

                  <div className="row">
                    <div className="multisteps-form__content">
                      <div className="row mb-3">
                        <label className="form-control border rounded-pill px-3 bg-success text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                          <n>Asignaciones y prestamos</n>
                        </label>
                      </div>
                    </div>
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
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
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                      type="button"
                      title="Send"
                    >
                      Historico de archivo
                    </button>
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
                </div>
              </MarcaDeAgua1>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaActivoScreen;
