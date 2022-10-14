//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


const rowData = [
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Manu", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },
  { CODE: "jobo", NAME: "spondias mombin L.", RES: "Mich", AOP: "El Calvario", DEVO: "3.11.019.131" },

];

const BusquedaArticuloPrestadoScreen = () => {
  
  const { register, control, formState: { errors }, } = useForm();

  const options = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
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
              <h5 className="font-weight-bolder">Articulos</h5>
              <div className="multisteps-form__content">
                <div className="row">
                  <label className="form-control ms-0 fw-bolder text-center">
                    <n>Datos del coordinador</n>
                  </label>
                  <div className="col-12 col-sm-4">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Tipo de documento{" "}
                      <div className="col-12 ">
                        <Controller
                          name="tipoDocumento1"
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
                        /></div>
                    </label>

                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic ">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="numero cedula"
                        {...register("numeroCedula")}
                      />
                      <label className="ms-2">Número de cedula</label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 d-grid gap-2 d-md-flex justify-content-md-center">
                    <button
                      type="submit"
                      className="mt-4 btn btn-primary flex-center text-capitalize"
                    >
                      Buscar
                    </button>
                  </div>
                </div>

                <div className="row">
                  <label className="form-control ms-0 fw-bolder text-center">
                    <n>Datos del coordinador</n>
                  </label>
                  <div className="col-12 col-sm-4">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Tipo de documento{" "}
                      <div className="col-12 ">
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
                        /></div>
                    </label>

                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic ">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="numero cedula"
                        {...register("numeroCedula")}
                      />
                      <label className="ms-2">Número de cedula</label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="nombre completo"
                        {...register("nombreCompleto")}
                      />
                      <label className="ms-2">Nombre completo</label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="submit"
                      className="mt-4 btn btn-primary flex-center text-capitalize"
                    >
                      Buscar
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group mt-3 col-6 col-sm-6">
                    <label className="font-weight" for="cantidadKg">
                      Dependencia:
                    </label>

                    <Controller
                      name="dependencia"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionDependencia}
                          placeholder="Administrativa y financiera"
                        />
                      )}
                    />
                    {errors.nombre && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>
                  <div className="form-group mt-3 col-6 col-sm-6">
                    <label className="font-weight" for="cantidadKg">
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
                    {errors.nombre && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-1 col-sm-1">
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
                  <div className="col-3 col-sm-3">
                    <div className="form-check">
                      <label
                        className="form-check-label mb-2"
                        for="radioBotonSi"
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
                  <div className="col-4 col-sm-4">
                    <div className="form-check">
                      <label
                        className="form-check-label mb-2"
                        for="radioBotonNo"
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
                  <div className="col-4 col-sm-4">
                    <div className="form-check">
                      <label
                        className="form-check-label mb-2"
                        for="radioBotonAsig"
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
                <div class="d-grid gap-2 d-md-flex justify-content-md-center ">
                  <button
                    className="btn bg-gradient-primary me-md-2"
                    type="button"
                    title="Send"
                  >
                    Buscar
                  </button>
                </div>

                <div className="ag-theme-alpine mt-auto mb-4 px-4" style={{ height: '260px' }}>
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  >

                  </AgGridReact>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-auto">
                  <button
                    className="btn bg-gradient-primary me-md-2"
                    type="button"
                    title="Send"
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn bg-gradient-danger "
                    type="button"
                    title="Send"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default BusquedaArticuloPrestadoScreen;
