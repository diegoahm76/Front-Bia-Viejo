import React, { useEffect } from "react";
import { useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Subtitle from "../../../components/Subtitle";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { obtenerMonitoreo } from "../../../store/slices/Monitoreo/indexMonitoreo";
import Select from "react-select";
import { Color } from "../../../../public/static/js/plugins/threejs";
import { isAsyncThunkAction } from "@reduxjs/toolkit";

function Dashboards_Estaciones() {
  const [selectDashboards, setSelectdDashboards] = useState({
    opcDashboards: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelectdDashboards({
      ...selectDashboards,
      opcDashboards: data.opcDashboards?.value || "",
    });
    console.log(selectDashboards.opcDashboards);
  };
  const opcDashboards = [
    { label: "Estación Guayuriba", value: "GUAY" },
    { label: "Estación Ocoa", value: "OC" },
    { label: "Estación Puerto Gaitan", value: "PTOGA" },
    { label: "Estación Guamal", value: "GUAM" },
  ];

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
            <h3 className="mt-2 mb-0">Dashboards Estaciones Meteorologicas</h3>
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

            {selectDashboards.opcDashboards === "GUAY" ? (
              <div>
                <div className="row mt-5 justify-content-center">
                  <div
                    className="card col-2 mx-2text-white mb-3 bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-dark text-center"></div>
                      <div className="icon-circle text-dark">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-1"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white mb-3"
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
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-white text-center"></div>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2text-white mb-3 bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad rio
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-dark text-center"></div>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-1"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2  text-white mb-3"
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
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-white text-center"></div>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
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

            {selectDashboards.opcDashboards === "OC" ? (
              <div>
                <div className="row mt-5 justify-content-center">
                  <div
                    className="card col-2 mx-2text-white mb-3 bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-dark text-center"></div>
                      <div className="icon-circle text-dark">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-1"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white mb-3"
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

                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-white text-center"></div>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2text-white mb-3 bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad rio
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-dark text-center"></div>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-1"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2  text-white mb-3"
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
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-white text-center"></div>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
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

            {selectDashboards.opcDashboards === "PTOGA" ? (
              <div>
                <div className="row mt-5 justify-content-center">
                  <div
                    className="card col-2 mx-2text-white mb-3 bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-dark text-center"></div>
                      <div className="icon-circle text-dark">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-1"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white mb-3"
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
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-white text-center"></div>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2text-white mb-3 bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad rio
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-dark text-center"></div>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-1"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2  text-white mb-3"
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
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-white text-center"></div>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
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
            {selectDashboards.opcDashboards === "GUAM" ? (
              <div>
                <div className="row mt-5 justify-content-center">
                  <div
                    className="card col-2 mx-2text-white mb-3 bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Humedad
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-dark text-center"></div>
                      <div className="icon-circle text-dark">
                        <i className="fa-sharp fa-solid fa-glass-water-droplet fs-1"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2 text-white mb-3"
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
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-white text-center"></div>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-temperature-high fs-2"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2text-white mb-3 bg-light"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="card-header text-info text-center bg-light">
                      Velocidad rio
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-dark text-center"></div>
                      <div className="icon-circle text-dark">
                        <i className="fa-solid fa-water fs-1"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card col-2 mx-2  text-white mb-3"
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
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <div className="text-white text-center"></div>
                      <div className="icon-circle text-white">
                        <i className="fa-solid fa-ruler-vertical fs-2"></i>
                      </div>
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
