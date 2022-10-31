import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from "react-select";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
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
          <button className="btn btn-2 btn-primary" type="button">
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

  const [formValues, setFormValues] = useState({
    fechaIngreso: "",
  });

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-sm-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Solicitud de Material Vegetal
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="row mt-4 ms-4">
            <label className="col-12 col-md-4">Numero de solicitud</label>
            <div className="col-12 col-md-4">
              <div className=" input-group input-group-dynamic flex-column">
                <label htmlFor="exampleFormControlInput1">
                  Fecha de solicitud
                </label>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <ReactDatePicker
                      {...field}
                      locale="es"
                      //required
                      selected={formValues.fechaIngreso}
                      onSelect={(e) =>
                        setFormValues({ ...formValues, fechaIngreso: e })
                      }
                      className="col-4 multisteps-form__input form-control p-2"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
              </div>
            </div>
            
          </div>
          <div className="row mt-4 ms-2">
            <div className="row ms-1 me-6 mb-1">
              <div className="col-12 col-md-4">
                <label className="form-control ms-0">Selecione Vivero: </label>
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
            <div className="row ms-2">
              
              <div className="col-12 col-md-4 mt-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="NumeroInforme"
                      rules={{ required: true }}
                      {...register("NumeroInforme")}
                    />
                    <label>Escribir cantidad: <span className="text-danger">*</span></label>
                  </div>
                  {errors.NumeroInforme && (
                          <p className="text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
                </div>
                <div className="col-12 col-md-4 mt-4">
                <button
                  className="btn btn-secondary text-capitalize ms-4 mt-4"
                  type="button"
                >
                  Agregar
                </button>
                </div>
            </div>

            <div className="row mt-2">
              <div className="col px-5">
                <div
                  className="ag-theme-alpine mt-5 mb-3"
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
            <div className="col-12 px-6 d-flex justify-content-end gap-4 mt-4">
              <button
                className="btn btn-primary text-capitalize"
                type="button"
              >
                Remover todo
              </button>
            </div>
          </div>
          <div className="row mt-5">
          
              <div className="col-12 px-6 d-flex justify-content-end gap-4 mt-4">
                <button className="btn btn-light text-capitalize">
                  Cancelar
                </button>
              
                <button
                  className="btn  btn-primary  text-capitalize"
                  onClick={handleOpenModal}
                >
                  Siguiente
                </button>
              </div>
            
          </div>
        </form>
        <CalendarModal>
          <div className="row min-vh-100">
            <div className="col-lg-10 col-md-10 col-sm-12 mx-auto">
              <h5 className="mt-3 mb-0 text-center mb-6">
                Informacion Adicional de la Solicitud de Material Vegetal
              </h5>
              <form onSubmit={handleSubmit2(onSubmit)}>
                <div className="row ms-5">
                <div className="col-10 col-md-4 mt-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="NumeroInforme"
                      rules={{ required: true }}
                      {...register("NumeroInforme")}
                    />
                    <label>N° informe de caracterizacion: <span className="text-danger">*</span></label>
                  </div>
                  {errors.NumeroInforme && (
                          <p className="text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
                        <div>
                          <label htmlFor="formFileLg" className="form-label"></label>
                          <input
                            className="form-control form-control-lg mt-6"
                            id="formFileLg"
                            type="file"
                          />
                        
                      
                    </div>
                  </div>
                  {errors.fechaRetiro && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
                <div className="row mt-4 ms-5">
                  <div className="col-6 col-md-4">
                    <label>
                      Municipio de destino: (*)
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
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Vereda"
                      rules={{ required: true }}
                      {...register("Vereda")}
                    />
                    <label>Vereda y nombre de predio: <span className="text-danger">*</span></label>
                  </div>
                  {errors.Consecutivo && (
                          <p className="text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
                </div>
                </div>

                <div className="row ms-5">
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
                </div>

                <div className="row mt-4">
                  <div className="d-flex justify-content-end">
                    <input
                      className="btn btn-secondary  text-capitalize"
                      type="submit"
                      value="Solicitar"
                    />

                    <button
                      className="ms-4 btn btn-danger  text-capitalize"
                      onClick={handleCloseModal}
                    >
                      Atras
                    </button>
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
export default SolicitudesDeMaterialSreen;
