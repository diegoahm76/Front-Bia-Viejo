import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "../../../components/Subtitle"

// import "react-quill/dist/quill.snow.css";
import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



const options = [
    { label: "Cama de germinación", value: "germinacion" },
    { label: "Era de producción", value: "produccion" },
    { label: "Disponible para distribución", value: "distribucion" }

];

const InventarioViveroCompensacion = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [selecOpciones, setSelecOpciones] = useState({
        asignarViverista: ""
    });
    const onSubmit = (data) => {
        setSelecOpciones({
            asignarViverista: data.asignarViverista,
        });
    };


    let gridApi
    const columnDefs = [
        { headerName: "nombre común", field: "nombrecomún" },
        { headerName: "Descripcion", field: "descripcion", },
        { headerName: "Cantidad en el vivero", field: "cantidadenelvivero", },

    ]
    const rowData = [
        { nombrecomún: "palo cruz", descripcion: "Isidorea Pungens", cantidadenelvivero: 25000 },
        { nombrecomún: "pomarrosa", descripcion: "Syzygium jambos", cantidadenelvivero: 13460 },
        { nombrecomún: "achiote", descripcion: "", cantidadenelvivero: 60 },
        { nombrecomún: "pomarrosa", descripcion: "Syzygium jambos", cantidadenelvivero: 6502 },
        { nombrecomún: "achiote", descripcion: "", cantidadenelvivero: 650 }
    ]

    const defaultColDef = { sortable: true, editable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
    const onGridReady = (params) => {
        gridApi = params.api
    }


    return (
        <div className="row min-vh-100">
            <div className="col-lg-12 mx-auto">
                <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
                    <form className="row" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
                            Cuarentena de material vegetal
                        </h3>
                        <Subtitle title="Cuarentena" mt={3} />
                        <div className="row d-flex align-items-end mt-2 mx-2">
                            <div className="col-12 col-md-3 mb-3">
                                <label className="text-terciary">
                                    Etapa de material vegetal:
                                </label>

                                <Controller
                                    name="asignarViverista"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={options}
                                            placeholder="Seleccionar"
                                        />
                                    )}
                                />
                                {errors.asignarViverista && (
                                    <small className="text-danger">Este campo es obligatorio</small>
                                )}

                            </div>
                            <div className="col-12 col-md-3">
                                <button
                                    type="submit"
                                    className="btn-min-width border rounded-pill mt-2 px-3 btn "
                                >
                                    <i className="fa-solid fa-magnifying-glass fs-3"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    {
                        selecOpciones.asignarViverista && (
                            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row d-flex align-items-end mt-2">
                                        <div
                                            className="ag-theme-alpine mb-3 mx-3 "
                                            style={{ height: "225px" }}
                                        >
                                            <AgGridReact
                                                columnDefs={columnDefs}
                                                rowData={rowData}
                                                defaultColDef={defaultColDef}
                                                onGridReady={onGridReady}
                                            >
                                            </AgGridReact>
                                    </div>
                                </div>
                                <div className="row d-flex align-items-end mt-2 mx-2">
                                    <div className="col-12 col-md-3 mb-3">
                                        <label className="text-terciary">
                                            Cantidad de material vegetal: <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            //name="cantidadMaterialVegetal"
                                            type="number"
                                            className="form-control border border-terciary rounded-pill px-3"
                                            {...register("cantidadMaterialVegetal", { required: true })}
                                        />
                                        {errors.cantidadMaterialVegetal && (
                                            <div className="col-12">
                                                <small className="text-center text-danger">
                                                    Este campo es obligatorio
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12 col-md-3 mb-3">                                        <label className="text-terciary">
                                        Ubicación de material vegetal: <span className="text-danger">*</span>
                                    </label>
                                        <input
                                           // name="ubicaciónMaterialVegetal"
                                            type="text"
                                            className="form-control border border-terciary rounded-pill px-3"
                                            {...register("ubicaciónMaterialVegetal", { required: true })}
                                        />
                                        {errors.ubicaciónMaterialVegetal && (
                                            <div className="col-12">
                                                <small className="text-center text-danger">
                                                    Este campo es obligatorio
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <label className="text-terciary">
                                            Observaciones
                                        </label>
                                        <textarea
                                            className="form-control border rounded-pill px-3"
                                            placeholder="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
                                            rows={3}
                                        />
                                        {errors.observaciones && <p className="text-danger">Este campo es obligatorio</p>}
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                                    <button
                                        className="border rounded-pill px-3 btn me-md-2"
                                        type="button"
                                        title="Send"
                                    >
                                        <i className="fa-solid fa-x fs-3"></i>
                                    </button>
                                    <button
                                        className="border rounded-pill px-3 btn "
                                        type="submit"
                                    >
                                        <i className="fa-regular fa-floppy-disk fs-3"></i>
                                    </button>
                                </div>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
export default InventarioViveroCompensacion;