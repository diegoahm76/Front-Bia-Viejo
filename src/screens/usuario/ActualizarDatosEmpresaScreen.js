import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Subtitle from "../../components/Subtitle";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";
import { getConfigAuthBearer } from "../../helpers/configAxios";
import Swal from "sweetalert2";
import DirecionResidenciaModal from "../../components/DirecionResidenciaModal";

const ActualizarDatosEmpresaScreen = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const [primeraVez, setPrimeraVez] = useState(true)
  const [counter, setCounter] = useState(1)

  const { userinfo: {email: emailLogin} } = useSelector((state) => state.user.user);
  const [completeAddress2, setCompleteAddress2] = useState("");
  const [isOpenDireccionNotificacion, setIsOpenDireccionNotificacion] =
    useState(false);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [datosNotificacion, setDatosNotificacion] = useState({
    departamento: ""
  })
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [municipioNotificacionFiltered, setMunicipioNotificacionFiltered] = useState([])
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    index_cod_pais_nacionalidad_empresa: "",
    index_cod_municipio_notificacion_nal: "",
    paisNotificacion: ""
  });

  const {
    register,
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getSelectsOptions = async () => {
      setLoading(true)
      try {
        const { data: paisesNoFormat } = await clienteAxios.get(
          "choices/paises/"
        );
        const { data: municipiosNoFormat } = await clienteAxios.get(
          "choices/municipios/"
        );
        const { data: departamentosNoFormat } = await clienteAxios.get(
          "choices/departamentos/"
        );

        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);


        setPaisesOptions(paisesFormat);
        setMunicipiosOptions(municipiosFormat);
        setDepartamentosOptions(departamentosFormat);

        //TODO Trayendo los datos del usuario y montandolos en los campos
        const COD_PERSONA_JURIDICA = "J";
        console.log("emailLogin", emailLogin)
        const { data: dataPersona } = await clienteAxios.get(
          `personas/get-by-email/${emailLogin}/`
        );
        const { data } = dataPersona
        console.log("data", data);
        if (data.tipo_persona !== COD_PERSONA_JURIDICA) {
          navigate("/dashboard/usuario/actualizar-datos-persona");
        }

        data.tipo_documento = data.tipo_documento.cod_tipo_documento;
        data.telefono_celular_empresa = data.telefono_celular_empresa?.slice(2);

        console.log("data useEffect", data);

        setPrimeraVez(false);

        const indexPaisNotificacion = resetPaisDepartamentoYMunicipio(data.cod_municipio_notificacion_nal, setDatosNotificacion, municipiosFormat, departamentosFormat, paisesFormat)

        setFormValues({
          ...formValues,
          index_cod_pais_nacionalidad_empresa: getIndexBySelectOptions(
            data.cod_pais_nacionalidad_empresa,
            paisesFormat
          ),
          index_cod_municipio_notificacion_nal: getIndexBySelectOptions(
            data.cod_municipio_notificacion_nal,
            municipiosFormat
          ),
          paisNotificacion: indexPaisNotificacion
        });
        reset(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false)
    };
    getSelectsOptions();
  }, []);

  const submit = async (data) => {
    setLoading(true)
    const {
      digito_verificacion,
      nombre_comercial,
      razon_social,
      direccion_notificaciones,
      email,
      email_empresarial,
      telefono_celular_empresa,
      telefono_empresa,
      telefono_empresa_2,
    } = data;
    const dataUpdate = {
      digito_verificacion,
      nombre_comercial,
      razon_social,
      cod_pais_nacionalidad_empresa:
        paisesOptions[formValues.index_cod_pais_nacionalidad_empresa]?.value,
      cod_municipio_notificacion_nal:
        municipiosOptions[formValues.index_cod_municipio_notificacion_nal]
          ?.value || null,
      direccion_notificaciones,
      email,
      email_empresarial,
      telefono_celular_empresa: "57" + telefono_celular_empresa,
      telefono_empresa,
      telefono_empresa_2,
    };

    const accessToken = getTokenAccessLocalStorage();
    const config = getConfigAuthBearer(accessToken);

    try {
      console.log("data update", dataUpdate);
      const { data } = await clienteAxios.patch(
        "personas/persona-juridica/usuario-externo/self/update/",
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

  const resetPaisDepartamentoYMunicipio = (municipioResidencia, setDepartamento, municipiosOptions, departamentosOptions, paisesOptions) => {
    const indexMunicipioResidencia = getIndexBySelectOptions(municipioResidencia, municipiosOptions)
    const departamentoIdentifier = municipiosOptions[indexMunicipioResidencia]?.value.slice(0,2)
    let indexDepartamento = null
    departamentosOptions.forEach((departamento, index) => {
      if(departamento.value === departamentoIdentifier){
        indexDepartamento = index
      }
    })
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
      setDepartamento({departamento: null})
      return null
    }
  }

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

  const handleChangePaisNotificacion = (e) => {
    const objectSend = {
      paisNotificacion: getIndexBySelectOptions(e.value, paisesOptions),
    };
    if (e.value !== "CO" || !e.value) {
      objectSend.index_cod_municipio_notificacion_nal = null;
      reset({
        ...watch(),
        index_cod_municipio_notificacion_nal: null,
      });
      setDatosNotificacion({...datosNotificacion, departamento: ""})
    }
    setFormValues({
      ...formValues,
      ...objectSend,
    });
  }

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
    console.log("counter", counter)
    if(counter < 3) {
      const newValueCounter = counter + 1
      setCounter(newValueCounter)
      return
    }
    // if(!primeraVez) return
    if (datosNotificacion.departamento === "") {
      setMunicipioNotificacionFiltered([]);
      setFormValues({...formValues, index_cod_municipio_notificacion_nal: ""})
    } else {
      const municipioIndicadores = datosNotificacion.departamento?.value?.slice(0, 2);
      const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
          const indicator = municipio.value.slice(0, 2);
          return municipioIndicadores === indicator;
        }
      );
      setMunicipioNotificacionFiltered(municipiosCoincidentes);
      setFormValues({...formValues, index_cod_municipio_notificacion_nal: 0})
    }
  }, [datosNotificacion.departamento]);

  // useEffect(() => {
  //   setPrimeraVez(true)
  // }, [actionForm])

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <h3 className="mt-3 ms-3 mb-2 fw-light text-terciary">
            Actualizar datos empresa
          </h3>
          <Subtitle title={"Datos personales"} mt={4} mb={0} />
          <form onSubmit={handleSubmit(submit)}>
            <div className="row mx-1">
              <div className="col-12 col-lg-4">
                <div className="mt-3">
                  <label className="text-terciary ms-2">
                    Tipo de documento:
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
                  <label className="text-terciary text-terciary ms-2">
                    Número de documento:
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
                  <label className="text-terciary text-terciary ms-2">
                    Codigo de verificación:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    readOnly
                    {...register("digito_verificacion")}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="mt-3">
                  <label className="text-terciary text-terciary ms-2">
                    Nombre Comercial:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    readOnly
                    {...register("nombre_comercial")}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-4 mb-4">
                <div className="mt-3">
                  <label className="text-terciary text-terciary ms-2">
                    Razon social:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    disabled
                    readOnly
                    {...register("razon_social")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4 mt-3">
                <label className="text-terciary text-terciary form-label">
                  País:
                </label>
                <Controller
                  name="cod_pais_nacionalidad_empresa"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={paisesOptions}
                      value={
                        paisesOptions[
                          formValues.index_cod_pais_nacionalidad_empresa
                        ]
                      }
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          index_cod_pais_nacionalidad_empresa:
                            getIndexBySelectOptions(e.value, paisesOptions),
                        })
                      }
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
            <Subtitle title={"Datos de notificación"} mt={4} mb={0} />
            <div className="row mx-1">
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary text-terciary ms-2">
                    E-mail: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="email"
                    disabled
                    placeholder="E-mail"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary text-terciary ms-2">
                    Email empresarial:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="email"
                    placeholder="email_empresarial"
                    {...register("email_empresarial")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4 mt-2">
                <label className="form-label text-terciary">
                  País notificación:
                </label>
                <Controller
                  name="paisNotificacion"
                  control={control}
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
                <div className="col-12 col-md-4 mt-2">
                  <label className="form-label text-terciary">
                    Departamento notificación:{" "}
                  </label>
                  <Select
                    options={departamentosOptions}
                    isDisabled={
                      paisesOptions[formValues.paisNotificacion]?.value !==
                      "CO"
                    }
                    onChange={(e) => {
                      setDatosNotificacion({...datosNotificacion, departamento: e})
                    }}
                    value={datosNotificacion.departamento}
                    placeholder="Seleccionar"
                  />
                </div>
              ) : (
                <div className="col-12 col-md-4 mt-2">
                  <label className="form-label text-terciary">
                    Departamento notificación:{" "}
                  </label>
                  <Select isDisabled placeholder="Seleccionar" value={"Seleccionar"} />
                </div>
              )}
              {formValues.paisNotificacion === getIndexColombia() ? (
                <div className="col-12 col-md-4 mt-2">
                  <label className="form-label">
                    Municipio notificación:{" "}
                  </label>
                  <Controller
                    name="index_cod_municipio_notificacion_nal"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isDisabled={
                          paisesOptions[formValues.paisNotificacion]?.value !== "CO"
                        }
                        value={municipiosOptions[formValues.index_cod_municipio_notificacion_nal]}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            index_cod_municipio_notificacion_nal: getIndexBySelectOptions(
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
                <div className="col-12 col-md-4 mt-2">
                  <label className="form-label">
                    Municipio notificación:{" "}
                  </label>
                  <Select isDisabled placeholder="Seleccionar" value={"Seleccionar"} />
                </div>
              )}
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary text-terciary ms-2">
                    Celular notificación:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="tel"
                    placeholder="telefono_celular_empresa"
                    {...register("telefono_celular_empresa")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary text-terciary ms-2">
                    Teléfono empresa:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="tel"
                    placeholder="telefono_empresa"
                    {...register("telefono_empresa")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mt-3">
                  <label className="text-terciary text-terciary ms-2">
                    Teléfono alterno:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="tel"
                    placeholder="telefono_empresa_2"
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
                    {...register("direccion_notificaciones", {
                      required: true,
                    })}
                  />
                  <label className="text-terciary text-terciary ms-2">
                    Dirección de notificación:{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <button
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                    onClick={() => setIsOpenDireccionNotificacion(true)}
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
              <div className="d-flex justify-content-end gap-2 col-12 mt-3">
                <button
                  type="submit"
                  className="btn bg-gradient-primary text-capitalize"
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
            </div>
          </form>
        </div>
      </div>

      <DirecionResidenciaModal
        isModalActive={isOpenDireccionNotificacion}
        setIsModalActive={setIsOpenDireccionNotificacion}
        completeAddress={completeAddress2}
        setCompleteAddress={setCompleteAddress2}
        reset={reset}
        keyReset={"direccion_notificaciones"}
        watch={watch}
      />
    </div>
  );
};
export default ActualizarDatosEmpresaScreen;
