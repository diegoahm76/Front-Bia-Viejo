import Modal from "react-modal";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Subtitle from './Subtitle'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const rowData = [
    { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
    { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
];

const optionRaiz = [
    { label: "Si", value: "Si" },
    { label: "No", value: "No" },
];

const optionLevel = [
    { label: "Nivel 1", value: "N1" },
    { label: "Nivel 2", value: "N2" },
    { label: "Nivel 3", value: "N3" },
];

const optionGroup = [
    { label: "Sección", value: "SE" },
    { label: "Subsección", value: "SU" },
];

const options = [
    { label: "De linea", value: "Li" },
    { label: "De apoyo", value: "Ap" },
    { label: "De soporte", value: "So" },
];

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

    const handleCloseCrearOrganigrama = () => {
        setIsModalActive(false);
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => { };

    const defaultColDef = {
        sortable: true,
        flex: 1,
        filter: true,
        wrapHeaderText: true,
        resizable: true,
        initialWidth: 200,
        autoHeaderHeight: true,
        suppressMovable: true,
    };

    let gridApi;

    const columnDefs = [
        { headerName: "Código", field: "CO" },
        { headerName: "Nombre", field: "NO" },
        {
            headerName: "Acción", field: "accion", cellRendererFramework: (params) => (
                <div className="col-12 ">
                    <button className=" border rounded-pill px-3 btn btn-danger me-md-2" type="button" title="Send">
                        Eliminar
                    </button>
                </div>
            ),
        },
    ];

    const onGridReady = (params) => {
        gridApi = params.api;
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
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
                            Crear organigrama
                        </h3>

                        <Subtitle title="Insertar datos" mt={3} />

                        <div className="row d-flex align-items-end mt-2 mx-2">
                            <div className="col-12 col-md-6 mb-3">
                                <label className="text-terciary">
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    className="form-control border border-terciary rounded-pill px-3"
                                    // placeholder="Escribe el nombre"
                                    {...register("nombreOrganigrama", { required: true })}
                                />
                                {errors.nombreOrganigrama && (
                                    <div className="col-12">
                                        <small className="text-center text-danger">
                                            Este campo es obligatorio
                                        </small>
                                    </div>
                                )}
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label className="text-terciary">
                                    Version:
                                </label>
                                <input
                                    type="number"
                                    className="form-control border border-terciary rounded-pill px-3"
                                    // placeholder="Escribe el codigo"
                                    {...register("versionOrganigrama", { required: true })}
                                />
                                {errors.versionOrganigrama && (
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
                                <label className="text-terciary">
                                    Resolucion: {" "}
                                </label>
                                <button
                                    // type="submit"
                                    className="border rounded-pill px-3 btn btn-primary ms-2 mb-0"
                                >
                                    Ver
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
                                    Descripción:
                                </label>
                                <textarea
                                    className="form-control border rounded-pill px-3"
                                    placeholder="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
                                    rows={3}
                                />
                            </div>
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
