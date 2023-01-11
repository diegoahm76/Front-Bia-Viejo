import { AgCheckbox, CheckboxSelectionComponent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import ModalLocal from "../../../components/ModalLocal";
import Subtitle from "../../../components/Subtitle";

export const AsignacionFuncionariosScreen = () => {
  let gridApi;
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

  const columnCartera = [
    {
      headerName: "Nombre de usuario",
      field: "user",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "NIT/CC", field: "ID", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Concepto de la obligación",
      field: "obli",
      minWidth: 150,
      maxWidth: 200,
    },

    {
      headerName: "Proceso de la obligación",
      field: "process",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Numero de la obligación",
      field: "nprocess",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Medio de pago",
      field: "mediopag",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de pago",
      field: "fechapag",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Valor pagado",
      field: "valuepag",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Abono",
      field: "abono",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Pago total",
      field: "total",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRenderer: {
        renderer: "group",
        checkbox: true,
      },
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const columnFuncionarios = [
    {
      headerName: "Nombre de funcionario",
      field: "funuser",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Cargo", field: "cargo", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Tareas asignadas",
      field: "tareas",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRenderer: {
        renderer: "group",
        checkbox: true,
      },
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const [funcionarios, setFuncionarios] = useState(false);

  const handleOpenModalFuncionarios = () => {
    setFuncionarios(true);
  };

  const handleCloseModalFuncionarios = () => {
    setFuncionarios(false);
  };

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          //onSubmit=""
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Asignar funcionarios
          </h3>
          <Subtitle title={"Obligaciones nuevas para asignar"} />
          <div className="row mt-4 align-items-end">
            <div>
              <label className="text-terciary">
                Cantidad de obligaciones por asignar
              </label>
            </div>
            <div>
              <div id="myGrid" className="ag-theme-alpine mt-4">
                <div className="ag-theme-alpine" style={{ height: "400px" }}>
                  <AgGridReact
                    columnDefs={columnCartera}
                    rowData={""}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 mt-2">
              <button
                type="button"
                className="btn text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                title="Continuar"
                onClick={handleOpenModalFuncionarios}
              >
                <i className="fa-solid fa-angles-right fs-3"></i>
              </button>
            </div>
          </div>
          <ModalLocal localState={funcionarios}>
            <h3>Funcionarios para asignar</h3>

            <div className="py-3">
              <label className="text-terciary">
                Seleccione al funcionario que se encargara del cobro de las
                obligaciones seleccionadas
              </label>
            </div>
            <div id="myGrid" className="ag-theme-alpine mt-4">
              <div className="ag-theme-alpine" style={{ height: "400px" }}>
                <AgGridReact
                  columnDefs={columnFuncionarios}
                  rowData={""}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>

            <div className="col mt-3">
              <label className="ms-2 text-terciary">Comentarios:</label>
              <textarea
                className="form-control border rounded-pill px-3 border border-terciary"
                //type="text"
                placeholder="Comentarios"
              
              />
            </div>
            <div className="row mt-3">
              <div>
                {" "}
                <button
                  type="button"
                  className="btn text-capitalize border rounded-pill  btn-min-width"
                  onClick={handleCloseModalFuncionarios}
                  title="Volver"
                >
                  <i className="fa-solid fa-angles-left fs-3"></i>
                </button>
                <button
                  type="button"
                  className="btn text-capitalize border rounded-pill  btn-min-width ms-2"
                  title="Asignar"
                >
                  <i className="fa-regular fa-floppy-disk fs-3"></i>
                </button>
              </div>
            </div>
          </ModalLocal>
        </form>
      </div>
    </div>
  );
};
