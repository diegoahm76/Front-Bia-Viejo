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

  const { register, control, handleSubmit, formState: { errors }, } = useForm();

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
  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
  const onGridReady = (params) => {
    gridApi = params.api
  }

  let gridApi
  const rowData = [
    { CO: 16002, NE: "Computador", MR: "Accer", SL: "g3ub3h", ID: "00022", SUB: "Alejandro Pineda", GRU: "Almacén", FECH: "00/00/0000" },
    { CO: 16002, NE: "Computador", MR: "Accer", SL: "g3ub3h", ID: "00022", SUB: "Alejandro Pineda", GRU: "Almacén", FECH: "00/00/0000" },
    { CO: 16002, NE: "Computador", MR: "Accer", SL: "g3ub3h", ID: "00022", SUB: "Alejandro Pineda", GRU: "Almacén", FECH: "00/00/0000" },
    { CO: 16002, NE: "Computador", MR: "Accer", SL: "g3ub3h", ID: "00022", SUB: "Alejandro Pineda", GRU: "Almacén", FECH: "00/00/0000" },
    { CO: 16002, NE: "Computador", MR: "Accer", SL: "g3ub3h", ID: "00022", SUB: "Alejandro Pineda", GRU: "Almacén", FECH: "00/00/0000" },

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


  ]

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Busqueda de activos a subdelegados
        </h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h5 className="font-weight-bolder">Activos</h5>
            <div className="multisteps-form__content">
              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center">
                  <n>Nombre del responsable</n>
                </label>
                <div className="col-12 col-sm-4">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Tipo de documento{" "}
                    <div className="col-12 ">
                      <Controller
                        name="tipoDocumento2"
                        control={control} rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={options}
                            placeholder="Seleccionar"
                          />
                        )}
                      /></div>
                  </label>

                </div>
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="numero cedula"
                      {...register("numeroCedula")}
                    />
                    <label className="ms-2">Número de documento</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nombre completo"
                      disabled="true"
                    />
                    <label className="ms-2">Nombre</label>
                  </div>
                </div>
                <div className="col-12 col-sm-12 d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn bg-gradient-primary mb-0 text-capitalize my-2"
                    type="button"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaPersonalIsActive(true)}
                  >
                    Buscar personal
                  </button>
                </div>
              </div>

              <div className="row mt-3">
                <div className="ag-theme-alpine my-3 px-auto" style={{ height: '275px' }}>
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  >
                  </AgGridReact>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-auto">
                <button
                  className="btn bg-gradient-danger "
                  type="button"
                  title="Send"
                >
                  Salir
                </button>
              </div>
            </div>

          </form>
          <BusquedaDePersonalModal
            isModalActive={busquedaPersonalIsActive}
            setIsModalActive={setBusquedaPersonalIsActive}
          />

          <BusquedaArticuloModal
            isModalActive={busquedaArticuloIsActive}
            setIsModalActive={setBusquedaArticuloIsActive}
          />
        </div >
      </div >
  );
};
export default BusquedaActivosSubdelegadosScreen;
