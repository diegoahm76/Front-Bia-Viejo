import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export const EntradaDeArticuloScreen = () => {
  const [selectedEntrada, setSelectedEntrada] = useState({});
  const opcEntrada = [
    { label: "Compra", value: "Comp" },
    { label: "Convenio", value: "Conv" },
    { label: "Comodato", value: "Como" },
    { label: "Donacion", value: "Dona" },
    { label: "Incautacion", value: "Inca" },
    { label: "Embargo", value: "Emba" },
    { label: "Resarcimiento", value: "Resa" },
    { label: "Compensacion", value: "Compe" },
  ];

  const [selectedDocumento, setSelectedDocumento] = useState({});
  const opcDoc = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "Cedula de extranjeria", value: "CE" },
    { label: "Pasaporte", value: "PP" },
  ];

  const [selectedBodega, setSelectedBodega] = useState({});
  const opcBod = [
    { label: "Villeavicencio / Principal", value: "VP" },
    { label: "Villavicencio / San Antonio", value: "VS" },
    { label: "Macarena / Principal", value: "MP" },
  ];

  const [formValues, setFormValues] = useState({
    fechaIngreso: "",
  });

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    register: regiister2,
    setError: setError2,
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm();

  const {
    register: register3,
    setError: setError3,
    handleSubmit: handleSubmit3,
    control: control3,
    formState: { errors: errors3 },
  } = useForm();

  const submit = (data) => {
    console.log(data);
    setSelectedEntrada({ options: data.options.value });
  };

  const submit2 = (data) => {
    console.log(data);
    setSelectedDocumento({ options: data.options.value });
  };

  const submit3 = (data) => {
    console.log(data);
    setSelectedBodega({ options: data.options.value });
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Entrada de Articulos</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
        >
          <div className="card mt-5">
            <div className="row">
              <label>Datos generales</label>
              <div className="row">
              <div className="col">
                <label>Consecutivo </label>
                <input></input>
              </div>

              <div className="col-6 input-group input-group-dynamic flex-column col-12 col-md-6 mt-4">
                <label htmlFor="exampleFormControlInput1">
                  Fecha de Ingreso: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <ReactDatePicker
                      {...field}
                      locale="es"
                      //required
                      selected={formValues.fechaIngreso}
                      onSelect={(e) =>
                        setFormValues({ ...formValues, fechaIngreso: e })
                      }
                      className="multisteps-form__input form-control p-2"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
              </div>
            </div>
            </div>
            <div className="row">
              <div className="col col-sm-6">
                <label className="form-control ms-0">
                  Origen del articulo:{" "}
                </label>
                <Controller
                  name="options"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={opcEntrada}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.options && (
                  <p className=" form-control ms-0 text-danger">
                    Este campo es obligatorio
                  </p>
                )}
              </div>
              {selectedEntrada.value === "comp" ? (
                <div className="col-12">
                  <label>Numero de factura de compra</label>
                  <input></input>
                </div>
              ) : (
                <div className="col-12">
                  <label>Numero de Expediente</label>
                  <input></input>
                </div>
              )}
            </div>

            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
                Informacion de terceros:
              </label>
              <div className="row">
                <div className="col">
                  <label>Tipo de Documento</label>
                  <Controller
                    name="options"
                    control={control2}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcDoc}
                        placeholder="Seleccionar"
                      />
                    )}
                  />

                  {errors.options && (
                    <p className=" form-control ms-0 text-danger">
                      Este campo es obligatorio
                    </p>
                  )}
                </div>

                <div className="col-12">
                  <label>Numero de documento:</label>
                  <input></input>
                </div>
                <div>
                  <label>Nombre: </label>
                  <label>Profesional de cormacarena</label>
                </div>
              </div>
              <div className="row">
                <label>Busqueda de tercero</label>
                <button>buscar</button>
              </div>
            </div>
            <div className="row">
              <label>Concepto</label>
              <textarea></textarea>
            </div>
            <div className="row">
              <div className="col">
                <label>Bodega</label>
                <Controller
                  name="options"
                  control={control3}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={opcBod}
                      placeholder="Seleccionar"
                    />
                  )}
                />

                {errors.options && (
                  <p className=" form-control ms-0 text-danger">
                    Este campo es obligatorio
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <label>Anexar documentos</label>
              <div>
                          <label for="formFileLg" class="form-label"></label>
                          <input
                            class="form-control form-control-lg mt-6"
                            id="formFileLg"
                            type="file"
                          />
                        </div>
            </div>
            <div className="row">
              <button>Cancelar</button>
              <button>Limpiar</button>
              <button>Continuar</button>
            </div>

            <div className="row">
              <
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
