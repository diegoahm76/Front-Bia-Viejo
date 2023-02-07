import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import IconoEliminarBia from "../../../assets/iconosBotones/eliminar.svg";
import IconoEditarBia from "../../../assets/iconosBotones/editar.svg";
import IconoNuevoBia from "../../../assets/iconosBotones/nuevo.svg";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  obtenerUsuarioEditarAction,
  obtenerUsuariosAction,
  obtenerUsusarioEliminarAction,
} from "../../../actions/estacionActions";
import NuevoUsuarioModal from "../../../components/NuevoUsuarioModal";
import {
  obtenerTodosUsuarios,
  obtenerEstacionesNombre,
} from "../../../store/slices/usuarioEstaciones/indexUsuarioEstaciones";
import EliminarUsuarioModal from "../../../components/EliminarUsuarioModal";
import EditarUsuarioModal from "../../../components/EditarUsuarioModal";
import Subtitle from "../../../components/Subtitle";
import ExportExcelFile from "../../../components/ExportExcelFile";

const UsuariosEstacionesScreen = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEditarActive, setIsModalEditarActive] = useState(false);
  const [isModalEliminarActive, setIsModalEliminarActive] = useState(false);
  const [selectedEstacion, setSelectedEstacion] = useState<string | undefined>(
    undefined
  );

  const dispatch = useAppDispatch();

  const usuarios = useAppSelector((state) => state.usuarioEstaciones);
  useEffect(() => {
    obtenerTodosUsuarios(dispatch);
  }, []);
  
  const Guayuiria= "Occa"
  const usuariosFiltro = useAppSelector((state)=> state.usuarioEstaciones);

  useEffect(() => {
    obtenerEstacionesNombre(dispatch);
  }, []);
  

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [selectEstacion, selecEstacion_Screen] = useState({
    opcEstaciones: "",
  });
  const onSubmit = (data) => {
    selecEstacion_Screen({
      ...selectEstacion,
      opcEstaciones: data.opcEstaciones?.value || "",
    });
    console.log(selectEstacion.opcEstaciones);
  };
  const handleChange = (value) => {
    dispatch(obtenerEstacionesNombre(value));

  };
  const opcEstaciones = [
    { label: "Estación Guayuriba", value: "Guayuriba" },
    { label: "Estación Ocoa", value: "Ocoa" },
    { label: "Estación Puerto Gaitan", value: "Puerto Gaitan" },
    { label: "Estación Guamal", value: "Guamal" },
  ];


  const columnDefs = [
    {
      headerName: "Estacion",
      field: "t001Estaciones.t001nombre",
      minWidth: 140,
    },
    {
      headerName: "Identificacion",
      field: "t005identificacion",
      minWidth: 140,
    },
    { headerName: "Nombre", field: "t005nombre", minWidth: 140 },
    { headerName: "Apellido", field: "t005apellido", minWidth: 140 },
    { headerName: "Correo", field: "t005correo", minWidth: 140 },
    { headerName: "Celular", field: "t005numeroCelular", minWidth: 140 },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas"
            type="button"
            onClick={() => {
              dispatch(obtenerUsuarioEditarAction(params.data));
              setIsModalEditarActive(!isModalEditarActive);
            }}
          >
            <img src={IconoEditarBia} alt="editar" title="Editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas"
            type="button"
            onClick={() => confirmarEliminarUsuario(params.data)}
          >
            <img src={IconoEliminarBia} alt="eliminar" title="Eliminar" />
          </button>
        </div>
      ),
    },
  ];
  const confirmarEliminarUsuario = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Un usuario que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarUsuarioModal(id);
      }
    });
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-2 mb-0">Partes Interesadas</h3>
            <Subtitle
              title="Por favor seleccione la estación que desea visualizar"
              mt={3}
            />
            <div className="row">
              <div className="col-12 col-md-3 ">
                <label className=" form-control ms-0"></label>

                <Controller
                  name="opcDashboard"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(e) =>
                        selecEstacion_Screen({
                          ...selectEstacion,
                          opcEstaciones: e.value,
                        })
                      }
                      options={opcEstaciones}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>

            {selectEstacion.opcEstaciones === "Guayuriba" ? (
              <div className="row min-vh-100">
                <div className="col-lg-12 col-md-12 col-12 mx-auto">
                  <div
                    className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                    data-animation="FadeIn"
                  >
                    <Subtitle
                      title="Informacion de general Estación Guayuriba"
                      mt={3}
                    />

                    <div>
                      <div className="col-12-md-3 ">
                        <button
                          className="btn btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-3"
                          onClick={() => setIsModalActive(!isModalActive)}
                        >
                          <img src={IconoNuevoBia} alt="" title="Nuevo" />
                        </button>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="multisteps-form__content">
                        <div>
                          <div
                            className="ag-theme-alpine mt-auto mb-3 px-4"
                            style={{ height: "470px" }}
                          >
                            <AgGridReact
                              columnDefs={columnDefs}
                              rowData={usuariosFiltro as any}
                              defaultColDef={defaultColDef}
                            ></AgGridReact>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectEstacion.opcEstaciones === "Ocoa" ? (
              <div className="row min-vh-100">
                <div className="col-lg-12 col-md-12 col-12 mx-auto">
                  <div
                    className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                    data-animation="FadeIn"
                  >
                    <Subtitle
                      title="Informacion de general Estación Ocoa"
                      mt={3}
                    />

                    <div>
                      <div className="col-12-md-3 ">
                        <button
                          className="btn btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-3"
                          onClick={() => setIsModalActive(!isModalActive)}
                        >
                          <img src={IconoNuevoBia} alt="" title="Nuevo" />
                        </button>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="multisteps-form__content">
                        <div>
                          <div
                            className="ag-theme-alpine mt-auto mb-3 px-4"
                            style={{ height: "470px" }}
                          >
                            <AgGridReact
                              columnDefs={columnDefs}
                              rowData={usuarios as any}
                              defaultColDef={defaultColDef}
                            ></AgGridReact>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {selectEstacion.opcEstaciones === "Puerto Gaitan" ? (
              <div className="row min-vh-100">
                <div className="col-lg-12 col-md-12 col-12 mx-auto">
                  <div
                    className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                    data-animation="FadeIn"
                  >
                    <Subtitle
                      title="Informacion de general Estación Puerto Gaitan"
                      mt={3}
                    />

                    <div>
                      <div className="col-12-md-3 ">
                        <button
                          className="btn btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-3"
                          onClick={() => setIsModalActive(!isModalActive)}
                        >
                          <img src={IconoNuevoBia} alt="" title="Nuevo" />
                        </button>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="multisteps-form__content">
                        <div>
                          <div
                            className="ag-theme-alpine mt-auto mb-3 px-4"
                            style={{ height: "470px" }}
                          >
                            <AgGridReact
                              columnDefs={columnDefs}
                              rowData={usuarios as any}
                              defaultColDef={defaultColDef}
                            ></AgGridReact>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {selectEstacion.opcEstaciones === "Guamal" ? (
              <div className="row min-vh-100">
                <div className="col-lg-12 col-md-12 col-12 mx-auto">
                  <div
                    className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                    data-animation="FadeIn"
                  >
                    <Subtitle
                      title="Informacion de general Estación Guamal"
                      mt={3}
                    />

                    <div>
                      <div className="col-12-md-3 ">
                        <button
                          className="btn btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-3"
                          onClick={() => setIsModalActive(!isModalActive)}
                        >
                          <img src={IconoNuevoBia} alt="" title="Nuevo" />
                        </button>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="multisteps-form__content">
                        <div>
                          <div
                            className="ag-theme-alpine mt-auto mb-3 px-4"
                            style={{ height: "470px" }}
                          >
                            <AgGridReact
                              columnDefs={columnDefs}
                              rowData={usuarios as any}
                              defaultColDef={defaultColDef}
                            ></AgGridReact>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
      <NuevoUsuarioModal
        setIsModalActive={setIsModalActive}
        isModalActive={isModalActive}
      />
      <EditarUsuarioModal
        setIsModalActive={setIsModalEditarActive}
        isModalActive={isModalEditarActive}
      />
    </div>
  );
};
export default UsuariosEstacionesScreen;
