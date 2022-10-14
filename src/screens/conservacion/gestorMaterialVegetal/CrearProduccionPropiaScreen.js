import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CrearProduccionPropiaScreen = () => {
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

  const [selectores, setSelectores] = useState({
    seleccioneVivero: "",
    periodoSiembra: "",
  });

  const [botonGuardar, setBotonGuardar] = useState({
    tamano: "",
    cantidad: "",
    etapaMaterialVegetal: "",
  });

  const onSubmit = (data) => {
    console.log(data);
    setSelectores({
      seleccioneVivero: data.seleccioneVivero,
      periodoSiembra: data.periodoSiembra,
    });
  };
  const onSubmitGuardar = (data) => {
    console.log(data);
    setBotonGuardar({
      tamano: data.tamano,
      cantidad: data.cantidad,
      etapaMaterialVegetal: data.etapaMaterialVegetal,
    });
  };

  const [rowData] = useState([
    {
      nombre: "Palo cruz",
      descripcion: " ",
      vivero: "",
    },
    {
      nombre: "Palo cruz",
      descripcion: " ",
      vivero: "",
    },
    {
      nombre: "Palo cruz",
      descripcion: " ",
      vivero: "",
    },
    {
      nombre: "Palo cruz",
      descripcion: " ",
      vivero: "",
    },
    {
      nombre: "Palo cruz",
      descripcion: " ",
      vivero: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Nombre Comun", field: "nombre" },
    { headerName: "Descripcion", field: "descripcion" },
    { headerName: "Cantidad en vivero", field: "vivero" },
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
    { label: "Enero", value: "EN" },
    { label: "Febrero", value: "FEB" },
    { label: "Marzo", value: "MAR" },
    { label: "Abril", value: "ABR" },
    { label: "Mayo", value: "MAY" },
    { label: "Junio", value: "JUN" },
    { label: "Julio", value: "JUL" },
    { label: "Agosto", value: "AGS" },
    { label: "Septiembre", value: "SEP" },
    { label: "Octubre", value: "OCT" },
    { label: "Noviembre", value: "NOV" },
    { label: "Diciembre", value: "DIC" },
  ];
  const optionsSizeEtapa = [
    { label: "Eras de producción", value: "EP" },
    { label: "Distribución", value: "D" },
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

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Producción Propia</h3>
        <div className="multisteps-form__content">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-12 col-sm-6">
                <label className="form-control ms-0">
                  Seleccionar vivero <span className="text-danger">*</span>
                </label>
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
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-control ms-0">
                  Periodo de Siembra <span className="text-danger">*</span>
                </label>
                <Controller
                  name="periodoSiembra"
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
                {errors.periodoSiembra && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 d-flex justify-content-end">
                <button
                  type="submit"
                  className="mt-3 btn btn-primary flex-center text-capitalize"
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
          {selectores.seleccioneVivero && selectores.periodoSiembra ? (
            <form
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit2(onSubmitGuardar)}
            >
              <div className="row">
                <div className="col-12 col-sm-6">
                  <label className="form-control ms-0">
                    Lote de siembra No.
                  </label>
                </div>
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
                  <label className="form-control ms-0 fs-6">
                    Información del producto a ingresar{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="row">
                    <div className="col-6 col-sm-6 ">
                      <label
                        className="form-control ms-0"
                        htmlFor="exampleFormControlInput1"
                      >
                        Cantidad
                      </label>
                      <div className="input-group input-group-dynamic">
                        <input
                          className="multisteps-form__input form-control"
                          type="text"
                          placeholder="Cantidad"
                          name="cantidad"
                          {...register2("cantidad", { required: true })}
                        />
                      </div>
                      {errors2.cantidad && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                    <div className="col-6 col-sm-6 ">
                      <label className="form-control ms-0">
                        Tamaño promedio (cm)
                      </label>
                      <div className="input-group input-group-dynamic">
                        <input
                          className="multisteps-form__input form-control"
                          type="text"
                          placeholder="Tamaño Promedio (cm)"
                          name="tamano"
                          {...register2("tamano", { required: true })}
                        />
                      </div>
                      {errors2.tamano && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                    <div className="col-2 col-sm-6">
                      <label className="form-control ms-0">
                        Etapa del material vegetal
                      </label>
                      <Controller
                        name="etapaMaterialVegetal"
                        control={control2}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={optionsSizeEtapa}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors2.etapaMaterialVegetal && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    <button
                      className="btn bg-gradient-light me-md-2 text-capitalize text-dark"
                      type="submit"
                      title="Send"
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn bg-primary text-white text-capitalize"
                      type="submit"
                      title="Send"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearProduccionPropiaScreen;
