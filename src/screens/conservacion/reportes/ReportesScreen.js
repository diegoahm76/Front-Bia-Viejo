import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
registerLocale("es", es);

const ReportesScreen = () =>{
  const [selectedReporte, setSelectedReporte] = useState({
    tipoReporte: "",
    seleccioneVivero: "",
  });

  const [formValues, setFormValues] = useState({
    fechaInicio: "",
  });

  const [botonAdquisicionMaterialVegetal, setbotonAdquisicionMaterialVegetal] =
    useState({
      materialReportar: "",
      tipoReporteAdquisicionMaterialVegetal: "",
    });
  const [botonReporteMaterialVegetal, setBotonReporteMaterialVegetal] =
    useState({
      todoMaterial: " ",
      nombreSemilla: " ",
      nombrePlanta: " ",
      tipoReporteMaterialVegetal: "",
    });

  const [selectedSize, setSelectedSize] = useState([]);

  const [botonReportesInventario, setBotonReportesInventario] = useState({
    tipoReporteInventario: "",
    etapaPlanta: "",
  });
  const [botonReportesDistribucion, setBotonReportesDistribucion] = useState({
    tipoReporteDistribucion: "",
    nombrePlanta: "",
    nombreFuncionario: "",
    todaDistribucion: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm();

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    control: control3,
    formState: { errors: errors3 },
  } = useForm();

  const {
    register: register4,
    handleSubmit: handleSubmit4,
    control: control4,
    formState: { errors: errors4 },
  } = useForm();

  const {
    register: register5,
    handleSubmit: handleSubmit5,
    control: control5,
    formState: { errors: errors5 },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSelectedReporte({
      tipoReporte: data.tipoReporte,
      seleccioneVivero: data.seleccioneVivero,
    });
  };

  const onSubmitBotonInventario = (data) => {
    console.log(data);
    setBotonReportesInventario({
      tipoReporteInventario: data.tipoReporteInventario,
      etapaPlanta: data.etapaPlanta,
    });
  };

  const onSubmitBotonDistribucion = (data) => {
    console.log(data);
    setBotonReportesDistribucion({
      tipoReporteDistribucion: data.tipoReporteDistribucion,
      nombrePlanta: data.nombrePlanta,
      nombreFuncionario: data.nombreFuncionario,
      todaDistribucion: data.todaDistribucion,
    });
  };

  const onSubmitBotonMaterialVegetal = (data) => {
    console.log(data);
    setBotonReporteMaterialVegetal({
      todoMaterial: data.todoMaterial,
      nombreSemilla: data.nombreSemilla,
      nombrePlanta: data.nombrePlanta,
      tipoReporteMaterialVegetal: data.tipoReporteMaterialVegetal,
    });
  };

  const onSubmitBotonAdquisicionMaterialVegetal = (data) => {
    console.log(data);
    setbotonAdquisicionMaterialVegetal({
      materialReportar: data.materialReportar,
      tipoReporteAdquisicionMaterialVegetal:
        data.tipoReporteAdquisicionMaterialVegetal,
    });
  };

  const [rowData] = useState([
    {
      nombre: "Palo cruz",
      cientifico: " ",
      vivero: "",
      produccion: "Palo cruz",
      disponible: " ",
      mortalidad: "",
      total: " ",
      disponibleFecha: "",
    },
    {
      nombre: "Palo cruz",
      cientifico: " ",
      vivero: "",
      produccion: "Palo cruz",
      disponible: " ",
      mortalidad: "",
      total: " ",
      disponibleFecha: "",
    },
    {
      nombre: "Palo cruz",
      cientifico: " ",
      vivero: "",
      produccion: "Palo cruz",
      disponible: " ",
      mortalidad: "",
      total: " ",
      disponibleFecha: "",
    },
    {
      nombre: "Palo cruz",
      cientifico: " ",
      vivero: "",
      produccion: "Palo cruz",
      disponible: " ",
      mortalidad: "",
      total: " ",
      disponibleFecha: "",
    },
    {
      nombre: "Palo cruz",
      cientifico: " ",
      vivero: "",
      produccion: "Palo cruz",
      disponible: " ",
      mortalidad: "",
      total: " ",
      disponibleFecha: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Nombre Común", field: "nombre", minWidth: 150 },
    { headerName: "Nombre Científico", field: "cientifico", minWidth: 150 },
    { headerName: "Vivero", field: "vivero", minWidth: 150 },
    { headerName: "Producción < 30", field: "produccion", minWidth: 150 },
    {
      headerName: "Disponible en Vivero > 30",
      field: "disponible",
      minWidth: 150,
    },
    { headerName: "Mortalidad", field: "mortalidad", minWidth: 150 },
    { headerName: "Total", field: "total", minWidth: 150 },
    {
      headerName: "Disponible para la fecha",
      field: "disponibleFecha",
      minWidth: 150,
    },
  ];

  const [rowDataDistribucion] = useState([
    {
      nombre: "cruz",
      cientifico: " ",
      vivero: "",
      profesional: "cruz",
      cantidad: " ",
      fecha: "",
      informe: " ",
    },
    {
      nombre: "cruz",
      cientifico: " ",
      vivero: "",
      profesional: "cruz",
      cantidad: " ",
      fecha: "",
      informe: " ",
    },
    {
      nombre: "cruz",
      cientifico: " ",
      vivero: "",
      profesional: "cruz",
      cantidad: " ",
      fecha: "",
      informe: " ",
    },
    {
      nombre: "cruz",
      cientifico: " ",
      vivero: "",
      profesional: "cruz",
      cantidad: " ",
      fecha: "",
      informe: " ",
    },
    {
      nombre: "cruz",
      cientifico: " ",
      vivero: "",
      profesional: "cruz",
      cantidad: " ",
      fecha: "",
      informe: " ",
    },
  ]);

  const columnDefsDistribucion = [
    { headerName: "Nombre Común", field: "nombre", minWidth: 150 },
    { headerName: "Nombre Científico", field: "cientifico", minWidth: 150 },
    { headerName: "Vivero", field: "vivero", minWidth: 150 },
    { headerName: "Profesional", field: "profesional", minWidth: 150 },
    { headerName: "Cantidad", field: "cantidad", minWidth: 150 },
    { headerName: "Fecha de entrega", field: "fecha", minWidth: 150 },
    {
      headerName: "No. de informe de caracterización",
      field: "informe",
      minWidth: 150,
    },
  ];

  const [rowDataMaterialVegetal] = useState([
    {
      nombre: "palo rosa",
      cientifico: " ",
      vivero: "",
      cantidad: "40",
      umedida: "kg ",
      fsiembra: "",
      fvencimiento: " 24-12-2022",
      observaciones: " ",
    },
    {
      nombre: "palo rosa",
      cientifico: " ",
      vivero: "",
      cantidad: "40",
      umedida: "kg ",
      fsiembra: "",
      fvencimiento: " 24-12-2022",
      observaciones: " ",
    },
    {
      nombre: "palo rosa",
      cientifico: " ",
      vivero: "",
      cantidad: "40",
      umedida: "kg ",
      fsiembra: "",
      fvencimiento: " 24-12-2022",
      observaciones: " ",
    },
    {
      nombre: "palo rosa",
      cientifico: " ",
      vivero: "",
      cantidad: "40",
      umedida: "kg ",
      fsiembra: "",
      fvencimiento: " 24-12-2022",
      observaciones: " ",
    },
    {
      nombre: "palo rosa",
      cientifico: " ",
      vivero: "",
      cantidad: "40",
      umedida: "kg ",
      fsiembra: "",
      fvencimiento: " 24-12-2022",
      observaciones: " ",
    },
  ]);

  const columnDefsMaterialVegetal = [
    { headerName: "Nombre Común", field: "nombre", minWidth: 150 },
    { headerName: "Nombre Científico", field: "cientifico", minWidth: 150 },
    { headerName: "Vivero", field: "vivero", minWidth: 150 },
    { headerName: "cantidad", field: "cantidad", minWidth: 150 },
    { headerName: "unidad de medida", field: "umedida", minWidth: 150 },
    { headerName: "Fecha de siembra", field: "fsiembra", minWidth: 150 },
    {
      headerName: "Fecha de vencimiento",
      field: "fvencimiento",
      minWidth: 150,
    },
    { headerName: "Observaciones", field: "observaciones", minWidth: 150 },
  ];
  const [rowDataAdquisicionMaterialVegetal] = useState([
    {
      nombre: "manzano",
      cientifico: " ",
      vivero: "",
      cantidad: "20",
      umedida: "lb",
      fadquisicion: "",
      fvencimiento: " 01-11-2022",
      metodo: " ",
    },
    {
      nombre: "manzano",
      cientifico: " ",
      vivero: "",
      cantidad: "20",
      umedida: "lb",
      fadquisicion: "",
      fvencimiento: " 01-11-2022",
      metodo: " ",
    },
    {
      nombre: "manzano",
      cientifico: " ",
      vivero: "",
      cantidad: "20",
      umedida: "lb",
      fadquisicion: "",
      fvencimiento: " 01-11-2022",
      metodo: " ",
    },
    {
      nombre: "manzano",
      cientifico: " ",
      vivero: "",
      cantidad: "20",
      umedida: "lb",
      fadquisicion: "",
      fvencimiento: " 01-11-2022",
      metodo: " ",
    },
    {
      nombre: "manzano",
      cientifico: " ",
      vivero: "",
      cantidad: "20",
      umedida: "lb",
      fadquisicion: "",
      fvencimiento: " 01-11-2022",
      metodo: " ",
    },
  ]);

  const columnDefsAdquisicionMaterialVegetal = [
    { headerName: "Nombre Común", field: "nombre", minWidth: 150 },
    { headerName: "Nombre Científico", field: "cientifico", minWidth: 150 },
    { headerName: "Vivero", field: "vivero", minWidth: 150 },
    { headerName: "cantidad", field: "cantidad", minWidth: 150 },
    { headerName: "unidad de medida", field: "umedida", minWidth: 150 },
    {
      headerName: "Fecha de adquisición",
      field: "fadquisicion",
      minWidth: 150,
    },
    {
      headerName: "Fecha de vencimiento",
      field: "fvencimiento",
      minWidth: 150,
    },
    { headerName: "Metodo de Adquisición ", field: "metodo", minWidth: 150 },
  ];

  const OpcionUbicacionVivero = [
    { label: "Villavicencio", value: "V" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "Mapiripan", value: "M" },
    { label: "La Macarena", value: "LM" },
    { label: "San Juan de Arama", value: "SJA" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Todo", value: "T" },
  ];

  const optionsSizeReporte = [
    { label: "Reporte de Inventario", value: "RI" },
    { label: "Reporte de Distribución", value: "RD" },
    { label: "Reporte de Material Vegetal", value: "RMV" },
    { label: "Reporte de Adquisición de Material Vegetal", value: "RAMV" },
  ];
  const optionsSizeInventarioTipoReporte = [
    { label: "Todo el inventario", value: "T" },
    { label: "Producción propia ", value: "PP" },
    { label: "Herramientas ", value: "H" },
    { label: "Insumos", value: "I" },
  ];

  const optionsSizeInventarioEtapaPlanta = [
    { label: "Cama de germinación ", value: "CAMA" },
    { label: "Era de producción ", value: "ERA" },
    { label: "Disponible para distribución  ", value: "DISTR" },
    { label: "Todas las etapas", value: "TODO" },
  ];

  const optionsSizeDistribucionNombrePlanta = [
    { label: "Palo rosa ", value: "PR" },
    { label: "Manzana ", value: "MZ" },
    { label: "Papa  ", value: "P" },
    { label: "Cebolla", value: "C" },
  ];
  const optionsSizeDistribucionNombreFuncionario = [
    { label: "Angelica Leon ", value: "AL" },
    { label: "Esteban ", value: "E" },
    { label: "Julian  ", value: "J" },
    { label: "Jesus", value: "JE" },
  ];
  const optionsSizeDistribucionTipoReporte = [
    { label: "Por planta", value: "P" },
    { label: "Por profesional", value: "PRO" },
    { label: "Toda la distribución ", value: "D" },
  ];
  const optionsSizeMaterialVegetalReporte = [
    { label: "Por planta ", value: "PL" },
    { label: "Por semilla ", value: "SE" },
    { label: "Todo el material  ", value: "T" },
  ];

  const optionsSizeMaterialVegetalNombreSemilla = [
    { label: "Semilla 1 ", value: "S1" },
    { label: "Semilla 2 ", value: "S2" },
    { label: "Semilla 3  ", value: "S3" },
  ];
  const optionsSizeMaterialVegetalNombrePlanta = [
    { label: "manzano ", value: "MZ" },
    { label: "palo rosa ", value: "PR" },
    { label: "palo ", value: "P" },
    { label: "rosa ", value: "R" },
    { label: "Todo  ", value: "T" },
  ];

  const optionsSizeAdquisicionMaterialVegetalReporte = [
    { label: "Todas las adquisiciones ", value: "T" },
    { label: "Recurso de la corporación ", value: "RC" },
    { label: "Compensaciones ", value: "C" },
    { label: "Donaciones ", value: "D" },
    { label: "Medidas de resarcimiento ", value: "MR" },
  ];
  const optionsSizeAdquisicionMaterialVegetalMaterialReportar = [
    { label: "Todos los materiales ", value: "TM" },
    { label: "Material vegetal ", value: "MV" },
    { label: "Insumos ", value: "I" },
    { label: "Herramientas  ", value: "H" },
  ];
  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: true,
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

  const [native, setNative] = useState("");
  const onNativeChange = (e) => {
    setNative(e.target.value);
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Reportes</h3>
        <div className="multisteps-form__content">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-12 col-sm-6">
                <label className="form-control ms-0">Reporte</label>
                <Controller
                  name="tipoReporte"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsSizeReporte}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.tipoReporte && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-control ms-0">Seleccione Vivero</label>
                <Controller
                  name="seleccioneVivero"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={OpcionUbicacionVivero}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.seleccioneVivero && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <button
                  type="submit"
                  className="mt-5 btn btn-primary flex-center text-capitalize"
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
          {selectedReporte.tipoReporte.value === "RI" ? (
            <form
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit2(onSubmitBotonInventario)}
            >
              <div className="row">
                <h6 className="mt-0 mb-0 text-center mb-3">
                  Reportes de Inventario
                </h6>
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">Tipo de Reporte</label>
                  <Controller
                    name="tipoReporteInventario"
                    control={control2}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsSizeInventarioTipoReporte}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors2.tipoReporteInventario && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">Etapa de planta</label>
                  <Controller
                    name="etapaPlanta"
                    control={control2}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsSizeInventarioEtapaPlanta}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors2.etapaPlanta && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">Rango de fechas</label>
                  <Controller
                    name="fechaInicioInventario"
                    control={control2}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        selected={formValues.fechaInicio}
                        onSelect={(e) =>
                          setFormValues({ ...formValues, fechaInicio: e })
                        }
                        className="multisteps-form__input form-control p-2"
                        placeholderText="dd/mm/aaaa"
                        onChange={(event) =>
                          onDateChanged(event, "fechaInicio")
                        }
                      />
                    )}
                  />
                  {errors2.fechaInicioInventario && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
                <div className="col-12 col-sm-6">
                  <button
                    type="submit"
                    className="mt-5 btn btn-primary flex-center text-capitalize"
                  >
                    Buscar
                  </button>
                </div>
              </div>
              {botonReportesInventario.tipoReporteInventario &&
              botonReportesInventario.etapaPlanta ? (
                <div>
                  <div
                    className="ag-theme-alpine mt-2 mb-4"
                    style={{ height: "300px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                  <div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                      <button
                        className="btn bg-primary text-white text-capitalize"
                        type="button"
                        title="Send"
                      >
                        Generar Reporte
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </form>
          ) : (
            ""
          )}

          {selectedReporte.tipoReporte.value === "RD" ? (
            <form
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit3(onSubmitBotonDistribucion)}
            >
              <div className="row">
                <h6 className="mt-0 mb-0 text-center mb-3">
                  Reportes de Distribución
                </h6>
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">Tipo de Reporte</label>
                  <Controller
                    name="tipoReporteDistribucion"
                    control={control3}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsSizeDistribucionTipoReporte}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors3.tipoReporteDistribucion && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                  {botonReportesDistribucion.tipoReporteDistribucion.value ===
                  "P" ? (
                    <div className="col-12">
                      <label className="form-control ms-0">
                        Nombre de planta
                      </label>
                      <Controller
                        name="nombrePlanta"
                        control={control3}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={optionsSizeDistribucionNombrePlanta}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors3.nombrePlanta && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {botonReportesDistribucion.tipoReporteDistribucion.value ===
                  "PRO" ? (
                    <div className="col-12">
                      <label className="form-control ms-0">
                        Nombre de funcionario
                      </label>
                      <Controller
                        name="nombreFuncionario"
                        control={control3}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={optionsSizeDistribucionNombreFuncionario}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors3.nombreFuncionario && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {botonReportesDistribucion.tipoReporteDistribucion.value ===
                  "D" ? (
                    <div className="col-12">
                      <label className="form-control ms-0">
                        Toda la distribución
                      </label>
                      <Controller
                        name="todaDistribucion"
                        control={control3}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={optionsSizeDistribucionNombreFuncionario}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors3.todaDistribucion && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-12 col-sm-6">
                    <label className="form-control ms-0">Rango de fechas</label>
                    <Controller
                      name="fechaInicioDistribucion"
                      control={control3}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          selected={formValues.fechaInicio}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaInicio: e })
                          }
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                    {errors3.fechaInicioDistribucion && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <button
                    type="submit"
                    className="mt-5 btn btn-primary flex-center text-capitalize"
                  >
                    Buscar
                  </button>
                </div>
                {botonReportesDistribucion.nombreFuncionario ||
                botonReportesDistribucion.nombrePlanta ||
                botonReportesDistribucion.todaDistribucion ? (
                  <form>
                    <div
                      className="ag-theme-alpine mt-2 mb-4"
                      style={{ height: "300px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefsDistribucion}
                        rowData={rowDataDistribucion}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                    <div>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                        <button
                          className="btn bg-primary text-white text-capitalize"
                          type="button"
                          title="Send"
                        >
                          Generar Reporte
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  " "
                )}
              </div>
            </form>
          ) : (
            ""
          )}
          {selectedReporte.tipoReporte.value === "RMV" ? (
            <form
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit4(onSubmitBotonMaterialVegetal)}
            >
              <div className="row">
                <h6 className="mt-0 mb-0 text-center mb-2">
                  Reportes de Material Vegetal
                </h6>
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">Tipo de Reporte</label>
                  <Controller
                    name="tipoReporteMaterialVegetal"
                    control={control4}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsSizeMaterialVegetalReporte}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors4.tipoReporteMaterialVegetal && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                  {botonReporteMaterialVegetal.tipoReporteMaterialVegetal
                    .value === "PL" ? (
                    <div className="col-12">
                      <label className="form-control ms-0">
                        Nombre de planta
                      </label>
                      <Controller
                        name="nombrePlantaMaterialVegetal"
                        control={control4}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={optionsSizeMaterialVegetalNombrePlanta}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors4.nombrePlantaMaterialVegetal && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {botonReporteMaterialVegetal.tipoReporteMaterialVegetal
                    .value === "SE" ? (
                    <div className="col-12">
                      <label className="form-control ms-0">
                        Nombre de la semilla
                      </label>
                      <Controller
                        name="nombreSemilla"
                        control={control4}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={optionsSizeMaterialVegetalNombreSemilla}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors4.nombreSemilla && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {botonReporteMaterialVegetal.tipoReporteMaterialVegetal
                    .value === "T" ? (
                    <div className="col-12">
                      <label className="form-control ms-0">
                        Todo el material
                      </label>
                      <Controller
                        name="todoMaterial"
                        control={control4}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={optionsSizeDistribucionNombreFuncionario}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors4.todoMaterial && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-12 col-sm-6">
                    <label className="form-control ms-0">Rango de fechas</label>
                    <Controller
                      name="fechaInicioMaterialVegetal"
                      control={control4}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          selected={formValues.fechaInicio}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaInicio: e })
                          }
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                    {errors4.fechaInicioMaterialVegetal && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <button
                    type="submit"
                    className="mt-5 btn btn-primary flex-center text-capitalize"
                  >
                    Buscar
                  </button>
                </div>
                {botonReporteMaterialVegetal.nombrePlantaMaterialVegetal ||
                botonReporteMaterialVegetal.nombreSemilla ||
                botonReporteMaterialVegetal.todoMaterial ? (
                  <form>
                    <div
                      className="ag-theme-alpine mt-2 mb-4"
                      style={{ height: "300px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefsMaterialVegetal}
                        rowData={rowDataMaterialVegetal}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                    <div>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                        <button
                          className="btn bg-primary text-white text-capitalize"
                          type="button"
                          title="Send"
                        >
                          Generar Reporte
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  " "
                )}
              </div>
            </form>
          ) : (
            ""
          )}
          {selectedReporte.tipoReporte.value === "RAMV" ? (
            <form
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit5(onSubmitBotonAdquisicionMaterialVegetal)}
            >
              <div>
                <h6 className="mt-4 mb-0 text-center mb-3">
                  Reportes de Adquisición de Material Vegetal
                </h6>
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">Tipo de Reporte</label>
                  <Controller
                    name="tipoReporteAdquisicionMaterialVegetal"
                    control={control5}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsSizeAdquisicionMaterialVegetalReporte}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors5.tipoReporteAdquisicionMaterialVegetal && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">
                    Material a reportar
                  </label>
                  <Controller
                    name="materialReportar"
                    control={control5}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={
                          optionsSizeAdquisicionMaterialVegetalMaterialReportar
                        }
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors5.materialReportar && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">Rango de fechas</label>
                  <Controller
                    name="fechaInicioAdquisicion"
                    control={control5}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        selected={formValues.fechaInicio}
                        onSelect={(e) =>
                          setFormValues({ ...formValues, fechaInicio: e })
                        }
                        className="multisteps-form__input form-control p-2"
                        placeholderText="dd/mm/aaaa"
                      />
                    )}
                  />
                  {errors5.fechaInicioAdquisicion && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
                <div className="col-12 col-sm-6">
                  <button
                    type="submit"
                    className="mt-5 btn btn-primary flex-center text-capitalize"
                  >
                    Buscar
                  </button>
                </div>
              </div>
              {botonAdquisicionMaterialVegetal.tipoReporteAdquisicionMaterialVegetal &&
              botonAdquisicionMaterialVegetal.materialReportar ? (
                <form>
                  <div
                    className="ag-theme-alpine mt-2 mb-4"
                    style={{ height: "300px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefsAdquisicionMaterialVegetal}
                      rowData={rowDataAdquisicionMaterialVegetal}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                  <div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                      <button
                        className="btn bg-primary text-white text-capitalize"
                        type="button"
                        title="Send"
                      >
                        Generar Reporte
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                ""
              )}
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default ReportesScreen