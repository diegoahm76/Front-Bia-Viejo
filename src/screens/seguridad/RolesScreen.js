import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CalendarModal from "../../components/CalendarModal";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../actions/modalActions";
import Swal from "sweetalert2";
import MarcaDeAgua1 from "../../components/MarcaDeAgua1";

const rowDataInitial = [
  {
    Nombre: "Almacenista",
    Descripcion: "Descripcion 1",
  },
  {
    Nombre: "Viverista",
    Descripcion: "Descripcion 1",
  },
  {
    Nombre: "Jefe de almacen",
    Descripcion: "Descripcion 1",
  },
];

const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  suppressMovable: true,
};

const columDefsUsuario = [
  { headerName: "Usuarios con este rol", field: "Usuarios con este rol" },
];

const RolesScreen = () => {
  const [dataAccordion, setDataAccordion] = useState([
    {
      subsistema: "almacen",
      tipos: [
        {
          tipo: "articulo",
          acciones: { consultar: false, crear: false, actualizar: false },
        },
        {
          tipo: "bodega",
          acciones: { editar: false, eliminar: false, actualizar: false },
        },
      ],
    },
    {
      subsistema: "conservacion",
      tipos: [
        {
          tipo: "articulo",
          acciones: { consultar: false, crear: false, actualizar: false },
        },
        {
          tipo: "bodega",
          acciones: { editar: false, eliminar: false, actualizar: false },
        },
      ],
    },
  ]);
  const [rowData, setRowData] = useState([]);
  const [rowDataUsuarios, setRowDataUsuarios] = useState([
    { "Usuarios con este rol": "Julian Catillo" },
    { "Usuarios con este rol": "Jesus Cruz" },
    { "Usuarios con este rol": "Angelica Gomez" },
  ]);
  const [isCreate, setisCreate] = useState(true);
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editAction = (params) => {
    setisCreate(false);
    dispatch(activeModalAction());
  };

  const deleteAction = (params) => {
    Swal.fire({
      title: `¿Esta seguro de eliminar el rol ${params.node.data.Nombre}?`,
      text: "No se pueden revertir los cambios después de aceptar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        const dataFiltered = rowData.filter(
          (data) => params.node.data.Nombre !== data.Nombre
        );
        setRowData(dataFiltered);
        Swal.fire("Eliminado", "El rol ha sido elminado", "success");
      }
    });
  };

  const columDefs = [
    { headerName: "Nombre", field: "Nombre" },
    {
      headerName: "Accion 1",
      field: "accion 1",
      cellRendererFramework: (params) => (
        <button
          className="btn bg-gradient-primary d-block mx-auto my-auto btn-sm text-xxs text-capitalize"
          onClick={() => editAction(params)}
        >
          Editar
        </button>
      ),
    },
    {
      headerName: "Accion 2",
      field: "accion 2",
      cellRendererFramework: (params) => (
        <button
          className="btn bg-gradient-danger d-block mx-auto my-auto btn-sm text-xxs text-capitalize"
          onClick={() => deleteAction(params)}
        >
          Eliminar
        </button>
      ),
    },
  ];

  const searchByName = (dataForm) => {
    const dataRender = rowDataInitial.filter((dataRow) => {
      if (dataForm.nombre === "") {
        return true;
      }
      if (
        dataRow.Nombre.toLowerCase().includes(dataForm.nombre.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    setRowData(dataRender);
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  const handleClickAccion = (e) => {
    const newDataAccordion = dataAccordion.map((data) => {
      if (data.subsistema === e.target.dataset.subsistema) {
        data.tipos.map((tipoSubsistema) => {
          if (tipoSubsistema.tipo === e.target.dataset.tipo) {
            tipoSubsistema.acciones[e.target.dataset.accion] = e.target.checked;
            return tipoSubsistema;
          } else {
            return tipoSubsistema;
          }
        });
        return data;
      } else {
        return data;
      }
    });
    setDataAccordion(newDataAccordion);
  };

  const handleClickAllActions = (e) => {
    const newDataAccordion = dataAccordion.map((data) => {
      if (data.subsistema === e.target.dataset.subsistema) {
        data.tipos.map((tipoSubsistema) => {
          if (tipoSubsistema.tipo === e.target.dataset.tipo) {
            Object.keys(tipoSubsistema.acciones).forEach((accion) => {
              tipoSubsistema.acciones[accion] = e.target.checked;
            });
            return tipoSubsistema;
          } else {
            return tipoSubsistema;
          }
        });
        return data;
      } else {
        return data;
      }
    });
    setDataAccordion(newDataAccordion);
  };

  const handleCreateRole = () => {
    setisCreate(true);
    dispatch(activeModalAction());
  };

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Administrador de roles</h3>
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <MarcaDeAgua1>
            <form className="row" onSubmit={handleSubmit(searchByName)}>
              <div className="col-12 col-md-8">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    {...register("nombre")}
                    placeholder="Tipo de documento"
                  />
                  <label className="ms-2">Nombre</label>
                </div>
              </div>
              <div>
                <div className="col-12 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn bg-gradient-primary text-capitalize mt-3"
                  >
                    Buscar
                  </button>
                </div>
              </div>
              <div id="myGrid" className="ag-theme-alpine mt-3">
                <div
                  className="container ag-theme-alpine"
                  style={{ height: "300px", maxWidth: "600px" }}
                >
                  <AgGridReact
                    className="ag-theme-alpine"
                    animateRows="true"
                    columnDefs={columDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn bg-gradient-primary text-capitalize mt-3"
                  onClick={handleCreateRole}
                >
                  Crear rol
                </button>
              </div>
            </form>
          </MarcaDeAgua1>
          <CalendarModal>
            <MarcaDeAgua1>
              <form className="row">
                <h3 className="mt-3 mb-0 text-center mb-6">
                  {isCreate ? "Crear rol" : "Editar rol"}
                </h3>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nombre"
                    />
                    <label className="ms-2">Nombre</label>
                  </div>
                </div>
                <div className="form-floating input-group input-group-dynamic">
                  <textarea
                    className="form-control"
                    placeholder="Descripción"
                  />
                  <label className="ms-3">Descripción:</label>
                </div>
                <div className="accordion mt-4">
                  {dataAccordion.map((data) => (
                    <>
                      <div className="accordion-item">
                        <h2 className="accordion-header text-sm mt-1">
                          <button
                            className="accordion-button bg-gradient-primary text-white ps-2 text-capitalize"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#R${data.subsistema}`}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            {data.subsistema}
                          </button>
                        </h2>
                        <div
                          id={`R${data.subsistema}`}
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body">
                            <div className="accordion">
                              {data.tipos.map((tipoSubsistema) => (
                                <div className="accordion-item">
                                  <h2 className="accordion-header text-sm d-flex align-items-baseline justify-content-between mt-1">
                                    <button
                                      className="accordion-button bg-gradient-primary text-white ps-4 text-capitalize"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#R${data.subsistema}${tipoSubsistema.tipo}`}
                                      aria-expanded="true"
                                      aria-controls="collapseOne"
                                    >
                                      {tipoSubsistema.tipo}
                                    </button>
                                    <div>
                                      <div className="form-check">
                                        <input
                                          data-subsistema={data.subsistema}
                                          data-tipo={tipoSubsistema.tipo}
                                          className="form-check-input"
                                          type="checkbox"
                                          onClick={handleClickAllActions}
                                          value=""
                                        />
                                      </div>
                                    </div>
                                  </h2>
                                  <div
                                    id={`R${data.subsistema}${tipoSubsistema.tipo}`}
                                    className="accordion-collapse collapse"
                                  >
                                    <div className="accordion-body">
                                      <div className="form-check mt-4">
                                        {Object.keys(
                                          tipoSubsistema.acciones
                                        ).map((accion) => (
                                          <label className="form-check-label d-flex text-capitalize">
                                            {accion}
                                            <input
                                              data-subsistema={`${data.subsistema}`}
                                              data-tipo={tipoSubsistema.tipo}
                                              data-accion={accion}
                                              className="form-check-input"
                                              checked={
                                                tipoSubsistema.acciones[accion]
                                              }
                                              type="checkbox"
                                              onClick={handleClickAccion}
                                            />
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div id="myGrid" className="ag-theme-alpine mt-3">
                  <div
                    className="container ag-theme-alpine"
                    style={{ height: "300px", maxWidth: "800px" }}
                  >
                    <AgGridReact
                      className="ag-theme-alpine"
                      animateRows="true"
                      columnDefs={columDefsUsuario}
                      rowData={rowDataUsuarios}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn bg-gradient-light text-capitalize mt-3"
                    onClick={handleCloseModal}
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mt-3"
                    onClick={handleCloseModal}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </MarcaDeAgua1>
          </CalendarModal>
        </div>
      </div>
    </div>
  );
};
export default RolesScreen;
