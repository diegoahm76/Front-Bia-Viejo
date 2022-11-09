import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ModalLocal from "../../components/ModalLocal";
import IconoEditar from "../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
// import IconoDocumento from '../../assets/document.svg'
import { useForm, Controller } from "react-hook-form";

function CrearOrganigramaScreen() {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setSelecOpciones({
      vivero: data.vivero,
    });
  };

  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  let gridApi;

  const columnDefsArticulos = [
    {
      headerName: "Item",
      field: "item",
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
      autoHeight: true,
    },
    {
      headerName: "Descripción",
      field: "descripcion",
      minWidth: 120,
      maxWidth: 200,
      wrapText: true,
      autoHeight: true,
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
      field: "fechaTerminado",
      minWidth: 110,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Fecha Publicación",
      field: "fechaPublicacion",
      minWidth: 110,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Fecha Retiro",
      field: "fechaRetiro",
      minWidth: 110,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Justificación Nueva Versión",
      field: "justificacionNuevaVersion",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Resolución",
      field: "resolución",
      minWidth: 105,
      maxWidth: 120,
      wrapText: true,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn my-2 btn-sm btn-tablas btn-outline-primary text-capitalize"
            type="button"
            onClick={() => {
              // dispatch(obtenerEstacionEditarAction(params.data));
              // setIsModalEditarActivate(!isModalActive);
            }}
          >
            Ver
            {/* <img src={IconoDocumento} alt="documento" /> */}
          </button>
          </div>
      ),
    },
    {
      headerName: "Actual",
      field: "actual",
      minWidth: 75,
      maxWidth: 100,
      headerCheckboxSelection: false,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },

    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn my-2 btn-sm btn-tablas btn-outline-warning "
            type="button"
            onClick={() => {
              // dispatch(obtenerEstacionEditarAction(params.data));
              // setIsModalEditarActivate(!isModalActive);
            }}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn my-2 btn-sm btn-tablas btn-outline-danger"
            type="button"
            onClick={() => {
              
            }}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>
        </div>
      ),
    },
  ];

  const rowDataArticulos = [
    {
      item: 1,
      nombre: "Organigrama inicial",
      descripcion: "Organigrama de prueba",
      version: 1.1,
      fechaTerminado: "11/02/2021",
      fechaPublicacion: "22/10/2021",
      fechaRetiro: "20/12/2021",
      justificacionNuevaVersion: "Error del organigrama realizado",
      resolucion: "Botón ver",
      },
    {
      item: 2,
      nombre: "Organigrama inicial",
      descripcion: "Organigrama de prueba",
      version: 1.2,
      fechaTerminado: "11/02/2021",
      fechaPublicacion: "22/10/2021",
      fechaRetiro: "20/12/2021",
      justificacionNuevaVersion: "Error del organigrama realizado",
      resolucion: "Botón ver",
      },
   
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: false,
    floatingFilter: false,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    rowSelection: "multiple",
    suppressRowClickSelection: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const dispatch = useDispatch();

  // PARA MODALES SE USA ESTE CODIGO
  const [modal, setModal] = useState(false);
  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const [crear, setCrear] = useState(false);

  const handleOpenModalCrear = () => {
    setCrear(true);
  };

  const handleCloseModalCrear = () => {
    setCrear(false);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        {/*  CUERPO DEL FORMULARIO  */}

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <h3 className="mt-3 text-start mb-3 fw-light ms-3">
            Crear Organigrama
          </h3>
                   <button
                    type="button"
                    className="ms-3 mt-3 btn btn-primary flex-center text-capitalize border rounded-pill px-3"
                  >
                    Crear
                  </button>

                  <label className="mt-4 form-control ms-0 fw-bolder text-white text-center" style={{
          background: "#002c42",
        }}>
                  Organigramas
                </label>
              <div id="myGrid" className="ag-theme-alpine mt-2">
                <div
                  className="ag-theme-alpine my-1 mx-3"
                  style={{ height: "450px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefsArticulos}
                    rowData={rowDataArticulos}
                    debounceVerticalScrollbar={true}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
        </form>


        <ModalLocal localState={crear}>
          
        </ModalLocal>

      </div>
    </div>
  );
}

export default CrearOrganigramaScreen;
