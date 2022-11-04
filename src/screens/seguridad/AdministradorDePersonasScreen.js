import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  textChoiseAdapter,
  textChoiseAdapterIndicativo,
} from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import GeneradorDeDirecciones from "../../components/GeneradorDeDirecciones";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
import Subtitle from "../../components/Subtitle";
import BusquedaAvanzadaModal from "../../components/BusquedaAvanzadaModal";

const AdministradorDePersonasScreen = () => {
  const navigate = useNavigate();
  const [direccionResidenciaIsOpen, setDireccionResidenciaIsOpen] =
    useState(false);
  const [direccionResidenciaText, setDireccionResidenciaText] = useState("");
  const [direccionNotificacionIsOpen, setDireccionNotificacionIsOpen] =
    useState(false);
  const [direccionNotificacionText, setDireccionNotificacionText] =
    useState("");
  const [direccionLaboralIsOpen, setDireccionLaboralIsOpen] = useState(false);
  const [direccionLaboralText, setDireccionLaboralText] = useState("");
  const [busquedaAvanzadaIsOpen, setBusquedaAvanzadaIsOpen] = useState(false);
  const [actionForm, setActionForm] = useState(null);
  const [sexoOptions, setSexoOptions] = useState([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [formValuesSearch, setFormValuesSearch] = useState({
    index_tipo_documento: "",
  });
  const [formValues, setFormValues] = useState({
    tipoDocumento: null,
    fechaNacimiento: "",
    estadoCivil: "",
    sexo: "",
    paisNacimiento: "",
    paisResidencia: "",
    municipio: "",
    municipioDondeLabora: "",
    municipioNotificacion: "",
    id_persona: "",
    tipoPersona: "",
    indicativoPais: "",
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
      const { data: dataPersonaObject } = await clienteAxios.get(
        `personas/get-personas-by-document/${data?.tipoDocumento.value}/${data?.numeroDocumento}`
      );

      const { data: dataPersona } = dataPersonaObject;

      if (dataPersona?.tipo_persona !== "N" && dataPersona?.id_persona) {
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
      } else if (!dataPersona?.id_persona) {
        const result = await Swal.fire({
          title: "No existe un persona con estos datos",
          text: "Quiere seguir bucando o quiere crear una persona?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Seguir",
          cancelButtonText: "Crear",
        });
        if (result.isConfirmed) {
        } else {
          resetEmptyValues();
          return setActionForm("Crear");
        }
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
        digitoVerificacion: dataPersona.digito_verificacion,
        nombreComercial: dataPersona.nombre_comercial,
        primerNombre: dataPersona.primer_nombre,
        segundoNombre: dataPersona.segundo_nombre,
        primerApellido: dataPersona.primer_apellido,
        segundoApellido: dataPersona.segundo_apellido,
        eMail: dataPersona.email,
        celular: dataPersona.telefono_celular,
        emailEmpresarial: dataPersona.email_empresarial,
        telefonoFijo: dataPersona.telefono_fijo_residencial,
        telefonoEmpresa2: dataPersona.telefono_empresa_2,
        referenciaAdicional: dataPersona.direccion_residencia_ref,
        direccion_residencia: dataPersona.direccion_residencia,
        direccionLaboral: dataPersona.direccion_laboral,
        ubicacionGeografica: dataPersona.ubicacion_georeferenciada,
        direccionNotificaciones: dataPersona.direccion_notificaciones,
        municipioDondeLabora: dataPersona.cod_municipio_laboral_nal,
        municipioNotificacion: dataPersona.cod_municipio_notificacion_nal
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
        municipio: getIndexBySelectOptions(
          dataPersona.municipio_residencia,
          municipiosOptions
        ),
        municipioDondeLabora: getIndexBySelectOptions(
          dataPersona.cod_municipio_laboral_nal,
          municipiosOptions
        ),
        municipioNotificacion: getIndexBySelectOptions(
          dataPersona.cod_municipio_notificacion_nal,
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
    console.log("data para submit", data);
    const indicativo = "57"
    const updatedPersona = {
      tipo_persona: formValues.tipoPersona,
      id_persona: formValues.id_persona,
      tipo_documento: tipoDocumentoOptions[formValues.tipoDocumento]?.value,
      numero_documento: data.numeroDocumento2,
      digito_verificacion: data.digitoVerificacion,
      nombre_comercial: data.nombreComercial,
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
      email: data.eMail, //Queda por comprobar si mejor se bloquea
      email_empresarial: data.emailEmpresarial,
      telefono_celular: indicativo+data.celular,
      telefono_fijo_residencial: data.telefonoFijo,
      telefono_empresa_2: data.telefonoEmpresa2,
      pais_residencia: paisesOptions[formValues.paisResidencia]?.value,
      departamento_residencia:
        departamentosOptions[formValues.departamento]?.value,
      municipio_residencia: municipiosOptions[formValues.municipio]?.value,
      cod_municipio_notificacion_nal:
        municipiosOptions[formValues.municipioNotificacion]?.value,
      direccion_residencia: data.direccion_residencia,
      direccion_residencia_ref: data.referenciaAdicional,
      direccion_laboral: data.direccionLaboral,
      direccion_notificaciones: data.direccionNotificaciones,
      cod_municipio_laboral_nal:
        municipiosOptions[formValues.municipioDondeLabora]?.value,
      ubicacion_georeferenciada: data.ubicacionGeografica,
    };

    console.log("updated persona", updatedPersona);

    if (actionForm === "editar") {
      const access = getTokenAccessLocalStorage();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      };
      try {
        console.log("HGola", updatedPersona);
        const { data: dataUpdate } = await clienteAxios.patch(
          `personas/persona-natural/user-with-permissions/update/${updatedPersona.tipo_documento}/${updatedPersona.numero_documento}/`,
          updatedPersona,
          config
        );
        console.log(
          "datos actualizados",
          dataUpdate,
          updatedPersona.tipo_documento,
          updatedPersona.numero_documento
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados",
          showConfirmButton: false,
          timer: 1500,
        });
        resetBuscar({ ...watchPersona(), numeroDocumento: "" });
        setActionForm(null);
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    } else {
      try {
        const COD_TIPO_PERSONA_NATURAL = "N";

        updatedPersona.tipo_persona = COD_TIPO_PERSONA_NATURAL;
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

  const resetEmptyValues = () => {
    const emptyValues = {
      tipoDocumento: "",
      numeroDocumento2: "",
      digitoVerificacion: "",
      nombreComercial: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      eMail: "",
      celular: "",
      emailEmpresarial: "",
      telefonoFijo: "",
      telefonoEmpresa2: "",
      referenciaAdicional: "",
      direccion_residencia: "",
      direccionLaboral: "",
      ubicacionGeografica: "",
      direccionNotificaciones: "",
    };
    resetPersona(emptyValues);
    setFormValues({
      ...formValues,
      tipoDocumento: "",
      sexo: "",
      estadoCivil: "",
      paisNacimiento: "",
      paisResidencia: "",
      municipio: "",
      municipioDondeLabora: "",
      municipioNotificacion: "",
      fechaNacimiento: "",
      id_persona: "",
      tipoPersona: "",
    });
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
      console.log(err);
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
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <div className="row">
            <form onSubmit={handleSubmitBuscar(onSubmitBuscarPersona)}>
              <h3 className="mt-3 ms-3 mb-4 fw-light text-terciary">
                Administrador de personas
              </h3>
              <Subtitle title={"Buscar persona"} mt={0} mb={0} />
              <div className="mt-4 row align-items-end ms-1">
                <div className="col-12 col-md-3">
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
                        value={
                          tipoDocumentoOptions[
                            formValuesSearch.index_tipo_documento
                          ]
                        }
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
                <div className="col-12 col-md-3">
                  <div>
                    <label className="ms-2">
                      Número de documento:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border rounded-pill px-3"
                      type="text"
                      {...registerBuscar("numeroDocumento", {
                        required: true,
                      })}
                    />
                  </div>
                  {errorsBuscar.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <button
                    type="submit"
                    className="btn bg-gradient-primary mb-0 text-capitalize"
                  >
                    Buscar
                  </button>
                  <button
                    type="button"
                    className="ms-3 btn bg-gradient-primary mb-0 text-capitalize"
                    onClick={() => setBusquedaAvanzadaIsOpen(true)}
                  >
                    Busqueda avanzada
                  </button>
                </div>
              </div>
            </form>

            {actionForm && (
              <form onSubmit={handleSumbitPersona(onSubmitPersona)}>
                <Subtitle title={"Datos personales"} mt={4} mb={0} />
                <hr className="dark horizontal my-0" />
                <div className="mt-4 row mx-1">
                  <div className="row col-12">
                    {actionForm !== "editar" ? (
                      <div className="col-12 col-md-3 mt-2">
                        <label className="form-label">
                          Tipo de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="tipoDocumento2"
                          control={controlPersona}
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
                        {errorsPersona.tipoDocumento2 && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="col-12 col-md-3 mt-2">
                        <div>
                          <label className="ms-2">
                            Tipo documento:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control border rounded-pill px-3"
                            type="text"
                            value={
                              tipoDocumentoOptions[formValues.tipoDocumento]
                                .label
                            }
                            disabled={actionForm === "editar"}
                            {...registerPersona("tipoDocumento2")}
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">
                          Número de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          disabled={actionForm === "editar"}
                          {...registerPersona("numeroDocumento2", {
                            required: true,
                          })}
                        />
                      </div>
                      {errorsPersona.numeroDocumento2 && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">Digito de verificación:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="number"
                          {...registerPersona("digitoVerificacion", {
                            maxLength: 1,
                          })}
                        />
                      </div>
                      {errorsPersona.digitoVerificacion && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo solo debe tener un digito
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">Nombre comercial:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          {...registerPersona("nombreComercial")}
                        />
                      </div>
                      {errorsPersona.nombreComercial && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo solo debe tener un digito
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">
                          Primer nombre: <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          disabled={actionForm === "editar"}
                          {...registerPersona("primerNombre", {
                            required: true,
                          })}
                        />
                      </div>
                      {errorsPersona.primerNombre && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">Segundo nombre:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          disabled={actionForm === "editar"}
                          {...registerPersona("segundoNombre")}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">
                          Primer apellido:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          disabled={actionForm === "editar"}
                          {...registerPersona("primerApellido", {
                            required: true,
                          })}
                        />
                      </div>
                      {errorsPersona.primerApellido && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">Segundo apellido:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          disabled={actionForm === "editar"}
                          {...registerPersona("segundoApellido")}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mt-2">
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
                    <div className="col-12 col-md-3 mt-2">
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
                    <div className="col-12 col-md-3 mt-1">
                      <label htmlFor="exampleFormControlInput1">
                        Fecha de nacimiento{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="fechaNacimiento"
                        control={controlBuscar}
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
                            selected={formValues.fechaNacimiento}
                            value={formValues.fechaNacimiento}
                            onSelect={(e) => {
                              setFormValues({
                                ...formValues,
                                fechaNacimiento: e,
                              });
                            }}
                            className="form-control border rounded-pill px-3"
                            placeholderText="dd/mm/aaaa"
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
                    <div className="col-12 col-md-3 mt-2">
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
                </div>
                <Subtitle title={"Lugar de residencia"} mt={4} mb={0} />
                <div className="row mb-3 mt-2 mx-1">
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">País de residencia:</label>
                    <Controller
                      name="paisResidencia"
                      control={controlPersona}
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
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label text-terciary">
                      Departamento de residencia:{" "}
                    </label>
                    <Controller
                      name="Departamento_residencia"
                      control={controlPersona}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={departamentosOptions}
                          // value={
                          //   municipiosOptions[formValues.index_municipio_residencia]
                          // }
                          // onChange={(e) =>
                          //   setFormValues({
                          //     ...formValues,
                          //     index_municipio_residencia: getIndexBySelectOptions(
                          //       e.value,
                          //       municipiosOptions
                          //     ),
                          //   })
                          // }
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">
                      Municipio de residencia:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="municipio"
                      control={controlBuscar}
                      rules={{ required: true }}
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
                    {errorsPersona.municipio && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  {/* <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label className="ms-2">
                        Ubicacion geografica:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        {...registerPersona("ubicacionGeografica", {
                          required: true,
                        })}
                      />
                    </div>
                    {errorsPersona.ubicacionGeografica && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div> */}
                  <div className="col-md-8 col-10 mt-3">
                    <div className="mt-3 d-flex align-items-end">
                      <div className="col-10">
                        <label className="ms-2">
                          Dirección de residencia:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control rounded-pill px-3 border border-terciary"
                          type="text"
                          readOnly
                          {...registerPersona("direccion_residencia", {
                            required: true,
                          })}
                        />
                      </div>

                      <button
                        type="button"
                        className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                        onClick={() => setDireccionResidenciaIsOpen(true)}
                      >
                        Generar
                      </button>
                    </div>
                    {errorsPersona.direccion_residencia && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-4 mt-2">
                    <div className="mt-4">
                      <label className="ms-2">Referencia adicional:</label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="text"
                        {...registerPersona("referenciaAdicional")}
                      />
                    </div>
                  </div>
                </div>
                {/* DATOS LABORALES */}
                <Subtitle title={"Datos laborales"} mt={4} />
                <div className="row align-items-end mx-1">
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">País donde laboral:</label>
                    <Controller
                      name="paisLaboral"
                      control={controlPersona}
                      render={({ field }) => (
                        <Select
                          {...field}
                          // value={paisesOptions[formValues.paisResidencia]}
                          // onChange={(e) =>
                          //   setFormValues({
                          //     ...formValues,
                          //     paisResidencia: getIndexBySelectOptions(
                          //       e.value,
                          //       paisesOptions
                          //     ),
                          //   })
                          // }
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label text-terciary">
                      Departamento donde labora:{" "}
                    </label>
                    <Controller
                      name="Departamento_laboral"
                      control={controlPersona}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={departamentosOptions}
                          // value={
                          //   municipiosOptions[formValues.index_municipio_residencia]
                          // }
                          // onChange={(e) =>
                          //   setFormValues({
                          //     ...formValues,
                          //     index_municipio_residencia: getIndexBySelectOptions(
                          //       e.value,
                          //       municipiosOptions
                          //     ),
                          //   })
                          // }
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <label className="text-terciary">
                      Municipio donde labora:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="municipioDondeLabora"
                      control={controlPersona}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={municipiosOptions}
                          value={
                            municipiosOptions[formValues.municipioDondeLabora]
                          }
                          onChange={(e) => {
                            resetPersona({
                              ...watchPersona(),
                              municipioDondeLabora: e.value,
                            });
                            setFormValues({
                              ...formValues,
                              municipioDondeLabora: getIndexBySelectOptions(
                                e.value,
                                municipiosOptions
                              ),
                            });
                          }}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errorsPersona.municipioDondeLabora && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label className="ms-2">Email empresarial:</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        {...registerPersona("emailEmpresarial")}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label className="ms-2">Telefono empresa:</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="tel"
                        {...registerPersona("telefonoEmpresa2")}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 col-10 mt-3">
                    <div className="mt-3 d-flex align-items-end">
                      <div className="col-10">
                        <label className="text-terciary">
                          Dirección laboral:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control rounded-pill px-3 border border-terciary"
                          type="text"
                          readOnly
                          {...registerPersona("direccionLaboral", {
                            required: true,
                          })}
                        />
                        {errorsPersona.direccionLaboral && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                        onClick={() => setDireccionLaboralIsOpen(true)}
                      >
                        Generar
                      </button>
                    </div>
                    {errorsPersona.direccionLaboral && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <div className="mt-4">
                      <label className="ms-2">Referencia adicional:</label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="text"
                        {...registerPersona("referenciaAdicional")}
                      />
                    </div>
                  </div>
                </div>
                <Subtitle title={"Datos de notificación"} mt={4} mb={0} />
                <div className="mt-2 row mx-1 align-items-end">
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label text-terciary">
                      Pais notificación:
                    </label>
                    <Controller
                      name="cod_pais_notificacion_nal"
                      control={controlPersona}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={paisesOptions}
                          // value={
                          //   municipiosOptions[
                          //     formValues.index_cod_municipio_notificacion_nal
                          //   ]
                          // }
                          // onChange={(e) =>
                          //   setFormValues({
                          //     ...formValues,
                          //     index_cod_municipio_notificacion_nal:
                          //       getIndexBySelectOptions(e.value, municipiosOptions),
                          //   })
                          // }
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label text-terciary">
                      Departamento notificación:
                    </label>
                    <Controller
                      name="cod_departamento_notificacion_nal"
                      control={controlPersona}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={departamentosOptions}
                          // value={
                          //   municipiosOptions[
                          //     formValues.index_cod_municipio_notificacion_nal
                          //   ]
                          // }
                          // onChange={(e) =>
                          //   setFormValues({
                          //     ...formValues,
                          //     index_cod_municipio_notificacion_nal:
                          //       getIndexBySelectOptions(e.value, municipiosOptions),
                          //   })
                          // }
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <label className="form-label">
                      Municipio notificación:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="municipioNotificacion"
                      control={controlPersona}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={municipiosOptions}
                          value={
                            municipiosOptions[formValues.municipioNotificacion]
                          }
                          onChange={(e) => {
                            resetPersona({
                              ...watchPersona(),
                              municipioNotificacion: e.value,
                            });
                            setFormValues({
                              ...formValues,
                              municipioNotificacion: getIndexBySelectOptions(
                                e.value,
                                municipiosOptions
                              ),
                            });
                          }}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errorsPersona.municipioNotificacion && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label>
                        E-mail: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="email"
                        placeholder="E-mail"
                        {...registerPersona("eMail", { required: true })}
                      />
                    </div>
                    {errorsPersona.eMail && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label>
                        Celular: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="tel"
                        {...registerPersona("celular", { required: true, maxLength: 10, minLength: 10 })}
                      />
                    </div>
                    {errorsPersona.celular && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio, solo 10 caracteres 
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label className="ms-2">Telefono fijo:</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="tel"
                        {...registerPersona("telefonoFijo")}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 col-10 mt-3">
                    <div className="mt-3 d-flex align-items-end">
                      <div className="col-10">
                        <label className="text-terciary">
                          Dirección Notificaciones:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control rounded-pill px-3 border border-terciary"
                          type="text"
                          readOnly
                          {...registerPersona("direccionNotificaciones", {
                            required: true,
                          })}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                        onClick={() => setDireccionNotificacionIsOpen(true)}
                      >
                        Generar
                      </button>
                    </div>
                    {errorsPersona.direccionNotificaciones && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 mx-1">
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
            isOpenGenerator={direccionResidenciaIsOpen}
            setIsOpenGenerator={setDireccionResidenciaIsOpen}
            completeAddress={direccionResidenciaText}
            setCompleteAddress={setDireccionResidenciaText}
            reset={resetPersona}
            keyReset="direccion_residencia"
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

          <GeneradorDeDirecciones
            keyReset="direccionNotificaciones"
            reset={resetPersona}
            totalValuesForm={watchPersona()}
            isOpenGenerator={direccionNotificacionIsOpen}
            setIsOpenGenerator={setDireccionNotificacionIsOpen}
            completeAddress={direccionNotificacionText}
            setCompleteAddress={setDireccionNotificacionText}
          />

          <BusquedaAvanzadaModal
            isModalActive={busquedaAvanzadaIsOpen}
            setIsModalActive={setBusquedaAvanzadaIsOpen}
            formValues={formValuesSearch}
            setFormValues={setFormValuesSearch}
            reset={resetBuscar}
            tipoDocumentoOptions={tipoDocumentoOptions}
          />
        </div>
      </div>
    </div>
  );
};
export default AdministradorDePersonasScreen;
