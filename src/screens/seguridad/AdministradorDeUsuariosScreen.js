import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const optionsTipoDocumento = [
  { label: "C.C", value: "CC" },
  { label: "T.I", value: "TI" },
];

const AdministradorDeUsuariosScreen = () => {
  const { register, handleSubmit, control } = useForm();

  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
  });

  const submit = (data) => {
    console.log(data);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Administrador de usuarios
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <h5 className="font-weight-bolder">Buscar usuario</h5>
          {/* Primera configuracion select */}
          <div className="mt-4 row">
            <div className="col-12 col-md-6">
              <label className="form-label">
                Tipo de documento: <span className="text-danger">*</span>
              </label>
              <Controller
                name="tipoDocumento"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsTipoDocumento}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
          </div>
          <div className="row col-12 justify-content-center align-items-center">
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  required
                  placeholder="Primer nombre"
                  {...register("primerNombre")}
                />
                <label className="ms-2">
                  Número de documento: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <button className="btn bg-gradient-primary mb-0 text-capitalize">
                Buscar
              </button>
              <button className="ms-3 btn bg-gradient-primary mb-0 text-capitalize">
                Busqueda avanzada
              </button>
            </div>
          </div>
          {/* Segunda configuracion select */}
          <h5 className="font-weight-bolder mt-4">Datos personales</h5>
          <hr className="dark horizontal my-0" />
          <div className="mt-4 row">
            <div className="row col-12 justify-content-center align-items-center">
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Tipo de documento: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="tipoDocumento"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsTipoDocumento}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic ms-2">
                  <input
                    className="form-control"
                    type="text"
                    required
                    placeholder="Primer nombre"
                    {...register("primerNombre")}
                  />
                  <label className="ms-2">
                    Número de documento: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  required
                  placeholder="Primer nombre"
                  {...register("primerNombre")}
                />
                <label className="ms-2">
                  Primer nombre: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Segundo nombre"
                  {...register("segundoNombre")}
                />
                <label className="ms-2">Segundo nombre:</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  placeholder="Primer apellido"
                  type="text"
                  required
                  {...register("primerApellido")}
                />
                <label className="ms-2">
                  Primer apellido: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Segundo apellido"
                  {...register("segundoApellido")}
                />
                <label className="ms-2">Segundo apellido:</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="email"
                  required
                  placeholder="E-mail"
                  {...register("eMail")}
                />
                <label className="ms-2">
                  E-mail: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Celular"
                  {...register("celular")}
                />
                <label className="ms-2">
                  Celular: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="input-group input-group-dynamic flex-column col-6 mt-4">
              <label htmlFor="exampleFormControlInput1">
                Fecha de nacimiento <span className="text-danger">*</span>
              </label>
              {/* Uso DatePicker */}
              <Controller
                name="fechaNacimiento"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    locale="es"
                    required
                    selected={formValues.fechaNacimiento}
                    onSelect={(e) =>
                      setFormValues({ ...formValues, fechaNacimiento: e })
                    }
                    className="multisteps-form__input form-control p-2"
                    placeholderText="dd/mm/aaaa"
                  />
                )}
              />
            </div>
          </div>
          {/* Tercera configuracion select */}
          <h5 className="font-weight-bolder mt-4">Datos de contacto</h5>
          <hr className="dark horizontal my-0" />
          <div className="mt-4 row">
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  required
                  placeholder="Primer nombre"
                  {...register("primerNombre")}
                />
                <label className="ms-2">
                  Email principal: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Segundo nombre"
                  {...register("segundoNombre")}
                />
                <label className="ms-2">Email laboral:</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  placeholder="Primer apellido"
                  type="text"
                  required
                  {...register("primerApellido")}
                />
                <label className="ms-2">
                  Direccion notificacion: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Segundo apellido"
                  {...register("segundoApellido")}
                />
                <label className="ms-2">Ubicacion geografica:</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="email"
                  required
                  placeholder="E-mail"
                  {...register("eMail")}
                />
                <label className="ms-2">
                  Telefono fijo: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Celular"
                  {...register("celular")}
                />
                <label className="ms-2">
                  Telefono laboral: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="d-flex justify-content-end gap-4 mt-4">
            <button
              className="btn bg-gradient-danger mb-0"
              type="button"
              title="Send"
            >
              Cancelar
            </button>
            <button
              className="btn bg-gradient-primary mb-0"
              type="submit"
              title="Send"
              form="configForm"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdministradorDeUsuariosScreen;
