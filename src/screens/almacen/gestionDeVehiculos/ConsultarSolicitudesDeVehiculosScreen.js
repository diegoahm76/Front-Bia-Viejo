import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import CalendarModal from "../../../components/CalendarModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  suppressMovable: true,
};

const rowData = [
  {
    Consecutivo: "0001",
    Destino: "Juan Carlos",
    "Fecha entrada": "La bella",
    "Fecha salida": "10/09/2022",
    Estado: "En cola de espera",
  },
  {
    Consecutivo: "0002",
    Destino: "Juan David",
    "Fecha entrada": "La bella",
    "Fecha salida": "12/09/2022",
    Estado: "En cola de espera",
  },
  {
    Consecutivo: "0003",
    Destino: "Jesus Esteban",
    "Fecha entrada": "Paz de ariporo",
    "Fecha salida": "27/09/2022",
    Estado: "En cola de espera",
  },
  {
    Consecutivo: "0004",
    Destino: "Santiago Aguirre",
    "Fecha entrada": "Paz de ariporo",
    "Fecha salida": "30/09/2022",
    Estado: "En cola de espera",
  },
  {
    Consecutivo: "0005",
    Destino: "Marcos Rivera",
    "Fecha entrada": "La bella",
    "Fecha salida": "01/09/2022",
    Estado: "En cola de espera",
  },
];

const ConsultarSolicitudesDeVehiculosScreen = () => {
  const [viewData, setViewData] = useState(false);
  const [tipoAccion, setTipoAccion] = useState("");
  const dispatch = useDispatch();

  const columnDefs = [
    { headerName: "Consecutivo", field: "Consecutivo" },
    { headerName: "Destino", field: "Destino" },
    { headerName: "Fecha entrada", field: "Fecha entrada" },
    { headerName: "Fecha salida", field: "Fecha salida" },
    { headerName: "Estado", field: "Estado" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-primary mx-auto my-auto btn-sm text-xxs text-capitalize"
            onClick={() => {
              setViewData(true);
            }}
          >
            Consultar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Consultar solicitudes de vehículos
        </h3>
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <MarcaDeAgua1>
            <div id="myGrid" className="ag-theme-alpine mt-3">
              <div
                className="container ag-theme-alpine"
                style={{ height: "300px", maxWidth: "800px" }}
              >
                <AgGridReact
                  className="ag-theme-alpine"
                  animateRows="true"
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>

              <form className="row">
                {viewData && (
                  <>
                    <h5 className="font-weight-bolder mt-4">Coordinador</h5>

                    <div className="col-12 col-lg-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Tipo de documento"
                          disabled
                          value="C.C."
                        />
                        <label className="ms-2">Tipo de documento:</label>
                      </div>
                    </div>

                    <div className="col-6 col-lg-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Número de documento"
                          disabled
                          value="1151231231"
                        />
                        <label className="ms-2">Número de documento:</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="nombre"
                        />
                        <label className="ms-2">Nombre</label>
                      </div>
                    </div>

                    <h5 className="font-weight-bolder mt-4">Solicitante</h5>

                    <div className="col-12 col-lg-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Tipo de documento"
                          disabled
                          value="C.C."
                        />
                        <label className="ms-2">Tipo de documento:</label>
                      </div>
                    </div>

                    <div className="col-6 col-lg-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Número de documento"
                          disabled
                          value="1151231231"
                        />
                        <label className="ms-2">Número de documento:</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="nombre"
                        />
                        <label className="ms-2">Nombre</label>
                      </div>
                    </div>

                    <h5 className="font-weight-bolder mt-4">Datos vehículo</h5>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="dependencia"
                        />
                        <label className="ms-2">Dependencia</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="grupo"
                        />
                        <label className="ms-2">Grupo</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="capacidadPasajeros"
                        />
                        <label className="ms-2">Capacidad pasajeros</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="transporteCarga"
                        />
                        <label className="ms-2">Transporte carga</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="horaDeSalida"
                        />
                        <label className="ms-2">Hora de salida</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="horaDeLlegada"
                        />
                        <label className="ms-2">Hora de llegada</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="fechaDeSalida"
                        />
                        <label className="ms-2">Fecha de salida</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value="Junior"
                          placeholder="fechaDeLlegada"
                        />
                        <label className="ms-2">Fecha de llegada</label>
                      </div>
                    </div>

                    <div className="input-group input-group-dynamic flex-column mt-3">
                      <label htmlFor="exampleFormControlInput1 ">
                        Observaciones
                      </label>
                      <textarea
                        className="multisteps-form__input form-control p-2 mw-100 w-auto"
                        type="text"
                        rows="5"
                        disabled
                        name="Observaciones"
                        value={
                          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                        }
                      />
                    </div>

                    <h5 className="font-weight-bolder mt-4 text-center">
                      Última actilización
                    </h5>

                    <div className="d-flex justify-content-start align-items-center">
                      <label className="mx-4">15/05/2022</label>
                      <p className="flex-grow-1 m-0 bg-light p-1">
                        Sed dui diam, pellentesque et elit eget, lacinia congue
                        libero. Cras volutpat nec mi ac molestie. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Nam
                        suscipit felis non quam vestibulum ullamcorper.
                        Suspendisse leo odio, convallis vel felis at, auctor
                        ultrices nulla.
                      </p>
                    </div>

                    <div className="accordion mt-3" id="accordionExample">
                      <div className="accordion-item">
                        <h2
                          className="accordion-header text-sm d-flex align-items-baseline justify-content-between mt-1"
                          id="headingOne"
                        >
                          <button
                            className="accordion-button bg-gradient-primary text-white ps-2 text-capitalize"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Historial
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="d-flex justify-content-start align-items-center">
                              <label className="mx-4">13/05/2022</label>
                              <p className="flex-grow-1 m-0 bg-light p-1">
                                Sed dui diam, pellentesque et elit eget, lacinia
                                congue libero. Cras volutpat nec mi ac molestie.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nam suscipit felis non quam
                                vestibulum ullamcorper. Suspendisse leo odio,
                                convallis vel felis at, auctor ultrices nulla.
                              </p>
                            </div>
                          </div>

                          <div className="d-flex justify-content-start align-items-center">
                            <label className="mx-4">14/05/2022</label>
                            <p className="flex-grow-1 m-0 bg-light p-1">
                              Sed dui diam, pellentesque et elit eget, lacinia
                              congue libero. Cras volutpat nec mi ac molestie.
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nam suscipit felis non quam vestibulum
                              ullamcorper. Suspendisse leo odio, convallis vel
                              felis at, auctor ultrices nulla.
                            </p>
                          </div>

                          <div className="d-flex justify-content-start align-items-center">
                            <label className="mx-4">15/05/2022</label>
                            <p className="flex-grow-1 m-0 bg-light p-1">
                              Sed dui diam, pellentesque et elit eget, lacinia
                              congue libero. Cras volutpat nec mi ac molestie.
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nam suscipit felis non quam vestibulum
                              ullamcorper. Suspendisse leo odio, convallis vel
                              felis at, auctor ultrices nulla.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button
                        className="btn bg-gradient-danger text-capitalize"
                        type="button"
                        onClick={() => {
                          setTipoAccion("Rechazo de solicitud");
                          dispatch(activeModalAction());
                        }}
                      >
                        Rechazar asignación
                      </button>

                      <button
                        className="btn bg-gradient-light text-capitalize"
                        type="button"
                        onClick={() => {
                          setTipoAccion("Cancelar solicitud");
                          dispatch(activeModalAction());
                        }}
                      >
                        Cancelar solicitud
                      </button>

                      <button
                        className="btn bg-gradient-danger text-capitalize"
                        type="button"
                        onClick={() => {
                          setTipoAccion("Rechazar autorización");
                          dispatch(activeModalAction());
                        }}
                      >
                        Rechazar Autorización
                      </button>
                    </div>
                  </>
                )}
              </form>
              <CalendarModal>
                <h5 className="font-weight-bolder mt-4 text-center">
                  {tipoAccion}
                </h5>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      disabled
                      value="Junior Pacheco"
                      placeholder="fechaDeSalida"
                    />
                    <label className="ms-2">Fecha de salida</label>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      disabled
                      value="03/08/2022"
                      placeholder="fechaDeSalida"
                    />
                    <label className="ms-2">Fecha de salida</label>
                  </div>
                </div>

                <div className="input-group input-group-dynamic flex-column mt-3">
                  <label htmlFor="exampleFormControlInput1 ">
                    Observaciones
                  </label>
                  <textarea
                    className="multisteps-form__input form-control p-2 mw-100 w-auto"
                    type="text"
                    rows="6"
                    disabled
                    name="Observaciones"
                    value={
                      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                    }
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    className="btn bg-gradient-light text-capitalize"
                    type="button"
                    onClick={() => {
                      setTipoAccion("");
                      dispatch(desactiveModalAction());
                    }}
                  >
                    Guardar
                  </button>

                  <button
                    className="btn bg-gradient-danger text-capitalize"
                    type="button"
                    onClick={() => {
                      setTipoAccion("");
                      dispatch(desactiveModalAction());
                    }}
                  >
                    Salir
                  </button>
                </div>
              </CalendarModal>
            </div>
          </MarcaDeAgua1>
        </div>
      </div>
    </div>
  );
};
export default ConsultarSolicitudesDeVehiculosScreen;
