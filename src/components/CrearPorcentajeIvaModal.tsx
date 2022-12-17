import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import IconoEditar from "../assets/iconosBotones/editar.svg";
import IconoEliminar from "../assets/iconosBotones/eliminar.svg";
import IconoGuardar from '../assets/iconosBotones/guardar.svg'
import IconoCancelar from '../assets/iconosBotones/cancelar.svg'
import { AgGridReact } from "ag-grid-react";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";
import { parametersIvaModal } from "../Interfaces/parametersPorcentajeIvaModal";


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
        height: "auto",
    },
};
Modal.setAppElement("#root");

function CrearPorcentajeIvaModal({ isModalActive, setIsModalActive }: parametersIvaModal) {
    const elementModalId = (document.getElementById("modal-porcentaje-id"))!;
    const stateInterface = {
        id_porcentaje_iva: "",
        porcentaje: "",
        observacion: "",
        activo: true
    }
    const createInterface = {
        porcentaje: "",
        observacion: "",
    }

    const [stateInput, setStateInput] = useState(stateInterface);
    const [stateInputCreate, setStateInputCreate] = useState(createInterface);
    const [botonAdministrador, setBotonAdministrador] = useState(false);
    const [porcentaje, setPorcentaje] = useState([]);
    const [edit, setEdit] = useState(false);


    // Form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateInput({ ...stateInput, [name]: value });
    }
    const onSubmit = () => {
        crearPorcentaje();
    }
    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();


    const fetchData = async () => {
        try {
            setBotonAdministrador(true);
            const response = await clienteAxios.get(
                "almacen/porcentajes/get-list/"
            );
            setPorcentaje(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const crearPorcentaje = async () => {
        let data = { ...stateInputCreate };
        data.porcentaje = stateInput.porcentaje;
        data.observacion = stateInput.observacion;
        if (!edit) {
            await clienteAxios.post(
                "almacen/porcentajes/create/", data
            ).then(() => {
                fetchData();
                Swal.fire({
                    target: elementModalId,
                    title: "Correcto",
                    text: "El porcentaje de iva se agrego correctamente",
                    icon: "success"
                });
            }).catch(() => {
                Swal.fire({
                    target: elementModalId,
                    icon: "error",
                    title: "Hubo un error",
                    text: "Hubo un error, intenta de nuevo",
                });
            });
        } else {
            const updateField = { ...stateInput }
            updateField.porcentaje = data.porcentaje;
            updateField.observacion = data.observacion;
            await clienteAxios.patch(
                `almacen/porcentajes/update/${stateInput.id_porcentaje_iva}/`, updateField
            ).then(() => {
                fetchData();
                setEdit(false);
                setStateInput(stateInterface);
                Swal.fire({
                    target: elementModalId,
                    title: "Correcto",
                    text: "El porcentaje se actualizo correctamente",
                    icon: "success"
                });
            }).catch(() => {
                Swal.fire({
                    target: elementModalId,
                    icon: "error",
                    title: "Hubo un error",
                    text: "Hubo un error, intenta de nuevo",
                });
            });
        }

    }
    const editarPorcentaje = (data) => {
        setStateInput({
            id_porcentaje_iva: data.id_porcentaje_iva,
            porcentaje: data.porcentaje,
            observacion: data.observacion,
            activo: data.activo
        });
        setValue("porcentaje", data.porcentaje);
        setValue("observacion", data.observacion);
        setEdit(true);
    }
    const confirmarEliminarPorcentaje = (id_porcentaje) => {
        Swal.fire({
            target: elementModalId,
            title: "Estas seguro?",
            text: "Un porcentaje de iva que se elimina no se puede recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                //Pasarlo al action
                eliminarPorcentaje(id_porcentaje);
            }
        });
    };
    const eliminarPorcentaje = async (id) => {
        await clienteAxios.delete(
            `almacen/porcentajes/delete/${id}`
        ).then(() => {
            fetchData();
            Swal.fire({
                target: elementModalId,
                title: "Correcto",
                text: "El porcentaje de iva se elimino correctamente",
                icon: "success"
            });
        }).catch(() => {
            Swal.fire({
                target: elementModalId,
                icon: "error",
                title: "Hubo un error",
                text: "Hubo un error, intenta de nuevo",
            });
        });
    }

    // Tabla configuraciones
    const columnPorcentaje = [
        {
            headerName: "ID porcentaje",
            field: "id_porcentaje_iva",
            minWidth: 150,
        },
        { headerName: "Porcentaje", field: "porcentaje", minWidth: 150 },
        { headerName: "Observación", field: "observacion", minWidth: 250 },
        { headerName: "Activo", field: "activo", minWidth: 100 },
        {
            headerName: "Acciones",
            field: "acciones",
            minWidth: 140,
            cellRendererFramework: (params) => (
                <div className="d-flex gap-1">
                    <button
                        className="btn btn-sm btn-tablas btn-outline-ligth "
                        type="button"
                        onClick={() => editarPorcentaje(params.data)}
                    >
                        <img src={IconoEditar} alt="editar" />
                    </button>
                    <button
                        className="btn btn-sm btn-tablas btn-outline-ligth"
                        type="button"
                        onClick={() => confirmarEliminarPorcentaje(params.data.id_porcentaje_iva)}
                    >
                        <img src={IconoEliminar} alt="eliminar" />
                    </button>
                </div>
            ),
        },
    ];

    const defaultColDef = {
        sortable: true,
        editable: true,
        flex: 1,
        filter: true,
        wrapHeaderText: true,
        resizable: true,
        initialWidth: 200,
        autoHeaderHeight: true,
        suppressMovable: true,
    };

    return (
        <Modal
            isOpen={isModalActive}
            style={customStyles}
            className="modal"
            id="modal-porcentaje-id"
            overlayClassName="modal-fondo"
            closeTimeoutMS={300}
        >
            <div className="row">
                <div className="col-12 mx-auto">
                    <form
                        className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                        data-animation="FadeIn"
                        onSubmit={handleSubmit(onSubmit)}
                        id="configForm"
                    >
                        <h4>Crear porcentaje de IVA</h4>
                        <hr className="rounded-pill hr-modal" />
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label className="text-terciary">Porcentaje</label>
                                <input
                                    className="form-control border rounded-pill px-3 border border-terciary"
                                    type="text"
                                    name="porcentaje"
                                    placeholder="Porcentaje"
                                    value={stateInput.porcentaje}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="text-terciary">Observacion</label>
                                <input
                                    className="form-control border rounded-pill px-3 border border-terciary"
                                    type="text"
                                    name="observacion"
                                    placeholder="Observacion"
                                    value={stateInput.observacion}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button
                                type="button"
                                className="btn btn-primary text-capitalize border rounded-pill px-3"
                                onClick={() => fetchData()}
                            >
                                Administrador
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-tablas btn-outline-ligth"
                                onClick={() => setIsModalActive(false)}
                                placeholder="Cancelar"
                            >

                                <img src={IconoCancelar} alt="cancelar" />
                            </button>

                            <button
                                type="submit"
                                className="btn btn-sm btn-tablas btn-outline-ligth"
                            >

                                <img src={IconoGuardar} alt="guardar" />
                            </button>
                        </div>
                    </form>
                    {botonAdministrador === true ? (
                        <form>
                            <div className="row">
                                <div id="myGrid" className="ag-theme-alpine ">
                                    <div className="ag-theme-alpine" style={{ height: "400px" }}>
                                        <AgGridReact
                                            columnDefs={columnPorcentaje}
                                            rowData={porcentaje}
                                            defaultColDef={defaultColDef}
                                        ></AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default CrearPorcentajeIvaModal;