import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Subtitle from "../../components/Subtitle";
import IconoEditar from "../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";

export const EdicionOrganigramaScreen = () => {
  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    console.log(data);
  };

  let gridApi;
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

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const columnasOrganigrama = [
    { headerName: "Niveles", field: "level", minWidth: 100, maxWidth: 100 },
    { headerName: "Nombre", field: "nameLevel", minWidth: 355, maxWidth: 355 },
    {
      headerName: "",
      field: "editar",
      minWidth: 140,
      maxWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas btn-outline-warning "
            type="button"
            onClick={() => {
              // dispatch(obtenerEstacionEditarAction(params.data));
              // setIsModalEditarActivate(!isModalActive);
            }}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-danger"
            type="button"
            onClick={() => {
              // confirmarEliminarRol(params.data.id_rol);
            }}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>
        </div>
      ),
    },
  ];

  const [rowDataOrganigrama] = useState([]);

  const rowData = [
    { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
    { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
  ];

  const optionRaiz = [
    { label: "Si", value: "Si" },
    { label: "No", value: "No" },
  ];

  const optionLevel = [
    { label: "Nivel 1", value: "N1" },
    { label: "Nivel 2", value: "N2" },
    { label: "Nivel 3", value: "N3" },
  ];

  const optionGroup = [
    { label: "Sección", value: "SE" },
    { label: "Subsección", value: "SU" },
  ];

  const options = [
    { label: "De linea", value: "Li" },
    { label: "De apoyo", value: "Ap" },
    { label: "De soporte", value: "So" },
  ];

  const columnDefs = [
    { headerName: "Código", field: "CO", minWidth: 100, maxWidth: 100 },
    { headerName: "Nombre", field: "NO" },
    {
      headerName: "",
      field: "editar",
      minWidth: 140,
      maxWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas btn-outline-warning "
            type="button"
            onClick={() => {
              // dispatch(obtenerEstacionEditarAction(params.data));
              // setIsModalEditarActivate(!isModalActive);
            }}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-danger"
            type="button"
            onClick={() => {
              // confirmarEliminarRol(params.data.id_rol);
            }}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Edición de Organigrama
          </h3>
          <div className={"row"}>
            <Subtitle title={"Detalles Organizacionales"} />
          </div>
          <div className="col-12 col-md-4 ms-3">
            <label className="text-terciary">
              Nombre: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3 border border-terciary"
              type="text"
              placeholder="Nombre de organigrama"
              disabled="true"
              rules={{ required: true }}
              {...register("nombreOrganigrama")}
            />
          </div>
          <div className="col-12 col-md-4 ms-3">
            <label className="text-terciary">
              Version: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3 border border-terciary"
              type="text"
              placeholder="Version de organigrama"
              disabled="true"
              rules={{ required: true }}
              {...register("versionOrganigrama")}
            />
          </div>
          <div className="col-12 col-md-4 ms-3">
            <label className="text-terciary">
              Descripcion: <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control border rounded-pill px-3 border border-terciary"
              type="text"
              placeholder="Descripcion de organigrama"
              disabled="true"
              rules={{ required: true }}
              {...register("descripcionOrganigrama")}
            />

            {errors.Consecutivo && (
              <p className="text-danger">Este campo es obligatorio</p>
            )}
          </div>
          <div className="row mt-3 ">
            <div
              className="sidenav-normal border rounded-pill px-4 mt-2 mb-2 text-white fs-5 p-1 me-5 ms-1"
              style={{
                backgroundImage: "linear-gradient(45deg, #6db227, #36a9e0)",
              }}
              data-bs-toggle="collapse"
              aria-expanded="false"
              href="#Niveles"
            >
              {" "}
              Niveles Organizacionales
            </div>

            <div className="row mt-3 ms-2 collapse" id="Niveles">
              <div className="col-12  col-md-4">
                <label className="text-terciary fw-bolder">Niveles</label>
                <br />
                <label className="text terciary">Nivel 3</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre nivel organizacional"
                  rules={{ required: true }}
                  {...register("nivel")}
                />
                <button className="btn btn-primary border rounded-pill px-3 text-capitalize mt-2">
                  agregar
                </button>
              </div>
              <div className="col ">
                <label className="text-terciary fw-bolder">Resumen</label>
                <div id="myGrid" className="ag-theme-alpine ">
                  <div
                    className="ag-theme-alpine"
                    style={{ height: "250px", maxWidth: "600px" }}
                  >
                    <AgGridReact
                      columnDefs={columnasOrganigrama}
                      rowData={rowDataOrganigrama}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3 ">
            <div
              className="border rounded-pill px-4 mt-2 mb-2 text-white fs-5 p-1 me-10 ms-1"
              style={{
                backgroundImage: "linear-gradient(45deg, #6db227, #36a9e0)",
              }}
              data-bs-toggle="collapse"
              aria-expanded="false"
              href="#Unidades"
            >
              {" "}
              Unidades Organizacionales
            </div>

            <div className="row mt-3 ms-2 collapse" id="Unidades">
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Código:</label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    // placeholder="Escribe el nombre"
                    {...register("codigo", { required: true })}
                  />
                  {errors.nombreVivero && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Nombre:</label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    // placeholder="Escribe el codigo"
                    {...register("nombre", { required: true })}
                  />
                  {errors.nombreVivero && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Tipo de unidad:</label>
                  <Controller
                    name="tipoUnidad"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={options}
                        placeholder="Seleccionar"
                        {...register("tipoUnidad", { required: true })}
                      />
                    )}
                  />
                  {errors.municipioOpcion && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Nivel de la unidad:</label>
                  <Controller
                    name="nivelUnidad"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionLevel}
                        placeholder="Seleccionar"
                        {...register("nivelUnidad", { required: true })}
                      />
                    )}
                  />
                  {errors.municipioOpcion && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Unidad Raiz:</label>
                  <Controller
                    name="unidadRaiz"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionRaiz}
                        placeholder="Seleccionar"
                        {...register("unidadRaiz", { required: true })}
                      />
                    )}
                  />
                  {errors.municipioOpcion && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">
                    Agrupación documental:
                  </label>
                  <Controller
                    name="agrupacionDocumental"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionGroup}
                        placeholder="Seleccionar"
                        {...register("agrupacionDocumental", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  {errors.municipioOpcion && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Unidad padre:</label>
                  <Controller
                    name="nivelPadre"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionLevel}
                        placeholder="Seleccionar"
                        {...register("Seleccionar", { required: true })}
                      />
                    )}
                  />
                  {errors.municipioOpcion && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Unidad:</label>
                  <Controller
                    name="unidadPadre"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionLevel}
                        placeholder="Seleccionar"
                        {...register("unidadPadre", { required: true })}
                      />
                    )}
                  />
                  {errors.municipioOpcion && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div
                  className="ag-theme-alpine mb-3 "
                  style={{ height: "225px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    // handleAddGrid={handleAddGrid}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-light text-capitalize border rounded-pill px-3"
              >
                Regresar
              </button>

              <button
                type="button"
                className="btn btn-primary text-capitalize border rounded-pill px-3"
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-primary text-capitalize border rounded-pill px-3"
              >
                Finalizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
