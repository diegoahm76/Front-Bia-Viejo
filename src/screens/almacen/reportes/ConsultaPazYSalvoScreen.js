import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";

import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";

import CalendarModal from "../../../components/CalendarModal";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import Subtitle from "../../../components/Subtitle";

const ConsultaPazYSalvoScreen = () => {
  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);

  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [selecDocumento, setSelecDocumento] = useState({
    tipoDocumento: "",
    numeroCedula: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setMostrarTabla(true);
    setSelecDocumento({
      ...selecDocumento,
      tipoDocumento: data.tipoDocumento.value,
      numeroCedula: data.numeroCedula,
    });
  };

  const optionsTipoDocumento = [
    { label: "C.C", value: "CC" },
    { label: "T.I", value: "TI" },
  ];

  let gridApi;

  const columnDefs = [
    {
      headerName: "Codigo de articulo",
      field: "Codigo de articulo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre",
      field: "Nombre",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "ID",
      field: "ID",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Maraca",
      field: "Marca",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Serial",
      field: "Serial",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Codigo de articulo": "12345",
      Nombre: "Computador",
      ID: "12346",
      Marca: "Lenovo",
      Serial: "72h634",
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: false,
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

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(activeModalAction());
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Consultar paz y salvo{" "}
            </h3>

            <Subtitle title="Datos de la persona" mt="3" />

            <div className="multisteps-form__content ms-2">
              <div className="mt-4 row">
                <div className="col-12 col-md-3">
                  <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                    Tipo de documento <small className="text-danger">*</small>
                    <div className="col-12 mt-3">
                      <Controller
                        name="tipoDocumento"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={optionsTipoDocumento}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                    {errors.tipoDocumento && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </label>
                </div>

                <div className="col-12 col-md-3">
                  <label className="text-terciary ms-2">
                    Número de cedula<small className="text-danger">*</small>
                  </label>
                  <input
                    name="numeroCedula"
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    {...register("numeroCedula", { required: true })}
                  />
                  {errors.numeroCedula && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12 col-md-3">
                  <label className="text-terciary ms-2">Nombre completo</label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    value="Julian Castillo"
                    disabled
                    {...register("nombreCompleto")}
                  />

                  {errors.codigoArticulo && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12 col-md-3 mt-2">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="button"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaPersonalIsActive(true)}
                  >
                    Buscar personal
                  </button>
                </div>
              </div>
            </div>

            <div className="row ms-2">
              <div className="col-12 col-md-3 ">
                <button
                  className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width text-capitalize"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Buscar
                </button>
              </div>
            </div>

            {selecDocumento.tipoDocumento && selecDocumento.numeroCedula ? (
              <div className="multisteps-form__content ">
                <div className="mt-4 row text-center">
                  <label>
                    <b>
                      Se puede generar paz y salvo, la persona selecionana no
                      cuenta con elementos a su cargo
                    </b>
                  </label>
                </div>

                <div className="row">
                  <div id="myGrid" className="ag-theme-alpine mt-4">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: "400px" }}
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

                <div className="row ">
                  <div className="mt-3 d-flex justify-content-end">
                    <button
                      className="btn btn-primary text-capitalize border rounded-pill px-3  btn-min-width text-capitalize"
                      onClick={handleOpenModal}
                      type="button"
                      title="Send"
                      form="configForm"
                    >
                      Generar paz y salvo
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>

          <BusquedaDePersonalModal
            isModalActive={busquedaPersonalIsActive}
            setIsModalActive={setBusquedaPersonalIsActive}
          />
          <CalendarModal>
            <div className="row ">
              <div className="col-lg-8 col-md-10 col-6 mx-auto">
                <form
                  className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                  data-animation="FadeIn"
                  id="configForm"
                >
                  <div className="multisteps-form__content">
                    <div className="row">
                      <label className="text-terciary form-control ms-0 fw-bolder text-center">
                        <n>Certificado de paz y salvo</n>
                      </label>
                      <label>
                        el grupo de almacen da como constancia que la personala{" "}
                        <small className="text-danger">PEPITO PEREZ</small>{" "}
                        identificado con el numero de cedula{" "}
                        <small className="text-danger">1.121.957.666</small>{" "}
                        seencuentra en paz y salvo ya que todos los elementos
                        asignados a su nombre fueron devueltos con exito a la
                        corporacion{" "}
                      </label>
                    </div>
                  </div>

                  <div className="mt-4 justify-content-end align-items-end">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <label className="text-terciary ms-2">Nombre quien imprime</label>
                        <input
                          name="nombreQuienImprime"
                          className="border border-terciary form-control border rounded-pill px-3"
                          type="text"
                          placeholder="Nombre del articulo"
                          value="Julian Castillo"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="justify-content-end align-items-end">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <label className="text-terciary" htmlFor="exampleFormControlInput1 mt-4">
                          Fecha de impresion
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
                              onChange={(date) => setStartDate(date)}
                              className="border border-terciary form-control border rounded-pill px-3  p-2"
                              placeholderText="dd/mm/aaaa"
                              disabled
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 d-flex justify-content-end">
                      <div className=" d-grid gap-2 d-flex justify-content-end  mt-4 ">
                        <button
                          className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                          type="button"
                          title="Send"
                          form="configForm"
                        >
                          Imprimir
                        </button>

                        <button
                          className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-danger mb-0 text-capitalize"
                          type="button"
                          title="Send"
                          form="configForm"
                          onClick={handleCloseModal}
                        >
                          Salir
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </CalendarModal>
        </div>
      </div>
    </div>
  );
};

export default ConsultaPazYSalvoScreen;