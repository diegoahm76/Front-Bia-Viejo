import { AgGridReact } from "ag-grid-react";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { adapterSubsistemasChoices } from "../../adapters/auditorias.adapters";
import Subtitle from "../../components/Subtitle";
import clienteAxios from "../../config/clienteAxios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
import { getConfigAuthBearer } from "../../helpers/configAxios";
import { formatISO } from "date-fns";
import { getDateFromAAAAMMDDToDDMMAAAA } from "../../helpers/dateHelpers";
import botonBuscar from "../../assets/iconosBotones/buscar.svg"

const columDefs = [
  {
    headerName: "Usuario",
    field: "id_usuario.nombre_de_usuario",
    minWidth: 150,
  },
  {
    headerName: "Tipo documento",
    field: "id_usuario.persona.tipo_documento.nombre",
    minWidth: 200,
  },
  {
    headerName: "Documento",
    field: "id_usuario.persona.numero_documento",
    minWidth: 150,
  },
  {
    headerName: "Módulo",
    field: "id_modulo.nombre_modulo",
    minWidth: 150,
  },
  {
    headerName: "Subsistema",
    field: "subsistema",
    minWidth: 150,
  },
  {
    headerName: "Descripción",
    field: "descripcion",
    minWidth: 400,
  },
  {
    headerName: "Valores actualizados",
    field: "valores_actualizados",
    minWidth: 150,
  },
  {
    headerName: "Fecha acción",
    field: "fecha_accion",
    minWidth: 250,
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

const AuditoriaScreen = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [subsistemasOptions, setSubsistemasOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    fechaIni: "",
    fechaEnd: "",
    fechaNow: new Date(),
    });

      const fechaIniMenosEnd = (formValues.fechaEnd - formValues.fechaIni)/(1000 * 60 * 60 * 24);
      console.log(fechaIniMenosEnd);
      // const diasFechaIniMenosEnd = fechaIniMenosEnd/(1000 * 60 * 60 * 24);
      // const fechaIniMenosEnd = formValues.fechaIni-formValues.fechaEnd;

  const {
    register,
    handleSubmit,
    control,
    // reset,
    // watch,
    formState: { errors },
  } = useForm();
 
  const onSubmit = async (data) => {
    const accessToken = getTokenAccessLocalStorage();
    const config = getConfigAuthBearer(accessToken);

    const fechaIniNoFormat = formatISO(formValues.fechaIni, {
      representation: "date",
    });
    const fechaEndNoFormat = formatISO(formValues.fechaEnd, {
      representation: "date",
    });
    const fechaNowNoFormat = formatISO(formValues.fechaNow, {
      representation: "date",
    });

    const fechaIni = getDateFromAAAAMMDDToDDMMAAAA(fechaIniNoFormat);
    const fechaEnd = getDateFromAAAAMMDDToDDMMAAAA(fechaEndNoFormat);
    const fechaNow = getDateFromAAAAMMDDToDDMMAAAA(fechaNowNoFormat);
    console.log(fechaIni);
    console.log(fechaEnd);
    console.log(fechaNow);
        
    try {
      console.log("data submit", fechaIni, fechaEnd, fechaNow);
      const queryParamsUrl = `auditorias/get-by-query-params/?rango-inicial-fecha=${fechaIni}&rango-final-fecha=${fechaEnd}${
        data.numeroDocumento
          ? `&tipo-documento=${data.tipoDocumento.value}&numero-documento=${data.numeroDocumento}`
          : ""
      }${data.subsistema ? `&subsistema=${data.subsistema.value}` : ""}`;
      const { data: dataAuditorias } = await clienteAxios.get(
        queryParamsUrl,
        config
      );
      console.log("data response auditorias, success", dataAuditorias);
      const dataSend = dataAuditorias.auditorias ?? [];
      setAuditorias(dataSend);
    } catch (err) {
      console.log(err);
    }
  };
   
  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data } = await clienteAxios("choices/subsistemas/");
        const subsistemasAdapted = adapterSubsistemasChoices(data);
        setSubsistemasOptions(subsistemasAdapted);

        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );
        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
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
              <div className="col-12 col-md-6">
                <div className="flex-column col-12 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de inicio: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="fechaIni"
                    control={control}
                    rules={{ required: true, 
                      validate: {
                        fechaCorrecta: v => formValues.fechaIni <= formValues.fechaNow,
                        }}}
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
                        selected={formValues.fechaIni}
                        onSelect={(e) =>
                          setFormValues({ ...formValues, fechaIni: e })
                        }
                        className="form-control border border-terciary rounded-pill px-3"
                        placeholderText="aaaa/mm/dd"
                        dateFormat="yyyy/MM/dd"
                      />
                    )}
                  />
                  {/* {formValues.fechaIni > formValues.fechaNow ? <small className="text-center text-danger">
                        No puede ser mayor que la fecha actual
                      </small> : ""}                   */}
                  
                  {errors.fechaIni?.type ==="required" && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  {errors.fechaIni?.type ==="fechaCorrecta" && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                      No puede ser mayor que la fecha actual
                      </small>
                    </div>
                  )}
                  </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="flex-column col-12 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha fin: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="fechaEnd"
                    control={control}
                    rules={{ required: true, 
                      validate: {
                        fechaPosterior: v => formValues.fechaIni <= formValues.fechaEnd,
                        fechaLimite: v => fechaIniMenosEnd < 8,
                        }}}
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
                        selected={formValues.fechaEnd}
                        onSelect={(e) =>
                          setFormValues({ ...formValues, fechaEnd: e })
                        }
                        className="form-control border border-terciary rounded-pill px-3"
                        placeholderText="aaaa/mm/dd"
                        dateFormat="yyyy/MM/dd"
                      />
                    )}
                  />
                  {/* {formValues.fechaIni > formValues.fechaEnd ? <small className="text-center text-danger">
                        Seleccione una fecha posterior a fecha inicio
                      </small> : ""}  */}
                      {/* {fechaIniMenosEnd > 7 ? <small className="text-center text-danger">
                        No puede haber más de 8 días
                      </small> : ""} 
                       */}
                  {errors.fechaEnd?.type ==="required" && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                  {errors.fechaEnd?.type ==="fechaPosterior" && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                      Seleccione una fecha igual o posterior a fecha inicio
                      </small>
                    </div>
                  )}
                  {errors.fechaEnd?.type ==="fechaLimite" && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                      No puede haber más de 8 días
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-4">
              <label className="form-label">Subsistema:</label>
              <Controller
                name="subsistema"
                control={control}
                // rules={{
                //   required: true,
                // }}
                render={({ field }) => (
                  <Select
                    {...field}
                   options={subsistemasOptions}
                   placeholder="Seleccionar"
                  />
                )}
              />
              {/* {errors.subsistema && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )} */}
            </div>
            <div className="col-12 col-md-2 mt-4">
              <label className="form-label">Tipo documento:</label>
              <Controller
                name="tipoDocumento"
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <Select
                    {...field}
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
            <div className="col-12 col-md-4 mt-4">
              <div>
                <label className="ms-2">Número de documento:</label>
                <input
                  className="form-control border rounded-pill px-3 border-terciary"
                  type="text"
                  {...register("numeroDocumento", { required: false })}
                />
              </div>
              {errors.numeroDocumento && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="mb-0 btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-4 me-2"
              >
                <img src={botonBuscar} alt="" title="Buscar"/>
              </button>
            </div>
            <div id="myGrid" className="ag-theme-alpine mt-3">
              <div
                className="container ag-theme-alpine"
                style={{ height: "400px" }}
              >
                <AgGridReact
                  className="ag-theme-alpine"
                  animateRows="true"
                  pagination = { true }
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
