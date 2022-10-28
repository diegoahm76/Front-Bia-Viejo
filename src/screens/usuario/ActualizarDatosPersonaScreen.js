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
import clienteAxios from "../../config/clienteAxios";
import { getIndexBySelectOptions } from "../../helpers/inputsFormat";

const optionsYorNo = [
  { label: "No", value: false },
  { label: "Si", value: true },
];

const ActualizarDatosPersonaScreen = () => {
  const { email: emailLogin } = useSelector((state) => state.user.user);
  const [completeAddress, setCompleteAddress] = useState("");
  const [completeAddress2, setCompleteAddress2] = useState("");
  const [isOpenDireccionResidencia, setIsOpenDireccionResidencia] =
    useState(false);
  const [isOpenDireccionNotificacion, setIsOpenDireccionNotificacion] =
    useState(false);
  const navigate = useNavigate();
  const [yesOrNo, setYesOrNo] = useState(false);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [sexoOptions, setSexoOptions] = useState([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    fecha_nacimiento: "",
    index_pais_nacimiento: "",
    index_pais_residencia: "",
    index_departamento_residencia: "",
    index_municipio_residencia: "",
    index_sexo: "",
    index_estado_civil: "",
    index_cod_municipio_laboral_nal: "",
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
        //personas/updatepersonajuridica/${id_persona}
        //personas/updatepersonanatural/${id_persona}
        //Peticion para las opciones de los selects
        const { data: sexoNoFormat } = await clienteAxios.get("choices/sexo/");

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

        const estadoCivilFormat = textChoiseAdapter(estadoCivilNoFormat);
        const sexoFormat = textChoiseAdapter(sexoNoFormat);
        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

        setEstadoCivilOptions(estadoCivilFormat);
        setSexoOptions(sexoFormat);
        setPaisesOptions(paisesFormat);
        setDepartamentosOptions(departamentosFormat);
        setMunicipiosOptions(municipiosFormat);

        //TODO Trayendo los datos de la persona
        const personaNatural = "N";
        const { data: dataPersona } = await clienteAxios.get(
          `personas/get-by-email/${emailLogin}/`
        ); 
        reset(dataPersona);

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
          index_departamento_residencia: getIndexBySelectOptions(
            dataPersona.departamento_residencia,
            departamentosFormat
          ),
          index_municipio_residencia: getIndexBySelectOptions(
            dataPersona.municipio_residencia,
            municipiosFormat
          ),
          index_cod_municipio_laboral_nal: getIndexBySelectOptions(
            dataPersona.cod_municipio_laboral_nal,
            municipiosFormat
          ),
          index_sexo: getIndexBySelectOptions(dataPersona.sexo, sexoFormat),
          index_estado_civil: getIndexBySelectOptions(
            dataPersona.estado_civil?.cod_estado_civil,
            estadoCivilFormat
          ),
          fecha_nacimiento: dataPersona.fecha_nacimiento
            ? new Date(dataPersona.fecha_nacimiento)
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
      ubicacion_georeferenciada,
      telefono_celular,
      telefono_fijo_residencial,
      telefono_empresa,
      id_persona,
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
      ubicacion_georeferenciada,
      telefono_celular,
      telefono_fijo_residencial,
      telefono_empresa,
      tipo_persona,
      sexo: sexoOptions[formValues.index_sexo]?.value,
      estado_civil: estadoCivilOptions[formValues.index_estado_civil]?.value,
      fecha_nacimiento: formatISO(formValues.fecha_nacimiento, {
        representation: "date",
      }),
      pais_nacimiento: paisesOptions[formValues.index_pais_nacimiento]?.value,
      pais_residencia: paisesOptions[formValues.index_pais_residencia]?.value,
      departamento_residencia:
        departamentosOptions[formValues.index_departamento_residencia]?.value,
      municipio_residencia:
        municipiosOptions[formValues.index_municipio_residencia]?.value,
      cod_municipio_laboral_nal:
        municipiosOptions[formValues.index_cod_municipio_laboral_nal]?.value,
    };

    try {
      const { data } = await clienteAxios.put(
        `personas/persona-natural/update/${id_persona}/`,
        dataUpdate
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

  const handleYesOrNo = (e) => {
    if (e.value) {
      setYesOrNo(true);
    } else {
      setYesOrNo(false);
    }
  };

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Actualizar datos de persona
        </h3>
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form onSubmit={handleSubmit(submit)}>
            <div className={"row align-items-end"}>
              <h5 className="font-weight-bolder mt-2">Datos personales</h5>
              <div className="col-12 col-lg-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tipo de documento"
                    disabled
                    readOnly
                    {...register("tipo_documento")}
                  />
                  <label>
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-6 col-lg-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Número de documento"
                    disabled
                    readOnly
                    {...register("numero_documento")}
                  />
                  <label>
                    Número de documento: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-6 col-lg-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre Codigo de verificación"
                    disabled
                    readOnly
                    {...register("digito_verificacion")}
                  />
                  <label>Codigo de verificación:</label>
                </div>
              </div>
              <div className="row align-items-end">
                <div className="col-12 col-md-4">
                  <label className="form-label">
                    ¿Requiere nombre comercial?
                  </label>
                  <Controller
                    name="yesOrNo"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={handleYesOrNo}
                        defaultValue={optionsYorNo[0]}
                        options={optionsYorNo}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                {yesOrNo && (
                  <div className="col-8 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nombre comercial"
                        {...register("nombre_comercial", { required: true })}
                      />
                      <label>Nombre Comercial:</label>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    readOnly
                    placeholder="Primer nombre"
                    {...register("primer_nombre")}
                  />
                  <label>
                    Primer nombre: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Segundo nombre"
                    {...register("segundo_nombre")}
                  />
                  <label>Segundo nombre:</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    placeholder="Primer apellido"
                    type="text"
                    disabled
                    readOnly
                    {...register("primer_apellido")}
                  />
                  <label>
                    Primer apellido: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="segundo_apellido"
                    {...register("segundo_apellido")}
                  />
                  <label>Segundo apellido:</label>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-4">
                  <label className="form-label">Sexo:</label>
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
                <div className="col-12 col-md-4">
                  <label className="form-label">Estado civil:</label>
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
                <div className="col-md-4 col-12">
                  <label htmlFor="exampleFormControlInput1">
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
                        dateFormat="yyyy/MM/dd"
                        selected={formValues.fecha_nacimiento}
                        value={formValues.fecha_nacimiento}
                        onSelect={(e) => {
                          setFormValues({
                            ...formValues,
                            fecha_nacimiento: e,
                          });
                        }}
                        className="multisteps-form__input form-control p-2"
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
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">País de nacimiento:</label>
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
              {/* LUGAR DE RESIDENCIA */}
              <h5 className="font-weight-bolder mt-4">Lugar de residencia</h5>
              <div className="col-12 col-md-4">
                <label className="form-label">País:</label>
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
              <div className="col-12 col-md-4">
                <label className="form-label">Departamento:</label>
                <Controller
                  name="departamento_residencia"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={departamentosOptions}
                      value={
                        departamentosOptions[
                          formValues.index_departamento_residencia
                        ]
                      }
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          index_departamento_residencia:
                            getIndexBySelectOptions(
                              e.value,
                              departamentosOptions
                            ),
                        })
                      }
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label">Municipio: </label>
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
              <div className="col-md-8 col-12">
                <div className="form-floating input-group input-group-dynamic mt-3">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    readOnly
                    {...register("direccion_residencia")}
                  />
                  <label>Dirección residencial:</label>
                  <button
                    onClick={() => setIsOpenDireccionResidencia(true)}
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                  >
                    Generar
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Referencia adicional:"
                    {...register("direccion_residencia_ref")}
                  />
                  <label>Referencia adicional:</label>
                </div>
              </div>
            </div>

            <div className={"row"}>
              {/* DATOS DE CONTACTO */}
              <h5 className="font-weight-bolder mt-4">Datos de contacto</h5>
              <div className="col-12 col-md-4">
                <label className="form-label">Municipio donde labora:</label>
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
              {/* DATOS DE NOTIFICACIÓN */}
              <h5 className="font-weight-bolder mt-4">Datos de notificación</h5>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="email"
                    disabled
                    readOnly
                    placeholder="E-mail:"
                    {...register("email")}
                  />
                  <label>
                    E-mail: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="email_empresarial"
                    {...register("email_empresarial")}
                  />
                  <label>E-mail secundario:</label>
                </div>
              </div>
              <div className="col-md-8 col-12">
                <div className="form-floating input-group input-group-dynamic mt-3">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    readOnly
                    {...register("direccion_notificaciones")}
                  />
                  <label>Dirección de notificación:</label>
                  <button
                    onClick={() => setIsOpenDireccionNotificacion(true)}
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                  >
                    Generar
                  </button>
                </div>
              </div>
              {/* //! Queda pendiente de revisar porque no aparece en la peticion */}
              {/* <div className="col-12 col-md-4">
                <label className="form-label">
                  Municipio notificación: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="municipioNotificacion"
                  control={control}
                  rules={{
                    required: page === 2,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div> */}
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic mt-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="ubicacion_georeferenciada"
                    {...register("ubicacion_georeferenciada", {
                      required: true,
                    })}
                  />
                  <label>
                    Dirección geográfica: <span className="text-danger">*</span>
                  </label>
                </div>
                {errors.ubicacion_georeferenciada && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic mt-md-3">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="telefono_celular"
                    {...register("telefono_celular", { required: true })}
                  />
                  <label>
                    Celular notificación: <span className="text-danger">*</span>
                  </label>
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
                <div className="form-floating input-group input-group-dynamic mt-md-3">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="telefono_fijo_residencial"
                    {...register("telefono_fijo_residencial")}
                  />
                  <label>Teléfono fijo:</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic mt-md-3">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="telefono_empresa"
                    {...register("telefono_empresa")}
                  />
                  <label>Teléfono laboral:</label>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
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
      </div>
    </div>
  );
};
export default ActualizarDatosPersonaScreen;
