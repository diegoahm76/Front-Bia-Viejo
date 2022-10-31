import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CalendarModal from "../../components/CalendarModal";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../actions/modalActions";
//import Swal from "sweetalert2";
import clienteAxios from "../../config/clienteAxios";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
import Select from "react-select";
import Subtitle from "../../components/Subtitle";

const rolesOptions = [
  { label: "Almacen / Articulo / Consultar", value: "1.1" },
  { label: "Almacen / Articulo / Crear", value: "1.2" },
  { label: "Almacen / Articulo / Actualizar", value: "1.3" },
  { label: "Almacen / Bodega / Consultar", value: "2.1" },
  { label: "Almacen / Bodega / Crear", value: "2.2" },
  { label: "Almacen / Bodega / Actualizar", value: "2.3" },
  { label: "Almacen / Bodega / Borrar", value: "2.4" },
];

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
  initialWidth: 100,
  suppressMovable: true,
};

// const columDefsUsuario = [
//   { headerName: "Usuarios con este rol", field: "Usuarios con este rol" },
// ];

const RolesScreen = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const accessToken = getTokenAccessLocalStorage();
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const { data: dataRoles } = await clienteAxios.get(
          "roles/get-list",
          config
        );

        setRoles(dataRoles);
      } catch (error) {
        console.log(error);
      }
    };
    getRoles();
  }, []);

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
  // const [rowDataUsuarios, setRowDataUsuarios] = useState([
  //   { "Usuarios con este rol": "Julian Catillo" },
  //   { "Usuarios con este rol": "Jesus Cruz" },
  //   { "Usuarios con este rol": "Angelica Gomez" },
  // ]);
  const [isCreate, setisCreate] = useState(true);
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const editAction = (params) => {
  //   setisCreate(false);
  //   dispatch(activeModalAction());
  // };

  // const deleteAction = (params) => {
  //   Swal.fire({
  //     title: `¿Esta seguro de eliminar el rol ${params.node.data.Nombre}?`,
  //     text: "No se pueden revertir los cambios después de aceptar",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Aceptar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const dataFiltered = rowData.filter(
  //         (data) => params.node.data.Nombre !== data.Nombre
  //       );
  //       setRowData(dataFiltered);
  //       Swal.fire("Eliminado", "El rol ha sido elminado", "success");
  //     }
  //   });
  // };

  const columDefs = [
    { headerName: "Nombre", field: "nombre_rol", minWidth: 150, maxWidth: 220 },
    {
      headerName: "Descripcion",
      field: "descripcion_rol",
      minWidth: 200,
      maxWidth: 450,
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

  // const handleClickAccion = (e) => {
  //   const newDataAccordion = dataAccordion.map((data) => {
  //     if (data.subsistema === e.target.dataset.subsistema) {
  //       data.tipos.map((tipoSubsistema) => {
  //         if (tipoSubsistema.tipo === e.target.dataset.tipo) {
  //           tipoSubsistema.acciones[e.target.dataset.accion] = e.target.checked;
  //           return tipoSubsistema;
  //         } else {
  //           return tipoSubsistema;
  //         }
  //       });
  //       return data;
  //     } else {
  //       return data;
  //     }
  //   });
  //   setDataAccordion(newDataAccordion);
  // };

  // const handleClickAllActions = (e) => {
  //   const newDataAccordion = dataAccordion.map((data) => {
  //     if (data.subsistema === e.target.dataset.subsistema) {
  //       data.tipos.map((tipoSubsistema) => {
  //         if (tipoSubsistema.tipo === e.target.dataset.tipo) {
  //           Object.keys(tipoSubsistema.acciones).forEach((accion) => {
  //             tipoSubsistema.acciones[accion] = e.target.checked;
  //           });
  //           return tipoSubsistema;
  //         } else {
  //           return tipoSubsistema;
  //         }
  //       });
  //       return data;
  //     } else {
  //       return data;
  //     }
  //   });
  //   setDataAccordion(newDataAccordion);
  // };

  const handleCreateRole = () => {
    setisCreate(true);
    dispatch(activeModalAction());
  };

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(searchByName)}>
            <h3 className="mt-3 mb-0 ms-3 fw-light text-terciary">
              Administrador De Roles
            </h3>
            {/* <div className="multisteps-form__content">
              <div className="row">
                <label
                  className="form-control border rounded-pill px-4 mt-3 text-white fs-5"
                  style={{
                    backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)",
                  }}
                >
                  Informacion de roles
                </label>
              </div>
            </div> */}
            <Subtitle title="Informacion de roles" mt={3} />
            <div className="d-flex align-items-end gap-4 mt-2 ms-3">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">Nombre del rol</label>
                <input
                  type="text"
                  className="form-control border rounded-pill px-3"
                  {...register("nombreRol", { required: true })}
                />
                {errors.nombreRol && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="btn bg-gradient-primary text-capitalize rounded-pill"
                >
                  Buscar
                </button>
              </div>
            </div>
            <div id="myGrid" className="ag-theme-alpine mt-3">
              <div
                className="container ag-theme-alpine"
                style={{ height: "300px", maxWidth: "750px" }}
              >
                <AgGridReact
                  className="ag-theme-alpine"
                  animateRows="true"
                  columnDefs={columDefs}
                  rowData={roles}
                  defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn bg-gradient-primary text-capitalize mt-3 rounded-pill"
                onClick={handleCreateRole}
              >
                Crear rol
              </button>
            </div>
          </form>
          <CalendarModal>
            <form className="row p-3">
              <h4>{isCreate ? "Crear Rol" : "Editar Rol"}</h4>
              <hr className="rounded-pill hr-modal" />
              <div className="col-12 col-md-5 mb-3">
                <label>Nombre rol</label>
                <input
                  type="text"
                  className="form-control border rounded-pill px-3"
                  {...register("nombreRol", { required: true })}
                />
                {errors.nombreRol && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label>Descripción:</label>
                <textarea className="form-control border rounded-pill px-3" />
              </div>
              <div className="col-12">
                <label className="form-label">Permisos - Rol:</label>
                <Controller
                  name="tipoTercero"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      // defaultValue={[paisesOptions[0], paisesOptions[1]]}
                      options={rolesOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn bg-gradient-light text-capitalize mt-3 mb-0 rounded-pill"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn bg-gradient-primary text-capitalize mt-3 mb-0 rounded-pill"
                  onClick={handleCloseModal}
                >
                  Guardar
                </button>
              </div>
            </form>
          </CalendarModal>
        </div>
      </div>
    </div>
  );
};
export default RolesScreen;
