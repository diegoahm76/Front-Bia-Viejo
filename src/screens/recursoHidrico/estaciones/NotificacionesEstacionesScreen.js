import React from "react";
import { Controller, set, useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect } from "react";
import { useState } from "react";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import { AgGridReact } from "ag-grid-react";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import NotificacionNuevo from "../../../components/NotificacionNuevo";
import NotificacionEditar from "../../../components/NotificacionEditar";
import NotificacionEliminar from "../../../components/NotificacionEliminar";
import { useDispatch, useSelector } from "react-redux";
import { obtenerNotificacionesAction } from "../../../actions/notificacionActions";

const NotificacionesEstacionesScreen = () => {
  const [estadoModalNueva, setEstadoModalNueva] = useState(false);
  const [estadoModalEditar, setEstadoModalEditar] = useState(false);
  const [estadoModalEliminar, setEstadoModalEliminar] = useState(false);

const dispatch = useDispatch()

const {notificaciones} = useSelector ((state)=>state.notificaciones)

  const columnDefs = [
    {
      headerName: "Usuario",
      field: "t005Usuarios.t005nombre",
      minWidth: 250,
    },
    {
      headerName: "Alarma",
      field: "t006Alarmas.t006nombre",
      minWidth: 250,
    },
    {
      headerName: "Acciones",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div>
            <button
              className="btn btn-sm btn-outline-warning "
              type="button"
              title="Send"
              onClick={() => {
                setEstadoModalEditar(!estadoModalEditar);
              }}
            >
              <img src={IconoEditar} alt="editar" />
            </button>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              title="Send"
              onClick={() => {
                setEstadoModalEliminar(!estadoModalEliminar);
              }}
            >
              <img src={IconoEliminar} alt="eliminar" />
            </button>
          </div>
        </div>
      ),
      minWidth: 250,
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

  useEffect(() => {
    dispatch(obtenerNotificacionesAction())
  }, [])
  
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-4">Notificaciones</h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <form className="row">
            <div>
          
              <button
                type="button"
                className="btn bg-gradient-primary text-capitalize d-block ms-auto mt-3 me-4"
                onClick={() => {
                  setEstadoModalNueva(!estadoModalNueva);
                }}
              >
                Nuevo
              </button>
            </div>

            <div
              className="ag-theme-alpine mt-auto mb-8 px-4"
              style={{ height: "470px" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={notificaciones}
                defaultColDef={defaultColDef}
              ></AgGridReact>
            </div>
          </form>
        </div>
      </div>
      <NotificacionNuevo
        isModalActive={estadoModalNueva}
        setIsModalActive={setEstadoModalNueva}
      />
      <NotificacionEditar
        isModalActive={estadoModalEditar}
        setIsModalActive={setEstadoModalEditar}
      />
      <NotificacionEliminar
        isModalActive={estadoModalEliminar}
        setIsModalActive={setEstadoModalEliminar}
      />
    </div>
  );
};
export default NotificacionesEstacionesScreen;
