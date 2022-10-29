import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";
import Modal from "react-modal";
import clienteEstaciones from "../config/clienteAxiosEstaciones";
import { getIndexBySelectOptions } from "../helpers/inputsFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  crearNotificacionAction,
  editarNotificacionAction,
} from "../actions/notificacionActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    width: "500px",
    height: "auto",
  },
};

Modal.setAppElement("#root");

const NotificacionNuevo = ({
  isModalActive,
  setIsModalActive,
  register,
  handleSubmit,
  watch,
  control,
  errors,
  reset,
}) => {
  const [usuarioOptions, setUsuarioOptions] = useState([]);
  const [alarmasOptions, setAlarmasOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    index_idUsuario: "",
    index_idAlarma: "",
  });

  const dispatch = useDispatch();

  const { loading, notificacionAction, dataEdit } = useSelector(
    (state) => state.notificaciones
  );

  const handleCrearNotificacion = async (data) => {
    dispatch(crearNotificacionAction(data));
    setFormValues({ index_idUsuario: "", index_idAlarma: "" });
    reset();
  };

  const onSubmit = (data) => {
    if (notificacionAction === "editar") {
      const { t006Usuarios, t006Alarmas, ...restOfProperties } = data;
      dispatch(editarNotificacionAction(restOfProperties));
    } else {
      const { idNotificacion, t005Usuarios, t006Alarmas, ...restOfProperties } =
        data;
      console.log("data envio crear", restOfProperties);
      handleCrearNotificacion(restOfProperties);
    }
    setIsModalActive(false);
  };

  const fechDataUsuarios = async () => {
    const { data } = await clienteEstaciones.get("Usuarios");
    const usuariosMaped = data.map((usuario) => ({
      label: usuario.t005nombre,
      value: usuario.idUsuario,
    }));
    setUsuarioOptions(usuariosMaped);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    setFormValues({ index_idUsuario: "", index_idAlarma: "" });
    reset();
  };

  const fechDataAlarmas = async () => {
    const { data } = await clienteEstaciones.get("Alarmas");
    const alarmasMaped = data.map((alarma) => ({
      label: alarma.t006nombre,
      value: alarma.idAlarma,
    }));
    setAlarmasOptions(alarmasMaped);
  };

  const handleResetDataEdit = () => {
    const newDataFormValues = {
      ...formValues,
      index_idUsuario: getIndexBySelectOptions(
        dataEdit?.idUsuario,
        usuarioOptions
      ),
      index_idAlarma: getIndexBySelectOptions(
        dataEdit?.idAlarma,
        alarmasOptions
      ),
    };
    console.log(newDataFormValues);
    setFormValues(newDataFormValues);
    reset(dataEdit);
  };

  useEffect(() => {
    fechDataUsuarios();
    fechDataAlarmas();
  }, []);

  useEffect(() => {
    handleResetDataEdit();
  }, [dataEdit]);
  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row ">
        <div className="col-12 mx-auto">
          <h3 className="mt-3 mb-0 text-center mb-0">
            {notificacionAction === "editar"
              ? "Editar notificacion"
              : "Nueva notificacion"}
          </h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <div className="row">
              <div className="col-12 col-md-12">
                <label className="form-control ms-0">
                  Usuario <small className="text-danger">*</small>
                </label>
                {notificacionAction === "editar" ? (
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    readOnly
                    {...register("idUsuario", { required: true })}
                  />
                ) : (
                  <Controller
                    name="idUsuario"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={usuarioOptions[formValues.index_idUsuario]}
                        onChange={(e) => {
                          reset({ ...watch(), idUsuario: e.value });
                          setFormValues({
                            ...formValues,
                            index_idUsuario: getIndexBySelectOptions(
                              e.value,
                              usuarioOptions
                            ),
                          });
                        }}
                        options={usuarioOptions}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                )}

                {errors.usuario && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-md-12">
                <label className="form-control ms-0">
                  Alarma<small className="text-danger">*</small>
                </label>
                <Controller
                  name="idAlarma"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={alarmasOptions[formValues.index_idAlarma]}
                      onChange={(e) => {
                        reset({ ...watch(), idAlarma: e.value });
                        setFormValues({
                          ...formValues,
                          index_idAlarma: getIndexBySelectOptions(
                            e.value,
                            alarmasOptions
                          ),
                        });
                      }}
                      options={alarmasOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.alarma && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                type="button"
                className="btn bg-gradient-light text-capitalize"
                disabled={loading}
                onClick={() => handleCloseModal()}
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
                ) : notificacionAction === "editar" ? (
                  "Actualizar"
                ) : (
                  "Crear"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default NotificacionNuevo;
