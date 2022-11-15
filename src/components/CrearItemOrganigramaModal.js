import Modal from "react-modal";
import Select from "react-select";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "./Subtitle";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { agregarOrganigramaAction } from "../actions/crearOrganigramaActions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
  },
};

Modal.setAppElement("#root");

const CrearItemOrganigramaModal = ({ isModalActive, setIsModalActive }) => {
  const handleOpenCrearOrganigrama = () => {
    setIsModalActive(true);
  };

  const navigate = useNavigate();

  const handlePage = () => {
    handleCloseCrearOrganigrama()
    console.log("Ejecuta")
      // navigate ("/dashboard/gestorDocumental/organigrama/edicion-organigrama")}
  }  

  const dispatch = useDispatch ();

  const handleCloseCrearOrganigrama = () => {
    setIsModalActive(false);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSumbitOrganigrama = async (data) => {
    const nuevoOrganigrama = {
        ...data,
      nombre: data.nombre,
      version: data.version,
      descripcion: data.descripcion,


    };

    console.log(data)
    dispatch(agregarOrganigramaAction(nuevoOrganigrama))
    
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
      <div className="row min-vh-100 ">
        <div className="col-12 mx-auto">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSumbitOrganigrama)}
          >
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Crear organigrama
            </h3>

            <Subtitle title="Insertar datos" mt={3} />

            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Nombre<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control border border-terciary rounded-pill px-3"
                  // placeholder="Escribe el nombre"
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Version<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  // placeholder="Escribe el codigo"
                  {...register("version", { required: true })}
                />
                {errors.version && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">Resolucion: </label>
                <button
                  // type="submit"
                  className="border rounded-pill px-3 btn btn-primary text-capitalize ms-2 mb-0"
                  type="button"
                >
                  Cargar
                </button>
                {errors.resolucionOrganigrama && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12">
                <label className="text-terciary">
                  Descripción<span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control border rounded-pill px-3"
                  placeholder=""
                  type="text"
                  rows={3}
                  {...register("descripcion", { required: true })}
                />
                {errors.descripcion && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="d-flex justify-content-end gap-4 ">
                <button
                  type="submit"
                  className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                  onClick={()=> handlePage()}
                >
                  Guardar
                </button>
                <button
                  className="btn bg-gradient-primary text-white text-capitalize border rounded-pill px-3"
                  type="button"
                  onClick={handleCloseCrearOrganigrama}
                  title="Send"
                >
                  Regresar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CrearItemOrganigramaModal;
