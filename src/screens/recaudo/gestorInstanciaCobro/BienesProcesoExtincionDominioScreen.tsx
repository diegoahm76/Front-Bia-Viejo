import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import { useState } from "react";
import clienteAxios from "../../../config/clienteAxios";
import Select from "react-select";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import IconoBuscar from "../../../assets/iconosBotones/buscar.svg";

const BienesProcesoExtincionDominioScreen = () => {
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [formValuesSearch, setFormValuesSearch] = useState({
    index_tipo_documento: "",
    id_persona: "",
  });

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );
        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
        setTipoDocumentoOptions(documentosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const {
    reset,
    register: registerBuscar,
    handleSubmit,
    control: controlBuscar,
    formState: { errors: errorsBuscar },
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
              Extinción de dominio
            </h3>

            <Subtitle title={"Parámetros de búsqueda"} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-3 text-terciary">Tipo de documento
                <samp className="text-danger">*</samp>
                </label>
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

              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Número de cédula
                  <samp className="text-danger">*</samp>
                  </label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    maxLength={15}
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

              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre completo</label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre completo"
                    disabled
                    {...registerBuscar("nombreCompleto", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-1 ">
                <button
                  className="btn btn-sm btn-tablas  mt-5"
                  type="button"
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
              <div className="col-12 col-lg-1 ">
                <div className="d-grid gap-2 mt-4 mx-2">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="button"
                  >
                    Búsqueda 
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BienesProcesoExtincionDominioScreen;
