import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Select from "react-select"
import LogoCormacarena from "../../../assets/LogosBIAPNG/logoCorma.svg";


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
                    <div className="row col-12 mt-5 mx-3">
                        <div className="card col-6" style={{ width: "450px", height: "200px" }}>
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <a className="d-block blur-shadow-image">
                                </a>
                                <div className="colored-shadow" ></div>
                            </div>
                            <div className="card-body text-center">
                                <h2 className="font-weight-normal mt-3">
                                    <a href="/dashboard/almacen/configuracion/administrador-bodegas">Estación Guamal</a>
                                </h2>
                            </div>
                        </div>
                        <div className="card col-6 bg-" style={{ width: "450px", height: "200px", }}>
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <a className="d-block blur-shadow-image">
                                </a>
                                <div className="colored-shadow" ></div>
                            </div>
                            <div className="card-body text-center">
                                <h2 className="font-weight-normal mt-3">
                                    <a href="javascript:;">Estación Guayuriba</a>
                                </h2>
                                <div><button>Ver mas...</button></div>
                            </div>
                        </div>

                        <div className="card col-6 mt-3" style={{ width: "450px", height: "200px" }}>
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <a className="d-block blur-shadow-image">
                                </a>
                                <div className="colored-shadow" ></div>
                            </div>
                            <div className="card-body text-center">
                                <h2 className="font-weight-normal mt-3">
                                    <a href="">Estación Ocoa</a>
                                </h2>
                            </div>
                        </div>
                        <div className="card col-6 mt-3" style={{ width: "450px", height: "200px", backgroundImage: "https://www.klipartz.com/es/sticker-png-tarwg" }}>
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <a className="d-block blur-shadow-image">
                                </a>
                                <div className="colored-shadow" ></div>
                            </div>
                            <div className="card-body item-center">
                                <h2 className="font-weight-normal mt-3">
                                    <a href="">Estación Pto Gaitan</a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};
export default AnaliticaDeDatos;