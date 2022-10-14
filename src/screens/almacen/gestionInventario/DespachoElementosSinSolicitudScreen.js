import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { activeModalAction, desactiveModalAction } from '../../../actions/modalActions';
import BusquedaArticuloModal from '../../../components/BusquedaArticuloModal';
import BusquedaDePersonalModal from '../../../components/BusquedaDePersonalModal';
import { useDispatch } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const optionsTipoDocumento = [
  { label: "C.C.", value: "CC" },
  { label: "T.I.", value: "TI" },
];

function DespachoElementosSinSolicitudScreen() {
  {/*  DECLARAR VARIABLES  */}
  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const {
    register, handleSubmit, control, formState: { errors },} = useForm();
  const onSubmit = (data) => {
    setSelecOpciones({
      vivero: data.vivero,
    });
  };
  const [startDate, setStartDate] = useState(new Date());
  const CustomPlaceholder = ({ date, value, onChange }) => (
    <input style={{ border: "solid 1px black" }} />
  );

  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };

  let gridApi;
  const columnDefs = [
    {
      headerName: "Código artículo",
      field: "codigoArticulo",     
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Nombre del artículo",
      field: "nombreArticulo",    
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Cantidad",
      field: "cantidad",
      minWidth: 100,
      wrapText: true,
    },
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
            onClick={handleOpenModalArticulos}>
            Buscar
          </button>
        </div>
      ),
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
    {codigoArticulo: "1025", nombreArticulo: "Canoa", cantidad: 95,},
    {codigoArticulo: "9856", nombreArticulo: "Pala", cantidad: 10,},
    {codigoArticulo: "10256", nombreArticulo: "Amarillea", cantidad: 25,},
    {codigoArticulo: "98563", nombreArticulo: "Biche", cantidad: 8,},
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

    // MODAL BUSQUEDA ARTICULO Y PERSONA
const [modalArticulos, setModalArticulos] = useState(false)
const [modalPersonal, setModalPersonal] = useState(false) 

const handleOpenModalArticulos = () => {
  setModalArticulos(true);
};

const handleOpenModalBusquedaPersonal = () => {
  setModalPersonal(true);
};

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Despachar Elementos sin Solicitud</h3>

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
                    defaultValue={"25225"}
                    placeholder="Consecutivo"
                    {...register("consecutivoAsignarActivo", {
                      required: true,
                    })}
                  />
                  <label className="ms-2">Consecutivo
                  <span className="text-danger">*</span>
                  </label>
                </div>
                {errors.consecutivoAsignarActivo?.type === "required" && (
                    <small className="text-danger">
                      El campo es requerido*
                    </small>
                  )}
              </div>
              {/*  FECHA  */}
              <div className="col-12 col-md-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
                  Fecha de Respuesta
                  <Controller
                    name="fechaRespuesta"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        selected={startDate}
                        dateFormat="dd/MM/yyyy"
                        includeDates={[new Date()]}
                        onChange={(date) => setStartDate(date)}
                        className="multisteps-form__input form-control p-2 border border-1"
                        placeholderText="Fecha de respuesta"
                        peekNextMonth
                        disabled
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    )}
                  />
                </label>
              </div>
            </div>
            {/*  SEGUNDA FILA  */}
            <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Operario Almacén
              </label>
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <div className="col-12">
                    <Controller
                      name="tipoDocumentoOperario"
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
                    {...register("numeroDocumentoOperario")}
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
                    {...register("nombreOperario")}
                    placeholder="Nombre Completo"
                    value="Jhon Alejandro Lopez Ramos"
                    disabled
                    id="nombreOperario"
                  />
                  <label className="ms-2">Nombre completo</label>
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
                  <span className="text-danger">*</span>    
                  <div className="col-12">
                    <Controller
                      name="tipoDocumentoResponsable"
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
                    {...register("numeroDocumentoResponsable", {
                      required: true,
                    })}
                    placeholder="numero documento"
                    defaultValue={"1121919374"}
                  />
                  <label className="ms-2">Número de documento
                  <span className="text-danger">*</span>
                  </label>
                </div>
                {errors.numeroDocumentoResponsable?.type === "required" && (
                    <small className="text-danger">
                      El campo es requerido*
                    </small>
                  )}
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="text"
                    {...register("nombreResponsable")}
                    placeholder="Nombre Completo"
                    value="Jhon Alejandro Lopez Ramos"
                    disabled
                    id="nombreResponsable"
                  />
                  <label className="ms-2">Nombre completo</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleOpenModalBusquedaPersonal}
                  className="mt-0 btn btn-primary flex-center text-capitalize"
                >
                  Buscar
                </button>
                </div>
            </div>
           
            <div className="row mt-4">
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
                  Despacho de Solicitud
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
                      {...register("observaciones" ,{
                        required: true,
                      })}
                      placeholder="Incluya observacion"
                      rows="3"
                      name="observaciones"
                      />
                      {errors.observaciones?.type === "required" && (
                    <small className="text-danger">
                      El campo es requerido*
                    </small>
                  )}
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-center">
                      <button type="submit" className="mt-4 btn btn-primary flex-center text-capitalize">
                        Guardar
                      </button>
                      <button type="submit" className="mt-4 mx-4 btn btn-light flex-center text-capitalize">
                        Salir
                      </button>
                      </div>
                  </div>       
          </div>
        </form>
        <BusquedaDePersonalModal
      isModalActive={modalPersonal}
      setIsModalActive={setModalPersonal}
      />

        <BusquedaArticuloModal
      isModalActive={modalArticulos}
      setIsModalActive={setModalArticulos}
      />
        

      </div>
    </div>
  );
}

export default DespachoElementosSinSolicitudScreen