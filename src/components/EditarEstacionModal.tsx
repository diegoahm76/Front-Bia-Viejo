import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { editarEstacionAction } from "../actions/estacionActions";
import iconoCancelar from "../assets/iconosBotones/cancelar.svg";
import iconoGuardar from "../assets/iconosBotones/guardar.svg";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import {
  editarEstacion,
  setEstacionEditar,
} from "../store/slices/administradorEstaciones/indexAdministradorEstaciones";
// import { editarEstacion } from "../store/slices/administradorEstaciones/indexAdministradorEstaciones";

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

const EditarEstacionModal = ({ isModalActive, setIsModalActive }) => {
  const dispatch = useAppDispatch();
  //pendiente revisar usuarios
  // const nombre_de_usuario = useAppSelector((state) => state.user.user);
  const estaciones = useAppSelector(
    (state) => state.administradorEstacionesSlice.estacionEditar
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //console.log("modal editar effect")
    editarEstacion(dispatch, estaciones);
    reset(estaciones);
  }, [estaciones]);

  const onSumbitEstacion = async (data) => {
    const updateEstacion = {
      objectid: data.objectid,
      t001nombre: data.t001nombre,
      t001coord1: data.t001coord1,
      t001coord2: data.t001coord2,
      t001fechaMod: new Date().toISOString(),
      //pendiente revisar usuarios
      t001userMod: data.t001userMod,
    };
    console.log("Nueva Estacion", updateEstacion);
    dispatch(setEstacionEditar(updateEstacion));
    // setEstacionEditar(dispatch);
    // dispatch(editarEstacionAction(updateEstacion));
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
      <div className="container p-3">
        <h4>Editar estación meteorologica</h4>
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
                disabled
                {...register("objectid", { required: true })}
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
                Nombre Usuario: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="string"
                disabled
                {...register("t001userMod", { required: true })}
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
                {...register("t001nombre", { required: true })}
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
                {...register("t001coord1", { required: true })}
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
                {...register("t001coord2", { required: true })}
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
              title="Cancelar"
              onClick={() => setIsModalActive(!isModalActive)}
            >
              <i className="fa-solid fa-x fs-3"></i>
            </button>
            <button
              className="mb-0 btn-image text-capitalize bg-white border boder-none mt-4"
              type="submit"
              title="Guardar"
              //onClick={() => setIsModalActive(!isModalActive)}
            >
              <i className="fa-regular fa-floppy-disk fs-3"></i>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EditarEstacionModal;
