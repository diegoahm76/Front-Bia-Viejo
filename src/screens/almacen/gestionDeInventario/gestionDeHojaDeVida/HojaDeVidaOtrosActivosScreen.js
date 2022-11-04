//import "react-quill/dist/quill.snow.css";
import { AgGridReact } from "ag-grid-react";
import { useForm } from "react-hook-form";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from '../../../../components/Subtitle'
const HojaDeVidaOtrosActivosScreen = () => {
  const { register, handleSubmit } = useForm();

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };
  const defaultColDef2 = {
    sortable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  let gridApi;
  const rowData = [
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Jorge Sarmiento",
    },
    {
      NU: "01",
      TI: "Preventivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Arreglo de ingenieria",
    },
    {
      NU: "01",
      TI: "Calibración",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Calibravillavo",
    },
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Arreglo de ingenieria",
    },
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Programado",
      RE: "Arreglo de ingenieria",
    },
  ];
  const asignacionPrestamos = [
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Contabilidad",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Prestamos",
    },
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
  ];
  const columnDefs = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
    { headerName: "Fecha", field: "FE", minWidth: 150 },
    { headerName: "Estado", field: "ES", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
  ];
  const columnDefs2 = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
    { headerName: "Grupo", field: "GR", minWidth: 150 },
    { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
    { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
  ];

  const onSubmit = (data) => {
    console.log(data)
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Hoja de vida de otros activos
            </h3>
            <MarcaDeAgua1>
              <Subtitle title="Activo" mt={3} />

              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Codigo:
                  </label>
                  <input
                    type="number"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreVivero", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
              </div>

              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Serial:
                  </label>
                  <input
                    type="number"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Articulo:
                  </label>
                  <input
                    type="number"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
              </div>

              <Subtitle title="Caracteristicas" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 mb-3">
                  <textarea
                    className="form-control border rounded-pill px-3"
                    placeholder="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
                    rows={4}
                  />
                </div>
              </div>

              <Subtitle title="Especificaciones Físicas" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Color:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Marca:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Estado:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Modelo:
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
              </div>

              <Subtitle title="Especificaciones técnicas" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 mb-3">
                  <textarea
                    className="form-control border rounded-pill px-3"
                    placeholder="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
                    rows={4}
                  />
                </div>
              </div>
              <Subtitle title="Mantenimientos" mt={3} mb={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div
                  className="ag-theme-alpine mb-3 px-4"
                  style={{ height: "230px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-auto">
                <button
                  className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                  type="button"
                  title="Send"
                >
                  Programar
                </button>
              </div>

              <Subtitle title="Asiganciones/Préstaciones" mt={3} mb={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div
                  className="ag-theme-alpine mb-3 px-4"
                  style={{ height: "230px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs2}
                    rowData={asignacionPrestamos}
                    defaultColDef={defaultColDef2}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="btn bg-gradient-primary me-md-2"
                  type="button"
                  title="Send"
                >
                  Historico de archivo
                </button>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
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

            </MarcaDeAgua1>
          </form>
        </div>
      </div>

    // </div>
  );
};
export default HojaDeVidaOtrosActivosScreen;
