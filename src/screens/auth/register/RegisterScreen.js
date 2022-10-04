import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import LogBackground from "../../../assets/logos/Macareniaa.jpg";

const optionsTipoPersona = [
  { label: "Natural", value: "N" },
  { label: "Jurídica", value: "J" },
];

const optionsTipoDocumento = [
  { label: "C.C.", value: "CC" },
  { label: "T.I", value: "TI" },
];

const optionsYorNo = [
  { label: "Si", value: "si" },
  { label: "No", value: "no" },
];

const departamentosOptions = [
  { label: "Arauca", value: "Arauca" },
  { label: "Meta", value: "Meta" },
  { label: "Santander", value: "Santander" },
  { label: "Norte de Santander", value: "Norte de Santander" },
];

const municipiosOptions = [
  { label: "Arauca", value: "Arauca" },
  { label: "Villavicencio", value: "Villavicencio" },
  { label: "Bucaramanga", value: "Bucaramanga" },
  { label: "San Jose de Cucuta", value: "San Jose de Cucuta" },
];

const RegisterScreen = () => {
  const [isUser, setIsUser] = useState(true);
  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundImage: `url(${LogBackground})`,
      }}
    >
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto mt-2 mb-2">
        <div className="row">
          <div className="col-12 col-md-7 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom px-4 pb-2 pb-md-4">
              {isUser ? (
                <h3 className="mt-3 mb-0 text-center mb-6">
                  Registro de usuario
                </h3>
              ) : (
                <h3 className="mt-3 mb-0 text-center mb-6">
                  Registro de empresa
                </h3>
              )}
              <button
                className="btn bg-gradient-primary"
                onClick={() => setIsUser(!isUser)}
              >
                Usuario / Empresa
              </button>
              {isUser ? (
                <h5 className="font-weight-bolder mt-2">Datos personales</h5>
              ) : (
                <h5 className="font-weight-bolder mt-2">Datos de empresa</h5>
              )}
              <form className="row" onSubmit={handleSubmit(submitForm)}>
                <div className="col-12 col-md-6">
                  <label className="form-label">
                    Tipo de persona: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="optionTipoPersona"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsTipoPersona}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
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
                <div className="row col-12">
                  <div className="col-12 d-flex justify-content-between gap-2 align-items-center">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="number"
                        required
                        placeholder="Número de documento"
                        {...register("documento")}
                      />
                      <label className="ms-2">
                        Número de documento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <p className="mt-5">-</p>
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="number"
                        required
                        placeholder="DV"
                        {...register("dv")}
                      />
                      <label className="ms-2">
                        DV: <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 row">
                  <div className="col-12">
                    {isUser && (
                      <div>
                        <label className="form-label">
                          Si/No: <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="yesOrNo"
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={optionsYorNo}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                    )}
                    {!isUser && (
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Razón social"
                          {...register("razonSocial")}
                        />
                        <label className="ms-2">
                          Razón social: <span className="text-danger">*</span>
                        </label>
                      </div>
                    )}
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nombre comercial"
                        {...register("nombreComercial")}
                      />
                      <label className="ms-2">
                        Nombre comercial: <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                </div>
                {isUser && (
                  <>
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
                          Primer apellido:{" "}
                          <span className="text-danger">*</span>
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
                  </>
                )}
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nombre de usuario"
                      {...register("nombreDeUsuario")}
                    />
                    <label className="ms-2">
                      Nombre de usuario: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="input-group input-group-dynamic flex-column col-6 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de nacimiento <span className="text-danger">*</span>
                  </label>
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
                {/* DATOS DE NOTIFICACION */}
                <h5 className="font-weight-bolder mt-3">
                  Datos de notificación
                </h5>
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
                      type="email"
                      placeholder="Confirme su e-mail"
                      {...register("cEmail")}
                    />
                    <label className="ms-2">
                      Confirme su e-mail: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      placeholder="Celular"
                      type="tel"
                      required
                      {...register("cell")}
                    />
                    <label className="ms-2">
                      Celular: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Confirme su celular"
                      {...register("confirmCell")}
                    />
                    <label className="ms-2">
                      Confirme su celular:{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {!isUser && (
                  <>
                    <div className="form-floating input-group input-group-dynamic mt-2">
                      <input
                        className="form-control"
                        type="text"
                        disabled
                        value="Carrera 28 # 15-53"
                        {...register("direccionNotificacion")}
                      />
                      <label className="ms-2">
                        Dirección de notificación:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <button type="button" className="btn bg-gradient-primary">
                        Generar
                      </button>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Departamento:</label>
                      <Controller
                        name="departamento"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={departamentosOptions}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">
                        Municipio: <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="municipio"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={municipiosOptions}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  </>
                )}
                <label className="text-bold mt-3">
                  <span className="text-danger">*</span>Al hacer clic en
                  "Registrarse", aceptas nuestras condiciones, la política de
                  privacidad y política de cookies. Es posible que te enviemos
                  notificaciones por SMS y/o vía correo electrónico.
                </label>
                <button
                  type="submit"
                  className="btn bg-gradient-primary text-capitalize d-block ms-auto col-12 col-md-6"
                >
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterScreen;
