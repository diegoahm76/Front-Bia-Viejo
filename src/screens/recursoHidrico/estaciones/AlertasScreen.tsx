import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { formatISO9075 } from "date-fns";
import { AgGridReact } from "ag-grid-react";
import { formatISO } from "date-fns";
import Subtitle from "../../../components/Subtitle";

const columnDefs = [
  {
    headerName: "OBJECTID",
    field: "objectId",
    minWidth: 140,
  },
  {
    headerName: "Descripción",
    field: "descripcion",
    minWidth: 500,
  },
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

const AlertasScreen = () => {
  const [loading, setLoading] = useState(false);
  const [estacionesOptions, setEstacionesOptions] = useState([]);
  const [dataAlertas, setDataAlertas] = useState(null);
  const [formValues, setFormValues] = useState({
    fechaIni: "",
    fechaEnd: "",
  });
  const {
    handleSubmit: handleSubmitFiltrar,
    control: controlFiltrar,
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
      const { data: alertasData } = await clienteEstaciones.get(
        `Alertas/filtro/${data.estacion?.value},${fechaIni},${fechaEnd}`
      );
      const reportesDataMaped = alertasData.map((alertaData) => ({
        objectId: alertaData.objectid,
        descripcion: alertaData.t004descripcion,
        fecha: formatISO(new Date(alertaData.t004fecha), {
          representation: "date",
        }),
      }));
      setDataAlertas(reportesDataMaped);
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
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-3 ms-3 mb-3 fw-light text-terciary">Alertas</h3>
          <Subtitle title={"Informacion general"} mt={0} mb={3} />
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
                <div className="flex-column col-12 mt-4">
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
                        className="form-control border rounded-pill px-3"
                        placeholderText="aaaa/mm/dd"
                        dateFormat="yyyy/MM/dd"
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
                <div className="flex-column col-12 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha fin: <span className="text-danger">*</span>
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
                        className="form-control border rounded-pill px-3"
                        placeholderText="aaaa/mm/dd"
                        dateFormat="yyyy/MM/dd"
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
                className="btn bg-gradient-primary text-capitalize d-block ms-auto mt-3 me-4"
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
                  "Consultar"
                )}
              </button>
            </div>
          </form>
          {dataAlertas && (
            <div className="multisteps-form__content">
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-8 px-4"
                  style={{ height: "470px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={dataAlertas}
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

export default AlertasScreen;
