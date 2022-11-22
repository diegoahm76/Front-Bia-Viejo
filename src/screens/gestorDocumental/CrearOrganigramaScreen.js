import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CrearItemOrganigramaModal from "../../components/CrearItemOrganigramaModal";
import IconoEditar from "../../assets/iconosEstaciones/edit-svgrepo-com.svg";
// import IconoEliminar from "../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import { obtenerOrganigramaAction, editarOrganigramaObtenerAction } from "../../actions/organigramaActions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function CrearOrganigramaScreen() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSumbitNiveles = async (data) => {
    const nuevoOrganigramaNiveles = {
      ...data,
      id_organigrama: data.id_organigrama,
      nombre: data.nombre,
      version: data.version,
      descripcion: data.descripcion,
    };

    console.log(data);
    // dispatch(agregarOrganigramaAction(nuevoOrganigramaNiveles));
    navigate('/dashboard/gestordocumental/organigrama/edicion-organigrama')
  };

  useEffect(() => {
    const getOrganigrama = () => dispatch(obtenerOrganigramaAction());
    getOrganigrama();
  }, []);

  const { organigrama } = useSelector((state) => state.organigrama);

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
    {
      headerName: "Resolución",
      field: "ruta_resolucion",
      minWidth: 105,
      maxWidth: 120,
      wrapText: true,
    },
    {
      headerName: "Actual",
      field: "actual",
      minWidth: 75,
      maxWidth: 100,
      headerCheckboxSelection: false,
      checkboxSelection: false,
      showDisabledCheckboxes: false,
    },

    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn my-1 btn-sm btn-tablas btn-outline-warning "
            type="button"
            // onSubmit={handleSubmit(onSumbitNiveles)}
            onClick={() => {
              dispatch(editarOrganigramaObtenerAction(params.data));
              navigate('/dashboard/gestordocumental/organigrama/edicion-organigrama');
              // setIsModalEditarActivate(!isModalActive);
            }}
          >
            <img src={IconoEditar} alt="editar" />
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

  // PARA MODALES SE USA ESTE CODIGO
  const [crearOrganigramaIsActive, setCrearOrganigramaIsActive] =
    useState(false);

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        {/*  CUERPO DEL FORMULARIO  */}

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
            title="Send"
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
                rowData={organigrama}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                pagination = { true }
                paginationPageSize={10}
              ></AgGridReact>
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