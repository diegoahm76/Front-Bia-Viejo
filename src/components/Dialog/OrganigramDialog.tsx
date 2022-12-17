import React, { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import OrganigramVisual from "../ModelOrganigram/OrganigramVisual";


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
        height: "80%",
        overflow : "hidden",
    },
};
interface IProps {
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

Modal.setAppElement("#root");

const OrganigramDialog = ({ isModalActive, setIsModalActive }: IProps) => {

    const handleCloseCrearOrganigrama = () => {
        setIsModalActive(false);
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
                    <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
                        Organigrama
                    </h3>
                    <OrganigramVisual />
                </div>
            </div>
        </Modal>
    );
};

export default OrganigramDialog;
