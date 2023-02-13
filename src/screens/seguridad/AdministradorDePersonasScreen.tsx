import React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Subtitle from "../../components/Subtitle";
import BusquedaAvanzadaModal from "../../components/BusquedaAvanzadaModal";
import DirecionResidenciaModal from "../../components/DirecionResidenciaModal";

import botonCancelar from "../../assets/iconosBotones/cancelar.svg";
import botonActualizar from "../../assets/iconosBotones/actualizar.svg";
import botonAgregar from "../../assets/iconosBotones/agregar.svg";

interface ISelectOptions {
  label: string;
  value: string;
}

export const initialOptions: ISelectOptions[] = [
  {
    label: "",
    value: "",
  },
];

const modelCreate = {
  tipo_documento: { label: "", value: "" },
  numero_documento: "",
  fecha_nacimiento: "",
  fecha_nacimientoInput: '',
  estado_civil: { label: "", value: "" },
  sexo: { label: "", value: "" },
  cod_pais_nacionalidad_empresa: { label: "Colombia", value: "CO" },
  pais_nacimiento: { label: "Colombia", value: "CO" },
  pais_residencia: { label: "Colombia", value: "CO" },
  departamento_residencia: { label: "", value: "" },
  departamento_labora: { label: "", value: "" },
  departamento_notificacion: { label: "", value: "" },
  municipio_residencia: { label: "", value: "" },
  pais_notificacion: { label: "Colombia", value: "CO" },
  municipio: { label: "", value: "" },
  municipio_labora: { label: "", value: "" },
  municipio_notificacion: { label: "", value: "" },
  direccion_laboral: "",
  direccion_residencia: "",
  direccion_notificiaciones: "",
  id_persona: 0,
  tipo_persona: "",
  indicativoPais: 0,
  digito_verificacion: "",
  nombre_comercial: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  email_empresarial: "",
  telefono_empresa_2: "",
  telefono_fijo: "",
  email: "",
  telefono_celular: "",
};

const busquedaAvanzadaModel = {
  tipoDocumento: { value: "", label: "" },
  cedula: "",
  nombreCompleto: "",
  idResponsable: 0,
};

const AdministradorDePersonasScreen = () => {
  const navigate = useNavigate();
  const [busquedaModel, setBusquedaModel] = useState(busquedaAvanzadaModel);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [direccionResidenciaIsOpen, setDireccionResidenciaIsOpen] =
    useState(false);
  const [direccionResidenciaText, setDireccionResidenciaText] = useState("");
  const [direccionNotificacionIsOpen, setDireccionNotificacionIsOpen] =
    useState(false);
  const [direccionNotificacionText, setDireccionNotificacionText] =
    useState("");
  const [direccionLaboralIsOpen, setDireccionLaboralIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(false);
  const [direccionLaboralText, setDireccionLaboralText] = useState("");
  const [busquedaAvanzadaIsOpen, setBusquedaAvanzadaIsOpen] = useState(false);

  const [yesOrNot, setYesOrNot] = useState(false);

  const [sexoOptions, setSexoOptions] = useState<ISelectOptions[]>([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState<
    ISelectOptions[]
  >([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState<
    ISelectOptions[]
  >([]);
  const [paisesOptions, setPaisesOptions] = useState<ISelectOptions[]>([]);
  const [departamentosOptions, setDepartamentosOptions] = useState<
    ISelectOptions[]
  >([]);
  const [municipiosOptions, setMunicipiosOptions] = useState<ISelectOptions[]>(
    []
  );
  const [municipioResidenciaFiltered, setmunicipioResidenciaFiltered] =
    useState<ISelectOptions[]>([]);
  const [municipioDondeLaboraFiltered, setMunicipioDondeLaboraFiltered] =
    useState<ISelectOptions[]>([]);
  const [municipioNotificacionFiltered, setMunicipioNotificacionFiltered] =
    useState<ISelectOptions[]>([]);

  const [formValues, setFormValues] = useState(modelCreate);
  console.log(formValues, "este es ");

  const {
    reset: resetPersona,
    register: registerPersona,
    handleSubmit: handleSumbitPersona,
    control: controlPersona,
    watch: watchPersona,
    setValue,
    formState: { errors: errorsPersona },
  } = useForm();
  const dataPersona = watchPersona();
  const {
    reset: resetBuscar,
    handleSubmit: handleSubmitBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const notificationSuccess = (message = "Proceso Exitoso") =>
    Swal.mixin({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    }).fire();

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
    setLoading(true);
    try {
      const { data: dataPersonaObject } = await clienteAxios.get(
        `personas/get-personas-by-document/${busquedaModel.tipoDocumento.value}/${busquedaModel.cedula}`
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
        return setIsVisible(false);
      }
      //cambiar
      setIsVisible(true);
      setIsEdit(true);
      //metodo falta settear los datos
      const paisResidencia = paisesOptions.filter((pais) => {
        return pais.value === dataPersona.pais_residencia;
      });

      const paisLabora = paisesOptions.filter((pais) => {
        return pais.value === dataPersona.cod_pais_nacionalidad_empresa;
      });

      const paisNotificacion = paisesOptions.filter((pais) => {
        return pais.value === dataPersona.pais_residencia;
      });

      const municipioResidencia = municipiosOptions.filter((municipio) => {
        return municipio.value === dataPersona.municipio_residencia;
      });

      const municipioNotificacion = municipiosOptions.filter((municipio) => {
        return municipio.value === dataPersona.cod_municipio_notificacion_nal;
      });
      //Filtra el departamento de la persona
      const departamentoNotificacion = departamentosOptions.filter(
        (departamento) => {
          return (
            departamento.value ===
            dataPersona?.cod_municipio_notificacion_nal?.substr(-20, 2)
          );
        }
      );
      const departamentoLaboral = departamentosOptions.filter(
        (departamento) => {
          return (
            departamento.value ===
            dataPersona?.cod_municipio_laboral_nal?.substr(-20, 2)
          );
        }
      );
      const departamentoResidencia = departamentosOptions.filter(
        (departamento) => {
          return (
            departamento.value ===
            dataPersona?.municipio_residencia?.substr(-20, 2)
          );
        }
      );

      const municipioLaboral = municipiosOptions.filter((municipio) => {
        return municipio.value === dataPersona.cod_municipio_laboral_nal;
      });

      const paisNacimiento = paisesOptions.filter((pais) => {
        return pais.value === dataPersona.pais_nacimiento;
      });
      const sexo = sexoOptions.filter(
        (sexo) => sexo.value === dataPersona.sexo
      );

      setValue("direccionNotificaciones", dataPersona.direccion_notificaciones);
      setValue("direccionLaboral", dataPersona.direccion_laboral);
      setValue("direccion_residencia", dataPersona.direccion_residencia);
      let form = {
        ...dataPersona,
        fecha_nacimiento: dataPersona.fecha_nacimiento,
        pais_notificacion: paisNotificacion[0] || {
          label: "",
          value: "",
        },
        direccion_laboral: dataPersona.direccion_laboral,
        direccion_residencia: dataPersona.direccion_residencia,
        direccion_notificaciones: dataPersona.direccion_notificaciones,
        municipio: { label: "", value: "" },
        municipio_labora: municipioLaboral[0] || { label: "", value: "" },
        municipio_notificacion: municipioNotificacion || {
          label: "",
          value: "",
        },
        departamento_notificacion: departamentoNotificacion || {
          label: "",
          value: "",
        },
        departamento_labora: departamentoLaboral || {
          label: "",
          value: "",
        },
        departamento_residencia: departamentoResidencia || {
          label: "",
          value: "",
        },
        tipo_documento: {
          label: dataPersona.tipo_documento.cod_tipo_documento,
          value: dataPersona.tipo_documento.nombre,
        } || { label: "", value: "" },
        sexo: sexo || { label: "", value: "" },
        estado_civil: {
          value: dataPersona.estado_civil?.cod_estado_civil,
          label: dataPersona.estado_civil?.nombre,
        } || { label: "", value: "" },
        pais_residencia: paisResidencia[0] || { label: "", value: "" },
        pais_nacimiento: paisNacimiento[0] || { label: "", value: "" },
        cod_municipio_notificacion_nal: municipioNotificacion[0],
        municipio_residencia: municipioResidencia[0] || {
          label: "",
          value: "",
        },
        cod_pais_nacionalidad_empresa: paisLabora[0] || {
          label: "",
          value: "",
        },
      };

      setFormValues(form);
      setViewDate(false);
    } catch (err: any) {
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
            setIsVisible(true);
            setIsEdit(false);
            setViewDate(true);
            setFormValues(modelCreate)
            resetPersona();
          } else {
            setIsVisible(false);
          }
        });
      }
    } finally {
      setLoading(false);
    }

  };

  const onSubmitPersona = async (data) => {
    // setLoading(true);
    const updatedPersona = {
      tipo_persona: "N",
      id_persona: formValues.id_persona !== 0 ? formValues.id_persona : null,
      tipo_documento: formValues.tipo_documento.value,
      numero_documento: formValues.numero_documento,
      digito_verificacion: formValues.digito_verificacion,
      nombre_comercial: formValues.nombre_comercial,
      primer_nombre: formValues.primer_nombre,
      segundo_nombre: formValues.segundo_nombre,
      primer_apellido: formValues.primer_apellido,
      segundo_apellido: formValues.segundo_apellido,
      sexo: formValues.sexo?.value,
      estado_civil: formValues.estado_civil?.value,
      pais_nacimiento: formValues.pais_nacimiento?.value,
      fecha_nacimiento: formValues.fecha_nacimiento,
      email: formValues.email, //Queda por comprobar si mejor se bloquea
      email_empresarial: formValues.email_empresarial || null,
      telefono_celular: formValues.telefono_celular,
      telefono_fijo_residencial: formValues.telefono_fijo,
      telefono_empresa_2: formValues.telefono_empresa_2,
      pais_residencia: formValues.pais_residencia?.value,
      municipio_residencia: formValues.municipio_residencia?.value,
      departamento_notificacion: formValues.departamento_notificacion?.value, //no modificar
      cod_municipio_notificacion_nal:
        formValues.municipio_notificacion.value || null,
      cod_municipio_laboral_nal: formValues.municipio_labora.value || null,
      cod_pais_nacionalidad_empresa: formValues.cod_pais_nacionalidad_empresa?.value,
      direccion_residencia: data.direccion_residencia, //no modificar
      direccion_residencia_ref: data.referenciaAdicional, // no modificar
      direccion_laboral: data.direccionLaboral, //no modificar
      direccion_notificaciones: data.direccionNotificaciones, // no modificar
      ubicacion_georeferenciada: "villavicencio-meta",
      id_cargo: null,
      id_unidad_organizacional_actual: null,
      justificacion_cambio: null,
    };
    console.log(updatedPersona, "updatedPersona");
    if (isEdit) {
      try {
        const { data: dataUpdate } = await clienteAxios.patch(
          `personas/persona-natural/user-with-permissions/update/${formValues.tipo_documento.label}/${updatedPersona.numero_documento}/`,
          updatedPersona
        );
        notificationSuccess(dataUpdate.message);
        setIsVisible(false);
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    } else {
      try {
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
            setIsVisible(false);
          }
        });
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    }
    // setLoading(false);
  };

  const manejadorErroresSwitAlert = (err) => {
    console.log(err);
    if (err.response?.data?.email && err.response?.data?.numero_documento) {
      Swal.fire({
        // title: "Este documento y correo ya estan relacionados",
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
  console.log(viewDate, "viewDate");
  const handleCancelAction = () => {
    setIsVisible(false);
  };

  const handleChange = (e) => {
    const busqueda = { ...busquedaModel };
    busqueda.cedula = e.target.value;
    setBusquedaModel(busqueda);
  };

  const changeSelectTipoDocumentoBusqueda = (e) => {
    let busqueda = { ...busquedaModel };
    busqueda.tipoDocumento = {
      value: e.value,
      label: e.label,
    };
    setValue("tipo_documento", busqueda.tipoDocumento);
    setBusquedaModel(busqueda);
  };

  //modelo

  const handleFechaNacimiento = (e) => {
    let form = { ...formValues };
    form.fecha_nacimiento = e;
    setValue("fecha_nacimiento", form.fecha_nacimiento);
    setFormValues(form);
  };

  const handleChangeCreate = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const changeSelectSexo = (e) => {
    let form = { ...formValues };
    form.sexo = {
      value: e.value,
      label: e.label,
    };
    setValue("sexo", form.sexo);
    setFormValues(form);
  };

  const changeSelectEstadoCivil = (e) => {
    let form = { ...formValues };
    form.estado_civil = {
      value: e.value,
      label: e.label,
    };
    setValue("estadoCivil", form.estado_civil);
    setFormValues(form);
  };

  const changeSelectPaisNacimiento = (e) => {
    let form = { ...formValues };
    form.pais_nacimiento = {
      value: e.value,
      label: e.label,
    };
    setValue("pais_nacimiento", form.pais_nacimiento);
    setFormValues(form);
  };

  const changeSelectPaisResidencia = (e) => {
    let form = { ...formValues };
    form.pais_residencia = {
      value: e.value,
      label: e.label,
    };

    setValue("pais_residencia", form.pais_residencia);
    setFormValues(form);
  };

  const changeSelectDepartamentoResidencia = (e) => {
    let form = { ...formValues };
    form.departamento_residencia = {
      value: e.value,
      label: e.label,
    };
    setValue("departamento_residencia", form.departamento_residencia);
    setFormValues(form);

    let municipiosFiltered = municipiosOptions.filter((municipio) => {
      let indicator = municipio.value.slice(0, 2);
      return indicator === form.departamento_residencia.value;
    });

    setmunicipioResidenciaFiltered(municipiosFiltered);
  };

  const changeSelectMunicipioResidencia = (e) => {
    let form = { ...formValues };
    form.municipio_residencia = {
      value: e.value,
      label: e.label,
    };
    setValue("municipio_residencia", form.municipio_residencia);
    setFormValues(form);
  };

  const changeSelectPaisLabora = (e) => {
    let form = { ...formValues };
    form.cod_pais_nacionalidad_empresa = {
      value: e.value,
      label: e.label,
    };
    setValue(
      "cod_pais_nacionalidad_empresa",
      form.cod_pais_nacionalidad_empresa
    );
    setFormValues(form);
  };

  const changeSelectDepartamentoLabora = (e) => {
    let form = { ...formValues };
    form.departamento_labora = {
      value: e.value,
      label: e.label,
    };
    setValue("departamento_labora", form.departamento_labora);
    setFormValues(form);

    let municipiosFiltered = municipiosOptions.filter((municipio) => {
      let indicator = municipio.value.slice(0, 2);
      return indicator === form.departamento_labora.value;
    });

    setMunicipioDondeLaboraFiltered(municipiosFiltered);
  };

  const changeSelectMunicipioLabora = (e) => {
    let form = { ...formValues };
    form.municipio_labora = {
      value: e.value,
      label: e.label,
    };
    setValue("municipio_labora", form.municipio_labora);
    setFormValues(form);
  };

  const changeSelectPaisNotificacion = (e) => {
    let form = { ...formValues };
    form.pais_notificacion = {
      value: e.value,
      label: e.label,
    };
    setValue("pais_notificacion", form.pais_notificacion);
    setFormValues(form);
  };

  const changeSelectDepartamentoNotificacion = (e) => {
    let form = { ...formValues };
    form.departamento_notificacion = {
      value: e.value,
      label: e.label,
    };
    setValue("departamento_notificacion", form.departamento_notificacion);
    setFormValues(form);

    let municipiosFiltered = municipiosOptions.filter((municipio) => {
      let indicator = municipio.value.slice(0, 2);
      return indicator === form.departamento_notificacion.value;
    });

    setMunicipioNotificacionFiltered(municipiosFiltered);
  };

  const changeSelectMunicipioNotificacion = (e) => {
    let form = { ...formValues };
    form.municipio_notificacion = {
      value: e.value,
      label: e.label,
    };
    setValue("municipio_notificacion", form.municipio_notificacion);
    setFormValues(form);
  };

  const changeSelectTipoDocumento = (e) => {
    let form = { ...formValues };
    form.tipo_documento = {
      value: e.value,
      label: e.label,
    };
    setValue("tipo_documento", form.tipo_documento);
    setFormValues(form);
  };

  console.log(formValues.cod_pais_nacionalidad_empresa, "Laboral");

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
              <div className="mt-4 row ">
                <div className="col-12 col-md-3">
                  <label className="form-label">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>
                  <Select
                    name="tipo_documento"
                    value={busquedaModel.tipoDocumento}
                    options={tipoDocumentoOptions}
                    placeholder="Seleccionar"
                    onChange={changeSelectTipoDocumentoBusqueda}
                  //required={true}
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

                      name="numeroDocumento"
                      value={busquedaModel.cedula}
                      onChange={handleChange}
                      //required={true}
                      maxLength={15}
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
                <div className="col-12 col-md-6 ">
                  <button
                    type="submit"
                    className="mt-3 btn-image text-capitalize bg-white border boder-none"
                    onClick={onSubmitBuscar}
                  >
                    <i
                      className="mt-3 fa-solid fa-magnifying-glass fs-3"
                      title="Buscar"
                    ></i>
                  </button>
                  <button
                    type="button"
                    className="mt-2 ms-3 btn bg-gradient-primary  text-uppercase"
                    onClick={() => setBusquedaAvanzadaIsOpen(true)}
                  >
                    Búsqueda avanzada
                  </button>
                </div>
              </div>
            </form>

            {isVisible && (
              <form onSubmit={handleSumbitPersona(onSubmitPersona)}>
                <Subtitle title={"Datos personales"} mt={4} mb={0} />
                <hr className="dark horizontal my-0" />
                <div className="mt-4 row mx-1">
                  <div className="row col-12 align-items-end">
                    <div className="col-12 col-md-3 mt-2">
                      <label className="form-label">
                        Tipo de documento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        name="tipo_documento"
                        value={formValues.tipo_documento}
                        onChange={changeSelectTipoDocumento}
                        options={tipoDocumentoOptions}
                        placeholder="Seleccionar"
                        isDisabled
                      />

                      {errorsPersona.tipoDocumento2 && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>

                    <div className="col-12 col-md-3 mt-2">
                      <div>
                        <label className="ms-2">
                          Número de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border rounded-pill px-3 border-terciary"
                          type="text"
                          maxLength={15}
                          name="numero_documento"
                          value={formValues.numero_documento}
                          onChange={handleChangeCreate}
                          disabled={isEdit}
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
                          onClick={(e: any) => setYesOrNot(e.target.checked)}
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
                          type="text"
                          disabled={!yesOrNot}
                          maxLength={1}
                          name="digito_verificacion"
                          value={formValues.digito_verificacion}
                          onChange={handleChangeCreate}
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
                          name="nombre_comercial"
                          value={formValues.nombre_comercial}
                          onChange={handleChangeCreate}
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
                          disabled={isEdit}
                          name="primer_nombre"
                          value={formValues.primer_nombre}
                          onChange={handleChangeCreate}
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
                          disabled={isEdit}
                          name="segundo_nombre"
                          value={formValues.segundo_nombre}
                          onChange={handleChangeCreate}
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
                          disabled={isEdit}
                          name="primer_apellido"
                          value={formValues.primer_apellido}
                          onChange={handleChangeCreate}
                        //required={true}
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
                          disabled={isEdit}
                          name="segundo_apellido"
                          onChange={handleChangeCreate}
                          value={formValues.segundo_apellido}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <label className="form-label">Sexo:</label>

                      <Select
                        name="sexo"
                        options={sexoOptions}
                        value={formValues.sexo}
                        onChange={changeSelectSexo}
                        placeholder="Seleccionar"
                      />
                    </div>
                    <div className="col-12 col-md-3 mt-2">
                      <label className="form-label">Estado civil:</label>
                      <Select
                        value={formValues.estado_civil}
                        onChange={changeSelectEstadoCivil}
                        options={estadoCivilOptions}
                        placeholder="Seleccionar"
                      />
                    </div>
                    {viewDate && (
                      <div className="col-12 col-md-3 mt-1">
                        <label htmlFor="exampleFormControlInput1">
                          Fecha de nacimiento{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="fecha_nacimientoInput"
                          control={controlPersona}
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
                              selected={dataPersona.fecha_nacimientoInput}
                              className="form-control border border-terciary rounded-pill px-3"
                              maxDate={new Date()}
                              dateFormat="dd-MM-yyyy"
                            />
                          )}
                        />
                        {errorsPersona.fecha_nacimientoInput && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    )}
                    {!viewDate && (
                      <div className="col-12 col-md-3 mt-1">
                        <label htmlFor="exampleFormControlInput1">
                          Fecha de nacimiento{" "}
                          <span className="text-danger">*</span>
                        </label>

                        <input
                          className="form-control border rounded-pill px-3 border-terciary"
                          type="text"
                          disabled={true}
                          name="segundo_apellido"
                          onChange={handleChangeCreate}
                          value={formValues.fecha_nacimiento}
                        />
                        {errorsPersona.fechaNacimiento && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="col-12 col-md-3 mt-2">
                      <label className="form-label">País de nacimiento:</label>

                      <Select
                        value={formValues.pais_nacimiento}
                        onChange={changeSelectPaisNacimiento}
                        options={paisesOptions}
                        placeholder="Seleccionar"
                      />
                    </div>
                  </div>
                </div>
                <Subtitle title={"Lugar de residencia"} mt={4} mb={0} />
                <div className="row mb-3 mt-2 mx-1 align-items-end">
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">País de residencia:</label>

                    <Select
                      value={formValues.pais_residencia}
                      onChange={changeSelectPaisResidencia}
                      options={paisesOptions}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label text-terciary">
                      Departamento de residencia:{" "}
                    </label>
                    <Select
                      value={formValues.departamento_residencia}
                      isDisabled={formValues.pais_residencia.value !== "CO"}
                      onChange={changeSelectDepartamentoResidencia}
                      options={departamentosOptions}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">
                      Municipio de residencia:{" "}
                    </label>
                    <Select
                      value={formValues.municipio_residencia}
                      onChange={changeSelectMunicipioResidencia}
                      isDisabled={formValues.pais_residencia.value !== "CO"}
                      options={municipioResidenciaFiltered}
                      placeholder="Seleccionar"
                    />
                  </div>

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
                            //required: true,
                          })}
                        />
                      </div>

                      <button
                        type="button"
                        className="mx-3 btn bg-gradient-primary text-capitalize mb-0 mt-3"
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
                    <label className="form-label text-terciary">
                      Departamento donde labora:{" "}
                    </label>
                    <Select
                      options={departamentosOptions}

                      onChange={changeSelectDepartamentoLabora}
                      value={formValues.departamento_labora}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">
                      Municipio donde labora:{" "}
                    </label>

                    <Select

                      value={formValues.municipio_labora}
                      onChange={changeSelectMunicipioLabora}
                      options={municipioDondeLaboraFiltered}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label className="ms-2">Email empresarial:</label>
                      <input
                        className="form-control border rounded-pill px-3 border-terciary"
                        type="email"
                        name="email_empresarial"
                        value={formValues.email_empresarial}
                        onChange={handleChangeCreate}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label className="ms-2">Teléfono empresa:</label>
                      <input
                        className="form-control border rounded-pill px-3 border-terciary"
                        type="tel"
                        maxLength={10}
                        minLength={10}
                        name="telefono_empresa_2"
                        value={formValues.telefono_empresa_2}
                        onChange={handleChangeCreate}
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
                            //required: true,
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
                        className="mx-3 btn bg-gradient-primary text-capitalize mb-0 mt-3"
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
                      Departamento notificación:{" "}
                    </label>
                    <Select
                      options={departamentosOptions}
                      onChange={changeSelectDepartamentoNotificacion}
                      value={formValues.departamento_notificacion}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">
                      Municipio notificación:{" "}
                    </label>
                    <Select
                      value={formValues.municipio_notificacion}
                      onChange={changeSelectMunicipioNotificacion}
                      // isDisabled={formValues.pais_notificacion.value !== "CO"}
                      options={municipioNotificacionFiltered}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-2">
                    <div>
                      <label>
                        E-mail: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border-terciary"
                        type="email"
                        disabled={isEdit}
                        placeholder="E-mail"
                        //required={true}
                        name="email"
                        onChange={handleChangeCreate}
                        value={formValues.email}
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
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <label>Indicativo</label>
                        <input
                          className="form-control border rounded-pill  border-terciary "
                          type="text"
                          maxLength={10}
                          minLength={10}
                          name="celular"
                          disabled
                          value={"57"}
                          onChange={handleChangeCreate}
                        />
                      </div>
                      <div className="col-6 col-md-8">
                        <label>Celular</label>
                        <input
                          className="mt-1 form-control border rounded-pill  border-terciary"
                          type="text"
                          maxLength={10}
                          minLength={10}
                          name="celular"
                          disabled
                          value={formValues.telefono_celular.slice(2)}
                          onChange={handleChangeCreate}
                        />
                      </div>
                      {errorsPersona.telefono_celular && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio, solo 10 caracteres
                          </small>
                        </div>
                      )}
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
                            //required: true,
                          })}
                        />
                      </div>
                      <button
                        type="button"
                        className="mx-3 btn bg-gradient-primary text-capitalize mb-0 mt-3"
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
                    ) : isEdit ? (
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
            setModel={setBusquedaModel}
            reset={resetBuscar}
            tipoDocumentoOptions={tipoDocumentoOptions}
          />
        </div>
      </div>
    </div>
  );
};
export default AdministradorDePersonasScreen;
