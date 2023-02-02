import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import IconoEliminarBia from "../../../assets/iconosBotones/eliminar.svg";
import IconoEditarBia from "../../../assets/iconosBotones/editar.svg";
import IconoNuevoBia from "../../../assets/iconosBotones/nuevo.svg";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { Controller, useForm } from "react-hook-form";
import {
  obtenerUsuarioEditarAction,
  obtenerUsuariosAction,
  obtenerUsusarioEliminarAction,
} from "../../../actions/estacionActions";
import NuevoUsuarioModal from "../../../components/NuevoUsuarioModal";
import { obtenerTodosUsuarios } from "../../../store/slices/usuarioEstaciones/indexUsuarioEstaciones";
import EliminarUsuarioModal from "../../../components/EliminarUsuarioModal";
import EditarUsuarioModal from "../../../components/EditarUsuarioModal";
import Subtitle from "../../../components/Subtitle";
import ExportExcelFile from "../../../components/ExportExcelFile";

const UsuariosEstacionesScreen = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEditarActive, setIsModalEditarActive] = useState(false);
  const [isModalEliminarActive, setIsModalEliminarActive] = useState(false);

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

  const dispatch = useAppDispatch();

  const usuarios = useAppSelector((state) => state.usuarioEstaciones);

  const onSubmit = (data) => {
    selecEstacion_Screen({
      ...selectEstacion,
      opcEstaciones: data.opcEstaciones?.value || "",
    });
    console.log(selectEstacion.opcEstaciones);
  };
  const opcEstaciones = [
    { label: "Estación Guayuriba", value: "GUAY" },
    { label: "Estación Ocoa", value: "OC" },
    { label: "Estación Puerto Gaitan", value: "PTOGA" },
    { label: "Estación Guamal", value: "GUAM" },
  ];

  const columnDefs = [
    {
      headerName: "Estacion",
      field: "t001Estaciones.t001nombre",
      minWidth: 140,
    },
    { headerName: "Identificacion", field: "objectid", minWidth: 140 },
    { headerName: "Nombre", field: "t005nombre", minWidth: 140 },
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
              // dispatch(obtenerUsuarioEditarAction(params.data));
              //setIsModalEditarActive(!isModalEditarActive);
            }}
          >
            <img src={IconoEditarBia} alt="editar" title="Editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas"
            type="button"
            onClick={() => {
              // dispatch(obtenerUsusarioEliminarAction(params.data));
              //setIsModalEliminarActive(!isModalActive);
            }}
          >
            <img src={IconoEliminarBia} alt="eliminar" title="Eliminar" />
          </button>
        </div>
      ),
    },
  ];
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

            {selectEstacion.opcEstaciones === "GUAY" ? (
              <div className="row min-vh-100">
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
            ) : (
              ""
            )}

            {selectEstacion.opcEstaciones === "OC" ? (
              <div>
                <h1>Hola OC</h1>
              </div>
            ) : (
              ""
            )}
            {selectEstacion.opcEstaciones === "PTOGA" ? (
              <div>
                <h1>Hola PTOGA</h1>
              </div>
            ) : (
              ""
            )}
            {selectEstacion.opcEstaciones === "GUAM" ? (
              <div>
                <h1>Hola GUAM</h1>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default UsuariosEstacionesScreen;
