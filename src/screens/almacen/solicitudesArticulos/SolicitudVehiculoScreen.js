import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import DatePicker from "react-datepicker";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import CalendarModal from "../../../components/CalendarModal";
import { useDispatch } from "react-redux";
import Subtitle from "../../../components/Subtitle";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";

const SolicitudVehiculoScreen = () => {
  const [formValues, setFormValues] = useState({
    fechaSalida: "",
    fechaLlegada: "",
  });

  const [native, setNative] = useState("");
  const onNativeChange = (e) => {
    setNative(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalArticulo, setIsModalArticulo] = useState(false);

  const handleOpenModal = () => {
    setIsModalActive(true);
  };
  const handleOpenAgregarProducto = () => {
    setIsModalArticulo(true);
  };

  const [rowData] = useState([
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Código Artículo", field: "codigo", minWidth: 150 },
    { headerName: "Nombre del artículo", field: "nombre", minWidth: 150 },
    { headerName: "Cantidad", field: "cantidad", minWidth: 150 },
    {
      headerName: "Fecha entrega",
      field: "fechaEntrega",
      minWidth: 150,
    },
  ];
  const [rowBuscar] = useState([
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
  ]);

  const columnBuscar = [
    { headerName: "Nombre", field: "nombre", minWidth: 150 },
    { headerName: "Tipo documento", field: "tipoDocumento", minWidth: 150 },
    { headerName: "Documento", field: "documento", minWidth: 150 },
    {
      headerName: "Dependecia",
      field: "dependencia",
      minWidth: 150,
    },
    { headerName: "Grupo", field: "grupo", minWidth: 150 },
  ];

  const optionsTipoDocumento = [
    { label: "C.C", value: "CC" },
    { label: "T.I", value: "TI" },
  ];

  const optionsDependencia = [
    { label: "Dependencia 1", value: "D1" },
    { label: "Dependencia 2", value: "D2" },
    { label: "Dependencia 3", value: "D3" },
  ];

  const optionsGrupo = [
    { label: "Grupo 1", value: "G1" },
    { label: "Grupo 2", value: "G2" },
    { label: "Grupo 3", value: "G3" },
  ];

  const optionsSiNo = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
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
  const [startDate, setStartDate] = useState(new Date());

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const dispatch = useDispatch();
  return (
    <div className="row min-vh-100 ">
      <div className="col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-rigth  fw-light mb-3 mb-2">
              Solicitud de vehículo
            </h3>
            <div className="row">
              <Subtitle title="información de solicitud " mt="3" mb="3" />
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-3 text-terciary">
                    Numero consecutivo
                  </label>
                  <input
                    className="form-control border  border-terciary rounded-pill px-3"
                    type="number"
                    placeholder="numero consecutivo"
                    {...register("numeroConsecutivo")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <label classNAme="text-terciary">
                  Fecha de solicitud
                </label>
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
                        className="form-control border-terciary border rounded-pill px-3"
                        placeholderText="dd/mm/aaaa"
                      />
                    )}
                  />
              </div>
            </div>
          </form>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <Subtitle title="Datos del solicitante" mb="3" />
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-3 text-terciary">
                    Tipo de documento
                  </label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="tipo de documento"
                    value="C.C."
                    disabled
                    {...register("documento")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Número de cedula</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    value="1121919374"
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre completo</label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    value="Ludy Angélica León Quiroga"
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <Subtitle title="Datos del coordinador " mt="3" mb="3" />
              <div className="col-12 col-sm-3">
                <label className="text-terciary ms-3">Tipo de documento </label>
                <div className="col-12 ">
                  <Controller
                    name="tipoDocumento"
                    control={control}
                    defaultValue={optionsTipoDocumento[0]}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsTipoDocumento}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Número de cedula</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre completo</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    {...register("nombreCompleto")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-2 mt-2">
                <div className="d-grid gap-2 d-flex">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="submit"
                    title="Send"
                    form="configForm"
                    onClick={handleOpenModal}
                  >
                    Buscar
                  </button>
                </div>
              </div>
              <BusquedaDePersonalModal
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
              />
              <Subtitle title="información de solicitud " mt="3" mb="3" />
              <div className="col-12 col-sm-3">
                <label className="form-floating input-group input-group-dynamic ms-2 text-terciary">
                  Dependecia{" "}
                  <div className="col-12 ">
                    <Controller
                      name="dependencia"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="mt-2"
                          options={optionsDependencia}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-sm-3">
                <label className="form-floating input-group input-group-dynamic text-terciary ms-2">
                  Grupo{" "}
                  <div className="col-12 ">
                    <Controller
                      name="grupo"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="mt-2"
                          options={optionsGrupo}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12">
                <div className="mx-3">
                  <label htmlFor="ms-2" className="text-terciary">
                    Motivo de salida
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
              <div className="row">
                <div className="col-12 col-sm-3 mt-3">
                  <div>
                    <label className="ms-2 text-terciary ">
                      Número expediente
                    </label>
                    <input
                      className="form-control border border-terciary rounded-pill px-3"
                      type="number"
                      placeholder="Número expediente"
                      {...register("numeroCedula")}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-3 mt-1">
                  <div>
                    <label className="ms-2 text-terciary mt-3">
                      Capacidad de pasajeros
                    </label>
                    <input
                      className="form-control border-terciary border rounded-pill px-3"
                      type="number"
                      placeholder="Capacidad pasajeros"
                      {...register("numeroCedula")}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-3 mt-3">
                  <label className="form-floating text-terciary input-group input-group-dynamic ms-2 mt-1">
                    ¿Acompañamiento policial/militar?{" "}
                    <div className="col-12 ">
                      <Controller
                        name="acompañamiento"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="mt-2"
                            options={optionsSiNo}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  </label>
                </div>
                <div className="col-12 col-sm-3 mt-3">
                  <label className="form-floating input-group input-group-dynamic ms-2 text-terciary">
                    Transporta carga{" "}
                    <div className="col-12 ">
                      <Controller
                        name="capacidad"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="mt-3"
                            options={optionsSiNo}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-sm-3">
                  <label className="form-floating input-group input-group-dynamic text-terciary ms-2">
                    Departamento{" "}
                    <div className="col-12 ">
                      <Controller
                        name="departamento"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="mt-2"
                            options={optionsSiNo}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  </label>
                </div>
                <div className="col-12 col-sm-3">
                  <label className="form-floating text-terciary input-group input-group-dynamic ms-2 ">
                    Municipio{" "}
                    <div className="col-12 ">
                      <Controller
                        name="municipio"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="mt-2"
                            options={optionsSiNo}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  </label>
                </div>
                <div className="col-12 col-sm-3">
                  <label className="form-floating text-terciary input-group input-group-dynamic ms-2">
                    Predio{" "}
                    <div className="col-12 ">
                      <Controller
                        name="predio"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="mt-2"
                            options={optionsSiNo}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  </label>
                </div>
                <div className="col-12 col-sm-3">
                  <label className="text-terciary" htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de salida
                    <Controller
                      name="fechaSalida"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          dateFormat="dd/MM/yyyy"
                          selected={formValues.fechaSalida}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaSalida: e })
                          }
                          className="form-control border rounded-pill border-terciary px-3 mt-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </label>
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <label className="text-terciary" htmlFor="exampleFormControlInput1">
                  Fecha de llegada
                  <Controller
                    name="fechallegada"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        selected={formValues.fechaLlegada}
                        onSelect={(e) =>
                          setFormValues({ ...formValues, fechaLlegada: e })
                        }
                        className="form-control border-terciary border rounded-pill px-3 mt-2"
                        placeholderText="dd/mm/aaaa"
                      />
                    )}
                  />
                </label>
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
            </div>
          </form>
          <form>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-primary me-md-2 text-white border rounded-pill text-capitalize"
                type="submit"
                title="Send"
              >
                Guardar
              </button>
              <button
                className="btn bg-primary text-white border rounded-pill text-capitalize"
                type="submit"
                title="Send"
              >
                Limpiar
              </button>
            </div>
          </form>
        </form>
      </div>
    </div>
  );
};

export default SolicitudVehiculoScreen;
