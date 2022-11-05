import { useEffect } from "react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import Subtitle from "../../../components/Subtitle";
import clienteAxios from "../../../config/clienteAxios";
import { formatISO } from "date-fns";

const DesbloqueoUsuarioScreen = () => {
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //   {
  //     "nombre_de_usuario": "ruben",
  //     "tipo_documento": "NU",
  //     "numero_documento": "1006856900",
  //     "telefono_celular": "573144198170",
  //     "email": "rubenhernandoprietosolano@gmail.com",
  //     "fecha_nacimiento": "2000-09-05",
  //     "redirect_url": "https://www.google.com"
  //   }

  const onSubmit = async (data) => {
    data.redirect_url = "https://www.google.com";
    data.fecha_nacimiento = formatISO(formValues.fechaNacimiento, {
      representation: "date",
    });
    data.tipo_documento = data.tipo_documento.value;
    console.log(data);

    try {
      const { data: dataResponse } = await clienteAxios.post(
        "users/unblock/",
        data
      );
      console.log(dataResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
        "choices/tipo-documento/"
      );
      const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
      setTipoDocumentoOptions(documentosFormat);
    };
    getData();
  }, []);

  return (
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundColor: "rgb(4,47,74)",
      }}
    >
      <div className="container my-auto">
        <div className="row">
          <div className="card z-index-0 fadeIn3 fadeInBottom col-lg-6 col-md-8 col-12 mx-auto">
            <form
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit(onSubmit)}
              id="configForm"
            >
              <form
                className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                data-animation="FadeIn"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h3 className="text-rigth  fw-light mb-3 mb-2">
                  Desbloqueo de usuario
                </h3>
                <div className="row">
                  <Subtitle title="Información requerida" mb="2" />
                  <div className="col-12 ">
                    <div>
                      <label className="ms-3 text-terciary">
                        Nombre de usuario:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border  border-terciary rounded-pill px-3"
                        type="text"
                        {...register("nombre_de_usuario", { required: true })}
                      />
                      {errors.nombre_de_usuario && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">
                      Tipo de documento: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="tipo_documento"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={tipoDocumentoOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.tipo_documento && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 ">
                    <div>
                      <label className="ms-3 mt-2 text-terciary">
                        Número de documento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border-terciary border rounded-pill px-3"
                        type="text"
                        {...register("numero_documento", { required: true })}
                      />
                      {errors.numero_documento && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div>
                      <label className="ms-3 mt-2 text-terciary">
                        Número de celular:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border-terciary border rounded-pill px-3"
                        type="text"
                        {...register("telefono_celular", { required: true })}
                      />
                      {errors.telefono_celular && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div>
                      <label className="ms-3 mt-2 text-terciary">
                        Correo electrónico:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border-terciary border rounded-pill px-3"
                        type="text"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div>
                      <label className="mt-2 ms-3 text-terciary">
                        Fecha de nacimiento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="fecha_nacimiento"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <ReactDatePicker
                            {...field}
                            locale="es"
                            showYearDropdown
                            peekNextMonth
                            showMonthDropdown
                            scrollableYearDropdown
                            dropdownMode="select"
                            autoComplete="off"
                            dateFormat="dd/MM/yyyy"
                            selected={formValues.fechaNacimiento}
                            onSelect={(e) =>
                              setFormValues({
                                ...formValues,
                                fechaNacimiento: e,
                              })
                            }
                            className="form-control  border-terciary border rounded-pill px-3 "
                            placeholderText="dd/mm/aaaa"
                          />
                        )}
                      />
                      {errors.fecha_nacimiento && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="d-grid gap-2 d-flex justify-content-end">
                      <button
                        className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                        type="submit"
                        title="Send"
                        form="configForm"
                      >
                        Desbloquear
                      </button>
                      <Link className="text-white" to="/login">
                        <button
                          className="btn btn-light text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                          type="submit"
                          title="Send"
                          form="configForm"
                        >
                          Cancelar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesbloqueoUsuarioScreen;
