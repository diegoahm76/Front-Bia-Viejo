import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

//Components
import Subtitle from "../../../../components/Subtitle";
import clienteAxios from "../../../../config/clienteAxios";
import { textChoiseAdapter } from "../../../../adapters/textChoices.adapter";
//Styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
//Interfaces
import { IGeneric } from "../../../../Interfaces/Generic";
import useCvComputers from "./hooks/useCvComputers";
import { Card } from "react-bootstrap";

const HojaDeVidaComputoScreen = () => {
  //Hooks
  const {
    //States
    columnDefs,
    columnDefs2,
    rowData,
    asignacionPrestamos,
    articuloEncontrado,
    otrasAplicaciones,
    estadoDeActio,
    otrasPerisfericos,
    control,
    dataCvComputers,
    defaultColDef,
    errors,
    //Edita States
    setArticuloEncontrado,
    setOtrasAplicaciones,
    setOtrasPerisfericos,
    //Functions
    ScreenHistoricoArticulo,
    ScreenProgramarMantnimiento,
    handledSearch,
    onSubmit,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    onGridReady,
  } = useCvComputers();

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-rigth  fw-light mt-4">
              Hoja de vida de cómputo
            </h3>

            <Subtitle title="Activo" mt={3} />

            <div className="row">
              <div className="col-12 col-lg-6  mt-3">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div>
                      <label className="ms-2 text-terciary">Serial</label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        {...register("codigo", { required: true })}
                      />
                      {errors.codigo && (
                        <p className="text-danger">Este campo es obligatorio</p>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 ">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre del activo<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Nombre del activo"
                        disabled
                        {...register("tipo_de_equipo", { required: false })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6  mt-3">
                    <label className="ms-2 text-terciary">
                      Código<span className="text-danger">*</span>
                    </label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="Código"
                      value={"10203040506"}
                      disabled
                    />
                  </div>

                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="btn btn-sm btn-tablas mt-5"
                      type="button"
                      onClick={() => handledSearch()}
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6  mt-3 text-justify">
                <div className="row">
                  <Card style={{ width: "18rem" }}>
                  
                    <Card.Body>
                      <Card.Title>FOTO DEL COMPUTADOR</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>

            {articuloEncontrado === true ? (
              <div>
                <Subtitle title="Especificaciones físicas" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Color
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Negro"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Marca<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Lenovo"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Estado</label>
                    <Controller
                      name="tipoDocumento"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          options={estadoDeActio}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Tipo de equipo <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Portatil"
                      />
                      <p>portatil, tablet, all-in-one</p>
                    </div>
                  </div>
                </div>

                <Subtitle title="Características" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Sistema operativo
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Windows 11"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Suite ofimática<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Microsoft office"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Antivirus<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="McAfee"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">
                      Otros aplicativos
                    </label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setOtrasAplicaciones(!otrasAplicaciones)}
                    >
                      {otrasAplicaciones == false ? (
                        <i
                          className="fa-solid fa-toggle-off fs-3"
                          style={{ color: "black" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-toggle-on fs-3"
                          style={{ color: "#8cd81e" }}
                        ></i>
                      )}
                    </button>
                  </div>
                  {otrasAplicaciones == true ? (
                    <div>
                      <div className="col-12 col-md-12 ">
                        <div className="mx-3">
                          <label className="text-terciary" htmlFor="ms-2">
                            Aplicativos
                          </label>
                          <textarea
                            className="form-control border rounded-pill px-4 border border-terciary"
                            placeholder="Observaciones"
                            value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <Subtitle title="Especificaciones técnicas" mt={3} />

                <div className="row">
                <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Tipo de almacenamiento
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Disco duro "
                      />
                    </div>
                    <p>disco duro, SSD, NVME</p>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Capacidad 
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="1 TB"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Procesador<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Core i5"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Memoria ram<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="8 GB"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">
                    Observaciones
                    </label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setOtrasPerisfericos(!otrasPerisfericos)}
                    >
                      {otrasPerisfericos == false ? (
                        <i
                          className="fa-solid fa-toggle-off fs-3"
                          style={{ color: "black" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-toggle-on fs-3"
                          style={{ color: "#8cd81e" }}
                        ></i>
                      )}
                    </button>
                  </div>
                  {otrasPerisfericos == true ? (
                    
                      <div className="col-12 col-md-9 ">
                        <div className="mx-3">
                          <label className="text-terciary" htmlFor="ms-2">
                            Observaciones
                          </label>
                          <textarea
                            className="form-control border rounded-pill px-4 border border-terciary"
                            placeholder="Observaciones"
                            value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,"
                          />
                        </div>
                      </div>
                    
                  ) : (
                    ""
                  )}
                </div>

                <Subtitle title="Mantenimientos" mt={3} mb={3} />

                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 mb-3">
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        defaultColDef={defaultColDef}
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                      type="button"
                      title="Send"
                      onClick={() => ScreenProgramarMantnimiento()}
                    >
                      Programar
                    </button>
                  </div>
                </div>

                <Subtitle title="Asignaciones" mt={3} mb={3} />
                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 mb-3">
                    {" "}
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs2}
                        rowData={asignacionPrestamos}
                        defaultColDef={defaultColDef}
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                      type="button"
                      title="Send"
                      onClick={() => ScreenHistoricoArticulo()}
                    >
                      Historico de archivo
                    </button>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-left col-12 col-lg-6 col-sm-6">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                      type="button"
                      title="Send"
                    >
                      Orden de la compra
                    </button>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end col-12 col-lg-6 col-sm-6">
                    <button
                      className=" px-3 btn  text-capitalize"
                      type="button"
                      title="Salir"
                    >
                      <i className="fa-solid fa-x fs-3"></i>
                    </button>
                    <button
                      className=" px-3 btn text-capitalize"
                      type="button"
                      title="Guardar"
                    >
                      <i className="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
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
};
export default HojaDeVidaComputoScreen;
