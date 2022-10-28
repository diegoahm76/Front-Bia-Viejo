//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import React, { useState } from "react";

const rowData = [
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Manu", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },

];

const BusquedaArticuloPrestadoScreen = () => {

  const { register, control, formState: { errors }, } = useForm();

  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);

  const [renderParcial, setRenderParcial] = useState(false)

  const options = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "Registro civil", value: "RC" },
    { label: "Others", value: "OT" },
  ];
  const optionDependencia = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];
  const optionGroup = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];
  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
  const onGridReady = (params) => {
    gridApi = params.api
  }

  let gridApi
  const columnDefs = [
    { headerName: "Codigo", field: "CODE" },
    { headerName: "Nombre", field: "NAME", },
    { headerName: "Responsable", field: "RES", },
    { headerName: "Fecha de asignacion o prestamo", field: "AOP", },
    { headerName: "Fecha de devolición", field: "DEVO" },
  ]

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Busqueda de articulos asignados y prestados
        </h3>
        <div className="card">
          <form className="multisteps-form__form">
            <div
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
            >
              <div className="multisteps-form__content">
                <div className="row mb-3">
                  <label className="form-control border rounded-pill px-3 bg-success mt-3 text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                    <n>Articulos</n>
                  </label>

                  <div className="col-12 col-sm-4 col-lg-4">
                    <label>
                      Código: <span className="text-danger">*</span>
                    </label>
                    <input
                      name="valorCodigo"
                      type="number"
                      className="form-control border rounded-pill px-3"
                      {...register("valorCodigo", { required: true })}
                    />
                    {errors.valorCodigo && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-sm-4 col-lg-4">
                    <label>
                      Nombre:
                    </label>
                    <input
                      disabled="true"
                      name="nombre"
                      type="text"
                      placeholder="Equipo de computo"
                      className="form-control border rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-sm-4 col-lg-4 mt-2">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary mt-4 mb-0 text-capitalize"
                      type="button"
                      title="Send"
                      form="configForm"
                      onClick={() => setBusquedaArticuloIsActive(true)}
                    >
                      Buscar Articulo
                    </button>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="multisteps-form__content">
                    <div className="row mb-3">
                      <label className="form-control border rounded-pill px-3 bg-success mt-3 text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                        <n>Responsable</n>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-lg-4">
                    <label>
                      Tipo de documento{" "} <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="tipoDocumento2"
                      control={control} rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-sm-4 col-lg-4">
                    <label>
                      Número de documento: <span className="text-danger">*</span>
                    </label>
                    <input
                      name="numeroDocumento"
                      type="text"
                      placeholder="Numero de documento"
                      className="form-control border rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-sm-4 col-lg-4">
                    <label>
                      Nombre:
                    </label>
                    <input
                      disabled="true"
                      name="nombre"
                      type="text"
                      placeholder="Gina Rodríguez"
                      className="form-control border rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-sm-12 d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="submit"
                      className="border rounded-pill px-3 btn bg-gradient-primary mt-3 mb-0 text-capitalize"
                    >
                      Buscar
                    </button>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="form-group col-12 col-sm-4 col-lg-4">
                    <label>
                      Dependencia:
                    </label>
                    <Controller
                      name="dependencia"
                      onClick={() => setRenderParcial(true)}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionDependencia}
                          placeholder="Administrativa y financiera"

                        />
                      )}
                    />
                    {errors.dependencia && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>

                  {
                    renderParcial &&
                    (

                      <div className="form-group col-12 col-sm-4 col-lg-4">
                        <label>
                          Grupo:
                        </label>
                        <Controller
                          name="grupo"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={optionGroup}
                              placeholder="Contaduria"
                            />
                          )}
                        />
                        {errors.grupo && (
                          <p className="text-danger">Este campo es obligatorio</p>
                        )}
                      </div>
                    )
                  }
                </div>

                <div className="row mb-1">
                  <div className="col-12 col-sm-1">
                    <div className="form">
                      <label>
                        Filtrar:
                      </label>
                      <input
                        className="multisteps-form__input form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-lg-3">
                    <div className="form-check">
                      <label
                        className="form-check-label"
                        htmlFor="radioBotonSi"
                      >
                        Todos
                      </label>
                      <input
                        className="form-check-input ms-2"
                        type="radio"
                        name="radioBoton"
                        id="radioBotonSi"
                      ></input>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4">
                    <div className="form-check">
                      <label
                        className="form-check-label"
                        htmlFor="radioBotonNo"
                      >
                        Prestados
                      </label>
                      <input
                        className="form-check-input ms-2"
                        type="radio"
                        name="radioBoton"
                        id="radioBotonNo"
                      ></input>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-sm-4">
                    <div className="form-check">
                      <label
                        className="form-check-label"
                        htmlFor="radioBotonAsig"
                      >
                        Asignados
                      </label>
                      <input
                        className="form-check-input ms-2"
                        type="radio"
                        name="radioBoton"
                        id="radioBotonAsig"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center ">
                  <button
                    className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Buscar
                  </button>
                </div>

                <div className="ag-theme-alpine mt-auto mb-4 px-auto" style={{ height: '260px' }}>
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  >

                  </AgGridReact>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-auto">
                  <button
                    className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Cancelar
                  </button>
                  <button
                    className="border rounded-pill px-3 btn bg-gradient-danger mb-3 text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </form>
          <BusquedaDePersonalModal
            isModalActive={busquedaPersonalIsActive}
            setIsModalActive={setBusquedaPersonalIsActive}
          />

          <BusquedaArticuloModal
            isModalActive={busquedaArticuloIsActive}
            setIsModalActive={setBusquedaArticuloIsActive}
          />
        </div>
      </div>
    </div>
    // </div>
  );
};
export default BusquedaArticuloPrestadoScreen;
