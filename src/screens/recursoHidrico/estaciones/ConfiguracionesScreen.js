import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import Select from "react-select";
import { useSelector } from "react-redux";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import { formatISO } from "date-fns";
import ConfiguracionModal from "../../../components/ConfiguracionModal";

const defaultValuesResetConfiguration = {
  t003frecuencia: "",
  t003temperaturaAmbienteMax: "",
  t003temperaturaAmbienteMin: "",
  t003humedadAmbienteMax: "",
  t003humedadAmbienteMin: "",
  t003presionBarometricaMax: "",
  t003presionBarometricaMin: "",
  t003velocidadVientoMax: "",
  t003velocidadVientoMin: "",
  t003direccionVientoMax: "",
  t003direccionVientoMin: "",
  t003precipitacionMax: "",
  t003precipitacionMin: "",
  t003luminocidadMax: "",
  t003luminocidadMin: "",
  t003nivelAguaMax: "",
  t003nivelAguaMin: "",
  t003velocidadAguaMax: "",
  t003velocidadAguaMin: "",
};

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
  const [estacionesOptions, setEstacionesOptions] = useState([]);
  const [dataConfiguraciones, setDataConfiguraciones] = useState([]);
  const { nombre_de_usuario } = useSelector((state) => state.user.user);
  const { handleSubmit: handleSubmitBuscar } = useForm();
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

  const deleteAction = async (params) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Una configuración que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConfiguration(params);
      }
    });
  };

  const deleteConfiguration = async (params) => {
    try {
      setLoading(true);
      await clienteEstaciones.delete(`Configuraciones/${params.data.objectid}`);
      setLoading(false);
      updateConfigs();
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error, intenta de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const editAction = async (params) => {
    setTypeAction("editar");
    setIsModalOpen(true);
    try {
      setLoading(true);
      const { data: dataConfig } = await clienteEstaciones.get(
        `Configuraciones/${params.data.objectid}`
      );
      const { data: dataEstacion } = await clienteEstaciones.get(
        `Estaciones/${params.data.objectid}`
      );
      dataConfig.t001nombre = dataEstacion.t001nombre;
      resetConfiguracion(dataConfig);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error, intenta de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const onSubmitConfiguracion = async (data) => {
    if (typeAction === "editar") {
      try {
        setLoading(true);
        await clienteEstaciones.put("Configuraciones", data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Configuración de estación actualizada",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        setIsModalOpen(false);
        resetConfiguracion(defaultValuesResetConfiguration);
        updateConfigs();
      } catch (err) {
        console.log(err);
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error, intenta de nuevo",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      try {
        setLoading(true);

        data.idConfiguracion = 0;
        data.objectid = data.objectid.value.objectid;
        data.t003userMod = nombre_de_usuario;
        console.log("data para ver", data);
        const { data: dataConfig } = await clienteEstaciones.post(
          "Configuraciones",
          data
        );
        console.log(dataConfig);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Configuración creada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        setIsModalOpen(false);
        resetConfiguracion(defaultValuesResetConfiguration);
        updateConfigs();
      } catch (err) {
        setIsModalOpen(false);
        console.log(err);
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error, intenta de nuevo",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
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
              className="btn btn-sm btn-outline-warning "
              type="button"
              title="Send"
              onClick={() => editAction(params)}
            >
              <img src={IconoEditar} alt="editar" />
            </button>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              title="Send"
              onClick={() => deleteAction(params)}
            >
              <img src={IconoEliminar} alt="eliminar" />
            </button>
          </div>
        </div>
      ),
      minWidth: 160,
    },
  ];

  const updateConfigs = async () => {
    try {
      setLoading(true);

      const { data: allConfig } = await clienteEstaciones.get(
        "Configuraciones"
      );

      const formatFechaConfiguraciones = allConfig.map((config) => ({
        ...config,
        t003fechaMod: formatISO(new Date(config.t003fechaMod), {
          representation: "date",
        }),
      }));

      setDataConfiguraciones(formatFechaConfiguraciones);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getDataInitial = async () => {
      try {
        setLoading(true);

        const { data: allConfig } = await clienteEstaciones.get(
          "Configuraciones"
        );

        const formatFechaConfiguraciones = allConfig.map((config) => ({
          ...config,
          t003fechaMod: formatISO(new Date(config.t003fechaMod), {
            representation: "date",
          }),
        }));

        setDataConfiguraciones(formatFechaConfiguraciones);

        const { data } = await clienteEstaciones.get("Estaciones");
        const estacionesMaped = data.map((estacion) => ({
          label: estacion.t001nombre,
          value: estacion,
        }));
        setEstacionesOptions(estacionesMaped);

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
          Configuracion de estaciones
        </h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <form className="row" onSubmit={handleSubmitBuscar(onSubmitBuscar)}>
            <div className="multisteps-form__content">
              <div>
                <button
                  type="submit"
                  className="btn bg-gradient-primary text-capitalize d-block ms-auto mt-3 me-4"
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
          </form>
          {isModalOpen && (
            <ConfiguracionModal localState={isModalOpen}>
              <form
                className="row p-3"
                onSubmit={handleSubmitConfiguracion(onSubmitConfiguracion)}
              >
                <h3 className="mt-3 mb-0 text-center mb-4">
                  {typeAction === "editar" ? "Editar" : "Crear"} configuración
                </h3>
                {typeAction === "editar" ? (
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <label className="mt-3">Estación</label>
                    <div className="col-2">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control text-center"
                          type="text"
                          placeholder="t001nombre"
                          readOnly
                          {...registerConfiguracion("t001nombre", {
                            required: typeAction === "crear",
                          })}
                        />
                        <label className="ms-2">Nombre: </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <label className="form-label">
                      Estación: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="objectid"
                      control={controlConfiguracion}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={estacionesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errorsConfiguracion.objectid && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                )}
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3 w-50 text-end">Frecuencia</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3 w-50 text-end">
                    Temperatura ambiente
                  </label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3 w-50 text-end">Humedad ambiente</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3 w-50 text-end">
                    Presión barométrica
                  </label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3 w-50 text-end">
                    Velocidad del viento
                  </label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3 w-50 text-end">
                    Dirección del viento
                  </label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3 w-50 text-end">Precipitación</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3  w-50 text-end">Luminosidad</label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                  <label>KLux</label>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3  w-50 text-end">
                    Nivel de agua del rio por sensor radar
                  </label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label className="mt-3 w-50 text-end">
                    Velocidad del agua por radar
                  </label>
                  <div className="col-2">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control text-center"
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
                        className="form-control text-center"
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
                    onClick={() => {
                      setIsModalOpen(false);
                      resetConfiguracion(defaultValuesResetConfiguration);
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
            </ConfiguracionModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionesScreen;
