import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import GeneradorDeDirecciones from "../../components/GeneradorDeDirecciones";

const AdministradorDePersonasScreen = () => {
  const navigate = useNavigate();
  const [direccionNotificacionIsOpen, setDireccionNotificacionIsOpen] =
    useState(false);
  const [direccionNotificacionText, setDireccionNotificacionText] =
    useState("");
  const [direccionLaboralIsOpen, setDireccionLaboralIsOpen] = useState(false);
  const [direccionLaboralText, setDireccionLaboralText] = useState("");
  const [actionForm, setActionForm] = useState(null);
  const [sexoOptions, setSexoOptions] = useState([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    tipoDocumento: null,
    fechaNacimiento: "",
    estadoCivil: "",
    sexo: "",
    paisNacimiento: "",
    paisResidencia: "",
    departamento: "",
    municipio: "",
    municipioDondeLabora: "",
    id_persona: "",
    tipoPersona: "",
  });

  const {
    reset: resetPersona,
    register: registerPersona,
    handleSubmit: handleSumbitPersona,
    control: controlPersona,
    watch: watchPersona,
    formState: { errors: errorsPersona },
  } = useForm();

  const {
    reset: resetBuscar,
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: sexoNoFormat } = await clienteAxios.get("choices/sexo/");
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );
        const { data: estadoCivilNoFormat } = await clienteAxios.get(
          "choices/estado-civil/"
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

        const sexoFormat = textChoiseAdapter(sexoNoFormat);
        const estadoCivilFormat = textChoiseAdapter(estadoCivilNoFormat);
        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

        setSexoOptions(sexoFormat);
        setEstadoCivilOptions(estadoCivilFormat);
        setTipoDocumentoOptions(documentosFormat);
        setPaisesOptions(paisesFormat);
        setDepartamentosOptions(departamentosFormat);
        setMunicipiosOptions(municipiosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const onSubmitBuscarPersona = async (data) => {
    console.log(data);
    try {
      const { data: dataPersona } = await clienteAxios.get(
        `personas/get-by-document/${data?.numeroDocumento}`
      );

      if (dataPersona.tipo_persona !== "N" && dataPersona.id_persona) {
        Swal.fire({
          title: "Este documento es de una persona juridica",
          text: "Quiere ir al administrador de empresas?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/seguridad/administradordeempresas");
          }
        });
        setActionForm(null);
        return;
      } else if (!dataPersona.id_persona) {
        Swal.fire({
          title: "No existe un persona con estos datos",
          text: "Quiere seguir bucando o quiere crear una persona?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Seguir",
          cancelButtonText: "Crear",
        }).then((result) => {
          if (result.isConfirmed) {
          } else {
            setActionForm("Crear");
          }
        });
      } else {
        setActionForm("editar");
      }

      const defaultValuesOverrite = {
        tipoDocumento:
          tipoDocumentoOptions[
            getIndexBySelectOptions(
              dataPersona.tipo_documento?.cod_tipo_documento,
              tipoDocumentoOptions
            )
          ],
        numeroDocumento2: dataPersona.numero_documento,
        primerNombre: dataPersona.primer_nombre,
        segundoNombre: dataPersona.segundo_nombre,
        primerApellido: dataPersona.primer_apellido,
        segundoApellido: dataPersona.segundo_apellido,
        eMail: dataPersona.email,
        celular: dataPersona.telefono_celular,
        emailEmpresarial: dataPersona.email_empresarial,
        telefonoFijo: dataPersona.telefono_fijo_residencial,
        telefonoEmpresa: dataPersona.telefono_empresa,
        telefonoEmpresa2: dataPersona.telefono_empresa_2,
        referenciaAdicional: dataPersona.direccion_residencia_ref,
        direccionDeNotificacion: dataPersona.direccion_notificaciones,
        direccionLaboral: dataPersona.direccion_laboral,
        ubicacionGeografica: dataPersona.ubicacion_georeferenciada,
      };
      setFormValues({
        ...formValues,
        tipoDocumento: getIndexBySelectOptions(
          dataPersona.tipo_documento?.cod_tipo_documento,
          tipoDocumentoOptions
        ),
        sexo: getIndexBySelectOptions(dataPersona.sexo, sexoOptions),
        estadoCivil: getIndexBySelectOptions(
          dataPersona.estado_civil?.cod_estado_civil,
          estadoCivilOptions
        ),
        paisNacimiento: getIndexBySelectOptions(
          dataPersona.pais_nacimiento,
          paisesOptions
        ),
        paisResidencia: getIndexBySelectOptions(
          dataPersona.pais_residencia,
          paisesOptions
        ),
        departamento: getIndexBySelectOptions(
          dataPersona.departamento_residencia,
          departamentosOptions
        ),
        municipio: getIndexBySelectOptions(
          dataPersona.municipio_residencia,
          municipiosOptions
        ),
        municipioDondeLabora: getIndexBySelectOptions(
          dataPersona.cod_municipio_laboral_nal,
          municipiosOptions
        ),
        fechaNacimiento: dataPersona.fecha_nacimiento
          ? new Date(dataPersona.fecha_nacimiento)
          : "",
        id_persona: dataPersona.id_persona,
        tipoPersona: dataPersona.tipo_persona,
      });
      resetPersona(defaultValuesOverrite);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitPersona = async (data) => {
    console.log("data estado componentes", formValues);
    console.log("data hook form", data);

    const updatedPersona = {
      tipo_persona: formValues.tipoPersona,
      id_persona: formValues.id_persona,
      tipo_documento: tipoDocumentoOptions[formValues.tipoDocumento]?.value,
      numero_documento: data.numeroDocumento2,
      primer_nombre: data.primerNombre,
      segundo_nombre: data.segundoNombre,
      primer_apellido: data.primerApellido,
      segundo_apellido: data.segundoApellido,
      sexo: formValues.sexo?.value,
      estado_civil: estadoCivilOptions[formValues.estadoCivil]?.value,
      pais_nacimiento: paisesOptions[formValues.paisNacimiento]?.value,
      fecha_nacimiento: formatISO(formValues.fechaNacimiento, {
        representation: "date",
      }),
      email: data.eMail,
      email_empresarial: data.emailEmpresarial,
      telefono_celular: data.celular,
      telefono_fijo_residencial: data.telefonoFijo,
      telefono_empresa: data.telefonoEmpresa,
      telefono_empresa_2: data.telefonoEmpresa2,
      pais_residencia: paisesOptions[formValues.paisResidencia]?.value,
      departamento_residencia:
        departamentosOptions[formValues.departamento]?.value,
      municipio_residencia: municipiosOptions[formValues.municipio]?.value,
      direccion_notificaciones: data.direccionDeNotificacion,
      direccion_residencia_ref: data.referenciaAdicional,
      direccion_laboral: data.direccionLaboral,
      cod_municipio_laboral_nal:
        municipiosOptions[formValues.municipioDondeLabora]?.value,
      ubicacion_georeferenciada: data.ubicacionGeografica,
    };

    console.log("updated persona", updatedPersona);

    if (actionForm === "editar") {
      try {
        await clienteAxios.put(
          `personas/persona-natural/update/${formValues?.id_persona}/`,
          updatedPersona
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados",
          showConfirmButton: false,
          timer: 1500,
        });
        resetBuscar({ numeroDocumento: "" });
        setActionForm(null);
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    } else {
      try {
        updatedPersona.tipo_persona = "N";
        await clienteAxios.post(
          "personas/persona-natural/create/",
          updatedPersona
        );
        Swal.fire({
          title: "Persona creada",
          text: "¿Desea registrar un usuario?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/seguridad/administradordeusuario");
          } else {
            resetBuscar({ numeroDocumento: "" });
            setActionForm(null);
          }
        });
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    }
  };

  const manejadorErroresSwitAlert = (err) => {
    if (err.response?.data?.email && err.response?.data?.numero_documento) {
      Swal.fire({
        title: "Este documento y correo ya estan relacionados",
        text: "¿Desea registrar esta persona como usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3BA9E0",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/seguridad/administradordeusuario");
        }
      });
    } else if (err.response?.data?.numero_documento) {
      Swal.fire({
        title: "Este documento ya existe",
        text: "¿Desea registrarlo como usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3BA9E0",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/seguridad/administradordeusuario");
        }
      });
    } else if (err.response?.data?.email) {
      Swal.fire({
        title: "Este correo electronico ya existe",
        text: "Verifique los datos",
        icon: "info",
        confirmButtonColor: "#3BA9E0",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Aceptar",
      });
    } else {
      console.log(err);
    }
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

  const handleCancelAction = () => {
    setActionForm(null);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Administrador de personas
        </h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <div className="row">
            <form onSubmit={handleSubmitBuscar(onSubmitBuscarPersona)}>
              <h5 className="font-weight-bolder">Buscar persona</h5>
              <div className="mt-4 row align-items-center">
                <div className="col-12 col-md-4">
                  <label className="form-label">
                    Tipo de documento: <span className="text-danger">*</span>
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
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Numero de documento"
                      {...registerBuscar("numeroDocumento", { required: true })}
                    />
                    <label className="ms-2">
                      Número de documento:{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  {errorsBuscar.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0">
                  <button
                    type="submit"
                    className="btn bg-gradient-primary mb-0 text-capitalize"
                  >
                    Buscar
                  </button>
                  <button
                    type="button"
                    className="ms-3 btn bg-gradient-primary mb-0 text-capitalize"
                  >
                    Busqueda avanzada
                  </button>
                </div>
              </div>
            </form>

            {actionForm && (
              <form onSubmit={handleSumbitPersona(onSubmitPersona)}>
                <h5 className="font-weight-bolder mt-4">Datos personales</h5>
                <hr className="dark horizontal my-0" />
                <div className="mt-4 row">
                  <div className="row col-12 justify-content-center align-items-center">
                    <div className="col-12 col-md-4">
                      <label className="form-label">
                        Tipo de documento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="tipoDocumento2"
                        control={controlPersona}
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={
                              tipoDocumentoOptions[formValues.tipoDocumento]
                            }
                            onChange={(e) => {
                              //resetPersona({ tipoDocumento2: e.value });
                              setFormValues({
                                ...formValues,
                                tipoDocumento: getIndexBySelectOptions(
                                  e.value,
                                  tipoDocumentoOptions
                                ),
                              });
                            }}
                            options={tipoDocumentoOptions}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errorsPersona.tipoDocumento2 && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Numero de documento"
                          {...registerPersona("numeroDocumento2", {
                            required: true,
                          })}
                        />
                        <label className="ms-2">
                          Número de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      {errorsPersona.numeroDocumento2 && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Primer nombre"
                          {...registerPersona("primerNombre", {
                            required: true,
                          })}
                        />
                        <label className="ms-2">
                          Primer nombre: <span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    {errorsPersona.primerNombre && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Segundo nombre"
                        {...registerPersona("segundoNombre")}
                      />
                      <label className="ms-2">Segundo nombre:</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        placeholder="Primer apellido"
                        type="text"
                        {...registerPersona("primerApellido", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Primer apellido: <span className="text-danger">*</span>
                      </label>
                    </div>
                    {errorsPersona.primerApellido && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Segundo apellido"
                        {...registerPersona("segundoApellido")}
                      />
                      <label className="ms-2">Segundo apellido:</label>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12 col-md-4">
                      <label className="form-label">Sexo:</label>
                      <Controller
                        name="sexo"
                        control={controlBuscar}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={sexoOptions}
                            value={sexoOptions[formValues.sexo]}
                            onChange={(e) =>
                              setFormValues({ ...formValues, sexo: e })
                            }
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label">Estado civil:</label>
                      <Controller
                        name="estadoCivil"
                        control={controlBuscar}
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={estadoCivilOptions[formValues.estadoCivil]}
                            onChange={(e) =>
                              setFormValues({
                                ...formValues,
                                estadoCivil: getIndexBySelectOptions(
                                  e.value,
                                  estadoCivilOptions
                                ),
                              })
                            }
                            options={estadoCivilOptions}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label">País de nacimiento:</label>
                      <Controller
                        name="paisNacimiento"
                        control={controlBuscar}
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={paisesOptions[formValues.paisNacimiento]}
                            onChange={(e) =>
                              setFormValues({
                                ...formValues,
                                paisNacimiento: getIndexBySelectOptions(
                                  e.value,
                                  paisesOptions
                                ),
                              })
                            }
                            options={paisesOptions}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="input-group input-group-dynamic flex-column col-12 col-md-4 mt-4">
                    <label htmlFor="exampleFormControlInput1">
                      Fecha de nacimiento <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="fechaNacimiento"
                      control={controlBuscar}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          dateFormat="yyyy/MM/dd"
                          selected={formValues.fechaNacimiento}
                          value={formValues.fechaNacimiento}
                          onSelect={(e) => {
                            setFormValues({
                              ...formValues,
                              fechaNacimiento: e,
                            });
                          }}
                          className="multisteps-form__input form-control p-2"
                          placeholderText="aaaa/mm/dd"
                        />
                      )}
                    />
                    {errorsPersona.fechaNacimiento && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                </div>
                <h5 className="font-weight-bolder mt-4">Datos de contacto</h5>
                <hr className="dark horizontal my-0" />
                <div className="mt-4 row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="E-mail"
                        {...registerPersona("eMail", { required: true })}
                      />
                      <label className="ms-2">
                        E-mail: <span className="text-danger">*</span>
                      </label>
                    </div>
                    {errorsPersona.eMail && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email empresarial"
                        {...registerPersona("emailEmpresarial")}
                      />
                      <label className="ms-2">Email empresarial:</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Celular"
                        {...registerPersona("celular", { required: true })}
                      />
                      <label className="ms-2">
                        Celular: <span className="text-danger">*</span>
                      </label>
                    </div>
                    {errorsPersona.celular && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Telefono"
                        {...registerPersona("telefonoFijo")}
                      />
                      <label className="ms-2">Telefono fijo:</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Telefono"
                        {...registerPersona("telefonoEmpresa")}
                      />
                      <label className="ms-2">Telefono empresa:</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Telefono"
                        {...registerPersona("telefonoEmpresa2")}
                      />
                      <label className="ms-2">Telefono empresa 2:</label>
                    </div>
                  </div>
                </div>
                <h5 className="font-weight-bolder mt-4">Lugar de residencia</h5>
                <div className="row mb-3">
                  <div className="col-12 col-md-4">
                    <label className="form-label">País de Residencia:</label>
                    <Controller
                      name="paisResidencia"
                      control={controlBuscar}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={paisesOptions[formValues.paisResidencia]}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              paisResidencia: getIndexBySelectOptions(
                                e.value,
                                paisesOptions
                              ),
                            })
                          }
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">Departamento:</label>
                    <Controller
                      name="departamento"
                      control={controlBuscar}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={departamentosOptions[formValues.departamento]}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              departamento: getIndexBySelectOptions(
                                e.value,
                                departamentosOptions
                              ),
                            })
                          }
                          options={departamentosOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">Municipio:</label>
                    <Controller
                      name="municipio"
                      control={controlBuscar}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={municipiosOptions[formValues.municipio]}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              municipio: getIndexBySelectOptions(
                                e.value,
                                municipiosOptions
                              ),
                            })
                          }
                          options={municipiosOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8 col-12">
                    <div className="form-floating input-group input-group-dynamic mt-2">
                      <input
                        className="form-control"
                        type="text"
                        readOnly
                        {...registerPersona("direccionDeNotificacion")}
                      />
                      <label className="ms-2">Dirección de notificación:</label>
                      <button
                        type="button"
                        className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                        onClick={() => setDireccionNotificacionIsOpen(true)}
                      >
                        Generar
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="referencia adicional"
                        {...registerPersona("referenciaAdicional")}
                      />
                      <label className="ms-2">Referencia adicional:</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 col-12">
                    <div className="form-floating input-group input-group-dynamic mt-2">
                      <input
                        className="form-control"
                        type="text"
                        readOnly
                        {...registerPersona("direccionLaboral")}
                      />
                      <label className="ms-2">Dirección laboral:</label>
                      <button
                        type="button"
                        className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                        onClick={() => setDireccionLaboralIsOpen(true)}
                      >
                        Generar
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">
                      Municipio donde labora:
                    </label>
                    <Controller
                      name="municipioDondeLabora"
                      control={controlBuscar}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={municipiosOptions}
                          value={
                            municipiosOptions[formValues.municipioDondeLabora]
                          }
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              municipioDondeLabora: getIndexBySelectOptions(
                                e.value,
                                municipiosOptions
                              ),
                            })
                          }
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Ubicacion geografica"
                        {...registerPersona("ubicacionGeografica", {
                          required: true,
                        })}
                      />
                      <label className="ms-2">
                        Ubicacion geografica:{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  {errorsPersona.ubicacionGeografica && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    className="btn bg-gradient-light mb-0 d-block text-capitalize"
                    type="button"
                    onClick={handleCancelAction}
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn bg-gradient-primary mb-0 d-block text-capitalize"
                    type="submit"
                  >
                    {actionForm === "editar" ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            )}
          </div>
          <GeneradorDeDirecciones
            isOpenGenerator={direccionNotificacionIsOpen}
            setIsOpenGenerator={setDireccionNotificacionIsOpen}
            completeAddress={direccionNotificacionText}
            setCompleteAddress={setDireccionNotificacionText}
            reset={resetPersona}
            keyReset="direccionDeNotificacion"
            totalValuesForm={watchPersona()}
          />

          <GeneradorDeDirecciones
            isOpenGenerator={direccionLaboralIsOpen}
            setIsOpenGenerator={setDireccionLaboralIsOpen}
            completeAddress={direccionLaboralText}
            setCompleteAddress={setDireccionLaboralText}
            reset={resetPersona}
            keyReset="direccionLaboral"
            totalValuesForm={watchPersona()}
          />
        </div>
      </div>
    </div>
  );
};
export default AdministradorDePersonasScreen;
