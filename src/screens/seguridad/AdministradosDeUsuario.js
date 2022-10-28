import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import MarcaDeAgua1 from "../../components/MarcaDeAgua1";
import clienteAxios from "../../config/clienteAxios";

//Todo: Esto se debe quitar cuando se tengan los roles
const paisesOptions = [
  { label: "Colombia", value: "COL" },
  { label: "Mexico", value: "MX" },
  { label: "Venezuela", value: "VEN" },
];

const AdministradosDeUsuario = () => {
  const { email: emailLogin, tokens } = useSelector((state) => state.user.user);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isHandleSubmit, setIsHandleSubmit] = useState(false);
  const [errorPassword, setErrorPassword] = useState(null);
  const [personaData, setPersonaData] = useState({});
  const [actionForm, setActionForm] = useState(null);
  const navigate = useNavigate();
  const {
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    //reset: resetBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const {
    register: registerUsuario,
    handleSubmit: handleSubmitUsuario,
    control: controlUsuario,
    reset: resetUsuario,
    watch,
    formState: { errors: errorsUsuario },
  } = useForm();

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );

        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);

        setTipoDocumentoOptions(documentosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const onSubmitBuscar = async (data) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      };

      const { data: dataPersona } = await clienteAxios.get(
        `users/get-by-numero-documento/${data?.numeroDocumento}`,
        config
      );

      if (dataPersona[1]?.persona) {
        Swal.fire({
          title: "Este numero de documento no tiene un usuario asignado",
          text: "¿Desea registrar un nuevo usuario?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            setActionForm("crear");
            setPersonaData(dataPersona[0]);
          }
        });
      } else if (!dataPersona?.persona) {
        Swal.fire({
          title: "No existe una persona con este documento",
          text: "¿Desea registrar una nueva persona?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Elegir tipo persona",
              text: "¿Que tipo de persona desea crear?",
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3BA9E0",
              cancelButtonColor: "#6c757d",
              confirmButtonText: "Natural",
              cancelButtonText: "Juridica",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/dashboard/seguridad/administradordepersonas");
              } else {
                navigate("/dashboard/seguridad/administradordeempresas");
              }
            });
          }
        });
      } else if (dataPersona?.id_usuario) {
        setUserData(dataPersona);
        setActionForm("editar");
        const usuarioOverrideData = {
          nombreUsuario: dataPersona.nombre_de_usuario,
          bloqueado: dataPersona.is_blocked,
          activo: dataPersona.is_active,
          tipoUsuario: dataPersona.tipo_usuario === "I" ? true : false,
        };
        resetUsuario(usuarioOverrideData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSubmit = () => {
    setIsHandleSubmit(true);
  };

  useEffect(() => {
    if (isHandleSubmit) {
      if (watch("password") !== watch("password2")) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
    }
  }, [watch("password"), watch("password2")]);

  const onSubmitUsuario = async (data) => {
    if (actionForm === "crear") {
      try {
        const { data: personaLogin } = await clienteAxios.get(
          `personas/get-by-email/${emailLogin}`
        );

        const configLogin = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        };

        const { data: userLogin } = await clienteAxios.get(
          `users/get-by-numero-documento/${personaLogin.numero_documento}`,
          configLogin
        );

        const nuevoUsuario = {
          email: personaData.email,
          nombre_de_usuario: data.nombreUsuario,
          persona: personaData.id_persona,
          password: data.password,
          id_usuario_creador: userLogin.id_usuario,
          tipo_usuario: data.tipoUsuario ? "I" : "E",
        };

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        await clienteAxios.post("users/register/", nuevoUsuario, config);

        Swal.fire({
          title: "Usuario registrado correctamente",
          text: "Revise su bandeja de correo electronico para confirmar el registro",
          icon: "success",
          confirmButtonColor: "#3BA9E0",
          confirmButtonText: "Continuar",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-4">
          Administrador de usuarios
        </h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <MarcaDeAgua1>
            <div className="row">
              <form
                onSubmit={handleSubmitBuscar(onSubmitBuscar)}
                id="buscarPersonaForm"
              >
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
                        {...registerBuscar("numeroDocumento", {
                          required: true,
                        })}
                      />
                      <label>
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
                      form="buscarPersonaForm"
                      className="btn bg-gradient-primary mb-0 text-capitalize"
                    >
                      Buscar
                    </button>
                    <button className="ms-3 btn bg-gradient-primary mb-0 text-capitalize">
                      Busqueda avanzada
                    </button>
                  </div>
                </div>
              </form>

              {actionForm && (
                <form onSubmit={handleSubmitUsuario(onSubmitUsuario)}>
                  <h5 className="font-weight-bolder mt-4">Datos de usuario</h5>
                  <hr className="dark horizontal my-0" />
                  <div className="row mt-1">
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="tel"
                          disabled={actionForm === "editar"}
                          placeholder="Nombre de usuario:"
                          {...registerUsuario("nombreUsuario", {
                            required: true,
                          })}
                        />
                        <label>
                          Nombre de usuario:{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    {actionForm === "crear" && (
                      <>
                        <div className="col-12 col-md-4">
                          <div className="form-floating input-group input-group-dynamic">
                            <input
                              className="form-control"
                              type="password"
                              placeholder="Contraseña"
                              {...registerUsuario("password", {
                                required: true,
                              })}
                            />
                            <label>
                              Contraseña: <span className="text-danger">*</span>
                            </label>
                          </div>
                          {errorsUsuario.password && (
                            <small className="text-danger">
                              Este campo es obligatorio
                            </small>
                          )}
                        </div>

                        <div className="col-12 col-md-4">
                          <div className="form-floating input-group input-group-dynamic">
                            <input
                              className="form-control"
                              type="password"
                              placeholder="Contraseña"
                              {...registerUsuario("password2", {
                                required: true,
                              })}
                            />
                            <label>
                              Confirmar contraseña:{" "}
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          {errorsUsuario.password && (
                            <small className="text-danger">
                              Este campo es obligatorio
                            </small>
                          )}
                          {errorPassword === true && (
                            <small className="text-danger">
                              Las contraseñas no coinciden
                            </small>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="row flex-column mt-3">
                    <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex">
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Bloqueado
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        {...registerUsuario("bloqueado")}
                      />
                    </div>
                    <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex">
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Activo
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        {...registerUsuario("activo")}
                      />
                    </div>
                  </div>
                  <div className="row aling-items-center">
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Ubicacion geografica"
                          {...registerUsuario("ubicacionGeografica")}
                        />
                        <label>Motivo de la accion:</label>
                      </div>
                    </div>
                    <button className="btn btn-primary text-capitalize col-12 col-md-2 mb-0 mt-3 ms-3">
                      Actualizar
                    </button>
                  </div>
                  <p className="font-weight-bolder mt-4">Tipo de usuario</p>
                  <div className="row flex-column">
                    <div className="col-6 col-md-4">
                      <div className="form-check form-switch d-flex gap-2">
                        <label className="me-5">Externo</label>
                        <input
                          className="form-check-input mt-1"
                          type="checkbox"
                          role="switch"
                          value=""
                          {...registerUsuario("tipoUsuario")}
                        />
                        <label>Interno</label>
                      </div>
                    </div>
                  </div>
                  <div className="row aling-items-center">
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Ubicacion geografica"
                          {...registerUsuario("ubicacionGeografica")}
                        />
                        <label>Motivo de la accion:</label>
                      </div>
                    </div>
                    <button className="btn bg-gradient-primary text-capitalize col-12 col-md-2 mb-0 mt-3 ms-3">
                      Actualizar
                    </button>
                  </div>
                  <h5 className="font-weight-bolder mt-4">
                    Modulos / Grupos / Roles
                  </h5>
                  <hr className="dark horizontal my-0" />
                  <div className="col-12 col-md-4">
                    <label className="form-label">Roles:</label>
                    <Controller
                      name="roles"
                      control={controlUsuario}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          defaultValue={[paisesOptions[0], paisesOptions[1]]}
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">Tipo de tercero:</label>
                    <Controller
                      name="tipoTercero"
                      control={controlUsuario}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          defaultValue={[paisesOptions[0], paisesOptions[1]]}
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  {/* <div className="form-check mt-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Acepta envio de mensaje de texto SMS.
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Acepta envio de mensaje de correo.
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Acepta que la corporacion administre sus datos personales.
                  </label>
                </div> */}
                  <button
                    className="btn bg-gradient-primary mb-0 d-block ms-auto mt-4 text-capitalize"
                    type="submit"
                    onClick={handleClickSubmit}
                  >
                    {actionForm === "editar" ? "Actualizar" : "Registrar"}
                  </button>
                </form>
              )}
            </div>
          </MarcaDeAgua1>
        </div>
      </div>
    </div>
  );
};
export default AdministradosDeUsuario;
