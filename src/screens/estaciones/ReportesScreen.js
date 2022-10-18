import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import clienteEstaciones from "../../config/clienteAxiosEstaciones";
import { formatISO9075 } from "date-fns";
import { AgGridReact } from "ag-grid-react";

const columnDefs = [
  {
    headerName: "OBJECTID",
    field: "objectId",
    minWidth: 140,
  },
  {
    headerName: "Temperatura",
    field: "temperaturaAmbiente",
    minWidth: 140,
  },
  { headerName: "Humedad", field: "humedadAmbiente", minWidth: 140 },
  {
    headerName: "Presión",
    field: "presionBarometrica",
    minWidth: 140,
  },
  { headerName: "Velocidad viento", field: "velocidadViento", minWidth: 140 },
  { headerName: "Dirección viento", field: "direccionViento", minWidth: 140 },
  { headerName: "Precipitación", field: "precipitacion", minWidth: 140 },
  { headerName: "Luminocidad", field: "luminocidad", minWidth: 140 },
  { headerName: "Nivel de agua", field: "nivelDeAgua", minWidth: 140 },
  { headerName: "Velocidad agua", field: "velocidadAgua", minWidth: 140 },
  { headerName: "Fecha", field: "fecha", minWidth: 170 },
];

const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  autoHeaderHeight: false,
  suppressMovable: true,
};

const ReportesScreen = () => {
  const [loading, setLoading] = useState(false);
  const [estacionesOptions, setEstacionesOptions] = useState([]);
  const [dataReportes, setDataReportes] = useState(null);
  const [formValues, setFormValues] = useState({
    fechaIni: "",
    fechaEnd: "",
  });
  const {
    // register: registerFiltrar,
    handleSubmit: handleSubmitFiltrar,
    control: controlFiltrar,
    // reset: resetFiltrar,
    formState: { errors: errorsFiltrar },
  } = useForm();

  useEffect(() => {
    const getDataInitial = async () => {
      try {
        setLoading(true);
        const { data } = await clienteEstaciones.get("Estaciones");
        const estacionesMaped = data.map((estacion) => ({
          label: estacion.t001nombre,
          value: estacion.objectid,
        }));
        setEstacionesOptions(estacionesMaped);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getDataInitial();
  }, []);

  const onSubmitFiltrar = async (data) => {
    try {
      setLoading(true);
      const fechaIni = changeDateFormat(formValues.fechaIni);
      const fechaEnd = changeDateFormat(formValues.fechaEnd);
      const { data: reportesData } = await clienteEstaciones.get(
        `Datos/filtro/${data.estacion?.value},${fechaIni},${fechaEnd}`
      );
      const reportesDataMaped = reportesData.map((reporteData) => ({
        objectId: reporteData.objectid,
        temperaturaAmbiente: reporteData.t002temperaturaAmbiente,
        humedadAmbiente: reporteData.t002humedadAmbiente,
        presionBarometrica: reporteData.t002presionBarometrica,
        velocidadViento: reporteData.t002velocidadViento,
        direccionViento: reporteData.t002direccionViento,
        precipitacion: reporteData.t002precipitacion,
        luminocidad: reporteData.t002luminocidad,
        nivelDeAgua: reporteData.t002nivelAgua,
        velocidadAgua: reporteData.t002velocidadAgua,
        fecha: reporteData.t002fecha,
      }));
      setDataReportes(reportesDataMaped);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const changeDateFormat = (date) => {
    return formatISO9075(new Date(date));
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-4">Reportes estaciones meteorologicas</h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <form className="row" onSubmit={handleSubmitFiltrar(onSubmitFiltrar)}>
            <div className="col-12 col-md-4">
              <label className="form-label">
                Estación: <span className="text-danger">*</span>
              </label>
              <Controller
                name="estacion"
                control={controlFiltrar}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={estacionesOptions}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errorsFiltrar.estacion && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="input-group input-group-dynamic flex-column col-12 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de inicio: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="fechaIni"
                    control={controlFiltrar}
                    rules={{ required: true }}
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
                        className="multisteps-form__input form-control p-2"
                        placeholderText="aaaa/mm/dd"
                      />
                    )}
                  />
                  {errorsFiltrar.fechaIni && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="input-group input-group-dynamic flex-column col-6 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de inicio: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="fechaEnd"
                    control={controlFiltrar}
                    rules={{ required: true }}
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
                        className="multisteps-form__input form-control p-2"
                        placeholderText="aaaa/mm/dd"
                      />
                    )}
                  />
                  {errorsFiltrar.fechaEnd && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn bg-gradient-primary text-capitalize d-block ms-auto mt-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Cargando...
                  </>
                ) : (
                  "Generar reporte"
                )}
              </button>
            </div>
          </form>
          {dataReportes && (
            <div className="multisteps-form__content">
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-8 px-4"
                  style={{ height: "470px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={dataReportes}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportesScreen;
