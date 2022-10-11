import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { activeModalAction, desactiveModalAction } from '../../../actions/modalActions';
import CalendarModal from '../../../components/CalendarModal';
import { useDispatch } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function DespacharElementosConsumoScreen() {
  
     {/*  DECLARAR VARIABLES  */}
  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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

  let gridApi;
  const columnDefs = [
    {
      headerName: "Código artículo",
      field: "codigoArticulo",     
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Nombre del elemento",
      field: "nombreElemento",    
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Cantidad",
      field: "cantidad",
      minWidth: 100,
      wrapText: true,
    },
  ];

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(activeModalAction());
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  const rowData = [
    {codigoArticulo: "1025", nombreElemento: "Canoa", cantidad: 95,},
    {codigoArticulo: "9856", nombreElemento: "Pala", cantidad: 10,},
    {codigoArticulo: "10256", nombreElemento: "Amarillea", cantidad: 25,},
    {codigoArticulo: "98563", nombreElemento: "Biche", cantidad: 8,},
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
        <h3 className="mt-3 mb-0 text-center mb-6">Despachar Elementos de Consumo</h3>

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
                  Fecha de respuesta:{" "}
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
            <div className="row justify-content-between">
              <div className="col col-6 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Consecutivo de solicitud"
                    {...register("consecutivoSolicitud", {
                      required: true,
                    })}
                  />
                  {errors.mortalidad?.type === "required" && (
                    <small className="text-danger">
                      El campo es requerido*
                    </small>
                  )}
                  <label className="ms-2">Consecutivo de solicitud</label>
                </div>
              </div>
              {/*  FECHA  */}
              <div className="col col-6 col-md-6 d-flex flex-row">
                <label className="w-20 align-center-stretch my-auto">
                  {" "}
                  Fecha de solicitud:{" "}
                </label>
                <div>
                  <input
                    className="form-control border border-1 my-2 text-center"
                    type="date"
                    placeholder="Fecha de solicitud"
                    value={"10-10-2022"}
                    readOnly
                  />
                </div>
              </div>
            </div>
            {/*  TERCERA FILA  */}
            <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Responsable
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
                          isDisabled
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
                    disabled
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
            {/*  CUARTA FILA  */}
            <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Solicitante
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
                          isDisabled
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
                    disabled
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
                  />
                  <label className="ms-2">Nombre completo</label>
                </div>
              </div>
            </div>
           
            <div>
              <label className="mt-4 form-control ms-0 fw-bolder text-end p-3">
                Solicitud autorizada el día 10/20/2022 por Jhon Alejandro Lopez
                Ramos
              </label>
            </div>

            <div className="row my-3">
              <div className="col-12 col-sm-6">
                <h5 className="font-weight-bolder border-radius-xl my-2">
                  Detalles
                </h5>
              </div>
            </div>
            <div id="myGrid" className="ag-theme-alpine mt-4">
            <div className="ag-theme-alpine my-1" style={{ height: "300px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
            </div>
            <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
                    <label htmlFor="exampleFormControlInput1">Observaciones</label>
                    <textarea
                      className="multisteps-form__input form-control p-2 mw-100 w-auto"
                      type="text"
                      placeholder="Incluya observacion"
                      rows="3"
                      name="observaciones"
                      value={"Asignacion de articulos provenientes de..."}
                      disabled
                    />
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-center">
                      <button type="button" className="mt-4 btn btn-secondary flex-center text-capitalize">
                        Despachar
                      </button>
                      <button type="button" className="mt-4 mx-4 btn btn-danger flex-center text-capitalize" onClick={handleOpenModal}>
                        Rechazar
                      </button>
                      <button type="submit" className="mt-4 btn btn-danger flex-center text-capitalize">
                        Elementos no disponibles
                      </button>
                    </div>
                  </div>       
          </div>
        </form>

        <CalendarModal>
          <div>
          <h3>Modal de prueba</h3>
          </div>

          <button
                      className="btn bg-gradient-danger mb-0"
                      onClick={handleCloseModal}
                      type="submit"
                      title="Send"
                      form="configForm"
                    >
                      Salir
                    </button>

        </CalendarModal>

      </div>
    </div>
  );

}

export default DespacharElementosConsumoScreen