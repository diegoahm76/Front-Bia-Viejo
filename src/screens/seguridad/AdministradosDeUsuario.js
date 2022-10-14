import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";

//Todo: Esto se debe quitar cuando se tengan los roles
const paisesOptions = [
  { label: "Colombia", value: "COL" },
  { label: "Mexico", value: "MX" },
  { label: "Venezuela", value: "VEN" },
];

const AdministradosDeUsuario = () => {
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [actionForm, setActionForm] = useState(null);
  const navigate = useNavigate();
  const {
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    reset: resetBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const {
    register: registerUsuario,
    handleSubmit: handleSubmitUsuario,
    control: controlUsuario,
    reset: resetUsuario,
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
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4MzA4OTU2LCJpYXQiOjE2NjU3MTY5NTYsImp0aSI6ImZhNTdmYzM1ZjI1MzQyNzk5ZjE1NjU5Yjg5YTRjOGMyIiwidXNlcl9pZCI6MX0.K1aGseNPIlSbOyIZVTOGzb316mt-dZgHy31tIt5o7Dg",
        },
      };

      const { data: dataPersona } = await clienteAxios.get(
        `personas/getpersonabydocument/${data?.numeroDocumento}`
      );

      const { data: getUsers } = await clienteAxios.get("users/get", config);

      console.log(getUsers);
      const userFiltered = getUsers.filter(
        (user) => user.persona?.numero_documento === data.numeroDocumento
      );

      if (!dataPersona.id_persona) {
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
      } else if (userFiltered.length) {
        setUserData(userFiltered[0]);
        setActionForm("editar");
      } else {
        Swal.fire({
          title: "Este numero de documento no tiene un usuario asignado",
          text: "¿Desea registrar un nuevo usuario?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            setActionForm("crear");
          }
        });
      }
      const usuarioOverrideData = {
        nombreUsuario: userFiltered[0].nombre_de_usuario,
        bloqueado: userFiltered[0].is_blocked,
        activo: userFiltered[0].is_active,
        tipoUsuario: userFiltered[0].tipo_usuario === "E" ? false : true,
      };
      resetUsuario(usuarioOverrideData);
      console.log(userFiltered);
    } catch (err) {}
  };

  const onSubmitUsuario = async (data) => {
    console.log(data);
    const user = {
      email: userData.email,
      nombre_de_usuario: data.nombreDeUsuario,
      persona: userData.id_persona,
      password: data.password,
      id_usuario_creador: null,
      tipo_usuario: "E", // Debería ser por defecto que se creara en E
    };

    const config2 = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data: userRegister } = await clienteAxios.post(
      "users/register/",
      user,
      config2
    );
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
                      {...registerBuscar("numeroDocumento", { required: true })}
                    />
                    <label className="ms-2">
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
                <h5 className="font-weight-bolder mt-3">Datos de usuario</h5>
                <hr className="dark horizontal my-0" />
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      disabled
                      placeholder="Telefono"
                      {...registerUsuario("nombreUsuario", {
                        required: true,
                      })}
                    />
                    <label className="ms-2">Nombre de usuario:</label>
                  </div>
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
                      <label className="ms-2">Motivo de la accion:</label>
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
                      <label className="ms-2">Motivo de la accion:</label>
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
                    name="paisResidencia"
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
                    name="paisResidencia"
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
                <div className="form-check mt-5">
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
        </div>
      </div>
    </div>
  );
};
export default AdministradosDeUsuario;
