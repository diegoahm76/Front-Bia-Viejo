//import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from "../../../../components/Subtitle";
import { Button, Card, Figure, Form } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import BusquedaArticuloModal from "../../../../components/BusquedaArticuloModal";
import useCvVehicles from "./hooks/useCvVehicles";
import { useAppSelector } from "../../../../store/hooks/hooks";
import DatePicker from "react-datepicker";
import img from "../../../../assets/svg/img_backgraund.svg"
import SearchArticleCvModal from "../../../../components/Dialog/SearchArticleCvModal";

const HojaDeVidaVehiculoScreen = () => {

  // Redux State Extractio
  const { cvMaintenance } = useAppSelector((state) => state.cv);

  //Hooks
  const {
    //States
    columnDefsMaintenance,
    columnDefs2,
    rowData,
    rowData2,
    busquedaArticuloModalOpen,
    initialState,
    vehiculoEncontado,
    arriendo,
    enCirculacion,
    control,
    dataCvVehicles,
    ListMark,
    listTypeVehicleData,
    listTypeDocData,
    listTypeGasData,
    file,
    defaultColDef,
    columnDefsArticles,
    errors,
    //Edita States
    setBusquedaArticuloModalOpen,
    setVehiculoEncontado,
    setArriendo,
    setEnCirculacion,
    setFile,
    //Functions
    ScreenHistoricoArticulo,
    ScreenProgramarMantnimiento,
    handledSearch,
    onSubmit,
    register,
    handleSubmit,
    reset,
    setValue,
    onGridReady,
    handleUpload
  } = useCvVehicles();

  console.log("dataCvVehicles", dataCvVehicles);

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Hoja de vida de un vehiculo
            </h3>
            <Subtitle title="Activo" mt={3} />

            <div className="row">
              <div className="col-12 col-lg-6  mt-3">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div>
                      <label className="ms-2 text-terciary">
                        Placa<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        {...register("doc_identificador_nro", { required: true })}
                      />
                      {errors.doc_identificador_nro && (
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
                        {...register("nombre", { required: false })}
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
                      disabled
                      {...register("codigo_bien", { required: false })}
                    />
                  </div>

                  <div className="col-12 col-lg-6  mt-3">
                    <label className="ms-2 text-terciary">
                      Tipo de vehiculo
                    </label>
                    <Controller
                      name="cod_tipo_vehiculo"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field.value}
                          options={listTypeVehicleData}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 mt-2">
                <div className="row">
                  {/* <div className="col-12 col-lg-6 text-center">
                    <button
                      className="btn btn-sm btn-tablas mt-8"
                      type="button"
                      title="Buscar"
                      onClick={() => handledSearch()}
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div> */}
                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="btn btn-sm btn-tablas mt-5"
                      type="button"
                      title="Buscar"
                      onClick={() => handledSearch()}
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-tablas mt-5"
                      type="button"
                      onClick={() => { reset(initialState); setVehiculoEncontado(false); setFile(null); }}
                      title="Limpiar"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles fs-3"></i>
                    </button>
                  </div>
                  {vehiculoEncontado ? (
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <Card style={{ width: "100%" }}>
                          <Card.Body>
                            <Figure style={{ display: "flex" }}>
                              <Figure.Image
                                style={{ margin: "auto" }}
                                width={171}
                                height={180}
                                alt="171x180"
                                src={!file ? img : URL.createObjectURL(file!)}
                              />
                            </Figure>
                            <Form.Group controlId="formFileSm" className="mb-3" style={{ margin: "auto" }}>
                              <Form.Control type="file" accept="image/*" size="sm" onChange={(e) => handleUpload(e)} />
                            </Form.Group>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="col-12 col-lg-6">
                      <button
                        className="border rounded-pill btn bg-gradient-primary mt-8"
                        type="button"
                        onClick={() => setBusquedaArticuloModalOpen(true)}
                      >
                        Busqueda de articulo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {vehiculoEncontado ? (
              <div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">En circulacion</label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setEnCirculacion(!enCirculacion)}
                    >
                      {enCirculacion == false ? (
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

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Desde</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_circulacion", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">Arrendado</label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setArriendo(!arriendo)}
                    >
                      {arriendo == false ? (
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
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Kilometraje</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("ultimo_kilometraje", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Actualizado</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_ultimo_kilometraje", { required: true })}
                    />
                  </div>
                </div>

                <Subtitle title="Especificaciones" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Marca</label>
                    <Controller
                      name="marca"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field.value}
                          options={ListMark}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Linea</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("linea", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Color</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("color", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Tipo combustible
                    </label>
                    <Controller
                      name="tipo_combustible"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field.value}
                          options={listTypeGasData}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Capacidad de pasajeros
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("capacidad_pasajeros", { required: true })}
                    />
                  </div>
                </div>

                <Subtitle title="Informacion adicional" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Fecha de adquisición
                    </label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_adquisicion", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Número de motor</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numero_motor", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Trasmisión</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("transmision", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Cilindraje</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("cilindraje", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Vigencia de garantia
                    </label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_vigencia_garantia", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero de chasis</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numero_chasis", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Dimencion de llantas{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("dimesion_llantas", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Capacidad de extintor{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("capacidad_extintor", { required: true })}
                    />
                  </div>
                </div>

                <Subtitle title="Control de documentación" mt={3} />

                <div className="row ">
                  <h5 className="mt-3">Tarjeta de operción</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("tarjeta_operacion", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_expedicion_op", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_expiracion_op", { required: true })}
                    />
                  </div>
                </div>

                <div className="row ">
                  <h5 className="mt-3">SOAT</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numero_soat", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_expedicion_soat", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_expiracion_soat", { required: true })}
                    />
                  </div>
                </div>
                <div className="row ">
                  <h5 className="mt-3">Revision tecnomicanica</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numero_tecnomecanica", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_expedicion_tecnomecanica", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_expiracion_tecnomecanica", { required: true })}
                    />
                  </div>
                </div>
                <div className="row ">
                  <h5 className="mt-3">Seguro todo riesgo</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numero_str", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_expedicion_str", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_expiracion_str", { required: true })}
                    />
                  </div>
                </div>

                <Subtitle title="Datos del conductor" mt={3} />
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("nombre_conductor", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Tipo documento</label>
                    <Controller
                      name="tipo_document"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field.value}
                          options={listTypeDocData}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero de documento</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numero_document", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Celular</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("celular", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Correo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Direccion</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("direccion", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <button
                      className="border rounded-pill btn bg-gradient-primary mt-4"
                      type="button"
                      title="Send"
                    >
                      Asignar conductor
                    </button>
                  </div>
                </div>

                <Subtitle title="Conductores anteriores " mt={3} mb={3} />
                <div className="row ">
                  <div className="col-12 mb-3">
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefsMaintenance}
                        rowData={cvMaintenance}
                        defaultColDef={defaultColDef}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-grid gap-2 d-lg-flex justify-content-lg-end">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary me-lg-2"
                      type="button"
                      title="Send"
                    >
                      Historial conductores
                    </button>
                  </div>
                </div>

                <Subtitle title="Mantenimientos" mb={3} />
                <div className="row ">
                  <div className="col-12 mb-3">
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs2}
                        rowData={rowData2}
                        defaultColDef={defaultColDef}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-grid gap-2 d-lg-flex justify-content-lg-end">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary me-lg-2"
                      type="button"
                      title="Send"
                    >
                      Programar mantenimiento
                    </button>
                  </div>
                </div>

                <div className="d-grid gap-2 d-lg-flex justify-content-lg-end mt-3">

                  <button
                    className="px-3 btn"
                    type="button"
                    title="Salir"
                  >
                    <i className="fa-solid fa-x fs-3"></i>
                  </button>
                  {/* <button
                    className="px-3 btn"
                    type="button"
                    title="Limpiar"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles fs-3"></i>
                  </button> */}
                  <button
                    className="px-3 btn"
                    type="submit"
                    title="Guardar"
                  >
                    <i className="fa-regular fa-floppy-disk fs-3"></i>
                  </button>

                </div>
              </div>
            ) : (
              ""
            )}
          </form>
          <SearchArticleCvModal
            isModalActive={busquedaArticuloModalOpen}
            setIsModalActive={setBusquedaArticuloModalOpen}
            cod_tipo_activo='Veh'
            label='Placa'
            title='Busqueda de vehiculos'
            columnDefsArticles={columnDefsArticles}
          />
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaVehiculoScreen;
