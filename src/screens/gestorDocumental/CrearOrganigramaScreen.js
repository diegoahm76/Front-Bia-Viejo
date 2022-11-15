import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CrearItemOrganigramaModal from "../../components/CrearItemOrganigramaModal";
import IconoEditar from "../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import EliminarUsuarioModal from "../../components/EliminarUsuarioModal";
import NuevoUsuarioModal from "../../components/NuevoUsuarioModal";

import EditarUsuarioModal from "../../components/EditarUsuarioModal";
import { useForm } from "react-hook-form";
// import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
// import clienteAxios from "../../config/clienteAxios";
// import { getConfigAuthBearer } from "../../helpers/configAxios";
import {
  obtenerOrganigramaAction,
  eliminarOrganigramaAction,
  // obtenerOrganigramaEditarAction,
}
  from '../../actions/crearOrganigramaActions'


const CrearOrganigramaScreen = () => {

  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEditarActive, setIsModalEditarActive] = useState(false);
  const [isModalEliminarActive, setIsModalEliminarActive] = useState(false);

  const {  handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(obtenerOrganigramaAction());
  }, []);

  // const { organigrama } = useSelector((state) => state.organigrama);


  // const accessToken = getTokenAccessLocalStorage();
  // const config = getConfigAuthBearer(accessToken);

  // const getOrganigramasList = async () => {
  //   try {
  //     const { data: dataOrganigrama } = await clienteAxios.get(
  //       "/almacen/organigrama/create",
  //       config
  //     );
  //     setOrganigrama(dataOrganigrama);
  //     console.log(dataOrganigrama)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }



  const handleEditPage = () => {
    navigate("/dashboard/gestorDocumental/organigrama/edicion-organigrama");
  }


  const onSubmit = (data) => { };



  //const [selecOpciones, setSelecOpciones] = useState();

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
      // cellRendererFramework: (params) => (
      //   <div className="d-flex gap-1">
      //     <button
      //       className="btn my-2 btn-sm btn-tablas btn-outline-primary text-capitalize"
      //       type="button"
      //       onClick={() => {
      //         // dispatch(obtenerEstacionEditarAction(params.data));
      //         // setIsModalEditarActivate(!isModalActive);
      //       }}
      //     >
      //       Ver
      //       {/* <img src={IconoDocumento} alt="documento" /> */}
      //     </button>
      //   </div>
      // ),
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
            title="Send"
            form="configForm"
            onClick={() => {
              handleEditPage();
              setIsModalEditarActive(!isModalEditarActive);
            }}

          // dispatch(obtenerEstacionEditarAction(params.data));
          // setIsModalEditarActivate(!isModalActive);

          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn my-1 btn-sm btn-tablas btn-outline-danger"
            type="button"
            onClick={() => {
              dispatch(eliminarOrganigramaAction(params.data));
              // setIsModalEliminarActive(!isModalActive);
            }}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>
        </div>
      ),
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


  const [crearOrganigramaIsActive, setCrearOrganigramaIsActive] =
    useState(false);

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">

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
              style={{ height: "450px" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={organigrama}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                // onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
        </form>

        <CrearItemOrganigramaModal
          isModalActive={crearOrganigramaIsActive}
          setIsModalActive={setCrearOrganigramaIsActive}
        />
        <NuevoUsuarioModal
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        />

        <EliminarUsuarioModal
          setIsModalActive={setIsModalEliminarActive}
          isModalActive={isModalEliminarActive}
        />
      </div>
    </div>
  );
}

export default CrearOrganigramaScreen;
