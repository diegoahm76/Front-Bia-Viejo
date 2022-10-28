//import "react-quill/dist/quill.snow.css";
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
  { codigoArticulo: "jobo", consecitem: "spondias mombin L.", serial: "Acacías", tipoentrada: "3.11.019.131", fecha: "3.11.019.131", terceroIngreso: "IDERMETA", docIngreso: 12, baja: "aa", salida:"aaa", total: 1, asign:"a", prestado:"a", asign3:"asd", fechaMov:"a", VLR:"a", EntranteConsumo:1, salidasConsumo: "a" },
  { codigoArticulo: "jobo", consecitem: "spondias mombin L.", serial: "Acacías", tipoentrada: "3.11.019.131", fecha: "3.11.019.131", terceroIngreso: "IDERMETA", docIngreso: 12, baja: "aa", salida:"aaa", total: 1, asign:"a", prestado:"a", asign3:"asd", fechaMov:"a", VLR:"a", EntranteConsumo:1, salidasConsumo: "a" },
  { codigoArticulo: "jobo", consecitem: "spondias mombin L.", serial: "Acacías", tipoentrada: "3.11.019.131", fecha: "3.11.019.131", terceroIngreso: "IDERMETA", docIngreso: 12, baja: "aa", salida:"aaa", total: 1, asign:"a", prestado:"a", asign3:"asd", fechaMov:"a", VLR:"a", EntranteConsumo:1, salidasConsumo: "a" },
  { codigoArticulo: "jobo", consecitem: "spondias mombin L.", serial: "Acacías", tipoentrada: "3.11.019.131", fecha: "3.11.019.131", terceroIngreso: "IDERMETA", docIngreso: 12, baja: "aa", salida:"aaa", total: 1, asign:"a", prestado:"a", asign3:"asd", fechaMov:"a", VLR:"a", EntranteConsumo:1, salidasConsumo: "a" },
  { codigoArticulo: "jobo", consecitem: "spondias mombin L.", serial: "Acacías", tipoentrada: "3.11.019.131", fecha: "3.11.019.131", terceroIngreso: "IDERMETA", docIngreso: 12, baja: "aa", salida:"aaa", total: 1, asign:"a", prestado:"a", asign3:"asd", fechaMov:"a", VLR:"a", EntranteConsumo:1, salidasConsumo: "a" },


];

const TablaInventarioScreen = () => {
  const [dataRowFilter, setDataRowFilter] = useState(rowData)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const gridRef = useRef();
  let gridApi
  const columnDefs = [
    { headerName: "Código Articulo", field: "codigoArticulo" , minWidth: 150},
    { headerName: "Consecitem", field: "consecitem", minWidth: 150},
    { headerName: "SERIAL", field: "serial", minWidth: 150},
    { headerName: "Tipo Entrada", field: "tipoentrada",  minWidth: 150},
    { headerName: "FECHAING", field: "fecha" , minWidth: 150},
    { headerName: "tercero de ingreso", field: "terceroIngreso" , minWidth: 150},
    { headerName: "Nro Doc de ingreso", field: "docIngreso" , minWidth: 150},
    { headerName: "Baja", field: "baja" , minWidth: 150},
    { headerName: "Salida", field: "salida" , minWidth: 150},
    { headerName: "En Bodega", field: "total" , minWidth: 150},
    { headerName: "Asignado", field: "asign" , minWidth: 150},
    { headerName: "Prestado", field: "prestado" , minWidth: 150},
    { headerName: "Tercero asignado", field: "asign3" , minWidth: 150},
    { headerName: "Fecha ULT MOV", field: "fechaMov" , minWidth: 150},
    { headerName: "VLR al ingreso", field: "VLR" , minWidth: 150},
    { headerName: "Ctdad Entrante Consumo", field: "EntranteConsumo" , minWidth: 150},
    { headerName: "Ctdad Salidas Consumo", field: "salidasConsumo" , minWidth: 150},
  ]

  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200 , autoHeaderHeight: false, suppressMovable: true }
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
        <h3 className="mt-3 mb-0 text-center mb-6">Inventario de articulos</h3>
        <div className="card">
          <form className="multisteps-form__form">
            <div
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
            >
              <div className="multisteps-form__content">
                <div>
                  <div className="ag-theme-alpine my-auto px-auto" style={{ height: '470px' }}>
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={dataRowFilter}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    >

                    </AgGridReact>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>




  );
};


export default TablaInventarioScreen;
