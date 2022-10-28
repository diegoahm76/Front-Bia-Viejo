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
    width: "550px",
    height: "auto",
  },
};

Modal.setAppElement("#root");

const ModalLocal = ({ children, localState }) => {
  return (
    <Modal
      isOpen={localState}
      //onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      {children}
    </Modal>
  );
};

export default ModalLocal;
