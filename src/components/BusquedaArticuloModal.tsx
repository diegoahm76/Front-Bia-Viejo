import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Subtitle from "./Subtitle";
import React from "react";

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

const BusquedaArticuloModal = ({ isModalActive, setIsModalActive }) => {

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const handleOpenAgregarProducto = () => {
    setIsModalActive(true);
  };

  const handleCloseAgregarProducto = () => {
    setIsModalActive(false);
  };
  const onSubmit = (data) => { };

  return (
    <Modal
      isOpen={isModalActive}
      onRequestClose={handleCloseAgregarProducto}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row min-vh-100 ">
        <div className="col-12 mx-auto">
          <h3 className="fw-light mt-4 mb-2">
            Busqueda de artículo
          </h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <Subtitle title="Información del articulo" mb={3} />
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Codigo</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="Código"
                    {...register("codigo")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Nombre</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="nombre"
                    {...register("nombre")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-4">
                <button
                  className="btn me-md-2  text-capitalize  px-3 mt-2"
                  type="button"
                  title="Buscar"
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
            </div>



            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn me-md-2 text-capitalize  px-3"
                type="submit"
                onClick={handleCloseAgregarProducto}
                title="Send"
              >
                <i className="fa-solid fa-wand-magic-sparkles fs-3"></i>
              </button>

              <button
                className="btn  text-capitalize px-3"
                type="button"
                onClick={handleCloseAgregarProducto}
                title="Send"
              >
                <i className="fa-solid fa-x fs-3"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BusquedaArticuloModal;
