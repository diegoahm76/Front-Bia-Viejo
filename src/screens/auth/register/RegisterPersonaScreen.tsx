import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import clienteAxios from "../../../config/clienteAxios";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import Subtitle from "../../../components/Subtitle";
import DirecionResidenciaModal from "../../../components/DirecionResidenciaModal";
import botonCancelar from "../../../assets/iconosBotones/cancelar.svg";
import botonRegistrarse from "../../../assets/iconosBotones/agregar.svg";

//interfaces
import {
  IAuth,
  IDatosNotificacion,
  IDefaultValues,
  IFormValues,
  IList,
  IObjectSend,
  IPerson,
} from "../../../Interfaces/auth";
import { AxiosError } from "axios";
import { setDatesFormat, setDatesFormatRevere } from "../../../utils";

const defaultValues = {
  tipoDocumentoLegal: { label: "", value: "" },
  numero_documento_legal: "",
  paisNotificacion: { label: "", value: "" },
  departamentoNotificacion: { label: "", value: "" },
  fechaNacimiento: null,
  tipo_persona: { label: "Natural", value: "N" },
  tipo_documento: "",
  numero_documento: "",
  razon_social: "",
  dv: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  fechaInput: "",
  fecha_nacimiento: "",
  ubicacion_georeferenciada: "mi casita",
  pais_residencia: "",
  municipio: "",
  pais_nacimiento: "",
  sexo: "",
  email: "",
  cEmail: "",
  cod_pais_nacionalidad_empresa: "",
  telefono_celular: "",
  cCelular: "",
  celular: "",
  nombre_comercial: "",
  acepta_notificacion_sms: true,
  acepta_notificacion_email: true,
  acepta_tratamiento_datos: true,
  direccionNotificacion: "",
  municipioNotificacion: "",
};

const defaultErrors = {
  confirmacionEmail: false,
  confirmacionCelular: false,
};

const RegisterPersonaScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenGenerator, setIsOpenGenerator] = useState<boolean>(false);
  const [yesOrNo, setYesOrNo] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(true);
  const [completeAddress, setCompleteAddress] = useState<string>("");
  const [idRepresentante, setIdRepresentante] = useState<string>("");
  const [errors, setErrors] = useState<IAuth>(defaultErrors);
  const [datosNotificacion, setDatosNotificacion] =
    useState<IDatosNotificacion>({ departamento: "" });
  const [municipioNotificacionFiltered, setMunicipioNotificacionFiltered] =
    useState<IList[]>([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState<IList[]>([]);
  const [paisesOptions, setPaisesOptions] = useState<IList[]>([]);
  const [departamentosOptions, setDepartamentosOptions] = useState<IList[]>([]);
  const [municipiosOptions, setMunicipiosOptions] = useState<IList[]>([]);
  const [tipoDocumentoFiltrado, setTipoDocumentoFiltrado] = useState<any>([]);
  const [tipoPersonaOptions, setTipoPersonaOptions] = useState<any[]>([]);
  const [formValues, setFormValues] = useState<IFormValues>({
    fechaNacimiento: "",
    tipo_persona: { label: "Natural", value: "N" },
    digito_verificacion: "",
    municipioNotificacion: "",
  });

  // Modelo de creacion
  const [createPersonaModel, setCreatePersonaModel] = useState(defaultValues);
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
        console.log(municipiosNoFormat, "municipiosNoFormat")
        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);
        const tipoPersonaFormat = textChoiseAdapter(tipoPersonaNoFormat);
        console.log(municipiosFormat, "municipiosFormat")
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
    setValue,
    formState: { errors: errorsForm },
  } = useForm<IDefaultValues>({ defaultValues });

  const dataPersona = watch();

  let elm = document.getElementById("myInput");
  if (elm && typeof elm.focus === "function") {
    elm.focus();
  }

  const submitForm: SubmitHandler<IDefaultValues> = async (
    data: IDefaultValues
  ) => {
    //* Validación duplicidad de emails y celular
    // if ( createPersonaModel.email !== createPersonaModel.cEmail || createPersonaModel.celular !== createPersonaModel.cCelular) {
    //   const dataResponse = {
    //     ...defaultErrors,
    //   };

    //   if (createPersonaModel.email !== createPersonaModel.cEmail) {
    //     dataResponse.confirmacionEmail = true;
    //   }

    //   // if (createPersonaModel.celular !== createPersonaModel.cCelular) {
    //   //   dataResponse.confirmacionCelular = true;
    //   // }

    //   setErrors({ ...errors, ...dataResponse });
    //   setTimeout(() => {
    //     setErrors({ ...errors, ...defaultErrors });
    //   }, 2000);

    //   return;
    // }

    const persona: IPerson = {
      tipo_persona: "",
      tipo_documento: "",
      numero_documento: "",
      digito_verificacion: "",
      nombre_comercial: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      fecha_nacimiento: "",
      email: "",
      telefono_celular: "",
      ubicacion_georeferenciada: "",
      razon_social: "",
      telefono_celular_empresa: "",
      direccion_notificaciones: "",
      representante_legal: "",
      cod_municipio_notificacion_nal: "",
    };
    let fechaNacimiento = setDatesFormatRevere(dataPersona.fechaNacimiento ? dataPersona.fechaNacimiento.toLocaleString() : '')

    const personaNatural: any = {
      tipo_persona: dataPersona.tipo_persona.value,
      tipo_documento: dataPersona.tipoDocumento.value,
      numero_documento: dataPersona.numero_documento,
      digito_verificacion: "",
      nombre_comercial: "",
      primer_nombre: dataPersona.primerNombre,
      segundo_nombre: dataPersona.segundo_nombre,
      primer_apellido: dataPersona.primerApellido,
      segundo_apellido: dataPersona.segundo_apellido,
      fecha_nacimiento: fechaNacimiento,
      email: dataPersona.eMail,
      telefono_celular: dataPersona.celular,
      telefono_empresa_2: null,
      sexo: "",
      estado_civil: "",
      pais_nacimiento: "",
      email_empresarial: null,
      ubicacion_georeferenciada: "string",
      telefono_fijo_residencial: null,
      pais_residencia: "",
      municipio_residencia: "",
      direccion_residencia: "",
      direccion_laboral: "",
      direccion_residencia_ref: "",
      direccion_notificaciones: "",
      cod_municipio_laboral_nal: "",
      cod_municipio_notificacion_nal: "",
      acepta_notificacion_sms: true,
      acepta_notificacion_email: true,
      acepta_tratamiento_datos: true
    };

    setLoading(true);
    if (dataPersona.tipo_persona.value === "N") {
      try {
        const { data: dataRegisterPersona } = await clienteAxios.post(
          "personas/persona-natural/create/",
          personaNatural
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
      } catch (err: any) {
        console.log(err);
        setLoading(false);
        Swal.fire({
          text: err.response?.data.detail,
          icon: "warning",
          confirmButtonColor: "#3BA9E0",
          confirmButtonText: "Aceptar",
        });
        // if (err.response?.data?.email && err.response?.data?.numero_documento) {
        //   Swal.fire({
        //     title: "Este documento y correo ya estan relacionados",
        //     text: "¿Desea registrarse como usuario?",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3BA9E0",
        //     cancelButtonColor: "#6c757d",
        //     confirmButtonText: "Si",
        //     cancelButtonText: "No",
        //   }).then((result) => {
        //     if (result.isConfirmed) {
        //       navigate("/registeruser");
        //     }
        //   });
        // } else if (err.response?.data?.numero_documento) {
        //   Swal.fire({
        //     title: "Este documento ya existe",
        //     text: "¿Desea registrarse como usuario?",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3BA9E0",
        //     cancelButtonColor: "#6c757d",
        //     confirmButtonText: "Si",
        //     cancelButtonText: "No",
        //   }).then((result) => {
        //     if (result.isConfirmed) {
        //       navigate("/registeruser");
        //     }
        //   });
        // } else if (err.response?.data?.non_field_errors) {
        //   //Cambiaron los errores ahora vienen en este formato
        //   Swal.fire({
        //     title: "Este documento ya existe",
        //     text: "¿Desea registrarse como usuario?",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3BA9E0",
        //     cancelButtonColor: "#6c757d",
        //     confirmButtonText: "Si",
        //     cancelButtonText: "No",
        //   }).then((result) => {
        //     if (result.isConfirmed) {
        //       navigate("/registeruser");
        //     }
        //   });
        // } else if (err?.response!.data?.email) {
        //   console.log(err);
        //   Swal.fire({
        //     title: "Este correo electronico ya existe",
        //     text: "Verifica tus datos",
        //     icon: "info",
        //     confirmButtonColor: "#3BA9E0",
        //     cancelButtonColor: "#6c757d",
        //     confirmButtonText: "Aceptar",
        //   });
        // } else {
        //   console.log(err);
        // }
        // return err as AxiosError;
      }
      setLoading(false);
    } else {
      try {
        const { data: dataRepresentante } = await clienteAxios.get(
          `personas/get-personas-naturales-by-document/${data.tipoDocumento.value}/${data.numero_documento}/`
        );
        setIdRepresentante(dataRepresentante?.data?.id_persona);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title:
            "No existe un representante legal registrado con el documento ingresado",
          text: "¿Quiere crear una persona natural?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            handleChangeTypePerson({ label: "Natural", value: "N" });
            setFormValues({
              ...formValues,
              tipo_persona: { label: "Natural", value: "N" },
            });
          }
        });
        setLoading(false);
        return error as AxiosError;
      }

      const personaJuridica = {
        tipo_persona: dataPersona.tipo_persona.value,
        tipo_documento: dataPersona.tipoDocumento.value,
        numero_documento: dataPersona.numero_documento,
        digito_verificacion: dataPersona.dv,
        nombre_comercial: dataPersona.nombreComercial,
        razon_social: dataPersona.razonSocial,
        email: dataPersona.eMail,
        email_empresarial: dataPersona.eMail,
        direccion_notificaciones: "",
        cod_municipio_notificacion_nal: null,
        cod_pais_nacionalidad_empresa: "",
        telefono_celular_empresa: "573144198170",
        telefono_empresa_2: "string",
        telefono_empresa: "573144198170",
        acepta_notificacion_sms: true,
        acepta_notificacion_email: true,
        acepta_tratamiento_datos: true,
        representante_legal: 1
      }
      try {
        const { data: dataRegisterEmpresa } = await clienteAxios.post(
          "personas/persona-juridica/create/",
          personaJuridica
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
      } catch (err: any) {
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
        return err as AxiosError;
      }
      setLoading(false);
    }
  };

  const resetValues = () => {
    reset(defaultValues);
    setCompleteAddress("");
  };

  const handleChangeTypePerson = (e) => {
    const data = { ...createPersonaModel };
    data.tipo_persona = e.value;
    setCreatePersonaModel(data);
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

  useEffect(() => {
    if (isUser) {
      const dataFiltered = tipoDocumentoOptions.filter(
        (documento) => documento.value !== "NU"
      );
      setTipoDocumentoFiltrado(dataFiltered);
    } else {
      const dataFiltered = tipoDocumentoOptions.filter(
        (documento) => documento.value === "NU"
      );
      setTipoDocumentoFiltrado(dataFiltered);
    }
  }, [isUser, tipoDocumentoOptions]);

  useEffect(() => {
    if (dataPersona.tipo_persona.value === "J") {
      setIsUser(false);
      setYesOrNo(true);
    } else {
      setIsUser(true);
      setYesOrNo(false);
    }
  }, [dataPersona.tipo_persona.value]);

  const handleMaxOneDigit = (e) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value[0];
      setFormValues({
        ...formValues,
        digito_verificacion: e.target.value[0],
      });
    } else {
      setFormValues({
        ...formValues,
        digito_verificacion: e.target.value,
      });
    }
  };

  const getIndexColombia = () => {
    let indexColombia: string | number | null = null;
    paisesOptions.forEach((pais, index) => {
      if (pais.value === "CO") {
        indexColombia = index;
      }
    });
    return indexColombia;
  };

  const handleChangePaisNotificacion = (e) => {
    const objectSend: IObjectSend = {
      paisNotificacion: getIndexBySelectOptions(e.value, paisesOptions),
      municipioNotificacion: "",
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.municipioNotificacion = null;
      reset({
        ...watch(),
        municipioNotificacion: null,
      });
      setDatosNotificacion({ ...datosNotificacion, departamento: "" });
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  };

  const getIndexBySelectOptions = (valueSelect, selectOptions) => {
    let indexValue = null;
    selectOptions.filter((selectOption, index) => {
      if (selectOption.value === valueSelect) {
        indexValue = index;
        return true;
      }
      return false;
    });
    return indexValue;
  };

  useEffect(() => {
    if (datosNotificacion.departamento === "") {
      setMunicipioNotificacionFiltered([]);
      setFormValues({ ...formValues, municipioNotificacion: "" });
    } else {
      const municipioIndicadores = datosNotificacion.departamento?.value?.slice(
        0,
        2
      );
      const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
        const indicator = municipio.value.slice(0, 2);
        return municipioIndicadores === indicator;
      });
      setMunicipioNotificacionFiltered(municipiosCoincidentes);
      setFormValues({ ...formValues, municipioNotificacion: 0 });
    }
  }, [datosNotificacion.departamento]);

  // Cambio inputs
  const handleChange = (e) => {
    if (e.label) {
      const data = { ...createPersonaModel };
      data.tipo_documento = e.value;
      setCreatePersonaModel(data);
    } else {
      const { name, value } = e.target;
      setCreatePersonaModel({ ...createPersonaModel, [name]: value });
    }
  };

  const selectDatePicker = (e) => {
    const formatData = { ...createPersonaModel };
    const data = formatISO(new Date(e), {
      representation: "date",
    });
    formatData.fecha_nacimiento = data;
    formatData.fechaInput = e;
    setCreatePersonaModel(formatData);
  };

  const handleChangePhone = (e) => {
    const formatData = { ...createPersonaModel };
    formatData.telefono_celular = "57" + e.target.value;
    formatData.celular = e.target.value;
    setCreatePersonaModel(formatData);
  };

  const validatePhoneNumbers = (celular, cCelular) => {
    if (celular !== cCelular) {
      return {
        type: 'manual',
        message: 'Los numeros de telefono no coinciden'
      }
    }
    return true
  }
  const validateDate = (date: Date) => {
    if (date === new Date()) {
      return {
        type: 'manual',
        message: 'la fecha de nacimiento no puede ser mayor a la fecha actual'
      }
    }
    return true
  }
  const today = new Date();

  const validation = {
    fechaNacimiento: {
      required: true,
      validate: value => value < today
    }
  };


  console.log(dataPersona, 'dataPersona')
  console.log(municipioNotificacionFiltered, 'municipioNotificacionFiltered')
  // console.log(dataPersona, 'dataPersona')
  // console.log(setDatesFormatRevere(dataPersona.fechaNacimiento.toLocaleString()), 'toLocaleString')
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
                    Registro de persona
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
                    <Controller
                      name="tipo_persona"
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field.value}
                          options={tipoPersonaOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errorsForm.tipo_persona && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6 mt-3">
                    <label className="form-label">
                      Tipo de documento: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="tipoDocumento"
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field.value}
                          options={tipoDocumentoFiltrado}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errorsForm.tipoDocumento && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="col-12 mt-4 mt-md-5 d-flex justify-content-center">
                      <div className="form-check p-0">
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
                        {...register("numero_documento", { required: true })}
                        onBlur={() => {
                          console.log("sali de input");
                        }}
                      // onChange={handleChange}
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
                          <span className="text-danger">*</span>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            maxLength={1}
                            type="number"
                            {...register("dv", { required: true, maxLength: 1, pattern: /^[0-9]+$/, min: 1, max: 1 })}
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
                            {...register("nombreComercial", { required: true })}
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
                          {...register("razonSocial", { required: true })}
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
                      <div className="col-md-6 col-12 mt-3">
                        <div>
                          <label className="ms-2">
                            Primer nombre:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            type="text"
                            {...register("primerNombre", { required: true })}
                          // onChange={handleChange}
                          />
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
                        <div className="mt-3">
                          <label className="ms-2">Segundo nombre:</label>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            type="text"
                            {...register("segundo_nombre", { required: false })}
                          // onChange={handleChange}
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
                          // onChange={handleChange}
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
                            {...register("segundo_apellido", { required: false })}
                          // onChange={handleChange}
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
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            id="fechaNacimiento"
                            required
                            locale="es"
                            showYearDropdown
                            peekNextMonth
                            showMonthDropdown
                            dropdownMode="select"
                            scrollableYearDropdown
                            autoComplete="off"
                            selected={dataPersona.fechaNacimiento}
                            className="form-control border border-terciary rounded-pill px-3"
                            maxDate={today}
                            dateFormat="yyyy-MM-dd"
                          />
                        )}
                      />
                      {/* <Controller
                        name="fechaNacimiento"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            id="fechaNacimiento"
                            locale="es"
                            showYearDropdown
                            peekNextMonth
                            showMonthDropdown
                            dropdownMode="select"
                            scrollableYearDropdown
                            autoComplete="off"
                            selected={dataPersona.fechaNacimiento}
                            className="form-control border border-terciary rounded-pill px-3"
                            maxDate={new Date()}
                            dateFormat="yyyy-MM-dd"
                          />
                        )}
                      /> */}
                      {/* <DatePicker
                        locale="es"
                        showYearDropdown
                        peekNextMonth
                        showMonthDropdown
                        scrollableYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        selected={createPersonaModel.fechaInput}
                        onSelect={selectDatePicker}
                        className="border border-terciary form-control border rounded-pill px-3"
                        placeholderText="dd/mm/aaaa"
                        {...register("fechaNacimiento", { required: true })}
                      /> */}
                      {errorsForm.fechaNacimiento && errorsForm.fechaNacimiento.type === "validate" && (
                        <small className="form-text text-danger">
                          La fecha no puede ser igual a hoy.
                        </small>
                      )}
                    </div>
                  )}
                </div>

                {!isUser && (
                  <>
                    <Subtitle title={"Representante Legal"} mt={4} mb={0} />
                    <div className="row mx-1">
                      <div className="col-12 col-md-6 mt-3">
                        <label className="form-label">
                          Tipo de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="tipoDocumentoLegal"
                          rules={{ required: true }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={field.value}
                              options={tipoDocumentoOptions}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                        {errorsForm.tipoDocumentoLegal && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                        {/* <Select
                          options={tipoDocumentoOptions}
                          placeholder="Seleccionar"
                        />

                        {errorsForm.tipoDocumento && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )} */}
                      </div>
                      <div className="col-md-6 col-12 mt-3">
                        <div>
                          <label className="ms-2">
                            Número de documento:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="border border-terciary form-control border rounded-pill px-3"
                            type="text"
                            {...register("numero_documento_legal", { required: true })}
                          />
                        </div>
                        {errorsForm.numero_documento_legal && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

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
                        onCopy={(e) => e.preventDefault()}
                        {...register("eMail", { required: true })}
                        // onChange={handleChange}
                        required={false}
                      />
                    </div>
                    {errorsForm.eMail && (
                      <div className="col-12">
                        <small className="text-danger">
                          Este campo es obligatorio
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
                        // autoComplete="off"
                        // onPaste={(e) => e.preventDefault()}
                        {...register("cEmail", {
                          required: true,
                          validate: (value) => value === watch("eMail"),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Ingrese un correo electrónico válido"
                          }
                        })}
                      // onChange={handleChange}
                      />
                    </div>
                    {errorsForm.cEmail && (
                      <div className="col-12">
                        <small className="text-danger">
                          Este campo es obligatorio
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
                        // type="tel"
                        // maxLength={10}
                        onCopy={(e) => e.preventDefault()}
                        {...register("celular", { required: true })}
                      // onChange={handleChangePhone}
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
                        // onPaste={(e) => e.preventDefault()}
                        {...register("cCelular", {
                          required: true,
                          minLength: 10,
                          maxLength: 10,
                          pattern: /^[0-9]+$/,
                          validate: (value) => value === dataPersona.celular,
                        })}
                      // onChange={handleChange}
                      />
                    </div>
                    {errorsForm.cCelular && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          El campo está vacío  o no coinciden los números ingresados
                        </small>
                      </div>
                    )}
                  </div>
                  {!isUser && (
                    <>
                      <div className="mt-3 col-md-12 col-12">
                        <div className="mt-3 d-flex align-items-end">
                          <div className="col-9 mx-2">
                            <label className="text-terciary">
                              Dirección de notificación:{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control rounded-pill px-3 border border-terciary"
                              disabled
                              {...register("direccionNotificacion", { required: true })}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                            onClick={() => {
                              setIsOpenGenerator(true);
                              console.log(watch());
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
                      <div className="col-12 col-md-6 mt-3">
                        <label className="form-label text-terciary">
                          País notificación:
                        </label>
                        <Controller
                          name="paisNotificacion"
                          rules={{ required: true }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={field.value}
                              options={paisesOptions}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                        {/* <Select
                          value={paisesOptions[formValues.paisNotificacion]}
                          options={paisesOptions}
                          onChange={handleChangePaisNotificacion}
                          placeholder="Seleccionar"
                        /> */}
                      </div>
                      {/* {dataPersona.paisNotificacion.value === getIndexColombia() ? ( */}
                      <div className="col-12 col-md-6 mt-3">
                        <label className="form-label text-terciary">
                          Departamento notificación:{" "}
                        </label>
                        <Controller
                          name="departamentoNotificacion"
                          rules={{ required: true }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={field.value}
                              isDisabled={dataPersona.paisNotificacion.value !== "CO"}
                              options={departamentosOptions}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                        {/* <Select
                            options={departamentosOptions}
                            isDisabled={dataPersona.paisNotificacion.value !== "CO"}
                            onChange={(e) => {
                              setDatosNotificacion({
                                ...datosNotificacion,
                                departamento: e,
                              });
                            }}
                            value={datosNotificacion.departamento}
                            placeholder="Seleccionar"
                          /> */}
                      </div>
                      {/* ) : (
                        <div className="col-12 col-md-6 mt-3">
                          <label className="form-label text-terciary">
                            Departamento notificación:{" "}
                          </label>
                          <Select
                            isDisabled={dataPersona.paisNotificacion.value !== "CO"}
                            placeholder="Seleccionar"
                            value={"Seleccionar"}
                          />
                        </div>
                      )} */}
                      {/* {dataPersona.paisNotificacion.value === getIndexColombia() ? ( */}
                      <div className="col-12 col-md-6 mt-3">
                        <label className="form-label">
                          Municipio notificación:{" "}
                        </label>
                        <Controller
                          name="municipioNotificacion"
                          rules={{ required: true }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              value={field.value}
                              isDisabled={dataPersona.paisNotificacion.value !== "CO"}
                              options={municipiosOptions}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                        {/* <Select
                            isDisabled={dataPersona.paisNotificacion.value !== "CO"}
                            value={
                              municipiosOptions[
                              formValues.municipioNotificacion
                              ]
                            }
                            onChange={(e: SingleValue<any>) =>
                              setFormValues({
                                ...formValues,
                                municipioNotificacion: getIndexBySelectOptions(
                                  e.value,
                                  municipiosOptions
                                ),
                              })
                            }
                            options={municipioNotificacionFiltered}
                            placeholder="Seleccionar"
                          /> */}
                      </div>
                      {/* ) : (
                        <div className="col-12 col-md-6 mt-3">
                          <label className="form-label">
                            Municipio notificación:{" "}
                          </label>
                          <Select
                            isDisabled
                            placeholder="Seleccionar"
                            value={"Seleccionar"}
                          />
                        </div>
                      )} */}
                    </>
                  )}
                  <label className="text-bold mt-3">
                    <span className="text-danger">*</span>Al hacer clic en
                    "Registrarse", aceptas nuestras condiciones, la política de
                    privacidad y política de cookies. Es posible que te enviemos
                    notificaciones por SMS y/o vía correo electrónico.
                  </label>
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      className="mb-0 btn-image text-capitalize bg-white border boder-none"
                      type="button"
                      onClick={() => navigate("/login")}
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
                        <img src={botonCancelar} alt="" title="Cancelar" />
                      )}
                    </button>
                    <button
                      className="mb-0 btn-image text-capitalize bg-white border boder-none"
                      type="submit"
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
                        <img
                          src={botonRegistrarse}
                          alt=""
                          title="Registrarse"
                        />
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
                completeAddress={dataPersona.direccionNotificacion}
                setCompleteAddress={setValue}
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
