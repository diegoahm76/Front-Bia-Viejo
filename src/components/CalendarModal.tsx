import { useSelector } from "react-redux";
import Modal from "react-modal";
import React from "react";
import { useAppSelector } from "../store/hooks/hooks";

const customStyles = {

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    height: "auto"
  },
};

Modal.setAppElement("#root");

const CalendarModal = ({ children }) => {
  const userInfo = useAppSelector((state) => state.login.userinfo);

  return (
    <Modal
      isOpen={false}
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
export default CalendarModal;



