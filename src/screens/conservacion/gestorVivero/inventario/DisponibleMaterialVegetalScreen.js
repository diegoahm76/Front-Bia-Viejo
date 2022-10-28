import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const DisponibleMaterialVegetalScreen = () => {

  const [selecVivero, setSelecVivero] = useState({
    viveros: "",
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
      headerName: "Nombre Comun",
      field: "Nombre Comun",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre Cientifico",
      field: "Nombre Cientifico",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Viveros", field: "Viveros", minWidth: 150, maxWidth: 200 },
    {
      headerName: "produccion propia",
      field: "produccion propia",
      minWidth: 150,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value < 0) {
          return { backgroundColor: "red" };
        }
        if (params.value > 0) {
          return { backgroundColor: "green" };
        }
        return null;
      },
    },
    {
      headerName: "compensaciones",
      field: "compensaciones",
      minWidth: 150,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value < 0) {
          return { backgroundColor: "green" };
        }
        if (params.value > 0) {
          return { backgroundColor: "red" };
        }
        return null;
      },
    },
    {
      headerName: "Medidas de resacimiento",
      field: "Medidas de resacimiento",
      minWidth: 150,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value < 0) {
          return { backgroundColor: "green" };
        }
        if (params.value > 0) {
          return { backgroundColor: "red" };
        }
        return null;
      },
    },
    {
      headerName: "Donaciones",
      field: "Donaciones",
      minWidth: 150,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value < 0) {
          return { backgroundColor: "green" };
        }
        if (params.value > 0) {
          return { backgroundColor: "red" };
        }
        return null;
      },
    },
    {
      headerName: "Total de material disponible",
      field: "Total de material disponible",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      "produccion propia": 140,
      compensaciones: 160,
      "Medidas de resacimiento": 0,
      Donaciones: "104",
      "Total de material disponible": 300,
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      "produccion propia": 350,
      compensaciones: 0,
      "Medidas de resacimiento": 0,
      Donaciones: 5,
      "Total de material disponible": 355,
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      "produccion propia": 400,
      compensaciones: 0,
      "Medidas de resacimiento": 300,
      Donaciones: 0,
      "Total de material disponible": 700,
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      "produccion propia": 0,
      compensaciones: 300,
      "Medidas de resacimiento": 160,
      Donaciones: 0,
      "Total de material disponible": 460,
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      "produccion propia": 140,
      compensaciones: 160,
      "Medidas de resacimiento": 0,
      Donaciones: "104",
      "Total de material disponible": 300,
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      "produccion propia": 350,
      compensaciones: 0,
      "Medidas de resacimiento": 0,
      Donaciones: 5,
      "Total de material disponible": 355,
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      "produccion propia": 400,
      compensaciones: 0,
      "Medidas de resacimiento": 300,
      Donaciones: 0,
      "Total de material disponible": 700,
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      "produccion propia": 0,
      compensaciones: 300,
      "Medidas de resacimiento": 160,
      Donaciones: 0,
      "Total de material disponible": 460,
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      "produccion propia": 140,
      compensaciones: 160,
      "Medidas de resacimiento": 0,
      Donaciones: "104",
      "Total de material disponible": 300,
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      "produccion propia": 350,
      compensaciones: 0,
      "Medidas de resacimiento": 0,
      Donaciones: 5,
      "Total de material disponible": 355,
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      "produccion propia": 400,
      compensaciones: 0,
      "Medidas de resacimiento": 300,
      Donaciones: 0,
      "Total de material disponible": 700,
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      "produccion propia": 0,
      compensaciones: 300,
      "Medidas de resacimiento": 160,
      Donaciones: 0,
      "Total de material disponible": 460,
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
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Visualización de material vegetal lista para distribución
        </h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="mt-4 row">

              <div className="col-12 col-sm-6">
                <label className="form-control ms-0">Selecione Vivero: </label>
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

              <div className="col-12 col-sm-6 ">
                <button
                  className="mt-5 btn btn-primary text-capitalize"
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </div>

            {selecVivero.viveros? (
            <div>
              <div className="d-flex mt-4 px-4 justify-content-end">
                <div>
                  <label type="number"> Material Vegetal Disponible |</label>
                </div>
                <div>
                  <label type="number" align="right">1460</label>
                </div>
              </div>

              <div id="myGrid" className="ag-theme-alpine ">
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
                >
                  Salir
                </button>
              </div>
          
            </div>)
            :
            ("")}
          </div>
        </form>
      </div>
    </div>
  );
};
export default DisponibleMaterialVegetalScreen;
