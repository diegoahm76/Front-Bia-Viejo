import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import Subtitle from "../../components/Subtitle";
import clienteAxios from "../../config/clienteAxios";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";

//Todo: Esto se debe quitar cuando se tengan los roles
const paisesOptions = [
  { label: "Colombia", value: "COL" },
  { label: "Mexico", value: "MX" },
  { label: "Venezuela", value: "VEN" },
  { label: "Venezuel", value: "VON" },
  { label: "Venezue", value: "VIN" },
  { label: "Venezu", value: "VUN" },
];

const AdministradosDeUsuario = () => {
  const { id_usuario } = useSelector((state) => state.user.user);
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

        const accessToken = getTokenAccessLocalStorage();
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const { data: dataRoles } = await clienteAxios.get(
          "roles/get-list",
          config
        );

        console.log("dataRoles", dataRoles);

        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);

        setTipoDocumentoOptions(documentosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const onSubmitBuscar = async (data) => {
    //console.log("Buscar", data);
    try {
      const { data: dataPersona } = await clienteAxios.get(
        `users/get-by-numero-documento/${data.tipoDocumento.value}/${data.numeroDocumento}`
      );

      //console.log("dataPersona", dataPersona);

      if (dataPersona?.Persona) {
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
            //console.log("dataPersonaAcccionConfirm", dataPersona?.Persona);
            setPersonaData(dataPersona?.Persona);
          }
        });
      } else if (dataPersona?.data) {
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
      } else if (dataPersona?.Usuario) {
        setUserData(dataPersona?.Usuario);
        setActionForm("editar");
        const usuarioOverrideData = {
          nombreUsuario: dataPersona?.Usuario.nombre_de_usuario,
          bloqueado: dataPersona?.Usuario.is_blocked,
          activo: dataPersona?.Usuario.is_active,
          tipoUsuario: dataPersona?.Usuario.tipo_usuario === "I" ? true : false,
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
    const accessToken = getTokenAccessLocalStorage();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (actionForm === "crear") {
      try {
        const nuevoUsuario = {
          email: personaData.email,
          nombre_de_usuario: data.nombreUsuario,
          persona: personaData.id_persona,
          password: data.password,
          id_usuario_creador: id_usuario,
          tipo_usuario: data.tipoUsuario ? "I" : "E",
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
    } else if (actionForm === "editar") {
      try {
        //console.log("persona", userData)
        const editarUsuario = {
          nombre_de_usuario: data.nombreUsuario,
          tipo_usuario: data.tipoUsuario ? "I" : "E",
          is_active: data.activo,
          is_blocked: data.bloqueado,
        };

        const { data: dataEditar } = await clienteAxios.patch(
          `users/update/${userData.id_usuario}/`,
          editarUsuario,
          config
        );
        //console.log("editado", dataEditar)
        Swal.fire(
          "Correcto",
          "El usuario se actualizo correctamente",
          "success"
        );
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
          <div className="row">
            <form onSubmit={handleSubmitBuscar(onSubmitBuscar)}>
              <Subtitle title={"Buscar persona"} mt={0} mb={0} />
              <div className="mt-4 row align-items-center">
                <div className="col-12 col-md-4">
                  <label className="form-label">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>{" "}
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
              <form onSubmit={handleSubmitUsuario(onSubmitUsuario)}>
                <Subtitle title={"Datos de usuario"} mt={4} mb={0} />
                <hr className="dark horizontal my-0" />
                <div className="row mt-1">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
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
                <Subtitle title={"Modulos / Grupos / Roles"} mt={4} mb={0} />
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
        </div>
      </div>
    </div>
  );
};
export default AdministradosDeUsuario;
