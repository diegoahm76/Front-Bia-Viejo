
// import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from 'ag-grid-react';
import { useForm, Controller } from "react-hook-form";

import React, { useState } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const options = [
  { label: "Acacías", value: "Acac" },
  { label: "Barranca de Upía", value: "Barra" },
  { label: "Cabuyaro", value: "Cabuy" },
  { label: "Castilla La Nueva", value: "Cast" },
  { label: "Cubarral", value: "Cuba" },
  { label: "Cumaral", value: "Cuma" },
  { label: "El Calvario", value: "Elca" },
];
const opcionesSiembra = [
  { label: "Enero", value: "Enero" },
  { label: "Febrero", value: "Febrero" },
  { label: "Marzo", value: "Marzo" },
  { label: "Abril", value: "Abril" },
  { label: "Mayo", value: "Mayo" },
  { label: "Junio", value: "Junio" },
  { label: "Julio", value: "Julio" },
  { label: "Agosto", value: "Agosto" },
  { label: "Septiembre", value: "Septiembre" },
  { label: "Octubre", value: "Octubre" },
  { label: "Noviembre", value: "Noviembre" },
  { label: "Diciembre", value: "Diciembre" },
]

const InventarioViveroCompensacion = () => {

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

  const [renderParcial, setRenderParcial] = useState(false)
  const [renderParcial2, setRenderParcial2] = useState(false)
  const [renderParcial3, setRenderParcial3] = useState(false)
  const [renderParcial4, setRenderParcial4] = useState(false)

  const onSubmitGuardar = (data) => {
    setBotonGuardar({
      tamano: data.tamano,
      cantidad: data.cantidad,
      etapaMaterialVegetal: data.etapaMaterialVegetal,
    });
  };

  const [botonGuardar, setBotonGuardar] = useState({
    tamano: "",
    cantidad: "",
    etapaMaterialVegetal: "",
  });


  const [selector, setSelector] = useState({
    seleccioneVivero: "",
  });

  const onSubmit = (data) => {
    setSelector({
      seleccioneVivero: data.seleccioneVivero,
    });
  };


  let gridApi
  const columnDefs = [
    { headerName: "nombre común", field: "nombrecomún" },
    { headerName: "Descripcion", field: "descripcion", },
    { headerName: "Cantidad en el vivero", field: "cantidadenelvivero", },

  ]
  const rowData = [
    { nombrecomún: "palo cruz", descripcion: "Isidorea Pungens", cantidadenelvivero: "250Kg" },
    { nombrecomún: "pomarrosa", descripcion: "Syzygium jambos", cantidadenelvivero: "134Kg" },
    { nombrecomún: "achiote", descripcion: "", cantidadenelvivero: "650Kg" },
    { nombrecomún: "pomarrosa", descripcion: "Syzygium jambos", cantidadenelvivero: "134Kg" },
    { nombrecomún: "achiote", descripcion: "", cantidadenelvivero: "650Kg" }



  ]
  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
  const onGridReady = (params) => {
    gridApi = params.api
  }




  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Crear material vegetal</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <div className="row my-2  align-items-center  ">
              <div className="form-group mt-3 col-12 col-sm-4 col-lg-4">
                <label className="font-weight" htmlFor="cantidadKg">
                  Seleccione vivero:
                </label>

                <Controller
                  name="seleccioneVivero"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.seleccioneVivero && (
                  <small className="text-danger">Este campo es obligatorio</small>
                )}

              </div>
              <div className="col-12 col-sm-4 col-lg-4 mt-5">
                <button
                  className="border rounded-pill px-3 btn bg-gradient-primary mb-0 text-capitalize"
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </div>


            {
              selector.seleccioneVivero && (

                <div className="multisteps-form__content">
                  <div className="button-row d-flex mt-4 align-items-center ">
                    <div className="font-weight col-6 col-sm-4 ">
                      <label className="font-weight">Periodo de siembra</label>
                      <Controller
                        name="periodoSiembra"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={opcionesSiembra}
                            placeholder="Seleccione"
                          />
                        )}
                      />
                      {errors.periodoSiembra && (
                        <small className="text-danger">Este campo es obligatorio</small>
                      )}
                    </div>

                    <div className="col-6 col-sm-4 ms-4 mt-4">
                      <label className="font-weight">Lote de siembra:</label>
                      <label className="mt-3">000</label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="font-weight">Material vegetal a ingresar:</label>
                  </div>

                  <div className="ag-theme-alpine mt-auto mb-2" style={{ height: '225px' }}>
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    >
                    </AgGridReact>
                  </div>

                  <div className="font-weight">
                    <label className="font-weight">Cantidad sembrada</label>
                    <div className="font-weight ms-2">
                      <span>0050 Kg</span>
                    </div>

                  </div>

                  <div className="col-12 col-sm-4 col-lg-4 mb-3">
                    <label>
                      Cantidad a sembrar: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border rounded-pill px-3"
                      {...register("nombreUsuario", { required: true })}
                    />
                    {errors.nombreUsuario && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>


                  <div className="button-row d-flex mb-2 mt-4">
                    <div className="font-weight col-3 col-sm-3 ">
                      <label> Cama de germinacion N°</label>
                    </div>
                    <div className="col-3 col-sm-2 ms-4">
                      <label> Llena totalmente</label>
                    </div>
                    <div className="col-3 col-sm-3 ms-4">
                      <label> Llenado parcial</label>
                    </div>
                    <div className="col-3 col-sm-2 ms-4">

                    </div>
                  </div>


                  <div className="button-row d-flex mb-3">
                    <div className="font-weight col-3 col-sm-3 ">
                      <label> Cama de germinacion 1</label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-2">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio1" id="idbotonRadioLLeno1" onClick={() => setRenderParcial(false)} />
                      <label className="form-check-label" htmlFor="idbotonRadioLLeno1">
                        Lleno
                      </label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-4">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio1" id="idbotonRadioParcial1" onClick={() => setRenderParcial(true)} />
                      <label className="form-check-label" htmlFor="idbotonRadioParcial1">
                        Parcial
                      </label>
                    </div>
                    {
                      renderParcial && (
                        <div className="col-12 col-sm-4 col-lg-4 mb-3">
                          <label>
                            Escribe el porcentaje: <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            //name="valorPorcentaje1"
                            className="form-control border rounded-pill px-3"
                            {...register("valorPorcentaje1", { required: true })}
                          />
                          {errors.valorPorcentaje1 && (
                            <div className="col-12">
                              <small className="text-center text-danger">
                                Este campo es obligatorio
                              </small>
                            </div>
                          )}
                        </div>
                      )}
                  </div>




                  <div className="button-row d-flex mb-3">
                    <div className="font-weight col-3 col-sm-3 ">
                      <label> Cama de germinacion 2</label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-2">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio2" id="idbotonRadioLleno2" onClick={() => setRenderParcial2(false)} />
                      <label className="form-check-label" htmlFor="idbotonRadioLleno2">
                        Lleno
                      </label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-4">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio2" id="idbotonRadioParcial2" onClick={() => setRenderParcial2(true)} />
                      <label className="form-check-label" htmlFor="idbotonRadioParcial2">
                        Parcial
                      </label>
                    </div>
                    {
                      renderParcial2 && (
                        <div className="col-12 col-sm-4 col-lg-4 mb-3">
                          <label>
                            Escribe el porcentaje: <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                           // name="valorPorcentaje2"
                            className="form-control border rounded-pill px-3"
                            {...register("valorPorcentaje2", { required: true })}
                          />
                          {errors.valorPorcentaje2 && (
                            <div className="col-12">
                              <small className="text-center text-danger">
                                Este campo es obligatorio
                              </small>
                            </div>
                          )}
                        </div>
                      )}
                  </div>



                  <div className="button-row d-flex mb-3">
                    <div className="font-weight col-3 col-sm-3 ">
                      <label> Cama de germinacion 3</label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-2">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio3" id="idbotonRadioLleno3" onClick={() => setRenderParcial3(false)} />
                      <label className="form-check-label" htmlFor="idbotonRadioLleno3">
                        Lleno
                      </label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-4">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio3" id="idbotonRadioParcial3" onClick={() => setRenderParcial3(true)} />
                      <label className="form-check-label" htmlFor="idbotonRadioParcial3">
                        Parcial
                      </label>
                    </div>
                    {
                      renderParcial3 && (
                        <div className="col-12 col-sm-4 col-lg-4 mb-3">
                          <label>
                            Escribe el porcentaje: <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                           // name="valorPorcentaje3"
                            className="form-control border rounded-pill px-3"
                            {...register("valorPorcentaje3", { required: true })}
                          />
                          {errors.valorPorcentaje3 && (
                            <div className="col-12">
                              <small className="text-center text-danger">
                                Este campo es obligatorio
                              </small>
                            </div>
                          )}
                        </div>
                      )}
                  </div>



                  <div className="button-row d-flex mb-3">
                    <div className="font-weight col-3 col-sm-3 ">
                      <label> Cama de germinacion 4</label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-2">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio4" id="idbotonRadioLleno4" onClick={() => setRenderParcial4(false)} />
                      <label className="form-check-label" htmlFor="idbotonRadioLleno4">
                        Lleno
                      </label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-4">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio4" id="idbotonRadioParcial4" onClick={() => setRenderParcial4(true)} />
                      <label className="form-check-label" htmlFor="idbotonRadioParcial4">
                        Parcial
                      </label>
                    </div>
                    {
                      renderParcial4 && (
                        <div className="col-12 col-sm-4 col-lg-4 mb-3">
                          <label>
                            Escribe el porcentaje: <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                         //   name="valorPorcentaje4"
                            className="form-control border rounded-pill px-3"
                            {...register("valorPorcentaje4", { required: true })}
                          />
                          {errors.valorPorcentaje4 && (
                            <div className="col-12">
                              <small className="text-center text-danger">
                                Este campo es obligatorio
                              </small>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-danger me-md-2"
                      type="button"
                      title="Send"
                    >
                      Cancelar
                    </button>
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary "
                      type="submit"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
};


export default InventarioViveroCompensacion;
