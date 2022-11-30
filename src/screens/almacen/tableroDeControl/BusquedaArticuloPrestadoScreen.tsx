//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import React, { useState } from "react";
import Subtitle from '../../../components/Subtitle'

const rowData = [
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Manu", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },

];

const BusquedaArticuloPrestadoScreen = () => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => { };

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
    { label: "Administrativa y financiera", value: "AF" },
    { label: "Administrativa", value: "AD" },

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
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Busqueda de articulos asignados o prestados
            </h3>
            <Subtitle title="Articulos" mt={3} />

            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Código: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
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
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Nombre:
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Equipo de computo"
                  className="form-control border border-terciary rounded-pill px-3"
                />
              </div>
              <div className="col-12 col-md-3">
                <button
                  className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaArticuloIsActive(true)}
                >
                  Buscar Articulo
                </button>
              </div>
            </div>
            <Subtitle title="Responsable" mt={3} />


            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
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
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Número de documento: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Numero de documento"
                  className="form-control border border-terciary rounded-pill px-3"
                />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Nombre:
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Gina Rodríguez"
                  className="form-control border border-terciary rounded-pill px-3"
                />
              </div>
              <div className="col-12 col-md-3">
                <button
                  className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaPersonalIsActive(true)}
                >
                  Buscar personal
                </button>
              </div>
            </div>

            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Dependencia:
                </label>
                <Controller
                  name="dependencia"
                  // REVISAR onClick={() => setRenderParcial(true)}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={() => setRenderParcial(true)}
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
                    <label className="text-terciary">
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

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Filtrar: <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check col-12 col-md-2 mb-3">
                <label className="text-terciary form-check-label ">
                  Todos {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonTodos"
                  />
                </label>
              </div>
              <div className="form-check col-12 col-md-2 mb-3">
                <label className="text-terciary form-check-label ">
                  Asignados{""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonAsignados"
                  />
                </label>
              </div>
              <div className="form-check col-12 col-md-2 mb-3">
                <label className="text-terciary form-check-label ">
                  Prestados {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonPrestados"
                  />
                </label>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center ">
              <button
                className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
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
