import React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";

import {
  dataOverriteEmpresaAdapter,
  dataUpdateEmpresaAdapter,
} from "../../adapters/administradorEmpresa.adapters";
import Subtitle from "../../components/Subtitle";
import BusquedaAvanzadaJuridicaModal from "../../components/BusquedaAvanzadaJuridicaModal";
import DirecionResidenciaModal from "../../components/DirecionResidenciaModal";
import botonBuscar from "../../assets/iconosBotones/buscar.svg";
import botonCancelar from "../../assets/iconosBotones/cancelar.svg";
import botonActualizar from "../../assets/iconosBotones/actualizar.svg";
import botonAgregar from "../../assets/iconosBotones/agregar.svg";

interface defaulValuesFormInterface {
  tipoDocumento: number;
  tipoDocumentoRepresentante: number;
  paisEmpresa: number;
  id_persona: String;
  tipoPersona: String;
  municipioNotificacion: number;
  digito_verificacion: number;
  paisNotificacion: number;
}

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

const defaultValuesForm: defaulValuesFormInterface = {
  tipoDocumento: 0,
  tipoDocumentoRepresentante: 0,
  paisEmpresa: 0,
  id_persona: "",
  tipoPersona: "",
  municipioNotificacion: 0,
  digito_verificacion: 0,
  paisNotificacion: 0,
};

const busquedaAvanzadaModel = {
  tipoDocumento: { value: "", label: "" },
  numeroDocumento: "",
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
  const [municipioNotificacionFiltered, setMunicipioNotificacionFiltered] =
    useState<ISelectOptions[]>([]);
  const [departamentosOptions, setDepartamentosOptions] =
    useState(initialOptions);
  const [formValuesSearch, setFormValuesSearch] = useState({
    tipoDocumento: "",
  });
  const [formValues, setFormValues] = useState(defaultValuesForm);
  const {
    register: registerEmpresa,
    handleSubmit: handleSubmitEmpresa,
    control: controlEmpresa,
    reset: resetEmpresa,
    watch: watchEmpresa,
    setValue,
    formState: { errors: errorsEmpresa },
  } = useForm();

  const {
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
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

  const handleChange = (e) => {
    const data = { ...busquedaModel };
    data.numeroDocumento = e.target.value;
    setBusquedaModel(data);
  };

  const ACTION_EDITAR = "editar";
  const ACTION_CREAR = "crear";

  const onSubmitBuscar = async () => {
    setLoading(true);
    try {
      const { data: dataEmpresaObject } = await clienteAxios.get(
        `personas/get-personas-by-document/${busquedaModel?.tipoDocumento.value}/${busquedaModel?.numeroDocumento}`
      );

      const { data: dataEmpresa } = dataEmpresaObject;


      if (dataEmpresa?.tipo_persona !== "J" ) {
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
        setActionForm("");
        return;
      } else {
        setActionForm(ACTION_EDITAR);
        setPrimeraVez(false);
      }

      console.log("Data get del buscar empresa", dataEmpresa);
      const dataOverriteInputs = dataOverriteEmpresaAdapter(dataEmpresa);
      const defaultValuesOverrite = {
        tipoDocumento:
          tipoDocumentoOptions[
            getIndexBySelectOptions(
              dataEmpresa.tipo_documento?.cod_tipo_documento,
              tipoDocumentoOptions
            )
          ],
        // tipoDocumentoRepresentante:
        //   tipoDocumentoOptions[
        //     getIndexBySelectOptions(
        //       dataEmpresa.representante_legal.tipo_documento,
        //       tipoDocumentoOptions
        //     )
        //   ],
        ...dataOverriteInputs,
      };
      const indexPaisNotificacion = resetPaisDepartamentoYMunicipio(
        dataEmpresa.cod_municipio_notificacion_nal,
        setDatosNotificacion
      );
      setFormValues({
        ...formValues,
        tipoDocumento: getIndexBySelectOptions(
          dataEmpresa.tipo_documento?.cod_tipo_documento,
          tipoDocumentoOptions
        ),
        // tipoDocumentoRepresentante: getIndexBySelectOptions(
        //   dataEmpresa.representante_legal.tipo_documento,
        //   tipoDocumentoOptionsRepresentante
        // ),
        paisEmpresa: getIndexBySelectOptions(
          dataEmpresa.cod_pais_nacionalidad_empresa,
          paisesOptions
        ),
        municipioNotificacion: getIndexBySelectOptions(
          dataEmpresa.cod_municipio_notificacion_nal,
          municipiosOptions
        ),
        id_persona: dataEmpresa.id_persona,
        tipoPersona: dataEmpresa.tipo_persona,
        paisNotificacion: indexPaisNotificacion,
      });
      console.log("override data", defaultValuesOverrite);
      resetEmpresa(defaultValuesOverrite);
    } catch (err: any) {
      console.log(err);
      setLoading(false);
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
          resetEmptyValues();
          setFormValues(defaultValuesForm);
          return setActionForm(ACTION_CREAR);
        }
      }
    }
    setLoading(false);
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
    let indexDepartamento = -1;
    departamentosOptions.forEach((departamento, index) => {
      if (departamento.value === departamentoIdentifier) {
        indexDepartamento = index;
      }
    });
    if (indexDepartamento !== null) {
      let indexColombia = -1;
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
      return -1;
    }
  };

  const onSubmitEmpresa = async (data) => {
    setLoading(true);

    let idPersonaRepresentante = null;

    try {
      const { data: dataRepresentante } = await clienteAxios.get(
        `personas/get-personas-naturales-by-document/${data.tipoDocumentoRepresentante.value}/${data.numero_documento_representante}/`
      );
      console.log("dataRepresentante", dataRepresentante);
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
      setLoading(false);
      return;
    }

    //const idPersonaRepresentante = idRepresentante;
    console.log("id", idPersonaRepresentante);

    const dataEmpresa = {
      ...data,
      representanteLegal: idPersonaRepresentante,
    };

    console.log("dataEmpresa", dataEmpresa);

    const dataUpdateInputs = dataUpdateEmpresaAdapter(dataEmpresa);
    const updateEmpresa = {
      ...dataUpdateInputs,
      tipo_persona: formValues.tipoPersona,
      id_persona: formValues.id_persona,
      tipo_documento: tipoDocumentoOptions[formValues.tipoDocumento]?.value,
      cod_pais_nacionalidad_empresa:
        paisesOptions[formValues.paisEmpresa]?.value || null,
      cod_municipio_notificacion_nal:
        municipiosOptions[formValues.municipioNotificacion]?.value || null,
      digito_verificacion: data.digito_verificacion,
    };

    if (actionForm === ACTION_EDITAR) {
      try {
        console.log("updateEmpresa", updateEmpresa);
        const { data: dataResponse } = await clienteAxios.patch(
          `personas/persona-juridica/user-with-permissions/update/${updateEmpresa.tipo_documento}/${updateEmpresa.numero_documento}/`,
          updateEmpresa
        );
        console.log("data response", dataResponse);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados",
          showConfirmButton: false,
          timer: 1500,
        });
        resetBuscar({ ...watchBuscar(), numeroDocumento: "" });
        setActionForm("");
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    } else {
      try {
        updateEmpresa.tipo_persona = "J";
        await clienteAxios.post(
          "personas/persona-juridica/create/",
          updateEmpresa
        );
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: "Empresa creada",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
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
        resetBuscar({ numeroDocumento: "" });
        setActionForm("");
      } catch (err) {
        manejadorErroresSwitAlert(err);
      }
    }
    setLoading(false);
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

  const resetEmptyValues = () => {
    const emptyValues = {
      tipoDocumento: "",
      numeroDocumento2: "",
      codVerificacion: "",
      nombreComercial: "",
      razonSocial: "",
      representanteLegal: "",
      eMail: "",
      emailNotificacion: "",
      celular: "",
      telefonoEmpresa: "",
      telefonoAlterno: "",
      direccionDeNotificacion: "",
      direccionEmpresa: "",
      municipioNotificacion: "",
      digito_verificacion: "",
    };
    resetEmpresa(emptyValues);
    setFormValues({
      ...formValues,
      tipoDocumento: -1,
      paisEmpresa: -1,
      municipioNotificacion: -1,
      id_persona: "",
      tipoPersona: "",
    });
  };

  useEffect(() => {
    const getSelectsOptions = async () => {
      setLoading(true);
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
          (documento) => documento.value === "NU" || documento.value === "NT"
        );

        setTipoDocumentoOptionsRepresentante(documentosFormat);
        setTipoDocumentoOptions(documentosFormatFiltered);
        setPaisesOptions(paisesFormat);
        setMunicipiosOptions(municipiosFormat);
        setDepartamentosOptions(departamentosFormat);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
      setLoading(false);
    };
    getSelectsOptions();
  }, []);

  const getIndexBySelectOptions = (valueSelect, selectOptions) => {
    let indexValue = -1;
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
    setActionForm("");
  };

  const handleChangePaisNotificacion = (e) => {
    const objectSend = {
      paisNotificacion: getIndexBySelectOptions(e.value, paisesOptions),
      municipioNotificacion: -1,
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.municipioNotificacion = -1;
      resetEmpresa({
        ...watchEmpresa(),
        municipioNotificacion: "",
      });
      setDatosNotificacion([{ label: "", value: "" }]);
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  };

  const getIndexColombia = () => {
    let indexColombia = -1;
    paisesOptions.forEach((pais, index) => {
      if (pais.value === "CO") {
        indexColombia = index;
      }
    });
    return indexColombia;
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

            {actionForm && (
              <form onSubmit={handleSubmitEmpresa(onSubmitEmpresa)}>
                <Subtitle title={"Datos personales"} mt={4} mb={0} />
                <div className="mt-2 row mx-1 align-items-end">
                  <div className="row col-12 align-items-end">
                    {actionForm !== ACTION_EDITAR ? (
                      <div className="col-12 col-md-3">
                        <label className="form-label">
                          Tipo de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="tipoDocumento2"
                          control={controlEmpresa}
                          rules={{ required: true }}
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
                                    e?.value,
                                    tipoDocumentoOptions
                                  ),
                                });
                                resetEmpresa({
                                  ...watchEmpresa(),
                                  tipoDocumento2: e,
                                });
                              }}
                              options={tipoDocumentoOptions}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                        {errorsEmpresa.tipoDocumento2 && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="col-12 col-md-3">
                        <div className="mt-2">
                          <label className="ms-2">
                            Tipo de documento:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control border border-terciary rounded-pill px-3"
                            type="number"
                            value={
                              tipoDocumentoOptions[formValues.tipoDocumento]
                                ?.label
                            }
                            disabled
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">
                          Número de documento:
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border border-terciary rounded-pill px-3"
                          type="text"
                          disabled={actionForm === ACTION_EDITAR}
                          {...registerEmpresa("numeroDocumento2", {
                            required: actionForm === ACTION_CREAR,
                          })}
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
                          Digito verificación:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border border-terciary rounded-pill px-3"
                          type="number"
                          disabled={actionForm === ACTION_EDITAR}
                          // value={formValues.digito_verificacion}
                          // onChange={handleMaxOneDigit}
                          {...registerEmpresa("digito_verificacion", {
                            required: true,
                            maxLength: 1,
                          })}
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
                          disabled={actionForm === ACTION_EDITAR}
                          {...registerEmpresa("nombreComercial")}
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
                          disabled={actionForm === ACTION_EDITAR}
                          {...registerEmpresa("razonSocial", {
                            required: true,
                          })}
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
                    <Controller
                      name="tipoDocumentoRepresentante"
                      control={controlEmpresa}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={
                            tipoDocumentoOptionsRepresentante[
                              formValues.tipoDocumentoRepresentante
                            ]
                          }
                          onChange={(e: any) => {
                            setFormValues({
                              ...formValues,
                              tipoDocumentoRepresentante:
                                getIndexBySelectOptions(
                                  e.value,
                                  tipoDocumentoOptionsRepresentante
                                ),
                            });
                            resetEmpresa({
                              ...watchEmpresa(),
                              tipoDocumentoRepresentante: e,
                            });
                          }}
                          options={tipoDocumentoOptionsRepresentante}
                          placeholder="Seleccionar"
                        />
                      )}
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
                        Número de documento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control rounded-pill px-3"
                        type={
                          watchEmpresa("tipoDocumentoRepresentante")?.value ===
                          "PA"
                            ? "text"
                            : "number"
                        }
                        {...registerEmpresa("numero_documento_representante", {
                          required: true,
                        })}
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
                    <Controller
                      name="paisEmpresa"
                      control={controlEmpresa}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={paisesOptions[formValues.paisEmpresa]}
                          onChange={(e: any) => {
                            setFormValues({
                              ...formValues,
                              paisEmpresa: getIndexBySelectOptions(
                                e.value,
                                paisesOptions
                              ),
                            });
                          }}
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">E-mail:</label>
                      <input
                        className="form-control border border-terciary rounded-pill px-3"
                        type="email"
                        {...registerEmpresa("emailNotificacion")}
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
                        type="number"
                        {...registerEmpresa("celular", {
                          required: true,
                          maxLength: 10,
                          minLength: 10,
                        })}
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
                        {...registerEmpresa("telefonoEmpresa")}
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
                        {...registerEmpresa("telefonoAlterno")}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">
                        E-mail de notificación:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border border-terciary rounded-pill px-3"
                        type="email"
                        disabled={actionForm === ACTION_EDITAR}
                        readOnly={actionForm === ACTION_EDITAR}
                        {...registerEmpresa("eMail", { required: true })}
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
                    <Controller
                      name="cod_pais_notificacion_nal"
                      control={controlEmpresa}
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
                    <div className="col-12 col-md-3 mt-2">
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
                          //Todo: Revisar
                          // setDatosNotificacion({
                          //   ...datosNotificacion,
                          //   departamento: e,
                          // });
                        }}
                        value={datosNotificacion[0]}
                        placeholder="Seleccionar"
                      />
                    </div>
                  ) : (
                    <div className="col-12 col-md-3 mt-2">
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
                    <div className="col-12 col-md-3 mt-2">
                      <label className="form-label">
                        Municipio notificación:{" "}
                      </label>
                      <Controller
                        name="municipioNotificacion"
                        control={controlEmpresa}
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
                    <div className="col-12 col-md-3 mt-2">
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
                          readOnly
                          {...registerEmpresa("direccionDeNotificacion", {
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
                    ) : actionForm === ACTION_EDITAR ? (
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

          <DirecionResidenciaModal
            isModalActive={direccionEmpresaIsOpen}
            setIsModalActive={setDireccionEmpresaIsOpen}
            completeAddress={direccionEmpresaText}
            setCompleteAddress={setDireccionEmpresaText}
            reset={resetEmpresa}
            keyReset="direccionEmpresa"
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
