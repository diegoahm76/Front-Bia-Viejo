import { formatISO } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import GeneradorDeDirecciones from "../../components/GeneradorDeDirecciones";
import Subtitle from "../../components/Subtitle";
import clienteAxios from "../../config/clienteAxios";
import { getConfigAuthBearer } from "../../helpers/configAxios";
import { getArrayFromStringDateAAAAMMDD } from "../../helpers/dateHelpers";
import { getIndexBySelectOptions } from "../../helpers/inputsFormat";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";

const ActualizarDatosPersonaScreen = () => {
  const { email: emailLogin } = useSelector((state) => state.user.user);
  const [completeAddress, setCompleteAddress] = useState("");
  const [completeAddress2, setCompleteAddress2] = useState("");
  const [completeAddressLaboral, setCompleteAddressLaboral] = useState("");
  const [isOpenDireccionResidencia, setIsOpenDireccionResidencia] =
    useState(false);
  const [isOpenDireccionNotificacion, setIsOpenDireccionNotificacion] =
    useState(false);
  const [isOpenDireccionLaboral, setIsOpenDireccionLaboral] = useState(false);
  const navigate = useNavigate();
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [sexoOptions, setSexoOptions] = useState([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    fecha_nacimiento: "",
    index_pais_nacimiento: "",
    index_pais_residencia: "",
    index_municipio_residencia: "",
    index_sexo: "",
    index_estado_civil: "",
    index_cod_municipio_laboral_nal: "",
    index_cod_municipio_notificacion_nal: "",
  });

  const {
    reset,
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: sexoNoFormat } = await clienteAxios.get("choices/sexo/");

        const { data: estadoCivilNoFormat } = await clienteAxios.get(
          "choices/estado-civil/"
        );
        const { data: paisesNoFormat } = await clienteAxios.get(
          "choices/paises/"
        );
        const { data: municipiosNoFormat } = await clienteAxios.get(
          "choices/municipios/"
        );

        const estadoCivilFormat = textChoiseAdapter(estadoCivilNoFormat);
        const sexoFormat = textChoiseAdapter(sexoNoFormat);
        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

        setEstadoCivilOptions(estadoCivilFormat);
        setSexoOptions(sexoFormat);
        setPaisesOptions(paisesFormat);
        setMunicipiosOptions(municipiosFormat);

        //TODO Trayendo los datos de la persona
        const personaNatural = "N";
        const { data: dataPersona } = await clienteAxios.get(
          `personas/get-by-email/${emailLogin}/`
        );
        reset(dataPersona);

        console.log("data useEffect", dataPersona);

        if (dataPersona.tipo_persona !== personaNatural) {
          navigate("/dashboard/usuario/actualizar-datos-empresa");
        }

        dataPersona.tipo_documento =
          dataPersona.tipo_documento.cod_tipo_documento;

        setFormValues({
          ...formValues,
          index_pais_residencia: getIndexBySelectOptions(
            dataPersona.pais_residencia,
            paisesFormat
          ),
          index_pais_nacimiento: getIndexBySelectOptions(
            dataPersona.pais_nacimiento,
            paisesFormat
          ),
          index_municipio_residencia: getIndexBySelectOptions(
            dataPersona.municipio_residencia,
            municipiosFormat
          ),
          index_cod_municipio_laboral_nal: getIndexBySelectOptions(
            dataPersona.cod_municipio_laboral_nal,
            municipiosFormat
          ),
          index_cod_municipio_notificacion_nal: getIndexBySelectOptions(
            dataPersona.cod_municipio_notificacion_nal,
            municipiosFormat
          ),
          index_sexo: getIndexBySelectOptions(dataPersona.sexo, sexoFormat),
          index_estado_civil: getIndexBySelectOptions(
            dataPersona.estado_civil?.cod_estado_civil,
            estadoCivilFormat
          ),
          fecha_nacimiento: dataPersona.fecha_nacimiento
            ? new Date(
                getArrayFromStringDateAAAAMMDD(dataPersona.fecha_nacimiento)
              )
            : "",
        });
        reset(dataPersona);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const submit = async (data) => {
    //TODO Ojo para la fecha de nacimiento del actualizar datos
    const {
      tipo_documento,
      numero_documento,
      digito_verificacion,
      nombre_comercial,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion_residencia,
      direccion_residencia_ref,
      email,
      email_empresarial,
      direccion_notificaciones,
      direccion_laboral,
      ubicacion_georeferenciada,
      telefono_celular,
      telefono_fijo_residencial,
      telefono_empresa_2,
      tipo_persona,
    } = data;

    const dataUpdate = {
      tipo_documento,
      numero_documento,
      digito_verificacion,
      nombre_comercial,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion_residencia,
      direccion_residencia_ref,
      email,
      email_empresarial,
      direccion_notificaciones,
      direccion_laboral,
      ubicacion_georeferenciada,
      telefono_celular,
      telefono_fijo_residencial,
      telefono_empresa_2,
      tipo_persona,
      sexo: sexoOptions[formValues.index_sexo]?.value,
      estado_civil: estadoCivilOptions[formValues.index_estado_civil]?.value,
      fecha_nacimiento: formatISO(formValues.fecha_nacimiento, {
        representation: "date",
      }),
      pais_nacimiento: paisesOptions[formValues.index_pais_nacimiento]?.value,
      pais_residencia: paisesOptions[formValues.index_pais_residencia]?.value,
      municipio_residencia:
        municipiosOptions[formValues.index_municipio_residencia]?.value,
      cod_municipio_laboral_nal:
        municipiosOptions[formValues.index_cod_municipio_laboral_nal]?.value,
    };

    const accessToken = getTokenAccessLocalStorage();
    const config = getConfigAuthBearer(accessToken);

    try {
      console.log("data update profile", dataUpdate);
      const { data } = await clienteAxios.patch(
        "personas/persona-natural/usuario-externo/self/update/",
        dataUpdate,
        config
      );
      console.log("Todo good toma tu data", data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Datos actualizados",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form onSubmit={handleSubmit(submit)}>
            <h3 className="mt-3 mb-2 ms-3 fw-light text-terciary">
              Actualizar datos de persona
            </h3>
            <Subtitle title={"Datos personales"} mt={4} mb={2} />
            <div className="row align-items-end mx-1">
              <div className="col-12 col-lg-4">
                <div className="mt-3">
                  <label className="text-terciary">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    readOnly
                    {...register("tipo_documento")}
                  />
                </div>
              </div>
              <div className="col-6 col-lg-4">
                <div className="mt-3">
                  <label className="text-terciary">
                    Número de documento: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    readOnly
                    {...register("numero_documento")}
                  />
                </div>
              </div>
              <div className="col-6 col-lg-4">
                <div className="mt-3">
                  <label className="text-terciary">
                    Codigo de verificación:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    {...register("digito_verificacion", {
                      maxLength: 1,
                    })}
                  />
                </div>
                {errors.digito_verificacion && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio, con numeros y de un carácter
                    </small>
                  </div>
                )}
              </div>
              <div className="col-8 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">Nombre Comercial:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    {...register("nombre_comercial")}
                  />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">
                    Primer nombre: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    readOnly
                    {...register("primer_nombre")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">Segundo nombre:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    {...register("segundo_nombre")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">
                    Primer apellido: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    readOnly
                    {...register("primer_apellido")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">Segundo apellido:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    {...register("segundo_apellido")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4 mt-3">
                <label className="form-label text-terciary">Sexo:</label>
                <Controller
                  name="sexo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={sexoOptions}
                      value={sexoOptions[formValues.index_sexo]}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          index_sexo: getIndexBySelectOptions(
                            e.value,
                            sexoOptions
                          ),
                        })
                      }
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="row">
                <div className="col-12 col-md-4 mt-3 ">
                  <label className="form-label text-terciary">
                    Estado civil:
                  </label>
                  <Controller
                    name="estado_civil"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={estadoCivilOptions}
                        value={
                          estadoCivilOptions[formValues.index_estado_civil]
                        }
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            index_estado_civil: getIndexBySelectOptions(
                              e.value,
                              estadoCivilOptions
                            ),
                          })
                        }
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                <div className="col-md-4 col-12 mt-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="text-terciary"
                  >
                    Fecha de nacimiento <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="fecha_nacimiento"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        showYearDropdown
                        peekNextMonth
                        showMonthDropdown
                        scrollableYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        dateFormat="yyyy/MM/dd"
                        selected={formValues.fecha_nacimiento}
                        value={formValues.fecha_nacimiento}
                        onSelect={(e) => {
                          setFormValues({
                            ...formValues,
                            fecha_nacimiento: e,
                          });
                        }}
                        className="form-control border rounded-pill px-3"
                        placeholderText="aaaa/dd/mm"
                      />
                    )}
                  />
                  {errors.fecha_nacimiento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-4 mt-3">
                  <label className="form-label text-terciary">
                    País de nacimiento:
                  </label>
                  <Controller
                    name="pais_nacimiento"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={paisesOptions}
                        value={paisesOptions[formValues.index_pais_nacimiento]}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            index_pais_nacimiento: getIndexBySelectOptions(
                              e.value,
                              paisesOptions
                            ),
                          })
                        }
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* LUGAR DE RESIDENCIA */}
            <Subtitle title={"Lugar de residencia"} mt={4} mb={2} />
            <div className="row align-items-end mx-1">
              <div className="col-12 col-md-4 mt-3">
                <label className="form-label text-terciary">País:</label>
                <Controller
                  name="pais_residencia"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={paisesOptions}
                      value={paisesOptions[formValues.index_pais_residencia]}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          index_pais_residencia: getIndexBySelectOptions(
                            e.value,
                            paisesOptions
                          ),
                        })
                      }
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-4 mt-3">
                <label className="form-label text-terciary">Municipio: </label>
                <Controller
                  name="municipio_residencia"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      value={
                        municipiosOptions[formValues.index_municipio_residencia]
                      }
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          index_municipio_residencia: getIndexBySelectOptions(
                            e.value,
                            municipiosOptions
                          ),
                        })
                      }
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-4 mt-3">
                <label className="form-label text-terciary">
                  Municipio donde labora:
                </label>
                <Controller
                  name="cod_municipio_laboral_nal"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      value={
                        municipiosOptions[
                          formValues.index_cod_municipio_laboral_nal
                        ]
                      }
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          index_cod_municipio_laboral_nal:
                            getIndexBySelectOptions(e.value, municipiosOptions),
                        })
                      }
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-md-8 col-12">
                <div className="form-floating input-group input-group-dynamic mt-3">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    readOnly
                    {...register("direccion_residencia", { required: true })}
                  />
                  <label className="ms-2 text-terciary">
                    Dirección de residencia:{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <button
                    onClick={() => setIsOpenDireccionResidencia(true)}
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                  >
                    Generar
                  </button>
                </div>
                {errors.direccion_residencia && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">Referencia adicional:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    {...register("direccion_residencia_ref")}
                  />
                </div>
              </div>
            </div>

            {/* DATOS DE NOTIFICACIÓN */}
            <Subtitle title={"Datos de notificación"} mt={4} mb={2} />
            <div className={"row mx-1"}>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">
                    E-mail: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="email"
                    disabled
                    readOnly
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">E-mail secundario:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="email"
                    {...register("email_empresarial")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4 mt-3">
                <label className="form-label text-terciary">
                  Municipio notificación:
                </label>
                <Controller
                  name="cod_municipio_notificacion_nal"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      value={
                        municipiosOptions[
                          formValues.index_cod_municipio_notificacion_nal
                        ]
                      }
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          index_cod_municipio_notificacion_nal:
                            getIndexBySelectOptions(e.value, municipiosOptions),
                        })
                      }
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">
                    Celular notificación: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="tel"
                    {...register("telefono_celular", { required: true })}
                  />
                </div>
                {errors.telefono_celular && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">Teléfono fijo:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="tel"
                    {...register("telefono_fijo_residencial")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">Teléfono laboral:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="tel"
                    {...register("telefono_empresa_2")}
                  />
                </div>
              </div>
              <div className="col-md-8 col-12 mt-3">
                <div className="form-floating input-group input-group-dynamic mt-3">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    readOnly
                    {...register("direccion_notificaciones")}
                  />
                  <label className="ms-2 text-terciary">
                    Dirección de notificación:
                  </label>
                  <button
                    onClick={() => setIsOpenDireccionNotificacion(true)}
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                  >
                    Generar
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary">
                    Dirección geográfica: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    {...register("ubicacion_georeferenciada", {
                      required: true,
                    })}
                  />
                </div>
                {errors.ubicacion_georeferenciada && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-md-8 col-12 mt-3">
                <div className="form-floating input-group input-group-dynamic mt-3">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    readOnly
                    {...register("direccion_laboral")}
                  />
                  <label className="ms-2 text-terciary">
                    Dirección laboral:
                  </label>
                  <button
                    onClick={() => setIsOpenDireccionLaboral(true)}
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                  >
                    Generar
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4 mx-1">
              <button
                className="btn bg-gradient-primary text-capitalize"
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
        <GeneradorDeDirecciones
          isOpenGenerator={isOpenDireccionResidencia}
          setIsOpenGenerator={setIsOpenDireccionResidencia}
          completeAddress={completeAddress}
          setCompleteAddress={setCompleteAddress}
          reset={reset}
          keyReset={"direccion_residencia"}
          totalValuesForm={watch()}
        />

        <GeneradorDeDirecciones
          isOpenGenerator={isOpenDireccionNotificacion}
          setIsOpenGenerator={setIsOpenDireccionNotificacion}
          completeAddress={completeAddress2}
          setCompleteAddress={setCompleteAddress2}
          reset={reset}
          keyReset={"direccion_notificaciones"}
          totalValuesForm={watch()}
        />

        <GeneradorDeDirecciones
          isOpenGenerator={isOpenDireccionLaboral}
          setIsOpenGenerator={setIsOpenDireccionLaboral}
          completeAddress={completeAddressLaboral}
          setCompleteAddress={setCompleteAddressLaboral}
          reset={reset}
          keyReset={"direccion_laboral"}
          totalValuesForm={watch()}
        />
      </div>
    </div>
  );
};
export default ActualizarDatosPersonaScreen;
