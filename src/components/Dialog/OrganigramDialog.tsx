import React, { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import { useAppSelector } from "../../store/hooks/hooks";
import OrganigramVisual from "../ModelOrganigram/OrganigramVisual";
import Subtitle from "../Subtitle";


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
        height: "95%",
        overflow: "auto",
    },
};
interface IProps {
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

Modal.setAppElement("#root");

const OrganigramDialog = ({ isModalActive, setIsModalActive }: IProps) => {

    // Redux State Extraction
    const { organigramCurrent } = useAppSelector((state) => state.organigram);

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
                    <Subtitle title={` ${organigramCurrent.nombre}`} mb={3} />
                    <OrganigramVisual />
                </div>
            </div>
        </Modal>
    );
};

export default OrganigramDialog;
