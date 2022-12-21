
// import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from 'ag-grid-react';
import { useForm, Controller } from "react-hook-form";
import Subtitle from '../../../components/Subtitle'
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
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Crear material vegetal sembrado
            </h3>
            <Subtitle title="Sembrado" mt={3} />
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
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
              <div className="col-12 col-md-3">
                <button
                  type="submit"
                  className="btn-min-width border rounded-pill mt-2 px-3 btn "
                  title="Buscar"
                >
                  <i class="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
            </div>
          </form>
          {
            selecOpciones.asignarViverista && (

              <form className="row" onSubmit={handleSubmit2(onSubmit)}>
                <div className="row d-flex align-items-end mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Periodo de siembra
                    </label>
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

                  <div className="row d-flex align-items-end mt-2 ">
                    <div className="col-12 col-md-3 mb-3">
                      <label className="text-terciary">
                        Lote de siembra:
                      </label>
                      <label className="text-terciary">
                        000
                      </label>
                    </div>
                  </div>
                </div>


                <Subtitle title="Material vegetal a ingresar" mb={3} />
                <div className="row d-flex align-items-end mt-2 mx-2">

                  <div id="myGrid" className="ag-theme-alpine mb-3">
                    <div
                      className="ag-theme-alpine "
                      style={{ height: "225px" }}
                    >              <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    >
                      </AgGridReact>
                    </div>
                  </div>
                </div>

                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Cantidad sembrada
                    </label>
                    <div className="font-weight ms-2">
                      <label className="text-terciary">
                        0050 KG
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Cantidad a sembrar
                    </label>
                    <input
                      className="form-control border border-terciary rounded-pill px-3"
                      type="text"
                      placeholder="Cantidad KG"
                      name="nombre"
                      {...register("nombre", { required: true })}
                    />

                    {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}
                  </div>
                </div>


                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Cama de germinacion N°
                    </label>
                  </div>
                  <div className="col-12 col-md-2 mb-3 ">
                    <label className="text-terciary">
                      Llena totalmente
                    </label>
                  </div>
                  <div className="col-12 col-md-2 mb-3 ms-5">
                    <label className="text-terciary">
                      Llenado parcial
                    </label>
                  </div>
                  <div className="col-12 col-md-3 mb-3">

                  </div>
                </div>


                <div className="row align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Cama de germinacion 1
                    </label>
                  </div>
                  <div className="form-check col-12 col-md-2 ms-2">
                    <input className="form-check-input" type="radio" name="nombrebotonRadio1" id="idbotonRadioLLeno1" onChange={() => setPorcentaje(false)} />
                    <label className="text-terciary">
                      Lleno
                    </label>
                  </div>
                  <div className="form-check col-12 col-md-2 ms-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nombrebotonRadio1"
                      id="idbotonRadioParcial1"
                      onChange={() => setPorcentaje(true)}
                    />
                    <label className="text-terciary">
                      Parcial
                    </label>
                  </div>

                  {
                    porcentaje && (

                      <div className="col-12 col-md-4 mb-3">
                        <input
                          className="form-control border border-terciary rounded-pill px-3 mt-2"
                          type="text"
                          placeholder="Escribe el porcentaje de la cama de germinación"
                          name="porcentajeParcial1"
                          {...register("porcentajeParcial1", { required: true })}
                        />
                        {errors.porcentajeParcial1 && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>

                    )
                  }
                </div>



                <div className="row align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Cama de germinacion 2
                    </label>
                  </div>
                  <div className="form-check col-12 col-md-2 ms-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nombrebotonRadio2"
                      id="idbotonRadioLleno2"
                      onChange={() => setPorcentaje2(false)}
                    />
                    <label className="text-terciary">
                      Lleno
                    </label>
                  </div>
                  <div className="form-check col-12 col-md-2 ms-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="nombrebotonRadio2"
                      id="idbotonRadioParcial2"
                      onChange={() => setPorcentaje2(true)}
                    />
                    <label className="text-terciary">
                      Parcial
                    </label>
                  </div>
                  {
                    porcentaje2 && (

                      <div className="col-12 col-md-4 mb-3">
                        <input
                          className="form-control border border-terciary rounded-pill px-3 mt-2"
                          type="text"
                          placeholder="Escribe el porcentaje de la cama de germinación"
                          name="porcentajeParcial2"
                          {...register("porcentajeParcial2", { required: true })}
                        />
                        {errors.porcentajeParcial2 && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    )
                  }
                </div>



                <div className="row align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Cama de germinacion 3
                    </label>
                  </div>
                  <div className="form-check col-12 col-md-2 ms-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nombrebotonRadio3"
                      id="idbotonRadioLleno3"
                      onChange={() => setPorcentaje3(false)}
                    />
                    <label className="text-terciary">
                      Lleno
                    </label>
                  </div>
                  <div className="form-check col-12 col-md-2 ms-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nombrebotonRadio3"
                      id="idbotonRadioParcial3"
                      onChange={() => setPorcentaje3(true)}
                    />
                    <label className="text-terciary">
                      Parcial
                    </label>
                  </div>
                  {
                    porcentaje3 && (
                      <div className="col-12 col-md-4 mb-3">
                        <input
                          className="form-control border border-terciary rounded-pill px-3 mt-2"
                          type="text"
                          placeholder="Escribe el porcentaje de la cama de germinación"
                          name="porcentajeParcial3"
                          {...register("porcentajeParcial3", { required: true })}
                        />
                        {errors.porcentajeParcial3 && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    )
                  }
                </div>



                <div className="row align-items-center mt-2 mx-2">
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Cama de germinacion 3
                    </label>
                  </div>
                  <div className="form-check col-12 col-md-2 ms-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nombrebotonRadio4"
                      id="idbotonRadioLleno4"
                      onChange={() => setPorcentaje4(false)} />
                    <label className="text-terciary">
                      Lleno
                    </label>
                  </div>
                  <div className="form-check col-12 col-md-2 ms-4">
                    <input className="form-check-input"
                      type="radio"
                      name="nombrebotonRadio4"
                      id="idbotonRadioParcial4"
                      onChange={() => setPorcentaje4(true)}
                    />
                    <label className="text-terciary">
                      Parcial
                    </label>
                  </div>
                  {
                    porcentaje4 && (

                      <div className="col-12 col-md-4 mb-3">
                        <input
                          className="form-control border border-terciary rounded-pill px-3 mt-2"
                          type="text"
                          placeholder="Escribe el porcentaje de la cama de germinación"
                          name="porcentajeParcial4"
                          {...register("porcentajeParcial4", { required: true })}
                        />
                        {errors.porcentajeParcial4 && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    )
                  }
                </div>


                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn  me-md-2"
                    type="button"
                    title="Cancelar"
                  >
                    <i class="fa-solid fa-x fs-3"></i>
                  </button>
                  <button
                    className="btn  "
                    type="button"
                    title="Guardar"
                  >
                    <i class="fa-regular fa-floppy-disk fs-3"></i>
                  </button>
                </div>
              </form>
            )
          }
        </div>
      </div>
    </div>
  );
};


export default InventarioViveroCompensacion;
