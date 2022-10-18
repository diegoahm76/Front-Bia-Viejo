import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalLocal from "../../components/ModalLocal";
import clienteEstaciones from "../../config/clienteAxiosEstaciones";

const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  autoHeaderHeight: false,
  suppressMovable: true,
};

const ConfiguracionesScreen = () => {
  const [typeAction, setTypeAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataOnChange, setDataOnChange] = useState(null);
  const [estacionesOptions, setEstacionesOptions] = useState([]);
  const [dataConfiguraciones, setDataConfiguraciones] = useState([]);
  const {
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();
  const {
    register: registerConfiguracion,
    reset: resetConfiguracion,
    handleSubmit: handleSubmitConfiguracion,
    control: controlConfiguracion,
    formState: { errors: errorsConfiguracion },
  } = useForm();

  const onSubmitBuscar = (data) => {
    console.log(data);
  };

  const deleteAction = (params) => {
    console.log(params.data.objectid);
  };

  const editAction = async (params) => {
    setTypeAction("editar");
    setIsModalOpen(true);
    try {
      setLoading(true);
      const { data: dataConfig } = await clienteEstaciones.get(
        `Configuraciones/${params.data.objectid}`
      );
      console.log(dataConfig);
      setDataOnChange(dataConfig);
      resetConfiguracion(dataConfig);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onSubmitConfiguracion = async (data) => {
    data.t001nombre = "string";
    data.t003fechaMod = "2022-10-17T06:56:51.996Z";
    data.t003userMod = "string000";
    if (typeAction === "editar") {
      try {
        setLoading(true);
        const { data: dataConfig } = await clienteEstaciones.put(
          "Configuraciones",
          data
        );
        console.log(dataConfig);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
    }
    console.log(data);
  };

  const columnDefs = [
    { headerName: "OBJECTID", field: "objectid", minWidth: 140 },
    { headerName: "Frecuencia", field: "t003frecuencia", minWidth: 140 },
    {
      headerName: "Temperatura Max",
      field: "t003temperaturaAmbienteMax",
      minWidth: 140,
    },
    {
      headerName: "Temperatura Min",
      field: "t003temperaturaAmbienteMin",
      minWidth: 140,
    },
    {
      headerName: "Humedad Max",
      field: "t003humedadAmbienteMax",
      minWidth: 140,
    },
    {
      headerName: "Humedad Min",
      field: "t003humedadAmbienteMin",
      minWidth: 140,
    },
    {
      headerName: "Presión Barométrica Max",
      field: "t003presionBarometricaMax",
      minWidth: 140,
    },
    {
      headerName: "Presión Barométrica Min",
      field: "t003presionBarometricaMin",
      minWidth: 140,
    },
    {
      headerName: "Velicidad Viento Max",
      field: "t003velocidadVientoMax",
      minWidth: 140,
    },
    {
      headerName: "Velocidad Viento Min",
      field: "t003velocidadVientoMin",
      minWidth: 140,
    },
    {
      headerName: "Dirección Viento Max",
      field: "t003direccionVientoMax",
      minWidth: 140,
    },
    {
      headerName: "Dirección Viento Min",
      field: "t003direccionVientoMin",
      minWidth: 140,
    },
    {
      headerName: "Precipitación Max",
      field: "t003precipitacionMax",
      minWidth: 140,
    },
    {
      headerName: "Precipitación Min",
      field: "t003precipitacionMin",
      minWidth: 140,
    },
    {
      headerName: "Luminosidad Max",
      field: "t003luminocidadMax",
      minWidth: 140,
    },
    {
      headerName: "Luminosidad Min",
      field: "t003luminocidadMin",
      minWidth: 140,
    },
    { headerName: "Nivel Agua Max", field: "t003nivelAguaMax", minWidth: 140 },
    { headerName: "Nivel Agua Min", field: "t003nivelAguaMin", minWidth: 140 },
    {
      headerName: "Velocidad Agua Max",
      field: "t003velocidadAguaMax",
      minWidth: 140,
    },
    {
      headerName: "Velocidad Agua Min",
      field: "t003velocidadAguaMin",
      minWidth: 140,
    },
    { headerName: "Modificado", field: "t003fechaMod", minWidth: 140 },
    { headerName: "Usuario", field: "t003userMod", minWidth: 140 },
    {
      headerName: "Acciones",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div>
            <button
              className="btn bg-gradient-danger btn-sm text-capitalize"
              type="button"
              title="Send"
              onClick={() => deleteAction(params)}
            >
              Eliminar
            </button>
          </div>
          <div>
            <button
              className="btn bg-gradient-primary btn-sm text-capitalize"
              type="button"
              title="Send"
              onClick={() => editAction(params)}
            >
              Editar
            </button>
          </div>
        </div>
      ),
      minWidth: 160,
    },
  ];

  useEffect(() => {
    const getDataInitial = async () => {
      try {
        setLoading(true);
        const { data: allConfig } = await clienteEstaciones.get(
          "Configuraciones"
        );
        setDataConfiguraciones(allConfig);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getDataInitial();
  }, []);
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-4">
          Configuraciones de estaciones
        </h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <form className="row" onSubmit={handleSubmitBuscar(onSubmitBuscar)}>
            <div className="multisteps-form__content">
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-8 px-4"
                  style={{ height: "470px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={dataConfiguraciones}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn bg-gradient-primary text-capitalize d-block ms-auto"
                disabled={loading}
                onClick={() => {
                  setIsModalOpen(true);
                  setTypeAction("crear");
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Cargando...
                  </>
                ) : (
                  "Crear configuración"
                )}
              </button>
            </div>
          </form>
          {isModalOpen && (
            <ModalLocal localState={isModalOpen}>
              <form
                className="row"
                onSubmit={handleSubmitConfiguracion(onSubmitConfiguracion)}
              >
                <h3 className="mt-3 mb-0 text-center mb-4">
                  Crear/Editar configuracion
                </h3>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Estación</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="t003frecuencia"
                        readOnly={typeAction !== "crear"}
                        {...registerConfiguracion("t003frecuencia", {
                          required: typeAction === "crear",
                        })}
                      />
                      <label className="ms-2">
                        Nombre:{" "}
                        {typeAction === "crear" && (
                          <span className="text-danger">*</span>
                        )}
                      </label>
                      {errorsConfiguracion.t003frecuencia && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Frecuencia</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003frecuencia"
                        {...registerConfiguracion("t003frecuencia", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Valor: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003frecuencia && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>Minutos</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Temperatura ambiente</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003temperaturaAmbienteMax"
                        {...registerConfiguracion(
                          "t003temperaturaAmbienteMax",
                          {
                            required: true,
                          }
                        )}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003temperaturaAmbienteMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003temperaturaAmbienteMin"
                        {...registerConfiguracion(
                          "t003temperaturaAmbienteMin",
                          {
                            required: true,
                          }
                        )}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003temperaturaAmbienteMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>°C</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Humedad ambiente</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003humedadAmbienteMax"
                        {...registerConfiguracion("t003humedadAmbienteMax", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003humedadAmbienteMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003humedadAmbienteMin"
                        {...registerConfiguracion("t003humedadAmbienteMin", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003humedadAmbienteMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>%</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Presión barométrica</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003presionBarometricaMax"
                        {...registerConfiguracion("t003presionBarometricaMax", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003presionBarometricaMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003presionBarometricaMin"
                        {...registerConfiguracion("t003presionBarometricaMin", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003presionBarometricaMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>hPa</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Velocidad del viento</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003velocidadVientoMax"
                        {...registerConfiguracion("t003velocidadVientoMax", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003velocidadVientoMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003velocidadVientoMin"
                        {...registerConfiguracion("t003velocidadVientoMin", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003velocidadVientoMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>m/s</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Dirección del viento</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003direccionVientoMax"
                        {...registerConfiguracion("t003direccionVientoMax", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003direccionVientoMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003direccionVientoMin"
                        {...registerConfiguracion("t003direccionVientoMin", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003direccionVientoMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>°</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Precipitación</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003precipitacionMax"
                        {...registerConfiguracion("t003precipitacionMax", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003precipitacionMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003precipitacionMin"
                        {...registerConfiguracion("t003precipitacionMin", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003precipitacionMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>mm</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Luminosidad</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003luminocidadMax"
                        {...registerConfiguracion("t003luminocidadMax", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003luminocidadMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003luminocidadMin"
                        {...registerConfiguracion("t003luminocidadMin", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003luminocidadMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>Lux</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">
                    Nivel de agua del rio por sensor radar
                  </label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003nivelAguaMax"
                        {...registerConfiguracion("t003nivelAguaMax", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003nivelAguaMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003nivelAguaMin"
                        {...registerConfiguracion("t003nivelAguaMin", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003nivelAguaMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>m</label>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mt-3">Velocidad del agua por radar</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003velocidadAguaMax"
                        {...registerConfiguracion("t003velocidadAguaMax", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Min: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003velocidadAguaMax && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="t003velocidadAguaMin"
                        {...registerConfiguracion("t003velocidadAguaMin", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Max: <span className="text-danger">*</span>
                      </label>
                      {errorsConfiguracion.t003velocidadAguaMin && (
                        <div className="col-12">
                          <small
                            className="text-center text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>m/s</label>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn bg-gradient-light text-capitalize"
                    disabled={loading}
                    onClick={() => setIsModalOpen(false)}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Cargando...
                      </>
                    ) : (
                      "Cancelar"
                    )}
                  </button>
                  <button
                    type="submit"
                    className="btn bg-gradient-primary text-capitalize"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Cargando...
                      </>
                    ) : typeAction === "crear" ? (
                      "Crear"
                    ) : (
                      "Actualizar"
                    )}
                  </button>
                </div>
              </form>
            </ModalLocal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionesScreen;
