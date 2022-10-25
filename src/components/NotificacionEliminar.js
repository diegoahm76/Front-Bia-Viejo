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

const NotificacionEliminar = ({ isModalActive, setIsModalActive }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row">
        <div className="col-12 mx-auto">
          <h3 className="mt-3 mb-0 text-center mb-0">
            Eliminar Notificacion de alarma
          </h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <div className="row">
              <div className="col-12 col-md-12">
                <label className="form-control ms-0">Usuario</label>
                <input
                  className="col-12 col-md-12"
                  disabled
                  value="Select(T005nombre)"
                ></input>
              </div>
              <div className="col-12 col-md-12">
                <label className="form-control ms-0">Alarma</label>
                <input
                  className="col-12 col-md-12"
                  disabled
                  value="Select(T010nombre)"
                ></input>
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
                Eliminar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default NotificacionEliminar;
