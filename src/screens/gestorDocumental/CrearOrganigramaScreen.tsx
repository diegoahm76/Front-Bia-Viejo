import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

// Hooks
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
// Components
import CrearItemOrganigramaModal from "../../components/CrearItemOrganigramaModal";
// Actions
import { getOrganigramsService } from "../../services/organigram/OrganigramServices";
// Slice
import { currentOrganigram } from "../../store/slices/organigrama/indexOrganigram";
// Css
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function CrearOrganigramaScreen() {
  // Redux State Extraction
  const { organigram } = useAppSelector((state) => state.organigram);
  // Naveigate instance
  const navigate = useNavigate();
  // Dispatch instance
  const dispatch = useAppDispatch();

  const [crearOrganigramaIsActive, setCrearOrganigramaIsActive] = useState<boolean>(false);

  // UseEffect para obtener organigramas
  useEffect(() => {
    dispatch(getOrganigramsService())
  }, []);

  const columnDefs = [
    {
      headerName: "Item",
      field: "id_organigrama",
      minWidth: 65,
      maxWidth: 100,
      wrapText: true,
      autoHeight: true,
    },
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 120,
      maxWidth: 200,
      wrapText: true,
      autoHeight: false,
    },
    {
      headerName: "Descripción",
      field: "descripcion",
      minWidth: 120,
      maxWidth: 200,
      wrapText: true,
      autoHeight: false,
    },
    {
      headerName: "Versión",
      field: "version",
      minWidth: 85,
      maxWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Fecha Terminado",
      field: "fecha_terminado",
      minWidth: 110,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Fecha Publicación",
      field: "fecha_puesta_produccion",
      minWidth: 110,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Fecha Retiro",
      field: "fecha_retiro_produccion",
      minWidth: 110,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Justificación Nueva Versión",
      field: "justificacion_nueva_version",
      minWidth: 100,
      wrapText: true,
    },
    // {
    //   headerName: "Actual",
    //   field: "actual",
    //   minWidth: 75,
    //   maxWidth: 100,
    //   headerCheckboxSelection: false,
    //   checkboxSelection: false,
    //   showDisabledCheckboxes: false,
    // },
    {
      headerName: "Actual",
      field: "actual",
      wrapText: true,
      headerAlign: "center",
      minWidth: 140,
      headerCheckboxSelection: false,
      checkboxSelection: false,
      showDisabledCheckboxes: false,
      cellRendererFramework: ({ data: { actual } }) => (
        <i className={`${actual === true ? "fa-solid fa-circle-check fs-3" : "fa-regular fa-xmark fs-3"}`}></i>
      ),
    },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: ({ data }) => (
        <div>
          <button
            type="button"
            style={{ border: "none", background: "none" }}
            onClick={() => {
              dispatch(currentOrganigram(data));
              navigate('/dashboard/gestordocumental/organigrama/edicion-organigrama');
            }}
          >
            <i className="fa-regular fa-pen-to-square fs-3"></i>
          </button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: false,
    suppressMovable: true,
  };


  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-3 text-start mb-3 fw-light ms-3">
            Crear Organigrama
          </h3>
          <button
            className="ms-3 mt-3 btn btn-primary flex-center text-capitalize border rounded-pill px-3"
            type="button"
            form="configForm"
            onClick={() => setCrearOrganigramaIsActive(true)}
          >
            Crear
          </button>

          <label
            className="mt-4 form-control ms-0 fw-bolder text-white text-center"
            style={{
              background: "#002c42",
            }}
          >
            Organigramas
          </label>
          <div id="myGrid" className="ag-theme-alpine mt-2">
            <div
              className="ag-theme-alpine my-1 mx-3"
              style={{ height: "550px" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={organigram}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
          </div>
        </div>
        <CrearItemOrganigramaModal
          isModalActive={crearOrganigramaIsActive}
          setIsModalActive={setCrearOrganigramaIsActive}
        />
      </div>
    </div>
  );
}

export default CrearOrganigramaScreen;