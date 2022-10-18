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
    const defaultColDef = { sortable: true, flex: 1, filter: true,  wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
    const onGridReady = (params) => {
        gridApi = params.api
    }
    const onExportClick = () => {
        gridApi.exportDataAsCsv();
    }


    return (
        <div className="row min-vh-100">
            <div className="col-lg-10 col-md-10 col-12 mx-auto">
                <h3 className="mt-3 mb-0 text-center mb-6">Centro notificaciones</h3>
                {/* <p className="lead font-weight-normal opacity-8 mb-7 text-center">
          This information will let us know more about you.
        </p> */}

                <div className="ag-theme-alpine mt-auto mb-8 px-4" style={{ height: '500px' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                    >

                    </AgGridReact>
                </div>

                {/**  
                <div className="card" style={{ background: "#8bd3f8", width: "max" }}>
                    <div className="card-body">
                        <div className="button-row d-flex mt-2 align-items-right ">
                            <div>
                                <label className="text-white card-title h4 col-12 col-sm-6">Vivero Villavicencio</label>
                            </div>
                            <div >
                                <label className="text-white ml-auto ml-auto card-title text-right h6 col-12 col-sm-6">Hoy</label>
                            </div>
                        </div>
                        <div>
                            <label className="text-white card-subtitle mb-2 h6 ">Se realizó la tarea Abono vivero</label>
                        </div>
                        <div>
                            <label className="text-white h6">William Pérez</label>
                        </div>
                    </div>
                </div>
                
                <div className="card" style={{ background: "gray", width: "max" }}>
                <div className="card-body">
                        <div className="button-row d-flex mt-2 align-items-right ">
                            <label className="text-white card-title h4">Vivero Villavicencio</label>
                            <div >
                                <label className="text-white ml-auto ml-auto card-title text-right h6">Hace 3 días</label>
                            </div>
                        </div>
                        <div>
                            <label className="text-white card-subtitle mb-2 h6 ">No se realizó la tarea fertilización debido a que no habia insumos</label>
                        </div>
                        <div>
                            <label className="text-white h6">María martinez</label>
                        </div>
                    </div>
                    </div>    

                    <div className="card" style={{ width: "max" }}>
                    <div className="card-body">
                        <div className="button-row d-flex mt-2 align-items-right ">
                            <label className="card-title h4">Vivero Villavicencio</label>
                            <div >
                                <label className=" ml-auto ml-auto card-title text-right h6">Hace 4 días</label>
                            </div>
                        </div>
                        <div>
                            <label className="card-subtitle mb-2 h6 ">Solicitud insumos y herramientas</label>
                        </div>
                        <div>
                            <label className=" h6">William Pérez</label>
                        </div>
                        </div>
                    </div>

                    */}
            </div>
        </div>
    );
};
export default InventarioViveroCompensacion;


