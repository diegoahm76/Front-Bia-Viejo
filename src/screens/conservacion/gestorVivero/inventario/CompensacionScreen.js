import Select from "react-select";
import { AgGridReact } from 'ag-grid-react';
import React, { useRef, useState, } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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



  const gridRef = useRef(); // Optional - for accessing Grid's API




  // Each Column Definition results in one Column.
  let gridApi
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
  const onGridReady = (params) => {
    gridApi = params.api
  }
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }

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
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Inventario conservación</h3>
        <div className="card">
          <form className="multisteps-form__form">
            <div
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
            >

              <div className="multisteps-form__content">
                <div className="row">

                  <div className="col-6 col-sm-4 mt-3">
                    <label htmlFor="selectVivero">Seleccione vivero </label>
                    <Select
                      defaultValue={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.label)}
                      options={options}
                      placeholder="Seleccionar"
                    />

                  </div>
                  <div className="col-12 col-sm-4 mt-5">
                    <button 
                      onClick={handleClickSearch}
                      className="border rounded-pill px-3 btn bg-gradient-primary"
                      type="button"
                    >Buscar</button>
                  </div>
                  {/**Ver Documentacion */}
                  <div className="col-6 col-sm-4 ms-auto mb-0">
                    <label className="form-control  ms-0">
                      Ver documentación de la compensacion seleccionada
                      <div className="button-row d-flex">
                        <button
                          type="button"
                          className="border rounded-pill px-3 btn btn-info btn-sm"
                        >
                          Ver documento
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <div className="ag-theme-alpine mt-auto mb-3 px-auto" style={{ height: '470px' }}>
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={dataRowFilter}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    >
                    </AgGridReact>
                    <div className="d-flex justify-content-end px-2">
                      <label htmlFor="totalGrid">Total </label>
                      <input className="text-center" type="text" id="name" name="name" disabled="true" value={totalPlantas()} ></input>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-sm-4">
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>




  );
};


export default CompensacionScreen;
