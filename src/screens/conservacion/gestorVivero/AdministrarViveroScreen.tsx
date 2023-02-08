import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import ReactDatePicker from "react-datepicker";

import IconoBuscar from "../../../assets/iconosBotones/buscar.svg";
import Subtitle from "../../../components/Subtitle";
import { useAdministracionVivero } from "./hooks/useAdministracionVivero";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BusquedaAvanzadaModal from "../../../components/BusquedaAvanzadaModal";
import { Navigate } from "react-router-dom/dist";
import { ConsultasMunicipioModal } from '../../../components/ConsultasMunicipioModal';

const AdministrarViveroScreen = () => {
  const {
    handleSubmit,
    handleUpload,
    onSubmit,
    handleChange,
    municipiosOptions,
    changeSelectMuni,
    changeSelectOrigenRecurso,
    changeSelectTipoVivero,
    tipoVivero,
    origenRecurso,
    register,
    createModel,
    setCreateModel,
    errors,
    handleOpenModalAvanzadaModal,
    control,
    onSubmitGet,
    modal,
    setModal
  } = useAdministracionVivero();


  const editarViveros = {
    nombre: '',
    municipio: { value: '', label: '' },
    direccion : '',
    area_mt2: 0,
    area_propagacion_mt2: 0
  }

  const [modalPersonal, setModalPersonal] = useState(false);
  const [cuarentena, setCuarentena] = useState<boolean>(false);
  const [isActivo, setIsActivo] = useState<boolean>(true);
  const [apertura, setApertura] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);



  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Administración de viveros
            </h3>
            <Subtitle title="Información principal" mt={3} mb={2} />
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">Nombre:</label>
                <input
                  className="form-control border border-terciary rounded-pill px-3"
                  type="text"
                  {...register("nombre", { required: true })}
                  value={createModel.nombre}
                  placeholder="Escribe el nombre del vivero"
                  onChange={ handleChange }
                  disabled={ disabled }
                />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Municipio:<span className="text-danger">*</span>
                </label>

                <Select
                  {...register("cod_municipio", { required: true })}
                  options={municipiosOptions}
                  placeholder="Selecciona municipio"
                  name="municipio"
                  onChange={changeSelectMuni}
                  value={ createModel.municipio }
                  isDisabled={disabled}
                />

                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>

              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Dirección:<span className="text-danger">*</span>
                </label>

                <input
                  className="form-control border border-terciary rounded-pill px-3"
                  type="text"
                  {...register("direccion", { required: true })}
                  onChange={handleChange}
                  placeholder="Escribe la dirección del vivero"
                  value={ createModel.direccion }
                  disabled={disabled}
                />

                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>

              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área del vivero (metros cuadrados):{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control border border-terciary rounded-pill px-3"
                  type="number"
                  {...register("area_mt2", { required: true })}
                  onChange={handleChange}
                  placeholder="Ingresa área para el vivero"
                  value={ createModel.area_mt2 }
                  disabled={disabled}
                />
                {errors.nombreVivero && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Tipo Vivero:<span className="text-danger">*</span>
                </label>

                <Select
                  options={tipoVivero}
                  {...register("tipo_vivero", { required: true })}
                  onChange={changeSelectTipoVivero}
                  placeholder="Tipo de vivero"
                  required={true}
                  value={createModel.tipo_vivero}
                  isDisabled={disabled}
                />

                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
              <div
                className="col-12 col-md-3 mb-3"
                style={{ display: "contents" }}
              >
                <button
                  className="btn border rounded-pill mt-2 px-3 ms-2"
                  title="Consultar"
                  onClick={ onSubmitGet }
                >
                  <i className="fa-brands fa-readme fs-3"></i>
                </button>
                <ConsultasMunicipioModal
                  isModalActive={ modal }
                  setIsModalActive={ setModal }
                  setModel={setCreateModel}
                  setDisabled={ setDisabled }
                />
              </div>
            </div>

            <div className="row ms-3">
              {apertura ? (
                <div
                  className="card col-5 col-md-auto"
                  style={{
                    backgroundColor: "#f7d7d8",
                    flexBasis: "content",
                    height: "100px",
                  }}
                >
                  <div className="mt-3 ms-3">
                    <label style={{ color: "#84454a" }}>
                      {" "}
                      <i
                        className="fa-solid fa-triangle-exclamation me-3"
                        style={{ color: "#c02b1b" }}
                      ></i>
                      Este vivero se encuentra cerrado desde
                    </label>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width"
                      >
                        Ver mas Información
                      </button>
                      {/* </div>
              <div className="col-4"> */}
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width"
                      >
                        Realizar apertura
                      </button>
                    </div>
                  </div>
                </div>
              ) : null }
            </div>
            {cuarentena ? (
              <div className="row ms-3">
                <div
                  className="card col-5 col-md-auto"
                  style={{
                    backgroundColor: "#f7d7d8",
                    flexBasis: "content",
                    height: "100px",
                  }}
                >
                  <div className="mt-3 ms-3">
                    <label style={{ color: "#84454a" }}>
                      {" "}
                      <i
                        className="fa-solid fa-triangle-exclamation me-3"
                        style={{ color: "#c02b1b" }}
                      ></i>
                      Este vivero se encuentra en cuarentena desde
                    </label>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width"
                      >
                        Ver mas Información
                      </button>
                      {/* </div>
              <div className="col-4"> */}
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width"
                      >
                        Finalizar cuarentena
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <Subtitle title="Detalles de vivero" mt={3} mb={2} />

            <div className="col-12 col-md-3 mb-3">
              <label className="text-terciary">
                Área de propagación (metros cuadrados):{" "}
                <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border border-terciary rounded-pill px-3"
                type="number"
                {...register("area_propagacion_mt2", { required: true })}
                onChange={handleChange}
                placeholder="Ingresa medida para el área de propagación"
                value={ createModel.area_propagacion_mt2 }
              />
              {errors.nombreVivero && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3 form-check">
                <label className="text-terciary" htmlFor="flexCheckDefault">
                  Área de producción:
                </label>

                <input
                  className="border border-terciary form-check-input mx-2"
                  type="checkbox"
                  id="flexCheckDefault"
                  {...register("tiene_area_produccion")}
                  // value={ createModel.tiene_area_produccion }
                />
              </div>
            </div>
            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3 form-check">
                <label className="text-terciary" htmlFor="flexCheckDefault">
                  Área de preparacion de sustrato:{" "}
                </label>
                <input
                  className="border border-terciary form-check-input mx-2"
                  type="checkbox"
                  id="flexCheckDefault"
                  {...register("tiene_area_pep_sustrato")}
                  // value={ createModel.tiene_areas_pep_sustrato }
                />
              </div>
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3 form-check">
                <label className="text-terciary" htmlFor="flexCheckDefault">
                  Área de embolsado:
                </label>
                <input
                  className="border border-terciary form-check-input mx-2"
                  type="checkbox"
                  id="flexCheckDefault"
                  {...register("tiene_area_embolsado")}
                  // value={ createModel.tiene_area_embolsado }
                />
              </div>
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Vivero creado por medio de:{" "}
                  <span className="text-danger">*</span>
                </label>

                <Select
                  options={origenRecurso}
                  onChange={changeSelectOrigenRecurso}
                  placeholder="Seleccione"
                  required={true}
                  value={ createModel.origen_recursos_vivero }
                />

                {errors.viveroCreado && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
            </div>

            <Subtitle title="Asignar viverista" mt={3} mb={2} />

            <div className="row ms-1 mt-2">
              <div className="col-12 col-md-3">
                <label className="text-terciary">
                  Tipo de Documento: <span className="text-danger">*</span>{" "}
                </label>
                <Select
                  name="options"
                  // control={control2}
                  // rules={{ required: true }}
                  // render={({ field }) => (

                  //  {...field}
                  // options={opcDoc}
                  placeholder="Seleccionar"
                />
              </div>
              <div className="col-12 col-md-3">
                <label className="ms-2 text-terciary">
                  Numero de identificacion:{" "}
                  <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  {...register("id_viverista")}
                  onChange={handleChange}
                  type="number"
                  placeholder="Numero de identificacion"
                />
              </div>
              <div className="col-12 col-md-3">
                <label className="ms-2 text-terciary">
                  Nombre: <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre de funcionario"
                  disabled={true}
                  {...register("Viverista")}
                />
              </div>
              <div className="col-12 col-md-3 mt-2" style={{ display: "flex" }}>
                <button
                  type="button"
                  className="btn  text-capitalize btn-outline-ligth ms-2 mt-4"
                  title="Buscar profesional Cormacarena"
                >
                  <img src={IconoBuscar} alt="buscar" />
                </button>
                {/* </div>
              <div className="col-6 col-sm-3 mt-2"> */}
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-4 btn-min-width"
                  style={{ width: "300px", height: "45px" }}
                  onClick={handleOpenModalAvanzadaModal}
                >
                  Busqueda avanzada
                </button>
              </div>
            </div>

            <div className="row ms-1 mb-4" style={{ display: "flex" }}>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary fs-bold">
                  Fecha de inicio de viverista:{" "}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-12 col-md-3 mb-3">
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <ReactDatePicker
                      {...field}
                      locale="es"
                      className="form-control border rounded-pill px-3 border border-terciary col-12 col-md-3"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/aaaa"
                      selected={createModel.fecha_inicio_viverista_actual}
                      onSelect={(e) =>
                        setCreateModel({
                          ...createModel,
                          fecha_inicio_viverista_actual: e,
                        })
                      }
                    />
                  )}
                />
              </div>
            </div>

            <div className="row" style={{ justifyContent: "center" }}>

              <div className="col-3" style={{ textAlign: "center" }}>
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-4 btn-min-width"
                >
                  Realizar apertura
                </button>
              </div>
            </div>


            <div
              className="row d-flex align-items-center mx-2 mt-2"
              style={{ justifyContent: "space-between" }}
            >

              <div className="col-12 col-md-3 mb-3">
                {isActivo ? (
                <button className="btn btn-danger text-capitalize border rounded-pill ms-3 mt-4 btn-min-width">
                  Desactivar vivero
                </button>):(
                <div className="row ms-3">
                  <div
                    className="card col-5 col-md-auto"
                    style={{
                      backgroundColor: "#f7d7d8",
                      flexBasis: "content",
                      height: "100px",
                    }}
                  >
                    <div className="mt-3 ms-3">
                      <label style={{ color: "#84454a" }}>
                        {" "}
                        <i
                          className="fa-solid fa-triangle-exclamation me-3"
                          style={{ color: "#c02b1b" }}
                        ></i>
                        Este vivero se encuentra desactivado
                      </label>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>
                        {/* </div>
                         <div className="col-4"> */}
                        <button
                          type="button"
                          className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width"
                        >
                          Reactivar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)}
              </div>
              <div className="col-12 col-md-3 mb-3 mt-5">
                <label className="text-terciary">
                  Anexar Documentación <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  {...register("ruta_archivo_creacion", { required: true })}
                  onChange={(e) => handleUpload(e)}
                  id="formFileMultiple"
                />
              </div>
            </div>
            <div className="row mt-5">
              <div style={{ textAlign: "end" }}>
                <button
                  className="btn border rounded-pill mt-2 px-3 ms-2"
                  type="submit"
                  title="Guardar"
                >
                  <i className="fa-regular fa-floppy-disk fs-3"></i>
                </button>
                <button
                  className="btn border rounded-pill mt-2 px-3 ms-2"
                  title="Limpiar"
                >
                  <i className="fa-solid fa-eraser fs-3"></i>
                </button>
                <button
                  className="btn border rounded-pill mt-2 px-3 ms-2"
                  title="Cancelar"
                >
                  <i className="fa-solid fa-x fs-3"></i>
                </button>

                <button
                  className="btn border rounded-pill mt-2 px-3 ms-2"
                  title="Imprimir"
                >
                  <i className="fa-solid fa-print fs-3"></i>
                </button>
                <button
                  className="btn border rounded-pill mt-2 px-3 ms-2"
                  title="Borrar"
                >
                  <i className="fa-regular fa-trash-can fs-3"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <ConsultasMunicipioModal
          isModalActive={modalPersonal}
          setIsModalActive={setModalPersonal}
          setModel={setCreateModel}
        /> */}
      </div>
    </div>
  );
};

export default AdministrarViveroScreen;
