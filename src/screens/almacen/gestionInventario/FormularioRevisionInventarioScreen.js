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

function FormularioRevisionInventarioScreen() {

  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const optionsEstado = [
    { label: "Bueno", value: "B" },
    { label: "Malo", value: "M" },
    { label: "Defectuoso", value: "D" },
  ];

  const optionsRevision = [
    { label: "OK", value: "OK" },
    { label: "Pendiente", value: "PE" },
  ];

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

    const optionsTipoDocumento = [
      { label: "C.C.", value: "CC" },
      { label: "T.I.", value: "TI" },
    ];

    const optionsBodega = [
      { label: "Villavicencio / Principal", value: "VillavicencioPrincipal" },
      { label: "Villavicencio / San Antonio", value: "VillavicencioSanAntonio" },
      { label: "Macarena / Macarena", value: "Macarena" },
    ];


    let gridApi;

    const columnDefsArticulos = [
    
      {
        headerName: "Código artículo",
        field: "codigoArticulo",     
        minWidth: 100,
        wrapText: true,
      },
      {
        headerName: "Nombre artículo",
        field: "nombreArticulo",    
        minWidth: 100,
        wrapText: true,
      },
      {
          headerName: "ID Unico",
          field: "idUnico",
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
          headerName: "Bodega",
          field: "bodega",
          minWidth: 100,
          wrapText: true,
        },
        {
          headerName: "Responsable",
          field: "responsable",
          minWidth: 100,
          wrapText: true,
        },  
        {
          headerName: "Código de barras",
          field: "codigoBarras",
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
          headerName: "Revisión",
          field: "revision",
          minWidth: 100,
          wrapText: true,
          cellRendererFramework: (params) => (
            <div>
              <Controller
                          name="estado"
                          control={control}
                          defaultValue={optionsRevision[0]}
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={optionsRevision}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
            </div>
          ),
        },
      
      {
          headerName: "Anotación",
          field: "anotacion",
          width: 100,
          minWidth: 100,
          maxWidth: 200,
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
  
    const rowDataArticulos = [
      {codigoArticulo: "1025", nombreArticulo: "Canoa", idUnico: "0000586", marca: "Lenovo", serial: "ndg589", bodega: "San Benito", responsable: "Pepito", codigoBarras: "154875", cantidad: 95,},
      {codigoArticulo: "9856", nombreArticulo: "Pala", idUnico: "0000586", marca: "Lenovo", serial: "ndg589", bodega: "San Benito", responsable: "Pepito", codigoBarras: "154875", cantidad: 10,},
      {codigoArticulo: "10256", nombreArticulo: "Amarillea", idUnico: "0000586", marca: "Lenovo", serial: "ndg589", bodega: "San Benito", responsable: "Pepito", codigoBarras: "154875", cantidad: 25,},
      {codigoArticulo: "98563", nombreArticulo: "Biche", idUnico: "0000586", marca: "Lenovo", serial: "ndg589", bodega: "San Benito", responsable: "Pepito", codigoBarras: "154875", cantidad: 8,},
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
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
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
        <h3 className="mt-3 mb-0 text-center mb-6">Formulario Inventario de Revisión de Activos</h3>

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
                  Detalles
                </h5>
              </div>
            </div>
            
            {/*  PRIMERA FILA  */}
            <div className="row">
              <label className="mt-3 form-control ms-0 fw-bolder text-center">
                Tipo de Artículo
              </label>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Código"
                    {...register("codigo", {
                      required: true,
                    })}
                    defaultValue="114485"
                    />
                  <label className="ms-2">Código
                  <span className="text-danger">*</span>
                  </label>
                </div>
                {errors.codigo?.type === "required" && (
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
                    placeholder="Nombre"
                    {...register("nombreArticulo")}
                    defaultValue="Equipo de Cómputo"
                    disabled
                    />
                  <label className="ms-2">Nombre
                  <span className="text-danger">*</span>
                  </label>
                </div>
                </div>
              <div className="col col-12 col-md-4">
                <div className="form-floating">
                  <button
                    className="my-3 text-center align-center-stretch btn btn-primary text-capitalize"
                    onClick={handleOpenModalArticulos}
                    >
                    Buscar Artículos
                  </button>               
                </div>
              </div>
            </div>
            {/*  SEGUNDA FILA  */}
            <div className="row flex-column">
            <div className="col-12 col-md-4">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Bodega{" "}
                      <div className="col-12">
                        <Controller
                          name="bodega"
                          control={control}
                          defaultValue={optionsBodega[0]}
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={optionsBodega}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                    </label>
                  </div>
                  </div>
                  {/*  TERCER FILA  */}
                  <div className="row flex-column">
              <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex my-3">
                <label className="form-check-label form-floating input-group form-control" for="flexRadioDefault2">
                  En Producción
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                </label>
              </div>
            </div>
            {/*  CUARTA FILA  */}
            <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Persona
              </label>
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <span className="text-danger">*</span>    
                  <div className="col-12">
                    <Controller
                      name="tipoDocumentoPersona"
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
                    {...register("numeroDocumentoPersona", {
                      required: true,
                    })}
                    placeholder="numero documento"
                    defaultValue={"1121919374"}
                  />
                  <label className="ms-2">Número de documento
                  <span className="text-danger">*</span>
                  </label>
                </div>
                {errors.numeroDocumentoPersona?.type === "required" && (
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
                    {...register("nombrePersona")}
                    placeholder="Nombre Completo"
                    value="Jhon Alejandro Lopez Ramos"
                    disabled
                    id="nombrePersona"
                  />
                  <label className="ms-2">Nombre completo</label>
                </div>
              </div>
            </div>
            <div className="row justify-content-end">
            <div className="col-12 col-md-4">
                <div className="form-floating align-content-end">
                  <button
                    className="my-3 text-center align-center-stretch btn btn-primary text-capitalize"
                    onClick={handleOpenModalBusquedaPersonal}
                    >
                    Buscar Personal
                  </button>               
                </div>
              </div>
              </div>
              
            <div className="row">
              <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-center">
                <button
                  type="submit"
                  className="mt-2 btn btn-primary flex-center text-capitalize"
                >
                  Buscar
                </button>
                </div>
            </div>
            {/*  CUERPO DEL LA TABLA  */}
            <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Revisón de Activos
              </label>
            <div id="myGrid" className="ag-theme-alpine mt-2">
            <div className="ag-theme-alpine my-1" style={{ height: "300px" }}>
              <AgGridReact
                columnDefs={columnDefsArticulos}
                rowData={rowDataArticulos}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
            </div>
          {/*  TRES FECHAS  */}
          <div className="row">
          <div className="col-12 col-md-4 mt-4">
              <label htmlFor="exampleFormControlInput1 mt-3">
                Fecha inicial
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
                      placeholderText="Fecha inicial"
                      disabled
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    />
                  )}
                />
              </label>
            </div>
            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="exampleFormControlInput1 mt-3">
              Última modificación
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
                      placeholderText="Última modificación"
                      disabled
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    />
                  )}
                />
              </label>
            </div>
            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="exampleFormControlInput1 mt-3">
                Fecha final
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
                      placeholderText="Fecha final"
                      disabled
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    />
                  )}
                />
              </label>
            </div>
              </div>
          {/*  TRES BOTONES  */}
            <div className="row">
                    <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-center">
                      <button type="submit" className="mt-4 mx-4 btn btn-primary flex-center text-capitalize" onClick={"null"}>
                        Guardar
                      </button>
                      <button type="submit" className="mt-4 btn btn-light flex-center text-capitalize">
                        Finalizar
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

  )
}

export default FormularioRevisionInventarioScreen