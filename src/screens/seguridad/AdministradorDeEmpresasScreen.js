import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import GeneradorDeDirecciones from "../../components/GeneradorDeDirecciones";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
import {
  dataOverriteEmpresaAdapter,
  dataUpdateEmpresaAdapter,
} from "../../adapters/administradorEmpresa.adapters";
import { getConfigAuthBearer } from "../../helpers/configAxios";
import Subtitle from "../../components/Subtitle";

const AdministradorDeEmpresasScreen = () => {
  const navigate = useNavigate();
  const [direccionNotificacionIsOpen, setDireccionNotificacionIsOpen] =
    useState(false);
  const [direccionEmpresaIsOpen, setDireccionEmpresaIsOpen] = useState(false);
  const [direccionNotificacionText, setDireccionNotificacionText] =
    useState("");
  const [direccionEmpresaText, setDireccionEmpresaText] = useState("");
  const [actionForm, setActionForm] = useState(null);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    tipoDocumento: null,
    paisEmpresa: "",
    id_persona: "",
    tipoPersona: "",
    municipioNotificacion: "",
  });
  const {
    register: registerEmpresa,
    handleSubmit: handleSubmitEmpresa,
    control: controlEmpresa,
    reset: resetEmpresa,
    watch: watchEmpresa,
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

  const ACTION_EDITAR = "editar";
  const ACTION_CREAR = "crear";

  const onSubmitBuscar = async (data) => {
    try {
      const { data: dataEmpresaObject } = await clienteAxios.get(
        `personas/get-personas-by-document/${data?.tipoDocumento.value}/${data?.numeroDocumento}`
      );

      const { data: dataEmpresa } = dataEmpresaObject;

      if (!dataEmpresa) {
        const result = await Swal.fire({
          title: "No existe una empresa con estos datos",
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
          return setActionForm(ACTION_CREAR);
        } else {
          return;
        }
      }

      if (dataEmpresa?.tipo_persona !== "J" && dataEmpresa?.id_persona) {
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
        setActionForm(null);
        return;
      } else {
        setActionForm(ACTION_EDITAR);
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
        ...dataOverriteInputs,
      };
      setFormValues({
        ...formValues,
        tipoDocumento: getIndexBySelectOptions(
          dataEmpresa.tipo_documento?.cod_tipo_documento,
          tipoDocumentoOptions
        ),
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
      });
      console.log("override data", defaultValuesOverrite);
      resetEmpresa(defaultValuesOverrite);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitEmpresa = async (data) => {
    const dataUpdateInputs = dataUpdateEmpresaAdapter(data);
    const updateEmpresa = {
      ...dataUpdateInputs,
      tipo_persona: formValues.tipoPersona,
      id_persona: formValues.id_persona,
      tipo_documento: tipoDocumentoOptions[formValues.tipoDocumento]?.value,
      cod_pais_nacionalidad_empresa:
        paisesOptions[formValues.paisEmpresa]?.value,
      cod_municipio_notificacion_nal:
        municipiosOptions[formValues.municipioNotificacion]?.value,
    };

    console.log("updated persona", updateEmpresa);

    if (actionForm === ACTION_EDITAR) {
      const access = getTokenAccessLocalStorage();
      const config = getConfigAuthBearer(access);
      try {
        await clienteAxios.patch(
          `personas/persona-juridica/user-with-permissions/update/${formValues?.id_persona}/`,
          updateEmpresa,
          config
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados",
          showConfirmButton: false,
          timer: 1500,
        });
        resetBuscar({ ...watchBuscar(), numeroDocumento: "" });
        setActionForm(null);
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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Empresa creada",
          showConfirmButton: false,
          timer: 1500,
        });
        resetBuscar({ numeroDocumento: "" });
        setActionForm(null);
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
    } else {
      console.log(err);
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
    };
    resetEmpresa(emptyValues);
    setFormValues({
      ...formValues,
      tipoDocumento: "",
      paisEmpresa: null,
      municipioNotificacion: null,
      id_persona: "",
      tipoPersona: "",
    });
  };

  useEffect(() => {
    const getSelectsOptions = async () => {
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

        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

        setTipoDocumentoOptions(documentosFormat);
        setPaisesOptions(paisesFormat);
        setMunicipiosOptions(municipiosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

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
                <div className="col-12 col-md-3">
                  <div>
                    <label className="ms-2">
                      Número de documento:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border rounded-pill px-3"
                      type="text"
                      {...registerBuscar("numeroDocumento", { required: true })}
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
                  >
                    Busqueda avanzada
                  </button>
                </div>
              </div>
            </form>

            {actionForm && (
              <form onSubmit={handleSubmitEmpresa(onSubmitEmpresa)}>
                <Subtitle title={"Datos personales"} mt={4} mb={0} />
                <hr className="dark horizontal my-0" />
                <div className="mt-4 row mx-1">
                  <div className="row col-12 ">
                    {actionForm !== ACTION_EDITAR ? (
                      <div className="col-12 col-md-3">
                        <label className="form-label">
                          Tipo de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="tipoDocumento2"
                          control={controlEmpresa}
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
                              }}
                              options={tipoDocumentoOptions}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                    ) : (
                      <div className="col-12 col-md-3">
                        <div className="mt-2">
                          <label className="ms-2">
                            Tipo de documento:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control border rounded-pill px-3"
                            type="text"
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
                          Número de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
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
                        <label className="ms-2">Cod. verificacion:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="number"
                          disabled={actionForm === ACTION_EDITAR}
                          {...registerEmpresa("codVerificacion", {
                            maxLength: 1,
                          })}
                        />
                        {errorsEmpresa.codVerificacion && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio, con numeros y de un
                              carácter
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">Nombre comercial:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          disabled={actionForm === ACTION_EDITAR}
                          {...registerEmpresa("nombreComercial")}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">
                          Razon social: <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          disabled={actionForm === ACTION_EDITAR}
                          {...registerEmpresa("razonSocial")}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">Representante legal:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          disabled={actionForm === ACTION_EDITAR}
                          {...registerEmpresa("representanteLegal")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Subtitle title={"Datos de contacto"} mt={4} mb={0} />
                <hr className="dark horizontal my-0" />
                <div className="mt-4 row mx-1">
                  <div className="col-12 col-md-3 mt-2">
                    <label className="form-label">País:</label>
                    <Controller
                      name="paisEmpresa"
                      control={controlEmpresa}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={paisesOptions[formValues.paisEmpresa]}
                          onChange={(e) => {
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
                      <label className="ms-2">
                        E-mail: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="email"
                        {...registerEmpresa("eMail")}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">
                        Celular: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="tel"
                        {...registerEmpresa("celular")}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">Telefono empresa:</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        {...registerEmpresa("telefonoEmpresa")}
                      />
                    </div>
                  </div>
                </div>

                <Subtitle title={"Datos de notificacion"} mt={4} mb={0} />
                <div className="row mx-1">
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">Telefono alterno:</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        {...registerEmpresa("telefonoAlterno")}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="mt-2">
                      <label className="ms-2">E-mail de notificacion:</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="email"
                        {...registerEmpresa("emailNotificacion")}
                      />
                    </div>
                  </div>
                  {actionForm !== ACTION_EDITAR ? (
                    <div className="col-12 col-md-3">
                      <label className="form-label">
                        Municipio de notificacion:
                      </label>
                      <Controller
                        name="municipioNotificacion"
                        control={controlEmpresa}
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={
                              municipiosOptions[
                                formValues.municipioNotificacion
                              ]
                            }
                            onChange={(e) => {
                              resetEmpresa({
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
                            options={municipiosOptions}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <div className="col-12 col-md-3">
                      <div className="mt-2">
                        <label className="ms-2">
                          Municipio de notificacion:
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          value={
                            municipiosOptions[formValues.municipioNotificacion]
                              ?.label
                          }
                          disabled
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-md-8 col-12 mt-3 ms-1">
                    <div className="form-floating input-group input-group-dynamic mt-2">
                      <input
                        className="form-control"
                        type="text"
                        readOnly
                        {...registerEmpresa("direccionDeNotificacion")}
                      />
                      <label className="ms-2">
                        Dirección de notificación:{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <button
                        type="button"
                        className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                        onClick={() => setDireccionNotificacionIsOpen(true)}
                      >
                        Generar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end mx-1 gap-2 mt-3">
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
                    {actionForm === ACTION_EDITAR ? "Actualizar" : "Crear"}
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
            reset={resetEmpresa}
            keyReset="direccionDeNotificacion"
            totalValuesForm={watchEmpresa()}
          />

          <GeneradorDeDirecciones
            isOpenGenerator={direccionEmpresaIsOpen}
            setIsOpenGenerator={setDireccionEmpresaIsOpen}
            completeAddress={direccionEmpresaText}
            setCompleteAddress={setDireccionEmpresaText}
            reset={resetEmpresa}
            keyReset="direccionEmpresa"
            totalValuesForm={watchEmpresa()}
          />
        </div>
      </div>
    </div>
  );
};
export default AdministradorDeEmpresasScreen;
