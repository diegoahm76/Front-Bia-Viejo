// import "react-quill/dist/quill.snow.css";

import { AgGridReact } from 'ag-grid-react';

import React from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const InventarioViveroCompensacion = () => {
    // Optional - for accessing Grid's API


    // Each Column Definition results in one Column.
    let gridApi
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
    const onGridReady = (params) => {
        gridApi = params.api
    }
    const onExportClick = () => {
        gridApi.exportDataAsCsv();
    }


    return (

        <div className="min-vh-100">
            <div className="row">
                <div className="col col-lg-12 col-md-12 col-12 mx-auto">
                    <h3 className="text-center my-4">Producción Propia</h3>
                </div>
            </div>
            <div className="card col-lg-12 col-md-12 col-12 mx-auto">
                <form className="multisteps-form__form">
                    <div
                        className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                        data-animation="FadeIn"
                    >

                        <div className="ag-theme-alpine mx-auto my-auto" style={{ height: '500px' }}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={rowData}
                                defaultColDef={defaultColDef}
                                onGridReady={onGridReady}
                            >

                            </AgGridReact>
                        </div>


                    </div>
                </form>
            </div>
        </div>
    );
};
export default InventarioViveroCompensacion;


