import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../../actions/modalActions";
import CalendarModal from "../../../../components/CalendarModal";
import ModalLocal from "../../../../components/ModalLocal";
import Subtitle from "../../../../components/Subtitle";

const defaultColDef = {
  sortable: true,
  editable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  suppressMovable: true,
};

const dataPrueba = [
  {
    "Numero de solicitud": "0001",
    "Nombre de profesional": "Juan Carlos",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "10/09/2022",
  },
  {
    "Numero de solicitud": "0002",
    "Nombre de profesional": "Juan David",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "12/09/2022",
  },
  {
    "Numero de solicitud": "0003",
    "Nombre de profesional": "Jesus Esteban",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "27/09/2022",
  },
  {
    "Numero de solicitud": "0004",
    "Nombre de profesional": "Santiago Aguirre",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "30/09/2022",
  },
  {
    "Numero de solicitud": "0005",
    "Nombre de profesional": "Marcos Rivera",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "01/09/2022",
  },
  {
    "Numero de solicitud": "0006",
    "Nombre de profesional": "Marcos Rivera",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "02/09/2022",
  },
  {
    "Numero de solicitud": "0007",
    "Nombre de profesional": "Sebastian Mendez",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "27/09/2022",
  },
  {
    "Numero de solicitud": "0008",
    "Nombre de profesional": "Carlos Barrios",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "04/09/2022",
  },
];

const dataPruebaModal = [
  {
    Objeto: "palo cruz",
    Viveros: "La bella",
    Cantidad: 500,
    "Cantidad entregada": "",
    Solicitante: "Profesional MV",
    "Fecha solicitud": "06/07/2022",
  },
  {
    Objeto: "palin",
    Viveros: "La bella",
    Cantidad: 10,
    "Cantidad entregada": "",
    Solicitante: "Profesional MV",
    "Fecha solicitud": "06/07/2022",
  },
  {
    Objeto: "triple 15",
    Viveros: "La bella",
    Cantidad: 50,
    "Cantidad entregada": "",
    Solicitante: "Profesional MV",
    "Fecha solicitud": "06/07/2022",
  },
];

const columnDefsModal = [
  { headerName: "Objeto", field: "Objeto" },
  { headerName: "Viveros", field: "Viveros" },
  { headerName: "Cantidad", field: "Cantidad" },
  { headerName: "Cantidad entregada", field: "Fecha solicitud" },
  { headerName: "Solicitante", field: "Solicitante" },
  { headerName: "Fecha solicitud", field: "Fecha solicitud" },
];

const EntregadosScreen = () => {
  const [viveroSelect, setViveroSelect] = useState(null);
  const [profesionalSelect, setProfesionalSelect] = useState(null);
  const [rowData, setRowData] = useState([]);

  const dispatch = useDispatch();

  const getOptionsForSelects = (valueName) => {
    const dataOptionsAll = dataPrueba.map((data) => data[valueName]);
    const dataOptionsWithoutFormat = dataOptionsAll.filter(
      (item, index) => dataOptionsAll.indexOf(item) === index
    );
    const dataOptions = dataOptionsWithoutFormat.map((data) => ({
      label: data,
      value: data,
    }));
    dataOptions.unshift({ label: "Todos", value: "Todos" });
    return dataOptions;
  };
  const [modalVer, setModalVer] = useState(false)
  const handleOpenModal = () => {
    setModalVer(true);
  };

  const handleCloseModal = () => {
    setModalVer(false);
  };

 

 

  const columnDefs = [
    { headerName: "Numero de solicitud", field: "Numero de solicitud" },
    { headerName: "Nombre de profesional", field: "Nombre de profesional" },
    { headerName: "Vivero relacionado", field: "Vivero relacionado" },
    { headerName: "Fecha solicitud", field: "Fecha solicitud" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn mx-auto my-auto btn-sm text-xxs text-capitalize"
            onClick={ handleOpenModal}
            title="Editar"
          >
        <i className="fa-regular fa-pen-to-square fs-3"></i>   
          </button>
        </div>
      ),
    },
  ];

  const filterBySelects = () => {
    if (viveroSelect === null && profesionalSelect === null) {
      return false;
    }
    console.log(viveroSelect, profesionalSelect)

    const dataFilteredByVivero = dataPrueba.filter(
      (data) =>
        data["Vivero relacionado"] === viveroSelect || viveroSelect === "Todos"
    );

    console.log(dataFilteredByVivero, profesionalSelect);

    const dataFilteredByProfesional = dataFilteredByVivero.filter(
      (data) =>
        data["Nombre de profesional"] === profesionalSelect ||
        profesionalSelect === "Todos"
    );
  //  setRowData(dataFilteredByProfesional);
  };

  const handleClickBuscar = () => {
    filterBySelects();
  };


  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-3 mb-0 text-start fw-light mb-3">Entregas Completadas</h3>
          <Subtitle
          title={"Seleccione opcion a mostrar"}/>
          <div className="row mt-3">
            <div className="col-6 col-sm-3">
              <label className="text-terciary">Vivero</label>
              <Select
                options={getOptionsForSelects("Vivero relacionado")}
                placeholder="Seleccione"
              
              />
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">Profesional</label>
              <Select
                options={getOptionsForSelects("Nombre de profesional")}
                placeholder="Seleccione"
               
              />
            </div>
<div className="col-6 col-sm-3 mt-3">
            <button
            onClick={handleClickBuscar}
            className="btn d-block ms-auto mt-3 text-capitalize"
            title="Buscar"
          >
            <i className="fa-solid fa-magnifying-glass fs-3"></i>
          </button>
          </div>
          </div>
          

          <div id="myGrid" className="ag-theme-alpine mt-3">
            <div
              className="container ag-theme-alpine"
              style={{ height: "300px", maxWidth: "800px" }}
            >
              <AgGridReact
                className="ag-theme-alpine"
                animateRows="true"
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
              ></AgGridReact>
            </div>
          </div>
          <ModalLocal localState={modalVer}>
            <h3 className="font-weight-bolder mt-2">Entregados</h3>
            <label className="mt-5 fw-bold fs-6 d-block">
              Numero de entrega: <span className="fw-normal">0000960</span>
            </label>
            <div className="row mt-3">
              <div className="col-12 col-md-6">
                <label className="fw-bold fs-6 d-block">
                  Documentación relacionada:
                </label>
              </div>
              <div className="col-12 col-md-6">
                <div className="col-3 text-center">
                  <i className="fa-solid fa-file fs-3 d-block"></i>
                  <label className="d-block m-0">Contratos</label>
                </div>
                <button className="btn bg-gradient-primary ms-auto d-block mt-3 text-capitalize">
                  Anexar Documentación
                </button>
              </div>
            </div>
            <div id="myGrid" className="ag-theme-alpine mt-3">
              <div
                className="container ag-theme-alpine"
                style={{ height: "300px", maxWidth: "900px" }}
              >
                <AgGridReact
                  className="ag-theme-alpine"
                  animateRows="true"
                  columnDefs={columnDefsModal}
                  rowData={dataPruebaModal}
                  defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>
            </div>
            <div className="input-group input-group-dynamic flex-column">
              <label htmlFor="exampleFormControlInput1" className="text-terciary">Observaciones:</label>
              <textarea
                disabled
                className="multisteps-form__input form-control w-auto"
                value={
                  "La solicitud se entrega a conformidad del profesional que recoge, no hubo ninguna anomalia en la entrega"
                }
              />
            </div>
            <label className="text-terciary">
              Estos campos no son editables por seguridad de la información
            </label>
            <button
              className="btn bg-gradient-primary d-block ms-auto mt-3 text-capitalize"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </ModalLocal>
        </div>
      </div>
    </div>
  );
};

export default EntregadosScreen;
