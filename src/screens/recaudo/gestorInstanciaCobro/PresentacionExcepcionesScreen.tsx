import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModalLocal from "../../../components/ModalLocal";
import Subtitle from "../../../components/Subtitle";

export const PresentacionExcepcionesScreen = () => {
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

  const { handleSubmit } = useForm();

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const columnCartera = [
    {
      headerName: "Numero de Expediente",
      field: "expe",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Concepto de la obligación",
      field: "obli",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Proceso de cobro",
      field: "process",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Mandamiento de pago",
      field: "mandapago",
      minWidth: 150,
      maxWidth: 200,
    },

    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className=" text-capitalize border rounded-pill px-3"
            type="button"
            onClick={handleOpenModalExcepciones}
            title="Ver documentos"
          >
            <i className="fa-regular fa-folder fs-4"></i>
          </button>
        </div>
      ),
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const [editarExcepcion, setEditarExcepcion] = useState(false);

  const handleOpenModaleditarExcepcion = () => {
    setEditarExcepcion(true);
  };

  const handleCloseModaleditarExcepcion = () => {
    setEditarExcepcion(false);
  };

  const [excepciones, setExcepciones] = useState(false);

  const handleOpenModalExcepciones = () => {
    setExcepciones(true);
  };

  const handleCloseModalExcepciones = () => {
    setExcepciones(false);
  };
  const [rowData] = useState([
    {
      expe: "0011",
      obli: "446552SEFW66",
      process: "122ew344",
      mandapago: "mmmmas",
      accion: "",
    },
  ]);

  const handleSubmitInformacion = () => {
    console.log("hasta aca iba bien");
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(handleSubmitInformacion)}
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Presentacion de Excepciones
          </h3>
          <Subtitle title={"Información de Usuario"} />
          <div className="row mt-3">
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                CC/NIT:{" "}
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="number"
                  placeholder="Cantidad de usuarios"
                  disabled={true}
                />
              </label>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Dirección:{" "}
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Cantidad de usuarios"
                  disabled={true}
                />
              </label>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Razon Scocial o Nombre:{" "}
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Cantidad de usuarios"
                  disabled={true}
                />
              </label>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Telefono:{" "}
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="number"
                  placeholder="Cantidad de usuarios"
                  disabled={true}
                />
              </label>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Tipo de autodeclaración:{" "}
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Cantidad de usuarios"
                  disabled={true}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div id="myGrid" className="ag-theme-alpine mt-4">
              <div className="ag-theme-alpine" style={{ height: "400px" }}>
                <AgGridReact
                  columnDefs={columnCartera}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
          </div>
          <ModalLocal localState={excepciones}>
            <h3>Datos sobre la Autodeclaración</h3>
            <label className="text-terciary">
              Cargar los archivos en los correspondientes sitios
            </label>
            <div className="row mt-4 px-3 align-items-end">
              <div className="col-6 col-sm-3">
                <label className="text-terciary">Pago de la obligación</label>
                <button
                  className=" text-capitalize border rounded-pill px-3"
                  title="Anexar documentos"
                  type="button"
                >
                
                  <i className="fa-regular fa-folder fs-4"></i>
                </button>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Existencia de acuerdo de pago:{" "}
                </label>
                <button
                  className=" text-capitalize border rounded-pill px-3"
                  type="button"
                  title="Anexar documentos"
                >
                  <i className="fa-regular fa-folder fs-4"></i>
                </button>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Revocaion o suspención del titulo:{" "}
                </label>
                <button
                  className=" text-capitalize border rounded-pill px-3"
                  type="button"
                  title="Anexar documentos"
                >
                  <i className="fa-regular fa-folder fs-4"></i>
                </button>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Prescripciones del titulo:{" "}
                </label>
                <button
                  className="btn text-capitalize border rounded-pill px-3"
                  type="button"
                  title="Anexar documentos"
                >
                  <i className="fa-regular fa-folder fs-4"></i>
                </button>
              </div>
            </div>
            <div className="row mt-3 px-3">
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Falta ejecutoria del titulo:{" "}
                </label>
                <button
                  className="btn text-capitalize border rounded-pill px-3"
                  type="button"
                  title="Anexar documentos"
                >
                  <i className="fa-regular fa-folder fs-4"></i>
                </button>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Ausencia del titulo ejecutivo:{" "}
                </label>
                <button
                  className="btn text-capitalize border rounded-pill px-3"
                  type="button"
                  title="Anexar documentos"
                >
                  <i className="fa-regular fa-folder fs-4"></i>
                </button>
              </div>
            </div>
            <button
              className="btn text-capitalize border rounded-pill px-3 mt-3"
              type="button"
              title="Regresar"
              onClick={handleCloseModalExcepciones}
            >
              <i className="fa-solid fa-angles-left fs-3"></i>
            </button>
            <button
              type="button"
              className="btn text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
              title="Continuar"
              onClick={handleOpenModaleditarExcepcion}
            >
              <i className="fa-solid fa-angles-right fs-3"></i>
            </button>
          </ModalLocal>
          <ModalLocal localState={editarExcepcion}>
            <h3>Oficio para la excepción</h3>
            <div>
              <label className="text-terciary">
                Espacio para el documento que se vaya a editar
              </label>
            </div>

            <button
              className="btn text-capitalize border rounded-pill px-3 mt-3"
              type="button"
              title="Regresar"
              onClick={handleCloseModaleditarExcepcion}
            >
              <i className="fa-solid fa-angles-left fs-3"></i>
            </button>
            <button
              type="button"
              className="btn text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
              title="Continuar"
            >
              <i className="fa-solid fa-circle-check fs-3"></i>
            </button>
            <button
              type="button"
              className="btn text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
              title="Editar"
            >
              <i className="fa-regular fa-pen-to-square fs-3"></i>
            </button>
          </ModalLocal>
        </form>
      </div>
    </div>
  );
};
