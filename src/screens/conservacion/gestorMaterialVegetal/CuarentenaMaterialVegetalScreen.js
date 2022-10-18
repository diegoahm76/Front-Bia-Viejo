import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

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
            <div className="col-lg-10 col-md-10 col-12 mx-auto">
                <h3 className="mt-3 mb-0 text-center mb-6">Cuarentena material vegetal</h3>
                <form
                    className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
                    data-animation="FadeIn"
                    onSubmit={handleSubmit(onSubmit)}
                    id="configForm"
                >
                    <div
                        className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                        data-animation="FadeIn"
                    >
                        <div className="row my-2  align-items-center  ">
                            <div className="form-group mt-3 col-6 col-sm-6">
                                <label className="font-weight" htmlFor="cantidadKg">
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
                            <div className="col-6 mt-5">
                                <button
                                    className="btn bg-gradient-primary mb-0 text-capitalize"
                                    type="submit"
                                    title="Send"
                                    form="configForm"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>

                        {
                            selecOpciones.asignarViverista && (




                                <div className="multisteps-form__content">
                                    <div className="ag-theme-alpine mb-2" style={{ height: '225px' }}>
                                        <AgGridReact
                                            columnDefs={columnDefs}
                                            rowData={rowData}
                                            defaultColDef={defaultColDef}
                                            onGridReady={onGridReady}
                                        >
                                        </AgGridReact>
                                    </div>



                                    <div className="form-group mt-3 col-12 col-sm-4">
                                        <label className="font-weight" htmlFor="cantidadKg">Cantidad del material vegetal</label>
                                        <div className="input-group input-group-dynamic ">
                                            <input
                                                className="multisteps-form__input form-control "
                                                type="text"
                                                placeholder="Cantidad"
                                                name="nombre"
                                                {...register("nombre", { required: true })}
                                            />
                                        </div>
                                        {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                                    </div>
                                    {/* Primera configuracion select */}

                                    <div className="form-group mt-3 col-12 col-sm-4">
                                        <label className="font-weight" htmlFor="cantidadKg">Ubicación de material vegetal</label>
                                        <div className="input-group input-group-dynamic ">
                                            <input
                                                className="multisteps-form__input form-control "
                                                type="text"
                                                placeholder="Cantidad"
                                                name="nombre"
                                                {...register("nombre", { required: true })}

                                            />
                                        </div>
                                        {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                                    </div>

                                    {/** Cama de germinacion N° */}




                                    <div className="input-group input-group-dynamic flex-column my-3">
                                        <label htmlFor="exampleFormControlTextArea">Observaciones</label>

                                        <textarea
                                            className="multisteps-form__textarea form-control p-0 w-auto "
                                            type="number"
                                            placeholder="Nombre"
                                            name="nombre"
                                            {...register("nombre", { required: true })}
                                        />
                                    </div>
                                    {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}


                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                                        <button
                                            className="btn bg-gradient-danger me-md-2"
                                            type="button"
                                            title="Send"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="btn bg-gradient-primary "
                                            type="button"
                                            title="Send"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};
export default InventarioViveroCompensacion;