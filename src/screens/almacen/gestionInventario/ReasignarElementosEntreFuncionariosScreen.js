import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function ReasignarElementosEntreFuncionariosScreen() {
  {
    /*  DECLARAR VARIABLES  */
  }
  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };


  const {register, handleSubmit, control, formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setSelecOpciones({
      vivero: data.vivero,
    });
  };
  const [startDate, setStartDate] = useState(new Date());
  const CustomPlaceholder = ({ date, value, onChange }) => (
    <input style={{ border: "solid 1px black" }} />
  );

  const optionsTipoDocumento = [
    { label: "C.C.", value: "CC" },
    { label: "T.I.", value: "TI" },
  ];

  const optionsEstado = [
    { label: "Bueno", value: "B" },
    { label: "Malo", value: "M" },
    { label: "Defectuoso", value: "D" },
  ];

  let gridApi;
  const columnDefs = [
    {
      headerName: "Buscar",
      field: "buscar",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-primary mx-auto my-1 d-flex btn-sm text-xxs text-capitalize"
            onClick={() => actionButton(params)}>
            Buscar
          </button>
        </div>
      ),
    },
    {
      headerName: "Código",
      field: "codigo",
      minWidth: 100,
      wrapText: true,
     },
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "ID Único",
      field: "id",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Marca",
      field: "marca",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Serial",
      field: "serial",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Valor Unitario",
      field: "valorUnitario",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Estado",
      field: "estado",
      minWidth: 100,
      wrapText: true,
      cellRendererFramework: (params) => (
        <div>
          <Controller
                      name="estado"
                      control={control}
                      defaultValue={optionsEstado[0]}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionsEstado}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
        </div>
      ),
    },
    {
      headerName: "Justificación",
      field: "justificacion",
      minWidth: 100,
      wrapText: true,
      cellRendererFramework: (params) => (
        <div>
          <textarea
                className="multisteps-form__input form-control p-2 mw-100 w-auto"
                type="text"
                placeholder="Incluya concepto"
                rows="1"
                name="concepto"
              />
        </div>
      ),
    },
  ];

  const rowData = [
    { codigo: "1025", nombre: "Canoa", id: 95, marca: "lenovo", serial:86842, valorUnitario:"1.150.100", estado:"Bueno", justificacion:"Necesario"},
    { codigo: "9856", nombre: "Pala", id: 10, marca: "lenovo", serial:86842, valorUnitario:"1.150.100", estado:"Bueno", justificacion:"Necesario"},
    { codigo: "10256", nombre: "Amarillea", id: 25, marca: "lenovo", serial:86842, valorUnitario:"1.150.100", estado:"Bueno", justificacion:"Necesario"},
    { codigo: "98563", nombre: "Biche", id: 8, marca: "lenovo", serial:86842, valorUnitario:"1.150.100", estado:"Bueno", justificacion:"Necesario"},
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: false,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Reasignación de Elementos entre Funcionarios
        </h3>

        {/*  CUERPO DEL FORMULARIO  */}

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="row my-3">
              <div className="col-12 col-sm-6">
                <h5 className="font-weight-bolder border-radius-xl my-2">
                  Datos Generales
                </h5>
              </div>
            </div>
            {/*  PRIMERA FILA  */}
            <div className="row justify-content-between">
              <div className="col col-6 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Consecutivo"
                    {...register("consecutivoAsignarActivo", {
                      required: true,
                    })}
                  />
                  {errors.mortalidad?.type === "required" && (
                    <small className="text-danger">
                      El campo es requerido*
                    </small>
                  )}
                  <label className="ms-2">Consecutivo</label>
                </div>
              </div>
              {/*  FECHA  */}
              <div className="col col-6 col-md-6 d-flex flex-row">
                <label className="w-25 align-center-stretch my-auto">
                  {" "}
                  Fecha:{" "}
                </label>
                <div className="form-floating input-group input-group-dynamic">
                  <DatePicker
                    className="border border-1 my-3 text-center align-center-stretch"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Fecha de respuesta"
                  />
                </div>
              </div>
            </div>

            {/*  SEGUNDA FILA  */}
            <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Quien entrega
              </label>
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <div className="col-12">
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
                </label>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="numero documento"
                    value="1121919374"
                  />
                  <label className="ms-2">Número de documento</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre Completo"
                    value="Jhon Alejandro Lopez Ramos"
                    disabled
                    id="nombreResponsable"
                  />
                  <label className="ms-2">Nombre completo</label>
                </div>
              </div>
            </div>
            {/*  TERCERA FILA  */}
            <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Quien recibe
              </label>
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <div className="col-12">
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
                </label>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="numero documento"
                    value="1121919374"
                  />
                  <label className="ms-2">Número de documento</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre Completo"
                    value="Cesar Camacho"
                    disabled
                  />
                  <label className="ms-2">Nombre completo</label>
                </div>
              </div>
            </div>

            <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
              <label htmlFor="exampleFormControlInput1">Concepto</label>
              <textarea
                className="multisteps-form__input form-control p-2 mw-100 w-auto"
                type="text"
                placeholder="Incluya concepto"
                rows="3"
                name="concepto"
              />
            </div>

            <div className="row">
              <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-end">
                <button
                  type="submit"
                  className="mt-4 btn btn-primary flex-center text-capitalize"
                >
                  Guardar
                </button>
                <button
                  type="submit"
                  className="mt-4 mx-4 btn btn-light flex-center text-capitalize"
                >
                  Cancelar
                </button>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-12 col-sm-6">
                <h5 className="font-weight-bolder border-radius-xl my-2">
                  Detalles
                </h5>
              </div>
            </div>
            <div id="myGrid" className="ag-theme-alpine mt-4">
              <div className="ag-theme-alpine my-1" style={{ height: "250px" }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  debounceVerticalScrollbar={true}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-end">
                <button
                  type="submit"
                  className="mt-4 btn btn-primary flex-center text-capitalize"
                >
                  Guardar
                </button>
                <button
                  type="submit"
                  className="mt-4 mx-4 btn btn-light flex-center text-capitalize"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReasignarElementosEntreFuncionariosScreen;
