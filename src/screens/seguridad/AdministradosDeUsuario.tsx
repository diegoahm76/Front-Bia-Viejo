import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import BusquedaAvanzadaUsuarioModal from "../../components/BusquedaAvanzadaUsuarioModal";
import Subtitle from "../../components/Subtitle";
import clienteAxios from "../../config/clienteAxios";
import { getConfigAuthBearer } from "../../helpers/configAxios";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
import botonBuscar from "../../assets/iconosBotones/buscar.svg";
import botonCancelar from "../../assets/iconosBotones/cancelar.svg";
import botonAgregar from "../../assets/iconosBotones/agregar.svg";
import botonActualizar from "../../assets/iconosBotones/actualizar.svg";
import Login from "../../store/slices/Login";
import { useAppSelector } from "../../store/hooks/hooks";
import { IGeneric } from "../../Interfaces/Generic";

//Todo: Esto se debe quitar cuando se tengan los roles
const paisesOptions = [
  { label: "Colombia", value: "COL" },
  { label: "Mexico", value: "MX" },
  { label: "Venezuela", value: "VEN" },
];

const defaultDataOverride = {
  nombreUsuario: "",
  password: "",
  password2: "",
  bloqueado: "",
  activo: "",
  tipoUsuario: "",
  roles: [],
  tipoTercero: [],
};
const initialOptions: IGeneric[] = [
  {
    label: "",
    value: "",
  },
];

const busquedaAvanzadaModel = {
  tipoDocumento: { value: "Seleccionar", label: "Seleccionar" },
  cedula: "",
}

const usuarioDataModel = {
  email: "",
  id_usuario: 0,
  is_blocked: false,
  nombre_de_usuario: "",
  profile_img: "",
  tipo_usuario: "",
  user_permissions: []
}

const AdministradosDeUsuario = () => {
  const { id_usuario } = useAppSelector((state) => state.login.userinfo);
  const [loading, setLoading] = useState(false);
  const [busquedaModel, setBusquedaModel] = useState(busquedaAvanzadaModel)
  const [busquedaAvanzadaIsOpen, setBusquedaAvanzadaIsOpen] = useState(false);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState(initialOptions);
  const [userData, setUserData] = useState(usuarioDataModel);
  const [isHandleSubmit, setIsHandleSubmit] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [personaData, setPersonaData] = useState({});
  const [actionForm, setActionForm] = useState("");
  const [rolesOptions, setRolesOptions] = useState([]);
  const [bloqueoTipoUsuario, setBloqueoTipoUsuario] = useState(false);
  const [formValuesSearch, setFormValuesSearch] = useState({
    tipoDocumento: "",
  });

  // MultiSelect Roles
  const [multiSelect, setMultiSelect] = useState<IGeneric[]>([]);

  const [formValues, setFormValues] = useState({
    roles: [],
  });
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const {
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    reset: resetBuscar,
    setValue,
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

  // const accessToken = getTokenAccessLocalStorage();
  // const config = getConfigAuthBearer(accessToken);

  useEffect(() => {
    const getSelectsOptions = async () => {
      setLoading(true);
      try {
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );

        const { data: dataRoles } = await clienteAxios.get(
          "roles/get-list"
        );

        const rolesFormat = dataRoles.map((rol) => ({
          label: rol.nombre_rol,
          value: rol.id_rol,
        }));

        setRolesOptions(rolesFormat);

        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);

        setTipoDocumentoOptions(documentosFormat);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getSelectsOptions();
  }, []);

  const onSubmitBuscar = async () => {
    setLoading(true);
    await clienteAxios.get(
      `users/get-by-numero-documento/${busquedaModel.tipoDocumento.value}/${busquedaModel.cedula}`
    ).then((res) => {
      setLoading(false);
      const dataPersona = res.data;
      setUserData(dataPersona.Usuario);
      setActionForm("editar");

      if (dataPersona?.Usuario.tipo_usuario === "I") {
        setBloqueoTipoUsuario(true);
      } else if (dataPersona?.Usuario.tipo_usuario === "E") {
        setBloqueoTipoUsuario(false);
      }

      const indexRoles = dataPersona?.Roles.map((rol) => rol.id_rol);
      const dataRolesIndex = getIndexBySelectOptions(
        indexRoles,
        rolesOptions
      );
      const optionsBySelect = dataRolesIndex.map(
        (roleIndex) => rolesOptions[roleIndex]
      );
      // valores por defecto multiselect
      setMultiSelect(optionsBySelect);

      const usuarioOverrideData = {
        nombreUsuario: dataPersona?.Usuario.nombre_de_usuario,
        bloqueado: dataPersona?.Usuario.is_blocked,
        activo: dataPersona?.Usuario.is_active,
        tipoUsuario: dataPersona?.Usuario.tipo_usuario === "I" ? true : false,
        roles: optionsBySelect,
      };

      resetUsuario(usuarioOverrideData);
    }).catch((err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data,
        showConfirmButton: true,
      });
      setLoading(false);
    });

    // if (!dataPersona.success) {
    //   Swal.fire({
    //     title: "No existe una persona con este documento",
    //     text: "¿Desea registrar una nueva persona?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3BA9E0",
    //     cancelButtonColor: "#6c757d",
    //     confirmButtonText: "Si",
    //     cancelButtonText: "No",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.fire({
    //         title: "Elegir tipo persona",
    //         text: "¿Que tipo de persona desea crear?",
    //         icon: "info",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3BA9E0",
    //         cancelButtonColor: "#6c757d",
    //         confirmButtonText: "Natural",
    //         cancelButtonText: "Juridica",
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           navigate("/dashboard/seguridad/administradordepersonas");
    //         } else {
    //           navigate("/dashboard/seguridad/administradordeempresas");
    //         }
    //       });
    //     }
    //   });
    // } else if (!dataPersona.Usuario) {
    //   Swal.fire({
    //     title: "Este numero de documento no tiene un usuario asignado",
    //     text: "¿Desea registrar un nuevo usuario?",
    //     icon: "info",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3BA9E0",
    //     cancelButtonColor: "#6c757d",
    //     confirmButtonText: "Si",
    //     cancelButtonText: "No",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       setActionForm("crear");
    //       resetUsuario(defaultDataOverride);
    //       setPersonaData(dataPersona?.Persona);
    //     }
    //   });
    // } else {

    // }
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

    setLoading(true);
    if (actionForm === "crear") {
      const rolesFormat = multiSelect.map((rol) => ({ id_rol: rol.value }));

      const nuevoUsuario = {
        //  email: personaData.email,
        nombre_de_usuario: data.nombreUsuario,
        // persona: personaData.id_persona,
        password: data.password,
        id_usuario_creador: id_usuario,
        tipo_usuario: "I",
        roles: rolesFormat,
        redirect_url:
          process.env.NODE_ENV === "production"
            ? "https://macareniafrontdevelop.netlify.app/#/login"
            : "http://localhost:3000/#/login",
      };

      await clienteAxios.post("users/register/", nuevoUsuario).then((res) => {
        Swal.fire({
          title: "Usuario registrado correctamente",
          text: "Revise su bandeja de correo electronico para confirmar el registro",
          icon: "success",
          confirmButtonColor: "#3BA9E0",
          confirmButtonText: "Continuar",
        });
        setActionForm("");
        resetUsuario(defaultDataOverride);
      }).catch((error) => {

      });
    } else if (actionForm === "editar") {
      let form_data = new FormData();
      form_data.append("image", image);
      form_data.append("id_usuario", userData.id_usuario.toString())

      const configImage = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      clienteAxios
        .post("users/upload/", form_data, configImage)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.data.detail,
            showConfirmButton: true,
          });
        });
      const rolesReFormat = multiSelect.map((rol) => ({
        nombre_rol: rol.label,
        id_rol: rol.value,
      }));
      const editarUsuario = {
        nombre_de_usuario: data.nombreUsuario,
        tipo_usuario: data.tipoUsuario ? "I" : "E",
        profile_img: image,
        is_active: data.activo,
        is_blocked: data.bloqueado,
        roles: rolesReFormat,
      };

      await clienteAxios.patch(
        `users/update/${userData.id_usuario}/`,
        editarUsuario
      ).then((res) => {
        Swal.fire(
          "Correcto",
          "El usuario se actualizo correctamente",
          "success"
        );
      }).catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.response.data.detail,
          showConfirmButton: true,
        });
      });


    }
    setLoading(false);
  };

  const getIndexBySelectOptions = (valuesSelect, selectOptions) => {
    const idResult: any[] = [];
    const idSelectOptions = selectOptions.map((option) => option.value);
    // REVISAR
    idSelectOptions.forEach((optionId, index) => {
      if (valuesSelect.includes(optionId)) {
        idResult.push(index);
      }
    });
    return idResult;
  };

  const getDefaultValuesOptions = () => {
    const defaultValues = formValues.roles?.map(
      (option) => rolesOptions[option]
    );
    return defaultValues;
  };

  const handleCancelAction = () => {
    setActionForm("");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0])
      );
    }
  };

  const changeSelectTipo = (e) => {
    let tipo = { ...busquedaModel }
    tipo.tipoDocumento = {
      value: e.value,
      label: e.label
    }
    setValue("tipo_documento", tipo.tipoDocumento);
    setBusquedaModel(tipo)
  }

  const handleChange = (e) => {
    let cedula = { ...busquedaModel }
    cedula.cedula = e.target.value;
    setBusquedaModel(cedula)
  }

  const setMultipleValue = (e) => {
    setMultiSelect(e);

  }
  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <div className="row">
            <form onSubmit={handleSubmitBuscar(onSubmitBuscar)}>
              <h3 className="mt-3 mb-0 ms-3 fw-light text-terciary">
                Administrador de usuarios
              </h3>
              <Subtitle title={"Buscar persona"} mt={3} />
              <div className="mt-4 row ">
                <div className="col-12 col-md-3">
                  <label className="text-terciary">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>
                  <Select
                    value={busquedaModel.tipoDocumento}
                    options={tipoDocumentoOptions}
                    onChange={changeSelectTipo}
                    placeholder="Seleccionar"
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
                  <label className="text-terciary">Número de documento:</label>
                  <input
                    type="number"
                    name="documento"
                    className="border border-terciary form-control border rounded-pill px-3"
                    value={busquedaModel.cedula}
                    onChange={handleChange}
                    maxLength={15}
                  />
                  {errorsBuscar.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-6 mt-4">
                  <button
                    type="submit"
                    className="mb-0 btn-image text-capitalize bg-white border boder-none"
                  >
                    <i className="fa-solid fa-magnifying-glass fs-3 mt-2" title="Buscar"></i>
                  </button>
                  <button
                    type="button"
                    className="ms-3 btn bg-gradient-primary  text-capitalize"
                    onClick={() => setBusquedaAvanzadaIsOpen(true)}
                  >
                    Búsqueda avanzada
                  </button>
                </div>
              </div>
            </form>

            {actionForm && (
              <form onSubmit={handleSubmitUsuario(onSubmitUsuario)}>
                <Subtitle title={"Datos de usuario"} mt={4} mb={0} />
                <div className="row mt-3 ms-1">
                  <label>Seleccione una imagen</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                  />
                  {/* <img id="target" style={{ width: "50px", height: "50px" }} alt="imagen" src={image} /> */}
                  <br />
                  <div className="col-12 col-md-3">
                    <div>
                      <label className="text-terciary">
                        Nombre de usuario:<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="border border-terciary form-control border rounded-pill px-3"
                        autoComplete="off"
                        {...registerUsuario("nombreUsuario", {
                          required: true,
                          minLength: 6,
                        })}
                      />
                    </div>
                    {errorsUsuario.nombreUsuario && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio y de 6 caracteres
                        </small>
                      </div>
                    )}
                  </div>
                  {actionForm === "crear" && (
                    <>
                      <div className="col-12 col-md-3">
                        <label className="text-terciary">
                          Contraseña: <span className="text-danger">*</span>
                        </label>
                        <input
                          className="border border-terciary form-control border rounded-pill px-3"
                          type="password"
                          autoComplete="off"
                          {...registerUsuario("password", {
                            required: true,
                          })}
                        />
                        {errorsUsuario.password && (
                          <small className="text-danger">
                            Este campo es obligatorio
                          </small>
                        )}
                      </div>
                      <div className="col-12 col-md-3">
                        <label className="text-terciary">
                          Confirmar contraseña:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="border border-terciary form-control border rounded-pill px-3"
                          type="password"
                          {...registerUsuario("password2", {
                            required: true,
                          })}
                        />
                        {errorsUsuario.password2 && (
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
                {actionForm === "editar" && (
                  <>
                    <div className="row flex-column mt-3 ms-1">
                      <p className="font-weight-bolder text-terciary">
                        Estado del usuario
                      </p>
                      <div className="form-check col-md-5 col-12 col-xs-6 ps-0 pe-10 ms-3 d-flex">
                        <label
                          className="form-check-label text-terciary"
                          htmlFor="flexCheckDefault"
                        >
                          Bloqueado
                        </label>
                        <input
                          className="border border-terciary form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault1"
                          {...registerUsuario("bloqueado")}
                        />
                      </div>
                      <div className="form-check col-md-5 col-xs-6 col-12 ps-0 pe-10 ms-3 d-flex">
                        <label
                          className="form-check-label text-terciary"
                          htmlFor="flexCheckDefault"
                        >
                          Activo
                        </label>
                        <input
                          className="border border-terciary form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          {...registerUsuario("activo")}
                        />
                      </div>
                    </div>
                    {/* <div className="d-flex flex-column flex-md-row align-items-end gap-3 gap-md-1 ms-3">
                      <div className="col-12 col-md-3">
                        <label className="text-terciary">
                          Motivo de la accion:
                        </label>
                        <input
                          type="text"
                          className="border border-terciary form-control border rounded-pill px-3"
                          {...registerUsuario("ubicacionGeografica")}
                        />
                      </div>
                      <button className="btn btn-primary text-capitalize mb-0">
                        Actualizar
                      </button>
                    </div> */}

                    <p className="font-weight-bolder text-terciary mt-3 ms-3">
                      Tipo de usuario
                    </p>
                    <div className="row flex-column">
                      <div className="col-6 col-md-4">
                        <div className="form-check form-switch d-flex gap-2 ps-0 ms-3">
                          <label className="me-5 text-terciary">Externo</label>
                          <input
                            className="form-check-input mt-1"
                            type="checkbox"
                            role="switch"
                            value=""
                            disabled={bloqueoTipoUsuario}
                            {...registerUsuario("tipoUsuario")}
                          />
                          <label className="ms-2 text-terciary">Interno</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-end gap-3 gap-md-1 align-items-end gap-1 ms-3">
                      <div className="col-12 col-md-3">
                        <label className="text-terciary">
                          Motivo de la accion:
                        </label>
                        <input
                          type="text"
                          className="border border-terciary form-control border rounded-pill px-3"
                        />
                      </div>
                      <button className="btn bg-gradient-primary text-capitalize mb-0">
                        Actualizar
                      </button>
                    </div>
                  </>
                )}
                <Subtitle title={"Módulos / Grupos / Roles"} mt={4} mb={0} />
                <div className="col-12 col-md-3 ms-3 mt-4">
                  <label className="form-label text-terciary">Roles:</label>
                  <Select
                    isMulti
                    value={multiSelect}
                    onChange={setMultipleValue}
                    options={rolesOptions}
                  />
                  {/* <button onClick={setMultipleValue}> test boton </button> */}
                </div>
                {/* <div className="col-12 col-md-3 ms-3 mt-4">
                  <label className="form-label text-terciary">
                    Tipo de tercero:
                  </label>
                  <Controller
                    name="tipoTercero"
                    control={controlUsuario}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        //defaultValue={[paisesOptions[0], paisesOptions[1]]}
                        options={paisesOptions}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div> */}
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
                      <i className="fa-solid fa-x fs-3" title="Cancelar"></i>
                    )}
                  </button>

                  <button
                    className="mb-0 btn-image text-capitalize bg-white border boder-none"
                    type="submit"
                    onClick={handleClickSubmit}
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
                      <i className="fa-solid fa-arrows-rotate fs-3" title="Actualizar"></i>
                    ) : (
                      <i className="fa-regular fa-plus fs-3" title="Crear" ></i>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          <BusquedaAvanzadaUsuarioModal
            isModalActive={busquedaAvanzadaIsOpen}
            setIsModalActive={setBusquedaAvanzadaIsOpen}
            formValues={formValuesSearch}
            setFormValues={setFormValuesSearch}
            setModel={setBusquedaModel}
            reset={resetBuscar}
            tipoDocumentoOptions={tipoDocumentoOptions}
          />
        </div>
      </div >
    </div >
  );
};
export default AdministradosDeUsuario;
