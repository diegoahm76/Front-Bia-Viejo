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


const rowDataInicial = [
  { CO: 9373, NE: "computador", ID: "0003", MR: "Accer", SL: 2342, VO: 1100000, EO: "Bueno", JO: "aa" },
  { CO: 9373, NE: "computador", ID: "0003", MR: "Accer", SL: 2342, VO: 1100000, EO: "Bueno", JO: "aa" },
  { CO: 9373, NE: "computador", ID: "0003", MR: "Accer", SL: 2342, VO: 1100000, EO: "Bueno", JO: "aa" },

];


const options = [
  { label: "Vivero1", value: "Vivero1" },
  { label: "Vivero2", value: "Vivero2" },
  { label: "Vivero3", value: "Vivero3" },
  { label: "Vivero4", value: "Vivero4" },
  { label: "Vivero5", value: "Vivero5" },
  { label: "Vivero6", value: "Vivero6" },
  { label: "Vivero7", value: "Vivero7" },
];

const optionIdentify = [
  { label: "C.C.", value: "CC" },
  { label: "T.I", value: "TI" },
  { label: "Otro", value: "OT" },

];


function ReasignacionElementosSubAsignadosScreen() {

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

  const { register, control, handleSubmit, formState: { errors }, } = useForm();
  const [rowData] = useState(rowDataInicial)

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


  let gridApi
  const columnDefs = [
    { headerName: "Código", field: "CO", minWidth: 150 },
    { headerName: "Nombre", field: "NE", minWidth: 150 },
    { headerName: "ID unico", field: "ID", minWidth: 150 },
    { headerName: "Marca", field: "MR", minWidth: 150 },
    { headerName: "Serial", field: "SL", minWidth: 150 },
    { headerName: "Valor unitario", field: "VO", minWidth: 150 },
    { headerName: "Estado", field: "EO", minWidth: 150},
    { headerName: "Justificación", field: "JO", minWidth: 150 },
  ]

  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: false, suppressMovable: true }
  const onGridReady = (params) => {
    gridApi = params.api
  }

  const [page, setPage] = useState(1);

  const submit = (data) => {
    if (page === 1) setPage(2);
    if (page === 2) console.log(data);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Sub reasignacion entre contratistas</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="row" hidden={page === 2}>
            <h5 className="font-weight-bolder">Reasignar</h5>

            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Quien entrega</n>
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
                    {...register("nombreCompleto")}
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
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Quien recibe</n>
              </label>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <div className="col-12 ">
                    <Controller
                      name="tipodocumento2"
                      control={control} rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionIdentify}
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
                    {...register("nombreCompleto")}
                    disabled="true"
                  />
                  <label className="ms-2">Nombre </label>
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
            <div className="input-group input-group-dynamic flex-column my-3">
              <label htmlFor="exampleFormControlTextArea">Concepto</label>

              <textarea
                className="multisteps-form__textarea form-control p-0 w-auto ms-1"
                type="number"
                placeholder="Escribe aqui"
                name="nombre"
                {...register("nombre", { required: true })}
              />
            </div>
            {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

          </div>


          <div className="row" hidden={page === 1}>
            <h5 className="font-weight-bolder">Datos de notificacion</h5>
            <div>
              <div className="ag-theme-alpine mt-auto mb-4 px-4" style={{ height: '470px' }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                >

                </AgGridReact>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-4 mt-6">
            <button
              className={`btn bg-gradient-danger mb-0 text-capitalize ${page === 1 && "d-none"}`}
              type="button"
              title="Send"
              onClick={handlePreviousPage}
            >
              {"<< Atrás"}
            </button>
            <button
              className="btn bg-gradient-primary mb-0 text-capitalize"
              type="submit"
              title="Send"
              form="configForm"
            >
              {page === 1 ? "Siguiente >>" : "Actualizar"}
            </button>
            <button
              className="btn bg-gradient-primary mb-0 text-capitalize"
              type="submit"
              title="Send"
              form="configForm"
            >
              {"Guardar"}
            </button>
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
}

export default ReasignacionElementosSubAsignadosScreen;

