import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { userRegisterAction } from "../../../actions/userActions";
import LogBackground from "../../../assets/logos/Macareniaa.jpg";
import clienteAxios from "../../../config/clienteAxios";

const optionsTipoPersona = [
  { label: "Natural", value: "N" },
  { label: "Jurídica", value: "J" },
];

const optionsTipoDocumento = [
  { label: "C.C.", value: "cc" },
  { label: "T.I", value: "ti" },
];

const optionsYorNo = [
  { label: "No", value: false },
  { label: "Si", value: true },
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
  const dispatch = useDispatch();
  const [yesOrNo, setYesOrNo] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
    tipo_persona: "N",
    tipo_documento: "cc",
  });

  const { register, control, handleSubmit } = useForm();

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

    // Falta hacer confirmación de datos correo

    const persona = {
      tipo_persona: formValues.tipo_persona,
      tipo_documento: data.tipoDocumento.value,
      numero_documento: data.numero_documento,
      digito_verificacion: data.dv || null,
      primer_nombre: data.primerNombre,
      segundo_nombre: data.segundoNombre || null,
      primer_apellido: data.primerApellido,
      segundo_apellido: data.segundoApellido || null,
      ubicacion_georeferenciada: "12", //Este valor queda pendiente por revisar porque sale obligatorio según el mockup
      pais_residencia: "AG", // Este campo debería no ser obligatorio según el mockup
      departamento_residencia: "05", // Este campo debería no ser obligatorio según el mockup
      pais_nacimiento: "AL", // Este campo debería no ser obligatorio según el mockup
      sexo: "I", //Este campo debería no ser obligatorio según el mockup
      email: data.eMail,
      cod_pais_nacionalidad_empresa: "AS", //Este campo debería no ser obligatorio según el mockup
      telefono_celular: data.celular,
      nombre_comercial: data.nombreComercial || null,
    };

    console.log(persona);

    const usuario = {
      nombre_de_usuario: "Prueba con info quemada",
      password: "1234561231j",
      activated_at: "2022-10-10",
      password2: "1234561231j",
      email: "tengosueno@gmail.com",
      persona: 6,
      id_usuario_creador: null,
      tipo_usuario: "E",
    };

    try {
      const { data } = await clienteAxios.post("personas/registerpersona/", persona);
      console.log(data)
    } catch (err) {
      console.log(err)
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
                  <h3 className="mt-3 mb-0 text-center mb-6">
                    Registro de usuario
                  </h3>

                  <h4 className="font-weight-bolder mt-2">
                    Registro de Persona
                  </h4>
                </>
              ) : (
                <h3 className="mt-3 mb-0 text-center mb-6">
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
                        options={optionsTipoDocumento}
                        placeholder="Seleccionar"
                        // onChange={(e) =>
                        //   setFormValues({
                        //     ...formValues,
                        //     tipo_documento: e.value,
                        //   })
                        // }
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
                        {...register("numero_documento")}
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

                    {yesOrNo && (
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          required
                          placeholder="Nombre comercial"
                          {...register("nombreComercial")}
                        />
                        <label className="ms-2">
                          Nombre comercial:{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
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
                    <label className="ms-2">Nombre de usuario:</label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Contraseña"
                      {...register("password")}
                    />
                    <label className="ms-2">Contraseña:</label>
                  </div>
                </div>
                <div className="input-group input-group-dynamic flex-column col-6 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de nacimiento
                  </label>
                  <Controller
                    name="fechaNacimiento"
                    control={control}
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
                      required
                      placeholder="Celular"
                      type="tel"
                      {...register("celular")}
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
