import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Subtitle from "../../../components/Subtitle";
registerLocale("es", es);

const ControlSeguimientoDeMaterialVegetalScreen = () => {
  const [selectores, setSelectores] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [formValues, setFormValues] = useState({
    fechaInicio: "",
  });

  const onSubmit = (data) => {
    console.log(data);
    setSelectores({
      seleccioneVivero: data.seleccioneVivero,
      periodoSiembra: data.periodoSiembra,
    });
  };

  const [rowData] = useState([
    {
      tipo: "genesis",
      dosis: " ",
      si: "",
      no: "",
    },
    {
      tipo: "genesis",
      dosis: " ",
      si: "",
      no: "",
    },
    {
      tipo: "genesis",
      dosis: " ",
      si: "",
      no: "",
    },
    {
      tipo: "genesis",
      dosis: " ",
      si: "",
      no: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Tipo", field: "tipo" },
    { headerName: "Dosis", field: "dosis" },
    {
      headerName: "Si",
      field: "si",
      cellRendererFramework: (params) => (
        <div>
          <input type="checkbox"></input>
        </div>
      ),
    },
    {
      headerName: "No",
      field: "no",
      cellRendererFramework: (params) => (
        <div>
          <input type="checkbox"></input>
        </div>
      ),
    },
  ];
  const [rowData2] = useState([
    {
      componentes: "tierra",
      cantidad: " ",
      si: "",
      no: "",
    },
    {
      componentes: "cascarilla",
      cantidad: " ",
      si: "",
      no: "",
    },
    {
      componentes: "arena",
      cantidad: " ",
      si: "",
      no: "",
    },
    {
      componentes: "tierra",
      cantidad: " ",
      si: "",
      no: "",
    },
  ]);

  const columnDefs2 = [
    { headerName: "Componentes", field: "componentes" },
    { headerName: "Cantidad", field: "cantidad" },
    {
      headerName: "Si",
      field: "si",
      cellRendererFramework: (params) => (
        <div>
          <input type="checkbox"></input>
        </div>
      ),
    },
    {
      headerName: "No",
      field: "no",
      cellRendererFramework: (params) => (
        <div>
          <input type="checkbox"></input>
        </div>
      ),
    },
  ];
  const [rowData3] = useState([
    {
      nombre: "Palo cruz",
      nomCientifico: " ",
      altura: "",
      transplante: "",
      mortalidad: "",
    },
    {
      nombre: "Palo cruz",
      nomCientifico: " ",
      altura: "",
      transplante: "",
      mortalidad: "",
    },
    {
      nombre: "Palo cruz",
      nomCientifico: " ",
      altura: "",
      transplante: "",
      mortalidad: "",
    },
    {
      nombre: "Palo cruz",
      nomCientifico: " ",
      altura: "",
      transplante: "",
      mortalidad: "",
    },
  ]);

  const columnDefs3 = [
    { headerName: "Nombre Comun", field: "nombre" },
    { headerName: "Nombre Cientifico", field: "nomCientifico" },
    { headerName: "Altura Promedio", field: "altura" },
    { headerName: "Cantidad Transplante", field: "transplante" },
    { headerName: "Mortalidad", field: "mortalidad" },
  ];
  const optionsSeleccioneVivero = [
    { label: "Villavicencio", value: "V" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "Mapiripan", value: "M" },
    { label: "La Macarena", value: "LM" },
    { label: "San Juan de Arama", value: "SJA" },
    { label: "Puerto Rico", value: "PR" },
  ];

  const optionsSizePeriodo = [
    { label: "Enero", value: "ENE" },
    { label: "Febrero", value: "FEB" },
    { label: "Marzo", value: "MAR" },
    { label: "Abril", value: "ABR" },
    { label: "Mayo", value: "MAY" },
    { label: "Junio", value: "JUN" },
    { label: "Julio", value: "JUL" },
    { label: "Agosto", value: "AGO" },
    { label: "Septiembre", value: "SEP" },
    { label: "Octubre", value: "OCT" },
    { label: "Noviembre", value: "NOV" },
    { label: "Diciembre", value: "DIC" },
  ];
  const optionEtapa = [
    { label: "Eras de producción", value: "EP" },
    { label: "Cama de germinación", value: "CG" },
    { label: "Disponible para siembra", value: "D" },
  ];

  const optionLoteSiembra = [
    { label: "1", value: "V" },
    { label: "2", value: "opc2" },
    { label: "1", value: "opc3" },
    { label: "2", value: "opc4" },
  ];

  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    suppressMovable: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const [native, setNative] = useState("");
  const onNativeChange = (e) => {
    setNative(e.target.value);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
        >
        <h3 className="text-rigth  fw-light mb-3 mb-2">
          Control y Seguimiento de Material Vegetal
        </h3>
        <Subtitle title="Información general" mb="3" />
          <div className="row">
            <div className="col-12 col-sm-3">
              <label className="text-terciary ms-3">Seleccione vivero</label>
              <Controller
                name="seleccioneVivero"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsSeleccioneVivero}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errors.seleccioneVivero && (
                <small className="text-danger">Este campo es obligatorio</small>
              )}
            </div>
            <div className="row mt-2">
              <div className="col-12 col-sm-3">
                <label className="text-terciary ms-2">
                  Seleccionar lote de siembra
                </label>
                <Controller
                  name="loteSiembra"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionLoteSiembra}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.loteSiembra && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-3">
                <label className="text-terciary ms-2">Rango de fechas</label>
                <Controller
                  name="fechaInicio"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      locale="es"
                      selected={formValues.fechaInicio}
                      onSelect={(e) =>
                        setFormValues({ ...formValues, fechaInicio: e })
                      }
                      className="form-control border-terciary border rounded-pill px-3"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
                {errors.fechaInicio && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-3">
                <label className="text-terciary ms-2">Etapa de Siembra</label>
                <Controller
                  name="etapaSiembra"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionEtapa}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.etapaSiembra && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-3">
                <label className="text-terciary ms-2">
                  Seleccione Actividad<span className="text-danger">*</span>
                </label>
                <Controller
                  name="seleccioneActividad"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsSizePeriodo}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.seleccioneActividad && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="btn bg-primary text-white text-capitalize"
                  type="submit"
                  title="Send"
                >
                  Buscar
                </button>
              </div>
            </div>
            {selectores ? (
              <div>
                <div
                  className="ag-theme-alpine mt-2 mb-4"
                  style={{ height: "300px" }}
                >
                  <Subtitle title="Informacion de material vegetal " mt="3" mb="3" />
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
                <div
                  className="ag-theme-alpine mt-2 mb-4"
                  style={{ height: "300px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs2}
                    rowData={rowData2}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>

                <div
                  className="ag-theme-alpine mt-2 mb-4"
                  style={{ height: "300px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs3}
                    rowData={rowData3}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>

                <div className="col-12">
                <div className="mx-3">
                  <label htmlFor="ms-2" className="text-terciary">
                    Observaciones generales
                  </label>
                  <textarea
                    className="form-control border rounded-pill px-4 border-terciary"
                    type="text"
                    placeholder="Observaciones generales"
                    rows="3"
                    name="Observaciones"
                  />
                </div>
              </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn bg-primary me-md-2 text-white text-capitalize"
                    type="button"
                    title="Send"
                  >
                    &#60; &#60; Anterior
                  </button>
                  <button
                    className="btn bg-primary text-white text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Siguiente &#62; &#62;
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default ControlSeguimientoDeMaterialVegetalScreen;
