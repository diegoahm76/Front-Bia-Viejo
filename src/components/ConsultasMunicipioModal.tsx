import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import clienteAxios from "../config/clienteAxios";
import { getConfigAuthBearer } from "../helpers/configAxios";
import { getIndexBySelectOptions } from "../helpers/inputsFormat";
import { getTokenAccessLocalStorage } from "../helpers/localStorage";
import botonCancelar from "../assets/iconosBotones/cancelar.svg";
import botonBuscar from "../assets/iconosBotones/buscar.svg";
import Subtitle from "./Subtitle";
import useEscapeKey from "../hooks/useEscapeKey";
import Swal from "sweetalert2";
import { useAppDispatch } from '../store/hooks/hooks';
import { getThunkAdministracionVivero } from '../services/administradorVivero/thunkAdministracionVivero';

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

const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: false,
    suppressMovable: true,
};

const defaultValues = {
    primerNombre: "",
    primerApellido: "",
};

Modal.setAppElement("#root");
interface IDataUsuarios {
Usuario: [];
}
export const ConsultasMunicipioModal = ({
    isModalActive,
    setIsModalActive,
    // formValues,
    setModel,
    // setFormValues,
    // reset,
    // tipoDocumentoOptions,
    setDisabled,
    
}) => {
const [usuarioSearched, setUsuarioSearched] = useState([]);
const [loading, setLoading] = useState(false);
const [codMunicipio, setCodMunicipio] = useState<number>(0);
const [nombre, setNombre] = useState<string>('');
// const [idVivero, setIdVivero] = useState({});


const {
    handleSubmit,
    register,
    reset: resetSearch,
    formState: { errors },
} = useForm();

const dispatch = useAppDispatch();

const onSubmit = async () => {
    const elementModalId = document.getElementById("modal-usuarios-busqueda")!;
    if (nombre !== '') {
        await clienteAxios.get(
            `conservacion/viveros/get-by-nombre-municipio/apertura-cierre/?nombre=${nombre}`
        ).then((response) => {
            setUsuarioSearched(response.data.data);
        }).catch((err) => {
                Swal.fire({
                    target: elementModalId,
                    position: "center",
                    icon: "warning",
                    title: err.response.data.detail,
                    showConfirmButton: true,
                    confirmButtonText: "Aceptar",
            });
        });
    } else {
        await clienteAxios.get(
            `conservacion/viveros/get-by-nombre-municipio/apertura-cierre/`
        ).then((response) => {
            setUsuarioSearched(response.data.data);
        });
    }
};

const seleccionarAction = (dataSearch) => {
    const busquedaAvanzadaModel = {
        id_vivero: 0,
        nombre: '',
        municipio: { value: '', label: '' },
        direccion: '',
        area_mt2: 0,
        tipo_vivero: { value: '', label: '' },
        area_propagacion_mt2: 0,
        area_produccion: false,
        area_preparacion_sustrato: false,
        area_embolsado: false,
        origen_recursos_vivero: { value: '', label: '' }
    }
    // busquedaAvanzadaModel.tipoDocumento.label = dataSearch.persona.tipo_documento.nombre;
    busquedaAvanzadaModel.id_vivero = dataSearch.id_vivero;
    busquedaAvanzadaModel.nombre = dataSearch.nombre;
    busquedaAvanzadaModel.municipio.value = dataSearch.cod_municipio;
    busquedaAvanzadaModel.municipio.label = dataSearch.cod_municipio;
    busquedaAvanzadaModel.direccion = dataSearch.direccion;
    busquedaAvanzadaModel.area_mt2 = dataSearch.area_mt2;
    busquedaAvanzadaModel.tipo_vivero.value = dataSearch.cod_tipo_vivero;
    busquedaAvanzadaModel.tipo_vivero.label = dataSearch.cod_tipo_vivero;
    busquedaAvanzadaModel.area_propagacion_mt2 = dataSearch.area_propagacion_mt2;
    busquedaAvanzadaModel.area_produccion = dataSearch.tiene_area_produccion;
    busquedaAvanzadaModel.area_preparacion_sustrato = dataSearch.tiene_areas_pep_sustrato;
    busquedaAvanzadaModel.area_embolsado = dataSearch.tiene_area_embolsado;
    busquedaAvanzadaModel.origen_recursos_vivero.value = dataSearch.cod_origen_recursos_vivero;
    busquedaAvanzadaModel.origen_recursos_vivero.label = dataSearch.cod_origen_recursos_vivero;

    setModel(busquedaAvanzadaModel);
    setIsModalActive(false);
};

const columnDefs = [
    {
        headerName: "Nombre",
        field: "nombre",
        minWidth: 180,
    },
    {
        headerName: "Municipio",
        field: "cod_municipio",
        minWidth: 180,
    },
    {
        headerName: "Dirección",
        field: "direccion",
        minWidth: 140,
    },
    {
        headerName: "Área",
        field: "area_mt2",
        minWidth: 180,
    },
    {
        headerName: "Área Propagación",
        field: "area_propagacion_mt2",
        minWidth: 180,
    },
    {
    headerName: "Acción",
    field: "accion",
    cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
            <button 
                className="btn btn-sm btn-tablas"
                type="button"
                title="editar"
                onClick={() => {
                    seleccionarAction(params.data);
                    // console.log(params.data.id_vivero);
                    // setIdVivero(params.data);
                    setDisabled(true);
                }}
            >
                <i className="fa-solid fa-user-pen fs-5"></i>
            </button>
            <button
                className="btn btn-sm btn-tablas"
                type="button"
                title="eliminar"
                onClick={() => confirmarEliminarVivero(params.data.id_vivero)}
            >
                <i className="fa-solid fa-trash fs-5"></i>
            </button>
        </div>
    ),
        minWidth: 130
    },
];

const confirmarEliminarVivero = async(id) => {
    const elementModalId = document.getElementById("modal-usuarios-busqueda")!;
    await clienteAxios.delete(
        `conservacion/viveros/delete/${id}/`
    ).then((response) => {
        console.log(response.data);
        Swal.fire({
            title: '¿Estas seguro de eliminar el vivero?',
            icon: 'warning',
            target: elementModalId,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
        })
    }).catch((err) => {
        console.log(err.response.data.detail);
        Swal.fire({
            target: elementModalId,
            position: "center",
            icon: "warning",
            title: err.response.data.detail,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        })
    })
}

const handleCloseModal = () => {
    setIsModalActive(false);
    resetSearch(defaultValues);
};

    useEscapeKey(handleCloseModal)
    return (
        <Modal
            id="modal-usuarios-busqueda"
            isOpen={isModalActive}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={300}
        >
        <div className="row position-relative">
            <div className="col-12 mx-auto">
            <form
                className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                data-animation="FadeIn"
                id="configForm"
            >
                <h3 className="mt-2 mb-0 ms-3 mb-0">Consultas</h3>
                <Subtitle title={"Información general"} mt={3} mb={3} />

                <div className="row align-items-end">
                <div className="col-12 col-md-4">
                    <div>
                    <label className="ms-2">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        className="form-control border border-terciary rounded-pill px-3"
                        onChange={(e) => { setNombre(e.target.value) }}
                    />
                    </div>
                    {errors.email && (
                    <div className="col-12">
                        <small className="text-center text-danger">
                        Este campo es obligatorio
                        </small>
                    </div>
                    )}
                </div>
                <div className="col-12 col-md-4">
                    <div>
                    <label className="ms-2">
                        Código Municipio:
                    </label>
                    <input
                        className="form-control border border-terciary rounded-pill px-3"
                        type="number"
                        onChange={(e) => { setCodMunicipio(e.target.valueAsNumber) }}
                    />
                    </div>
                    {errors.email && (
                    <div className="col-12">
                        <small className="text-center text-danger">
                        Este campo es obligatorio
                        </small>
                    </div>
                    )}
                </div>
                <div className="col-12 col-md-4 mt-2">
                    <button
                        type="button"
                        className="mb-0 btn-image text-capitalize bg-white border boder-none"
                        onClick={onSubmit}
                        disabled={loading}
                    >
                    {loading ? (
                        <>
                        <span
                            className="spinner-border spinner-border-sm me-1"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Cargando...
                        </>
                    ) : (
                        <i className="fa-solid fa-magnifying-glass fs-3" title="Buscar"></i>
                    )}
                    </button>
                </div>
                <div className="multisteps-form__content mt-4">
                    <div>
                    <div
                        className="ag-theme-alpine mt-auto mb-2 px-4"
                        style={{ height: "470px" }}
                    >
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={usuarioSearched}
                            defaultColDef={defaultColDef}
                        ></AgGridReact>
                    </div>
                    </div>
                </div>
                {/* <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                    type="button"
                    className="btn bg-gradient-light text-capitalize"
                    disabled={loading}
                    onClick={() => handleCloseModal()}
                    >
                    {loading ? (
                        <>
                        <span
                            className="spinner-border spinner-border-sm me-1"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Cargando...
                        </>
                    ) : (
                        "Cancelar"
                    )}
                    </button>
                </div> */}
                </div>
                <p
                className="text-danger cursor-click text-capitalize position-absolute top-0 end-0 fs-4"
                onClick={() => handleCloseModal()}
                >
                <img src={botonCancelar} alt="" />
                </p>
            </form>
            </div>
        </div>
    </Modal>
    );
};