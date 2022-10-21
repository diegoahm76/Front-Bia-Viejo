import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import LogBackground from "../../../assets/logos/Macareniaa.jpg";
import GeneradorDeDirecciones from "../../../components/GeneradorDeDirecciones";
import clienteAxios from "../../../config/clienteAxios";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";

const defaultValues = {
  tipo_persona: "",
  tipoDocumento: "",
  numero_documento: "",
  razonSocial: "",
  dv: "",
  primerNombre: "",
  segundoNombre: "",
  primerApellido: "",
  segundoApellido: "",
  fechaNacimiento: "",
  ubicacion_georeferenciada: "",
  pais_residencia: "",
  departamento: "",
  municipio: "",
  pais_nacimiento: "",
  sexo: "",
  eMail: "",
  cEmail: "",
  cod_pais_nacionalidad_empresa: "",
  celular: "",
  cCelular: "",
  nombreComercial: "",
  acepta_notificacion_sms: true,
  acepta_notificacion_email: true,
  acepta_tratamiento_datos: true,
  direccionNotificacion: "",
};

const optionsYorNo = [
  { label: "No", value: false },
  { label: "Si", value: true },
];

const defaultErrors = {
  confirmacionEmail: false,
  confirmacionCelular: false,
};

const RegisterPersonaScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenGenerator, setIsOpenGenerator] = useState(false);
  const [completeAddress, setCompleteAddress] = useState("");
  const [errors, setErrors] = useState(defaultErrors);
  const [yesOrNo, setYesOrNo] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [tipoPersonaOptions, setTipoPersonaOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
    tipo_persona: { label: "Natural", value: "N" },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: tipoPersonaNoFormat } = await clienteAxios.get(
          "choices/tipo-persona/"
        );
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
        const tipoPersonaFormat = textChoiseAdapter(tipoPersonaNoFormat);

        setTipoDocumentoOptions(documentosFormat);
        setDepartamentosOptions(departamentosFormat);
        setMunicipiosOptions(municipiosFormat);
        setTipoPersonaOptions(tipoPersonaFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors: errorsForm },
  } = useForm();

  const submitForm = async (data) => {
    //* Validación duplicidad de emails y celular
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

    const persona = {};

    //* Ingresado los datos al objeto persona dependiento de si es Natural o Juridica
    if (formValues.tipo_persona.value === "N") {
      persona.tipo_persona = formValues.tipo_persona.value;
      persona.tipo_documento = data.tipoDocumento.value;
      persona.numero_documento = data.numero_documento;
      persona.digito_verificacion = data.dv || null;
      persona.nombre_comercial = data.nombreComercial || null;
      persona.primer_nombre = data.primerNombre;
      persona.segundo_nombre = data.segundoNombre || null;
      persona.primer_apellido = data.primerApellido;
      persona.segundo_apellido = data.segundoApellido || null;
      persona.fecha_nacimiento = formatISO(data.fechaNacimiento, {
        representation: "date",
      });
      persona.email = data.eMail;
      persona.telefono_celular = data.celular;
      persona.ubicacion_georeferenciada = "mi casita";
    } else {
      persona.tipo_persona = formValues.tipo_persona.value;
      persona.tipo_documento = data.tipoDocumento.value;
      persona.numero_documento = data.numero_documento;
      persona.digito_verificacion = data.dv || null;
      persona.razon_social = data.razonSocial;
      persona.email = data.eMail;
      persona.telefono_celular = data.celular;
      persona.direccion_notificaciones = data.direccionNotificacion;
      persona.departamento_residencia = data.departamento?.value;
      persona.municipio_residencia = data.municipio?.value;
      persona.ubicacion_georeferenciada = "mi casita";
    }

    //* Peticion de registro condicional dependiendo de si es natural o juridica
    setLoading(true);
    if (formValues.tipo_persona.value === "N") {
      try {
        const { data: dataRegisterPersona } = await clienteAxios.post(
          "personas/persona-natural/create/",
          persona
        );
        Swal.fire({
          title: "Registrado como persona natural",
          text: "¿Desea registrarse como usuario?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/registeruser");
          } else {
            resetValues();
          }
        });

        //* Manejo de errores por datos repetidos en la DB (email y numero documento)
      } catch (err) {
        if (err.response?.data?.email && err.response?.data?.numero_documento) {
          Swal.fire({
            title: "Este documento y correo ya estan relacionados",
            text: "¿Desea registrarse como usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3BA9E0",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Si",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/registeruser");
            }
          });
        } else if (err.response?.data?.numero_documento) {
          Swal.fire({
            title: "Este documento ya existe",
            text: "¿Desea registrarse como usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3BA9E0",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Si",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/registeruser");
            }
          });
        } else if (err.response?.data?.email) {
          Swal.fire({
            title: "Este correo electronico ya existe",
            text: "Verifica tus datos",
            icon: "info",
            confirmButtonColor: "#3BA9E0",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Aceptar",
          });
        } else {
          console.log(err);
        }
      }
      setLoading(false);
    } else {
      try {
        console.log(persona);
        const { data: dataRegisterPersona } = await clienteAxios.post(
          "personas/persona-juridica/create/",
          persona
        );

        Swal.fire({
          title: "Registrado como persona juridica",
          text: "¿Desea registrarse como usuario?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/registeruser");
          } else {
            resetValues();
          }
        });
      } catch (err) {
        if (err.response?.data?.email && err.response?.data?.numero_documento) {
          Swal.fire({
            title: "Este documento y correo ya estan relacionados",
            text: "¿Desea registrarse como usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3BA9E0",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Si",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/registeruser");
            }
          });
        } else if (err.response?.data?.numero_documento) {
          Swal.fire({
            title: "Este documento ya existe",
            text: "¿Desea registrarse como usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3BA9E0",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Si",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/registeruser");
            }
          });
        } else if (err.response?.data?.email) {
          Swal.fire({
            title: "Este correo electronico ya existe",
            text: "Verifica tus datos",
            icon: "info",
            confirmButtonColor: "#3BA9E0",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Aceptar",
          });
        } else {
          console.log(err);
        }
      }
      setLoading(false);
    }
  };

  const resetValues = () => {
    reset(defaultValues);
    setCompleteAddress("");
  };

  const handleChangeTypePerson = (e) => {
    resetValues();
    setFormValues({ ...formValues, tipo_persona: e });
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
      <div className="container my-auto">
        <div className="row my-4">
          <div className="col-12 col-md-8 mx-auto">
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
                    options={tipoPersonaOptions}
                    defaultValue={formValues.tipo_persona}
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
                        // defaultValue={tipoDocumentoOptions[0]}
                        options={tipoDocumentoOptions}
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
                      {errorsForm.primerNombre && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
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
                          {...register("primerApellido", { required: true })}
                        />
                        <label className="ms-2">
                          Primer apellido:{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      {errorsForm.primerApellido && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
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
                {isUser && (
                  <div className="input-group input-group-dynamic flex-column col-6 mt-4">
                    <label htmlFor="exampleFormControlInput1">
                      Fecha de nacimiento:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="fechaNacimiento"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          showYearDropdown
                          peekNextMonth
                          showMonthDropdown
                          dropdownMode="select"
                          scrollableYearDropdown
                          autoComplete="off"
                          selected={formValues.fechaNacimiento}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaNacimiento: e })
                          }
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                    {errorsForm.fechaNacimiento && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
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
                  {errorsForm.eMail && (
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
                </div>

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
                </div>
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
                  {errorsForm.celular && (
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
                </div>

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
                </div>
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
                        className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
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
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Cargando...
                    </>
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </form>
              <GeneradorDeDirecciones
                keyReset="direccionNotificacion"
                reset={reset}
                totalValuesForm={watch()}
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
export default RegisterPersonaScreen;
