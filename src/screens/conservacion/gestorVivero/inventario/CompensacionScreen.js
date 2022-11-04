import Select from "react-select";
import { AgGridReact } from 'ag-grid-react';
import React, { useState, } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useForm } from "react-hook-form";

const options = [
  { label: "Acacías", value: "Acac" },
  { label: "Barranca de Upía", value: "Barra" },
  { label: "Cabuyaro", value: "Cabuy" },
  { label: "Castilla La Nueva", value: "Cast" },
  { label: "Cubarral", value: "Cuba" },
  { label: "Cumaral", value: "Cuma" },
  { label: "El Calvario", value: "Elca" },
];

const rowData = [
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Acacías", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 12 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Acacías", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 522 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Cabuyaro", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 2 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Cumaral", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 12 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Castilla La Nueva", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 12 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Cumaral", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 12 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Cumaral", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 12 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Cumaral", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 12 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "Cumaral", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 3 },
  { nombrecomún: "jobo", nombrecientifico: "spondias mombin L.", viveros: "El Calvario", expedientes: "3.11.019.131", actoadminN: "3.11.019.131", compensante: "IDERMETA", total: 2 },
];

const CompensacionScreen = () => {
  const [dataRowFilter, setDataRowFilter] = useState(rowData)
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => { };





  // Each Column Definition results in one Column.
  // let gridApi
  const columnDefs = [
    { headerName: "nombre común", field: "nombrecomún" },
    { headerName: "nombre cientifico", field: "nombrecientifico", },
    { headerName: "viveros", field: "viveros", },
    { headerName: "expedientes", field: "expedientes", },
    { headerName: "acto admin. N°", field: "actoadminN" },
    { headerName: "compensante", field: "compensante" },
    { headerName: "total", field: "total" },
  ]

  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
  // const onGridReady = (params) => {
  //   gridApi = params.api
  // }
  // const onExportClick = () => {
  //   gridApi.exportDataAsCsv();
  // }

  const totalPlantas = () => {
    let total = 0
    dataRowFilter.forEach(data => {
      total = data.total + total
    })
    return total
  }

  const handleClickSearch = () => {
    const rowFiltered = rowData.filter(data => {
      if (data["viveros"] === selectedCategory) {
        return true
      }
      return false
    })
    setDataRowFilter(rowFiltered)

  }

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Inventario compensacion
            </h3>
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Seleccione vivero
                </label>
                <Select
                  defaultValue={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.label)}
                  options={options}
                  placeholder="Seleccionar"
                />

              </div>
              <div className="col-12 col-md-3">
                <button
                  onClick={handleClickSearch}
                  className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                  type="button"
                >Buscar</button>
              </div>
              {/**Ver Documentacion */}
              <div className="col-12 col-md-4 mb-3">
                <label className="text-terciary">
                  Ver documentación de la compensacion seleccionada
                </label>
              </div>
              <div className="col-12 col-md-2">
                <button
                  type="button"
                  className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                >
                  Ver documento
                </button>
              </div>
              <div className="ag-theme-alpine mt-auto mb-4 mx-auto px-auto" style={{ height: '470px' }}>
                <div className="d-flex justify-content-end mx-auto px-2">
                  <label>Total{""} </label>
                  <input className="text-center" type="text" id="name" name="name" disabled value={totalPlantas()} ></input>
                </div>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={dataRowFilter}
                  defaultColDef={defaultColDef}
                  // onGridReady={onGridReady}
                >
                </AgGridReact>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>




  );
};


export default CompensacionScreen;
