import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import BusquedaDePersonalModal from "../../../../../components/BusquedaArticuloModal";
import BusquedaArticuloModal from "../../../../../components/BusquedaArticuloModal";
import MarcaDeAgua1 from "../../../../../components/MarcaDeAgua1";
import DatePicker from "react-datepicker";

import Subtitle from "../../../../../components/Subtitle"

const articuloState = {
  codigo: "",
  nombre: "",
  tipo: { label: "", value: "" },
  marca: "",
  serial: "",
  modelo: "",
  kilometraje: "",
  id_articulo: 0
}
const dateState = {
  programacion: { value: "", label: "" },
  cada: "",
  tiempo: { value: "", label: "" },
  fechaDesde: "",
  fechaHasta: "",
  fds: "",
  festivos: ""
}
const kilometrosState = {
  programacion: { value: "", label: "" },
  cada: "",
  desde: "",
  hasta: ""
}

export interface requestFechas {
  id_articulo: string;
  programacion: string;
  fecha_manual: string;
  incluir_festivos: string;
  incluir_fds: string;
  unidad_cada: string;
  cada: string;
  desde: string;
  hasta: string;
}
const ProgamacionDeMantenimiento = () => {

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

  const [articuloModel, setArticuloModel] = useState(articuloState)
  const [fechasModel, setFechasModel] = useState(dateState);
  const [kilometrosModel, setKilometrosModel] = useState(kilometrosState);
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

  const handleFechaDesde = (e) => {
    let form = { ...fechasModel };
    form.fechaDesde = e;
    setValue("fecha_desde", form.fechaDesde);
    setFechasModel(form);
  };
  const handleFechaHasta = (e) => {
    let form = { ...fechasModel };
    form.fechaHasta = e;
    setFechasModel(form);
  };
  const handleChangeArticulo = (e) => {
    const { name, value } = e.target;
    setArticuloModel({ ...articuloModel, [name]: value });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFechasModel({ ...fechasModel, [name]: value });
  }
  const handleChangeKilometros = (e) => {
    const { name, value } = e.target;
    setKilometrosModel({ ...kilometrosModel, [name]: value });
  }



  const verificarFechas = () => {
    console.log(fechasModel);
    const data: requestFechas = {
      id_articulo: "6",
      cada: fechasModel.cada,
      desde: fechasModel.fechaDesde,
      hasta: fechasModel.fechaHasta,
      incluir_fds: fechasModel.fds,
      incluir_festivos: fechasModel.festivos,
      fecha_manual: "",
      programacion: "automatica",
      unidad_cada: fechasModel.tiempo.value
    }
  }

  const verificarKilometros = () => {
    const data: requestFechas = {
      id_articulo: "6",
      cada: kilometrosModel.cada,
      desde: kilometrosModel.desde,
      hasta: kilometrosModel.desde,
      incluir_fds: "false",
      incluir_festivos: "false",
      fecha_manual: "",
      programacion: "kilometraje",
      unidad_cada: ""
    }
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const options = [
    { label: "Árticulo", value: "AR" },
    { label: "Vehiculo", value: "Veh" },
    { label: "Otro", value: "OT" },
  ];

  const opcionMantenimiento = [
    { label: "Preventivo", value: "PR" },
    { label: "Correctivo", value: "CO" },
    { label: "Otro", value: "OT" },
  ];

  const opcionProgramar = [
    { label: "Manual", value: "MA" },
    { label: "Automatica", value: "AU" },
    { label: "Otro", value: "OT" },
  ];

  const opcionProgramarFecha = [
    { label: "Semanas", value: "SE" },
    { label: "Meses", value: "ME" },
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
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
  ];
  const columnDefs = [
    { headerName: "Código", field: "CO", minWidth: 150 },
    { headerName: "Serial/Placa", field: "SP", minWidth: 150 },
    { headerName: "Kilometraje", field: "KI", minWidth: 150 },
    { headerName: "Tipo de mantenimiento", field: "TI", minWidth: 150 },
    {
      headerName: "",
      field: "X",
      minWidth: 150,
      cellRendererFramework: (params) => (
        <div className="form-check form-switch d-flex align-items-center mt-3">
          <input
            className="form-check"
            type="checkbox"
            id="rememberMe"
            disabled={true}
          />
        </div>
      ),
    },
  ];

  const openModal = () => {
    setBusquedaArticuloIsActive(true)
  }

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Programacion mantenimiento
            </h3>
            <MarcaDeAgua1>
              <Subtitle title="Articulo" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2 justify-content-md-end">
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Código: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    name="codigo"
                    value={articuloModel.codigo}
                    onChange={handleChangeArticulo}
                  />
                  {errors.numeroCodigoArticulo && (
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
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    name="nombre"
                    value={articuloModel.nombre}
                    onChange={handleChangeArticulo}
                  />
                  {errors.nombreArticulo && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo{" "}
                  </label>
                  <div className="col-12 ">
                    <Select
                      options={options}
                      placeholder="Seleccionar"
                      name="tipo"
                      value={articuloModel.tipo}
                      onChange={(e) => {
                        const copy = { ...articuloModel }
                        copy.tipo.value = e?.value!;
                        copy.tipo.label = e?.label!;
                        setArticuloModel(copy);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <button
                    className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                    type="button"
                    title="Send"
                    form="configForm"
                    onClick={openModal}
                  >
                    Buscar articulo
                  </button>
                </div>
              </div>

              <Subtitle title="Datalles del articulo" mt={3} />
              <div className="row d-flex align-items-center mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Marca: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    name="marca"
                    value={articuloModel.marca}
                    onChange={handleChangeArticulo}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Serial/Placa: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    name="serial"
                    value={articuloModel.serial}
                    onChange={handleChangeArticulo}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Modelo: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    name="modelo"
                    value={articuloModel.modelo}
                    onChange={handleChangeArticulo}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Kilometraje: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    name="kilometraje"
                    value={articuloModel.kilometraje}
                    onChange={handleChangeArticulo}
                  />
                </div>
              </div>

              <Subtitle title="Articulo" mt={3} />
              <div className="row d-flex align-items-center mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo de mantenimiento{" "} <span className="text-danger">*</span>
                  </label>
                  <div className="col-12 ">
                    <Select
                      options={opcionMantenimiento}
                      placeholder="Seleccionar"
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex align-items-center mb-2 mx-2">
                <div className="col-12">
                  <label className="text-terciary">
                    Especificaciones tecnicas: <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control border rounded-pill px-3"
                    placeholder="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
                    rows={3}
                  />
                </div>
              </div>

              <Subtitle title="Programar por fechas" mt={3} />

              <div className="row d-flex align-items-center mx-2 mt-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Programación{" "}
                  </label>
                  <Select
                    name="programacion"
                    onChange={(e) => {
                      const copy = { ...fechasModel }
                      copy.programacion.value = e?.value!;
                      copy.programacion.label = e?.label!;
                      setFechasModel(copy);
                    }}
                    value={fechasModel.programacion}
                    options={opcionProgramar}
                    placeholder="Seleccionar"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Cada:
                  </label>
                  <input
                    name="cada"
                    value={fechasModel.cada}
                    type="number"
                    onChange={handleChange}
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tiempo{" "}
                  </label>
                  <Select
                    value={fechasModel.tiempo}
                    options={opcionProgramarFecha}
                    onChange={(e) => {
                      const copy = { ...fechasModel }
                      copy.tiempo.value = e?.value!;
                      copy.tiempo.label = e?.label!;
                      setFechasModel(copy);
                    }}
                    placeholder="Seleccionar"
                  />
                </div>

                <div className="col-12 col-md-3 mb-3 ">
                  <label className="text-terciary">
                    Fecha desde  {""}
                  </label>
                  <DatePicker
                    locale="es"
                    showYearDropdown
                    peekNextMonth
                    showMonthDropdown
                    scrollableYearDropdown
                    dropdownMode="select"
                    autoComplete="off"
                    selected={fechasModel.fechaDesde}
                    value={fechasModel.fechaDesde}
                    onSelect={handleFechaDesde}
                    className="form-control border rounded-pill px-3 border-terciary"
                    placeholderText="dd/mm/aaaa"
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha hasta {""} {/*<span className="text-danger">*</span> */}
                  </label>
                  <DatePicker
                    locale="es"
                    showYearDropdown
                    peekNextMonth
                    showMonthDropdown
                    scrollableYearDropdown
                    dropdownMode="select"
                    autoComplete="off"
                    selected={fechasModel.fechaHasta}
                    value={fechasModel.fechaHasta}
                    onSelect={handleFechaHasta}
                    className="form-control border rounded-pill px-3 border-terciary"
                    placeholderText="dd/mm/aaaa"
                  />
                </div>
              </div>


              <div className="row d-flex align-items-end mx-2">
                <div className="form-check col-md-5 col-12 ps-0 pe-10 ms-3 mb-3 d-flex">
                  <label className="form-check-label text-terciary"
                  >
                    Incluir sabados y domingos {""}
                  </label>
                  <input
                    className="form-check-input "
                    type="checkbox"
                    name="fds"
                    value={fechasModel.fds}
                    onChange={(e) => {
                      const { name, checked } = e.target;
                      setFechasModel({ ...fechasModel, [name]: checked });
                    }}
                    id="incluirFines"
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mx-2">
                <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex">
                  <label className="form-check-label text-terciary"
                  >
                    Incluir festivos {""}
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="festivos"
                    value={fechasModel.festivos}
                    onChange={(e) => {
                      const { name, checked } = e.target;
                      setFechasModel({ ...fechasModel, [name]: checked });
                    }}
                  />
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn bg-gradient-primary me-md-2"
                  type="button"
                  title="Send"
                  onClick={verificarFechas}
                >
                  Validar Fechas
                </button>
              </div>

              <Subtitle title="Programar por kilometraje" mt={3} />

              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    1) Al llegar a:
                  </label>
                  <input
                    type="number"
                    name="desde"
                    value={kilometrosModel.desde}
                    onChange={handleChangeKilometros}
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Kilometros"
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    2) Cada:
                  </label>
                  <input
                    type="number"
                    name="cada"
                    value={kilometrosModel.cada}
                    onChange={handleChangeKilometros}
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Kilometros"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Hasta:
                  </label>
                  <input
                    type="number"
                    name="hasta"
                    value={kilometrosModel.hasta}
                    onChange={handleChangeKilometros}
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Kilometros"
                  />
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn bg-gradient-primary me-md-2"
                    type="button"
                    title="Send"
                    onClick={verificarKilometros}
                  >
                    Validar Kilometros
                  </button>
                </div>
              </div>

              <Subtitle title="Previsualizacion" mt={3} />

              <div className="row">
                <div
                  className="ag-theme-alpine mt-3 mb-4 px-4"
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
                  type="submit"
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
            </MarcaDeAgua1>
          </form>
          <BusquedaArticuloModal
            isModalActive={busquedaArticuloIsActive}
            setIsModalActive={setBusquedaArticuloIsActive}
            setModel={setArticuloModel}
            articuloModel={articuloModel}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgamacionDeMantenimiento;
