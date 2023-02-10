import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks/hooks";
import { useFetcher, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Subtitle from "../../../components/Subtitle";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { obtenerMonitoreo } from "../../../store/slices/Monitoreo/indexMonitoreo";
import Select from "react-select";
import { Color } from "../../../../public/static/js/plugins/threejs";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import {
  obtenerConguracionEstaciones,
  seleccionarConfiguracion,
} from "../../../store/slices/configuracionesEstaciones/indexConfiguracionesEstaciones";

function Dashboards_Estaciones() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [selectDashboards, setSelectdDashboards] = useState({
    opcDashboards: 0,
  });
  const onSubmit = (datos) => {
    setSelectdDashboards({
      ...selectDashboards,
      opcDashboards: datos.opcDashboards?.value || "",
    });
    console.log(selectDashboards.opcDashboards);
  };
  const opcDashboards = [
    { label: "Estación Guamal", value: 1 },
    { label: "Estación Guayuriba", value: 2 },
    { label: "Estación Ocoa", value: 3 },
    { label: "Estación Puerto Gaitan", value: 4 },
  ];

  const configuraciones = useAppSelector(
    (state) => state.configuracion.configuracion
  );

  const [queryData, setQueryData] = useState([]);
  //const [data, setData] = useState({})
  const [data, setData] = useState({
    properties: {
      OBJECTID: "",
      Temperatura: "",
      Humedad: "",
      Presión: "",
      Velocidad_Viento: "",
      Dirección_Viento: "",
      Precipitación: "",
      Luminosidad: "",
      Nivel_Agua: "",
      Velocidad_Agua: "",
      Estado: "",
      fecha: "",
      frecuencia: "",
    },
  });

  const getGeojson = async () => {
    try {
      const {
        data: { features },
      } = await clienteEstaciones.get("/geojson");
      setQueryData(features);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGeojson();
  }, []);

  useEffect(() => {
    if (queryData.length > 0 && selectDashboards.opcDashboards !== 0)
      setData(queryData[selectDashboards.opcDashboards - 1]);
  }, [selectDashboards.opcDashboards]);

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
            <h3 className="mt-2 mb-0">
              Comportamiento de las variables de las estaciones
            </h3>
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
            {selectDashboards.opcDashboards === 1 ? (
              <div>
                <div className="row col12 mt-5 mx-2">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Fecha
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.fecha}
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-regular fa-calendar-days fs-2"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center "
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Estado
                    </div>

                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Estado}
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-chart-line fs-2 mx-4"></i>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Frecuencia de Muestreo
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.frecuencia}
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-solid fa-business-time fs-2"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row col12 mt-5 mx-2">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.Humedad.slice(0, 4)} %
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Temperatura.slice(0, 4)} °C
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-2 text-white bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-dark text-center mx-5">
                        {data.properties.Velocidad_Agua.slice(0, 4)} m/s
                      </h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Precipitación
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="aling-items-left text-dark text-center mx-4">
                        {data.properties.Precipitación.slice(0, 5)} mm
                      </h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-cloud-showers-heavy fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a
                        href="https://app.powerbi.com/view?r=eyJrIjoiODA1MzVmMjctNTRiYi00NTYxLThjZGYtMTE0ZThlNDhkMGQ1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                        className="text-dark"
                      >
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Luminosidad.slice(0, 4)} Lux
                      </h6>
                      <div className="icon-circle text-white ">
                        <i className="fa-solid fa-sun fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Velocidad_Viento.slice(0, 4)} °
                      </h6>
                      <div className="icon-circle text-dark mx-2">
                        <i className="fa-solid fa-wind fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-info text-center bg-light"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Presión
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-1">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Presión.slice(0, 5)} hPa
                      </h6>
                      <div className="icon-circle text-dark mx-4">
                        <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2  text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Nivel_Agua.slice(0, 4)} m
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-info text-center bg-light"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Dirección del Viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-1">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Dirección_Viento.slice(0, 5)} °
                      </h6>
                      <div className="icon-circle text-dark mx-4">
                        <i className="fa-solid fa-regular fa-compass fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
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
                          <div
                            className="card-header "
                            style={{ backgroundColor: "#E9ECEF" }}
                          >
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
                  <iframe></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Precipitación</h3>
                    <iframe
                      title="PrecipitacionGuayuriba - Página 1"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=e6935e38-1fae-4c30-bb0c-433408198d0d&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del viento</h3>
                    <iframe
                      title="VelocidadVientoGuayuriba - Página 1"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=f6bd0828-6155-4e78-a991-6c3ec6ec9b63&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel del agua</h3>
                    <iframe
                      title="NivelAguaGuayuriba"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=eb8e111c-aec0-4cb4-bfce-5e4cc06888db&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Dirección Viento</h3>
                    <iframe
                      title="DireccionVientoGuayuriba"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=6973847b-d0cf-4331-822f-b03a2eda08cf&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectDashboards.opcDashboards === 2 ? (
              <div>
                <div className="row col12 mt-5 mx-2">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Fecha
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.fecha}
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-regular fa-calendar-days fs-2"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center "
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Estado
                    </div>

                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Estado}
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-chart-line fs-2 mx-4"></i>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Frecuencia de Muestreo
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.frecuencia}
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-solid fa-business-time fs-2"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row col12 mt-5 mx-2">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.Humedad.slice(0, 4)} %
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Temperatura.slice(0, 4)} °C
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-2 text-white bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-dark text-center mx-5">
                        {data.properties.Velocidad_Agua.slice(0, 4)} m/s
                      </h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Precipitación
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="aling-items-left text-dark text-center mx-4">
                        {data.properties.Precipitación.slice(0, 5)} mm
                      </h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-cloud-showers-heavy fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a
                        href="https://app.powerbi.com/view?r=eyJrIjoiODA1MzVmMjctNTRiYi00NTYxLThjZGYtMTE0ZThlNDhkMGQ1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                        className="text-dark"
                      >
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Luminosidad.slice(0, 4)} Lux
                      </h6>
                      <div className="icon-circle text-white ">
                        <i className="fa-solid fa-sun fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Velocidad_Viento.slice(0, 4)} °
                      </h6>
                      <div className="icon-circle text-dark mx-2">
                        <i className="fa-solid fa-wind fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-info text-center bg-light"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Presión
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-1">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Presión.slice(0, 5)} hPa
                      </h6>
                      <div className="icon-circle text-dark mx-4">
                        <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2  text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Nivel_Agua.slice(0, 4)} m
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-info text-center bg-light"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Dirección del Viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-1">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Dirección_Viento.slice(0, 5)} °
                      </h6>
                      <div className="icon-circle text-dark mx-4">
                        <i className="fa-solid fa-regular fa-compass fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
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
                          <div
                            className="card-header "
                            style={{ backgroundColor: "#E9ECEF" }}
                          >
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
                  <iframe
                    title="Humedad_estaciones Guayuriba - Monitoreo"
                    width="800px"
                    height="450px"
                    src="https://app.powerbi.com/view?r=eyJrIjoiNDIwM2NhOGItOTk1Mi00MTQ0LTg5MjctM2JjOWM3YTFkNWYyIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                  ></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe
                      title="Presion de aire_estaciones Guayuriba - Monitoreo"
                      width="800px"
                      height="450px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZTRkYTNmM2QtM2E3ZC00N2YzLWI1NTYtOWQ5YmMzNzJjYjM1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe
                      title="Nivel de Luminosidad_estaciones Guayuriba - Monitoreo"
                      width="800"
                      height="450"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZTBlMTgwYmEtM2UwMy00NTlmLWJiNTUtN2ZjNTc3YzgwZGRlIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe
                      title="Velocidad del agua_estaciones Guayuriba - Monitoreo"
                      width="800"
                      height="450"
                      src="https://app.powerbi.com/view?r=eyJrIjoiMjk4ODdhNTItN2UwNy00NWM0LTk0NzAtZDliNTdkYmZiYTA5IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe
                      title="Temperatura_estaciones Guayuriba - Monitoreo"
                      width="800px"
                      height="450px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiMGY3NDZkZTgtYmFmZS00YmU4LWE1ZmQtMmExOWVhNTY0OGJlIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Precipitación</h3>
                    <iframe
                      title="Precipitación_estaciones Guayuriba - Monitoreo"
                      width="800px"
                      height="450px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiODA1MzVmMjctNTRiYi00NTYxLThjZGYtMTE0ZThlNDhkMGQ1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel del agua</h3>
                    <iframe
                      title="NivelAguaOcoa"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=4c4e757a-a2ea-49c1-936c-d443244a961a&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Dirección Viento</h3>
                    <iframe
                      title="DireccionVientoGuayuriba"
                      width="800px"
                      height="486px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZGIyOGM4Y2UtNjU2My00OTAzLTlmZDgtMGYzODc1MDZhM2VjIiwidCI6ImZjMDA1NDdhLTI0YmItNGU0Zi05ZDYxLTczZmNhNWViOWRmMyIsImMiOjR9"                    
                      ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión aire</h3>
                    <iframe
                      title="PresionOcoa"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=3281090b-0edd-4e4c-8c39-d8031bf05c98&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectDashboards.opcDashboards === 3 ? (
              <div>
                <div className="row col12 mt-5 mx-2">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Fecha
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.fecha}
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-regular fa-calendar-days fs-2"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center "
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Estado
                    </div>

                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Estado}
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-chart-line fs-2 mx-4"></i>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Frecuencia de Muestreo
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.frecuencia}
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-solid fa-business-time fs-2"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row col12 mt-5 mx-2">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.Humedad.slice(0, 4)} %
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Temperatura.slice(0, 4)} °C
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-2 text-white bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-dark text-center mx-5">
                        {data.properties.Velocidad_Agua.slice(0, 4)} m/s
                      </h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Precipitación
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="aling-items-left text-dark text-center mx-4">
                        {data.properties.Precipitación.slice(0, 5)} mm
                      </h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-cloud-showers-heavy fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a
                        href="https://app.powerbi.com/view?r=eyJrIjoiODA1MzVmMjctNTRiYi00NTYxLThjZGYtMTE0ZThlNDhkMGQ1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                        className="text-dark"
                      >
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Luminosidad.slice(0, 4)} Lux
                      </h6>
                      <div className="icon-circle text-white ">
                        <i className="fa-solid fa-sun fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Velocidad_Viento.slice(0, 4)} °
                      </h6>
                      <div className="icon-circle text-dark mx-2">
                        <i className="fa-solid fa-wind fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-info text-center bg-light"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Presión
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-1">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Presión.slice(0, 5)} hPa
                      </h6>
                      <div className="icon-circle text-dark mx-4">
                        <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2  text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Nivel_Agua.slice(0, 4)} m
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-info text-center bg-light"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Dirección del Viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-1">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Dirección_Viento.slice(0, 5)} °
                      </h6>
                      <div className="icon-circle text-dark mx-4">
                        <i className="fa-solid fa-regular fa-compass fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
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
                          <div
                            className="card-header "
                            style={{ backgroundColor: "#E9ECEF" }}
                          >
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
                  <iframe
                    title="HumedadPuertoGaitan"
                    width="900px"
                    height="500px"
                    src="https://app.powerbi.com/reportEmbed?reportId=dc9a907a-01b6-4f29-8005-b44d7803c55c&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                  ></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe
                      title="PresionPuertoGaitan"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=07abf225-77e7-424c-bd27-7ce1ee6c0a77&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe
                      title="LuminosidadPuertoGaitan"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=3c6e5579-fe33-4e06-8897-864af1c63032&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe
                      title="Velocidad del agua_estaciones Puerto Gaitan"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=45f43ecc-9e8f-469c-906c-75e0480966fb&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe
                      title="TemperaturaPuertoGaitan"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=40f66d02-ca8a-4194-a662-26be56e8925f&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Precipitación</h3>
                  </div>
                  <iframe
                    title="PrecipitacionPuertoGaitan - Página 1"
                    width="900px"
                    height="500px"
                    src="https://app.powerbi.com/reportEmbed?reportId=2bc6f023-b79e-47ef-920d-5c349ee93e4b&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                  ></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del viento</h3>
                    <iframe
                      title="VelocidadVientoPuertoGaitan"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=6427d13d-b81f-4875-b298-2bba67f60be6&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel del agua</h3>
                    <iframe
                      title="NivelAguaPuertoGaitan - Página 1"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=1aaf3e42-3014-4e11-91a0-19247e8c072f&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Dirección del viento</h3>
                    <iframe
                      title="DireccionVientoPuertoGaitan"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=d6b4d732-f8d4-4bab-a42d-974589c7b171&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectDashboards.opcDashboards === 4 ? (
              <div>
                <div className="row col12 mt-5 mx-2">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Fecha
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.fecha}
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-regular fa-calendar-days fs-2"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-center "
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Estado
                    </div>

                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Estado}
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-chart-line fs-2 mx-4"></i>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Frecuencia de Muestreo
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.frecuencia}
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-solid fa-business-time fs-2"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row col12 mt-5 mx-2">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-5">
                      <h6 className="text-dark text-center">
                        {data.properties.Humedad.slice(0, 4)} %
                      </h6>
                      <div className="icon-circle text-dark mx-1">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Temperatura.slice(0, 4)} °C
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-2 text-white bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad agua
                    </div>
                    <div className="d-flex justify-content-between align-items-left mt-0">
                      <h6 className="text-dark text-center mx-5">
                        {data.properties.Velocidad_Agua.slice(0, 4)} m/s
                      </h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-4 text-dark bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Precipitación
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="aling-items-left text-dark text-center mx-4">
                        {data.properties.Precipitación.slice(0, 5)} mm
                      </h6>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-cloud-showers-heavy fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a
                        href="https://app.powerbi.com/view?r=eyJrIjoiODA1MzVmMjctNTRiYi00NTYxLThjZGYtMTE0ZThlNDhkMGQ1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                        className="text-dark"
                      >
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-4 mx-4 text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Luminosidad.slice(0, 4)} Lux
                      </h6>
                      <div className="icon-circle text-white ">
                        <i className="fa-solid fa-sun fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{ width: "250px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-4">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Velocidad_Viento.slice(0, 4)} °
                      </h6>
                      <div className="icon-circle text-dark mx-2">
                        <i className="fa-solid fa-wind fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-info text-center bg-light"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Presión
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-1">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Presión.slice(0, 5)} hPa
                      </h6>
                      <div className="icon-circle text-dark mx-4">
                        <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2  text-white"
                    style={{
                      width: "250px",
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
                      <h6 className="text-white text-center mx-5">
                        {data.properties.Nivel_Agua.slice(0, 4)} m
                      </h6>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="card col-3 mx-2 text-white bg-light"
                    style={{
                      width: "250px",
                      height: "150px",
                      backgroundColor: "#042f4a",
                    }}
                  >
                    <div
                      className="card-header text-info text-center bg-light"
                      style={{ backgroundColor: "#042f4a" }}
                    >
                      Dirección del Viento
                    </div>
                    <div className="d-flex justify-content-between align-items-left mx-1">
                      <h6 className="text-dark text-center mx-4">
                        {data.properties.Dirección_Viento.slice(0, 5)} °
                      </h6>
                      <div className="icon-circle text-dark mx-4">
                        <i className="fa-solid fa-regular fa-compass fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más{" "}
                        <i
                          className="fas fa-arrow-circle-right"
                          title="Ver más"
                        />
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
                          <div
                            className="card-header "
                            style={{ backgroundColor: "#E9ECEF" }}
                          >
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
                  <iframe></iframe>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe
                      title="PresionGuamal - Página 1"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=0d34d0f7-bb08-423a-9e06-0051f6f45f7a&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe
                      title="TemperaturaGuamal"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=85e332c6-f0a3-4adb-ac38-748b57812dde&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Precipitación</h3>
                    <iframe
                      title="PrecipitacionGuamal - Página 1"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=47d97fee-7adc-439f-9b27-650224d8d3f1&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del viento</h3>
                    <iframe
                      title="VelocidadVientoOcoa"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=075ee9eb-da9a-4b62-ba1f-9f4d9c6e9490&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Dirección de viento</h3>
                    <iframe
                      title="DireccionVientoGuamal"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=a0b275b9-787f-42b9-9b30-9214b0ef7bf4&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de agua</h3>
                    <iframe
                      title="NivelAguaGuamal - Página 1"
                      width="900px"
                      height="500px"
                      src="https://app.powerbi.com/reportEmbed?reportId=8349fa85-ac15-45ad-918e-d179b7158512&autoAuth=true&ctid=8d36836e-6b75-4de6-bab9-5f4b1775427f"
                    ></iframe>
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
