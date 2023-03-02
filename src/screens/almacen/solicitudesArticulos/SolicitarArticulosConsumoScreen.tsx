import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import Subtitle from "../../../components/Subtitle";
import clienteAxios from "../../../config/clienteAxios";

const SolicitarArticulosConsumoScreen = () => {

  const [unitOfMeasurement, setUnitOfMeasurement] = useState([]);
  useEffect(() => {
    getUnitOfMeasurement();
  }, []);

  const getUnitOfMeasurement = async () => {
    try {
      const { data } = await clienteAxios.get("almacen/unidades-medida/get-list/");
      setUnitOfMeasurement(
        data.map((item) => ({ value: item.id_marca, label: item.nombre }))
      );
    } catch (error: any) {}
  };
  const [rowsoliconsu] = useState([
    {
      codigo: "2200200001",
      nombre: "Resma de papel",
      cantidad: "10",
    },
    {
      codigo: "2200200002",
      nombre: "fabuloso",
      cantidad: "9",
    },
    {
      codigo: "2200200003",
      nombre: "jabon en polvo",
      cantidad: "13",
    },
    {
      codigo: "2200200004",
      nombre: "carpetas tamaño carta",
      cantidad: "6",
    },
  ]);

  const columsoliconsu = [
    {
      headerName: "Codigo bien",
      field: "codigo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Cantidad",
      field: "cantidad",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button className="btn text-capitalize " type="button">
            <i className="fa-regular fa-trash-can fs-4" title="Eliminar"></i>
          </button>
        </div>
      ),
      minWidth: 150,
      maxWidth: 200,
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

  const [page, setPage] = useState(1);

  const submit = (data) => {
    if (page === 1) setPage(2);
    if (page === 2) console.log(data);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};
  return (
    <div className="row min-vh-100 ">
      <div className="col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <h3 className="text-right fw-light  mb-2">
            Solicitar un elemento de consumo
          </h3>

          <div className={"row"} hidden={page === 2}>
            <div className="row">
              <Subtitle title="Datos maestro" mt={3} mb={3} />
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-2 text-terciary">
                  Numero de solicitud
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="number"
                  value={10062}
                  disabled
                />
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-2 text-terciary">Fecha de solicitud</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="date"
                  disabled
                />
              </div>
              <div className="row">
                <div className="col-12 col-lg-12 mt-3">
                  <label className="ms-2 text-terciary">Motivo:</label>
                  <span className="text-danger">*</span>
                  <textarea
                    className="form-control border rounded-pill px-3 border border-terciary"
                    typeof="text"
                    placeholder="Motivo"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-12 mt-3">
                  <label className="ms-2 text-terciary">Observaciones:</label>
                  <textarea
                    className="form-control border rounded-pill px-3 border border-terciary"
                    typeof="text"
                    placeholder="Observaciones"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-6 mt-4">
                  <label className="ms-2 text-terciary fs-5">
                    solicitud para la unidad organizacional :
                  </label>
                </div>
                <div className="col-12 col-lg-6  mt-4">
                  <Controller
                    name="options"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { label: "GRUPO1", value: "GRUPO1" },
                          { label: "GRUPO2", value: "GRUPO2" },
                          { label: "GRUPO3", value: "GRUPO3" },
                          { label: "GRUPO4", value: "GRUPO4" },
                        ]}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <Subtitle title="Funcionario responsable" mt={3} mb={3} />
            </div>
            <div className="row  mt-3">
              <div className="col-12 col-lg-3">
                <label className="text-terciary">
                  Tipo de Documento: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="options"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isDisabled
                      {...field}
                      value="Ceula de ciudadania"
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-3">
                <label className="ms-2 text-terciary">
                  Numero de identificación:
                  <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="number"
                  placeholder="Numero de identificacion"
                  disabled
                />
              </div>
              <div className="col-12 col-lg-3">
                <label className="ms-2 text-terciary">
                  Nombre: <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="number"
                  placeholder="Nombre"
                  disabled
                />
              </div>
              <div className="col-12 col-lg-3 mt-1 d-flex">
                <button
                  type="button"
                  className="btn  text-capitalize btn-outline-ligth mt-4"
                  title="Buscar profesional cormacarena"
                >
                  <i
                    className="fa-solid fa-magnifying-glass fs-3"
                    title="Buscar"
                  ></i>
                </button>
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill  mt-4 "
                >
                  Busqueda
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-6 mt-4">
                <label className="ms-2 text-terciary fs-5">
                  Unidad organizacional del responsable :
                </label>
              </div>
              <div className="col-12 col-lg-6  mt-4">
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="number"
                  value={"GRUPO2"}
                  placeholder="Unidad organizacional responsable"
                  disabled
                />
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="col-12 col-lg-3 mt-4">
                <label className="ms-2 text-terciary">
                  Elaborado por : <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="number"
                  placeholder="Nombre"
                  disabled
                />
              </div>
              <div className="col-12 col-lg-3 mt-4">
                <label className="ms-2 text-terciary">
                  unidad organizacional: <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="number"
                  placeholder="unidad organizacional"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className={"row"} hidden={page === 1}>
            {/* CONSULTAR ARTICULO */}
            <div className="row">
              <Subtitle title="Detalles" mt={3} mb={3} />
            </div>
            <div className="col-12 col-lg-3  mt-3">
              <label className="ms-2 text-terciary">
                Código bien: <span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control border rounded-pill px-3 border border-terciary"
                type="text"
                required={page === 2}
                placeholder="Codigo"
                {...register("codigo_bien")}
              />
            </div>
            <div className="col-12 col-lg-3  mt-3">
              <label className="ms-2 text-terciary">Nombre del artículo:</label>
              <input
                className="form-control border rounded-pill px-3 border border-terciary"
                type="text"
                required={page === 2}
                placeholder="Nombre Articulo"
                disabled={true}
              />
            </div>
            <div className="col-12 col-lg-2  mt-3 d-flex ">
              <button
                type="button"
                className="btn text-capitalize btn-outline-ligth mt-4"
              >
                <i
                  className="fa-solid fa-magnifying-glass fs-3 "
                  title="Buscar"
                ></i>
              </button>
            </div>
            <div className="col-12 col-lg-3  mt-3 d-flex ">
              <button
                type="button"
                className="btn btn-primary text-capitalize mt-4"
              >
                Busqueda de articulo
              </button>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-2 text-terciary">
                  Cantidad: <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Cantidad"
                />
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-2 text-terciary">
                  Unidad de medida: <span className="text-danger">*</span>{" "}
                </label>
                <Controller
                    name="UNIDAD DE MEDIDA"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={unitOfMeasurement}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
              </div>
              <div className="col-12 col-lg-6  mt-3">
                <label className="ms-2 text-terciary">Observaciones:</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Observaciones"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-12  mt-4  d-flex justify-content-end">
                <button
                  type="button"
                  title="Agregar"
                  className="btn btn-primary text-capitalize border rounded-pill  btn-min-width"
                >
                  Agregar
                </button>
              </div>
            </div>
            <div>
              <div id="myGrid" className="ag-theme-alpine ">
                <div className="ag-theme-alpine" style={{ height: "300px" }}>
                  <AgGridReact
                    columnDefs={columsoliconsu}
                    rowData={rowsoliconsu}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-12  mt-4  d-flex justify-content-end">
              <button
                className={`btn btn-outline-ligthtext-capitalize  px-3 ${
                  page === 1 && "d-none"
                }`}
                type="button"
                title="Regresar a la pagina anterior"
                onClick={handlePreviousPage}
              >
                <i className="fa-solid fa-angles-left fs-3" title="atras"></i>
              </button>
              <button
                type="button"
                className={`btn btn-primary text-capitalize border rounded-pill px-3 btn-min-width ${
                  page === 1 && "d-none"
                }`}
              >
                Anular
              </button>
              <button
                type="button"
                className="btn btn-outline-ligth text-capitalize  px-3"
                title="Limpiar"
              >
                <i className="fa-solid fa-eraser fs-3" title="Limpiar"></i>
              </button>
              <button
                type="button"
                className="btn btn-outline-ligth text-capitalize  px-3"
                title="Salir"
              >
                <i className="fa-solid fa-x fs-3" title="Salir"></i>
              </button>
              <button
                className="btn  text-capitalize btn-outline-ligth px-3"
                type="submit"
                form="configForm"
              >
                {page === 1 ? (
                  <i
                    className="fa-solid fa-angles-right fs-3"
                    title="Siguiente"
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-floppy-disk fs-3"
                    title="Guardar"
                  ></i>
                )}{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolicitarArticulosConsumoScreen;
