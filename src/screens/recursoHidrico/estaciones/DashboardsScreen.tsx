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
import { AxiosRequestConfig } from 'axios';
function Dashboards_Estaciones() {
  

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

const [selectDashboards, setSelectdDashboards] = useState({
    opcDashboards:""
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

  const [, setFeatures] = useState([]);

  useEffect(() => {
    const getGeojson = async () => {
      try{
        const {
          data: { features },}= await clienteEstaciones.get("/geojson");
      const filteredFeatures = features.filter(estacion => estacion.id == opcDashboards);
      setFeatures(filteredFeatures);
      console.log("Geojson", getGeojson);
      }catch (error){
        console.error(error);
      }
    }
    getGeojson();
  }, [opcDashboards]);
  
  


  
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
            onSubmit= {handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-2 mb-0">Dashboards Analitica de Datos</h3>
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

            {selectDashboards.opcDashboards == "2" ? (
                <div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">87</h4>
                      <div className="icon-circle text-dark">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-1"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más'/>
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

                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">21</h4>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más'/>
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
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">34</h4>
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
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">27</h4>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más'/>
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
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">87</h4>
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
                  
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad viento
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">34</h4>
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
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">27</h4>
                      <div className="icon-circle text-white">
                      <i className="fa-solid fa-gauge-simple-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" title='Ver más'/>
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
                      <div className="container-fluid">
                        
                          {/* Columna izquierda */}
                          <section className="col-lg-12 connectedSortable">
                            <div className="card">
                              <div className="card-header">
                                <h3 className="card-title">
                                  <i className="fas fa-chart-pie mr-1" />
                                  Graficos
                                </h3>
                                <div className="card-tools">
                                  <ul className="nav nav-pills ml-auto">
                                    <li className="nav-item"></li>
                                    <li className="nav-item"></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </section>
                      </div>
                      {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                  </div>
                  <div className="col-12 me-4 "></div>
                  <div
                    className="col-12 me-4 "
                    style={{ width: "900px", height: "800px" }}
                  >
                    <h3 className="mt-2 mb-0">Humedad</h3>
                    <iframe title="Temperatura_estaciones Guayuriba" 
                    width="900px" 
                    height="400px" 
                    src="https://app.powerbi.com/view?r=eyJrIjoiODViMTQwYTgtZDdlMS00NDJjLWE1MDMtODcwYTQ1M2RhMGMxIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&embedImagePlaceholder=true&pageName=ReportSection">

                    </iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe
                      title="Presión de aire Guayuriba - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZjdhYmRlYzktMTllZC00MzM3LWIxYjgtMGMzNzg1YTY2MjMzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe
                      title="Nivel de luminosidad Guayuriba - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiOWJjODMxN2MtZjhjZS00MTgzLWI3NGUtOTUzNjA5YmQzNzAzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe
                      title="Velocidad del agua Guayuriba - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZjdmOTZlMGQtNGU1Ny00ZDE3LWFiMzktN2U4ZTEwNzdmNWE0IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe
                      title="Temperatura_estaciones Guayuriba - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiODViMTQwYTgtZDdlMS00NDJjLWE1MDMtODcwYTQ1M2RhMGMxIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectDashboards.opcDashboards == "3" ? (
              <div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">87</h4>
                      <div className="icon-circle text-dark">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-1"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" />
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

                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">21</h4>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad rio
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">34</h4>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" />
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
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">27</h4>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" />
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
                  <div className="col-12 me-4 ">
                    <h3 className="mt-2 mb-0">Humedad</h3>
                    <iframe
                      title="Humedad Ocoa - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiNTU3OTA2ZmEtNTBjOS00ZmY3LTk0NDUtZmYwYmYwYTQyOGMzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe
                      title="Presión de aire Ocoa - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiNmYzY2Y5YTgtOTY1MS00MWRjLTg4YmItZDQ5MjEzZDM5YTQ4IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe
                      title="Nivel de luminosidad Ocoa - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZDJkZDJiMGYtZDEwYi00ZjQzLWFkNjMtNjE1ZjdlYjFiZDc0IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe
                      title="Velocidad del agua Ocoa - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiMDMzODc5OTEtYWYwYi00NGFjLTg4ZTktOWRlZjNkNjRmZmU5IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe
                      title="Temperatura_estacioes Ocoa - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiNGFlOGM4YTktZTY4MS00OGQ4LTk5YmItODY3NzMzZjMyYmIzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectDashboards.opcDashboards == "4" ? (
              <div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">87</h4>
                      <div className="icon-circle text-dark">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-1"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" />
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

                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">21</h4>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad rio
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">34</h4>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" />
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
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">27</h4>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" />
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
                  <div className="col-12 me-4 ">
                    <h3 className="mt-2 mb-0">Humedad</h3>
                    <iframe
                      title="Humedad Puerto Gaitan - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiNmVlMTBhNTEtNmE2OS00Y2FlLTkwODctYmQ2NDRlNDczZTJhIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe
                      title="Presión de aire Puerto Gaitan - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiYjYwMzE0YjgtYzkyZS00ZmM0LWJiYzQtMWZiZTA5ODBlZjIwIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe
                      title="Nivel de luminosidad Puerto Gaitan - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZjVhNjZlM2UtMjNmNS00ZmE4LTgyOGUtZWM2ZTQwNTlhMzBmIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe
                      title="Velocidad del agua Puerto Gaitan - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiYTcyM2U2MGQtMzMwZC00MjA1LWFjMzYtZjRjZjAxMmNiZjc1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe
                      title="Temperatura_estacioes Puerto Gaitan - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiNTY3YWZjYTItNjFkYi00MDE0LWFiZDUtNDY1ZTI4MWMyNWE0IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {selectDashboards.opcDashboards == "1" ? (
              <div>
                <div className="row col-12 mt-5 mx-3">
                  <div
                    className="card col-2 text-dark bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">87</h4>
                      <div className="icon-circle text-dark">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-1"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" />
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

                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">21</h4>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad rio
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-dark text-center mx-5">34</h4>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-dark">
                        Ver más <i className="fas fa-arrow-circle-right" />
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
                    <div className="d-flex justify-content-between align-items-center px-3 mt-0">
                      <h4 className="text-white text-center mx-5">27</h4>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="" className="text-white">
                        Ver más <i className="fas fa-arrow-circle-right" />
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
                  <div className="col-12 me-4 ">
                    <h3 className="mt-2 mb-0">Humedad</h3>
                    <iframe
                      title="Humedad Guayuriba - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiOWI3NTZlZGUtMjZmMi00YWQzLWE1YjktMzkwNThhZmEwYWI1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Presión del aire</h3>
                    <iframe
                      title="Presión de aire Guayuriba - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZjdhYmRlYzktMTllZC00MzM3LWIxYjgtMGMzNzg1YTY2MjMzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Nivel de luminosidad</h3>
                    <iframe
                      title="Nivel de luminosidad Guayuriba - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiOWJjODMxN2MtZjhjZS00MTgzLWI3NGUtOTUzNjA5YmQzNzAzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Velocidad del agua</h3>
                    <iframe
                      title="Velocidad del agua Guayuriba - Dashboard variable"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiZjdmOTZlMGQtNGU1Ny00ZDE3LWFiMzktN2U4ZTEwNzdmNWE0IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
                    ></iframe>
                  </div>
                  <div className="col-12 mx-4">
                    <h3 className="mt-2 mb-0">Temperatura</h3>
                    <iframe
                      title="Temperatura_estaciones Guayuriba - Analitica de datos"
                      width="900px"
                      height="400px"
                      src="https://app.powerbi.com/view?r=eyJrIjoiODViMTQwYTgtZDdlMS00NDJjLWE1MDMtODcwYTQ1M2RhMGMxIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"
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

