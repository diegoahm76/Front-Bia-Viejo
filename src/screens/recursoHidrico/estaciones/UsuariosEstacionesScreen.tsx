import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import IconoEliminarBia from "../../../assets/iconosBotones/eliminar.svg";
import IconoEditarBia from "../../../assets/iconosBotones/editar.svg";
import IconoNuevoBia from "../../../assets/iconosBotones/nuevo.svg";
import Select from "react-select";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
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
  obtenerNombreEstacion,
} from "../../../store/slices/usuarioEstaciones/indexUsuarioEstaciones";
import EliminarUsuarioModal from "../../../components/EliminarUsuarioModal";
import EditarUsuarioModal from "../../../components/EditarUsuarioModal";
import Subtitle from "../../../components/Subtitle";
import ExportExcelFile from "../../../components/ExportExcelFile";

const UsuariosEstacionesScreen = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEditarActive, setIsModalEditarActive] = useState(false);
  const [estacionesOptions, setEstacionesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataReportes, setDataReportes] = useState(null);
  const [isModalEliminarActive, setIsModalEliminarActive] = useState(false);
  const [selectedEstacion, setSelectedEstacion] = useState<string | undefined>(
    undefined
  );

  const dispatch = useAppDispatch();
  const usuarios = useAppSelector((state) => state.usuarioEstaciones);
  useEffect(() => {
    obtenerTodosUsuarios(dispatch);
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
  const columnDefs = [
    {
      headerName: "Estacion",
      field: "t001Estaciones",
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
  const rowDataGuayuriba =[
    {
      t001Estaciones: "Guayuriba",
      t005identificacion: 11221560,
      t005nombre: "Juan ",
      t005apellido: "Lopez",
      t005correo: "Lopez@macarenia.com",
      t005numeroCelular: 3210086153,
    }, 
    {
      t001Estaciones: "Guayuriba",
      t005identificacion: 8946,
      t005nombre: "Liam ",
      t005apellido: "Torres",
      t005correo: "lTorres@macarenia.com",
      t005numeroCelular: 55552000,
    },
    {
      t001Estaciones: "Guayuriba",
      t005identificacion: 8955,
      t005nombre: "Diego ",
      t005apellido: "Diez",
      t005correo: "Diez@macarenia.com",
      t005numeroCelular: 568566,
    },
    {
      t001Estaciones: "Guayuriba",
      t005identificacion: 789546,
      t005nombre: "Lady ",
      t005apellido: "Alvarez",
      t005correo: "Alvarez@macarenia.com",
      t005numeroCelular: 7852,
    },
    {
      t001Estaciones: "Guayuriba",
      t005identificacion: 8955,
      t005nombre: "Felipe ",
      t005apellido: "Duran",
      t005correo: "Felipe@macarenia.com",
      t005numeroCelular: 568566,
    },
    {
      t001Estaciones: "Guayuriba",
      t005identificacion: 895546,
      t005nombre: "Samuel ",
      t005apellido: "Garzon",
      t005correo: "Samuel@macarenia.com",
      t005numeroCelular: 858885,
    },
  ]
  const rowDataOcca =[
    {
      t001Estaciones: "Occa",
      t005identificacion: 405664,
      t005nombre: "Omar ",
      t005apellido: "Perez",
      t005correo: "Perez@macarenia.com",
      t005numeroCelular: 852200,
    },
    {
      t001Estaciones: "Occa",
      t005identificacion: 405664,
      t005nombre: "Brayan ",
      t005apellido: "Ruiz",
      t005correo: "Ruiz@macarenia.com",
      t005numeroCelular: 8582200,
    },
    {
      t001Estaciones: "Occa",
      t005identificacion: 45752,
      t005nombre: "Francisco ",
      t005apellido: "Moscoso",
      t005correo: "Moscoso@macarenia.com",
      t005numeroCelular: 8582200,
    },
    {
      t001Estaciones: "Occa",
      t005identificacion: 45752,
      t005nombre: "Wendy ",
      t005apellido: "Amaya",
      t005correo: "Amaya@macarenia.com",
      t005numeroCelular: 59459632,
    },
    {
      t001Estaciones: "Occa",
      t005identificacion: 1052752,
      t005nombre: "Felipe  ",
      t005apellido: "Felipe",
      t005correo: "Moscoso@macarenia.com",
      t005numeroCelular: 6582200,
    },
    {
      t001Estaciones: "Occa",
      t005identificacion: 1076752,
      t005nombre: "Daniela ",
      t005apellido: "Urrea",
      t005correo: "Urrea@macarenia.com",
      t005numeroCelular: 444459632,
    },
  ]
  const rowDataGaitan =[
    {
      t001Estaciones: "Puerto Gaitan",
      t005identificacion: 5651352,
      t005nombre: "Juan ",
      t005apellido: "Paez",
      t005correo: "Juan@macarenia.com",
      t005numeroCelular: 446512,
    },
    {
      t001Estaciones: "Puerto Gaitan",
      t005identificacion: 854785,
      t005nombre: "Dolman ",
      t005apellido: "Rodriguez",
      t005correo: "Rodriguez@macarenia.com",
      t005numeroCelular: 44655512,
    },
    {
      t001Estaciones: "Puerto Gaitan",
      t005identificacion: 7202352,
      t005nombre: "Augusto ",
      t005apellido: "Gaitan",
      t005correo: "Gaitan@macarenia.com",
      t005numeroCelular: 7776512,
    },
    {
      t001Estaciones: "Puerto Gaitan",
      t005identificacion: 123456,
      t005nombre: "Edwar ",
      t005apellido: "Velasquez",
      t005correo: "Velasquez@macarenia.com",
      t005numeroCelular: 11155512,
    },
  ]
  const rowDataGuamal = [
    {
      t001Estaciones: "Guamal",
      t005identificacion: 1076670521,
      t005nombre: "Fernando ",
      t005apellido: "Torres",
      t005correo: "sasto@macarenia.com",
      t005numeroCelular: 3107505784,
    },
    {
      t001Estaciones: "Guamal",
      t005identificacion: 552218,
      t005nombre: "Pedro ",
      t005apellido: "Torres",
      t005correo: "Pedro@macarenia.com",
      t005numeroCelular: 3107784,
    },
    {
      t001Estaciones: "Guamal",
      t005identificacion: 125200521,
      t005nombre: "Sebastian ",
      t005apellido: "Martinez",
      t005correo: "Martinez@macarenia.com",
      t005numeroCelular: 782325,
    },
    {
      t001Estaciones: "Guamal",
      t005identificacion: 552218,
      t005nombre: "Edwin ",
      t005apellido: "Cediel",
      t005correo: "Cediel@macarenia.com",
      t005numeroCelular: 5646834513,
    },
     
  ]
  //Seleccionar estaciones extrayendolas de la base de datos
  // const {
  //   // register: registerFiltrar,
  //   handleSubmit: handleSubmitFiltrar,
  //   control: controlFiltrar,
  //   // reset: resetFiltrar,
  //   formState: { errors: errorsFiltrar },
  // } = useForm();

  // useEffect(() => {
  //   const getDataInitial = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await clienteEstaciones.get("Estaciones");
  //       const estacionesMaped = data.map((estacion) => ({
  //         label: estacion.t001nombre,
  //         value: estacion.objectid,
  //       }));
  //       setEstacionesOptions(estacionesMaped);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   };
  //   getDataInitial();
  // }, []);


  // const onSubmitFiltrar = async (data) => {
  //   try {
  //     setLoading(true);
  //     const { data: reportesData } = await clienteEstaciones.get(
  //       `Usuarios/OBJECTID/${data.estacion?.value}`
  //     );
  //     const reportesDataMaped = reportesData.map((reporteData) => ({
  //       //t001Estaciones: reporteData.t001Estaciones.t001nombre,
  //       t005identificacion: reporteData.t005identificacion,
  //       t005nombre: reporteData.t005nombre,
  //       t005apellido: reporteData.t005apellido,
  //       t005correo: reporteData.t005correo,
  //       t005numeroCelular: reporteData.t005numeroCelular,
  //     }));
  //     setDataReportes(reportesDataMaped);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };
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
  const opcEstaciones = [
    { label: "Estación Guayuriba", value: "Guayuriba" },
    { label: "Estación Ocoa", value: "Ocoa" },
    { label: "Estación Puerto Gaitan", value: "Puerto Gaitan" },
    { label: "Estación Guamal", value: "Guamal" },
  ];

  const confirmarEliminarUsuario = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Va a eliminar un usuario",
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
    //     <div className="row min-vh-100">
    //       <div className=" col-12 mx-auto">
    //         <div className="multisteps-form__content">
    //           <div
    //             className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
    //             data-animation="FadeIn"
    //           >
    //             <h3 className="mt-3 ms-3 mb-3 fw-light text-terciary">Partes Interesadas</h3>
    //             <Subtitle title={"Por favor seleccione la estación que desea visualizar"} mt={0} mb={3} />
    //             <form className="row" onSubmit={handleSubmitFiltrar(onSubmitFiltrar)}>
    //               <div className="col-12 col-sm-3">
    //                 <label className="form-label">
    //                   Estación: <span className="text-danger">*</span>
    //                 </label>
    //                 <Controller
    //                   name="estacion"
    //                   control={controlFiltrar}
    //                   rules={{
    //                     required: true,
    //                   }}
    //                   render={({ field }) => (
    //                     <Select
    //                       {...field}
    //                       options={estacionesOptions}
    //                       placeholder="Seleccionar"
    //                     />
    //                   )}
    //                 />
    //               </div>
    //               <div className="col-12 col-md-3 mt-1">
    //                 <div className="d-grid gap-2 d-flex">
    //                   <button
    //                     type="submit"
    //                     className="btn text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
    //                     disabled={loading}
    //                   >

    //                     {loading ? (
    //                       <>
    //                         <span
    //                           className="spinner-border spinner-border-sm me-1"
    //                           role="status"
    //                           aria-hidden="true"
    //                         ></span>
    //                         Cargando...
    //                       </>
    //                     ) : (
    //                       ""
    //                     )}
    //                     <i className="fa-solid fa-magnifying-glass fs-3"></i>
    //                   </button>
    //                 </div>
    //               </div>
    //             </form>
    //             {/* {dataReportes && ( */}
    //               <div className="multisteps-form__content">
    //                 <div>
    //                   <div
    //                     className="ag-theme-alpine mt-auto mb-8 px-4"
    //                     style={{ height: "470px" }}
    //                   >
    //                     <Subtitle title={"Información General"} mt={0} mb={3} />
    //                     <button
    //                       className="btn btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-3"
    //                       onClick={() => setIsModalActive(!isModalActive)}
    //                     >
    //                       <i className="fa-regular fa-plus fs-3"></i>
    //                     </button>
    //                     <AgGridReact
    //                       columnDefs={columnDefs}
    //                       rowData={dataReportes}
    //                       defaultColDef={defaultColDef}
    //                     ></AgGridReact>
    //                   </div>
    //                 </div>
    //               </div>
    //             {/* )} */}
    //           </div>
    //         </div>
    //       </div>
    //       <NuevoUsuarioModal
    //         setIsModalActive={setIsModalActive}
    //         isModalActive={isModalActive}
    //       />
    //       <EditarUsuarioModal
    //         setIsModalActive={setIsModalEditarActive}
    //         isModalActive={isModalEditarActive}
    //       />
    //     </div>
    //   );
    // };

    ////////////////////////


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
                              rowData={rowDataGuayuriba as any}
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
                              rowData={rowDataOcca as any}
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
                              rowData={rowDataGaitan as any}
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
                              rowData={rowDataGuamal as any}
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
