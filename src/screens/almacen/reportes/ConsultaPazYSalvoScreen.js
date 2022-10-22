import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";

import CalendarModal from "../../../components/CalendarModal";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

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

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Consultar paz y salvo </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="multisteps-form__content">
              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center">
                  <n>Consultar persona</n>
                </label>
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="mt-4 row">
                <div className="col-12 col-md-4">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Tipo de documento <small className="text-danger">*</small>
                    <div className="col-12 ">
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

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      name="numeroCedula"
                      className="form-control"
                      type="text"
                      placeholder="numero cedula"
                      {...register("numeroCedula", { required: true })}
                    />
                    <label className="ms-2">
                      Número de cedula<small className="text-danger">*</small>
                    </label>
                  </div>
                  {errors.numeroCedula && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nombre completo"
                      value="Julian Castillo"
                      disabled
                      {...register("nombreCompleto")}
                    />
                    <label className="ms-2">Nombre completo</label>
                  </div>
                  {errors.codigoArticulo && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className=" row">
              <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                <button
                  className="btn bg-gradient-primary mb-0 text-capitalize"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaPersonalIsActive(true)}
                >
                  Buscar personal
                </button>
              </div>
            </div>

            <div className="row">
              <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                <button
                  className="btn bg-gradient-primary mb-0 text-capitalize"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Buscar
                </button>
              </div>
            </div>

            {selecDocumento.tipoDocumento && selecDocumento.numeroCedula ? (
              <div>
                <div className="multisteps-form__content">
                  <div className="row">
                    <label className="form-control ms-0 fw-bolder text-center mt-4">
                      <n>
                        Se puede generar paz y salvo, la persona selecionana no
                        cuenta con elementos a su cargo
                      </n>
                    </label>
                  </div>
                  <div className="mt-1 row">
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
                  <div className=" d-grid gap-2 d-flex justify-content-end  mt-3">
                    <button
                      className="btn bg-gradient-primary mb-0 text-capitalize"
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
          </MarcaDeAgua1>
        </form>
        ç
        <BusquedaDePersonalModal
          isModalActive={busquedaPersonalIsActive}
          setIsModalActive={setBusquedaPersonalIsActive}
        />
        <CalendarModal>
          <MarcaDeAgua1>
            <div className="row min-vh-100">
              <div className="col-lg-10 col-md-10 col-12 mx-auto"></div>

              <div className="row min-vh-100">
                <div className="col-lg-8 col-md-10 col-6 mx-auto">
                  <form
                    className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                    data-animation="FadeIn"
                    id="configForm"
                  >
                    <div className="multisteps-form__content">
                      <div className="row">
                        <label className="form-control ms-0 fw-bolder text-center">
                          <n>Certificado de paz y salvo</n>
                        </label>
                        <label>
                          el grupo de almacen da como constancia que la
                          personala{" "}
                          <small className="text-danger">PEPITO PEREZ</small>{" "}
                          identificado con el numero de cedula{" "}
                          <small className="text-danger">1.121.957.666</small>{" "}
                          seencuentra en paz y salvo ya que todos los elementos
                          asignados a su nombre fueron devueltos con exito a la
                          corporacion{" "}
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-column justify-content-end align-items-end">
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div className="form-floating input-group input-group-dynamic">
                            <input
                              name="nombreQuienImprime"
                              className="form-control"
                              type="text"
                              placeholder="Nombre del articulo"
                              value="Julian Castillo"
                              disabled
                            />
                            <label className="ms-2">Nombre quien imprime</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div className="form-floating input-group input-group-dynamic">
                            <input
                              name="fechaDeImpresion"
                              className="form-control"
                              type="text"
                              placeholder="fecha de impresion"
                              value="05/10/2022"
                              disabled
                            />
                            <label className="ms-2">Fecha de impresion</label>
                          </div>
                        </div>
                      </div>

                      <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                        <button
                          className="btn bg-gradient-primary mb-0"
                          type="button"
                          title="Send"
                          form="configForm"
                        >
                          Imprimir
                        </button>
                        <button
                          className="btn bg-gradient-danger mb-0"
                          onClick={handleCloseModal}
                          type="submit"
                          title="Send"
                          form="configForm"
                        >
                          Salir
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </MarcaDeAgua1>
        </CalendarModal>
      </div>
    </div>
  );
};

export default ConsultaPazYSalvoScreen;
