//import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from "../../../../components/Subtitle";
import { Button, Card } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import BusquedaArticuloModal from "../../../../components/BusquedaArticuloModal";
import useCvVehicles from "./hooks/useCvVehicles";
import { useAppSelector } from "../../../../store/hooks/hooks";
import DatePicker from "react-datepicker";

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
    errors,
    //Edita States
    setBusquedaArticuloModalOpen,
    setVehiculoEncontado,
    setArriendo,
    setEnCirculacion,
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
    handleUpload
  } = useCvVehicles();

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
                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="btn btn-sm btn-tablas mt-8"
                      type="button"
                      title="Buscar"
                      // onClick={() => setVehiculoEncontado(!vehiculoEncontado)}
                      onClick={() => handledSearch()}
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div>
                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="border rounded-pill btn bg-gradient-primary mt-8"
                      type="button"
                      onClick={() => setBusquedaArticuloModalOpen(true)}
                    >
                      Busqueda de articulo
                    </button>
                  </div>
                </div>

                {/* <div className="row">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>FOTO DEL COMPUTADOR</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div> */}
              </div>
            </div>
            {true ? (
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
                    {/* <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("fecha_vigencia_garantia", { required: true })
                      /> */}
                    <Controller
                      name="fechaIni"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          showYearDropdown
                          peekNextMonth
                          showMonthDropdown
                          dropdownMode="select"
                          scrollableYearDropdown
                          autoComplete="off"
                          selected={formValues.fechaIni}
                          // onSelect={(e) =>
                          //   setFormValues({ ...formValues, fechaIni: e })
                          // }
                          className="form-control border border-terciary rounded-pill px-3"
                          placeholderText="aaaa/mm/dd"
                          dateFormat="yyyy/MM/dd"
                        />
                      )}
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero de chasis</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Dimencion de llantas{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Capacidad de extintor{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
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
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
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
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
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
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
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
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
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
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Tipo documento</label>
                    <Select
                      options={listTypeDocData}
                      placeholder="Seleccionar"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero de documento</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Celular</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Correo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Direccion</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
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
                  <button
                    className="px-3 btn"
                    type="button"
                    title="Limpiar"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles fs-3"></i>
                  </button>
                  <button
                    className="px-3 btn"
                    type="button"
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
          <BusquedaArticuloModal
            isModalActive={busquedaArticuloModalOpen}
            setIsModalActive={setBusquedaArticuloModalOpen}
          />
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaVehiculoScreen;
