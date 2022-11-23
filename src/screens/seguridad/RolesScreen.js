import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CalendarModal from "../../components/CalendarModal";
import IconoEditar from "../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
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
  getPermisosAdapterByRolForSelect,
  getPermisosAdapterSelect,
  getPermisosRolPost,
} from "../../adapters/roles.adapters";
import botonBuscar from "../../assets/iconosBotones/buscar.svg"
import botonAgregar from "../../assets/iconosBotones/agregar.svg"

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
  const [formValues, setFormValues] = useState({
    permisosRol: [],
  });

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

  useEffect(() => {
    getRolesPermisos();
  }, []);

  const [isCreate, setisCreate] = useState(null);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const {
    register: registerRolPermiso,
    watch: watchPermiso,
    reset: resetPermiso,
    control: controlRolPermiso,
    handleSubmit: handleSubmitRolPermiso,
    formState: { errors: errorsRolPermiso },
  } = useForm();

  const columDefs = [
    { headerName: "Nombre",
      field: "nombre_rol",
      minWidth: 150,
      maxWidth: 220
    },
    {
      headerName: "Descripción",
      field: "descripcion_rol",
      minWidth: 200,
      maxWidth: 450,
    },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas btn-outline-warning "
            type="button"
            onClick={() => {
              handleOpenEditRol(params.data.id_rol);
            }}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-danger"
            type="button"
            onClick={() => {
              confirmarEliminarRol(params.data.id_rol);
            }}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>
        </div>
      ),
    },
  ];

  const handleOpenEditRol = async (idRol) => {
    try {
      const {
        data: { data },
      } = await clienteAxios.get(
        `permisos/permisos-modulos-rol/get-by-rol/${idRol}/`,
        config
      );

      const { data: dataRol } = await clienteAxios.get(
        `roles/get-by-id/${idRol}/`,
        config
      );

      console.log("data rol", dataRol);

      const dataFormat = getPermisosAdapterByRolForSelect(data);
      // const valuesIndexs = dataFormat.map((value) => value.value);
      // const indexs = getIndexBySelectOptions(valuesIndexs, permisos);
      setFormValues({
        ...formValues,
        permisosRol: dataFormat,
        nombreRol: dataRol.nombre_rol,
        descripcionRol: dataRol.descripcion_rol,
      });
      resetPermiso({
        idRol: idRol,
        permisosRol: dataFormat,
        nombreRol: dataRol.nombre_rol,
        descripcionRol: dataRol.descripcion_rol,
      });
      console.log("dataFormat", dataFormat);
    } catch (err) {
      console.log(err);
    }
    dispatch(activeModalAction());
    setisCreate(null);
    setisCreate("editar");
  };

  const eliminarRol = async (idRol) => {
    try {
      const { data } = await clienteAxios.delete(
        `roles/delete/${idRol}`,
        config
      );

      Swal.fire({
        position: "center",
        icon: "info",
        title: data.detail,
        showConfirmButton: true,
        confirmButtonText: "Continuar",
      });
    } catch (err) {
      console.log(err);
    }
    getRolesPermisos();
  };

  const confirmarEliminarRol = async (idRol) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Un rol que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarRol(idRol);
      }
    });
  };

  const handleCloseModal = () => {
    setisCreate(null);
    resetPermiso({
      nombreRol: "",
      descripcionRol: "",
      permisosRol: [],
    });
    setFormValues({ permisosRol: [] });
    dispatch(desactiveModalAction());
  };

  const handleCreateRole = () => {
    setisCreate("crear");
    dispatch(activeModalAction());
  };

  // const getIndexBySelectOptions = (valuesSelect, selectOptions) => {
  //   const idResult = [];
  //   const idSelectOptions = selectOptions.map((option) => option.value);
  //   idSelectOptions.forEach((optionId, index) => {
  //     if (valuesSelect.includes(optionId)) {
  //       idResult.push(index);
  //     }
  //   });
  //   return idResult;
  // };

  const onSubmitRolPermiso = async (data) => {
    console.log("datos comprobacion submit", data.idRol);
    if (isCreate === "crear") {
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

        const permisosRol = getPermisosRolPost(
          dataRol.id_rol,
          data.permisosRol
        );
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
    } else {
      const datosEditRol = {
        nombre_rol: data.nombreRol,
        descripcion_rol: data.descripcionRol,
      };
      try {
        const { data: responseEditRol } = await clienteAxios.put(
          `/roles/update/${data.idRol}/`,
          datosEditRol,
          config
        );
        console.log(responseEditRol);

        const datosEditPermisosRol = getPermisosRolPost(
          data.idRol,
          formValues.permisosRol
        );
        const dataFormatRequestRol = datosEditPermisosRol.map((permiso) => ({
          id_permisos_modulo: permiso.id_permiso_modulo,
        }));
        console.log(dataFormatRequestRol);
        const { data: responseEditPermisosRol } = await clienteAxios.put(
          `permisos/permisos-modulos-rol/update/${data.idRol}/`,
          dataFormatRequestRol,
          config
        );
        console.log(responseEditPermisosRol);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos del rol actualizados correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Algo pasó consulta con tu developer de confianza",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      dispatch(desactiveModalAction())
      getRolesList()
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
        getRolesList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getDefaultPermisions = (permisosRol) => {
  //   const defaultValues = permisosRol.map((permiso) => permisos[permiso]);
  //   console.log("default values", defaultValues);
  //   return defaultValues;
  // };

  // const getDefaultNombreRol = () => {
  //   return formValues.nombreRol;
  // };

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form onSubmit={handleSubmit(onSubmitByName)}>
            <div className="row">
              <h3 className="mt-3 mb-0 ms-3 fw-light text-terciary">
                Administrador de roles
              </h3>
              <Subtitle title="Información general" mt={3} />
              <div className="d-flex align-items-center gap-4 mb-0 mt-4 ms-3">
                <div className="col-8 col-md-3 mb-3">
                  <label className="text-terciary">Nombre del rol</label>
                  <input
                    type="text"
                    className="form-control border rounded-pill px-3 border-terciary"
                    {...register("nombreRol")}
                  />
                </div>
                <button
                  type="submit"
                  className="mb-0 mt-2 btn-image text-capitalize bg-white border boder-none"
                >
                  <img src={botonBuscar} alt="" />
                </button>
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
                      "<span>No se encontraron roles</span>"
                    }
                  ></AgGridReact>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-2">
                <button
                  type="button"
                  className="mb-0 btn-image text-capitalize bg-white border boder-none"
                  onClick={handleCreateRole}
                >
                  <img src={botonAgregar} alt="" />
                </button>
              </div>
            </div>
          </form>
          {isCreate === "crear" && (
            <CalendarModal>
              <form
                className="row p-3"
                onSubmit={handleSubmitRolPermiso(onSubmitRolPermiso)}
              >
                <h4>{isCreate === "crear" ? "Crear rol" : "Editar rol"}</h4>
                <hr className="rounded-pill hr-modal" />
                <div className="col-12 col-md-5 mb-3">
                  <label>
                    Nombre rol: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border rounded-pill px-3 border-terciary"
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
                    className="form-control border rounded-pill px-3 border-terciary"
                    {...registerRolPermiso("descripcionRol", {
                      required: true,
                    })}
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
                        // defaultValue={getDefaultPermisions}
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
          )}
          {isCreate === "editar" && (
            <CalendarModal>
              <form
                className="row p-3"
                onSubmit={handleSubmitRolPermiso(onSubmitRolPermiso)}
              >
                <h4>{isCreate === "crear" ? "Crear Rol" : "Editar Rol"}</h4>
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
                    {...registerRolPermiso("descripcionRol", {
                      required: true,
                    })}
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
                        value={formValues.permisosRol}
                        onChange={(e) => {
                          resetPermiso({
                            ...watchPermiso(),
                            permisosRol: e,
                          });
                          setFormValues({
                            ...formValues,
                            permisosRol: e,
                          });
                        }}
                        // defaultValue={() =>
                        //   getDefaultPermisions(formValues.permisosRol)
                        // }
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
          )}
        </div>
      </div>
    </div>
  );
};
export default RolesScreen;
