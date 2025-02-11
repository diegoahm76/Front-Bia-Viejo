import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Subtitle from '../../../components/Subtitle'

import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";

import CalendarModal from "../../../components/CalendarModal";
import ModalLocal from "../../../components/ModalLocal";
const SolicitudesRealizadasViveroScreen = () => {
  const [selecOpciones, setSelecOpciones] = useState({
    tipoConsulta: "",
    vivero: "",
    nombreProfesional: "",
    estado: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      vivero: data.vivero?.value || "",
      nombreProfesional: data.nombreProfesional.value,
      estado: data.estado.value,
    });
  };

  const valores1 = [
    { label: "Todos los viveros", value: "tlv" },
    { label: "un vivero", value: "uvv" },
  ];

  const valores2 = [
    { label: "Mapirípan", value: "Map" },
    { label: "Villavicencio", value: "Vil" },
    { label: "La Macarena", value: "laM" },
  ];

  const valores3 = [
    { label: "Julian Catillo", value: "jc" },
    { label: "Angelica Leon", value: "al" },
    { label: "Esteban Lopez", value: "el" },
  ];

  const valores4 = [
    { label: "Entregado", value: "ent" },
    { label: "En Proceso", value: "enp" },
  ];

  let gridApi;

  const columnDefs = [
    {
      headerName: "Numero de solicitud",
      field: "Numero de solicitud",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Profesional responsable",
      field: "Profesional responsable",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Vivero", field: "Vivero", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Informe de caracterizacion ",
      field: "Informe de caracterizacion",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de entregra",
      field: "Fecha de entregra",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Estado de solicitud",
      field: "Estado de solicitud",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Entregado por",
      field: "Entregado por",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Gestionar",
      field: "Accion",
      minWidth: 150,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn text-capitalize "
            type="button"
            onClick={handleOpenModal}
          >
            <i className="fa-regular fa-pen-to-square fs-3"></i>
          </button>
        </div>
      ),
    },
    {
      headerName: "Ver",
      field: "Accion",
      minWidth: 150,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn text-capitalize"
            type="button"
            onClick={handleOpenModal}
          >
            <i className="fa-solid fa-eye fs-3"></i>
          </button>
        </div>
      ),
    },
  ];

  const rowData = [
    {
      "Numero de solicitud": "VLK734",
      "Profesional responsable": "JuLian Castillo",
      Vivero: "Mapirípan",
      "Informe de caracterizacion": "PGA 2012-365-98",
      "Fecha de entregra": "28/02/2022",
      "Estado de solicitud": "Entregado",
      "Entregado por": "Viverista Villavicencio",
    },
    {
      "Numero de solicitud": "LSH702",
      "Profesional responsable": "Estevan Lopez",
      Vivero: "Villavicencio",
      "Informe de caracterizacion": "PGA 2012-242-07",
      "Fecha de entregra": "13/05/2020",
      "Estado de solicitud": "Sin Entregar",
      "Entregado por": "N/A",
    },
    {
      "Numero de solicitud": "PSE762",
      "Profesional responsable": "Angelica Leon",
      Vivero: "La Macarenia ",
      "Informe de caracterizacion": "PGA 2012-182-63",
      "Fecha de entregra": "17/03/2011",
      "Estado de solicitud": "Entregado",
      "Entregado por": "N/A",
    },
    {
      "Numero de solicitud": "VLK734",
      "Profesional responsable": "JuLian Castillo",
      Vivero: "Mapirípan",
      "Informe de caracterizacion": "PGA 2012-365-98",
      "Fecha de entregra": "28/02/2022",
      "Estado de solicitud": "Entregado",
      "Entregado por": "Viverista Villavicencio",
    },
    {
      "Numero de solicitud": "LSH702",
      "Profesional responsable": "Estevan Lopez",
      Vivero: "Villavicencio",
      "Informe de caracterizacion": "PGA 2012-242-07",
      "Fecha de entregra": "13/05/2020",
      "Estado de solicitud": "Sin Entregar",
      "Entregado por": "N/A",
    },
    {
      "Numero de solicitud": "PSE762",
      "Profesional responsable": "Angelica Leon",
      Vivero: "La Macarenia ",
      "Informe de caracterizacion": "PGA 2012-182-63",
      "Fecha de entregra": "17/03/2011",
      "Estado de solicitud": "Entregado",
      "Entregado por": "N/A",
    },
    {
      "Numero de solicitud": "VLK734",
      "Profesional responsable": "JuLian Castillo",
      Vivero: "Mapirípan",
      "Informe de caracterizacion": "PGA 2012-365-98",
      "Fecha de entregra": "28/02/2022",
      "Estado de solicitud": "Entregado",
      "Entregado por": "Viverista Villavicencio",
    },
    {
      "Numero de solicitud": "LSH702",
      "Profesional responsable": "Estevan Lopez",
      Vivero: "Villavicencio",
      "Informe de caracterizacion": "PGA 2012-242-07",
      "Fecha de entregra": "13/05/2020",
      "Estado de solicitud": "Sin Entregar",
      "Entregado por": "N/A",
    },
    {
      "Numero de solicitud": "PSE762",
      "Profesional responsable": "Angelica Leon",
      Vivero: "La Macarenia ",
      "Informe de caracterizacion": "PGA 2012-182-63",
      "Fecha de entregra": "17/03/2011",
      "Estado de solicitud": "Entregado",
      "Entregado por": "N/A",
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

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false)
  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
              Revisar solicitudes realizadas al vivero
            </h3>
            <Subtitle title="Parametros de busqueda" />

            <div className="row">
              <div className="col-12 col-md-3 ">
                <label className=" form-control ms-0">Tipo de consulta: </label>
                <Controller
                  name="tipoConsulta"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(e) =>
                        setSelecOpciones({
                          ...selecOpciones,
                          tipoConsulta: e.value,
                        })
                      }
                      options={valores1}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>

            {selecOpciones.tipoConsulta === "uvv" ? (
              <div className="multisteps-form__content">
                <div className="row">
                  <div className="col-12 col-md-3 ">
                    <label className=" form-control ms-0">Vivero: </label>
                    <Controller
                      name="vivero"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={valores2}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.vivero && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-3">
                    <label className=" form-control ms-0">
                      Nombre del profesional:
                    </label>
                    <Controller
                      name="nombreProfesional"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={valores3}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.nombreProfesional && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-3 ">
                    <label className=" form-control ms-0">
                      Estado de la solicitud:
                    </label>
                    <Controller
                      name="estado"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={valores4}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.estado && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-3 ">
                    <button
                      className="mt-5 btn text-capitalize "
                      type="submit"
                      title="Buscar"
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div>

                  

                  {selecOpciones.vivero &&
                  selecOpciones.nombreProfesional &&
                  selecOpciones.estado ? (
                    <div>
                      <div id="myGrid" className="ag-theme-alpine mt-4">
                        <div
                          className="ag-theme-alpine"
                          style={{ height: "400px" }}
                        >
                          <AgGridReact
                            columnDefs={
                              selecOpciones.estado === "ent"
                                ? columnDefs.filter(
                                    (item) => item.headerName !== "Gestionar"
                                  )
                                : columnDefs
                            }
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            onGridReady={onGridReady}
                          ></AgGridReact>
                        </div>
                      </div>

                      <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                        <button
                          className="btn mb-0"
                          type="submit"
                          title="Salir"
                          form="configForm"
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket fs-3"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}

            {selecOpciones.tipoConsulta === "tlv" ? (
              <div className="multisteps-form__content">
                <div className="row">
                  <div className="col-12 col-md-3 ">
                    <label className=" form-control ms-0">
                      Nombre del profesional:
                    </label>
                    <Controller
                      name="nombreProfesional"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={valores3}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.nombreProfesional && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-3 ">
                    <label className=" form-control ms-0">
                      Estado de la solicitud:
                    </label>
                    <Controller
                      name="estado"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={valores4}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.estado && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-3 ">
                    <button
                      className="mt-5 btn text-capitalize "
                      type="submit"
                      title="Buscar"
                      >
                        <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div>

                  {selecOpciones.nombreProfesional && selecOpciones.estado ? (
                    <div>
                      <div id="myGrid" className="ag-theme-alpine mt-4">
                        <div
                          className="ag-theme-alpine"
                          style={{ height: "400px" }}
                        >
                          <AgGridReact
                            columnDefs={
                              selecOpciones.estado === "ent"
                                ? columnDefs.filter(
                                    (item) => item.headerName !== "Gestionar"
                                  )
                                : columnDefs
                            }
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            onGridReady={onGridReady}
                          ></AgGridReact>
                        </div>
                      </div>

                      <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                        {" "}
                        {/*  BOTONES DE ABAJO  */}
                        <button
                          className="btn  mb-0"
                          type="submit"
                          title="Salir"
                          form="configForm"
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket fs-3"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
          <ModalLocal localState={modal}>
            <div className="d-flex">
              <div className="col-12 col-sm-3">
                {" "}
                {/* primera columna */}
                <div className="col-12 col-sm-12">
                  <h2>PDF </h2>
                </div>
              </div>
              <div className="col-12 col-sm-3">
                {" "}
                {/* primera columna */}
                <div className="col-12 col-sm-12">
                  <h2>PDF </h2>
                </div>
              </div>
              </div>
          

            {/*CREO LAS TRES COLUMNAS - TERCERA FILA*/}
            <div className="row mt-2">
              {/*1 COLUMNA*/}
              <div className="col-12 col-sm-12">
                <label className="col-12 col-sm-12 font-weight">
                  Listado de solicitud{" "}
                </label>
              </div>
            </div>

            <div id="myGrid" className="ag-theme-alpine">
              {" "}
              {/*  Tabla  */}
              <div className="ag-theme-alpine" style={{ height: "400px" }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>

            <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
              {" "}
              {/*  BOTONES DE ABAJO  */}'
              <button
                className="btn mb-0"
                type="submit"
                title="Salir"
                form="configForm"
                onClick={handleCloseModal}
              >
                
                          <i className="fa-solid fa-arrow-right-from-bracket fs-3"></i>
              </button>
              
            </div>
          </ModalLocal>
        </div>
      </div>
    </div>
  );
};
export default SolicitudesRealizadasViveroScreen;
