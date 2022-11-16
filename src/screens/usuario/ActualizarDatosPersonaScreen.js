import { formatISO } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import DirecionResidenciaModal from "../../components/DirecionResidenciaModal";
import Subtitle from "../../components/Subtitle";
import clienteAxios from "../../config/clienteAxios";
import { getConfigAuthBearer } from "../../helpers/configAxios";
import { getArrayFromStringDateAAAAMMDD } from "../../helpers/dateHelpers";
import { getIndexBySelectOptions } from "../../helpers/inputsFormat";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";

const ActualizarDatosPersonaScreen = () => {
  const [loading, setLoading] = useState(false)
  const { email: emailLogin } = useSelector((state) => state.user.user);
  const [completeAddress, setCompleteAddress] = useState("");
  const [completeAddress2, setCompleteAddress2] = useState("");
  const [completeAddressLaboral, setCompleteAddressLaboral] = useState("");
  const [isOpenDireccionResidencia, setIsOpenDireccionResidencia] =
    useState(false);
  const [isOpenDireccionNotificacion, setIsOpenDireccionNotificacion] =
    useState(false);
  const [isOpenDireccionLaboral, setIsOpenDireccionLaboral] = useState(false);

  const [municipioResidenciaFiltered, setmunicipioResidenciaFiltered] =
    useState([]);
  const [municipioDondeLaboraFiltered, setMunicipioDondeLaboraFiltered] =
    useState([]);
  const [municipioNotificacionFiltered, setMunicipioNotificacionFiltered] =
    useState([]);

  const [primeraVez, setPrimeraVez] = useState(true);
  const [counter, setCounter] = useState(1)
  const navigate = useNavigate();

  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [sexoOptions, setSexoOptions] = useState([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [lugarResidencia, setLugarResidencia] = useState({
    departamento: "",
  });
  const [datosLaborales, setDatosLaborales] = useState({
    departamento: "",
  });
  const [datosNotificacion, setDatosNotificacion] = useState({
    departamento: "",
  });
  const [formValues, setFormValues] = useState({
    digito_verificacion: "",
    fecha_nacimiento: "",
    index_pais_nacimiento: "",
    index_pais_residencia: "",
    index_pais_laboral: "",
    index_pais_notificacion: "",
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
      setLoading(true)
      try {
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
        const { data } = await clienteAxios.get(
          `personas/get-by-email/${emailLogin}/`
        );

        const { data: dataPersona } = data;

        console.log("data useEffect", dataPersona);

        if (dataPersona.tipo_persona !== personaNatural) {
          navigate("/dashboard/usuario/actualizar-datos-empresa");
        }

        setPrimeraVez(false);

        resetDepartamentoYMunicipio(dataPersona.municipio_residencia, setLugarResidencia, municipiosFormat, departamentosFormat)
        const indexPaisLaboral = resetPaisDepartamentoYMunicipio(dataPersona.cod_municipio_laboral_nal, setDatosLaborales, municipiosFormat, departamentosFormat, paisesFormat)
        const indexPaisNotificacion = resetPaisDepartamentoYMunicipio(dataPersona.cod_municipio_notificacion_nal, setDatosNotificacion, municipiosFormat, departamentosFormat, paisesFormat)
        console.log("paises", indexPaisLaboral, indexPaisNotificacion)
        dataPersona.telefono_celular = dataPersona.telefono_celular.slice(2);
        dataPersona.tipo_documento =
          dataPersona.tipo_documento.cod_tipo_documento;

        setFormValues({
          ...formValues,
          index_pais_residencia: getIndexBySelectOptions(
            dataPersona.pais_residencia,
            paisesFormat
          ),
          index_pais_laboral: indexPaisLaboral,
          index_pais_notificacion: indexPaisNotificacion,
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
          digito_verificacion: dataPersona.digito_verificacion,
        });
        reset(dataPersona);
      } catch (err) {
        console.log(err);
      }
      setLoading(false)
    };
    getSelectsOptions();
  }, []);

  const resetDepartamentoYMunicipio = (municipioResidencia, setDepartamento, municipiosOptions, departamentosOptions) => {
    const indexMunicipioResidencia = getIndexBySelectOptions(municipioResidencia, municipiosOptions)
    const departamentoIdentifier = municipiosOptions[indexMunicipioResidencia]?.value.slice(0,2)
    console.log("indexMunicipioResidencia", departamentoIdentifier)

    let indexDepartamento = null
    departamentosOptions.forEach((departamento, index) => {
      if(departamento.value === departamentoIdentifier){
        indexDepartamento = index
      }
    })
    if(indexDepartamento !== null){
      console.log("departamentosOptions[indexDepartamento]", departamentosOptions[indexDepartamento])
      setDepartamento({departamento: departamentosOptions[indexDepartamento]})
    }
  }

  const resetPaisDepartamentoYMunicipio = (municipioResidencia, setDepartamento, municipiosOptions, departamentosOptions, paisesOptions) => {
    const indexMunicipioResidencia = getIndexBySelectOptions(municipioResidencia, municipiosOptions)
    const departamentoIdentifier = municipiosOptions[indexMunicipioResidencia]?.value.slice(0,2)
    let indexDepartamento = null
    departamentosOptions.forEach((departamento, index) => {
      if(departamento.value === departamentoIdentifier){
        indexDepartamento = index
      }
    })
    console.log("comprobacion", indexDepartamento !== null)
    if(indexDepartamento !== null){
      let indexColombia = null
      paisesOptions.forEach((pais, index) => {
        if(pais.value === "CO"){
          indexColombia = index
        }
      })
      setDepartamento({departamento: departamentosOptions[indexDepartamento]})
      return indexColombia
    }else {
      return null
    }
  }

  const submit = async (data) => {
    setLoading(true)
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
      tipo_documento: tipo_documento ?? "",
      numero_documento: numero_documento ?? "",
      digito_verificacion: formValues.digito_verificacion ?? "",
      nombre_comercial: nombre_comercial ?? "",
      primer_nombre: primer_nombre ?? "",
      segundo_nombre: segundo_nombre ?? "",
      primer_apellido: primer_apellido ?? "",
      segundo_apellido: segundo_apellido ?? "",
      direccion_residencia: direccion_residencia ?? "",
      direccion_residencia_ref: direccion_residencia_ref ?? "",
      email: email ?? "",
      email_empresarial: email_empresarial ?? "",
      direccion_notificaciones: direccion_notificaciones ?? "",
      direccion_laboral: direccion_laboral ?? "",
      ubicacion_georeferenciada: ubicacion_georeferenciada ?? "",
      telefono_celular: "57" + telefono_celular ?? "",
      telefono_fijo_residencial: telefono_fijo_residencial ?? "",
      telefono_empresa_2: telefono_empresa_2 ?? "",
      tipo_persona: tipo_persona ?? "",
      sexo: sexoOptions[formValues.index_sexo]?.value ?? "",
      estado_civil:
        estadoCivilOptions[formValues.index_estado_civil]?.value ?? "",
      fecha_nacimiento:
        formatISO(formValues.fecha_nacimiento, {
          representation: "date",
        }) ?? "",
      pais_nacimiento:
        paisesOptions[formValues.index_pais_nacimiento]?.value ?? "",
      pais_residencia:
        paisesOptions[formValues.index_pais_residencia]?.value ?? "",
      municipio_residencia:
        municipiosOptions[formValues.index_municipio_residencia]?.value ?? "",
      cod_municipio_laboral_nal:
        municipiosOptions[formValues.index_cod_municipio_laboral_nal]?.value ??
        "",
      cod_municipio_notificacion_nal:
        municipiosOptions[formValues.index_cod_municipio_notificacion_nal]
          ?.value ?? "",
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
    setLoading(false)
  };

  const handleMaxOneDigit = (e) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value[0];
      setFormValues({
        ...formValues,
        digito_verificacion: e.target.value[0],
      });
    } else {
      setFormValues({
        ...formValues,
        digito_verificacion: e.target.value,
      });
    }
  };

  const handleChangePaisResidencia = (e) => {
    const objectSend = {
      index_pais_residencia: getIndexBySelectOptions(e.value, paisesOptions),
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.municipio = null;
      reset({
        ...watch(),
        municipio: "",
      });
      setLugarResidencia({ ...lugarResidencia, departamento: "" });
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  };

  const handleChangePaisDondeLabora = (e) => {
    const objectSend = {
      index_pais_laboral: getIndexBySelectOptions(e.value, paisesOptions),
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.cod_municipio_laboral_nal = null;
      reset({
        ...watch(),
        cod_municipio_laboral_nal: "",
      });
      setDatosLaborales({ ...datosLaborales, departamento: "" });
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  };

  const handleChangePaisNotificacion = (e) => {
    const objectSend = {
      index_pais_notificacion: getIndexBySelectOptions(e.value, paisesOptions),
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.municipioNotificacion = null;
      reset({
        ...watch(),
        municipioNotificacion: "",
      });
      setDatosNotificacion({ ...datosNotificacion, departamento: "" });
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  };

  const getIndexColombia = () => {
    let indexColombia = null;
    paisesOptions.forEach((pais, index) => {
      if (pais.value === "CO") {
        indexColombia = index;
      }
    });
    return indexColombia;
  };

  useEffect(() => {
    if(counter < 3) {
      const newValueCounter = counter + 1
      setCounter(newValueCounter)
      return
    }
    if (lugarResidencia.departamento === "") {
      setmunicipioResidenciaFiltered([]);
      setFormValues({ ...formValues, index_municipio_residencia: "" });
    } else {
      const municipioIndicadores = lugarResidencia.departamento?.value?.slice(0,2);
      const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
        const indicator = municipio.value.slice(0, 2);
        return municipioIndicadores === indicator;
      });
      setmunicipioResidenciaFiltered(municipiosCoincidentes);
      setFormValues({ ...formValues, index_municipio_residencia: 0 });
    }
  }, [lugarResidencia]);

  useEffect(() => {
    if(counter < 3) {
      const newValueCounter = counter + 1
      setCounter(newValueCounter)
      return
    }
    if (datosLaborales.departamento === "") {
      setMunicipioDondeLaboraFiltered([]);
      setFormValues({ ...formValues, index_cod_municipio_laboral_nal: "" });
    } else {
      const municipioIndicadores = datosLaborales.departamento?.value?.slice(
        0,
        2
      );
      const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
        const indicator = municipio.value.slice(0, 2);
        return municipioIndicadores === indicator;
      });
      setMunicipioDondeLaboraFiltered(municipiosCoincidentes);
      setFormValues({ ...formValues, index_cod_municipio_laboral_nal: 0 });
    }
  }, [datosLaborales.departamento]);

  useEffect(() => {
    if(counter < 3) {
      const newValueCounter = counter + 1
      setCounter(newValueCounter)
      return
    }
    // if (!primeraVez) return;
    if (datosNotificacion.departamento === "") {
      setMunicipioNotificacionFiltered([]);
      setFormValues({
        ...formValues,
        index_cod_municipio_notificacion_nal: "",
      });
    } else {
      const municipioIndicadores = datosNotificacion.departamento?.value?.slice(
        0,
        2
      );
      const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
        const indicator = municipio.value.slice(0, 2);
        return municipioIndicadores === indicator;
      });
      setMunicipioNotificacionFiltered(municipiosCoincidentes);
      setFormValues({ ...formValues, index_cod_municipio_notificacion_nal: 0 });
    }
  }, [datosNotificacion.departamento]);

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
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    disabled
                    readOnly
                    {...register("tipo_documento")}
                  />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">
                    Número de documento: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    disabled
                    readOnly
                    {...register("numero_documento")}
                  />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">
                    Codigo de verificación:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="number"
                    // {...register("digito_verificacion", {
                    //   maxLength: 1,
                    // })}
                    value={formValues.digito_verificacion}
                    onChange={handleMaxOneDigit}
                  />
                </div>
                <div className="row position-relative">
                  {errors.digito_verificacion && (
                    <div className="col-12 position-absolute">
                      <small className="text-center text-danger">
                        Este campo es de maximo un caracter
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">Nombre Comercial:</label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    {...register("nombre_comercial")}
                  />
                </div>
              </div>

              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">
                    Primer nombre: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    disabled
                    readOnly
                    {...register("primer_nombre")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">Segundo nombre:</label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    disabled
                    {...register("segundo_nombre")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">
                    Primer apellido: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    disabled
                    readOnly
                    {...register("primer_apellido")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">Segundo apellido:</label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    disabled
                    {...register("segundo_apellido")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3 mt-3">
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
              <div className="col-12 col-md-3 mt-3 ">
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
                      value={estadoCivilOptions[formValues.index_estado_civil]}
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
              <div className="col-md-3 col-12 mt-3">
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
                      className="form-control border rounded-pill px-3 border border-terciary"
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
              <div className="col-12 col-md-3 mt-3">
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

            {/* LUGAR DE RESIDENCIA */}
            <Subtitle title={"Lugar de residencia"} mt={4} mb={2} />
            <div className="row align-items-end mx-1">
              <div className="col-12 col-md-3 mt-3">
                <label className="form-label text-terciary">
                  País de residencia:
                </label>
                <Controller
                  name="pais_residencia"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={paisesOptions}
                      value={paisesOptions[formValues.index_pais_residencia]}
                      onChange={handleChangePaisResidencia}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              {formValues.index_pais_residencia === getIndexColombia() ? (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label text-terciary">
                    Departamento de residencia:{" "}
                  </label>
                  <Select
                    options={departamentosOptions}
                    isDisabled={
                      paisesOptions[formValues.index_pais_residencia]?.value !==
                      "CO"
                    }
                    onChange={(e) => setLugarResidencia({ departamento: e })}
                    value={departamentosOptions[getIndexBySelectOptions(lugarResidencia.departamento?.value, departamentosOptions)]}
                    placeholder="Seleccionar"
                  />
                </div>
              ) : (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label text-terciary">
                    Departamento de residencia:{" "}
                  </label>
                  <Select
                    isDisabled
                    placeholder="Seleccionar"
                    value={"Seleccionar"}
                  />
                </div>
              )}
              {formValues.index_pais_residencia === getIndexColombia() ? (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label">
                    Municipio de residencia:{" "}
                  </label>
                  <Controller
                    name="municipio_residencia"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isDisabled={
                          paisesOptions[formValues.index_pais_residencia]
                            ?.value !== "CO"
                        }
                        value={
                          municipiosOptions[
                            formValues.index_municipio_residencia
                          ]
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
                        options={municipioResidenciaFiltered}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              ) : (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label">
                    Municipio de residencia:{" "}
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
                    <label className="ms-2 text-terciary">
                      Dirección de residencia:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control rounded-pill px-3 border border-terciary"
                      type="text"
                      disabled
                      readOnly
                      {...register("direccion_residencia", { required: true })}
                    />
                  </div>
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
                <div className="mt-4">
                  <label className="text-terciary">Referencia adicional:</label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    {...register("direccion_residencia_ref")}
                  />
                </div>
              </div>
            </div>

            {/* DATOS LABORALES */}
            <Subtitle title={"Datos laborales"} mt={4} mb={2} />
            <div className="row align-items-end mx-1">
              <div className="col-12 col-md-3 mt-3">
                <label className="form-label">País donde labora:</label>
                <Controller
                  name="pais_laboral"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={paisesOptions[formValues.index_pais_laboral]}
                      onChange={handleChangePaisDondeLabora}
                      options={paisesOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              {formValues.index_pais_laboral === getIndexColombia() ? (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label text-terciary">
                    Departamento donde labora:{" "}
                  </label>
                  <Select
                    options={departamentosOptions}
                    isDisabled={
                      paisesOptions[formValues.index_pais_laboral]?.value !==
                      "CO"
                    }
                    onChange={(e) => {
                      setDatosLaborales({ ...datosLaborales, departamento: e });
                    }}
                    value={datosLaborales.departamento}
                    placeholder="Seleccionar"
                  />
                </div>
              ) : (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label text-terciary">
                    Departamento donde labora:{" "}
                  </label>
                  <Select
                    isDisabled
                    placeholder="Seleccionar"
                    value={"Seleccionar"}
                  />
                </div>
              )}
              {formValues.index_pais_laboral === getIndexColombia() ? (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label">Municipio donde labora: </label>
                  <Controller
                    name="cod_municipio_laboral_nal"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isDisabled={
                          paisesOptions[formValues.index_pais_laboral]
                            ?.value !== "CO"
                        }
                        value={
                          municipiosOptions[
                            formValues.index_cod_municipio_laboral_nal
                          ]
                        }
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            index_cod_municipio_laboral_nal:
                              getIndexBySelectOptions(
                                e.value,
                                municipiosOptions
                              ),
                          })
                        }
                        options={municipioDondeLaboraFiltered}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              ) : (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label">Municipio donde labora: </label>
                  <Select
                    isDisabled
                    placeholder="Seleccionar"
                    value={"Seleccionar"}
                  />
                </div>
              )}
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">Teléfono laboral:</label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="tel"
                    {...register("telefono_empresa_2")}
                  />
                </div>
              </div>

              <div className="col-md-8 col-10 mt-3">
                <div className="mt-3 d-flex align-items-end">
                  <div className="col-10">
                    <label className="text-terciary">
                      Dirección laboral: <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control rounded-pill px-3 border border-terciary"
                      type="text"
                      disabled
                      readOnly
                      {...register("direccion_laboral", { required: true })}
                    />
                  </div>
                  <button
                    onClick={() => setIsOpenDireccionLaboral(true)}
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                  >
                    Generar
                  </button>
                </div>
                {errors.direccion_laboral && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* DATOS DE NOTIFICACIÓN */}
            <Subtitle title={"Datos de notificación"} mt={4} mb={2} />
            <div className={"row mx-1"}>
              <div className="col-12 col-md-3 mt-3">
                <label className="form-label text-terciary">
                  País notificación:
                </label>
                <Controller
                  name="cod_pais_notificacion_nal"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={paisesOptions[formValues.index_pais_notificacion]}
                      options={paisesOptions}
                      onChange={handleChangePaisNotificacion}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              {formValues.index_pais_notificacion === getIndexColombia() ? (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label text-terciary">
                    Departamento notificación:{" "}
                  </label>
                  <Select
                    options={departamentosOptions}
                    isDisabled={
                      paisesOptions[formValues.index_pais_notificacion]
                        ?.value !== "CO"
                    }
                    onChange={(e) => {
                      setDatosNotificacion({
                        ...datosNotificacion,
                        departamento: e,
                      });
                    }}
                    value={datosNotificacion.departamento}
                    placeholder="Seleccionar"
                  />
                </div>
              ) : (
                <div className="col-12 col-md-3 mt-3">
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

              {formValues.index_pais_notificacion === getIndexColombia() ? (
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label">Municipio notificación: </label>
                  <Controller
                    name="cod_municipio_notificacion_nal"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isDisabled={
                          paisesOptions[formValues.index_pais_notificacion]
                            ?.value !== "CO"
                        }
                        value={
                          municipiosOptions[
                            formValues.index_cod_municipio_notificacion_nal
                          ]
                        }
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            index_cod_municipio_notificacion_nal:
                              getIndexBySelectOptions(
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
                <div className="col-12 col-md-3 mt-3">
                  <label className="form-label">Municipio notificación: </label>
                  <Select
                    isDisabled
                    placeholder="Seleccionar"
                    value={"Seleccionar"}
                  />
                </div>
              )}

              <div className="col-12 col-md-3 mt-3">
                <div>
                  <label className="text-terciary">Teléfono fijo:</label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="tel"
                    {...register("telefono_fijo_residencial")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">
                    E-mail: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="email"
                    disabled
                    readOnly
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">E-mail secundario:</label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="email"
                    {...register("email_empresarial")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mt-4">
                  <label className="text-terciary">
                    Celular notificación: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="number"
                    {...register("telefono_celular", {
                      required: true,
                      maxLength: 10,
                      minLength: 10,
                    })}
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
              <div className="col-md-8 col-10 mt-3">
                <div className="mt-3 d-flex align-items-end">
                  <div className="col-10">
                    <label className="ms-2 text-terciary">
                      Dirección de notificación:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control rounded-pill px-3 border border-terciary"
                      type="text"
                      disabled
                      readOnly
                      {...register("direccion_notificaciones", {
                        required: true,
                      })}
                    />
                  </div>
                  <button
                    onClick={() => setIsOpenDireccionNotificacion(true)}
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                  >
                    Generar
                  </button>
                </div>
                {errors.direccion_notificaciones && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              {/* <div className="col-12 col-md-3">
                <div className="mt-4">
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
              </div> */}
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4 mx-1">
              <button
                className="btn bg-gradient-primary text-capitalize"
                type="submit"
                onClick={() => {
                  console.log(watch());
                }}
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
                  "Actualizar"
                )}
              </button>
            </div>
          </form>
        </div>
        <DirecionResidenciaModal
          isModalActive={isOpenDireccionResidencia}
          setIsModalActive={setIsOpenDireccionResidencia}
          completeAddress={completeAddress}
          setCompleteAddress={setCompleteAddress}
          reset={reset}
          keyReset={"direccion_residencia"}
          watch={watch}
        />

        <DirecionResidenciaModal
          isModalActive={isOpenDireccionNotificacion}
          setIsModalActive={setIsOpenDireccionNotificacion}
          completeAddress={completeAddress2}
          setCompleteAddress={setCompleteAddress2}
          reset={reset}
          keyReset={"direccion_notificaciones"}
          watch={watch}
        />

        <DirecionResidenciaModal
          isModalActive={isOpenDireccionLaboral}
          setIsModalActive={setIsOpenDireccionLaboral}
          completeAddress={completeAddressLaboral}
          setCompleteAddress={setCompleteAddressLaboral}
          reset={reset}
          keyReset={"direccion_laboral"}
          watch={watch}
        />
      </div>
    </div>
  );
};
export default ActualizarDatosPersonaScreen;
