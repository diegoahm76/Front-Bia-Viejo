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

const AlarmasConfigModal = ({
  isModalActive,
  setIsModalActive,
  handleSubmit,
  register,
  control,
  reset,
  errors,
  watch,
}) => {
  const onSubmit = (data) => {
    console.log(data);
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
        <h4 className="ms-3">Editar alarma configuración</h4>
        <hr />
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 mb-3">
            <label>
              Rango: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              {...register("t006rango", { required: true })}
            />
            {errors.t006rango && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AlarmasConfigModal;
