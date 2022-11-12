import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import { Navigate, useNavigate } from "react-router-dom";

import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import clienteAxios from "../../../config/clienteAxios";
import { crearNuevaBodegaAction, editarBodegaAction } from "../../../actions/bodegaActions";
import { useDispatch } from "react-redux";
import BusquedaAvanzadaModal from "../../../components/BusquedaAvanzadaModal";
import AdministradorBodegasScreen from "../configuracion/AdministradorBodegasScreen";

const EditarBodegaScreen = () => {
    const [busquedaAvanzadaIsOpen, setBusquedaAvanzadaIsOpen] = useState(false);
    const [formValuesSearch, setFormValuesSearch] = useState({
      index_tipo_documento: "",
      id_persona: "",
    });
  
    console.log("form", formValuesSearch);
  
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
  
    const [departamentosOptions, setDepartamentosOptions] = useState([]);
    const [municipiosOptions, setMunicipiosOptions] = useState([]);
    const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
    const [es_principal, setEs_principal] = useState(false);
  
    const dispatch = useDispatch();
    //cuando el usuario hace submit
  
    const submitEditarBodega = (data) => {
      //console.log("data", data);
  
      const idPersona = data.id.responsable.personas.id_persona;
  
      const bodegaEditar = {
        ...data,
        cod_municipio: data.cod_municipio.value,
        id_responsable: idPersona,
        es_principal: false,
      };
      console.log(bodegaEditar);
  
      //console.log("bodega", bodegaCreate);
      dispatch(editarBodegaAction(bodegaEditar));
      // const datosBodega = {
      //   nombre: data.nombre,
      //   cod_municipio: data.municipio,
      //   direccion: data.direccion,
      //   es_principal: data.yesOrNo,
      //   id_responsable: data.numeroCedula,
      // };
  
      // dispatch(crearNuevaBodegaAction(datosBodega));
      // setVariables({
      //   ...variables,
      //   nombreBodega: data.nombre,
      //   departamento: data.departamento.value,
      //   municipio: data.municipio.value,
      //   direccion: data.direccion,
      //   tipoDocumento: data.tipoDocumento,
      //   numeroCedula: data.numeroCedula,
      // });
    };
     const navigate=useNavigate();
     const Regresar =()=>{
      navigate("/dashboard/almacen/configuracion/creacionbodega")
     }
  
    useEffect(() => {
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
      getSelectsOptions();
    }, []);
  
    return (
      <div className="row min-vh-100">
        <div className="col-lg-12 col-md-10 col-12 mx-auto">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmitBuscar(submitEditarBodega)}
            id="configForm"
          >
            <div className="row">
              <h3 className="text-rigth  fw-light mt-4 mb-2">
                {" "}
                Editar bodega
              </h3>
              <Subtitle title={"Datos del responsable"} mb="3" />
              <div className="col-12 col-md-3">
                <label className="ms-3 text-terciary">Tipo de Documento</label>
                <Controller
                  name="tipoDocumento"
                  control={controlBuscar}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={
                        tipoDocumentoOptions[
                          formValuesSearch.index_tipo_documento
                        ]
                      }
                      isDisabled
                      options={tipoDocumentoOptions}
                      placeholder="Seleccionar"
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
                    disabled
                    {...registerBuscar("numeroDocumento", {
                      required: true,
                    })}
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
                    disabled
                    {...registerBuscar("nombreCompleto", {
                      required: true,
                    })}
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
                formValues={formValuesSearch}
                setFormValues={setFormValuesSearch}
                reset={resetBuscar}
                tipoDocumentoOptions={tipoDocumentoOptions}
              />
            </div>
          </form>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmitBodega(submitEditarBodega)}
            id="configForm"
          >
            <div className="row">
              <Subtitle title="Información de la bodega" mb="3" />
              <div className="col-12 col-sm-3 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Nombre de bodega</label>
                  <input
                    name="nombre"
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
                    name="direccion"
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
                  name="es_principal"
                  className="border border-terciary form-check-input mx-2"
                  type="checkbox"
                  id="flexCheckDefault"
                  {...registerBodega("es_principal", { required: true })}
                />
              </div>
  
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="submit"
                  className="btn btn-secondary mx-2 p-2 w-7 text-capitalize"
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2 text-capitalize"
                  onClick={()=>Regresar()}
                  
                >
                  Descartar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
export default EditarBodegaScreen