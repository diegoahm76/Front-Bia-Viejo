//imports base
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import clienteEstaciones from "../config/clienteAxiosEstaciones";

//import actions
import {
  crearConfiguracion,
  editarConfiguracion,
} from "../store/slices/configuracionesEstaciones/indexConfiguracionesEstaciones";

//interfaces
import { IConfiguracionEstacionEdit } from "../Interfaces/ConfiguracionEstacion";
import { IGeneric } from "../Interfaces/Generic";

//iconos
import iconoCancelar from "../assets/iconosBotones/cancelar.svg";
import iconoActualizar from "../assets/iconosBotones/actualizar.svg";

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

const editState = {
  idConfiguracion: 0,
  t003frecuencia: 0,
  t003temperaturaAmbienteMax: 0,
  t003temperaturaAmbienteMin: 0,
  t003humedadAmbienteMax: 0,
  t003humedadAmbienteMin: 0,
  t003presionBarometricaMax: 0,
  t003presionBarometricaMin: 0,
  t003velocidadVientoMax: 0,
  t003velocidadVientoMin: 0,
  t003direccionVientoMax: 0,
  t003direccionVientoMin: 0,
  t003precipitacionMax: 0,
  t003precipitacionMin: 0,
  t003luminocidadMax: 0,
  t003luminocidadMin: 0,
  t003nivelAguaMax: 0,
  t003nivelAguaMin: 0,
  t003velocidadAguaMax: 0,
  t003velocidadAguaMin: 0,
  t003fechaMod: "",
  t003userMod: "userTest",
  objectid: 1,
  t001Estaciones: {
    objectid: 0,
    t001nombre: "",
    t001coord1: 0!,
    t001coord2: 0!,
    t001fechaMod: "",
    t001userMod: "user",
  },
};

const ConfiguracionModal = ({
  isModalActive,
  setIsModalActive,
  isEdit,
  handleSubmit,
  register,
  control,
  reset,
  errors,
  setValue,
  watch,
}) => {
  const [estacionesOptions, setEstacionesOptions] = useState<IGeneric[]>([]);
  const [configuracionEdit, setConfiguracionEdit] = useState(editState);
  const { loading } = useAppSelector((state) => state.loading);
  const configuracionSeleccionada = useAppSelector((state) => state.configuracion.configuracionSeleccionada);
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  // False = crear
  // true = editar

  useEffect(() => {
    setDataEdit()
    getEstaciones();
  }, [configuracionSeleccionada]);

  const setDataEdit = () => {
    const dataForm: IConfiguracionEstacionEdit = {
      idConfiguracion: configuracionSeleccionada.idConfiguracion,
      t003frecuencia: configuracionSeleccionada.t003frecuencia,
      t003temperaturaAmbienteMax: configuracionSeleccionada.t003temperaturaAmbienteMax,
      t003temperaturaAmbienteMin: configuracionSeleccionada.t003temperaturaAmbienteMin,
      t003humedadAmbienteMax: configuracionSeleccionada.t003humedadAmbienteMax,
      t003humedadAmbienteMin: configuracionSeleccionada.t003humedadAmbienteMin,
      t003presionBarometricaMax: configuracionSeleccionada.t003presionBarometricaMax,
      t003presionBarometricaMin: configuracionSeleccionada.t003presionBarometricaMin,
      t003velocidadVientoMax: configuracionSeleccionada.t003velocidadVientoMax,
      t003velocidadVientoMin: configuracionSeleccionada.t003velocidadVientoMin,
      t003direccionVientoMax: configuracionSeleccionada.t003direccionVientoMax,
      t003direccionVientoMin: configuracionSeleccionada.t003direccionVientoMin,
      t003precipitacionMax: configuracionSeleccionada.t003precipitacionMax,
      t003precipitacionMin: configuracionSeleccionada.t003precipitacionMin,
      t003luminocidadMax: configuracionSeleccionada.t003luminocidadMax,
      t003luminocidadMin: configuracionSeleccionada.t003luminocidadMin,
      t003nivelAguaMax: configuracionSeleccionada.t003nivelAguaMax,
      t003nivelAguaMin: configuracionSeleccionada.t003nivelAguaMin,
      t003velocidadAguaMax: configuracionSeleccionada.t003velocidadAguaMax,
      t003velocidadAguaMin: configuracionSeleccionada.t003velocidadAguaMin,
      t003fechaMod: configuracionSeleccionada.t003fechaMod,
      t003userMod: configuracionSeleccionada.t003userMod,
      objectid: configuracionSeleccionada.objectid,
      t001Estaciones: {
        objectid: configuracionSeleccionada.t001Estaciones.objectid,
        t001nombre: configuracionSeleccionada.t001Estaciones.t001nombre,
        t001coord1: configuracionSeleccionada.t001Estaciones.t001coord1!,
        t001coord2: configuracionSeleccionada.t001Estaciones.t001coord2!,
        t001fechaMod: "",
        t001userMod: state.login.userinfo.nombre_de_usuario,
      }
    }
    //setValue("t006mensajeUp", configuracionSeleccionada.t006mensajeUp);
    setConfiguracionEdit(dataForm);
  }

  const [formValues, setFormValues] = useState({
    index_objectid: 0,
  });

  const nombre_de_usuario = useAppSelector(
    (state) => state.login.userinfo.nombre_de_usuario
  );

  const onSubmit = () => {
    if (isEdit) {
      editarConfiguracion(dispatch, configuracionEdit);
    } else {

    }
    // if (alarmaMode) {
    //   data.objectid = estacionesOptions[formValues.index_objectid].value;
    //   editarAlarma(dispatch, data);
    // } else {
    //   handleCrearAlarma(data);
    // }
    // setIsModalActive(false);
  };

  const getEstaciones = async () => {
    const { data } = await clienteEstaciones.get("Estaciones");
    const estacionesMaped = data.map((estacion) => ({
      label: estacion.t001nombre,
      value: estacion.objectid,
    }));
    setEstacionesOptions(estacionesMaped);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    setFormValues({ ...formValues, index_objectid: 0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfiguracionEdit({ ...configuracionEdit, [name]: value });
  }


  const {
    //   register: registerConfiguracion,
    //   reset: resetConfiguracion,
    //   handleSubmit: handleSubmitConfiguracion,
    formState: { errors: errorsConfiguracion },
  } = useForm();



  // const onSubmitConfiguracion = (data) => {
  //   const configuracionUpdate = {
  //     ...data,
  //     t003userMod: nombre_de_usuario,
  //     t003fechaMod: new Date().toISOString(),
  //   };

  //   dispatch(configuracionEstacionesEditarAction(configuracionUpdate));
  //   setIsModalActive(!isModalActive);
  // };

  return (
    <Modal
      id="modalConfiguracionesId"
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <h3 className="mt-3 mb-0 text-center mb-4">Editar configuración</h3>
      <form
        className="row" onSubmit={handleSubmit(onSubmit)}
      >
        <div className="d-flex justify-content-center align-items-center gap-2">
          <label className="mt-3 w-20 text-end">Estación</label>
          <div className="col-2">
            <div className="ms-2">
              <label className="ms-2 mt-1" >Nombre: </label>
              <input
                className="form-control border rounded-pill px-3 text-center"
                type="text"
                name="t001nombreEstacion"
                value={configuracionEdit?.t001Estaciones.t001nombre}
                onChange={handleChange}
                required={true}
                disabled={isEdit}
                readOnly={isEdit}

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
                name="t006rango"
                value={configuracionEdit.t003frecuencia}
                onChange={handleChange}
                required
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
                name="t003temperaturaAmbienteMax"
                value={configuracionEdit?.t003temperaturaAmbienteMax}
                onChange={handleChange}
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
                name="t003temperaturaAmbienteMin"
                value={configuracionEdit?.t003temperaturaAmbienteMin}
                onChange={handleChange}
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
                name="t003humedadAmbienteMax"
                value={configuracionEdit?.t003humedadAmbienteMax}
                onChange={handleChange}
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
                name="t003humedadAmbienteMin"
                value={configuracionEdit?.t003humedadAmbienteMin}
                onChange={handleChange}

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
                name="t003presionBarometricaMax"
                value={configuracionEdit?.t003presionBarometricaMax}
                onChange={handleChange}
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
                name="t003presionBarometricaMin"
                value={configuracionEdit?.t003presionBarometricaMin}
                onChange={handleChange}

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
                name="t003velocidadVientoMax"
                value={configuracionEdit?.t003velocidadVientoMax}
                onChange={handleChange}
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
                name="t003velocidadVientoMin"
                value={configuracionEdit?.t003velocidadVientoMin}
                onChange={handleChange}
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
                name="t003direccionVientoMax"
                value={configuracionEdit?.t003direccionVientoMax}
                onChange={handleChange}
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
                name="t003direccionVientoMin"
                value={configuracionEdit?.t003direccionVientoMin}
                onChange={handleChange}
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
                name="t003precipitacionMax"
                value={configuracionEdit?.t003precipitacionMax}
                onChange={handleChange}
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
                name="t003precipitacionMin"
                value={configuracionEdit?.t003precipitacionMin}
                onChange={handleChange}
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
                name="t003luminocidadMax"
                value={configuracionEdit?.t003luminocidadMax}
                onChange={handleChange}
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
                name="t003luminocidadMin"
                value={configuracionEdit?.t003luminocidadMin}
                onChange={handleChange}
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
                name="t003nivelAguaMax"
                value={configuracionEdit?.t003nivelAguaMax}
                onChange={handleChange}
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
                name="t003nivelAguaMin"
                value={configuracionEdit?.t003nivelAguaMin}
                onChange={handleChange}

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
                name="t003velocidadAguaMax"
                value={configuracionEdit?.t003velocidadAguaMax}
                onChange={handleChange}
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
                name="t003velocidadAguaMin"
                value={configuracionEdit?.t003velocidadAguaMin}
                onChange={handleChange}

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
            className="mb-0 btn-image text-capitalize bg-white border boder-none"
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
              <img src={iconoCancelar} alt="" title="Cacelar" />
            )}
          </button>
          <button
            type="submit"
            className="mb-0 btn-image text-capitalize bg-white border boder-none"
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
              </>) : isEdit ? (
                "Actualizar"
              ) : (
              "Crear"
            )}

          </button>
        </div>
      </form>
    </Modal>
  );
};
export default ConfiguracionModal;
