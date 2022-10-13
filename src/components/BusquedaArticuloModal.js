import Modal from "react-modal";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

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

const optionsTipoDocumento = [
  { label: "C.C", value: "CC" },
  { label: "T.I", value: "TI" },
];

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
  const onSubmit = (data) => {};

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
          <h3 className="mt-3 mb-0 text-center mb-0">Busqueda de artículo</h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="codigo"
                    {...register("codigo")}
                  />
                  <label className="ms-2">Código</label>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="nombre"
                    {...register("nombre")}
                  />
                  <label className="ms-2">Nombre</label>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="marca"
                    {...register("marca")}
                  />
                  <label className="ms-2">Marca</label>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="codigobarras"
                    {...register("codigobarras")}
                  />
                  <label className="ms-2">Código de barras/QR</label>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="serialPlaca"
                    {...register("serialPlaca")}
                  />
                  <label className="ms-2">Serial/Placa</label>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="cantidad"
                    {...register("cantidad")}
                  />
                  <label className="ms-2">Cantidad</label>
                </div>
              </div>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="btn bg-primary me-md-2 text-white text-capitalize"
                  type="submit"
                  onClick={handleCloseAgregarProducto}
                  title="Send"
                >
                  Limpiar
                </button>
                <button
                  className="btn bg-primary me-md-2 text-white text-capitalize"
                  type="submit"
                  onClick={handleCloseAgregarProducto}
                  title="Send"
                >
                  Buscar
                </button>
                <button
                  className="btn bg-light text-white text-capitalize"
                  type="button"
                  onClick={handleCloseAgregarProducto}
                  title="Send"
                >
                  Salir
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BusquedaArticuloModal;
