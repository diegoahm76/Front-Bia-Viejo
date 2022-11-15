import React from "react";
import img1 from "../assets/imgs/1.png";
import img3 from "../assets/imgs/3.png";
import img6 from "../assets/imgs/6.png";
import img4 from "../assets/imgs/4.png";
import img5 from "../assets/imgs/5.png";

import almacen from "../assets/subsitemas/almacen.png";
import analiticaDeDatos from "../assets/subsitemas/analitica-de-datos.png";
import estacionesHidrometeorologicas from "../assets/subsitemas/estaciones-hidrometerologicas.png";
import gestionDeViveros from "../assets/subsitemas/gestion-de-vivieros.png";
import gestionDocumental from "../assets/subsitemas/gestion-documental.png";
import mandoControlAmbiental from "../assets/subsitemas/Mando-y-control-ambiental.png";
import recursoHidrico from "../assets/subsitemas/recurso-hidrico.png";
import rentas from "../assets/subsitemas/rentas.png";
import seguimientoPlanes from "../assets/subsitemas/seguimiento-a-planes.png";
import tramites from "../assets/subsitemas/tramites.png";

function LogoScreen() {
  return (
    <div className="container">
      <div
        className="container"
        style={{ height: "280px", overflow: "hidden", objectFit: "fill" }}
      >
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img
                src={img1}
                className="d-block w-100 aspect-ratio"
                alt="..."
              />
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <img
                src={img3}
                className="d-block w-100 aspect-ratio"
                alt="..."
              />
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <img
                src={img4}
                className="d-block w-100 aspect-ratio"
                alt="..."
              />
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <img
                src={img5}
                className="d-block w-100 aspect-ratio"
                alt="..."
              />
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <img
                src={img6}
                className="d-block w-100 aspect-ratio"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container position-relative w-50">
        <div
          className="container mt-6 align-items-center"
          style={{ overflow: "hidden", width: "400px" }}
        >
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <img
                  src={almacen}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Almacen</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={analiticaDeDatos}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Analitica de datos</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={estacionesHidrometeorologicas}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Estaciones hidrometerologicas</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={gestionDeViveros}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Gestion de viveros</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={gestionDocumental}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Gestion documental</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={mandoControlAmbiental}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Mando de control ambiental</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={recursoHidrico}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Recurso hidrico</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={rentas}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Rentas</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={seguimientoPlanes}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Seguimiento a planes</h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="10000">
                <img
                  src={tramites}
                  className="d-block w-100 aspect-ratio"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-white">Tramites</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default LogoScreen;
