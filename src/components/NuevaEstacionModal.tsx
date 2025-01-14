import { useForm } from "react-hook-form";
import React from "react";
import Modal from "react-modal";
import iconoCancelar from "../assets/iconosBotones/cancelar.svg";
import iconoAgregar from "../assets/iconosBotones/agregar.svg";
import {
  crearEstacion,
  obtenerEstacion,
} from "../store/slices/administradorEstaciones/indexAdministradorEstaciones";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";

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

const NuevaEstacionModal = ({ isModalActive, setIsModalActive }) => {
  const dispatch = useAppDispatch();
  const nombre_de_usuario = useAppSelector(
    (state) => state.login.userinfo.nombre_de_usuario
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSumbitEstacion = async (data) => {
    const nuevaEstacion = {
      objectid: data.objectId,
      t001nombre: data.estacion,
      t001coord1: data.coordenada1,
      t001coord2: data.coordenada2,
      t001fechaMod: new Date().toISOString(),
      t001userMod: nombre_de_usuario,
    };
    crearEstacion(dispatch, nuevaEstacion);
    obtenerEstacion(dispatch);
    setIsModalActive(!isModalActive);
  };

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="container p-3">
        <h4>Nueva estación meteorologica</h4>
        <hr className="rounded-pill hr-modal" />
        <form className="row" onSubmit={handleSubmit(onSumbitEstacion)}>
          <div className="col-12">
            <div className="mt-3">
              <label>
                OBJECTID: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                placeholder="Id"
                {...register("objectId", { required: true })}
              />
            </div>
            {errors.objectId && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="mt-3">
              <label>
                Estación: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="text"
                placeholder="Nombre"
                {...register("estacion", { required: true })}
              />
            </div>
            {errors.estacion && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="mt-3">
              <label>
                Coordenada 1: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="text"
                placeholder="Coordenada 1"
                {...register("coordenada1", { required: true })}
              />
            </div>
            {errors.coordenada1 && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="mt-3">
              <label>
                Coordenada 2: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="text"
                placeholder="Coordenada 2"
                {...register("coordenada2", { required: true })}
              />
            </div>
            {errors.coordenada2 && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="d-flex gap-3 justify-content-end">
            <button
              className="mb-0 btn-image text-capitalize bg-white border boder-none mt-4"
              type="button"
              onClick={() => setIsModalActive(!isModalActive)}
            >
              <i className="fa-solid fa-x fs-3"></i>
            </button>
            <button
              className="mb-0 btn-image text-capitalize bg-white border boder-none mt-4"
              type="submit"
              title="Agregar"
            >
              <i className="fa-solid fa-circle-check fs-3"></i>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default NuevaEstacionModal;
