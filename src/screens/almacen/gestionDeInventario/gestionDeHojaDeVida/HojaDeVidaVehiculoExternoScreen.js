//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const options = [
    { label: "Platon", value: "PL" },
    { label: "Cabina", value: "CA" },
    { label: "Otros", value: "OT" },
];

const HojaDeVidaVehiculoExternoScreen = () => {

    const defaultColDef2 = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }

    const onGridReady = (params) => {
        gridApi = params.api
    }

    const { control, handleSubmit } = useForm();

    const columnDefs2 = [
        { headerName: "Número", field: "NU", minWidth: 150 },
        { headerName: "Responsable", field: "RE", minWidth: 150 },
        { headerName: "Grupo", field: "GR", minWidth: 150 },
        { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
        { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
        { headerName: "Tipo", field: "TI", minWidth: 150 },
    ]

    const asignacionPrestamos = [
        { NU: "01", RE: "Gina Hernandez", GR: "Administración", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Asignacion" },
        { NU: "01", RE: "Gina Hernandez", GR: "Contabilidad", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Prestamos" },
        { NU: "01", RE: "Gina Hernandez", GR: "Administración", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Asignacion" },
        { NU: "01", RE: "Gina Hernandez", GR: "Administración", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Asignacion" },
        { NU: "01", RE: "Gina Hernandez", GR: "Administración", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Asignacion" },

    ];

    let gridApi;

    return (
        <div className="row min-vh-100">
            <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <h3 className="mt-3 mb-0 text-center mb-6">
                    Hoja de vida de un vehiculo
                </h3>
                <form
                    className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                    data-animation="FadeIn"
                    onSubmit={handleSubmit()}
                    id="configForm"
                >
                    <div className="multisteps-form__content">
                        <div className="row">
                            <label className="form-control ms-0 text-center">
                                <n>Activo</n>
                            </label>

                            <div className="col-12 col-sm-4">
                                <div className="form-floating input-group input-group-dynamic ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                    />
                                    <label className="ms-2">160064</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="form-floating input-group input-group-dynamic">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                    />
                                    <label className="ms-2">Vehículo</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-4">
                                <label className="form-control ms-0 text-center mt-3 ">
                                    <n>Serial</n>
                                </label>
                            </div>
                            <div className="col-12 col-sm-4">
                                <label className="form-control ms-0 text-center mt-3 ">
                                    <n>Artículo</n>
                                </label>
                            </div>
                            <div className="col-12 col-sm-4"></div>

                            <div className="col-12 col-sm-4">
                                <div className="form-floating input-group input-group-dynamic ms-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                    />
                                    <label className="ms-2">93rtgd</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <label className="form-floating input-group input-group-dynamic ms-2">
                                    Tipo de documento{" "}
                                    <div className="col-12 ">
                                        <Controller
                                            name="tipoDocumento2"
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={options}
                                                    placeholder="Seleccionar"
                                                />
                                            )}
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="row mb-2 ">
                            <label className="form-control ms-0 text-left mt-3 ms-3">
                                <n>Especificaciones</n>
                            </label>
                            <div className="row">
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Marca:</n>
                                    </label>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center  mt-1 ">
                                        <n>Modelo:</n>
                                    </label>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center  mt-1 ">
                                        <n>Capacidad pasajeros:</n>
                                    </label>
                                </div>

                                <div className="col-12 col-sm-4">
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Marca</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Modelo</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Capacidad pasajeros</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Linea:</n>
                                    </label>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center  mt-1 ">
                                        <n>Color:</n>
                                    </label>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center  mt-1 ">
                                        <n>Tipo de combustible:</n>
                                    </label>
                                </div>

                                <div className="col-12 col-sm-4">
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Linea</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Color</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Tipo de combustible</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <label className="form-control ms-0 text-center mt-1 ">
                                    <n>Cilindraje:</n>
                                </label>
                                <div className="form-floating input-group input-group-dynamic ms-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                    />
                                    <label className="ms-2">Cilindraje</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <label className="form-control ms-0 text-center mt-1 ">
                                    <n>Fecha de llegada:</n>
                                </label>
                                <div className="form-floating input-group input-group-dynamic ms-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                    />
                                    <label className="ms-2">Fecha de llegada</label>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-2 ">
                            <label className="form-control ms-0 text-left mt-3 ms-3">
                                <n>Informacion adicional</n>
                            </label>
                            <div className="col-12 col-sm-4">
                                <label className="form-control ms-0 text-center mt-1 ">
                                    <n>Numero de motor:</n>
                                </label>
                                <div className="form-floating input-group input-group-dynamic ms-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                    />
                                    <label className="ms-2">Numero de motor</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <label className="form-control ms-0 text-center mt-1 ">
                                    <n>Numero de chasis:</n>
                                </label>
                                <div className="form-floating input-group input-group-dynamic ms-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                    />
                                    <label className="ms-2">Numero de chasis</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <label className="form-control ms-0 text-center mt-1 ">
                                    <n>Clase de vehiculo:</n>
                                </label>
                                <div className="form-floating input-group input-group-dynamic ms-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                    />
                                    <label className="ms-2">Clase de vehiculo</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Proveedor:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Proveedor</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row mb-2 ">
                            <label className="form-control ms-0 text-left mt-3 ms-3">
                                <n>Control de documentación</n>
                            </label>
                            <div className="row">
                                <div className="ms-3">
                                    <label className="form-control ms-0">
                                        1) Seguro obligatorio
                                    </label>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Proveedor:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Proveedor</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Numero:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Numero</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Fecha inicial:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Fecha inicial</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-4">
                                        <label className="form-control ms-0 text-center mt-1 ">
                                            <n>Fecha final:</n>
                                        </label>
                                        <div className="form-floating input-group input-group-dynamic ms-2">
                                            <input
                                                className="form-control"
                                                type="text"
                                                disabled="true"
                                            />
                                            <label className="ms-2">Fecha final</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="ms-3 mt-2">
                                    <label className="form-control ms-0">
                                        2) Certificado ATM
                                    </label>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Fecha realizacion:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Fecha realizacion</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Fecha de vencimiento:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Fecha de vencimiento</label>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="ms-3">
                                    <label className="form-control ms-0">
                                        3) Poliza todo riesgo
                                    </label>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Aseguradora:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Aseguradora</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Fecha inicial:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Fecha inicial</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <label className="form-control ms-0 text-center mt-1 ">
                                        <n>Fecha final:</n>
                                    </label>
                                    <div className="form-floating input-group input-group-dynamic ms-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled="true"
                                        />
                                        <label className="ms-2">Fecha final</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="form-control ms-0 text-left mt ms-4">
                                <n>Asignaciones/Préstamos</n>
                            </label>
                            <div className="ag-theme-alpine mt-auto mb-4 px-4" style={{ height: '275px' }}>
                                <AgGridReact
                                    columnDefs={columnDefs2}
                                    rowData={asignacionPrestamos}
                                    defaultColDef={defaultColDef2}
                                    onGridReady={onGridReady}
                                >
                                </AgGridReact>
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                            <button
                                className="btn bg-gradient-primary me-md-2"
                                type="button"
                                title="Send"
                            >
                                Movimientos de vehiculo
                            </button>
                        </div>

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                            <button
                                className="btn bg-gradient-primary me-md-2"
                                type="button"
                                title="Send"
                            >
                                Guardar
                            </button>
                            <button
                                className="btn bg-gradient-danger "
                                type="button"
                                title="Send"
                            >
                                Salir
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        // </div>
    );
};
export default HojaDeVidaVehiculoExternoScreen;
