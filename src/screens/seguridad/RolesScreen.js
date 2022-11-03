import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CalendarModal from "../../components/CalendarModal";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../actions/modalActions";
import Swal from "sweetalert2";
import clienteAxios from "../../config/clienteAxios";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
import Select from "react-select";
import Subtitle from "../../components/Subtitle";
import { getConfigAuthBearer } from "../../helpers/configAxios";
import {
  getPermisosAdapterSelect,
  getPermisosRolPost,
} from "../../adapters/roles.adapters";

const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 100,
  suppressMovable: true,
};

const RolesScreen = () => {
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);

  const accessToken = getTokenAccessLocalStorage();
  const config = getConfigAuthBearer(accessToken);

  const getRolesList = async () => {
    try {
      const { data: dataRoles } = await clienteAxios.get(
        "roles/get-list",
        config
      );
      setRoles(dataRoles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getRolesPermisos = async () => {
      try {
        getRolesList();

        const { data: dataPermisos } = await clienteAxios.get(
          "permisos/permisos-modulos/get-list/"
        );

        const permisosFormat = getPermisosAdapterSelect(dataPermisos);
        setPermisos(permisosFormat);
      } catch (error) {
        console.log(error);
      }
    };
    getRolesPermisos();
  }, []);

  const [isCreate, setisCreate] = useState(true);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const {
    register: registerRolPermiso,
    control: controlRolPermiso,
    handleSubmit: handleSubmitRolPermiso,
    formState: { errors: errorsRolPermiso },
  } = useForm();

  const columDefs = [
    { headerName: "Nombre", field: "nombre_rol", minWidth: 150, maxWidth: 220 },
    {
      headerName: "Descripcion",
      field: "descripcion_rol",
      minWidth: 200,
      maxWidth: 450,
    },
  ];

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  const handleCreateRole = () => {
    setisCreate(true);
    dispatch(activeModalAction());
  };

  const onSubmitRolPermiso = async (data) => {
    try {
      const rolCreate = {
        nombre_rol: data.nombreRol,
        descripcion_rol: data.descripcionRol,
        Rol_sistema: false,
      };

      const { data: dataRol } = await clienteAxios.post(
        "roles/create/",
        rolCreate,
        config
      );

      const permisosRol = getPermisosRolPost(dataRol.id_rol, data.permisosRol);
      await clienteAxios.post(
        "permisos/permisos-modulos-rol/create/",
        permisosRol,
        config
      );

      dispatch(desactiveModalAction());

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Rol creado",
        showConfirmButton: false,
        timer: 1500,
      });

      getRolesList();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitByName = async (data) => {
    try {
      if (data.nombreRol) {
        const { data: dataByName } = await clienteAxios.get(
          `roles/get-by-name/?keyword=${data.nombreRol}`,
          config
        );
        setRoles(dataByName);
      } else {
        getRolesList()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form onSubmit={handleSubmit(onSubmitByName)}>
            <div className="row">
              <h3 className="mt-3 mb-0 ms-3 fw-light text-terciary">
                Administrador De Roles
              </h3>
              <Subtitle title="Informacion general" mt={3} />
              <div className="d-flex align-items-end gap-4 mb-0 mt-4 ms-3">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">Nombre del rol</label>
                  <input
                    type="text"
                    className="form-control border rounded-pill px-3"
                    {...register("nombreRol")}
                  />
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
                    overlayNoRowsTemplate={
                      '<span>No se encontraron roles</span>'
                    }
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
            </div>
          </form>
          <CalendarModal>
            <form
              className="row p-3"
              onSubmit={handleSubmitRolPermiso(onSubmitRolPermiso)}
            >
              <h4>{isCreate ? "Crear Rol" : "Editar Rol"}</h4>
              <hr className="rounded-pill hr-modal" />
              <div className="col-12 col-md-5 mb-3">
                <label>
                  Nombre rol: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control border rounded-pill px-3"
                  {...registerRolPermiso("nombreRol", { required: true })}
                />
                {errorsRolPermiso.nombreRol && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label>
                  Descripción: <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control border rounded-pill px-3"
                  {...registerRolPermiso("descripcionRol", { required: true })}
                />
                {errorsRolPermiso.descripcionRol && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">
                  Permisos - Rol: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="permisosRol"
                  control={controlRolPermiso}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      // defaultValue={[paisesOptions[0], paisesOptions[1]]}
                      options={permisos}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errorsRolPermiso.permisosRol && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
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
                  type="submit"
                  className="btn bg-gradient-primary text-capitalize mt-3 mb-0 rounded-pill"
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
