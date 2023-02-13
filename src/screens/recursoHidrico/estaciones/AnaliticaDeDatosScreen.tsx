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



function AnaliticaDeDatos() {
    const [selectDashboards, setSelectdDashboards] = useState({
        opcDashboards: 0
    });
    const onSubmit = (datos) => {
        setSelectdDashboards({
            ...selectDashboards,
            opcDashboards: datos.opcDashboards?.value || "",
        });
    };
    const opcDashboards = [
        { label: "Estación Guamal", value: 1 },
        { label: "Estación Guayuriba", value: 2 },
        { label: "Estación Ocoa", value: 3 },
        { label: "Estación Caño Rubiales", value: 4 },
    ];
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    return (
        <div className="row min-vh-100">

            <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <div
                    className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                    data-animation="FadeIn"
                >

                    <h3 className="mt-2 mb-0">Analitica de datos de las estaciones</h3>
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
                            <div className="row col-12 mt-5 mx-3">
                                <div className="col-12 mx-4 "></div>
                                <h3 className="mt-2 mb-0 text-center">Humedad</h3>
                                <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYmI5YjE1ZDYtMmY2NS00YmYyLTgwNmUtYjRjNTViOTA3YTJkIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Presión del aire</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYjdmNzBkYWEtNDU5Ni00NjY1LWIwZGUtNjJhYWU3NmUyYmU1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Nivel de luminosidad</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYjUxZWY2ZTMtN2Y0OS00MGE0LThjZDctOThhMzM4ZWUzZmZlIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Velocidad del agua</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMDMyYTY0YzUtNzhlMi00NTk0LThjY2QtNzdkNzA5MWVmOGMwIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Temperatura</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMDJjZGM4NzctOTc4YS00NjFmLWJmM2YtMTYzNmUzOGM1ZDc3IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Precipitación</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiOWZiZjc0OGYtZWJmNC00ZjY5LTkyNTctYzk4NjIxY2RiN2I5IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb- text-center">Velocidad del viento</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYzUwNTQzZDMtNzI1Ny00ODQwLTkyN2MtYTJjODIzMmI5YzAzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Nivel del agua</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMTE0OWEyMWUtYWFmNy00Nzg2LTlhODAtZTBkNDhjYTYxNGJhIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Dirección del viento</h3>
                                    <iframe title="Dirección del viento Guamal -Analitica" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMmY3ZGNkYTktOWVmNS00ZThmLWEwMTEtMDNiN2RhMjA0N2Q5IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {selectDashboards.opcDashboards === 2 ? (
                        <div>
                            <div className="row col-12 mt-5 mx-3">
                                <div className="col-12 mx-4 "></div>
                                <h3 className="mt-2 mb-0 text-center">Humedad</h3>
                                <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiM2FiZjUyZDAtNjA0NC00ZGFjLTlkNjYtMWMzY2M0YmE4YmVkIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Presión del aire</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiN2VkZDVlMjUtOTlmOS00NWVhLWJiYjktYjUwMzA1ZDRiNjg1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Nivel de luminosidad</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiZjEwYzA3NzUtNGZkYi00ZGY5LTg4NjMtNGQzZjJmYWQ4NWI3IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5" ></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Velocidad del agua</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMmFkMjM5MzAtNGNkZC00MzFiLWIwY2YtMGZhM2I5YTQ3ODE0IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Temperatura</h3>
                                </div><iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiNWMyNjU3OTMtZGQ2OC00MGJiLWEyMzItOTEwYjhmMjg4NDhiIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Precipitación</h3>
                                </div><iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMWNiMmE0YTQtYjY5Yy00NDc4LTg5NDUtZmNjZWY4YzhhNzE5IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb- text-center">Velocidad del viento</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMzU2NzA2YWYtYmMyNi00NTdmLWJjOWEtOWQwY2U2ZWY1ZWY0IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Nivel del agua</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYjY4MjAxNTktOGQzNi00YzExLTk1NTAtMGVlNzE4MTE0ODMyIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Dirección del viento</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiZGVhNDAwODAtMTc0Zi00MWI5LWFmNWMtZDc4ZWI5ZmMxZTI3IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {selectDashboards.opcDashboards === 3 ? (
                        <div>
                            <div className="row col-12 mt-5 mx-3">
                                <div className="col-12 mx-4 "></div>
                                <h3 className="mt-2 mb-0 text-center">Humedad</h3>
                                <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYzEwZDZlYWMtNjU2YS00NjBlLWIzZTMtNWY5N2VjMjk0NmE3IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Presión del aire</h3>
                                    <iframe title="Presión de aire Ocoa -Analitica" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMzc2ZmYxMjktNWJiZS00OTAyLWEwNjAtYWU5YjhmY2Y3ODIwIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Nivel de luminosidad</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiODFhYmM4OWYtZTM5My00YjkwLWI5ZDktNzE5MjQ2OTgyNTk1IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Velocidad del agua</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMjI0YmM2ZjktNDNlNS00ODllLWFjZDMtMjU5ZWU5YWU1MmNjIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Temperatura</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYzlkYjhhNTctMWJiNy00Y2Q4LWIzM2EtY2M4YWJjYmRiYzYzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Precipitación</h3>
                                    <iframe title="Precipitación Ocoa -Analitica - Analitica de datos" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiZWFlNzBjNWMtMDBmNS00YjU4LTg4OTYtZmRkZDhjOGRmN2Q0IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb- text-center">Velocidad del viento</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiY2M2MmRkNDAtMWNhNy00NTUxLWFhMWItNGJmZTg5NjFjNjhlIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>

                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Nivel del agua</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYTAwOWNlYzQtZGY3ZC00MTQwLTlkMGEtOTAzYjYxOTQyNDkwIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Dirección del viento</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiNWVjZDhjMjYtZmZlZi00ZTQ2LTk3NjUtMmMxMDA0NzdlNjUwIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {selectDashboards.opcDashboards === 4 ? (
                        <div>
                            <div className="row col-12 mt-5 mx-3">
                                <div className="col-12 mx-4 "></div>
                                <h3 className="mt-2 mb-0 text-center">Humedad</h3>
                                <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiODhlMzUyNWMtNGRkOC00ZGEyLWE3ZDgtODNhNWUzODRmNzYyIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Presión del aire</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMDJkNjMyMTUtZTVhYi00NzkwLTk1NGMtMDNkYTUzMzQ0MzkzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Nivel de luminosidad</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMDUwZTFhMDktZTQzYy00YTFlLWI2MzAtZWE2NDA3NzVlMGQzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Velocidad del agua</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiNWRhMjQyMjMtMDY5My00ZDVlLTllY2EtNTAxYTZjY2M0MDNiIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Temperatura</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiNGJhNTdkMzMtMzc4Yy00ZTcwLWI3N2YtMzNiMmNkMzIwYWZhIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Precipitación</h3>
                                    <iframe title="Precipitación Caño Rubiales - Analitica - Analitica de datos" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiYjNlMDk2NDctMWQ1Mi00NjE4LWE4ZDQtZDFkZmQwNWZhNWM4IiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb- text-center">Velocidad del viento</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiMDFhYmI3MWEtN2FjZi00YzVmLWI1ZjUtZGJhOTlhYzJlNWUzIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Nivel del agua</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiNThkYTFhMzItNmM5ZC00Y2U3LTg3MjQtMWFkZGRhODRiOTJjIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                                <div className="col-12 mx-4">
                                    <h3 className="mt-2 mb-0 text-center">Dirección del viento</h3>
                                    <iframe title="Report Section" width="900px" height="500px" src="https://app.powerbi.com/view?r=eyJrIjoiNmQ3NDUxOGUtNzNhMC00MjMxLTk2ZTctYzBmOWVhOTVjMmFjIiwidCI6IjhkMzY4MzZlLTZiNzUtNGRlNi1iYWI5LTVmNGIxNzc1NDI3ZiIsImMiOjR9&pageName=ReportSectionac102692e9906ac608a5"></iframe>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

            </div>
        </div>
    )
};
export default AnaliticaDeDatos;