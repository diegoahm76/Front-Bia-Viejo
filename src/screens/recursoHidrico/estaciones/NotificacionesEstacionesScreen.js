import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import { AgGridReact } from "ag-grid-react";
import NotificacionModal from "../../../components/NotificacionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarModoAction,
  eliminarNotificacionAction,
  obtenerNotificacionEditAction,
  obtenerNotificacionesAction,
} from "../../../actions/notificacionActions";
import { useForm } from "react-hook-form";

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

const NotificacionesEstacionesScreen = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useDispatch();

  const { notificaciones, loading } = useSelector(
    (state) => state.notificaciones
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const columnDefs = [
    {
      headerName: "Usuario",
      field: "t005Usuarios.t005nombre",
      minWidth: 250,
    },
    {
      headerName: "Numero",
      field: "t005Usuarios.t005numero",
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
              onClick={() => editarAction(params.data.idNotificacion)}
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
                dispatch(
                  eliminarNotificacionAction(params.data.idNotificacion)
                );
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

  const editarAction = (idNotificacion) => {
    setIsModalActive(true);
    dispatch(obtenerNotificacionEditAction(idNotificacion, reset));
  };

  const handleCrearAlarma = () => {
    setIsModalActive(true);
    dispatch(cambiarModoAction("crear"));
  };

  useEffect(() => {
    dispatch(obtenerNotificacionesAction());
  }, []);

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
                disabled={loading}
                onClick={() => handleCrearAlarma()}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Cargando...
                  </>
                ) : (
                  "Crear alarma"
                )}
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
      <NotificacionModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        register={register}
        handleSubmit={handleSubmit}
        watch={watch}
        control={control}
        errors={errors}
        reset={reset}
      />
    </div>
  );
};
export default NotificacionesEstacionesScreen;
