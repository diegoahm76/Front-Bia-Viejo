import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { editarConfiguracionAction } from "../actions/configuracionesEstacionesActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    width: "600px",
    height: "auto",
  },
};

Modal.setAppElement("#root");

const EditarConfiguracionModal = ({ isModalActive, setIsModalActive }) => {
  const dispatch = useDispatch();
  const { nombre_de_usuario } = useSelector((state) => state.user.user);
  const { configuracionEditar, loading } = useSelector(
    (state) => state.configuracionesEstaciones
  );

  const {
    register: registerConfiguracion,
    reset: resetConfiguracion,
    handleSubmit: handleSubmitConfiguracion,
    formState: { errors: errorsConfiguracion },
  } = useForm();

  useEffect(() => {
    resetConfiguracion(configuracionEditar);
  }, [configuracionEditar]);

  const onSubmitConfiguracion = (data) => {
    const configuracionUpdate = {
      ...data,
      t003userMod: nombre_de_usuario,
      t003fechaMod: new Date().toISOString(),
    };

    dispatch(editarConfiguracionAction(configuracionUpdate));
    setIsModalActive(!isModalActive);
  };

  return (
    <Modal
      isOpen={isModalActive}
      //onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <h3 className="mt-3 mb-0 text-center mb-4">Editar configuración</h3>
      <form
        className="row p-3"
        onSubmit={handleSubmitConfiguracion(onSubmitConfiguracion)}
      >
        <div className="d-flex justify-content-center align-items-center gap-2">
          <label className="mt-3 w-20 text-end">Estación</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2 mt-1">Nombre: </label>
              <input
                className="form-control border rounded-pill px-3 text-center"
                type="text"
                readOnly
                {...registerConfiguracion("t001Estaciones.t001nombre")}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5 w-50 text-end">Frecuencia</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2 mt-1">
                Valor: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003frecuencia", {
                  required: true,
                })}
              />
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
          <label className="mt-5">Minutos</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5 w-50 text-end">Temperatura ambiente</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2 mt-1">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003temperaturaAmbienteMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2 mt-1">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003temperaturaAmbienteMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">°C</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5 w-50 text-end">Humedad ambiente</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2 mt-1">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003humedadAmbienteMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003humedadAmbienteMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">%</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5 w-50 text-end">Presión barométrica</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003presionBarometricaMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003presionBarometricaMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">hPa</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5 w-50 text-end">Velocidad del viento</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003velocidadVientoMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003velocidadVientoMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">m/s</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5 w-50 text-end">Dirección del viento</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003direccionVientoMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                placeholder="t003direccionVientoMin"
                {...registerConfiguracion("t003direccionVientoMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">°</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5 w-50 text-end">Precipitación</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003precipitacionMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003precipitacionMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">mm</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5  w-50 text-end">Luminosidad</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003luminocidadMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003luminocidadMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">KLux</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5  w-50 text-end">
            Nivel de agua del rio por sensor radar
          </label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003nivelAguaMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003nivelAguaMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">m</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <label className="mt-5 w-50 text-end">
            Velocidad del agua por radar
          </label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2">
                Min: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003velocidadAguaMax", {
                  required: true,
                })}
              />
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
            <div className="ms-2">
              <label className="ms-2">
                Max: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                {...registerConfiguracion("t003velocidadAguaMin", {
                  required: true,
                })}
              />
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
          <label className="mt-5">m/s</label>
        </div>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            type="button"
            className="btn bg-gradient-light text-capitalize"
            disabled={loading}
            onClick={() => {
              setIsModalActive(!isModalActive);
              //resetConfiguracion(defaultValuesResetConfiguration);
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
            ) : (
              "Actualizar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default EditarConfiguracionModal;
