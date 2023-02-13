import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Subtitle from "../../components/Subtitle";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { AgGridReact } from "ag-grid-react";
import { getClassificationCCDSService } from "../../services/CCD/CCDServices";
import { getCCDCurrent } from "../../store/slices/CCD/indexCCD";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
  },
};

Modal.setAppElement("#root");

const SearchTrdModal = ({ isModalActive, setIsModalActive }) => {


  const columTRD = [
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Versión",
      field: "version",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Estado",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <span>
            {params.data.fecha_terminado ? "Terminado" : "En Proceso"}
          </span>
        </div>
      ),
    },
    {
      headerName: "Acciones",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button className="btn text-capitalize " type="button" title="Seleccionar"
            
          >
            <i className="fa-regular fa-pen-to-square fs-4"></i>
          </button>
        </div>
      ),
    },
  ];

  const rowTRD = [
    {
      nombre :"TRD 1",
      version :"1"
    },
    {
        nombre :"TRD 1",
        version :"2"
      },
      {
        nombre :"TRD 1",
        version :"3"
      },
]

  //configuración de tabla por defecto
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

  return (
    <Modal
      isOpen={isModalActive}
      onRequestClose={() => setIsModalActive(false)}
      style={customStyles}
      className="modal"
      id="modal-article-id"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row min-vh-100 ">
        <div className="col-12 mx-auto">
        <Subtitle title={"Consultar TRD"} />
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <div className="row">
              <div className="col-12 col-sm-6 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Buscador de cuadro de clasificación documental</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="Buscar..."
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 mb-3">
                <div
                  className="ag-theme-alpine mt-auto mb-3 px-auto"
                  style={{ height: "275px" }}
                >
                  <AgGridReact
                    columnDefs={columTRD}
                    rowData={rowTRD}
                    defaultColDef={defaultColDef}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 d-flex justify-content-end ">
              <button
                className="btn me-md-2  text-capitalize  px-3 mt-2 "
                type="submit"
                title="Cerrar"
                onClick={() => setIsModalActive(false)}
              >
                <i className="fa-solid fa-x fs-3"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SearchTrdModal;
