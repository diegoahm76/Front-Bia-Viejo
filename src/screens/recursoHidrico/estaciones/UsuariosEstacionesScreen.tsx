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
  //Seleccionar estaciones extrayendolas de la base de datos
  const {
    // register: registerFiltrar,
    handleSubmit: handleSubmitFiltrar,
    control: controlFiltrar,
    // reset: resetFiltrar,
    formState: { errors: errorsFiltrar },
  } = useForm();

  useEffect(() => {
    const getDataInitial = async () => {
      try {
        setLoading(true);
        const { data } = await clienteEstaciones.get("Estaciones");
        const estacionesMaped = data.map((estacion) => ({
          label: estacion.t001nombre,
          value: estacion.objectid,
        }));
        setEstacionesOptions(estacionesMaped);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getDataInitial();
  }, []);


  const onSubmitFiltrar = async (data) => {
    try {
      setLoading(true);
      const { data: reportesData } = await clienteEstaciones.get(
        `Usuarios/OBJECTID/${data.estacion?.value}`
      );
      const reportesDataMaped = reportesData.map((reporteData) => ({
        //t001Estaciones: reporteData.t001Estaciones.t001nombre,
        t005identificacion: reporteData.t005identificacion,
        t005nombre: reporteData.t005nombre,
        t005apellido: reporteData.t005apellido,
        t005correo: reporteData.t005correo,
        t005numeroCelular: reporteData.t005numeroCelular,
      }));
      setDataReportes(reportesDataMaped);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
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
      <div className=" col-12 mx-auto">
        <div className="multisteps-form__content">
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <h3 className="mt-3 ms-3 mb-3 fw-light text-terciary">Partes Interesadas</h3>
            <Subtitle title={"Por favor seleccione la estación que desea visualizar"} mt={0} mb={3} />
            <form className="row" onSubmit={handleSubmitFiltrar(onSubmitFiltrar)}>
              <div className="col-12 col-sm-3">
                <label className="form-label">
                  Estación: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="estacion"
                  control={controlFiltrar}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={estacionesOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-3 mt-1">
                <div className="d-grid gap-2 d-flex">
                  <button
                    type="submit"
                    className="btn text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    disabled={loading}
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
                      ""
                    )}
                    <i className="fa-solid fa-magnifying-glass fs-3"></i>
                  </button>
                </div>
              </div>
            </form>
            {dataReportes && (
              <div className="multisteps-form__content">
                <div>
                  <div
                    className="ag-theme-alpine mt-auto mb-8 px-4"
                    style={{ height: "470px" }}
                  >
                    <Subtitle title={"Información General"} mt={0} mb={3} />
                    <button
                      className="btn btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-3"
                      onClick={() => setIsModalActive(!isModalActive)}
                    >
                      <i className="fa-regular fa-plus fs-3"></i>
                    </button>
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={dataReportes}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            )}
          </div>
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
