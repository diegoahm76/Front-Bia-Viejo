import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
import Subtitle from "../../components/Subtitle";
import BusquedaAvanzadaModal from "../../components/BusquedaAvanzadaModal";
import DirecionResidenciaModal from "../../components/DirecionResidenciaModal";
import { getArrayFromStringDateAAAAMMDD } from "../../helpers/dateHelpers";
import botonBuscar from "../../assets/iconosBotones/buscar.svg";
import botonCancelar from "../../assets/iconosBotones/cancelar.svg";
import botonActualizar from "../../assets/iconosBotones/actualizar.svg";
import botonAgregar from "../../assets/iconosBotones/agregar.svg";

const AdministradorDePersonasScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const [yesOrNot, setYesOrNot] = useState(false);
  const [primeraVez, setPrimeraVez] = useState(true);

  const [sexoOptions, setSexoOptions] = useState([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [municipioResidenciaFiltered, setmunicipioResidenciaFiltered] =
    useState([]);
  const [municipioDondeLaboraFiltered, setMunicipioDondeLaboraFiltered] =
    useState([]);
  const [municipioNotificacionFiltered, setMunicipioNotificacionFiltered] =
    useState([]);
  const [formValuesSearch, setFormValuesSearch] = useState({
    index_tipo_documento: "",
  });
  const [lugarResidencia, setLugarResidencia] = useState({
    departamento: "",
  });
  const [datosLaborales, setDatosLaborales] = useState({
    departamento: "",
  });
  const [datosNotificacion, setDatosNotificacion] = useState({
    departamento: "",
  });
  const [formValues, setFormValues] = useState({
    tipoDocumento: null,
    digitoVerificacion: "",
    fechaNacimiento: "",
    estadoCivil: "",
    sexo: "",
    paisLaboral: "",
    paisNacimiento: "",
    paisResidencia: "",
    paisNotificacion: "",
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
      setLoading(true);
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
      setLoading(false);
    };
    getSelectsOptions();
  }, []);

  const onSubmitBuscar = async (data) => {
    // console.log(data);
    setLoading(true);
    try {
      const { data: dataPersonaObject } = await clienteAxios.get(
        `personas/get-personas-by-document/${data?.tipoDocumento.value}/${data?.numeroDocumento}`
      );

      const { data: dataPersona } = dataPersonaObject;
      console.log("dataPersona", dataPersona);
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
        return setActionForm(null);
      }

      setPrimeraVez(false);
      setActionForm("editar");

      const defaultValuesOverrite = {
        tipoDocumento:
          tipoDocumentoOptions[
            getIndexBySelectOptions(
              dataPersona.tipo_documento?.cod_tipo_documento,
              tipoDocumentoOptions
            )
          ],
        numeroDocumento2: dataPersona.numero_documento,
        nombreComercial: dataPersona.nombre_comercial,
        primerNombre: dataPersona.primer_nombre,
        segundoNombre: dataPersona.segundo_nombre,
        primerApellido: dataPersona.primer_apellido,
        segundoApellido: dataPersona.segundo_apellido,
        eMail: dataPersona.email,
        celular: dataPersona.telefono_celular.slice(2),
        emailEmpresarial: dataPersona.email_empresarial || null,
        telefonoFijo: dataPersona.telefono_fijo_residencial,
        telefonoEmpresa2: dataPersona.telefono_empresa_2,
        referenciaAdicional: dataPersona.direccion_residencia_ref,
        direccion_residencia: dataPersona.direccion_residencia,
        direccionLaboral: dataPersona.direccion_laboral,
        ubicacionGeografica: dataPersona.ubicacion_georeferenciada,
        direccionNotificaciones: dataPersona.direccion_notificaciones,
        municipioDondeLabora: dataPersona.cod_municipio_laboral_nal,
        municipioNotificacion: dataPersona.cod_municipio_notificacion_nal,
        fechaNacimiento: dataPersona.fecha_nacimiento,
      };
      resetDepartamentoYMunicipio(
        dataPersona.municipio_residencia,
        setLugarResidencia
      );
      const indexPaisLaboral = resetPaisDepartamentoYMunicipio(
        dataPersona.cod_municipio_laboral_nal,
        setDatosLaborales
      );
      const indexPaisNotificacion = resetPaisDepartamentoYMunicipio(
        dataPersona.cod_municipio_notificacion_nal,
        setDatosNotificacion
      );
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
        paisLaboral: indexPaisLaboral,
        paisNotificacion: indexPaisNotificacion,
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
          ? new Date(
              getArrayFromStringDateAAAAMMDD(dataPersona.fecha_nacimiento)
            )
          : "",
        id_persona: dataPersona.id_persona,
        tipoPersona: dataPersona.tipo_persona,
        digitoVerificacion: dataPersona.digito_verificacion,
      });

      resetPersona(defaultValuesOverrite);
    } catch (err) {
      console.log(err);
      if (err.response.data.detail) {
        Swal.fire({
          title:
            "No encontró ninguna persona natural con los parametros ingresados",
          text: "Quiere crear una persona natural?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            resetEmptyValues();
            setActionForm("Crear");
          } else {
            setActionForm(null);
          }
        });
      }
    }
    setLoading(false);
  };

  const resetDepartamentoYMunicipio = (
    municipioResidencia,
    setDepartamento
  ) => {
    const indexMunicipioResidencia = getIndexBySelectOptions(
      municipioResidencia,
      municipiosOptions
    );
    const departamentoIdentifier = municipiosOptions[
      indexMunicipioResidencia
    ]?.value.slice(0, 2);
    let indexDepartamento = null;
    departamentosOptions.forEach((departamento, index) => {
      if (departamento.value === departamentoIdentifier) {
        indexDepartamento = index;
      }
    });
    if (indexDepartamento !== null) {
      setDepartamento({
        departamento: departamentosOptions[indexDepartamento],
      });
    }
  };

  const resetPaisDepartamentoYMunicipio = (
    municipioResidencia,
    setDepartamento
  ) => {
    const indexMunicipioResidencia = getIndexBySelectOptions(
      municipioResidencia,
      municipiosOptions
    );
    const departamentoIdentifier = municipiosOptions[
      indexMunicipioResidencia
    ]?.value.slice(0, 2);
    let indexDepartamento = null;
    departamentosOptions.forEach((departamento, index) => {
      if (departamento.value === departamentoIdentifier) {
        indexDepartamento = index;
      }
    });
    if (indexDepartamento !== null) {
      let indexColombia = null;
      paisesOptions.forEach((pais, index) => {
        if (pais.value === "CO") {
          indexColombia = index;
        }
      });
      setDepartamento({
        departamento: departamentosOptions[indexDepartamento],
      });
      return indexColombia;
    } else {
      return null;
    }
  };

  const onSubmitPersona = async (data) => {
    setLoading(true);
    console.log("data para submit", data);
    const indicativo = "57";
    const updatedPersona = {
      tipo_persona: formValues.tipoPersona,
      id_persona: formValues.id_persona,
      tipo_documento: tipoDocumentoOptions[formValues.tipoDocumento]?.value,
      numero_documento: data.numeroDocumento2,
      digito_verificacion: formValues.digitoVerificacion,
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
      email_empresarial: data.emailEmpresarial || null,
      telefono_celular: indicativo + data.celular,
      telefono_fijo_residencial: data.telefonoFijo,
      telefono_empresa_2: data.telefonoEmpresa2,
      pais_residencia: paisesOptions[formValues.paisResidencia]?.value,
      municipio_residencia: municipiosOptions[formValues.municipio]?.value,
      cod_municipio_notificacion_nal:
        municipiosOptions[formValues.municipioNotificacion]?.value || null,
      cod_municipio_laboral_nal:
        municipiosOptions[formValues.municipioDondeLabora]?.value || null,
      direccion_residencia: data.direccion_residencia,
      direccion_residencia_ref: data.referenciaAdicional,
      direccion_laboral: data.direccionLaboral,
      direccion_notificaciones: data.direccionNotificaciones,
      ubicacion_georeferenciada: "mi casita 1",
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
        const { data: dataUpdate } = await clienteAxios.patch(
          `personas/persona-natural/user-with-permissions/update/${updatedPersona.tipo_documento}/${updatedPersona.numero_documento}/`,
          updatedPersona,
          config
        );
        console.log("dataUpdate", dataUpdate);
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

        console.log("data create persona", updatedPersona);

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
    setLugarResidencia({ departamento: "" });
    setDatosLaborales({ departamento: "" });
    setDatosNotificacion({ departamento: "" });
    setLoading(false);
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
      digitoVerificacion: "",
      sexo: "",
      estadoCivil: "",
      paisNacimiento: "",
      paisResidencia: "",
      paisLaboral: "",
      paisNotificacion: "",
      municipio: "",
      municipioDondeLabora: "",
      municipioNotificacion: "",
      fechaNacimiento: "",
      id_persona: "",
      tipoPersona: "",
      indicativoPais: "",
    });
  };

  const manejadorErroresSwitAlert = (err) => {
    console.log(err);
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
    } else if (err.response?.data?.detail) {
      Swal.fire({
        title: err.response?.data?.detail,
        //text: "Verifique los datos",
        icon: "info",
        confirmButtonColor: "#3BA9E0",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Aceptar",
      });
    } else {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
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

  const handleChangePaisResidencia = (e) => {
    const objectSend = {
      paisResidencia: getIndexBySelectOptions(e.value, paisesOptions),
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.municipio = null;
      resetPersona({
        ...watchPersona(),
        municipio: "",
      });
      setLugarResidencia({ ...lugarResidencia, departamento: "" });
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  };

  const handleChangePaisDondeLabora = (e) => {
    const objectSend = {
      paisLaboral: getIndexBySelectOptions(e.value, paisesOptions),
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.municipioDondeLabora = null;
      resetPersona({
        ...watchPersona(),
        municipioDondeLabora: "",
      });
      setDatosLaborales({ ...datosLaborales, departamento: "" });
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  };

  const handleChangePaisNotificacion = (e) => {
    const objectSend = {
      paisNotificacion: getIndexBySelectOptions(e.value, paisesOptions),
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.municipioNotificacion = null;
      resetPersona({
        ...watchPersona(),
        municipioNotificacion: "",
      });
      setDatosNotificacion({ ...datosNotificacion, departamento: "" });
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  };

  const getIndexColombia = () => {
    let indexColombia = null;
    paisesOptions.forEach((pais, index) => {
      if (pais.value === "CO") {
        indexColombia = index;
      }
    });
    return indexColombia;
  };

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

  useEffect(() => {
    if (!primeraVez) return;
    if (lugarResidencia.departamento === "") {
      setmunicipioResidenciaFiltered([]);
      setFormValues({ ...formValues, municipio: "" });
    } else {
      const municipioIndicadores = lugarResidencia.departamento?.value?.slice(
        0,
        2
      );
      const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
        const indicator = municipio.value.slice(0, 2);
        return municipioIndicadores === indicator;
      });
      setmunicipioResidenciaFiltered(municipiosCoincidentes);
      setFormValues({ ...formValues, municipio: 0 });
    }
  }, [lugarResidencia]);

  useEffect(() => {
    if (!primeraVez) return;
    if (datosLaborales.departamento === "") {
      setMunicipioDondeLaboraFiltered([]);
      setFormValues({ ...formValues, municipioDondeLabora: "" });
    } else {
      const municipioIndicadores = datosLaborales.departamento?.value?.slice(
        0,
        2
      );
      const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
        const indicator = municipio.value.slice(0, 2);
        return municipioIndicadores === indicator;
      });
      setMunicipioDondeLaboraFiltered(municipiosCoincidentes);
      setFormValues({ ...formValues, municipioDondeLabora: 0 });
    }
  }, [datosLaborales.departamento]);

  useEffect(() => {
    if (!primeraVez) return;
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

  useEffect(() => {
    setPrimeraVez(true);
  }, [actionForm]);

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <div className="row">
            <form onSubmit={handleSubmitBuscar(onSubmitBuscar)}>
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
                      className="form-control border rounded-pill px-3 border-terciary"
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
                    className="mb-0 btn-image text-capitalize bg-white border boder-none"
                    onClick={() => {
                      setActionForm(null);
                    }}
                  >
                    <img src={botonBuscar} alt="" title="Buscar" />
                  </button>
                  <button
                    type="button"
                    className="ms-3 btn bg-gradient-primary mb-0 text-uppercase"
                    onClick={() => setBusquedaAvanzadaIsOpen(true)}
                  >
                    Búsqueda avanzada
                  </button>
                </div>
              </div>
            </form>

            {actionForm && (
              <form onSubmit={handleSumbitPersona(onSubmitPersona)}>
                <Subtitle title={"Datos personales"} mt={4} mb={0} />
                <hr className="dark horizontal my-0" />
                <div className="mt-4 row mx-1">
                  <div className="row col-12 align-items-end">
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
                              value={
                                tipoDocumentoOptions[formValues.tipoDocumento]
                              }
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  tipoDocumento: getIndexBySelectOptions(
                                    e.value,
                                    tipoDocumentoOptions
                                  ),
                                });
                                resetPersona({
                                  ...watchPersona(),
                                  tipoDocumento2: e.value,
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
                    ) : (
                      <div className="col-12 col-md-3 mt-2">
                        <div>
                          <label className="ms-2">
                            Tipo documento:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control border rounded-pill px-3  border-terciary"
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
                          className="form-control border rounded-pill px-3 border-terciary"
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
                    <div className="col-md-3 col-12">
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
                          id="flexCheckDefault"
                          onClick={(e) => setYesOrNot(e.target.checked)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="text-terciary">
                          Digito de verificación:
                        </label>
                        <input
                          className="border border-terciary hola form-control border rounded-pill px-3 border-terciary"
                          type="number"
                          disabled={!yesOrNot}
                          // {...registerPersona("digitoVerificacion", {
                          //   maxLength: 1,
                          // })}
                          value={formValues.digito_verificacion}
                          onChange={handleMaxOneDigit}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="text-terciary">
                          Nombre comercial:
                        </label>
                        <input
                          className="form-control border rounded-pill px-3 border-terciary"
                          type="text"
                          disabled={!yesOrNot}
                          {...registerPersona("nombreComercial")}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">
                          Primer nombre: <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border rounded-pill px-3 border-terciary"
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
                          className="form-control border rounded-pill px-3 border-terciary"
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
                          className="form-control border rounded-pill px-3 border-terciary"
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
                          className="form-control border rounded-pill px-3 border-terciary"
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
                        control={controlPersona}
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
                            className="form-control border rounded-pill px-3 border-terciary"
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
                <div className="row mb-3 mt-2 mx-1 align-items-end">
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">País de residencia:</label>
                    <Controller
                      name="paisResidencia"
                      control={controlPersona}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={paisesOptions[formValues.paisResidencia]}
                          onChange={handleChangePaisResidencia}
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  {formValues.paisResidencia === getIndexColombia() ? (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label text-terciary">
                        Departamento de residencia:{" "}
                      </label>
                      <Select
                        options={departamentosOptions}
                        isDisabled={
                          paisesOptions[formValues.paisResidencia]?.value !==
                          "CO"
                        }
                        onChange={(e) => {
                          setLugarResidencia({ departamento: e });
                        }}
                        value={lugarResidencia.departamento}
                        placeholder="Seleccionar"
                      />
                    </div>
                  ) : (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label text-terciary">
                        Departamento de residencia:{" "}
                      </label>
                      <Select
                        isDisabled
                        placeholder="Seleccionar"
                        value={"Seleccionar"}
                      />
                    </div>
                  )}
                  {formValues.paisResidencia === getIndexColombia() ? (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label">
                        Municipio de residencia:{" "}
                        {/* <span className="text-danger">*</span> */}
                      </label>
                      <Controller
                        name="municipio"
                        control={controlPersona}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isDisabled={
                              paisesOptions[formValues.paisResidencia]
                                ?.value !== "CO"
                            }
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
                            options={municipioResidenciaFiltered}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label">
                        Municipio de residencia:{" "}
                      </label>
                      <Select
                        isDisabled
                        placeholder="Seleccionar"
                        value={"Seleccionar"}
                      />
                    </div>
                  )}
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
                    <label className="form-label">País donde labora:</label>
                    <Controller
                      name="paisLaboral"
                      control={controlPersona}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={paisesOptions[formValues.paisLaboral]}
                          onChange={handleChangePaisDondeLabora}
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  {formValues.paisLaboral === getIndexColombia() ? (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label text-terciary">
                        Departamento donde labora:{" "}
                      </label>
                      <Select
                        options={departamentosOptions}
                        isDisabled={
                          paisesOptions[formValues.paisLaboral]?.value !== "CO"
                        }
                        onChange={(e) => {
                          setDatosLaborales({
                            ...datosLaborales,
                            departamento: e,
                          });
                        }}
                        value={datosLaborales.departamento}
                        placeholder="Seleccionar"
                      />
                    </div>
                  ) : (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label text-terciary">
                        Departamento donde labora:{" "}
                      </label>
                      <Select
                        isDisabled
                        placeholder="Seleccionar"
                        value={"Seleccionar"}
                      />
                    </div>
                  )}

                  {formValues.paisLaboral === getIndexColombia() ? (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label">
                        Municipio donde labora:{" "}
                      </label>
                      <Controller
                        name="municipioDondeLabora"
                        control={controlPersona}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isDisabled={
                              paisesOptions[formValues.paisLaboral]?.value !==
                              "CO"
                            }
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
                            options={municipioDondeLaboraFiltered}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label">
                        Municipio donde labora:{" "}
                      </label>
                      <Select
                        isDisabled
                        placeholder="Seleccionar"
                        value={"Seleccionar"}
                      />
                    </div>
                  )}
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label className="ms-2">Email empresarial:</label>
                      <input
                        className="form-control border rounded-pill px-3 border-terciary"
                        type="text"
                        {...registerPersona("emailEmpresarial")}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label className="ms-2">Teléfono empresa:</label>
                      <input
                        className="form-control border rounded-pill px-3 border-terciary"
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
                </div>
                <Subtitle title={"Datos de notificación"} mt={4} mb={0} />
                <div className="mt-2 row mx-1 align-items-end">
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label text-terciary">
                      País notificación:
                    </label>
                    <Controller
                      name="cod_pais_notificacion_nal"
                      control={controlPersona}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={paisesOptions[formValues.paisNotificacion]}
                          options={paisesOptions}
                          onChange={handleChangePaisNotificacion}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  {formValues.paisNotificacion === getIndexColombia() ? (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label text-terciary">
                        Departamento notificación:{" "}
                      </label>
                      <Select
                        options={departamentosOptions}
                        isDisabled={
                          paisesOptions[formValues.paisNotificacion]?.value !==
                          "CO"
                        }
                        onChange={(e) => {
                          setDatosNotificacion({
                            ...datosNotificacion,
                            departamento: e,
                          });
                        }}
                        value={datosNotificacion.departamento}
                        placeholder="Seleccionar"
                      />
                    </div>
                  ) : (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label text-terciary">
                        Departamento notificación:{" "}
                      </label>
                      <Select
                        isDisabled
                        placeholder="Seleccionar"
                        value={"Seleccionar"}
                      />
                    </div>
                  )}
                  {formValues.paisNotificacion === getIndexColombia() ? (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label">
                        Municipio notificación:{" "}
                      </label>
                      <Controller
                        name="municipioNotificacion"
                        control={controlPersona}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isDisabled={
                              paisesOptions[formValues.paisNotificacion]
                                ?.value !== "CO"
                            }
                            value={
                              municipiosOptions[
                                formValues.municipioNotificacion
                              ]
                            }
                            onChange={(e) =>
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
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <div className="col-12 col-md-3 mt-3">
                      <label className="form-label">
                        Municipio notificación:{" "}
                      </label>
                      <Select
                        isDisabled
                        placeholder="Seleccionar"
                        value={"Seleccionar"}
                      />
                    </div>
                  )}
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label>
                        E-mail: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border-terciary"
                        type="email"
                        disabled={actionForm === "editar"}
                        readOnly={actionForm === "editar"}
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
                        className="form-control border rounded-pill px-3 border-terciary"
                        type="tel"
                        {...registerPersona("celular", {
                          required: true,
                          maxLength: 10,
                          minLength: 10,
                        })}
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
                      <label className="ms-2">Teléfono fijo:</label>
                      <input
                        className="form-control border rounded-pill px-3 border-terciary"
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
                    className="mb-0 btn-image text-capitalize bg-white border boder-none"
                    type="button"
                    onClick={handleCancelAction}
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
                    ) : actionForm === "editar" ? (
                      <img src={botonActualizar} alt="" title="Actualizar" />
                    ) : (
                      <img src={botonAgregar} alt="" title="Crear" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          <DirecionResidenciaModal
            isModalActive={direccionResidenciaIsOpen}
            setIsModalActive={setDireccionResidenciaIsOpen}
            completeAddress={direccionResidenciaText}
            setCompleteAddress={setDireccionResidenciaText}
            reset={resetPersona}
            keyReset="direccion_residencia"
            watch={watchPersona}
          />

          <DirecionResidenciaModal
            isModalActive={direccionLaboralIsOpen}
            setIsModalActive={setDireccionLaboralIsOpen}
            completeAddress={direccionLaboralText}
            setCompleteAddress={setDireccionLaboralText}
            reset={resetPersona}
            keyReset="direccionLaboral"
            watch={watchPersona}
          />

          <DirecionResidenciaModal
            keyReset="direccionNotificaciones"
            reset={resetPersona}
            watch={watchPersona}
            isModalActive={direccionNotificacionIsOpen}
            setIsModalActive={setDireccionNotificacionIsOpen}
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
