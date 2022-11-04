import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "../../../components/Subtitle"



const ActivarMaterialCuarentenaScreen = () => {

  const [selecVivero, setSelecVivero] = useState({
    viveros :"",
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    setSelecVivero({
      viveros: data.viveros
    });
  };

  const valores1 = [
    { label: "Mapirípan", value: "Map" },
    { label: "Villavicencio", value: "Vil" },
    { label: "La Macarena", value: "laM" },
  ];

  let gridApi;

  const columnDefs = [
    {
      headerName: "Material Vegetal (nombre comun)",
      field: "Material Vegetal (nombre comun)",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Estado", field: "Estado", minWidth: 150, maxWidth: 200 },
    { headerName: "Viveros", field: "Viveros", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Ubicacion en vivero",
      field: "Ubicacion en vivero",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de ingreso",
      field: "Fecha de ingreso",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Cantidad", field: "Cantidad", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Usuario que agrego a cuarentena",
      field: "Usuario que agrego a cuarentena",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Salir de cuarentena",
      field: "Accion",
      minWidth: 200,
      maxWidth: 2050,
      cellRendererFramework: (params) => (
        <div>
          <button className="btn btn-2 btn-secondary text-capitalize" type="button">
            Salir De cuarentena
          </button>
        </div>
      ),
    },
    {
      headerName: "Dar de baja",
      field: "Accion",
      minWidth: 150,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div>
          <button className="btn btn-2 btn-secondary text-capitalize" type="button">
            Dar de baja
          </button>
        </div>
      ),
    },
  ];

  const rowData = [
    {
      "Material Vegetal (nombre comun)": "cola de zorra",
      Estado: "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      "Ubicacion en vivero": "Cama 1",
      "Fecha de ingreso": "10/10/2022",
      Cantidad: "100",
      "Usuario que agrego a cuarentena": "Julian Castillo",
    },
    {
      "Material Vegetal (nombre comun)": "sabia",
      Estado: "Amaranthus blitoides",
      Viveros: "Villavicencio",
      "Ubicacion en vivero": "Cama 2",
      "Fecha de ingreso": "11/09/2022",
      Cantidad: "180",
      "Usuario que agrego a cuarentena": "Esteban Lopez",
    },
    {
      "Material Vegetal (nombre comun)": "manzanilla loca",
      Estado: "Anacyclus clavatus",
      Viveros: "Mapirípan",
      "Ubicacion en vivero": "Cama 3",
      "Fecha de ingreso": "07/03/2022",
      Cantidad: "300",
      "Usuario que agrego a cuarentena": "Wilmer Novoa",
    },
    {
      "Material Vegetal (nombre comun)": "avena loca",
      Estado: "Avena barbata",
      Viveros: "La Macarena",
      "Ubicacion en vivero": "Cama 4",
      "Fecha de ingreso": "8/01/2022",
      Cantidad: "90",
      "Usuario que agrego a cuarentena": "Jhon Lopez",
    },
    {
      "Material Vegetal (nombre comun)": "cola de zorra",
      Estado: "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      "Ubicacion en vivero": "Cama 1",
      "Fecha de ingreso": "10/10/2022",
      Cantidad: "100",
      "Usuario que agrego a cuarentena": "Julian Castillo",
    },
    {
      "Material Vegetal (nombre comun)": "sabia",
      Estado: "Amaranthus blitoides",
      Viveros: "Villavicencio",
      "Ubicacion en vivero": "Cama 2",
      "Fecha de ingreso": "11/09/2022",
      Cantidad: "180",
      "Usuario que agrego a cuarentena": "Esteban Lopez",
    },
    {
      "Material Vegetal (nombre comun)": "manzanilla loca",
      Estado: "Anacyclus clavatus",
      Viveros: "Mapirípan",
      "Ubicacion en vivero": "Cama 3",
      "Fecha de ingreso": "07/03/2022",
      Cantidad: "300",
      "Usuario que agrego a cuarentena": "Wilmer Novoa",
    },
    {
      "Material Vegetal (nombre comun)": "avena loca",
      Estado: "Avena barbata",
      Viveros: "La Macarena",
      "Ubicacion en vivero": "Cama 4",
      "Fecha de ingreso": "8/01/2022",
      Cantidad: "90",
      "Usuario que agrego a cuarentena": "Jhon Lopez",
    },
    {
      "Material Vegetal (nombre comun)": "cola de zorra",
      Estado: "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      "Ubicacion en vivero": "Cama 1",
      "Fecha de ingreso": "10/10/2022",
      Cantidad: "100",
      "Usuario que agrego a cuarentena": "Julian Castillo",
    },
    {
      "Material Vegetal (nombre comun)": "sabia",
      Estado: "Amaranthus blitoides",
      Viveros: "Villavicencio",
      "Ubicacion en vivero": "Cama 2",
      "Fecha de ingreso": "11/09/2022",
      Cantidad: "180",
      "Usuario que agrego a cuarentena": "Esteban Lopez",
    },
    {
      "Material Vegetal (nombre comun)": "manzanilla loca",
      Estado: "Anacyclus clavatus",
      Viveros: "Mapirípan",
      "Ubicacion en vivero": "Cama 3",
      "Fecha de ingreso": "07/03/2022",
      Cantidad: "300",
      "Usuario que agrego a cuarentena": "Wilmer Novoa",
    },
    {
      "Material Vegetal (nombre comun)": "avena loca",
      Estado: "Avena barbata",
      Viveros: "La Macarena",
      "Ubicacion en vivero": "Cama 4",
      "Fecha de ingreso": "8/01/2022",
      Cantidad: "90",
      "Usuario que agrego a cuarentena": "Jhon Lopez",
    },
  ];

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

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
      <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
        <form
          className="row"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
          Material en cuarentena
        </h3>
        <Subtitle title="Información por vivero"/>
        
          <div className="row">

            <div className="col-12 col-md-3 ms-3">
                <label className="text-terciary form-control ms-0">Seleccione Vivero: </label>
                <Controller
                  name="viveros"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={valores1}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.viveros && (
                <small className="text-danger">Este campo es obligatorio</small>
                )}
            </div>

            <div className="col-12 col-md-3 ">
              <button
                className="mt-5 btn btn-primary text-capitalize "
                type="submit"
              >
                Buscar
              </button>
            </div>
          </div>

          {selecVivero.viveros? (
          <div>
            <div id="myGrid" className="ag-theme-alpine mt-4">
              <div className="ag-theme-alpine" style={{ height: "400px" }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>

            <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
              <button
                className="btn bg-gradient-danger mb-0"
                type="submit"
                title="Send"
                form="configForm"
              >
                Salir
              </button>
            </div>
          </div>)
          :
          ("")}
        
        </form>
        </div>
      </div>
    </div>
  );
};
export default ActivarMaterialCuarentenaScreen;