import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
//Styles
import botonBuscar from "../../assets/iconosBotones/buscar.svg"
//Components
import clienteAxios from "../../config/clienteAxios";
import Subtitle from "../../components/Subtitle";
import { adapterModulesChoices, adapterSubsistemasChoices } from "../../adapters/auditorias.adapters";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import { setDatesFormat } from "../../utils";

const columDefs = [
  {
    headerName: "Usuario",
    field: "nombre_completo",
    minWidth: 200,
  },
  {
    headerName: "Tipo documento",
    field: "cod_tipo_documento",
    minWidth: 150,
  },
  {
    headerName: "Documento",
    field: "numero_documento",
    minWidth: 150,
  },
  {
    headerName: "Módulo",
    field: "nombre_modulo",
    minWidth: 150,
  },
  {
    headerName: "Subsistema",
    field: "subsistema",
    minWidth: 120,
  },
  {
    headerName: "Descripción",
    field: "descripcion",
    minWidth: 400,
  },
  {
    headerName: "Valores actualizados",
    field: "valores_actualizados",
    minWidth: 300,
  },
  {
    headerName: "Fecha acción",
    field: "fecha_accion",
    minWidth: 150,
  },
];

const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 100,
  suppressMovable: true,
};

interface IFormValues {
  rango_inicial_fecha: string | Date;
  rango_final_fecha: string | Date;
  rango_actual_fecha: string | Date;
  numero_documento: string;
  tipo_documento: IList;
  subsistema: IList;
  modulo: IList;
  page: string;
}

export interface IList {
  label: string;
  value: string;
}

const AuditoriaScreen = () => {

  const notificationError = (message = 'Algo pasó, intente de nuevo') => Swal.mixin({
    position: "center",
    icon: "error",
    title: message,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
  }).fire();


  const [auditorias, setAuditorias] = useState([]);
  const [subsistemasOptions, setSubsistemasOptions] = useState<any>([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState<any>([]);
  const [modulosOptions, setModulosOptions] = useState<any>([]);

  // inicializar valores del formulario
  const formValues: IFormValues = {
    rango_inicial_fecha: new Date(),
    rango_final_fecha: new Date(),
    rango_actual_fecha: new Date(),
    numero_documento: "",
    tipo_documento: {
      label: "",
      value: ""
    },
    subsistema: {
      label: "",
      value: ""
    },
    modulo: {
      label: "",
      value: ""
    },
    page: '1',
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },

  } = useForm({ defaultValues: formValues });

  const dataScreen = watch();

  const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => {

    let newDateIni = setDatesFormat(data.rango_inicial_fecha.toLocaleString())
    let newDateFin = setDatesFormat(data.rango_final_fecha.toLocaleString())

    queryAuditorias(data, newDateIni, newDateFin);
  };

  const queryAuditorias = async (
    { tipo_documento, numero_documento, subsistema, modulo }: IFormValues,
    newDateIni: string,
    newDateFin: string
  ) => {
    try {
      const { data } = await clienteAxios.get(`auditorias/get-by-query-params/?rango-inicial-fecha=${newDateIni}&rango-final-fecha=${newDateFin}&tipo-documento=${tipo_documento.value}&numero-documento=${numero_documento}&modulo=${modulo.value}&subsistema=${subsistema.value}`);
      setAuditorias(data.detail);
      Swal.fire("Correcto", "Proceso Exitoso", "success");
    } catch (error: any) {
      notificationError(error.response.data.detail);
    }
  }

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data: dataSubsistemas } = await clienteAxios("choices/subsistemas/");
        const { data: dataModulos } = await clienteAxios("permisos/modulos/get-list/");
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get("choices/tipo-documento/");

        const subsistemasAdapted = adapterSubsistemasChoices(dataSubsistemas);
        const modulosAdapted = adapterModulesChoices(dataModulos);
        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);

        setSubsistemasOptions(subsistemasAdapted);
        setModulosOptions(modulosAdapted);
        setTipoDocumentoOptions(documentosFormat);

      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }, []);

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-3 ms-3 mb-4 fw-light text-terciary">Auditoria</h3>
          <Subtitle title={"Información general"} mt={0} mb={0} />
          <form className="mt-4 row mx-1 align-items-end" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12 col-md-2">
                <div className="flex-column col-12 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de inicio: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="rango_inicial_fecha"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        showYearDropdown
                        peekNextMonth
                        showMonthDropdown
                        dropdownMode="select"
                        scrollableYearDropdown
                        autoComplete="off"
                        selected={dataScreen.rango_inicial_fecha}
                        className="form-control border border-terciary rounded-pill px-3"
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    )}
                  />
                  {dataScreen.rango_inicial_fecha > dataScreen.rango_actual_fecha ? <small className="text-center text-danger">
                    No puede ser mayor que la fecha actual
                  </small> : ""}
                  {errors.rango_inicial_fecha && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                  {errors.rango_inicial_fecha && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  {errors.rango_inicial_fecha?.type === "fechaCorrecta" && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        No puede ser mayor que la fecha actual
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="flex-column col-12 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha fin: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="rango_final_fecha"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        showYearDropdown
                        peekNextMonth
                        showMonthDropdown
                        dropdownMode="select"
                        scrollableYearDropdown
                        autoComplete="off"
                        selected={dataScreen.rango_final_fecha}
                        className="form-control border border-terciary rounded-pill px-3"
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                    )}
                  />
                  {dataScreen.rango_inicial_fecha > dataScreen.rango_final_fecha ? <small className="text-center text-danger">
                    Seleccione una fecha posterior a fecha inicio
                  </small> : ""}
                  {errors.rango_final_fecha && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  {errors.rango_final_fecha?.type === "fechaPosterior" && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Seleccione una fecha igual o posterior a fecha inicio
                      </small>
                    </div>
                  )}
                  {errors.rango_final_fecha?.type === "fechaLimite" && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        No puede haber más de 8 días
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-4 mt-4">
                <label className="form-label">Subsistema:</label>
                <Controller
                  name="subsistema"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<IList>) => {
                        setValue('subsistema', option!)
                      }}
                      options={subsistemasOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.subsistema && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-4 mt-4">
                <label className="form-label">Tipo documento:</label>
                <Controller
                  name="tipo_documento"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<IList>) => {
                        setValue('tipo_documento', option!)
                      }}
                      name="tipo_documento"
                      options={tipoDocumentoOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.subsistema && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-5 mt-4">
              <label className="form-label">Madulo:</label>
              <Controller
                name="modulo"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(option: SingleValue<IList>) => {
                      setValue('modulo', option!)
                    }}
                    options={modulosOptions}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errors.modulo && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="col-12 col-md-4 mt-4">
              <div>
                <label className="ms-2">Número de documento:</label>
                <input
                  className="form-control border rounded-pill px-3 border-terciary"
                  type="text"
                  maxLength={15}
                  {...register("numero_documento", { required: false })}
                />
              </div>
              {errors.numero_documento && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="col-12 col-md-1 mt-1">
              <div>
                <button
                  type="submit"
                  className="mb-0 btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-4 me-2"
                >
                  <i className="fa-solid fa-magnifying-glass fs-3" title="Buscar"></i>
                </button>
              </div>
            </div>
            <div className="col-12 col-md-1 mt-1">
              <div>
                <button
                  type="button"
                  onClick={() => reset(formValues)}
                  className="mb-0 btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-4 me-2"
                  title="Limpiar"
                >
                  <i className="fa-solid fa-eraser fs-3"></i>
                </button>
              </div>
            </div>
            
            {/* <div>
              <button
                type="submit"
                className="mb-0 btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-4 me-2"
              >
                <img src={botonBuscar} alt="" title="Buscar" />
              </button>
            </div> */}
            <div id="myGrid" className="ag-theme-alpine mt-3">
              <div
                className="container ag-theme-alpine"
                style={{ height: "400px" }}
              >
                <AgGridReact
                  className="ag-theme-alpine"
                  animateRows="true"
                  pagination={true}
                  columnDefs={columDefs}
                  rowData={auditorias}
                  defaultColDef={defaultColDef}
                  paginationPageSize={10}
                ></AgGridReact>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AuditoriaScreen;
