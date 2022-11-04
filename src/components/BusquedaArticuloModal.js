import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Subtitle from "./Subtitle";


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
          <h3 className="text-center  fw-light mt-4 mb-2">Busqueda de artículo</h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">

            <Subtitle title="Información del articulo" mb="3" />
            <div className="col-12 col-sm-6 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Código</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="Código"
                    {...register("codigo")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Nombre artículo</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="nombre"
                    {...register("nombre")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Marca</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="Marca"
                    {...register("marca")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Código de barras/QR</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="codigo"
                    {...register("codigo")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Serial/Placa</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="serial/placa"
                    {...register("serialPlaca")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Cantidad</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="cantidad"
                    {...register("cantidad")}
                  />
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="btn bg-primary me-md-2 text-white text-capitalize border rounded-pill px-3"
                  type="submit"
                  onClick={handleCloseAgregarProducto}
                  title="Send"
                >
                  Limpiar
                </button>
                <button
                  className="btn bg-primary me-md-2 text-white text-capitalize border rounded-pill px-3"
                  type="submit"
                  onClick={handleCloseAgregarProducto}
                  title="Send"
                >
                  Buscar
                </button>
                <button
                  className="btn bg-light text-white text-capitalize border rounded-pill px-3"
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
