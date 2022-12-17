import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import { useState } from "react";
import clienteAxios from "../../../config/clienteAxios";
import Select from "react-select";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import IconoBuscar from "../../../assets/iconosBotones/buscar.svg";

const AutodeclaracionTuaScreen = () => {
  const [checkboxSistema, setCheckboxSistema] = useState(false);
  const [checkboxCali, setCheckboxCali] = useState(false);
  const [checkboxAuto, setCheckboxAuto] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    control: controlDatos,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="text-rigth  fw-light mt-4 mb-2">
              Autodeclaración TUA
            </h3>

            <Subtitle title={"Datos personales"} />
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Tipo de documento
                  </label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    value={"Cedula de ciudadania"}
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Numero de documento
                  </label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    value={"1121957676"}
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Razón social</label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    value={"Natural"}
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Nombre y apellido
                  </label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    value={"Wilmer Novoa"}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Celular</label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    value={"3207598872"}
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Direccion</label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    value={"carrera 36 # 28-97 sur"}
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    actos administrativos
                  </label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    value={"9"}
                    disabled
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de autodeclaración:
                </label>

                <Controller
                  name="periodo"
                  control={controlDatos}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        {
                          label: "Tasa por utilización de Agua ",
                          value: "tua",
                        },
                        {
                          label: "Tasa retributiva y compensatoria",
                          value: "trc",
                        },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 col-lg-3  mt-3">
                <h4>Sistema de medicion</h4>
              </div>

              <div className="col-12 col-lg-3 mt-3 text-center">
                <button
                  className="btn btn-sm btn-tablas "
                  type="button"
                  title="Solicitudes"
                  onClick={() => setCheckboxSistema(!checkboxSistema)}
                >
                  {checkboxSistema == true ? (
                    <i
                      className="fa-solid fa-toggle-off fs-1"
                      style={{ color: "black" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-toggle-on fs-1"
                      style={{ color: "#8cd81e" }}
                    ></i>
                  )}
                </button>
              </div>
              {checkboxSistema == false ? (
                <div className="col-12 col-lg-3 mt-3">
                  <input
                    className="form-control border rounded-pill px-2 border-terciary"
                    id="formFileLg"
                    type="file"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <h4>Certificado de calibración</h4>
              </div>

              <div className="col-12 col-lg-3 mt-3 text-center">
                <button
                  className="btn btn-sm btn-tablas "
                  type="button"
                  title="Solicitudes"
                  onClick={() => setCheckboxCali(!checkboxCali)}
                >
                  {checkboxCali == true ? (
                    <i
                      className="fa-solid fa-toggle-off fs-1"
                      style={{ color: "black" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-toggle-on fs-1"
                      style={{ color: "#8cd81e" }}
                    ></i>
                  )}
                </button>
              </div>
              {checkboxCali == false ? (
                <div className="col-12 col-lg-3 mt-3">
                  <input
                    className="form-control border rounded-pill px-2 border-terciary"
                    id="formFileLg"
                    type="file"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <h4>Informe autodeclaración</h4>
              </div>

              <div className="col-12 col-lg-3 mt-3 text-center">
                <button
                  className="btn btn-sm btn-tablas "
                  type="button"
                  title="Solicitudes"
                  onClick={() => setCheckboxAuto(!checkboxAuto)}
                >
                  {checkboxAuto == true ? (
                    <i
                      className="fa-solid fa-toggle-off fs-1"
                      style={{ color: "black" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-toggle-on fs-1"
                      style={{ color: "#8cd81e" }}
                    ></i>
                  )}
                </button>
              </div>
              {checkboxAuto == false ? (
                <div className="col-12 col-lg-3 mt-3">
                  <input
                    className="form-control border rounded-pill px-2 border-terciary"
                    id="formFileLg"
                    type="file"
                  />
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

export default AutodeclaracionTuaScreen;
