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

const editModelConfigEstacion = {
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
  const [configuracionEdit, setConfiguracionEdit] = useState(
    editModelConfigEstacion
  );
  const { loading } = useAppSelector((state) => state.loading);
  const configuracionSeleccionada = useAppSelector(
    (state) => state.configuracion.configuracionSeleccionada
  );

  console.log({configuracionSeleccionada})

  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDataEdit();
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
        t001fechaMod: configuracionSeleccionada.t001Estaciones.t001fechaMod,
        t001userMod: state.login.userinfo.nombre_de_usuario,
      },
    };
    setConfiguracionEdit(dataForm);
  };

  const [formValues, setFormValues] = useState({
    index_objectid: 0,
  });

  const nombre_de_usuario = useAppSelector(
    (state) => state.login.userinfo.nombre_de_usuario
  );

  const onSubmit = () => {
    
    editarConfiguracion(dispatch, configuracionEdit);
    
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
  };

  return (
    <Modal
      id="modalConfiguracionesId"
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="container p-3">
        <h3>Editar configuración</h3>
        <hr className="rounded-pill hr-modal" />
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12">
            <div className="col-12 mb-3">
              <label>
                Estación: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3 text-center"
                type="text"
                name="t001nombreEstacion"
                value={configuracionSeleccionada.t001Estaciones.t001nombre}
                onChange={handleChange}
                required={true}
                disabled={isEdit}
                readOnly={isEdit}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label>
                Frecuencia: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex justify-content-end ">
                <input
                  className="col-8 border rounded-pill text-center"
                  type="number"
                  name="t003frecuencia"
                  value={configuracionEdit?.t003frecuencia}
                  onChange={handleChange}
                  required
                />
                {errors.t003frecuencia && (
                  <div className="col-12">
                    <small
                      className="text-center text-danger"
                      style={{ fontSize: "12px" }}
                    >
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
                <label className="col-2 mt-3">Minuto(s)</label>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Temperatura Ambiente: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <i className="order-1 mt-3 fa-solid fa-temperature-arrow-down"></i>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003temperaturaAmbienteMin"
                    value={configuracionEdit?.t003temperaturaAmbienteMin}
                    onChange={handleChange}
                    required
                  />
                  {errors.t003temperaturaAmbienteMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">°C</label>
                </div>

                <div className="col-5 d-flex">
                  <i className="order-1 mt-3 fa-solid fa-temperature-arrow-up"></i>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003temperaturaAmbienteMax"
                    value={configuracionEdit?.t003temperaturaAmbienteMax}
                    onChange={handleChange}
                    required
                  />
                  {errors.t003temperaturaAmbienteMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">°C</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Humedad ambiente: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "grey" }}>
                    &#xe798;
                  </span>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003humedadAmbienteMin"
                    value={configuracionEdit?.t003humedadAmbienteMin}
                    onChange={handleChange}
                    required
                  />
                  {errors.t003humedadAmbienteMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">%</label>
                </div>

                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "black" }}>
                    &#xe798;
                  </span>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003humedadAmbienteMax"
                    value={configuracionEdit?.t003humedadAmbienteMax}
                    onChange={handleChange}
                    required
                  />
                  {errors.t003humedadAmbienteMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">%</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Presion Barométrica: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "gray" }}>
                    &#xe94d;
                  </span>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003presionBarometricaMin"
                    value={configuracionEdit?.t003presionBarometricaMin}
                    onChange={handleChange}
                    required
                  />
                  {errors.t003presionBarometricaMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">hPa</label>
                </div>

                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "black" }}>
                    &#xe94d;
                  </span>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003presionBarometricaMax"
                    value={configuracionEdit?.t003presionBarometricaMax}
                    onChange={handleChange}
                    required
                  />
                  {errors.t003presionBarometricaMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">hPa</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Velocidad del Viento: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "gray" }}>
                    &#xe9e4;
                  </span>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003velocidadVientoMin"
                    value={configuracionEdit?.t003velocidadVientoMin}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003velocidadVientoMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">m/s</label>
                </div>

                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "black" }}>
                    &#xe9e4;
                  </span>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003velocidadVientoMax"
                    value={configuracionEdit?.t003velocidadVientoMax}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003velocidadVientoMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">m/s</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Direccion del Viento: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "gray" }}>
                    &#xefd8;
                  </span>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003direccionVientoMin"
                    value={configuracionEdit?.t003direccionVientoMin}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003direccionVientoMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">°</label>
                </div>

                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "black" }}>
                    &#xefd8;
                  </span>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003direccionVientoMax"
                    value={configuracionEdit?.t003direccionVientoMax}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003direccionVientoMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">°</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Precipitacion: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "gray" }}>
                    &#xebdb;
                  </span>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003precipitacionMin"
                    value={configuracionEdit?.t003precipitacionMin}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003precipitacionMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">mm</label>
                </div>

                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "black" }}>
                    &#xebdb;
                  </span>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003precipitacionMax"
                    value={configuracionEdit?.t003precipitacionMax}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003precipitacionMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">mm</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Luminosidad: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "gray" }}>
                    &#xe42e;
                  </span>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003luminocidadMin"
                    value={configuracionEdit?.t003luminocidadMin}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003luminocidadMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">Klux</label>
                </div>

                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "black" }}>
                    &#xe42e;
                  </span>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003luminocidadMax"
                    value={configuracionEdit?.t003luminocidadMax}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003luminocidadMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">Klux</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Nivel de Agua: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "gray" }}>
                    &#xe176;
                  </span>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003nivelAguaMin"
                    value={configuracionEdit?.t003nivelAguaMin}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003nivelAguaMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">m</label>
                </div>

                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "black" }}>
                    &#xe176;
                  </span>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003nivelAguaMax"
                    value={configuracionEdit?.t003nivelAguaMax}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003nivelAguaMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">m</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="mt-3">
              <label className="mt-3 w-50 text-start">
                Velocidad de Agua: <span className="text-danger">*</span>
              </label>
              <div className="col-12 d-flex mt-3 mb-3 justify-content-around align-items-center">
                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "gray" }}>
                    &#xe01f;
                  </span>
                  <label className="order-2 mt-3 ">Min:</label>

                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003velocidadAguaMin"
                    value={configuracionEdit?.t003velocidadAguaMin}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003velocidadAguaMin && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">m/s</label>
                </div>

                <div className="col-5 d-flex">
                  <span className="material-icons" style={{ color: "black" }}>
                    &#xe01f;
                  </span>
                  <label className="order-2 mt-3 ">Max:</label>
                  <input
                    className="col-8 order-3 border rounded-pill text-center"
                    type="number"
                    name="t003velocidadAguaMax"
                    value={configuracionEdit?.t003velocidadAguaMax}
                    onChange={handleChange}
                    required={true}
                  />
                  {errors.t003velocidadAguaMax && (
                    <div className="col-12">
                      <small
                        className="text-center text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  <label className="order-4 mt-3">m/s</label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-end">
            <button
              className="mb-0 btn-image text-capitalize bg-white border boder-none mt-4"
              type="button"
              title="Cancelar"
              onClick={() => setIsModalActive(!isModalActive)}
            >
              <i className="fa-solid fa-x fs-3"></i>
            </button>
            <button
              className="mb-0 btn-image text-capitalize bg-white border boder-none mt-4"
              type="submit"
              title="Guardar"
            >
              <i className="fa-regular fa-floppy-disk fs-3"></i>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ConfiguracionModal;
