import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import useAlarmas from "../../../hooks/useAlarmas";

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

const AlarmasScreen = () => {
  const [typeAction, setTypeAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dataAlarmas } = useAlarmas();

  const columnDefs = [
    { headerName: "Alarma", field: "idAlarma", minWidth: 140 },
    { headerName: "Límite", field: "t006limite", minWidth: 140 },
    { headerName: "Estación", field: "t001nombre", minWidth: 140 },
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
              onClick={() => editAction(params)}
            >
              <img src={IconoEditar} alt="editar" />
            </button>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              title="Send"
              onClick={() => deleteAction(params)}
            >
              <img src={IconoEliminar} alt="eliminar" />
            </button>
          </div>
        </div>
      ),
      minWidth: 160,
    },
  ];

  const deleteAction = async (params) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Una configuración que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConfiguration(params);
      }
    });
  };

  const deleteConfiguration = async (params) => {
    try {
      setLoading(true);
      await clienteEstaciones.delete(`Configuraciones/${params.data.objectid}`);
      setLoading(false);
      //   updateConfigs();
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error, intenta de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const editAction = async (params) => {
    setTypeAction("editar");
    // setIsModalOpen(true);
    try {
      setLoading(true);
      const { data: dataConfig } = await clienteEstaciones.get(
        `Configuraciones/${params.data.objectid}`
      );
      const { data: dataEstacion } = await clienteEstaciones.get(
        `Estaciones/${params.data.objectid}`
      );
      dataConfig.t001nombre = dataEstacion.t001nombre;
      //   resetConfiguracion(dataConfig);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error, intenta de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-4">
          Configuracion de alarmas
        </h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <form className="row">
            <div className="multisteps-form__content">
              <div>
                <button
                  type="submit"
                  className="btn bg-gradient-primary text-capitalize d-block ms-auto mt-3 me-4"
                  disabled={loading}
                  onClick={() => {
                    setTypeAction("crear");
                  }}
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
                    "Crear configuración"
                  )}
                </button>
              </div>
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-8 px-4"
                  style={{ height: "470px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={dataAlarmas}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlarmasScreen;
