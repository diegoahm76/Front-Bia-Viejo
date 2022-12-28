import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Subtitle from "../../components/Subtitle";
import BusquedaAvanzadaModal from "../../components/BusquedaAvanzadaModal";
import DirecionResidenciaModal from "../../components/DirecionResidenciaModal";

import botonBuscar from "../../assets/iconosBotones/buscar.svg";
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
  fecha_nacimiento: new Date(),
  estadoCivil: { label: "", value: "" },
  sexo: { label: "", value: "" },
  pais_labora: { label: "", value: "" },
  pais_nacimiento: { label: "", value: "" },
  pais_residencia: { label: "", value: "" },
  departamento_residencia: { label: "", value: "" },
  departamento_labora: { label: "", value: "" },
  departamento_notificacion: { label: "", value: "" },
  municipio_residencia: { label: "", value: "" },
  pais_notificacion: { label: "", value: "" },
  municipio: { label: "", value: "" },
  municipio_labora: { label: "", value: "" },
  municipio_notificacion: { label: "", value: "" },
  id_persona: 0,
  tipo_persona: "",
  indicativoPais: 0,
  digito_verificacion: "",
  nombre_comercial: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
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

  const [actionForm, setActionForm] = useState("");
  const [yesOrNot, setYesOrNot] = useState(false);
  const [primeraVez, setPrimeraVez] = useState(true);

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
  const [formValuesSearch, setFormValuesSearch] = useState({
    index_tipo_documento: "",
  });
  const [lugarResidencia, setLugarResidencia] = useState({
    departamento: {
      label: "",
      value: "",
    },
  });
  const [datosLaborales, setDatosLaborales] = useState<ISelectOptions[]>([]);
  const [datosNotificacion, setDatosNotificacion] = useState<ISelectOptions[]>(
    []
  );
  const [formValues, setFormValues] = useState(modelCreate);

  const {
    reset: resetPersona,
    register: registerPersona,
    handleSubmit: handleSumbitPersona,
    control: controlPersona,
    watch: watchPersona,
    setValue,
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
    setLoading(true);
    try {
      const { data: dataPersonaObject } = await clienteAxios.get(
        `personas/get-personas-by-document/${busquedaModel.tipoDocumento.value}/${busquedaModel.cedula}`
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
        return setActionForm("");
      }
      //cambiar

      setPrimeraVez(false);
      //setActionForm("editar");
      //metodo
      const sexo = sexoOptions.filter(
        (sexo) => sexo.value === dataPersona.sexo
      );
      let form = { ...formValues };
      form.sexo.label = sexo[0].label;
      form.sexo.value = sexo[0].value;

      setFormValues(form);
    } catch (err: any) {
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
            setActionForm("Crear");
          } else {
            setActionForm("");
          }
        });
      }
    }
    setLoading(false);
  };

  const onSubmitPersona = async (data) => {
    // setLoading(true);
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
      sexo: formValues.sexo.value,
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
      id_cargo: null,
      id_unidad_organizacional_actual: null,
      justificacion_cambio: null,
    };

    if (actionForm === "editar") {
      try {
        const { data: dataUpdate } = await clienteAxios.patch(
          `personas/persona-natural/user-with-permissions/update/${updatedPersona.tipo_documento}/${updatedPersona.numero_documento}/`,
          updatedPersona
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados",
          showConfirmButton: false,
          timer: 1500,
        });
        // resetBuscar({ ...watchPersona(), numeroDocumento: "" });
        setActionForm("");
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
            setActionForm("");
          }
        });
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    }
    // setLugarResidencia({ departamento: { label: "", value: "" } });
    // setDatosLaborales({ departamento: { label: "", value: "" } });
    // setDatosNotificacion({ departamento: { label: "", value: "" } });
    // setLoading(false);
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

  const handleCancelAction = () => {
    setActionForm("");
  };

  // const handleChangePaisResidencia = (e) => {
  //   const objectSend = {
  //     paisResidencia: getIndexBySelectOptions(e.value, paisesOptions),
  //     municipio: -1,
  //   };
  //   if (e.value !== "CO" || !e.value) {
  //     objectSend.municipio = -1;
  //     resetPersona({
  //       ...watchPersona(),
  //       municipio: "",
  //     });
  //     setLugarResidencia({
  //       ...lugarResidencia,
  //       departamento: { label: "", value: "" },
  //     });
  //   }
  // };

  // const handleChangePaisDondeLabora = (e) => {
  //   const objectSend = {
  //     paisLaboral: getIndexBySelectOptions(e.value, paisesOptions),
  //     municipioDondeLabora: -1,
  //   };
  //   if (e.value !== "CO" || !e.value) {
  //     objectSend.municipioDondeLabora = -1;
  //     resetPersona({
  //       ...watchPersona(),
  //       municipioDondeLabora: "",
  //     });
  //   }
  // };

  // const handleChangePaisNotificacion = (e) => {
  //   const objectSend = {
  //     paisNotificacion: getIndexBySelectOptions(e.value, paisesOptions),
  //     municipioNotificacion: -1,
  //   };
  //   if (e.value !== "CO" || !e.value) {
  //     objectSend.municipioNotificacion = -1;
  //     resetPersona({
  //       ...watchPersona(),
  //       municipioNotificacion: "",
  //     });
  //     setDatosNotificacion({
  //       ...datosNotificacion,
  //       departamento: { label: "", value: "" },
  //     });
  //   }
  //   setFormValues({
  //     ...formValues,
  //     ...objectSend,
  //   });
  // };

  const getIndexColombia = () => {
    let indexColombia = -1;
    paisesOptions.forEach((pais, index) => {
      if (pais.value === "CO") {
        indexColombia = index;
      }
    });
    return indexColombia;
  };

  //busqueda
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

  const handleChangeCreate = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...modelCreate, [name]: value });
  };

  const changeSelectSexo = (e) => {
    let form = { ...modelCreate };
    form.sexo = {
      value: e.value,
      label: e.label,
    };
    setValue("sexo", form.sexo);
    setFormValues(form);
  };

  const changeSelectEstadoCivil = (e) => {
    let form = { ...modelCreate };
    form.estadoCivil = {
      value: e.value,
      label: e.label,
    };
    setValue("estadoCivil", form.estadoCivil);
    setFormValues(form);
  };

  const changeSelectPaisNacimiento = (e) => {
    let form = { ...modelCreate };
    form.pais_nacimiento = {
      value: e.value,
      label: e.label,
    };
    setValue("pais_nacimiento", form.pais_nacimiento);
    setFormValues(form);
  };

  const changeSelectPaisResidencia = (e) => {
    let form = { ...modelCreate };
    form.pais_residencia = {
      value: e.value,
      label: e.label,
    };
    setValue("pais_residencia", form.pais_residencia);
    setFormValues(form);
  };

  const changeSelectDepartamentoResidencia = (e) => {
    let form = { ...modelCreate };
    form.departamento_residencia = {
      value: e.value,
      label: e.label,
    };
    setValue("departamento_residencia", form.departamento_residencia);
    setFormValues(form);
  };

  const changeSelectMunicipioResidencia = (e) => {
    let form = { ...modelCreate };
    form.municipio_residencia = {
      value: e.value,
      label: e.label,
    };
    setValue("municipio_residencia", form.municipio_residencia);
    setFormValues(form);
  };

  const changeSelectPaisLabora = (e) => {
    let form = { ...modelCreate };
    form.pais_labora = {
      value: e.value,
      label: e.label,
    };
    setValue("pais_labora", form.pais_labora);
    setFormValues(form);
  };

  const changeSelectDepartamentoLabora = (e) => {
    let form = { ...modelCreate };
    form.departamento_labora = {
      value: e.value,
      label: e.label,
    };
    setValue("departamento_labora", form.departamento_labora);
    setFormValues(form);
  };

  const changeSelectMunicipioLabora = (e) => {
    let form = { ...modelCreate };
    form.municipio_labora = {
      value: e.value,
      label: e.label,
    };
    setValue("municipio_labora", form.municipio_labora);
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
                  <Select
                    name="tipo_documento"
                    value={busquedaModel.tipoDocumento}
                    options={tipoDocumentoOptions}
                    placeholder="Seleccionar"
                    onChange={changeSelectTipoDocumentoBusqueda}
                    required={true}
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
                      value={busquedaModel.cedula}
                      onChange={handleChange}
                      required={true}
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
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <button
                    type="submit"
                    className="mb-0 btn-image text-capitalize bg-white border boder-none"
                    onClick={}
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
                    <div className="col-12 col-md-3 mt-2">
                      <label className="form-label">
                        Tipo de documento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        value={formValues.tipo_documento}
                        onChange={changeSelectTipoDocumento}
                        options={tipoDocumentoOptions}
                        placeholder="Seleccionar"
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
                          value={formValues.numero_documento}
                          onChange={handleChangeCreate}
                          //disabled={isEdit}
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
                          type="number"
                          disabled={!yesOrNot}
                          maxLength={1}
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
                          disabled={actionForm === "editar"}
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
                          //disabled={isEdi}
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
                          //disabled={isEdit}
                          name="primer_apellido"
                          value={formValues.primer_apellido}
                          onChange={handleChangeCreate}
                          required={true}
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
                          //disabled={isEdit}
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
                        value={formValues.estadoCivil}
                        onChange={changeSelectEstadoCivil}
                        options={estadoCivilOptions}
                        placeholder="Seleccionar"
                      />
                    </div>
                    <div className="col-12 col-md-3 mt-1">
                      <label htmlFor="exampleFormControlInput1">
                        Fecha de nacimiento{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <DatePicker
                        locale="es"
                        showYearDropdown
                        peekNextMonth
                        showMonthDropdown
                        scrollableYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        selected={formValues.fecha_nacimiento}
                        value={formValues.fecha_nacimiento}
                        onSelect={handleChangeCreate}
                        className="form-control border rounded-pill px-3 border-terciary"
                        placeholderText="dd/mm/aaaa"
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
                      options={municipiosOptions}
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

                    <Select
                      value={formValues.pais_labora}
                      onChange={changeSelectPaisLabora}
                      options={paisesOptions}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label text-terciary">
                      Departamento donde labora:{" "}
                    </label>
                    <Select
                      options={departamentosOptions}
                      //isDisabled={}
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
                      //(isDisabled={}
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
                        type="text"
                        name="email_empresarial"
                        value={formValues.email_empresarial}
                        onChange={}
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
                        onChange={}
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

                    <Select
                      value={formValues.paisNotificacion}
                      options={paisesOptions}
                      onChange={handleChangePaisNotificacion}
                      placeholder="Seleccionar"
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
                        onChange={(e: any) => {
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
                            onChange={(e: any) =>
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
                        disabled={isEdit}
                        placeholder="E-mail"
                        required={true}
                        name="email"
                        onChange={}
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
                    <div>
                      <label>
                        Celular: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border-terciary"
                        type="text"
                        maxLength={10}
                        minLength={10}
                        name="celular"
                        value={formValues.celular}
                        onChange={}
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
                        type="text"
                        minLength={10}
                        maxLength={10}
                        name="telefono_fijo"
                        onChange={}
                        value={formValues.telefono_fijo}
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
            setFormValues={setFormValuesSearch}
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
