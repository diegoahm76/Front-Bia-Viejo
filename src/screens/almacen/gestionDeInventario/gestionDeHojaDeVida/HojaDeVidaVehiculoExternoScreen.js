//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from "../../../../components/Subtitle"


const options = [
  { label: "Platon", value: "PL" },
  { label: "Cabina", value: "CA" },
  { label: "Otros", value: "OT" },
];

const HojaDeVidaVehiculoExternoScreen = () => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();


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

  const columnDefs2 = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
    { headerName: "Grupo", field: "GR", minWidth: 150 },
    { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
    { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
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
      GR: "Contabilidad",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Prestamos",
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

  let gridApi;

  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Hoja de vida de un vehiculo en arriendo
            </h3>
            <MarcaDeAgua1>
              <Subtitle title="Activo" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Código:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreVivero", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreVivero", { required: true })}
                  />
                </div>
              </div>

              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Placa:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreVivero", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo{" "}
                  </label>
                  <Select
                    options={options}
                    placeholder="Seleccionar"
                  />
                </div>
              </div>

              <Subtitle title="Especificaciones" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Marca:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreVivero", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Modelo:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreVivero", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Linea:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreVivero", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de llegada:
                  </label>
                  <input
                    type="date"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreVivero", { required: true })}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Capacidad pasajeros:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("capacidadPasajeros", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo de combustible:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("tipoCombustible", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Cilindraje:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("cilindraje", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Color:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("color", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Información adicional" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Numero de motor:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numeroMotor", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Numero de chasis:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numeroChasis", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    clase de vehiculo:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("tipoVehiculo", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Proveedor:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("proveedor", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Control de documentación" mt={3} />
              <div className="row col-12 col-md-4 ms-2">
                <Subtitle title="1) Seguro obligatorio" mt={3} />
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Aseguradora:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("aseguradora", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Número:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numero", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha inicial:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("fechaInicial", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de vencimiento:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("fechaVencimiento", { required: true })}
                  />
                </div>
              </div>
              <div className="row col-12 col-md-4 ms-2">
                <Subtitle title="2) Certificado ATM" mt={3} />
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de realización:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("fechaRealizacion", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de vencimiento:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("fechaVencimientoATM", { required: true })}
                  />
                </div>
              </div>

              <div className="row col-12 col-md-4 ms-2 mb-0">
                {/* <Subtitle title="3) Póliza todo riesgo" mt={3} /> */}
                <h5>Póliza todo riesgo</h5>
              </div>
              <hr className="rounded-pill hr-modal mt-0" />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Aseguradora:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("aseguradoraPoliza", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha inicial:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("fechaInicialAseguradoraPoliza", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha final:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("fechaFinalAseguradoraPoliza", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Asignaciones y préstamos" mt={3} mb={3} />


              
              <div className="row">
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
                  Movimientos de vehiculo
                </button>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="btn bg-gradient-primary me-md-2"
                  type="submit"
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

            </MarcaDeAgua1>
          </form>
        </div>
      </div>
    // </div>
  );
};
export default HojaDeVidaVehiculoExternoScreen;
