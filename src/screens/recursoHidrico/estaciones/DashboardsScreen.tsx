import React, { useEffect, useState } from 'react';
import { useFetcher, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Subtitle from "../../../components/Subtitle";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { obtenerMonitoreo } from "../../../store/slices/Monitoreo/indexMonitoreo";
import Select from "react-select";
import { Color } from "../../../../public/static/js/plugins/threejs";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import clienteEstaciones from '../../../config/clienteAxiosEstaciones';

function Dashboards_Estaciones() {


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [selectDashboards, setSelectdDashboards] = useState({
    opcDashboards: 0
  });
  const onSubmit = (datos) => {
    setSelectdDashboards({
      ...selectDashboards,
      opcDashboards: datos.opcDashboards?.value || "",
    });
    console.log(selectDashboards.opcDashboards);
  };
  const opcDashboards = [
    { label: "Estación Guayuriba", value: 2 },
    { label: "Estación Ocoa", value: 3 },
    { label: "Estación Puerto Gaitan", value: 4 },
    { label: "Estación Guamal", value: 1 },
  ];

  const [queryData, setQueryData] = useState([])
  // const [data, setData] = useState({})
  const [data, setData] = useState({
    properties: {
      OBJECTID: 2,
      Temperatura: "",
      Humedad: "",
      Presión: "",
      Velocidad_Viento: "",
      Dirección_Viento: "",
      Precipitación: "",
      Luminosidad: "",
      Nivel_Agua: "",
      Velocidad_Agua: "",
      Estado: "Activo",
      fecha: "2023-01-31T17:48:15"
    }
  })

  const getGeojson = async () => {
    try {
      const {
        data: { features } } = await clienteEstaciones.get("/geojson");
      setQueryData(features);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getGeojson();
  }, []);

  useEffect(() => {
    if (queryData.length > 0 && selectDashboards.opcDashboards !== 0) setData(queryData[selectDashboards.opcDashboards - 1])
  }, [selectDashboards.opcDashboards]);

  console.log(selectDashboards.opcDashboards, 'idLista')
  console.log(data, 'data')



  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-2 mb-0">Comportamiento variables estaciones</h3>
            <Subtitle
              title="Por favor seleccione la estación que desea visualizar"
              mt={3}
            />
            <div className="row">
              <div className="col-12 col-md-3 ">
                <label className=" form-control ms-0"></label>
                <Controller
                  name="opcDashboard"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(e) =>
                        setSelectdDashboards({
                          ...selectDashboards,
                          opcDashboards: e.value,
                        })
                      }
                      options={opcDashboards}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>

            {selectDashboards.opcDashboards === 2 ? (
              <div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-6">
                      <h6 className="text-dark text-center">{data.properties.Humedad.slice(0, 4)}%</h6>
                      <div className="icon-circle text-dark mx-5">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-4 text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center "
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Temperatura
                    </div>

                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">{data.properties.Temperatura.slice(0, 4)}°C</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-dark text-center mx-5">{data.properties.Velocidad_Agua.slice(0, 4)}m/s</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-3  text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Nivel agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="text-white text-center mx-5">{data.properties.Nivel_Agua.slice(0, 4)}M</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Precipitación
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="aling-items-left text-dark text-center mx-4">{data.properties.Precipitación.slice(0, 5)}mm</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-cloud-showers-heavy fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="https://app.powerbi.com/view?r=eyJrIjoiODA1MzVmMjctNTRiYi00NTYxLThjZGYtMTE0ZThlNDhkMGQ1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-4 text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Luminosidad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">{data.properties.Luminosidad.slice(0, 4)}Lux</h6>
                      <div className="icon-circle text-white ">
                        <i className="fa-solid fa-sun fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center mx-4">{data.properties.Velocidad_Viento.slice(0, 4)}m/s</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-wind fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-3  text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Presión
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-white text-center mx-3">{data.properties.Presión.slice(0, 5)}hPa</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="row col-12 mt-4  justify-content-center"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div className="content-wrapper">
                    <div className="content-header">
                      <div className="container-fluid"></div>
                    </div>
                    <section className="content">
                      <section className="col-lg-12">
                        <div className="card">
                          <div className="card-header " style={{ backgroundColor: "#E9ECEF" }}>
                            <h3 className="card-title">
                              <i className="fas fa-chart-pie mr-1" />
                              Graficos
                            </h3>
                          </div>
                        </div>
                      </section>
                    </section>
                  </div>
                  <div className="col-12 mx-4 "></div>
                  <h3 className="mt-2 mb-0">Humedad</h3>
                  <iframe title="HumedadGuayuriba - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=d9754532-916a-4d33-912c-53244890901a&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe title="PresionGuayuriba" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=e9e78a42-a0cd-4fc6-8a15-f6164c9a5193&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe title="LuminosidadGuayuriba - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=8c0e022c-1c18-41db-8eba-c1a1274af411&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe title="VelocidadAguaGuayuriba - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=59a31b7f-18aa-43a7-a525-aff23bc25785&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe title="TemperaturaGuayuriba - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=27567876-22aa-4814-b8c6-74056bc1d851&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Precipitación</h3>
                    <iframe title="PrecipitacionGuayuriba - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=e6935e38-1fae-4c30-bb0c-433408198d0d&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del viento</h3>
                    <iframe title="VelocidadVientoGuayuriba - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=f6bd0828-6155-4e78-a991-6c3ec6ec9b63&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectDashboards.opcDashboards === 3 ? (
              <div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-6">
                      <h6 className="text-dark text-center">{data.properties.Humedad.slice(0, 4)}%</h6>
                      <div className="icon-circle text-dark mx-5">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-4 text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center "
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Temperatura
                    </div>

                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">{data.properties.Temperatura.slice(0, 4)}°C</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-dark text-center mx-4">{data.properties.Velocidad_Agua.slice(0, 4)}m/s</h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-3  text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Nivel agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="text-white text-center mx-5">{data.properties.Nivel_Agua.slice(0, 4)}M</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Precipitación
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="aling-items-left text-dark text-center mx-4">{data.properties.Precipitación.slice(0, 5)}mm</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-cloud-showers-heavy fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-4 text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Luminosidad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">{data.properties.Luminosidad.slice(0, 4)}Lux</h6>
                      <div className="icon-circle text-white ">
                        <i className="fa-solid fa-sun fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center mx-4">{data.properties.Velocidad_Viento.slice(0, 4)}m/s</h6>
                      <div className="icon-circle text-dark ">
                        <i className="fa-solid fa-wind fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-3  text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Presión
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-white text-center mx-3">{data.properties.Presión.slice(0, 5)}hPa</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="row col-12 mt-4  justify-content-center"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div className="content-wrapper">
                    <div className="content-header">
                      <div className="container-fluid"></div>
                    </div>
                    <section className="content">
                      <section className="col-lg-12">
                        <div className="card">
                          <div className="card-header " style={{ backgroundColor: "#E9ECEF" }}>
                            <h3 className="card-title">
                              <i className="fas fa-chart-pie mr-1" />
                              Graficos
                            </h3>
                          </div>
                        </div>
                      </section>
                    </section>
                  </div>
                  <div className="col-12 mx-4 "></div>
                  <h3 className="mt-2 mb-0">Humedad</h3>
                  <iframe title="HumedadOcoa" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=686b937c-735a-40a6-9add-3ba9a59b2cf3&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe title="PresionOcoa" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=3281090b-0edd-4e4c-8c39-d8031bf05c98&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe title="LuminosidadOcoa" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=68934898-99aa-4cfb-92f8-5685bbbd9291&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe title="VelocidadAguaOcoa - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=46e7d1f7-4d9c-459e-a5af-d6f1071833a6&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe title="TemperaturaOcoa" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=1e86f684-8c39-4e4b-a53a-6048f9b152f8&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Precipitación</h3>
                    <iframe title="PrecipitacionOcoa - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=b3fa8932-475d-4c1a-b25c-34b8aa369255&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectDashboards.opcDashboards === 4 ? (
              <div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-6">
                      <h6 className="text-dark text-center">{data.properties.Humedad.slice(0, 4)}%</h6>
                      <div className="icon-circle text-dark mx-5">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-4 text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center "
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Temperatura
                    </div>

                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">{data.properties.Temperatura.slice(0, 4)}°C</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-dark text-center mx-4">{data.properties.Velocidad_Agua.slice(0, 4)}m/s</h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-3  text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Nivel agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="text-white text-center mx-5">{data.properties.Nivel_Agua.slice(0, 4)}M</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Precipitación
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="aling-items-left text-dark text-center mx-4">{data.properties.Precipitación.slice(0, 5)}mm</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-cloud-showers-heavy fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-4 text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Luminosidad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">{data.properties.Luminosidad.slice(0, 4)}Lux</h6>
                      <div className="icon-circle text-white ">
                        <i className="fa-solid fa-sun fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center mx-4">{data.properties.Velocidad_Viento.slice(0, 4)}m/s</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-wind fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-3  text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Presión
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-white text-center mx-3">{data.properties.Presión.slice(0, 5)}hPa</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="row col-12 mt-4  justify-content-center"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div className="content-wrapper">
                    <div className="content-header">
                      <div className="container-fluid"></div>
                    </div>
                    <section className="content">
                      <section className="col-lg-12">
                        <div className="card">
                          <div className="card-header " style={{ backgroundColor: "#E9ECEF" }}>
                            <h3 className="card-title">
                              <i className="fas fa-chart-pie mr-1" />
                              Graficos
                            </h3>
                          </div>
                        </div>
                      </section>
                    </section>
                  </div>
                  <div className="col-12 mx-4 "></div>
                  <h3 className="mt-2 mb-0">Humedad</h3>
                  <iframe title="Humedad_estaciones Puerto Gaitan" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=f2641695-fd2d-474d-9544-45eaaa3665a5&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe title="Presion de aire_estaciones Puerto Gaitan" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=513ef46b-2631-4951-b30a-7fa3fe7c615b&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe title="Nivel de Luminosidad_estaciones Puerto Gaitan" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=8122fafa-b30b-49ee-aded-5041c1556a51&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe title="Velocidad del agua_estaciones Puerto Gaitan" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=45f43ecc-9e8f-469c-906c-75e0480966fb&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe title="Temperatura_estaciones Puerto Gaitan" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=555ee719-0b36-4aab-aeb6-2946c145218b&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Precipitación</h3>
                    <iframe title="Precipitación_estaciones Puerto Gaitan" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=d23fef64-58f9-4d9b-a9e5-c9f80c58a919&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {selectDashboards.opcDashboards === 1 ? (
              <div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-6">
                      <h6 className="text-dark text-center">{data.properties.Humedad.slice(0, 4)}%</h6>
                      <div className="icon-circle text-dark mx-5">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-4 text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center "
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Temperatura
                    </div>

                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">{data.properties.Temperatura.slice(0, 4)}°C</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-dark text-center mx-5">{data.properties.Velocidad_Agua.slice(0, 4)}m/s</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-3  text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Nivel agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="text-white text-center mx-5">{data.properties.Nivel_Agua.slice(0, 4)}M</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Precipitación
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="aling-items-left text-dark text-center mx-4">{data.properties.Precipitación.slice(0, 5)}mm</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-cloud-showers-heavy fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-4 text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Luminosidad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">{data.properties.Luminosidad.slice(0, 4)}Lux</h6>
                      <div className="icon-circle text-white ">
                        <i className="fa-solid fa-sun fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center mx-4">{data.properties.Velocidad_Viento.slice(0, 4)}m/s</h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-wind fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-3  text-white"
                    style={{
                      width: "200px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Presión
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-white text-center mx-3">{data.properties.Presión.slice(0, 5)}hPa</h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más' />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="row col-12 mt-4  justify-content-center"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div className="content-wrapper">
                    <div className="content-header">
                      <div className="container-fluid"></div>
                    </div>
                    <section className="content">
                      <section className="col-lg-12">
                        <div className="card">
                          <div className="card-header " style={{ backgroundColor: "#E9ECEF" }}>
                            <h3 className="card-title">
                              <i className="fas fa-chart-pie mr-1" />
                              Graficos
                            </h3>
                          </div>
                        </div>
                      </section>
                    </section>
                  </div>
                  <div className="col-12 mx-4 "></div>
                  <h3 className="mt-2 mb-0">Humedad</h3>
                  <iframe title="HumedadGuamal - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=dc8befec-9c3a-45de-a6de-d3a622c34c28&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe title="PresionGuamal - Página 1" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=0d34d0f7-bb08-423a-9e06-0051f6f45f7a&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe title="LuminosidadGuamal - Página 1" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=7e49e83f-6a39-42dd-8d65-0d735a8ae1cc&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe title="VelocidadAguaGuamal" width="900px" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=31128f3a-17f1-43f8-9159-8976b64cacbf&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe title="TemperaturaGuamal" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=85e332c6-f0a3-4adb-ac38-748b57812dde&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Precipitación</h3>
                    <iframe title="PrecipitacionGuamal - Página 1" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=47d97fee-7adc-439f-9b27-650224d8d3f1&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"></iframe>
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
}

export default Dashboards_Estaciones;

