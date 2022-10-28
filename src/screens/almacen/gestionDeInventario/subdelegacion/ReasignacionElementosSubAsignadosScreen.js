import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import BusquedaDePersonalModal from "../../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../../components/BusquedaArticuloModal";
<<<<<<< HEAD
import ModalLocal from "../../../../components/ModalLocal";


const rowDataInicial = [
  { BU: "", CO: 9373, NE: "computador", ID: "0003", MR: "Accer", SL: 2342, VO: 1100000, JO: "aa" },
  { BU: "", CO: 9373, NE: "computador", ID: "0003", MR: "Accer", SL: 2342, VO: 1100000, JO: "aa" },
  { BU: "", CO: 9373, NE: "computador", ID: "0003", MR: "Accer", SL: 2342, VO: 1100000, JO: "aa" },

];

const optionState = [
  { label: "Bueno", value: "BU" },
  { label: "Defectuoso", value: "DE" },
]

=======
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";

const rowDataInicial = [
  {
    CO: 9373,
    NE: "computador",
    ID: "0003",
    MR: "Accer",
    SL: 2342,
    VO: 1100000,
    EO: "Bueno",
    JO: "aa",
  },
  {
    CO: 9373,
    NE: "computador",
    ID: "0003",
    MR: "Accer",
    SL: 2342,
    VO: 1100000,
    EO: "Bueno",
    JO: "aa",
  },
  {
    CO: 9373,
    NE: "computador",
    ID: "0003",
    MR: "Accer",
    SL: 2342,
    VO: 1100000,
    EO: "Bueno",
    JO: "aa",
  },
];

>>>>>>> 6ee102a4e23b7fb58b713f4489ce09ec8ff9099f
const options = [
  { label: "Vivero 1", value: "Vivero1" },
  { label: "Vivero 2", value: "Vivero2" },
  { label: "Vivero 3", value: "Vivero3" },
  { label: "Vivero 4", value: "Vivero4" },
  { label: "Vivero 5", value: "Vivero5" },
  { label: "Vivero 6", value: "Vivero6" },
  { label: "Vivero 7", value: "Vivero7" },
];

const optionIdentify = [
  { label: "C.C.", value: "CC" },
  { label: "T.I", value: "TI" },
  { label: "Otro", value: "OT" },
];

function ReasignacionElementosSubAsignadosScreen() {
<<<<<<< HEAD

  const [startDate, setStartDate] = useState(new Date());

=======
>>>>>>> 6ee102a4e23b7fb58b713f4489ce09ec8ff9099f
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rowData] = useState(rowDataInicial);

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

  let gridApi;
  const columnDefs = [
    {
      headerName: "", field: "BU", minWidth: 170, cellRendererFramework: (params) => (
        <div className="col-12 col-sm-12 justify-content-md-center">
          <button
            className="btn bg-gradient-primary text-capitalize "
            type="button"
            title="Send"
            form="configForm"
            onClick={() => handleOpenModalDespachar(true)}
          >
            Buscar personal
          </button>
        </div>

      ),
    },
    { headerName: "Código", field: "CO", minWidth: 150 },
    { headerName: "Nombre", field: "NE", minWidth: 150 },
    { headerName: "ID unico", field: "ID", minWidth: 150 },
    { headerName: "Marca", field: "MR", minWidth: 150 },
    { headerName: "Serial", field: "SL", minWidth: 150 },
    { headerName: "Valor unitario", field: "VO", minWidth: 150 },
<<<<<<< HEAD
    {
      headerName: "Justificación", field: "JO", minWidth: 150, cellRendererFramework: (params) => (
        <div className="col-12 col-sm-12 justify-content-md-center">
          <button
            type="button"
            className="btn bg-gradient-info text-capitalize "
            onClick={handleOpenModalDespachar}
          >
            Ver
          </button>
        </div>
      )
    },
  ]


  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: false, suppressMovable: true }
=======
    { headerName: "Estado", field: "EO", minWidth: 150 },
    { headerName: "Justificación", field: "JO", minWidth: 150 },
  ];

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
>>>>>>> 6ee102a4e23b7fb58b713f4489ce09ec8ff9099f
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const [page, setPage] = useState(1);

  const submit = (data) => {
    if (page === 1) setPage(2);
    if (page === 2) console.log(data);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };

  const [despachar, setDespachar] = useState(false);

  const handleOpenModalDespachar = () => {
    setDespachar(true);
  };

  const handleCloseModalDespachar = () => {
    setDespachar(false);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Sub reasignacion entre contratistas
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="row" hidden={page === 2}>
              <h5 className="font-weight-bolder">Reasignar</h5>

<<<<<<< HEAD
            <div className="row">
              <div className="row">
                <div className="col-12 col-sm-4 justify-content-end">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de solicitud
                    <Controller
                      name="fechaSolicitud"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          selected={startDate}
                          dateFormat="dd/MM/yyyy"
                          includeDates={[new Date()]}
                          onChange={(date) => setStartDate(date)}
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </label>
                </div>
              </div>
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
=======
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
>>>>>>> 6ee102a4e23b7fb58b713f4489ce09ec8ff9099f
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
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={optionIdentify}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
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
              {errors.nombre && (
                <p className="text-danger">Este campo es obligatorio</p>
              )}
            </div>

            <div className="row" hidden={page === 1}>
              <h5 className="font-weight-bolder">Datos de notificacion</h5>
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-4 px-4"
                  style={{ height: "470px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-4 mt-6">
              <button
                className={`btn bg-gradient-danger mb-0 text-capitalize ${
                  page === 1 && "d-none"
                }`}
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
<<<<<<< HEAD
            {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

          </div>


          <div className="row" hidden={page === 1}>
            <h5 className="font-weight-bolder">Datos de notificacion</h5>
            <div>
              <div className="ag-theme-alpine mt-auto my-auto px-auto" style={{ height: '470px' }}>
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
              className="btn bg-gradient-success mb-0 text-capitalize"
              type="submit"
              title="Send"
              form="configForm"
            >
              {"Guardar"}
            </button>
          </div>
          <ModalLocal localState={despachar}>
            <div className="row min-vh-100">
              <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <h3 className="mt-3 mb-0 text-center">Justificación</h3>
                <form
                  className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                  data-animation="FadeIn"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12 col-sm-6">
                    <label className="form-floating input-group input-group-dynamic fw-bolder ms-2">
                      Estado{" "}
                    </label>
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      <div className="col-12 ">
                        <Controller
                          name="justificacionEstado"
                          control={control} rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={optionState}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
                    <label htmlFor="exampleFormControlInput1">
                      Justificación
                    </label>
                    <textarea
                      className="multisteps-form__input form-control p-2 mw-100 w-auto"
                      type="text"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                      rows="2"
                      name="justificacion"
                      {...register("justificacion")}
                    />
                  </div>
                  <div className="row justify-content-end">
                    <button
                      className="col-2 btn bg-gradient-danger mt-2 flex-end"
                      onClick={handleCloseModalDespachar}
                      type="submit"
                      title="Send"
                      form="configForm"
                    >
                      Salir
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </ModalLocal>
=======
          </MarcaDeAgua1>
>>>>>>> 6ee102a4e23b7fb58b713f4489ce09ec8ff9099f
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
  );
}

export default ReasignacionElementosSubAsignadosScreen;
