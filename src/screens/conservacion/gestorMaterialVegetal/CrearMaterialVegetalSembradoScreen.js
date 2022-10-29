
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

  const [porcentaje, setPorcentaje] = useState(false);
  const [porcentaje2, setPorcentaje2] = useState(false);
  const [porcentaje3, setPorcentaje3] = useState(false);
  const [porcentaje4, setPorcentaje4] = useState(false);

  const { register, control, handleSubmit, formState: { errors } } = useForm();

  const [selecOpciones, setSelecOpciones] = useState({
    asignarViverista: ""
  });

  const onSubmit = (data) => {
    setSelecOpciones({
      asignarViverista: data.asignarViverista,
      porcentajeParcial: data.porcentajeParcial,
      porcentajeParcial2: data.porcentajeParcial,
      porcentajeParcial3: data.porcentajeParcial,
      porcentajeParcial4: data.porcentajeParcial,

    });
  };

  // Optional - for accessing Grid's API


  // Each Column Definition results in one Column.
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




  // DefaultColDef sets props common to all Columns

  // changes, needs to be state


  // gets called once, no dependencies, loads the grid data


  // Example of consuming Grid Event


  // Example load data from sever

  // Example using Grid's API

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Crear material vegetal</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <div className="row my-2  align-items-center  ">
              <div className="form-group mt-3 col-6 col-sm-6">
                <label className="font-weight" for="cantidadKg">
                  Seleccione vivero:
                </label>

                <Controller
                  name="asignarViverista"
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
                {errors.asignarViverista && (
                  <small className="text-danger">Este campo es obligatorio</small>
                )}

              </div>
              <div class="col-6 mt-5">
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

            {
              selecOpciones.asignarViverista && (
                <div className="multisteps-form__content">
                  <div className="button-row d-flex mt-4 align-items-center ">
                    <div className="font-weight col-6 col-sm-4 ">
                      <label className="font-weight">Periodo de siembra</label>
                      <Controller
                        name="option2"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={opcionesSiembra}
                            placeholder="Seleccione"
                          />
                        )}
                      />
                      {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

                    </div>

                    <div className="col-6 col-sm-4 ms-4 mt-4">
                      <label className="font-weight">Lote de siembra:</label>
                      <label className="mt-3">000</label>
                    </div>
                  </div>

                  <div className="mt-2">
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

                  <div className="form-group mt-3 col-12 col-sm-4">
                    <label className="font-weight" for="cantidadKg">Cantidad a sembrar</label>
                    <div className="input-group input-group-dynamic ">
                      <input
                        className="multisteps-form__input form-control "
                        type="text"
                        placeholder="Cantidad"
                        name="nombre"
                        {...register("nombre", { required: true })}
                      />
                      <label>Kg</label>
                    </div>
                    {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}

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
                      <input className="form-check-input" type="radio" name="nombrebotonRadio1" id="idbotonRadioLLeno1" onChange={() => setPorcentaje(false)} />
                      <label className="form-check-label" for="idbotonRadioLLeno1">
                        Lleno
                      </label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-4">
                      <input class="form-check-input" type="radio" name="nombrebotonRadio1" id="idbotonRadioParcial1" onChange={() => setPorcentaje(true)} />
                      <label class="form-check-label" for="idbotonRadioParcial1">
                        Parcial
                      </label>
                    </div>

                    {
                      porcentaje && (

                        <div className="input-group input-group-dynamic ">
                          <input
                            className="multisteps-form__input form-control "
                            type="text"
                            placeholder="Escribe el porcentaje"
                            name="nombre"
                            {...register("nombre", { required: true })}
                          />
                          <label>%</label>

                        </div>
                      )
                    }
                  </div>



                  <div className="button-row d-flex mb-3">
                    <div className="font-weight col-3 col-sm-3 ">
                      <label> Cama de germinacion 2</label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-2">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio2" id="idbotonRadioLleno2" onChange={() => setPorcentaje2(false)} />
                      <label className="form-check-label" for="idbotonRadioLleno2">
                        Lleno
                      </label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-4">
                      <input class="form-check-input" type="radio" name="nombrebotonRadio2" id="idbotonRadioParcial2" onChange={() => setPorcentaje2(true)} />
                      <label class="form-check-label" for="idbotonRadioParcial2">
                        Parcial
                      </label>
                    </div>
                    {
                      porcentaje2 && (

                        <div className="input-group input-group-dynamic ">
                          <input
                            className="multisteps-form__input form-control "
                            type="text"
                            placeholder="Escribe el porcentaje"
                            name="nombre"
                            {...register("nombre", { required: true })}
                          />
                          <label>%</label>

                        </div>
                      )
                    }

                  </div>



                  <div className="button-row d-flex mb-3">
                    <div className="font-weight col-3 col-sm-3 ">
                      <label> Cama de germinacion 3</label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-2">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio3" id="idbotonRadioLleno3" onChange={() => setPorcentaje3(false)} />
                      <label className="form-check-label" for="idbotonRadioLleno3">
                        Lleno
                      </label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-4">
                      <input class="form-check-input" type="radio" name="nombrebotonRadio3" id="idbotonRadioParcial3" onChange={() => setPorcentaje3(true)} />
                      <label class="form-check-label" for="idbotonRadioParcial3">
                        Parcial
                      </label>
                    </div>
                    {
                      porcentaje3 && (

                        <div className="input-group input-group-dynamic ">
                          <input
                            className="multisteps-form__input form-control "
                            type="text"
                            placeholder="Escribe el porcentaje"
                            name="nombre"
                            {...register("nombre", { required: true })}
                          />
                          <label>%</label>

                        </div>
                      )
                    }
                  </div>



                  <div className="button-row d-flex mb-3">
                    <div className="font-weight col-3 col-sm-3 ">
                      <label> Cama de germinacion 4</label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-2">
                      <input className="form-check-input" type="radio" name="nombrebotonRadio4" id="idbotonRadioLleno4" onChange={() => setPorcentaje4(false)} />
                      <label className="form-check-label" for="idbotonRadioLleno4">
                        Lleno
                      </label>
                    </div>
                    <div className="form-check col-3 col-sm-2 ms-4">
                      <input class="form-check-input" type="radio" name="nombrebotonRadio4" id="idbotonRadioParcial4" onChange={() => setPorcentaje4(true)} />
                      <label class="form-check-label" for="idbotonRadioParcial4">
                        Parcial
                      </label>
                    </div>
                    {
                      porcentaje4 && (

                        <div className="input-group input-group-dynamic ">
                          <input
                            className="multisteps-form__input form-control "
                            type="text"
                            placeholder="Escribe el porcentaje"
                            name="nombre"
                            {...register("nombre", { required: true })}
                          />
                          <label>%</label>

                        </div>
                      )
                    }
                  </div>


                  <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    <button
                      className="btn bg-gradient-danger me-md-2"
                      type="button"
                      title="Send"
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn bg-gradient-primary "
                      type="button"
                      title="Send"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </form >
      </div >
    </div >
  );
};


export default InventarioViveroCompensacion;
