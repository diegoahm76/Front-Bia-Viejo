import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { userRegisterAction } from "../../../actions/userActions";
import LogBackground from "../../../assets/logos/Macareniaa.jpg";
import GeneradorDeDirecciones from "../../../components/GeneradorDeDirecciones";
import clienteAxios from "../../../config/clienteAxios";
import { formatISO } from "date-fns";

const optionsTipoPersona = [
  { label: "Natural", value: "N" },
  { label: "Jurídica", value: "J" },
];

const optionsTipoDocumento = [{ label: "C.C.", value: "cc" }];

const optionsYorNo = [
  { label: "No", value: false },
  { label: "Si", value: true },
];

const departamentosOptions = [
  { label: "Arauca", value: "05" },
  { label: "Meta", value: "08" },
  { label: "Santander", value: "11" },
  { label: "Norte de Santander", value: "13" },
];

const municipiosOptions = [
  { label: "Arauca", value: "91263" },
  { label: "Villavicencio", value: "91405" },
  { label: "Bucaramanga", value: "91407" },
  { label: "San Jose de Cucuta", value: "91430" },
];

const defaultErrors = {
  confirmacionEmail: false,
  confirmacionCelular: false,
};

const RegisterScreen = () => {
  const [isOpenGenerator, setIsOpenGenerator] = useState(false);
  const [completeAddress, setCompleteAddress] = useState("");
  const [errors, setErrors] = useState(defaultErrors);
  const [yesOrNo, setYesOrNo] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
    tipo_persona: "N",
    tipo_documento: "cc",
  });
  const dispatch = useDispatch();
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors: errorsForm },
  } = useForm();

  const objTest = {
    persona: {
      id_persona: 3,
      tipo_documento: {
        cod_tipo_documento: "cc",
        nombre: "Cedula de ciudadania",
      },
      estado_civil: {
        cod_estado_civil: "1",
        nombre: "Soltero",
      },
      representante_legal: null,
      tipo_persona: "N",
      numero_documento: "1121952532",
      digito_verificacion: null,
      primer_nombre: null,
      segundo_nombre: null,
      primer_apellido: null,
      segundo_apellido: null,
      nombre_comercial: null,
      razon_social: null,
      pais_residencia: "AF",
      departamento_residencia: "05",
      municipio_residencia: "17388",
      direccion_residencia: null,
      direccion_residencia_ref: null,
      ubicacion_georeferenciada: "12",
      direccion_laboral: null,
      direccion_notificaciones: null,
      pais_nacimiento: "AL",
      fecha_nacimiento: null,
      sexo: "I",
      email: "user2@user.com",
      email_empresarial: null,
      telefono_fijo_residencial: null,
      telefono_celular: null,
      telefono_empresa: null,
      cod_municipio_laboral_nal: null,
      cod_municipio_notificacion_nal: null,
      telefono_celular_empresa: null,
      telefono_empresa_2: null,
      cod_pais_nacionalidad_empresa: "AS",
      acepta_notificacion_sms: false,
      acepta_notificacion_email: false,
      acepta_tratamiento_datos: false,
    },
  };

  const submitForm = async (data) => {
    console.log(data);
    if (data.eMail !== data.cEmail || data.celular !== data.cCelular) {
      const dataResponse = {
        ...defaultErrors,
      };

      if (data.eMail !== data.cEmail) {
        dataResponse.confirmacionEmail = true;
      }

      if (data.celular !== data.cCelular) {
        dataResponse.confirmacionCelular = true;
      }

      setErrors({ ...errors, ...dataResponse });
      setTimeout(() => {
        setErrors({ ...errors, ...defaultErrors });
      }, 2000);

      return;
    }

    // Falta hacer confirmación de datos correo

    const persona = {
      tipo_persona: formValues.tipo_persona,
      tipo_documento: data.tipoDocumento.value,
      numero_documento: data.numero_documento,
      razon_social: data.razonSocial || null,
      digito_verificacion: data.dv || null,
      primer_nombre: data.primerNombre,
      segundo_nombre: data.segundoNombre || null,
      primer_apellido: data.primerApellido,
      segundo_apellido: data.segundoApellido || null,
      fecha_nacimiento: formatISO(data.fechaNacimiento, { representation: 'date' }), //! Este dato queda por socializar para ver si es requerido o no y también revisar si el formato YYYYMMDD es el correcto
      ubicacion_georeferenciada: "12", //! Este valor queda pendiente por revisar porque sale obligatorio según el mockup
      pais_residencia: "AG", //! Este campo debería no ser obligatorio según el mockup
      departamento_residencia: "05", //! Este campo debería no ser obligatorio según el mockup
      municipio_residencia: data.municipio?.value || null, //! Tanto municipio como departamento reciben codigos que necesitamos se nos expliquen o nos envien clave/valor
      pais_nacimiento: "AL", //TODO Este campo debería no ser obligatorio según el mockup
      sexo: "I", //! Este campo debería no ser obligatorio según el mockup
      email: data.eMail,
      cod_pais_nacionalidad_empresa: "AS", //! Este campo debería no ser obligatorio según el mockup
      telefono_celular: data.celular,
      nombre_comercial: data.nombreComercial || null,
      acepta_notificacion_sms: true, //! Dato que debe ser obligatorio estar en true, creo mejor que sea por defecto en true en el back
      acepta_notificacion_email: true, //! Dato que debe ser obligatorio estar en true, creo mejor que sea por defecto en true en el back
      acepta_tratamiento_datos: true, //! Dato que debe ser obligatorio estar en true, creo mejor que sea por defecto en true en el back
      direccion_notificaciones: data.direccionNotificacion,
    };

    console.log(persona);

    // const usuario = {
    //   nombre_de_usuario: "Prueba con info quemada",
    //   password: "1234561231j",
    //   activated_at: "2022-10-10",
    //   password2: "1234561231j",
    //   email: "tengosueno@gmail.com",
    //   persona: 6,
    //   id_usuario_creador: null,
    //   tipo_usuario: "E",
    // };

    try {
      const { data } = await clienteAxios.post(
        "personas/registerpersona/",
        persona
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    // dispatch(userRegisterAction(usuario));
  };

  const handleChangeTypePerson = (e) => {
    setFormValues({ ...formValues, tipo_persona: e.value });
    if (e.value === "J") {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  };

  const handleYesOrNo = (e) => {
    if (e.value) {
      setYesOrNo(true);
    } else {
      setYesOrNo(false);
    }
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
                <>
                  <h3 className="mt-3 mb-0 text-center mb-4">
                    Registro de Persona
                  </h3>
                </>
              ) : (
                <h3 className="mt-3 mb-0 text-center mb-4">
                  Registro de empresa
                </h3>
              )}

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
                  <Select
                    options={optionsTipoPersona}
                    defaultValue={optionsTipoPersona[0]}
                    placeholder="Seleccionar"
                    onChange={handleChangeTypePerson}
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
                        defaultValue={optionsTipoDocumento[0]}
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
                        placeholder="Número de documento"
                        {...register("numero_documento", { required: true })}
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
                        placeholder="DV"
                        {...register("dv")}
                      />
                      <label className="ms-2">DV:</label>
                    </div>
                  </div>
                  {errorsForm.numero_documento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 row">
                  <div className="col-12">
                    {isUser && (
                      <div>
                        <label className="form-label">
                          ¿Requiere nombre comercial?
                        </label>
                        <Controller
                          name="yesOrNo"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={handleYesOrNo}
                              options={optionsYorNo}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                    )}
                    {!isUser && (
                      <>
                        <div className="form-floating input-group input-group-dynamic">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Razón social"
                            {...register("razonSocial", { required: true })}
                          />
                          <label className="ms-2">
                            Razón social: <span className="text-danger">*</span>
                          </label>
                        </div>
                        {errorsForm.razonSocial && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </>
                    )}

                    {yesOrNo && (
                      <>
                        <div className="form-floating input-group input-group-dynamic">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Nombre comercial"
                            {...register("nombreComercial", { required: true })}
                          />
                          <label className="ms-2">
                            Nombre comercial:{" "}
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                        {errorsForm.nombreComercial && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {isUser && (
                  <>
                    <div className="col-12 col-md-6">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Primer nombre"
                          {...register("primerNombre", { required: true })}
                        />
                        <label className="ms-2">
                          Primer nombre: <span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    {errorsForm.primerNombre && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
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
                          {...register("primerApellido", { required: true })}
                        />
                        <label className="ms-2">
                          Primer apellido:{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    {errorsForm.primerApellido && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
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
                <div className="input-group input-group-dynamic flex-column col-6 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de nacimiento: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="fechaNacimiento"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
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
                {errorsForm.fechaNacimiento && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
                {/* DATOS DE NOTIFICACION */}
                <h5 className="font-weight-bolder mt-3">
                  Datos de notificación
                </h5>
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="E-mail"
                      {...register("eMail", { required: true })}
                    />
                    <label className="ms-2">
                      E-mail: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {errorsForm.eMail && (
                  <div className="col-12">
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Confirme su e-mail"
                      {...register("cEmail", { required: true })}
                    />
                    <label className="ms-2">
                      Confirme su e-mail: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {errorsForm.cEmail && (
                  <div className="col-12">
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
                {errors.confirmacionEmail && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Los emails no coinciden
                    </small>
                  </div>
                )}
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      placeholder="Celular"
                      type="tel"
                      {...register("celular", { required: true })}
                    />
                    <label className="ms-2">
                      Celular: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {errorsForm.celular && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Confirme su celular"
                      {...register("cCelular", { required: true })}
                    />
                    <label className="ms-2">
                      Confirme su celular:{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {errorsForm.cCelular && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
                {errors.confirmacionCelular && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Los números no coinciden
                    </small>
                  </div>
                )}
                {!isUser && (
                  <>
                    <div className="form-floating input-group input-group-dynamic mt-2">
                      <input
                        className="form-control"
                        readOnly
                        type="text"
                        value={completeAddress}
                        {...register("direccionNotificacion", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Dirección de notificación:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <button
                        type="button"
                        className="btn bg-gradient-primary"
                        onClick={() => setIsOpenGenerator(true)}
                      >
                        Generar
                      </button>
                    </div>
                    {errorsForm.direccionNotificacion && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                    <div className="col-12 col-md-6">
                      <label className="form-label">
                        Departamento: <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="departamento"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={departamentosOptions}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                    {errorsForm.departamento && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
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
                    {errorsForm.municipio && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
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
              <GeneradorDeDirecciones
                isOpenGenerator={isOpenGenerator}
                setIsOpenGenerator={setIsOpenGenerator}
                completeAddress={completeAddress}
                setCompleteAddress={setCompleteAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterScreen;
