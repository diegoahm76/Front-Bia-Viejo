//import "react-quill/dist/quill.snow.css";
import { AgGridReact } from "ag-grid-react";
import { useForm } from "react-hook-form";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const HojaDeVidaOtrosActivosScreen = () => {

  const { register, handleSubmit } = useForm();


  const defaultColDef = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }
  const defaultColDef2 = { sortable: true, flex: 1, filter: true, wrapHeaderText: true, resizable: true, initialWidth: 200, autoHeaderHeight: true, suppressMovable: true }

  const onGridReady = (params) => {
    gridApi = params.api
  }

  let gridApi
  const rowData = [
    { NU: "01", TI: "Correctivo", FE: "19/05/2020", ES: "Completado", RE: "Jorge Sarmiento" },
    { NU: "01", TI: "Preventivo", FE: "19/05/2020", ES: "Completado", RE: "Arreglo de ingenieria" },
    { NU: "01", TI: "Calibración", FE: "19/05/2020", ES: "Completado", RE: "Calibravillavo" },
    { NU: "01", TI: "Correctivo", FE: "19/05/2020", ES: "Completado", RE: "Arreglo de ingenieria" },
    { NU: "01", TI: "Correctivo", FE: "19/05/2020", ES: "Programado", RE: "Arreglo de ingenieria" },

  ];
  const asignacionPrestamos = [
    { NU: "01", RE: "Gina Hernandez", GR: "Administración", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Asignacion" },
    { NU: "01", RE: "Gina Hernandez", GR: "Contabilidad", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Prestamos" },
    { NU: "01", RE: "Gina Hernandez", GR: "Administración", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Asignacion" },
    { NU: "01", RE: "Gina Hernandez", GR: "Administración", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Asignacion" },
    { NU: "01", RE: "Gina Hernandez", GR: "Administración", FEIN: "19/05/2020", FEFI: "13/08/2020", TI: "Asignacion" },

  ];
  const columnDefs = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
    { headerName: "Fecha", field: "FE", minWidth: 150 },
    { headerName: "Estado", field: "ES", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
  ]
  const columnDefs2 = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
    { headerName: "Grupo", field: "GR", minWidth: 150 },
    { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
    { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
  ]

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Hoja de vida de un activo
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit()}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="row">
              <label className="form-control ms-0  text-center">
                <n>Activo</n>
              </label>

              <div className="col-12 col-sm-4">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    className="form-control"
                    type="text"

                    disabled="true"
                  />
                  <label className="ms-2">160064</label>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    disabled="true"
                  />
                  <label className="ms-2">Lenovo Laptop</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-4">
                <label className="form-control ms-0 text-center mt-3 ">
                  <n>Serial</n>
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-control ms-0 text-center mt-3 ">
                  <n>Artículo</n>
                </label>
              </div>
              <div className="col-12 col-sm-4">
              </div>

              <div className="col-12 col-sm-4">
                <div className="form-floating input-group input-group-dynamic ms-2">
                  <input
                    className="form-control"
                    type="text"
                    disabled="true"
                  />
                  <label className="ms-2">93rtgd</label>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="form-floating input-group input-group-dynamic ms-2">
                  <input
                    className="form-control"
                    type="text"
                    disabled="true"
                  />
                  <label className="ms-2">Computador</label>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <label className="form-control ms-0 text-center mt-3">
                <n>Caracteristicas</n>
              </label>
              <div className="input-group input-group-dynamic flex-column my-3">
                <textarea
                  className="multisteps-form__textarea form-control p-0 w-auto ms-1"
                  type="number"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  name="nombre"
                  {...register("nombre", { required: true })}
                />
              </div>
            </div>
            <div className="row mb-4">
              <label className="form-control ms-0 text-center mt-2">
                <n>Especificaciones fisicas</n>
              </label>
              <div className="col-12 col-sm-4">
                <label className="form-control ms-0 text-center mt-1 ">
                  <n>Color:</n>
                </label>
                <div className="form-floating input-group input-group-dynamic ms-2">
                  <input
                    className="form-control"
                    type="text"
                    disabled="true"
                  />
                  <label className="ms-2">Amarillo</label>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-control ms-0 text-center mt-1 ">
                  <n>Marca:</n>
                </label>
                <div className="form-floating input-group input-group-dynamic ms-2">
                  <input
                    className="form-control"
                    type="text"
                    disabled="true"
                  />
                  <label className="ms-2">Garmin</label>
                </div>
              </div>

              <div className="col-12 col-sm-4">
                <label className="form-control ms-0 text-center mt-1 ">
                  <n>Estado:</n>
                </label>
                <div className="form-floating input-group input-group-dynamic ms-2">
                  <input
                    className="form-control"
                    type="text"
                    disabled="true"
                  />
                  <label className="ms-2">Bueno</label>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-4">
                  <label className="form-control ms-0 text-center mt-1 ">
                    <n>Modelo:</n>
                  </label>
                  <div className="form-floating input-group input-group-dynamic ms-2">
                    <input
                      className="form-control"
                      type="text"
                      disabled="true"
                    />
                    <label className="ms-2">10px</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <label className="form-control ms-0 fw-bolder text-center mt-3">
                <n>Especificaciones técnicas</n>
              </label>
              <div className="input-group input-group-dynamic flex-column my-3">
                <textarea
                  className="multisteps-form__textarea form-control p-0 w-auto ms-1"
                  type="number"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  name="nombre"
                  {...register("nombre", { required: true })}
                />
              </div>
            </div>

            <div className="row">
              <label className="form-control ms-0 text-left mt-auto ms-4">
                <n>Mantenimientos</n>
              </label>
              <div className="ag-theme-alpine mt-auto mb-3 px-4" style={{ height: '275px' }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                >
                </AgGridReact>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-gradient-primary me-md-2"
                type="button"
                title="Send"
              >
                Programar
              </button>
            </div>

            <div className="row">
              <label className="form-control ms-0 fw-bolder text-left mt ms-4">
                <n>Asignaciones/Préstamos</n>
              </label>
              <div className="ag-theme-alpine mt-auto mb-4 px-4" style={{ height: '275px' }}>
                <AgGridReact
                  columnDefs={columnDefs2}
                  rowData={asignacionPrestamos}
                  defaultColDef={defaultColDef2}
                  onGridReady={onGridReady}
                >
                </AgGridReact>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-gradient-primary me-md-2"
                type="button"
                title="Send"
              >
                Historico de archivo
              </button>
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-gradient-primary me-md-2"
                type="button"
                title="Send"
              >
                Guardar
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

        </form>
      </div>
    </div >

    // </div>
  );
};
export default HojaDeVidaOtrosActivosScreen;
