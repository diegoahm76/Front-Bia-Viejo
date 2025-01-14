import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "../../../../components/Subtitle";

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
      viveros: data.viveros,
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
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
            Inventario Disponible Material Vegetal 
            </h3>
            <Subtitle title="Material Vegetal" />

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
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-md-3 ">
                <button
                  className="mt-5 btn text-capitalize"
                  type="submit"
                ><i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
            </div>

            {selecVivero.viveros ? (
              <div>
                <div className="d-flex mt-3 px-4 justify-content-end">
                  <div>
                    <label> Material Vegetal Disponible |</label>
                  </div>
                  <div>
                    <label >
                      1460
                    </label>
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

               
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default DisponibleMaterialVegetalScreen;
