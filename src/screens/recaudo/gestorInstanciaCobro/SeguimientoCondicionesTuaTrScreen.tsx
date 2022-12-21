import Subtitle from '../../../components/Subtitle'
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import React, { useState, } from 'react';

const optionUser = [
    { label: "Persona natural", value: "PN" },
    { label: "Persona juridica", value: "PJ" },
];
const optionPeriodo = [
    { label: "2u21", value: "U2" },
    { label: "2u2u", value: "UU" },
];
const optionTramo = [
    { label: "Rio Guamal", value: "RG" },
    { label: "Rio Acacías", value: "RA" },
    { label: "Rio Guayuriba", value: "RG" },
    { label: "Rio Ariari", value: "RR" },
];

const rowDataPay = [
    {
        userName: "Pepito Perez",
        ccNit: "446552SEFW67",
        tipoUsuario: "Persona juridica",
        direccionUsuario: "calle 9 sur",
        caudalConsescionado: "Rio Acacias",
        usoCuenca: "si",
        recaudoUsuario: 200,
    },
    {
        userName: "Pepito Perez",
        ccNit: "1",
        tipoUsuario: "Persona juridica",
        direccionUsuario: "calle 9 sur",
        caudalConsescionado: "rio Acacias",
        usoCuenca: "si",
        recaudoUsuario: 100,
    }
]



const columnPay = [
    {
        headerName: "Nombre usuario",
        field: "userName",
        minWidth: 150,
        maxWidth: 200,
    },
    {
        headerName: "CC/NIT",
        field: "ccNit",
        minWidth: 150,
        maxWidth: 200,
    },
    {
        headerName: "Tipo de usuario",
        field: "tipoUsuario",
        minWidth: 150,
        maxWidth: 200,
    },
    {
        headerName: "Dirección del usuario",
        field: "direccionUsuario",
        minWidth: 150,
        maxWidth: 200,
    },
    {
        headerName: "Caudal concesionado",
        field: "caudalConsescionado",
        minWidth: 150,
        maxWidth: 200,
    },
    {
        headerName: "Uso cuenca",
        field: "usoCuenca",
        minWidth: 150,
        maxWidth: 200,
    },
    {
        headerName: "Recaudo usuario",
        field: "recaudoUsuario",
        minWidth: 150,
        maxWidth: 200,
    },
]

const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
};



const SeguimientoCondicionesTuaTrScreen = () => {

    const [dataRowFilter, setDataRowFilter] = useState(rowDataPay)
    const [selectedCategory, setSelectedCategory] = useState(null);



    const TotalIngreso = () => {

        let total = 0
        dataRowFilter.forEach(data => {
            total = data.recaudoUsuario + total
        })
        return total
    }
    // const handleClickSearch = () => {
    //     console.log(data, data.recaudoUsuario)
    //     const rowFiltered = rowDataPay.filter(data => {
    //       if (data["Recaudo usuario"] === selectedCategory) {
    //         return true
    //       }
    //       return false
    //     })
    //     setDataRowFilter(rowFiltered)

    //   }

    // let gridApi;

    // const onGridReady = (params) => {
    //     gridApi = params.api;
    // };

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm();

    const [page, setPage] = useState(1);

    const submit = (data) => {
        if (page === 1) setPage(2);
        if (page === 2) console.log(data);
    };

    const handlePreviousPage = () => {
        setPage(1);
    };

    return (
        <div className="row min-vh-100">
            <div className="col-lg-12 mx-auto">
                <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
                    <form
                        data-animation="FadeIn"
                        onSubmit={handleSubmit(submit)}
                        id="configForm"
                    >
                        <div hidden={page === 2}>

                            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
                                Seguimiento condiciones TUA y TR
                            </h3>

                            <Subtitle title="Listado de usuarios" mt={3} />
                            <div className="row d-flex align-items-end mt-3 mx-2">
                                <div className="col-12 col-md-9 mb-3">
                                    <label className="text-bg-gradient-faded-dark">
                                        Filtre las estadisticas que desea visualizar
                                    </label>
                                </div>
                            </div>
                            <div className="row d-flex align-items-end mt-3 mx-2">
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="text-terciary">
                                        Tipo de usuario:
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Controller
                                        name="tipoUsuario"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={optionUser}
                                                placeholder="Seleccionar"
                                            // {...register("tipoUsuario", { required: true })}
                                            />
                                        )}
                                    />
                                    {errors.filtrar && (
                                        <p className="text-danger">Este campo es obligatorio</p>
                                    )}
                                </div>
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="text-terciary">
                                        Periodo:
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Controller
                                        name="periodo"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={optionPeriodo}
                                                placeholder="Seleccionar"
                                            // {...register("tipoUsuario", { required: true })}
                                            />
                                        )}
                                    />
                                    {errors.periodo && (
                                        <p className="text-danger">Este campo es obligatorio</p>
                                    )}
                                </div>
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="text-terciary">
                                        Tramo:
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Controller
                                        name="tramo"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={optionTramo}
                                                placeholder="Seleccionar"
                                            // {...register("tipoUsuario", { required: true })}
                                            />
                                        )}
                                    />
                                    {errors.periodo && (
                                        <p className="text-danger">Este campo es obligatorio</p>
                                    )}
                                </div>
                            </div>
                            <div className="row d-flex align-items-end mt-3 mx-2">
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="text-terciary">
                                        Total usuarios cuencas:
                                    </label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control border border-terciary rounded-pill px-3"
                                        placeholder='30/06/2022'
                                    // {...register("direccionUsuario", { required: true })}
                                    />
                                </div>
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="text-terciary">
                                        Periodo:
                                    </label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control border border-terciary rounded-pill px-3"
                                        placeholder='30/06/2022'
                                    // {...register("direccionUsuario", { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div id="myGrid" className="ag-theme-alpine mb-4 ">
                                    <div className="ag-theme-alpine" style={{ height: "400px" }}>
                                        <div className="d-flex justify-content-end mx-auto  px-2">
                                            <label>Total{""} </label>
                                            <input className="text-center" type="text" id="name" name="name" disabled value={TotalIngreso()} ></input>
                                        </div>
                                        <AgGridReact
                                            columnDefs={columnPay}
                                            rowData={rowDataPay}
                                            defaultColDef={defaultColDef}
                                        // onGridReady={onGridReady}
                                        ></AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row' hidden={page === 1}>
                            <h1>Hola mundo</h1>
                            <Subtitle title="Listado de usuarios" mt={3} />
                            <div className="row d-flex align-items-end mt-3 mx-2">
                                <div className="col-12 col-md-9 mb-3">
                                    <label className="text-bg-gradient-faded-dark">
                                        Filtre las estadisticas que desea visualizar
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end gap-4 ">
                            <button
                                className={`border rounded-pill px-3 btn bg-gradient-danger mb-3 text-capitalize ${page === 1 && "d-none"
                                    }`}
                                type="button"
                                title="Send"
                                onClick={handlePreviousPage}
                            >
                                {"<< Atrás"}
                            </button>
                            <button
                                className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                                type="submit"
                                title="Send"
                                form="configForm"
                            >
                                {page === 1 ? "Generar estadisticas" : "Actualizar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SeguimientoCondicionesTuaTrScreen