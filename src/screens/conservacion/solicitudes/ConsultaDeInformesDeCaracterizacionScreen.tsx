import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";

import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";

import CalendarModal from "../../../components/CalendarModal";
import ModalLocal from "../../../components/ModalLocal";

export const ConsultaDeInformesDeCaracterizacionScreen = () => {
  const [selecOpciones, setSelecOpciones] = useState({
    tipoConsulta: "",
    vivero: "",
    nombreProfesional: "",
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

  let gridApi;

  const columnDefs = [
    {
      headerName: "Numero de entrega",
      field: "Numero de entrega",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Profesional responsable",
      field: "Profesional responsable",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Informe de caracterizacion ",
      field: "Informe de caracterizacion",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Vivero", field: "Vivero", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Numero de solicitud",
      field: "Numero de solicitud",
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
      headerName: "Visualizar",
      field: "Accion",
      minWidth: 150,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn text-capitalize"
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
      "Numero de entrega": "LPR412",
      "Profesional responsable": "JuLian Castillo",
      "Informe de caracterizacion": "PYT 2012-173-09",
      Vivero: "Mapirípan",
      "Numero de solicitud": "VLK734",
      "Fecha de entregra": "28/02/2022",
    },
    {
      "Numero de entrega": "LRT982",
      "Profesional responsable": "Estevan Lopez",
      "Informe de caracterizacion": "PGA 2012-242-07",
      Vivero: "Villavicencio",
      "Numero de solicitud": "LSH702",
      "Fecha de entregra": "13/05/2020",
    },
    {
      "Numero de entrega": "LRP721",
      "Profesional responsable": "Angelica Leon",
      "Informe de caracterizacion": "PGA 2012-182-63",
      Vivero: "La Macarenia ",
      "Numero de solicitud": "PSE762",
      "Fecha de entregra": "17/03/2011",
    },
    {
      "Numero de entrega": "LPR412",
      "Profesional responsable": "JuLian Castillo",
      "Informe de caracterizacion": "PYT 2012-173-09",
      Vivero: "Mapirípan",
      "Numero de solicitud": "VLK734",
      "Fecha de entregra": "28/02/2022",
    },
    {
      "Numero de entrega": "LRT982",
      "Profesional responsable": "Estevan Lopez",
      "Informe de caracterizacion": "PGA 2012-242-07",
      Vivero: "Villavicencio",
      "Numero de solicitud": "LSH702",
      "Fecha de entregra": "13/05/2020",
    },
    {
      "Numero de entrega": "LRP721",
      "Profesional responsable": "Angelica Leon",
      "Informe de caracterizacion": "PGA 2012-182-63",
      Vivero: "La Macarenia ",
      "Numero de solicitud": "PSE762",
      "Fecha de entregra": "17/03/2011",
    },
    {
      "Numero de entrega": "LPR412",
      "Profesional responsable": "JuLian Castillo",
      "Informe de caracterizacion": "PYT 2012-173-09",
      Vivero: "Mapirípan",
      "Numero de solicitud": "VLK734",
      "Fecha de entregra": "28/02/2022",
    },
    {
      "Numero de entrega": "LRT982",
      "Profesional responsable": "Estevan Lopez",
      "Informe de caracterizacion": "PGA 2012-242-07",
      Vivero: "Villavicencio",
      "Numero de solicitud": "LSH702",
      "Fecha de entregra": "13/05/2020",
    },
    {
      "Numero de entrega": "LRP721",
      "Profesional responsable": "Angelica Leon",
      "Informe de caracterizacion": "PGA 2012-182-63",
      Vivero: "La Macarenia ",
      "Numero de solicitud": "PSE762",
      "Fecha de entregra": "17/03/2011",
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

  const handleOpenModal = () => {
    setModalInfo(true);
  };
  const [modalInfo, setModalInfo] = useState(false);

  const handleCloseModal = () => {
    setModalInfo(false);
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
              Ver informes de caracterización de solicitudes anteriores
            </h3>
            <Subtitle title="Parametros de busqueda" />
            <div className="multisteps-form__content">
              <div className="mt-4 row">
                <div className="col-12 col-md-3">
                  <label className=" form-control ms-0">
                    Tipo de consulta:{" "}
                  </label>
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
            </div>

            {selecOpciones.tipoConsulta == "uvv" ? (
              <div className="multisteps-form__content">
                <div className="row">
                  <div className="col-12 col-md-3">
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

                  <div className="col-12 col-md-3">
                    <button
                      className="mt-5 btn text-capitalize "
                      type="submit"
                      title="Buscar"
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div>

                  {selecOpciones.vivero && selecOpciones.nombreProfesional ? (
                    <div>
                      <div id="myGrid" className="ag-theme-alpine mt-4">
                        <div
                          className="ag-theme-alpine"
                          style={{ height: "400px" }}
                        >
                          <AgGridReact
                            columnDefs={columnDefs}
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
                    <button
                      className="mt-5 btn text-capitalize"
                      type="submit"
                      title="Buscar"
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div>

                  {selecOpciones.nombreProfesional ? (
                    <div>
                      <div id="myGrid" className="ag-theme-alpine mt-4">
                        <div
                          className="ag-theme-alpine"
                          style={{ height: "400px" }}
                        >
                          <AgGridReact
                            columnDefs={columnDefs}
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
          </form>
          <ModalLocal localState={modalInfo}>
            <div className="row mt-2">
              {" "}
              {/* primera fila */}
              <div className="col-12 col-sm-6">
                {" "}
                {/* primera columna */}
                <div className="col-12 col-sm-12">
                  <label>Tipo de documento: </label>
                </div>
              </div>
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
export default ConsultaDeInformesDeCaracterizacionScreen;
