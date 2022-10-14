import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import GeneradorDeDirecciones from "../../components/GeneradorDeDirecciones";

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
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    tipoDocumento: null,
    paisResidencia: "",
    departamento: "",
    municipio: "",
    municipioDondeLabora: "",
    id_persona: "",
    tipoPersona: "",
    municipioNotificacion: "",
  });
  const {
    register: registerEmpresa,
    handleSubmit: handleSubmitEmpresa,
    control: controlEmpresa,
    reset: resetEmpresa,
    formState: { errors: errorsEmpresa },
  } = useForm();

  const {
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    reset: resetBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const onSubmitBuscar = async (data) => {
    try {
      const { data: dataEmpresa } = await clienteAxios.get(
        `personas/getpersonabydocument/${data?.numeroDocumento}`
      );
      console.log("data empresa", dataEmpresa);
      if (dataEmpresa.tipo_persona !== "J" && dataEmpresa.id_persona) {
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
            navigate("/dashboard/seguridad/administradordeempresas");
          }
        });
        setActionForm(null);
        return;
      } else if (!dataEmpresa.id_persona) {
        Swal.fire({
          title: "No existe una empresa con estos datos",
          text: "¿Quiere seguir buscando o quiere crear una empresa?",
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
              dataEmpresa.tipo_documento?.cod_tipo_documento,
              tipoDocumentoOptions
            )
          ],
        numeroDocumento2: dataEmpresa.numero_documento,
        codVerificacion: dataEmpresa.digito_verificacion,
        nombreComercial: dataEmpresa.nombre_comercial,
        razonSocial: dataEmpresa.razon_social,
        eMail: dataEmpresa.email,
        celular: dataEmpresa.telefono_celular,
        emailNotificacion: dataEmpresa.email_empresarial,
        celularNotificacion: dataEmpresa.telefono_celular_empresa,
        telefonoEmpresa: dataEmpresa.telefono_empresa,
        telefonoAlterno: dataEmpresa.telefono_empresa_2,
        direccionDeNotificacion: dataEmpresa.direccion_notificaciones,
        direccionEmpresa: dataEmpresa.direccion_residencia,
        ubicacionGeografica: dataEmpresa.ubicacion_georeferenciada,
      };
      setFormValues({
        ...formValues,
        tipoDocumento: getIndexBySelectOptions(
          dataEmpresa.tipo_documento?.cod_tipo_documento,
          tipoDocumentoOptions
        ),
        paisResidencia: getIndexBySelectOptions(
          dataEmpresa.pais_residencia,
          paisesOptions
        ),
        departamento: getIndexBySelectOptions(
          dataEmpresa.departamento_residencia,
          departamentosOptions
        ),
        municipio: getIndexBySelectOptions(
          dataEmpresa.municipio_residencia,
          municipiosOptions
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
    console.log("data estado componentes", formValues);
    console.log("data hook form", data);
    console.log("direccion de notificacion", data.direccionDeNotificacion);

    const updateEmpresa = {
      tipo_persona: formValues.tipoPersona,
      id_persona: formValues.id_persona,
      tipo_documento: tipoDocumentoOptions[formValues.tipoDocumento]?.value,
      numero_documento: data.numeroDocumento2,
      digito_verificacion: data.codVerificacion,
      nombre_comercial: data.nombreComercial,
      razon_social: data.razonSocial,
      email: data.eMail,
      email_empresarial: data.emailNotificacion,
      telefono_celular: data.celular,
      telefono_empresa: data.telefonoEmpresa,
      telefono_empresa_2: data.telefonoAlterno,
      pais_residencia: formValues.paisResidencia?.value,
      departamento_residencia:
        departamentosOptions[formValues.departamento]?.value,
      municipio_residencia: municipiosOptions[formValues.municipio]?.value,
      direccion_notificaciones: data.direccionDeNotificacion,
      direccion_residencia: data.direccionEmpresa,
      cod_municipio_notificacion_nal:
        municipiosOptions[formValues.municipioNotificacion]?.value,
      ubicacion_georeferenciada: data.ubicacionGeografica,
    };

    console.log("updated persona", updateEmpresa);

    if (actionForm === "editar") {
      try {
        await clienteAxios.put(
          `personas/updatepersonajuridica/${formValues?.id_persona}/`,
          updateEmpresa
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
        updateEmpresa.tipo_persona = "J";
        await clienteAxios.post(
          "personas/registerpersonajuridica/",
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

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
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
        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

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

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-4">
          Administrador de empresas
        </h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <div className="row">
            <h5 className="font-weight-bolder">Buscar empresa</h5>
            <form
              className="mt-4 row align-items-center"
              onSubmit={handleSubmitBuscar(onSubmitBuscar)}
            >
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
                    Número de documento: <span className="text-danger">*</span>
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
              <div className="col-12 col-md-4 mt-2 mt-md-0">
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
            </form>

            {actionForm && (
              <form onSubmit={handleSubmitEmpresa(onSubmitEmpresa)}>
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
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Numero de documento"
                          {...registerEmpresa("numeroDocumento2", {
                            required: true,
                          })}
                        />
                        <label className="ms-2">
                          Número de documento:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {errorsEmpresa.numeroDocumento2 && (
                          <div className="col-12">
                            <small className="text-center text-danger">
                              Este campo es obligatorio
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="number"
                          placeholder="codigo de verificacion"
                          {...registerEmpresa("codVerificacion", {
                            required: true,
                            maxLength: 1,
                          })}
                        />
                        <label className="ms-2">
                          Cod. verificacion:{" "}
                          <span className="text-danger">*</span>
                        </label>
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
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nombre comercial"
                        {...registerEmpresa("nombreComercial")}
                      />
                      <label className="ms-2">Nombre comercial:</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        placeholder="Razon social"
                        type="text"
                        {...registerEmpresa("razonSocial")}
                      />
                      <label className="ms-2">
                        Razon social: <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                </div>
                <h5 className="font-weight-bolder mt-4">Datos de contacto</h5>
                <hr className="dark horizontal my-0" />
                <div className="mt-4 row">
                  <div className="col-12 col-md-4">
                    <label className="form-label">País:</label>
                    <Controller
                      name="paisResidencia"
                      control={controlEmpresa}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={paisesOptions[formValues.paisResidencia]}
                          onChange={(e) => {
                            resetEmpresa({ paisResidencia: e.value });
                            setFormValues({
                              ...formValues,
                              paisResidencia: e,
                            });
                          }}
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">
                      Departamento: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="departamento"
                      control={controlEmpresa}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={departamentosOptions[formValues.departamento]}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              departamento: getIndexBySelectOptions(
                                e.value,
                                departamentosOptions
                              ),
                            });
                          }}
                          options={departamentosOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">
                      Municipio: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="municipio"
                      control={controlEmpresa}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={municipiosOptions[formValues.municipio]}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              municipio: getIndexBySelectOptions(
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
                  <div className="row">
                    <div className="col-md-8 col-12">
                      <div className="form-floating input-group input-group-dynamic mt-2">
                        <input
                          className="form-control"
                          type="text"
                          readOnly
                          {...registerEmpresa("direccionEmpresa")}
                        />
                        <label className="ms-2">Dirección de empresa:</label>
                        <button
                          type="button"
                          className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                          onClick={() => setDireccionEmpresaIsOpen(true)}
                        >
                          Generar
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="E-mail"
                          {...registerEmpresa("eMail")}
                        />
                        <label className="ms-2">
                          E-mail: <span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Celular"
                        {...registerEmpresa("celular")}
                      />
                      <label className="ms-2">
                        Celular: <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Telefono empresa"
                        {...registerEmpresa("telefonoEmpresa")}
                      />
                      <label className="ms-2">Telefono empresa:</label>
                    </div>
                  </div>
                </div>

                <h5 className="font-weight-bolder mt-3">
                  Datos de notificacion
                </h5>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Telefono alterno"
                        {...registerEmpresa("telefonoAlterno")}
                      />
                      <label className="ms-2">Telefono alterno:</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="E-mail"
                        {...registerEmpresa("emailNotificacion")}
                      />
                      <label className="ms-2">E-mail de notificacion:</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Celular de notificacion"
                        {...registerEmpresa("celularNotificacion")}
                      />
                      <label className="ms-2">Celular de notificacion: </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 col-12">
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
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Ubicacion geografica"
                          {...registerEmpresa("ubicacionGeografica")}
                        />
                        <label className="ms-2">
                          Ubicacion geografica:{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
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
                              resetEmpresa({ municipioNotificacion: e.value });
                              setFormValues({
                                ...formValues,
                                municipioNotificacion: e,
                              });
                            }}
                            options={municipiosOptions}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="btn bg-gradient-primary mb-0 d-block ms-auto mt-4 text-capitalize"
                  type="submit"
                >
                  {actionForm === "editar" ? "Actualizar" : "Crear"}
                </button>
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
          />

          <GeneradorDeDirecciones
            isOpenGenerator={direccionEmpresaIsOpen}
            setIsOpenGenerator={setDireccionEmpresaIsOpen}
            completeAddress={direccionEmpresaText}
            setCompleteAddress={setDireccionEmpresaText}
            reset={resetEmpresa}
            keyReset="direccionEmpresa"
          />
        </div>
      </div>
    </div>
  );
};
export default AdministradorDeEmpresasScreen;
