import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import Subtitle from "../../components/Subtitle";
import { AgGridReact } from "ag-grid-react";
import SearchTrdModal from "../../components/Dialog/SearchTrdModal";
const TrdScreen = () => {
  const [consultaTrdIsactive, setConsultaTrdIsactive] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  const columnAsigancion = [
    {
      headerName: "Sección",
      field: "sección",
      minWidth: 150,
      maxWidth: 300,
    },

    {
      headerName: "Subsección",
      field: "Subseccón",
      minWidth: 150,
      maxWidth: 300,
    },

    {
      headerName: "serie",
      field: "serie",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "subserie",
      field: "subserie",
      minWidth: 150,
      maxWidth: 300,
    },
  ];
  const rowData = [
    {
      sección: "Direccion general",
      Subseccón: "Gestion ambiental",
      serie: "1",
      subserie: "1,3,7,9",
    },
    {
      sección: "Direccion general",
      Subseccón: "",
      serie: "2",
      subserie: "5,8,3,9",
    },
    {
      sección: "Direccion general",
      Subseccón: "Oficina juridica",
      serie: "4",
      subserie: "1,10,9,25",
    },
    {
      sección: "Direccion general",
      Subseccón: "Oficina juridica",
      idserie: "5",
      idsubserie: "3,6",
    },
  ];
  const columnformato2 = [
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "Formato",
      field: "formato",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "Editar",
      field: "editar",
      cellRendererFramework: (params) => (
        <div>
          <button className="btn text-capitalize " type="button" title="Editar">
            <i className="fa-regular fa-pen-to-square fs-4"></i>
          </button>
        </div>
      ),
    },
    {
      headerName: "Eliminar",
      field: "eliminar",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn text-capitalize "
            type="button"
            title="Eliminar"
          >
            <i className="fa-regular fa-trash-can fs-4"></i>
          </button>
        </div>
      ),
    },
  ];
  const rowData2 = [
    {
      nombre: ".dcx",
      formato: "Electronico",
    },
    {
      nombre: "papel",
      formato: "Fisico",
    },
    {
      nombre: "acetato",
      formato: "Fisico",
    },
    {
      nombre: ".xlsx.",
      formato: "Electronico",
    },
  ];
  const columntipologia = [
    {
      headerName: "Codigo",
      field: "codigo",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "Soporte",
      field: "soporte",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "Formato",
      field: "formato",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "Editar",
      field: "editar",
      cellRendererFramework: (params) => (
        <div>
          <button className="btn text-capitalize " type="button" title="Editar">
            <i className="fa-regular fa-pen-to-square fs-4"></i>
          </button>
        </div>
      ),
    },
    {
      headerName: "Eliminar",
      field: "eliminar",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn text-capitalize "
            type="button"
            title="Eliminar"
          >
            <i className="fa-regular fa-trash-can fs-4"></i>
          </button>
        </div>
      ),
    },
    {
      headerName: "Estado",
      field: "estado",
      cellRendererFramework: (params) => (
        <div>
          <input
            className="border border-terciary form-check-input mt-2"
            type="checkbox"
            value=""
          />
        </div>
      ),
    },
  ];
  const rowData3 = [
    {
      codigo: "1",
      nombre: "Acta",
      soporte: "fisico",
      formato: "papel",
    },
    {
      codigo: "2",
      nombre: "Resolución",
      soporte: "Electronico",
      formato: ".doc",
    },
    {
      codigo: "3",
      nombre: "oficio respuesta",
      soporte: "hibrido",
      formato: ".pdf, papel",
    },
  ];
  const columnAsigancion2 = [
    {
      headerName: "Sección",
      field: "sección",
      minWidth: 150,
      maxWidth: 300,
    },

    {
      headerName: "Subsección",
      field: "Subseccón",
      minWidth: 150,
      maxWidth: 300,
    },

    {
      headerName: "serie",
      field: "serie",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "subserie",
      field: "subserie",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div>
            <button
              className="btn btn-sm btn-tablas btn-outline-primary"
              type="button"
              title="S"
            >
              Seleccionar
            </button>
          </div>
        </div>
      ),
      minWidth: 150,
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

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <Subtitle title="Tabla de retención documental" mt={3} mb={3} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">
                  CCD
                  <samp className="text-danger"> *</samp>
                </label>
                <Controller
                  name="nombreccd"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "CCD1", value: "CCD1" },
                        { label: "CCD2", value: "CCD2" },
                        { label: "CCD3", value: "CCD3" },
                        { label: "CCD4", value: "CCD4" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.nombreccd && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Nombre del TRD
                    <samp className="text-danger"> *</samp>
                  </label>
                  <input
                    name="nombretrd"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre del CCD"
                  />
                  {errors.nombretrd && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Versión
                    <samp className="text-danger"> *</samp>
                  </label>
                  <input
                    name="versiontrd"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre del CCD"
                  />
                  {errors.versiontrd && (
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
              <div id="myGrid" className="ag-theme-alpine mt-4">
                <div className="ag-theme-alpine" style={{ height: "200px" }}>
                  <AgGridReact
                    columnDefs={columnAsigancion}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-end">
              <div className="col-12 col-lg-2 d-flex justify-content-end mt-3">
                <button
                  className="btn   text-capitalize"
                  type="button"
                  title="Buscar"
                  onClick={() => {
                    setConsultaTrdIsactive(true);
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
                <button
                  className="btn text-capitalize"
                  type="submit"
                  title="Guardar"
                >
                  <i className="fa-regular fa-floppy-disk fs-3"></i>
                </button>
                <button
                  className="btn  text-capitalize"
                  type="button"
                  title="Limpiar"
                >
                  <i className="fa-solid fa-eraser fs-3"></i>
                </button>
              </div>
            </div>

            <Subtitle title="Formato por medio" mb={3} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre</label>
                  <input
                    name="Nombre_formato"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre "
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">Soporte</label>
                <Controller
                  name="medio_formato"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Fisico", value: "fsc" },
                        { label: "Electronico", value: "elc" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-6 d-flex mt-4 justify-content-end">
                <button className="btn   text-capitalize" type="button">
                  <i className="fa-solid fa-eye fs-3 mt-2" title="ver"></i>
                </button>
                <button
                  className="btn text-capitalize mt-2"
                  type="submit"
                  title="Guardar"
                >
                  <i className="fa-regular fa-floppy-disk fs-3 mt-2"></i>
                </button>
                <button
                  className="btn  text-capitalize"
                  type="button"
                  title="Limpiar"
                >
                  <i className="fa-solid fa-eraser fs-3 mt-2"></i>
                </button>
              </div>
            </div>
            <div>
              <div id="myGrid" className="ag-theme-alpine mt-4">
                <div className="ag-theme-alpine" style={{ height: "200px" }}>
                  <AgGridReact
                    columnDefs={columnformato2}
                    rowData={rowData2}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>

            <Subtitle title="Tipologías" mt={4} mb={3} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre</label>
                  <input
                    name="nombreTipologias"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Codigo</label>
                  <input
                    name="codigoTipologias"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Codigo"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">Soporte</label>
                <Controller
                  name="medio_formato"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Fisico", value: "fsc" },
                        { label: "Electronico", value: "elc" },
                        { label: "Hibrido", value: "hib" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">Formato</label>
                <Controller
                  name="formato"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: ".doc", value: "doc" },
                        { label: "Papel", value: "pap" },
                        { label: ".xlsx", value: "xls" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-end">
              <div className="col-12 col-lg-2 d-flex justify-content-end mt-3">
                <button
                  className="btn text-capitalize"
                  type="submit"
                  title="Guardar"
                >
                  <i className="fa-regular fa-floppy-disk fs-3"></i>
                </button>
                <button
                  className="btn  text-capitalize"
                  type="button"
                  title="Limpiar"
                >
                  <i className="fa-solid fa-eraser fs-3"></i>
                </button>
              </div>
            </div>
            <div>
              <div id="myGrid" className="ag-theme-alpine ">
                <div className="ag-theme-alpine" style={{ height: "200px" }}>
                  <AgGridReact
                    columnDefs={columntipologia}
                    rowData={rowData3}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
            <Subtitle title="Asignaciones" mt={4} mb={3} />
            <div>
              <div id="myGrid" className="ag-theme-alpine ">
                <div className="ag-theme-alpine" style={{ height: "200px" }}>
                  <AgGridReact
                    columnDefs={columnAsigancion2}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Seccion</label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    value="Direccion general"
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Subseccion</label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    value="Gestion ambiental"
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Serie</label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    value="1"
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Subserie</label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    value="3"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">Disposicin final</label>
                <Controller
                  name="medio_formato"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[{ label: "Conservación total", value: "ctt" }]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="text-terciary">Requiere digitalización</label>
                <Controller
                  name="medio_formato"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Si", value: "si" },
                        { label: "No", value: "no" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Tiempo retención archivo gestion{" "}
                  </label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Tiempo retención archivo centrol
                  </label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-12  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Procedimiento
                  </label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="textarea"
                  />
                </div>
              </div>
            </div>
            <SearchTrdModal
              isModalActive={consultaTrdIsactive}
              setIsModalActive={setConsultaTrdIsactive}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrdScreen;
