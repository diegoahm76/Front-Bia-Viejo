import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import BusquedaDePersonalModal from "../../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../../components/BusquedaArticuloModal";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from '../../../../components/Subtitle'

const BusquedaActivosSubdelegadosScreen = () => {
  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);
  const [selecOpciones, setSelecOpciones] = useState({
    tipoDocumento: "",
    numeroCedula: "",
    dependencia: "",
    grupo: "",
    codigoArticulo: "",
    nombreArticulo: "",
  });

  const gridRef = useRef();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      dependencia: data.dependencia?.value,
      tipoDocumento: data.tipoDocumento?.value,
      grupo: data.grupo?.value,
      numeroCedula: data.numeroCedula,
      codigoArticulo: data.codigoArticulo,
      nombreArticulo: data.nombreArticulo,
    });
  };

  const options = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];
  const optionDependencia = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];
  const optionGroup = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];
  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  let gridApi;
  const rowData = [
    {
      CO: 16002,
      NE: "Computador",
      MR: "Accer",
      SL: "g3ub3h",
      ID: "00022",
      SUB: "Alejandro Pineda",
      GRU: "Almacén",
      FECH: "00/00/0000",
    },
    {
      CO: 16002,
      NE: "Computador",
      MR: "Accer",
      SL: "g3ub3h",
      ID: "00022",
      SUB: "Alejandro Pineda",
      GRU: "Almacén",
      FECH: "00/00/0000",
    },
    {
      CO: 16002,
      NE: "Computador",
      MR: "Accer",
      SL: "g3ub3h",
      ID: "00022",
      SUB: "Alejandro Pineda",
      GRU: "Almacén",
      FECH: "00/00/0000",
    },
    {
      CO: 16002,
      NE: "Computador",
      MR: "Accer",
      SL: "g3ub3h",
      ID: "00022",
      SUB: "Alejandro Pineda",
      GRU: "Almacén",
      FECH: "00/00/0000",
    },
    {
      CO: 16002,
      NE: "Computador",
      MR: "Accer",
      SL: "g3ub3h",
      ID: "00022",
      SUB: "Alejandro Pineda",
      GRU: "Almacén",
      FECH: "00/00/0000",
    },
  ];
  const columnDefs = [
    { headerName: "Código", field: "CO", minWidth: 150 },
    { headerName: "Nombre", field: "NE", minWidth: 150 },
    { headerName: "Marca", field: "MR", minWidth: 150 },
    { headerName: "Serial", field: "SL", minWidth: 150 },
    { headerName: "ID único", field: "ID", minWidth: 150 },
    { headerName: "Subdelegado", field: "SUB", minWidth: 150 },
    { headerName: "Grupo", field: "GRU", minWidth: 150 },
    { headerName: "Fecha asignada", field: "FECH", minWidth: 150 },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Busqueda de activos a subdelegados
            </h3>
            <Subtitle title="Activos" mt={3} />
            <div className="col-12 col-md-3 mb-3">
              <Subtitle title="Nombre del responsable" mt={3} />

            </div>
            <MarcaDeAgua1>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                    Tipo de documento{" "}
                  </label>

                  <Controller
                    name="tipoDocumento2"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={options}
                        placeholder="Seleccionar"
                      />
                    )}
                  />

                </div>
                <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                    Número de documento: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="numeroDocumento"
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numeroDocumento", { required: true })}
                  />
                  {errors.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                    Nombre: <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Gina Rodriguez"
                    type="text"
                    disabled="true"
                    className="form-control border border-terciary rounded-pill px-3"
                    />
                </div>
              
                <div className="col-12 col-md-3">
                <button
                  className="btn-min-width border rounded-pill mt-3 px-3 btn bg-gradient-primary"
                  type="submit"
                  onClick={() => setBusquedaPersonalIsActive(true)}
                >
                  Buscar personal
                </button>
              </div>
              </div>

              <div className="row mt-3">
                <div
                  className="ag-theme-alpine mt-auto mb-4 px-4"
                  style={{ height: "275px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-auto">
                <button
                  className="border rounded-pill px-3 btn bg-gradient-danger mb-3 text-capitalize"
                  type="button"
                  title="Send"
                >
                  Salir
                </button>
              </div>

          </MarcaDeAgua1>
        </form>
        <BusquedaDePersonalModal
          isModalActive={busquedaPersonalIsActive}
          setIsModalActive={setBusquedaPersonalIsActive}
        />

        <BusquedaArticuloModal
          isModalActive={busquedaArticuloIsActive}
          setIsModalActive={setBusquedaArticuloIsActive}
        />
      </div>
    </div>
    </div>
  );
};
export default BusquedaActivosSubdelegadosScreen;
