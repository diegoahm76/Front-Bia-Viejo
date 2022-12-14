import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import Subtitle from "../../../components/Subtitle";
import clienteAxios from "../../../config/clienteAxios";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";

export const InformacionCuencasScreen = () => {
  const [tabla, setTabla] = useState(false);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: departamentosNoFormat } = await clienteAxios.get(
          "choices/departamentos/"
        );
        const { data: municipiosNoFormat } = await clienteAxios.get(
          "choices/municipios/"
        );

        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

        setDepartamentosOptions(departamentosFormat);
        setMunicipiosOptions(municipiosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const {
    reset,
    register,
    handleSubmit,
    control: controlBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const onSubmit = () => {};
  let gridApi;
  const columnDefs = [
    {
      headerName: "Nombre fuente",
      field: "nf",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Municipio",
      field: "mc",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Codigo de cuenca",
      field: "codcuen",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Sub cuenca",
      field: "sc",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Corriente",
      field: "cr",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Afluente",
      field: "af",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Oferta disponible",
      field: "of",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      nf: "acacias",
      mc: "Villavicencio",
      codcuen: "876432",
      sc: "Rio guayuriba",
      cr: "Caño rojo",
      af: "Alto ri negro",
      of: "762663719",
    },
    {
      nf: "acacias",
      mc: "Villavicencio",
      codcuen: "876432",
      sc: "Rio guayuriba",
      cr: "Caño rojo",
      af: "Alto ri negro",
      of: "762663719",
    },
    {
      nf: "acacias",
      mc: "Villavicencio",
      codcuen: "876432",
      sc: "Rio guayuriba",
      cr: "Caño rojo",
      af: "Alto ri negro",
      of: "762663719",
    },
    {
      nf: "acacias",
      mc: "Villavicencio",
      codcuen: "876432",
      sc: "Rio guayuriba",
      cr: "Caño rojo",
      af: "Alto ri negro",
      of: "762663719",
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
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="text-rigth  fw-light mt-4">
              Información de cuencas hídricas
            </h3>
            <Subtitle title={"Parámetros de búsqueda"} mt={3} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Periodo:
                </label>

                <Controller
                  name="periodo"
                  control={controlBuscar}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "2022", value: "22" },
                        { label: "2021", value: "21" },
                        { label: "2020", value: "20" },
                        { label: "2019", value: "19" },
                        { label: "2018", value: "18" },
                        { label: "2017", value: "17" },
                        { label: "2016", value: "16" },
                        { label: "2015", value: "15" },
                        { label: "2014", value: "14" },
                        { label: "2013", value: "13" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-3 mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Departamento:
                </label>

                <Controller
                  name="departamento"
                  control={controlBuscar}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={departamentosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-3 mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Municipio:
                </label>

                <Controller
                  name="cod_municipio"
                  control={controlBuscar}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-lg-3  mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Río:
                </label>

                <Controller
                  name="rio"
                  control={controlBuscar}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Acacias", value: "aca" },
                        { label: "Ariari", value: "ari" },
                        { label: "Guamal", value: "gum" },
                        { label: "Guayuriba", value: "guy" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Nombre de la fuente
                </label>

                <Controller
                  name="fuente"
                  control={controlBuscar}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Caño cobalto", value: "co" },
                        { label: "Brazo del caño", value: "bra" },
                        { label: "Caño nn", value: "nn" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-3  mt-2">
                <div className="d-grid d-flex">
                  <button
                    className="btn-icon-green btn px-3 mt-4"
                    type="submit"
                    title="Buscar"
                    onClick={() => setTabla(!tabla)}
                  >
                    <i className="fa-solid fa-magnifying-glass fs-3"></i>
                  </button>
                </div>
              </div>
              {tabla === true ? (
                <div className="mt-1 row">
                  <div id="myGrid" className="ag-theme-alpine mt-4">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: "400px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        defaultColDef={defaultColDef}
                      ></AgGridReact>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default InformacionCuencasScreen;
