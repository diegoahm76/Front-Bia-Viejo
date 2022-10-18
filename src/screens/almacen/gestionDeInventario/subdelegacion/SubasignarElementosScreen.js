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


const SubasignarElementosScreen = () => {

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

  const { register, control, handleSubmit } = useForm();

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

  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
  const onGridReady = (params) => {
    gridApi = params.api
  }

  let gridApi
  const rowData = [
    { CO: 160036, NE: "Computador", ID: "000013", MR: "Lenovo", SL: "nd7nyrb", SUB: "" },
    { CO: 160036, NE: "Computador", ID: "Accer", MR: "g3ub3h", SL: "00022", SUB: "" },
    { CO: 160036, NE: "Computador", ID: "Accer", MR: "g3ub3h", SL: "00022", SUB: "" },
    { CO: 160036, NE: "Computador", ID: "Accer", MR: "g3ub3h", SL: "00022", SUB: "" },
    { CO: 160036, NE: "Computador", ID: "Accer", MR: "g3ub3h", SL: "00022", SUB: "" },

  ];
  const columnDefs = [
    { headerName: "Código", field: "CO", minWidth: 150 },
    { headerName: "Nombre", field: "NE", minWidth: 150 },
    { headerName: "ID único", field: "ID", minWidth: 150 },
    { headerName: "Marca", field: "MR", minWidth: 150 },
    { headerName: "Serial", field: "SL", minWidth: 150 },
    {
      headerName: "Sub Asignar", field: "SUB", minWidth: 150,
      cellRendererFramework: (params) => (
        <div className="form-check form-switch d-flex align-items-center mt-3">
          <input
            className="form-check"
            type="checkbox"
            id="rememberMe"
          />
        </div>

      ),
    },
  ]

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Subasignar Elementos
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Responsable</n>
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
            </div>
            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Operario</n>
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

            

            <div className="row my-3">
              <div className="ag-theme-alpine mt-auto mb-4 px-4" style={{ height: '275px' }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                >
                </AgGridReact>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-gradient-primary me-md-2"
                type="button"
                title="Send"
              >
                Limpiar
              </button>
              <button
                className="btn bg-gradient-primary me-md-2"
                type="button"
                title="Send"
              >
                Guardar
              </button>
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
    // </div>
  );
};
export default SubasignarElementosScreen;
