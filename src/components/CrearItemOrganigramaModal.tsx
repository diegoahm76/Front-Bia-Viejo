import React, { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import { SubmitHandler, useForm } from "react-hook-form";
import Subtitle from "./Subtitle";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { addOrganigramsService } from "../services/organigram/OrganigramServices";
import { useAppDispatch } from '../store/hooks/hooks';


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
interface IProps {
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

Modal.setAppElement("#root");

const CrearItemOrganigramaModal = ({ isModalActive, setIsModalActive }: IProps) => {

  // Naveigate instance
  const navigate = useNavigate();
  // Dispatch instance
  const dispatch = useAppDispatch();

  const handleCloseCrearOrganigrama = () => {
    setIsModalActive(false);
  };

  type FormValues = {
    nombre: string;
    version: string;
    descripcion: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(addOrganigramsService(data, navigate));
    handleCloseCrearOrganigrama();
  };

  return (
    <Modal
      isOpen={isModalActive}
      onRequestClose={handleCloseCrearOrganigrama}
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Crear organigrama
            </h3>
            <Subtitle title="Insertar datos" mt={3} />
            <div className="col-12 col-md-6 mb-3">
              <label className="text-terciary">
                Nombre<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control border border-terciary rounded-pill px-3"
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

            <div className="col-12">
              <label className="text-terciary">
                Descripción<span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control border rounded-pill px-3"
                placeholder=""
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

            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="d-flex justify-content-end gap-4 ">
                <button
                  type="submit"
                  className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                >
                  Guardar
                </button>
                <button
                  className="btn bg-gradient-primary text-white text-capitalize border rounded-pill px-3"
                  type="button"
                  onClick={handleCloseCrearOrganigrama}
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
