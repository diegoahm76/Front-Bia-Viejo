import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";
import Modal from "react-modal";

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

const NotificacionNuevo = ({ isModalActive, setIsModalActive }) => {
  const [selecion, setSelecion] = useState({
    usuario: "",
    alarma: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelecion({
      usuario: data.usuario,
      alarma: data.alarma,
    });
  };

  const valores1 = [
    { label: "Select(T005nombre)", value: "usu1" },
    { label: "Select(T006nombre)", value: "usu2" },
    { label: "Select(T007nombre)", value: "usu3" },
  ];

  const valores2 = [
    { label: "Select(T008nombre)", value: "usu4" },
    { label: "Select(T009nombre)", value: "usu5" },
    { label: "Select(T010nombre)", value: "usu6" },
  ];
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
            Nueva Notificacion de alarma
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
                <Controller
                  name="usuario"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={valores1}
                      placeholder="Seleccionar"
                    />
                  )}
                />
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
                  name="alarma"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={valores2}
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
            <div className="d-flex gap-3 justify-content-end">
              <button
                className="btn bg-gradient-light text-capitalize mt-4 mb-0"
                type="button"
                onClick={() => setIsModalActive(!isModalActive)}
              >
                Cerrar
              </button>
              <button
                className="btn bg-gradient-primary text-capitalize mt-4 mb-0"
                type="submit"
                
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default NotificacionNuevo;
