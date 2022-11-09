import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import clienteAxios from "../../../config/clienteAxios";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import Subtitle from "../../../components/Subtitle";
import DirecionResidenciaModal from "../../../components/DirecionResidenciaModal";

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
  // departamento: "",
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
  const [paisesOptions, setPaisesOptions] = useState([]);
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
        const { data: paisesNoFormat } = await clienteAxios.get(
          "choices/paises/"
        );
        const { data: departamentosNoFormat } = await clienteAxios.get(
          "choices/departamentos/"
        );
        const { data: municipiosNoFormat } = await clienteAxios.get(
          "choices/municipios/"
        );

        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);
        const tipoPersonaFormat = textChoiseAdapter(tipoPersonaNoFormat);

        setTipoDocumentoOptions(documentosFormat);
        setDepartamentosOptions(departamentosFormat);
        setPaisesOptions(paisesFormat);
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
      persona.telefono_celular = "57" + data.celular;
      persona.ubicacion_georeferenciada = "mi casita";
    } else {
      persona.tipo_persona = formValues.tipo_persona.value;
      persona.tipo_documento = data.tipoDocumento.value;
      persona.numero_documento = data.numero_documento;
      persona.digito_verificacion = data.dv || null;
      persona.razon_social = data.razonSocial;
      persona.email = data.eMail;
      persona.telefono_celular_empresa = "57" + data.celular;
      persona.direccion_notificaciones = data.direccionNotificacion;
      // persona.departamento_residencia = data.departamento?.value;
      persona.cod_municipio_notificacion_nal = data.municipio?.value;
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
        console.log(err);
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
        } else if (err.response?.data?.non_field_errors) {
          //Cambiaron los errores ahora vienen en este formato
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
          console.log(err);
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
        const { data: dataRegisterEmpresa } = await clienteAxios.post(
          "personas/persona-juridica/create/",
          persona
        );

        console.log(dataRegisterEmpresa);

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
        } else if (err.response?.data?.non_field_errors) {
          Swal.fire({
            title: "Este documento ya esta relacionado",
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
      setYesOrNo(true);
    } else {
      setIsUser(true);
      setYesOrNo(false);
    }
  };

  const handleYesOrNo = (e) => {
    if (e.target.checked) {
      setYesOrNo(true);
    } else {
      setYesOrNo(false);
    }
  };

  return (
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundColor: "rgb(4,47,74)",
      }}
    >
      <div className="container my-auto">
        <div className="row my-4">
          <div className="col-12 col-md-8 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom px-4 pb-2 pb-md-4">
              {isUser ? (
                <>
                  <h3 className="mt-3 ms-3 mb-2 fw-light text-terciary">
                    Registro de Persona
                  </h3>
                </>
              ) : (
                <h3 className="mt-3 ms-3 mb-2 fw-light text-terciary">
                  Registro de empresa
                </h3>
              )}

              {isUser ? (
                <Subtitle title={"Datos personales"} mt={2} mb={0} />
              ) : (
                <Subtitle title={"Datos de empresa"} mt={2} mb={0} />
              )}
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="row mx-1">
                  <div className="col-12 col-md-6 mt-3">
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
                  <div className="col-12 col-md-6 mt-3">
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

                  {isUser && (
                    <div className="col-12 mt-4 mt-md-5 d-flex justify-content-center">
                      <div className="form-check">
                        <label
                          className="form-check-label text-terciary me-2"
                          htmlFor="flexCheckDefault"
                        >
                          ¿Requiere nombre comercial?
                        </label>
                        <input
                          name="yesOrNo"
                          className="border border-terciary form-check-input mx-2"
                          type="checkbox"
                          onClick={handleYesOrNo}
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-md-6 col-12 mt-3">
                    <div>
                      <label className="ms-2">
                        Número de documento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="number"
                        {...register("numero_documento", {
                          required: true,
                        })}
                      />
                    </div>
                    {errorsForm.numero_documento && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  {yesOrNo && (
                    <>
                      <div className="col-md-6 col-12 ">
                        <div className="mt-3">
                          <label className="ms-2">Digito verificación:</label>
                          <input
                            className="border border-terciary hola form-control border rounded-pill px-3"
                            type="number"
                            max="9"
                            min="0"
                            maxLength="1"
                            {...register("dv", {
                              maxLength: 1,
                            })}
                          />
                        </div>
                        {errorsForm.dv && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo admite solo un carácter
                            </small>
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 col-12 ">
                        <div className="mt-3">
                          <label className="ms-2">
                            Nombre comercial:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            type="text"
                            {...register("nombreComercial", {
                              required: true,
                            })}
                          />
                        </div>
                        {errorsForm.nombreComercial && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {!isUser && (
                    <div className="col-md-6 col-12 ">
                      <div className="mt-3">
                        <label className="ms-2">
                          Razón social: <span className="text-danger">*</span>
                        </label>
                        <input
                          className="border border-terciary form-control border rounded-pill px-3"
                          type="text"
                          {...register("razonSocial", {
                            required: true,
                          })}
                        />
                      </div>
                      {errorsForm.razonSocial && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                  )}

                  {isUser && (
                    <>
                      <div className="col-12 col-md-6">
                        <div className="mt-3">
                          <label className="ms-2">
                            Primer nombre:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            type="text"
                            {...register("primerNombre", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="mt-3">
                          <label className="ms-2">Segundo nombre:</label>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            type="text"
                            {...register("segundoNombre")}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="mt-3">
                          <label className="ms-2">
                            Primer apellido:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            type="text"
                            {...register("primerApellido", { required: true })}
                          />
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
                        <div className="mt-3">
                          <label className="ms-2">Segundo apellido:</label>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            type="text"
                            {...register("segundoApellido")}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {isUser && (
                    <div className="flex-column col-12 col-md-6 mt-3">
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
                            className="border border-terciary form-control border rounded-pill px-3"
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
                </div>
                {/* DATOS DE NOTIFICACION */}
                <Subtitle title={"Datos de notificación"} mt={4} mb={0} />

                <div className="row mx-1">
                  <div className="col-12 col-md-6">
                    <div className="mt-3">
                      <label className="ms-2">
                        E-mail: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="email"
                        {...register("eMail", { required: true })}
                      />
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
                    <div className="mt-3">
                      <label className="ms-2">
                        Confirme su e-mail:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="email"
                        {...register("cEmail", { required: true })}
                      />
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
                    <div className="mt-3">
                      <label className="ms-2">
                        Celular: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="tel"
                        {...register("celular", { required: true })}
                      />
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
                    <div className="mt-3">
                      <label className="ms-2">
                        Confirme su celular:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="tel"
                        {...register("cCelular", { required: true })}
                      />
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
                      <div className="mt-3 col-md-10 col-12">
                        <div className="mt-3 d-flex align-items-end">
                          <div className="col-12">
                            <label className="text-terciary">
                              Dirección de notificación:{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control rounded-pill px-3 border border-terciary"
                              readOnly
                              disabled
                              type="text"
                              value={completeAddress}
                              {...register("direccionNotificacion", {
                                required: true,
                              })}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                            onClick={() => {
                              setIsOpenGenerator(true)
                              console.log(watch())
                            }}
                          >
                            Generar
                          </button>
                        </div>
                      </div>
                      {errorsForm.direccionNotificacion && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                      {/* <div className="col-12 col-md-6">
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
                    )} */}
                      <div className="col-12 col-md-6 mt-3">
                        <label className="form-label">
                          Pais: <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="pais"
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={paisesOptions}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                      <div className="col-12 col-md-6 mt-3">
                        <label className="form-label">
                          Departamento: <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="departamento"
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={departamentosOptions}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                      <div className="col-12 col-md-6 mt-3">
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
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      type="submit"
                      className="btn bg-gradient-primary text-capitalize"
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
                  </div>
                </div>
              </form>
              {/* <GeneradorDeDirecciones
                keyReset="direccionNotificacion"
                reset={reset}
                totalValuesForm={watch()}
                isOpenGenerator={isOpenGenerator}
                setIsOpenGenerator={setIsOpenGenerator}
                completeAddress={completeAddress}
                setCompleteAddress={setCompleteAddress}
              /> */}

              <DirecionResidenciaModal
                isModalActive={isOpenGenerator}
                setIsModalActive={setIsOpenGenerator}
                completeAddress={completeAddress}
                setCompleteAddress={setCompleteAddress}
                reset={reset}
                keyReset="direccionNotificacion"
                watch={watch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPersonaScreen;
