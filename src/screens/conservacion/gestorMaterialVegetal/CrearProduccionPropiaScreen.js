import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Subtitle from "../../../components/Subtitle";

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

  const [botonGuardar, setBotonGuardar] = useState({
    tamano: "",
    cantidad: "",
    etapaMaterialVegetal: "",
  });

  const [selectores, setSelectores] = useState({
    seleccioneVivero: "",
    periodoSiembra: "",
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
      vivero: "5000",
    },
    {
      nombre: "Pomarroso",
      descripcion: " ",
      vivero: "6500",
    },
    {
      nombre: "Ceiba",
      descripcion: " ",
      vivero: "3650",
    },
    {
      nombre: "Flor amarillo",
      descripcion: " ",
      vivero: "14256",
    },
    {
      nombre: "Flor morado",
      descripcion: " ",
      vivero: "12360",
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
      <div className=" col-12 mx-auto">
        <div className="multisteps-form__content">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-rigth  fw-light mb-3 mb-2">
              Producción Propia
            </h3>
            <div className="row">
              <Subtitle title="información general" mb="3" />
              <div className="col-12 col-sm-3">
                <label className="form-control ms-3">
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
              <div className="col-12 col-sm-3">
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
              <div className="col-12 col-md-3 mt-4">
                <div className="d-grid gap-2 d-flex">
                  <button
                    type="submit"
                    className="btn text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    title="Buscar"
                  >
                   <i class="fa-solid fa-magnifying-glass fs-3"></i>
                  </button>
                </div>
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
                <Subtitle title="información del material vegetal" mb="3" />
                <div className="col-12 col-sm-3">
                  <label className="form-control ms-3">
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
                  <div className="row">
                    <Subtitle
                      title="información del producto a ingresar"
                      mb="3"
                    />
                    <div className="col-12 col-sm-3 mt-3">
                      <div>
                        <label className="ms-2 text-terciary ">Cantidad</label>
                        <input
                          className="form-control border border-terciary rounded-pill px-3"
                          type="number"
                          placeholder="cantidad"
                          name="cantidad"
                          {...register2("cantidad", { required: true })}
                        />
                        {errors2.cantidad && (
                          <small className="text-danger">
                            Este campo es obligatorio
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 mt-3">
                      <div>
                        <label className="ms-2 text-terciary ">Tamaño promedio (cm)</label>
                        <input
                          className="form-control border border-terciary rounded-pill px-3"
                          type="number"
                          placeholder="Tamaño Promedio (cm)"
                          name="tamano"
                          {...register2("tamano", { required: true })}
                        />
                        {errors2.tamano && (
                          <small className="text-danger">
                            Este campo es obligatorio
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 mt-3">
                      <label className="text-terciary">
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
                      className="btn  me-md-2 text-capitalize text-dark"
                      type="submit"
                      title="Cancelar"
                    >
                <i class="fa-solid fa-x fs-3"></i>
                    </button>
                    <button
                      className="btn  text-capitalize"
                      type="submit"
                      title="Guardar"
                    >
                     <i class="fa-regular fa-floppy-disk fs-3"></i>
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
