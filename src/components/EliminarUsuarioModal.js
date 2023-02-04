import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import {
  eliminarUsuarioAction,
} from "../actions/estacionActions";

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

const EliminarUsuarioModal = ({ isModalActive, setIsModalActive }) => {
  const dispatch = useDispatch();
  const { usuarioEliminar } = useSelector((state) => state.estaciones);

  const { register, reset } = useForm();

  useEffect(() => {
    reset(usuarioEliminar);
  }, [usuarioEliminar]);

  const eliminarUsuario = () => {
    
    dispatch(eliminarUsuarioAction(usuarioEliminar.idUsuario));
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
        <h4>Eliminar usuario</h4>
        <hr className="rounded-pill hr-modal" />
        <form className="row">
          <div className="col-12 mb-3">
            <label>
              Nombre de usuario: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              disabled
              className="form-control border rounded-pill px-3"
              {...register("t005nombre")}
            />
          </div>
          <div className="col-12 mb-3">
            <label>
              Estacion: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              disabled
              className="form-control border rounded-pill px-3"
              {...register("t001Estaciones.t001nombre")}
            />
          </div>
          <div className="col-12">
            <label>
              Numero de telefono: <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              disabled
              className="form-control border rounded-pill px-3"
              {...register("t005numeroCelular")}
            />
          </div>
          <div className="col-12 mt-3 mb-3">
            <label>Observación:</label>
            <textarea
              className="form-control border rounded-pill px-3"
              disabled
              placeholder="Observación"
              {...register("t005Observacion")}
            />
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
              type="button"
              onClick={() => eliminarUsuario()}
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EliminarUsuarioModal;
