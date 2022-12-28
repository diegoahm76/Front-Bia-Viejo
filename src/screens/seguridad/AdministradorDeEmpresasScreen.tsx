import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";

import Subtitle from "../../components/Subtitle";
import BusquedaAvanzadaJuridicaModal from "../../components/BusquedaAvanzadaJuridicaModal";
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

const busquedaAvanzadaModel = {
  tipoDocumento: { value: "", label: "" },
  numeroDocumento: "",
};

const modelCreate = {
  tipo_persona: { value: "", label: "" }, //representante
  numero_documento_representante: 0,
  tipo_documento: { value: "", label: "" },

  numero_documento: "",
  digito_verificacion: "",
  nombre_comercial: "",
  razon_social: "",
  email: "",
  email_empresarial: "",
  direccion_notificaciones: "",
  cod_municipio_notificacion_nal: { value: "", label: "" },
  cod_departamento_notificacion: { value: "", label: "" },
  cod_pais_nacionalidad_empresa: { value: "", label: "" },
  telefono_celular_empresa: "",
  telefono_empresa_2: "",
  telefono_empresa: "",
  acepta_notificacion_sms: true,
  acepta_notificacion_email: true,
  acepta_tratamiento_datos: true,
  representante_legal: 0,
};

const AdministradorDeEmpresasScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [primeraVez, setPrimeraVez] = useState(true);
  const [direccionNotificacionIsOpen, setDireccionNotificacionIsOpen] =
    useState(false);
  const [direccionEmpresaIsOpen, setDireccionEmpresaIsOpen] = useState(false);
  const [busquedaAvanzadaIsOpen, setBusquedaAvanzadaIsOpen] = useState(false);
  const [direccionNotificacionText, setDireccionNotificacionText] =
    useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datosNotificacion, setDatosNotificacion] = useState(initialOptions);
  const [busquedaModel, setBusquedaModel] = useState(busquedaAvanzadaModel);
  const [direccionEmpresaText, setDireccionEmpresaText] = useState("");
  const [actionForm, setActionForm] = useState("");
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState<
    ISelectOptions[]
  >([]);
  const [
    tipoDocumentoOptionsRepresentante,
    setTipoDocumentoOptionsRepresentante,
  ] = useState(initialOptions);
  const [paisesOptions, setPaisesOptions] = useState<ISelectOptions[]>([]);
  const [municipiosOptions, setMunicipiosOptions] = useState<ISelectOptions[]>(
    []
  );
  const [municipiosCoinicidenciaOptions, setmunicipiosCoinicidenciaOptions] =
    useState<ISelectOptions[]>([]);
  const [departamentosOptions, setDepartamentosOptions] =
    useState(initialOptions);
  const [formValuesSearch, setFormValuesSearch] = useState({
    tipoDocumento: "",
  });
  const [formCreate, setFormCreate] = useState(modelCreate);
  const {
    register: registerEmpresa,
    handleSubmit: handleSubmitEmpresa,
    reset: resetEmpresa,
    watch: watchEmpresa,
    setValue,
    formState: { errors: errorsEmpresa },
  } = useForm();

  const {
    handleSubmit: handleSubmitBuscar,
    reset: resetBuscar,
    watch: watchBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const changeSelectTipo = (e) => {
    let tipoDocuento = { ...busquedaAvanzadaModel };
    tipoDocuento.tipoDocumento = {
      value: e.value,
      label: e.label,
    };
    setValue("tipo_documento", tipoDocuento.tipoDocumento);
    setBusquedaModel(tipoDocuento);
  };

  const changeSelectTipoEmpresa = (e) => {
    let form = { ...formCreate };
    form.tipo_documento = {
      value: e.value,
      label: e.label,
    };
    setValue("tipo_documento", form.tipo_documento);
    setFormCreate(form);
  };

  const changeSelectTipoRepresentante = (e) => {
    let form = { ...formCreate };
    form.tipo_persona = {
      value: e.value,
      label: e.label,
    };
    setValue("tipo_documento_representante", form.tipo_persona);
    setFormCreate(form);
  };

  const changeSelectPais = (e) => {
    let form = { ...formCreate };
    form.cod_pais_nacionalidad_empresa = {
      value: e.value,
      label: e.label,
    };
    setValue("tipo_pais", form.cod_pais_nacionalidad_empresa);
    setFormCreate(form);
  };

  const changeSelectDepartamento = (e) => {
    let form = { ...formCreate };
    form.cod_departamento_notificacion = {
      value: e.value,
      label: e.label,
    };

    const municipioIndicadores =
      formCreate.cod_departamento_notificacion?.value?.slice(0, 2);
    const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
      const indicator = municipio.value.slice(0, 2);
      return municipioIndicadores === indicator;
    });
    
    setmunicipiosCoinicidenciaOptions(municipiosCoincidentes);
    setmunicipiosCoinicidenciaOptions(municipiosCoincidentes);
    setValue("tipo_departamento", form.cod_departamento_notificacion);
    setFormCreate(form);
  };

  const changeSelectMunicipio = (e) => {
    let form = { ...formCreate };
    form.cod_municipio_notificacion_nal = {
      value: e.value,
      label: e.label,
    };
    setValue("tipo_municipio", form.cod_municipio_notificacion_nal);
    setFormCreate(form);
  };

  const handleChange = (e) => {
    const data = { ...busquedaModel };
    data.numeroDocumento = e.target.value;
    setBusquedaModel(data);
  };

  const handleChangeCreate = (e) => {
    const { name, value } = e.target;
    setFormCreate({ ...formCreate, [name]: value });
  };

  const onSubmitBuscar = async () => {
    //setLoading(true);
    try {
      const { data: dataEmpresaObject } = await clienteAxios.get(
        `personas/get-personas-by-document/${busquedaModel?.tipoDocumento.value}/${busquedaModel?.numeroDocumento}`
      );

      const { data: dataEmpresa } = dataEmpresaObject;

      if (dataEmpresa?.tipo_persona !== "J") {
        Swal.fire({
          title: "Este documento es de una persona natural",
          text: "¿Quiere ir al administrador de personas?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/seguridad/administradordepersonas");
          }
        });

        setIsEdit(false);
        return;
      } else {
        const documentoRepresentante = tipoDocumentoOptionsRepresentante.filter(
          (documento) =>
            documento.value === dataEmpresa.representante_legal.tipo_documento
        );

        const paisSeleccionado = paisesOptions.filter(
          (pais) => pais.value === dataEmpresa.cod_pais_nacionalidad_empresa
        );

        const municipioSeleccionado = municipiosOptions.filter(
          (municipio) =>
            municipio.value === dataEmpresa.cod_municipio_notificacion_nal
        );
        

        const modelEdit = {
          ...dataEmpresa,

          tipo_persona: documentoRepresentante[0], //representante
          numero_documento_representante:
            dataEmpresa.representante_legal.numero_documento,
          tipo_documento: {
            value: dataEmpresa.tipo_documento
              ? dataEmpresa.tipo_documento.cod_tipo_documento
              : "",
            label: dataEmpresa.tipo_documento
              ? dataEmpresa.tipo_documento.nombre
              : "",
          },
          direccion_notificaciones: "",
          cod_municipio_notificacion_nal: municipioSeleccionado
            ? municipioSeleccionado[0]
            : { value: "", label: "" },
          cod_departamento_notificacion: { value: "", label: "" },
          cod_pais_nacionalidad_empresa: paisSeleccionado
            ? paisSeleccionado[0]
            : { label: "", value: "" },
          representante_legal: dataEmpresa.representante_legal
            ? dataEmpresa.representante_legal.id_persona
            : 0,
        };
        

        setDireccionNotificacionText(dataEmpresa.direccion_notificaciones);

        setFormCreate(modelEdit);
        setIsEdit(true);
        setIsVisible(true);
      }
    } catch (err: any) {
      //setLoading(false);
      if (err.response.data) {
        const result = await Swal.fire({
          title: err.response.data.detail,
          text: "¿Quiere seguir buscando o quiere crear una empresa?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Seguir",
          cancelButtonText: "Crear",
        });
        if (!result.isConfirmed) {
          const modelCreate = {
            tipo_persona: { value: "", label: "" }, //representante
            numero_documento_representante: 0,
            tipo_documento: { value: "", label: "" },

            numero_documento: "",
            digito_verificacion: "",
            nombre_comercial: "",
            razon_social: "",
            email: "",
            email_empresarial: "",
            direccion_notificaciones: "",
            cod_municipio_notificacion_nal: { value: "", label: "" },
            cod_departamento_notificacion: { value: "", label: "" },
            cod_pais_nacionalidad_empresa: { value: "", label: "" },
            telefono_celular_empresa: "",
            telefono_empresa_2: "",
            telefono_empresa: "",
            acepta_notificacion_sms: true,
            acepta_notificacion_email: true,
            acepta_tratamiento_datos: true,
            representante_legal: 0,
          };
          setFormCreate(modelCreate);
          setIsVisible(true);

          return setIsEdit(false);
        }
      }
    }
    //setLoading(false);
  };

  const onSubmitEmpresa = async (data) => {
    //setLoading(true);

    let idPersonaRepresentante = null;

    try {
      const { data: dataRepresentante } = await clienteAxios.get(
        `personas/get-personas-naturales-by-document/${formCreate.tipo_persona.value}/${formCreate.numero_documento_representante}/`
      );
      idPersonaRepresentante = dataRepresentante?.data?.id_persona;
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
          navigate("/dashboard/seguridad/administradordepersonas");
        }
      });
     // setLoading(false);
      return;
    }

    const createEmpresa = {
      ...formCreate,
      tipo_persona: "J",
      tipo_documento: formCreate.tipo_documento.value,
      direccion_notificaciones: data.direccionDeNotificacion,
      cod_municipio_notificacion_nal:
        formCreate.cod_municipio_notificacion_nal.value,
      cod_pais_nacionalidad_empresa:
        formCreate.cod_pais_nacionalidad_empresa.value,
      representante_legal: idPersonaRepresentante,
    };

    if (isEdit) {
      try {
        const { data: dataResponse } = await clienteAxios.patch(
          `personas/persona-juridica/user-with-permissions/update/${createEmpresa.tipo_documento}/${createEmpresa.numero_documento}/`,
          createEmpresa
        );
        setIsVisible(false);
        setBusquedaModel(busquedaAvanzadaModel)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados",
          showConfirmButton: false,
          timer: 1500,
        });
        
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    } else {
      try {
        await clienteAxios.post(
          "personas/persona-juridica/create/",
          createEmpresa
        );
        const modelCreate = {
          tipo_persona: { value: "", label: "" }, //representante
          numero_documento_representante: 0,
          tipo_documento: { value: "", label: "" },

          numero_documento: "",
          digito_verificacion: "",
          nombre_comercial: "",
          razon_social: "",
          email: "",
          email_empresarial: "",
          direccion_notificaciones: "",
          cod_municipio_notificacion_nal: { value: "", label: "" },
          cod_departamento_notificacion: { value: "", label: "" },
          cod_pais_nacionalidad_empresa: { value: "", label: "" },
          telefono_celular_empresa: "",
          telefono_empresa_2: "",
          telefono_empresa: "",
          acepta_notificacion_sms: true,
          acepta_notificacion_email: true,
          acepta_tratamiento_datos: true,
          representante_legal: 0,
        };
        setFormCreate(modelCreate);
        setIsVisible(false);
        Swal.fire({
          title: "Empresa creada correctamente",
          text: "¿Desea registrarse como usuario?",
          icon: "success",
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
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    }
    //setLoading(false);
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
    } else if (err.response?.data?.representante_legal) {
      Swal.fire({
        title: "Ingrese un representante legal correcto",
        text: "Verifique los datos",
        icon: "info",
        confirmButtonColor: "#3BA9E0",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Aceptar",
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

  useEffect(() => {
    const getSelectsOptions = async () => {
      //setLoading(true);
      try {
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );
        const { data: paisesNoFormat } = await clienteAxios.get(
          "choices/paises/"
        );
        const { data: municipiosNoFormat } = await clienteAxios.get(
          "choices/municipios/"
        );
        const { data: departamentosNoFormat } = await clienteAxios.get(
          "choices/departamentos/"
        );

        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);

        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);

        //FILTRO PARA LISTA PERSONAS JURIDICAS
        const documentosFormatFiltered = documentosFormat.filter(
          (documento) => documento.value === "NT"
        );
        const documentosFormatFilteredPersona = documentosFormat.filter(
          (documento) => documento.value !== "NT"
        );

        setTipoDocumentoOptionsRepresentante(documentosFormatFilteredPersona);
        setTipoDocumentoOptions(documentosFormatFiltered);
        setPaisesOptions(paisesFormat);
        setMunicipiosOptions(municipiosFormat);
        setmunicipiosCoinicidenciaOptions(municipiosFormat);
        setDepartamentosOptions(departamentosFormat);
      } catch (err) {
        console.log(err);
        //setLoading(false);
      }
      //setLoading(false);
    };
    getSelectsOptions();
  }, []);

  const handleCancelAction = () => {
    setIsVisible(false)
    setBusquedaModel(busquedaAvanzadaModel)
    
  };

  useEffect(() => {
    if (!watchEmpresa("digito_verificacion")) return;
    if (watchEmpresa("digito_verificacion").length > 1) {
      resetEmpresa({
        ...watchEmpresa(),
        digito_verificacion: watchEmpresa("digito_verificacion")[0],
      });
    }
  }, [watchEmpresa("digito_verificacion")]);

  useEffect(() => {
    if (!primeraVez) return;
    // if (datosNotificacion[0].value === "") {
    //   setMunicipioNotificacionFiltered([]);
    //   setFormValues({ ...formValues, municipioNotificacion: -1 });
    // } else {
    //Todo: Revisar
    // const municipioIndicadores = datosNotificacion?.slice(0, 2);
    // const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
    //   const indicator = municipio.value.slice(0, 2);
    //   return municipioIndicadores === indicator;
    // });
    // setMunicipioNotificacionFiltered(municipiosCoincidentes);
    //   setFormValues({ ...formValues, municipioNotificacion: 0 });
    // }
  }, [datosNotificacion]);

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
          <div className="row align-items-end">
            <form onSubmit={handleSubmitBuscar(onSubmitBuscar)}>
              <h3 className="mt-3 ms-3 mb-4 fw-light text-terciary">
                Administrador de empresas
              </h3>
              <Subtitle title={"Buscar empresa"} mt={0} mb={0} />
              <div className="mt-4 row align-items-end ms-1">
                <div className="col-12 col-md-3">
                  <label className="form-label">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>

                  <Select
                    name="tipo_documento"
                    options={tipoDocumentoOptions}
                    required={true}
                    placeholder="Seleccionar"
                    onChange={changeSelectTipo}
                    value={busquedaModel.tipoDocumento}
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
                      className="form-control border border-terciary rounded-pill px-3"
                      type="text"
                      required={true}
                      maxLength={15}
                      name="numeroDocumento"
                      onChange={handleChange}
                      value={busquedaModel.numeroDocumento}
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
                  >
                    <img src={botonBuscar} alt="" />
                  </button>
                  <button
                    type="button"
                    className="ms-3 btn bg-gradient-primary mb-0 text-capitalize"
                    onClick={() => setBusquedaAvanzadaIsOpen(true)}
                  >
                    Búsqueda avanzada
                  </button>
                </div>
              </div>
            </form>
            {isVisible && (
              <form onSubmit={handleSubmitEmpresa(onSubmitEmpresa)}>
                <Subtitle title={"Datos personales"} mt={4} mb={0} />
                <div className="mt-2 row mx-1 align-items-end">
                  <div className="row col-12 align-items-end">
                    <div className="col-12 col-md-3">
                      <label className="form-label">
                        Tipo de documento:
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        value={formCreate.tipo_documento}
                        onChange={changeSelectTipoEmpresa}
                        options={tipoDocumentoOptions}
                        placeholder="Seleccionar"
                        isDisabled={isEdit}
                      />

                      {errorsEmpresa.tipoDocumento2 && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio
                          </small>
                        </div>
                      )}
                    </div>

                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">
                          Número de documento:
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border border-terciary rounded-pill px-3"
                          type="text"
                          name="numero_documento"
                          maxLength={15}
                          value={formCreate.numero_documento}
                          onChange={handleChangeCreate}
                          disabled={isEdit}
                          required={true}
                        />
                        {errorsEmpresa.numeroDocumento2 && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">
                          Digito verificación
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border border-terciary rounded-pill px-3"
                          type="text"
                          name="digito_verificacion"
                          value={formCreate.digito_verificacion}
                          onChange={handleChangeCreate}
                          disabled={isEdit}
                          required={true}
                          maxLength={1}
                        />
                        {errorsEmpresa.digito_verificacion && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio y de un caracter
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">Nombre comercial:</label>
                        <input
                          className="form-control border border-terciary rounded-pill px-3"
                          type="text"
                          name="nombre_comercial"
                          value={formCreate.nombre_comercial}
                          disabled={isEdit}
                          onChange={handleChangeCreate}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">
                          Razón social: <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border border-terciary rounded-pill px-3"
                          type="text"
                          required={true}
                          onChange={handleChangeCreate}
                          value={formCreate.razon_social}
                          name="razon_social"
                          disabled={isEdit}
                        />
                      </div>
                      {errorsEmpresa.razonSocial && (
                        <div className="col-12">
                          <small className="text-center text-danger">
                            Este campo es obligatorio y de un caracter
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Subtitle title={"Representante Legal"} mt={4} mb={0} />
                <div className="row mx-1 align-items-end">
                  <div className="col-12 col-md-3 mt-3">
                    <label className="form-label">
                      Tipo de documento: <span className="text-danger">*</span>
                    </label>

                    <Select
                      name="tipo_documento_representante"
                      options={tipoDocumentoOptionsRepresentante}
                      placeholder="Seleccionar"
                      onChange={changeSelectTipoRepresentante}
                      value={formCreate.tipo_persona}
                      isDisabled={isEdit}
                      required={true}
                    />

                    {errorsEmpresa.tipoDocumentoRepresentante && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-3 col-12 mt-3">
                    <div>
                      <label className="ms-2">
                        Número de documento
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control rounded-pill px-3"
                        type="number"
                        required={true}
                        maxLength={15}
                        onChange={handleChangeCreate}
                        name="numero_documento_representante"
                        value={formCreate.numero_documento_representante}
                        disabled={isEdit}
                      />
                    </div>
                    {errorsEmpresa.numero_documento_representante && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                </div>
                <Subtitle title={"Datos de contacto"} mt={4} mb={0} />
                <div className="row mx-1 mt-2 align-items-end">
                  <div className="col-12 col-md-3 mt-2">
                    <label className="form-label">País:</label>
                    <Select
                      value={formCreate.cod_pais_nacionalidad_empresa}
                      onChange={changeSelectPais}
                      options={paisesOptions}
                      name="tipo_pais"
                      placeholder="Seleccionar"
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">E-mail:</label>
                      <input
                        className="form-control border border-terciary rounded-pill px-3"
                        type="email"
                        name="email"
                        value={formCreate.email}
                        onChange={handleChangeCreate}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">
                        Celular: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border border-terciary rounded-pill px-3"
                        type="tet"
                        name="telefono_celular_empresa"
                        value={formCreate.telefono_celular_empresa}
                        onChange={handleChangeCreate}
                        required={true}
                        maxLength={10}
                        minLength={10}
                      />
                    </div>
                    {errorsEmpresa.celular && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio y de 10 caracteres
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">Teléfono empresa:</label>
                      <input
                        className="form-control border border-terciary rounded-pill px-3"
                        type="number"
                        name="telefono_empresa"
                        minLength={10}
                        maxLength={10}
                        value={formCreate.telefono_empresa}
                        onChange={handleChangeCreate}
                      />
                    </div>
                  </div>
                </div>

                <Subtitle title={"Datos de notificacion"} mt={4} mb={0} />
                <div className="row mx-1 align-items-end">
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">Teléfono alterno:</label>
                      <input
                        className="form-control border border-terciary rounded-pill px-3"
                        type="text"
                        name="telefono_empresa_2"
                        minLength={10}
                        maxLength={10}
                        value={formCreate.telefono_empresa_2}
                        onChange={handleChangeCreate}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">
                        E-mail de notificación:
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border border-terciary rounded-pill px-3"
                        type="email"
                        name="email_empresarial"
                        value={formCreate.email_empresarial}
                        onChange={handleChangeCreate}
                      />
                    </div>
                    {errorsEmpresa.eMail && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <label className="form-label text-terciary">
                      País notificación:
                    </label>
                    <Select
                      value={formCreate.cod_pais_nacionalidad_empresa}
                      options={paisesOptions}
                      onChange={changeSelectPais}
                      placeholder="Seleccionar"
                    />
                  </div>
                  <div className="col-12 col-md-3 mt-2">
                    <label className="form-label text-terciary">
                      Departamento notificación:{" "}
                    </label>
                    <Select
                      options={departamentosOptions}
                      onChange={changeSelectDepartamento}
                      value={formCreate.cod_departamento_notificacion}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-2">
                    <label className="form-label">
                      Municipio notificación:{" "}
                    </label>
                    <Select
                      placeholder="Seleccionar"
                      options={municipiosCoinicidenciaOptions}
                      onChange={changeSelectMunicipio}
                      value={formCreate.cod_municipio_notificacion_nal}
                    />
                  </div>

                  <div className="col-md-8 col-10 mt-3">
                    <div className="mt-3 d-flex align-items-end">
                      <div className="col-10">
                        <label className="ms-2">
                          Dirección de notificación:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control rounded-pill px-3 border border-terciary"
                          type="text"
                          name="direccion_notificaciones "
                          value={direccionNotificacionText}
                          onChange={handleChangeCreate}
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
                    {errorsEmpresa.direccionDeNotificacion && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end mx-1 gap-2 mt-4">
                  <button
                    className="mb-0 btn-image text-capitalize bg-white border boder-none"
                    type="button"
                    onClick={handleCancelAction}
                    disabled={isVisible}
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
                      <img src={botonCancelar} alt="" />
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
                      <img src={botonActualizar} alt="" />
                    ) : (
                      <img src={botonAgregar} alt="" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          <DirecionResidenciaModal
            isModalActive={direccionNotificacionIsOpen}
            setIsModalActive={setDireccionNotificacionIsOpen}
            completeAddress={direccionNotificacionText}
            setCompleteAddress={setDireccionNotificacionText}
            reset={resetEmpresa}
            keyReset="direccionDeNotificacion"
            watch={watchEmpresa}
          />

          <BusquedaAvanzadaJuridicaModal
            isModalActive={busquedaAvanzadaIsOpen}
            setIsModalActive={setBusquedaAvanzadaIsOpen}
            formValues={formValuesSearch}
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
export default AdministradorDeEmpresasScreen;
