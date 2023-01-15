import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Controller, useForm } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from "../../../../components/Subtitle";
import SearchArticleCvModal from "../../../../components/Dialog/SearchArticleCvModal";
import { Select } from "@material-ui/core";

const HojaDeVidaOtrosActivosScreen = () => {
  const { register, handleSubmit } = useForm();

  const [buscarArticulo, setBuscarArticulo] = useState(false);

  const columdemantenimiento = [
    { Numero: "Numero", field: "numero", minWidth: 150 },
    { headerName: "Tipo", field: "tipo", minWidth: 150 },
    { headerName: "Fecha", field: "fecha", minWidth: 150 },
    { headerName: "Estado", field: "estado", minWidth: 150 },
    { headerName: "Responsable", field: "responsable", minWidth: 150 },
  ];
  const rowdata = [
    {
      numero: "01",
      tipo: "correctivo",
      fecha: "20/01/2022",
      estado: "completado",
      responsable: "Oliver Amaya",
    },
    {
      numero: "02",
      tipo: "preventivo",
      fecha: "23/02/2022",
      estado: "completado",
      responsable: "Julian Castillo",
    },
    {
      numero: "03",
      tipo: "correctivo",
      fecha: "20/01/2022",
      estado: "completado",
      responsable: "Oliver Amaya",
    },
    {
      numero: "04",
      tipo: "preventivo",
      fecha: "23/02/2022",
      estado: "completado",
      responsable: "Julian Castillo",
    },
  ];
  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };
  const columnDefs2 = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
    { headerName: "Grupo", field: "GR", minWidth: 150 },
    { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
    { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
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
      NU: "02",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "03",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "04",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "05",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-rigth  fw-light mt-4">
              Crear hoja de vida de otros activos
            </h3>
            <Subtitle title="Activo" mt={3} />
            <div className="row">
              <div className="col-12 col-lg-6  mt-3">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div>
                      <label className="ms-2 text-terciary">
                        Serial<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        {...register("doc_identificador_nro", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 ">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre del activo<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Nombre del activo"
                        disabled
                        {...register("nombre", { required: false })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6  mt-3">
                    <label className="ms-2 text-terciary">
                      Código<span className="text-danger">*</span>
                    </label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="Código"
                      disabled
                      {...register("codigo_bien", { required: false })}
                    />
                  </div>

                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="btn btn-sm btn-tablas mt-5"
                      type="button"
                      title="Buscar"
                      onClick={() => setBuscarArticulo(!buscarArticulo)}
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-tablas mt-5"
                      type="button"
                      title="Limpiar"
                    >
                      <i className="fa-solid fa-eraser fs-3"></i>
                    </button>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="col-12 col-lg-6  mt-3">
                <div className="row">
                  <div className="col-12 col-lg-6 ">
                    <button
                      className="border rounded-pill btn bg-gradient-primary mt-8"
                      type="button"
                    >
                      Busqueda de articulo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {buscarArticulo === true ? (
              <div>
                <h2 className="text-danger">
                  para tener en cuenta (borrar cuando sea leido)
                </h2>
                <h6 className="text-danger">
                  También, como con las demás hojas de vida, la información
                  básica del activo (código, nombre, serial) se obtiene con el
                  ID "T067Id_Articulo" a través de la tabla a la cual dicha
                  llave foránea hace referencia, adicionalmente, los datos
                  "Marca" y "Modelo" también se obtienen de dicha tabla
                  (T057Articulos). El Estado del activo se obtiene de la tabla
                  de inventarios (T062Inventario). Solo puede haber una hoja de
                  vida por activo y esta NO se podrá borrar si se le ha hecho
                  por lo menos un (1) mantenimiento o si ya ha tenido alguna
                  asignación.
                </h6>
                <Subtitle title="Especificaciones" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Marca</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      disabled
                      {...register("estado", { required: false })}
                    />
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Estado</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      disabled
                      {...register("estado", { required: false })}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Modelo</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      disabled
                      {...register("modelo", { required: false })}
                    />
                  </div>
                </div>

                <Subtitle title="Características físicas" mt={3} />
                <div className="row mt-3">
                  <div>
                    <div className="col-12 col-md-12 ">
                      <label className="text-terciary" htmlFor="ms-2">
                        Descripción
                      </label>
                      <textarea
                        className="form-control border rounded-pill px-4 border border-terciary"
                        {...register("otras_aplicaciones", {
                          required: false,
                        })}
                      />
                    </div>
                  </div>
                </div>
                <Subtitle title="Especificaciones técnicas" mt={3} />
                <div className="row mt-3">
                  <div>
                    <div className="col-12 col-md-12 ">
                      <label className="text-terciary" htmlFor="ms-2">
                        Descripción
                      </label>
                      <textarea
                        className="form-control border rounded-pill px-4 border border-terciary"
                        {...register("otras_aplicaciones", {
                          required: false,
                        })}
                      />
                    </div>
                  </div>
                </div>
                <Subtitle title="Mantenimientos" mt={3} mb={3} />

                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 mb-3">
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columdemantenimiento}
                        rowData={rowdata}
                        defaultColDef={defaultColDef}
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                      type="button"
                      title="Send"
                    >
                      Programar
                    </button>
                  </div>
                </div>
                <Subtitle title="Asignaciones" mt={3} mb={3} />
                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 mb-3">
                    {" "}
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs2}
                        rowData={asignacionPrestamos}
                        defaultColDef={defaultColDef}
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                      type="button"
                      title="Send"
                    >
                      Historico
                    </button>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-left col-12 col-lg-6 col-sm-6">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                      type="button"
                      title="Send"
                    >
                      Orden de la compra
                    </button>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end col-12 col-lg-6 col-sm-6">
                    <button
                      className=" px-3 btn  text-capitalize"
                      type="button"
                      title="Salir"
                    >
                      <i className="fa-solid fa-x fs-3"></i>
                    </button>
                    <button
                      className=" px-3 btn text-capitalize"
                      type="submit"
                      title="Guardar"
                    >
                      <i className="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default HojaDeVidaOtrosActivosScreen;
