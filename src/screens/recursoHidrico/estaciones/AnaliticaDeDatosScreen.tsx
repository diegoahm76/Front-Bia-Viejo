import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Select from "react-select"


const opcAnalitica = [
    { const: "guam", value: 1 },
    { const: "guay", value: 2 },
    { const: "ocoa", value: 3 },
    { const: "ptoga", value: 4 },
]
function AnaliticaDeDatos() {


    return (
        <div className="row min-vh-100">
            <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
                    <h3>Analitica de Datos por estaciones</h3>
                    <div className="row col-12 mt-5 mx-3 ">
                        <div
                            className="card col-2 text-dark"
                            style={{ width: "200px", height: "150px", backgroundImage: "bg-pircing.jpg" }}
                        >
                            <div className="card-header text-info text-center bg-light">
                                Guayuriba
                            </div>
                            <div className="d-flex justify-content-between align-items-left mx-6">
                            </div>
                            <div className="text-center">
                                <a href="https://app.powerbi.com/groups/39fa027a-d078-47da-8057-cb797c593fad/list?cmpid=pbi-glob-head-snn-signin" className="text-dark">
                                    Seleccionar <i className="fas fa-arrow-circle-right" title='Ver más' />
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
                                Guamal
                            </div>

                            <div className="d-flex justify-content-between align-items-left mt-0">
                                <h6 className="text-white text-center mx-5"></h6>
                            </div>
                            <div className="text-center">
                                <a href="" className="text-white">
                                    Seleccionar <i className="fas fa-arrow-circle-right" title='Ver más' />
                                </a>
                            </div>
                        </div>
                        <div
                            className="card col-2 text-dark"
                            style={{ width: "200px", height: "150px", backgroundImage: "bg-pircing.jpg" }}
                        >
                            <div className="card-header text-info text-center bg-light">
                                Puerto Gaitan
                            </div>
                            <div className="d-flex justify-content-between align-items-left mx-6">
                            </div>
                            <div className="text-center">
                                <a href="" className="text-dark">
                                    Seleccionar <i className="fas fa-arrow-circle-right" title='Ver más' />
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
                                Ocoa
                            </div>

                            <div className="d-flex justify-content-between align-items-left mt-0">
                                <h6 className="text-white text-center mx-5"></h6>
                            </div>
                            <div className="text-center">
                                <a href="" className="text-white">
                                    Seleccionar <i className="fas fa-arrow-circle-right" title='Ver más' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};
export default AnaliticaDeDatos;