import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import { Navigate, useNavigate } from "react-router-dom";

import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import clienteAxios from "../../../config/clienteAxios";
import { crearNuevaBodegaAction } from "../../../actions/bodegaActions";
import { useDispatch } from "react-redux";
import BusquedaAvanzadaModal from "../../../components/BusquedaAvanzadaModal";
import AdministradorBodegasScreen from "./AdministradorBodegasScreen";
import { crearBodega } from "../../../store/slices/bodega/indexBodega";
import { IGeneric } from "../../../Interfaces/Generic";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { IBodegaCreate } from "../../../Interfaces/Bodegas";

const busquedaAvanzadaModel = {
  tipoDocumento: { value: "", label: "" },
  cedula: "",
  nombreCompleto: "",
  idResponsable: 0
}

const CreacionBodegaScreen = () => {
  const initialOptions: IGeneric[] = [{
    label: "",
    value: ""
  }]
  const [departamentosOptions, setDepartamentosOptions] = useState(initialOptions);
  const [municipiosOptions, setMunicipiosOptions] = useState(initialOptions);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState(initialOptions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [busquedaAvanzadaIsOpen, setBusquedaAvanzadaIsOpen] = useState(false);
  const [busquedaModel, setBusquedaModel] = useState(busquedaAvanzadaModel);

  const {
    reset: resetBuscar,
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const {
    reset: resetBodega,
    register: registerBodega,
    handleSubmit: handleSubmitBodega,
    control: controlBodega,
    formState: { errors: errorsBodega },
  } = useForm();


  const submitBodega = (data) => {
    const idPersona = busquedaModel.idResponsable;
    const bodegaCreate: IBodegaCreate = {
      nombre: data.nombre,
      cod_municipio: data.cod_municipio.value,
      id_responsable: idPersona,
      es_principal: data.es_principal,
      direccion: data.direccion
    };
    crearBodega(dispatch, bodegaCreate);
  };

  const AdministradorBodegas = () => {
    navigate("/dashboard/almacen/configuracion/administrador-bodegas")
  }

  useEffect(() => {
    getSelectsOptions();
  }, []);

  const getSelectsOptions = async () => {
    try {
      const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
        "choices/tipo-documento/"
      );
      const { data: departamentosNoFormat } = await clienteAxios.get(
        "choices/departamentos/"
      );
      const { data: municipiosNoFormat } = await clienteAxios.get(
        "choices/municipios/"
      );
      const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
      const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
      const municipiosFormat = textChoiseAdapter(municipiosNoFormat);
      setTipoDocumentoOptions(documentosFormat);
      setDepartamentosOptions(departamentosFormat);
      setMunicipiosOptions(municipiosFormat);
    } catch (err) {
      console.log(err);
    }
  };

  const changeInput = (e) => {
    const { name, value } = e.target;
  }

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmitBuscar(submitBodega)}
          id="configForm"
        >
          <div className="row">
            <h3 className="text-rigth  fw-light mt-4 mb-2">
              {" "}
              Creación de bodegas
            </h3>
            <Subtitle title={"Datos del responsable"} mb={3} />
            <div className="col-12 col-md-3">
              <label className="ms-3 text-terciary">Tipo de Documento</label>
              <Controller
                name="tipoDocumento"
                control={controlBuscar}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled
                    options={tipoDocumentoOptions}
                    placeholder="Seleccionar"
                    value={busquedaModel.tipoDocumento}
                  />
                )}
              />
              {errorsBuscar.tipoDocumento && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="col-12 col-md-3">
              <div>
                <label className="ms-2 text-terciary">Número de cedula</label>
                <input
                  className="border border-terciary form-control border rounded-pill px-3"
                  type="text"
                  placeholder="Numero de cedula"
                  disabled={true}
                  value={busquedaModel.cedula}
                />
              </div>
              {errorsBuscar.numeroDocumento && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="col-12 col-md-3">
              <div>
                <label className="ms-2 text-terciary">Nombre completo</label>
                <input
                  className="form-control border border-terciary border rounded-pill px-3"
                  type="text"
                  placeholder="nombre completo"
                  value={busquedaModel.nombreCompleto}
                  onChange={changeInput}
                  disabled
                />
              </div>
            </div>
            <div className="col-12 col-md-3 mt-2">
              <div className="d-grid gap-2 d-flex">
                <button
                  className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                  type="button"
                  onClick={() => setBusquedaAvanzadaIsOpen(true)}
                >
                  Busqueda Avanzada
                </button>
              </div>
            </div>
            <BusquedaAvanzadaModal
              isModalActive={busquedaAvanzadaIsOpen}
              setIsModalActive={setBusquedaAvanzadaIsOpen}
              reset={resetBuscar}
              setModel={setBusquedaModel}
              tipoDocumentoOptions={tipoDocumentoOptions}
            />
          </div>
        </form>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmitBodega(submitBodega)}
          id="configForm"
        >
          <div className="row">
            <Subtitle title="Información de la bodega" mb={3} />
            <div className="col-12 col-sm-3 mt-2">
              <div>
                <label className="ms-3 text-terciary">Nombre de bodega</label>
                <input
                  className="form-control border border-terciary rounded-pill px-3"
                  type="text"
                  placeholder="nombre"
                  {...registerBodega("nombre", { required: true })}
                />
              </div>
            </div>

            <div className="col-12 col-md-3 mt-2">
              <div className=" input-group input-group-dynamic">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  {" "}
                  Departamento <span className="text-danger">*</span>{" "}
                </label>
                <Controller
                  name="departamento"
                  control={controlBodega}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="col-12 mt-2"
                      options={departamentosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>

            <div className="col-12 col-md-3 mt-2">
              <div className=" input-group input-group-dynamic">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  {" "}
                  Municipio: <span className="text-danger">*</span>{" "}
                </label>
                <Controller
                  name="cod_municipio"
                  control={controlBodega}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="col-12 mt-2"
                      options={municipiosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-12 col-sm-3 mt-2">
              <div>
                <label className="ms-3 text-terciary">
                  Dirección de bodega
                </label>
                <input

                  className="form-control border border-terciary rounded-pill px-3"
                  type="text"
                  placeholder="dirección"
                  {...registerBodega("direccion", { required: true })}
                />
              </div>
            </div>
            <div className="form-check mt-4">
              <label
                className="form-check-label text-terciary me-2"
                htmlFor="flexCheckDefault"
              >
                ¿La bodega es principal?
              </label>
              <input
                className="border border-terciary form-check-input mx-2"
                type="checkbox"
                id="flexCheckDefault"
                {...registerBodega("es_principal")}
              />
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button
                type="submit"
                className="btn btn-secondary mx-2 p-2 w-7 text-capitalize"
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-2 text-capitalize"
                onClick={() => AdministradorBodegas()}

              >
                Administrador
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreacionBodegaScreen;
