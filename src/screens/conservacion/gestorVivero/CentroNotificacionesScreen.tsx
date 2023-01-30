// import "react-quill/dist/quill.snow.css";

import { AgGridReact } from 'ag-grid-react';

import React from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const InventarioViveroCompensacion = () => {
    // Optional - for accessing Grid's API


    // Each Column Definition results in one Column.
    // let gridApi
    const columnDefs = [
        { headerName: "Nombre", field: "nombre" },
        { headerName: "Descripción", field: "descripcion" },
        { headerName: "Fecha", field: "fecha" },
        {
            headerName: "Estado", field: "estado", cellRendererFramework: (params) =>
                <div className="form-check form-switch d-flex align-items-center  ">
                    <input
                        className="form-check"
                        type="checkbox"
                        id="rememberMe"
                    />
                    <label className="form-check-label mt-1" >Activo</label>
                </div>
        }

    ]
    const rowData = [
        { nombre: "jobo", descripcion: "spondias mombin L.", fecha: "Mapiripan", estado: "" },
        { nombre: "jobo", descripcion: "spondias mombin L.", fecha: "Mapiripan", estado: "" },

    ]
    const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
    // const onGridReady = (params) => {
    //     gridApi = params.api
    // }
    // const onExportClick = () => {
    //     gridApi.exportDataAsCsv();
    // }


    return (

        <div className="row min-vh-100">
            <div className="col-lg-12 mx-auto">
                <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
                    <form className="row">

                        <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
                            Centro de notificaciones
                        </h3>
                        <div className="row d-flex align-items-end my-auto mx-auto">
                            <div
                                className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                                data-animation="FadeIn"
                            >

                                <div className="ag-theme-alpine mx-auto my-auto" style={{ height: '500px' }}>
                                    <AgGridReact
                                        columnDefs={columnDefs}
                                        rowData={rowData}
                                        defaultColDef={defaultColDef}
                                    >

                                    </AgGridReact>
                                </div>

                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    );
};
export default InventarioViveroCompensacion;


