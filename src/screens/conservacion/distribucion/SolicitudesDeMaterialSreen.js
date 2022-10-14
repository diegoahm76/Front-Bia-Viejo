import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { activeModalAction, desactiveModalAction } from "../../../actions/modalActions";
import CalendarModal from "../../../components/CalendarModal";

const SolicitudesDeMaterialSreen = () => {
  const [selectedViveros, setSelectedViveros] = useState(null);
  const opcViveros = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const [vivero, setVivero] = useState({
    options: "",
  });
  const submit = (data) => {
    console.log(data);
    setVivero({ options: data.options.value });
  };

  const {
    register,
    setError,
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

  const [datosFilasAgregar] = useState([
    {
      nombre: "Yopo",
      total: 2000,
    },
    {
      nombre: "Pomaroso",
      total: 4000,
    },
    {
      nombre: "Flor amarillo",
      total: 2000,
    },
    {
      nombre: "Flor morado",
      total: 3000,
    },
    {
      nombre: "Pala draga",
      total: 2000,
    },
    {
      nombre: "Abono",
      total: 5000,
    },
    {
      nombre: "Insecticida",
      total: "",
    },
    {
      nombre: "triple 15",
      total: "",
    },
    {
      nombre: "Tierra negra",
      total: "",
    },
    {
      nombre: "Arena",
      total: "",
    },
    {
      nombre: "Cascarilla",
      total: "",
    },
    {
      nombre: "Algarrobo",
      total: "",
    },
    {
      nombre: "Palmoriche",
      total: "",
    },
    {
      nombre: "Yopo",
      total: 2000,
    },
    {
      nombre: "Pomaroso",
      total: 4000,
    },
    {
      nombre: "Flor amarillo",
      total: 2000,
    },
    {
      nombre: "Flor morado",
      total: 3000,
    },
    {
      nombre: "Pala draga",
      total: 2000,
    },
    {
      nombre: "Abono",
      total: 5000,
    },
  ]);

  const [datosFilasAgregado] = useState([
    {
      nombre2: "",
      total2: "",
    },
  ]);

  const columnasMaterialDisponible = [
    { headerName: "Material solicitada", field: "nombre" },
    { headerName: "Produccion Propia", field: "total" },
    { headerName: "Compensación", field: "totalc" },
    { headerName: "Medidas de resacimiento", field: "totalm" },
    { headerName: "Donación", field: "totald" },
  ];

  const columnaMaterialAgregado = [
    { headerName: "Material", field: "nombre2" },
    { headerName: "Cantidad", field: "total2" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button class="btn btn-2 btn-primary" type="button">
            Remover
          </button>
        </div>
      ),
    },
  ];

  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    floatingFilter: false,
    suppressMovable: true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(activeModalAction());
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  const [selectedMunicipios, setSelectedMunicipios] = useState(null);
  const [select, setSelect] = useState({
    numeroinfo: "",
    veredaynombre: "",
  });
  const opcMunicipios = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
    { label: "Restrepo", value: "RE" },
    { label: "Acacias", value: "AC" },
    { label: "La Uribe", value: "LU" },
    { label: "San Martin", value: "SM" },
  ];

  const [native, setNative] = useState("");
  const onNativeChange = (e) => {
    setNative(e.target.value);
  };

  const onSubmit = (data) => {
    setSelect(data.seleccionMunicipio);
    console.log(data);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-sm-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Solicitud de Material Vegetal
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="card mt-5">
            <div className="row mt-4">
              <label className="col px-6">Numero de solicitud</label>
              <label className="col-6 align:right">Fecha</label>
            </div>
            <div className="row mt-6">
              <div className="row ms-1 me-6 mb-1">
                <div className="col col-sm-6">
                  <label className="form-control ms-0">
                    Selecione Vivero:{" "}
                  </label>
                  <Controller
                    name="options"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcViveros}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors.options && (
                    <p className=" form-control ms-0 text-danger">
                      Este campo es obligatorio
                    </p>
                  )}
                </div>

                <div className="col-6 col-sm-6 ">
                  <button
                    className="mt-5 btn btn-primary text-capitalize "
                    type="submit"
                    form="configForm"
                  >
                    Buscar
                  </button>
                </div>

                {vivero.options ? (
                  <div>
                    <div className="d-flex mt-4 px-4 justify-content-start">
                      <div>
                        <label>Material Vegetal Disponible</label>
                      </div>
                    </div>

                    <div id="myGrid" className="ag-theme-alpine ">
                      <div
                        className="ag-theme-alpine"
                        style={{ height: "250px" }}
                      >
                        <AgGridReact
                          columnDefs={columnasMaterialDisponible}
                          rowData={datosFilasAgregar}
                          defaultColDef={defaultColDef}
                          onGridReady={onGridReady}
                        ></AgGridReact>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <div className="col">
                  <label className="px-4">Escribe la cantidad </label>
                  <input className=" "></input>
                  <button
                    className="btn btn-2 btn-secondary ms-4 mt-4"
                    type="button"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col px-5">
                  <div
                    className="ag-theme-alpine mt-7 mb-3"
                    style={{ height: "250px" }}
                  >
                    <AgGridReact
                      columnDefs={columnaMaterialAgregado}
                      rowData={datosFilasAgregado}
                      debounceVerticalScrollbar={true}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
              <div className="col px-6">
                <button className="btn btn-2 btn-primary" type="button">
                  Remover todo
                </button>
              </div>
            </div>
            <div className="row mt-5">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div className="col px-6">
                  <button className="btn btn-2 btn-light px-6 text-capitalize">
                    Cancelar
                  </button>
                </div>
                <div className="col-6 px-6  ">
                  <button
                    className="btn btn-2 btn-primary px-6 text-capitalize"
                    onClick={handleOpenModal}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <CalendarModal>
          <div className="row min-vh-100">
            <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <h5 className="mt-3 mb-0 text-center mb-6">
                Informacion Adicional de la Solicitud de Material Vegetal
              </h5>
              <form onSubmit={handleSubmit2(onSubmit)}>
                <div className="card mt-5">
                  <div className="col ms-5 me-3">
                    <div className="row">
                      <div className="col ms-3 me-3 mt-5">
                        <label>Numero de informe de caracterizacion: (*)</label>
                        <div className="me-3 input-group input-group-dynamic">
                          <input
                            className="multisteps-form__input form-control"
                            {...register2("numeroinfo", {
                              required: true,
                            })}
                            placeholder="Numero de informe de caracterizacion"
                          />
                        </div>
                        {errors.numeroinfo && (
                          <p className="text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
                        <div>
                          <label for="formFileLg" class="form-label"></label>
                          <input
                            class="form-control form-control-lg mt-6"
                            id="formFileLg"
                            type="file"
                          />
                        </div>
                        <div>
                          {errors.formFileLg && (
                            <p className="text-danger">
                              Este documento es obligatorio
                            </p>
                          )}
                        </div>

                        <label className="mt-5 ms-3">
                          Municipio donde se llevara el material vegetal: (*)
                        </label>
                        <Controller
                          name="seleccionMunicipio"
                          control={control2}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={opcMunicipios}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                        {errors.seleccionMunicipio && (
                          <p className="text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
                      </div>

                      <div className="col-6 mt-5 ms-3 ">
                        <label>Fechas de retiro de material vegetal: (*)</label>
                        <div>
                          <input
                            type="date"
                            value={native}
                            onChange={onNativeChange}
                          />
                        </div>
                        {errors.native && (
                          <p className="text-danger">
                            Este campo es obligatorio
                          </p>
                        )}

                        <label className="mt-8 ms-3">
                          Vereda y nombre de predio: (*)
                        </label>
                        <div className="me-4 mt-1 input-group input-group-dynamic">
                          <input
                            className="multisteps-form__input form-control"
                            {...register2("veredaynombre", {
                              maxLength: 200,
                              required: true,
                            })}
                            placeholder="Nombre de vereda y predio"
                          />
                        </div>
                        {errors.veredaynombre && (
                          <p className="text-danger small">
                            Este campo es obligatorio
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <input
                        className="btn btn-2 btn-secondary ms-4 mt-5 text-capitalize"
                        type="submit"
                        style={{ width: "150px" }}
                        value="Solicitar"
                      />

                      <div className="d-flex justify-content-end">
                        <button
                          className="btn bg-gradient-danger mt-3"
                          onClick={handleCloseModal}
                        >
                          Atras
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </CalendarModal>
      </div>
    </div>
  );
};
export default SolicitudesDeMaterialSreen