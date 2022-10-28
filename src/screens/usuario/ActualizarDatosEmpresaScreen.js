import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import GeneradorDeDirecciones from "../../components/GeneradorDeDirecciones";
import clienteAxios from "../../config/clienteAxios";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ActualizarDatosEmpresaScreen = () => {
  const navigate = useNavigate();
  const { email: emailLogin } = useSelector((state) => state.user.user);
  const [completeAddress, setCompleteAddress] = useState("");
  const [completeAddress2, setCompleteAddress2] = useState("");
  const [isOpenDireccionEmpresa, setIsOpenDireccionEmpresa] = useState(false);
  const [isOpenDireccionNotificacion, setIsOpenDireccionNotificacion] =
    useState(false);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    index_pais_residencia: "",
    index_departamento_residencia: "",
    index_municipio_residencia: "",
  });
  const {
    register,
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    const {
      tipo_persona,
      tipo_documento,
      numero_documento,
      digito_verificacion,
      nombre_comercial,
      razon_social,
      direccion_laboral,
      direccion_notificaciones,
      email,
      direccion_residencia,
      ubicacion_georeferenciada,
      telefono_celular,
      telefono_celular_empresa,
      telefono_empresa,
      telefono_empresa_2,
      id_persona,
    } = data;
    const dataUpdate = {
      tipo_persona,
      tipo_documento,
      numero_documento,
      digito_verificacion,
      nombre_comercial,
      razon_social,
      pais_residencia: paisesOptions[formValues.index_pais_residencia]?.value,
      departamento_residencia:
        departamentosOptions[formValues.index_departamento_residencia]?.value,
      municipio_residencia:
        municipiosOptions[formValues.index_municipio_residencia]?.value,
      direccion_laboral,
      direccion_notificaciones,
      email,
      direccion_residencia,
      ubicacion_georeferenciada,
      telefono_celular,
      telefono_celular_empresa,
      telefono_empresa,
      telefono_empresa_2,
    };
    try {
      console.log("data update", dataUpdate, watch());
      const { data } = await clienteAxios.put(
        `personas/persona-juridica/update/${id_persona}/`,
        dataUpdate
      );
      console.log("Todo good toma tu data", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: paisesNoFormat } = await clienteAxios.get(
          "choices/paises/"
        );
        const { data: departamentosNoFormat } = await clienteAxios.get(
          "choices/departamentos/"
        );
        const { data: municipiosNoFormat } = await clienteAxios.get(
          "choices/municipios/"
        );

        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

        setPaisesOptions(paisesFormat);
        setDepartamentosOptions(departamentosFormat);
        setMunicipiosOptions(municipiosFormat);

        //TODO Trayendo los datos del usuario y montandolos en los campos
        const COD_PERSONA_JURIDICA = "J";
        console.log(emailLogin)
        const { data } = await clienteAxios.get(
          `personas/get-by-email/${emailLogin}/`
        );
        console.log(data, data.tipo_persona !== COD_PERSONA_JURIDICA);
        if (data.tipo_persona !== COD_PERSONA_JURIDICA) {
          navigate("/dashboard/usuario/actualizar-datos-persona");
        }

        data.tipo_documento = data.tipo_documento.cod_tipo_documento;

        setFormValues({
          ...formValues,
          index_pais_residencia: getIndexBySelectOptions(
            data.pais_residencia,
            paisesFormat
          ),
          index_departamento_residencia: getIndexBySelectOptions(
            data.departamento_residencia,
            departamentosFormat
          ),
          index_municipio_residencia: getIndexBySelectOptions(
            data.municipio_residencia,
            municipiosFormat
          ),
        });
        reset(data);
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
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Actualizar datos empresa</h3>
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <h5 className="font-weight-bolder mt-2">Datos personales</h5>
          <form className="row" onSubmit={handleSubmit(submit)}>
            <div className="col-12 col-lg-4">
              <div className="mt-3">
                <label className="ms-2">Tipo de documento:</label>
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
                <label className="ms-2">Número de documento:</label>
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
                <label className="ms-2">Codigo de verificación:</label>
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
                <label className="ms-2">Nombre Comercial:</label>
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
                <label className="ms-2">Razon social:</label>
                <input
                  className="form-control border rounded-pill px-3"
                  type="text"
                  disabled
                  readOnly
                  {...register("razon_social")}
                />
              </div>
            </div>
            <div className="row">
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
                <label className="form-label">
                  Departamento: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="departamento_residencia"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={departamentosOptions}
                      value={
                        departamentosOptions[
                          formValues.index_departamento_residencia
                        ]
                      }
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          index_departamento_residencia:
                            getIndexBySelectOptions(
                              e.value,
                              departamentosOptions
                            ),
                        });
                      }}
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
                  name="municipio_residencia"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      value={
                        municipiosOptions[formValues.index_municipio_residencia]
                      }
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          index_municipio_residencia: getIndexBySelectOptions(
                            e.value,
                            municipiosOptions
                          ),
                        });
                      }}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-md-8 col-12">
              <div className="mt-3">
                <label className="ms-2">Dirección empresa:</label>
                <input
                  className="form-control border rounded-pill px-3"
                  type="text"
                  disabled
                  readOnly
                  {...register("direccion_residencia")}
                />
                <button
                  onClick={() => setIsOpenDireccionEmpresa(true)}
                  type="button"
                  className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                >
                  Generar
                </button>
              </div>
            </div>
            <h5 className="font-weight-bolder mt-2">Datos de notificación</h5>
            <div className="col-12 col-md-4">
              <div className="mt-3">
                <label className="ms-2">
                  E-mail: <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control border rounded-pill px-3"
                  type="email"
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="mt-3">
                <label className="ms-2">Email secundario:</label>
                <input
                  className="form-control border rounded-pill px-3"
                  type="email"
                  placeholder="email_empresarial"
                  {...register("email_empresarial")}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="mt-3">
                <label className="ms-2">
                  Ubicación geográfica:<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control border rounded-pill px-3"
                  type="text"
                  placeholder="Ubicación geográfica"
                  {...register("ubicacion_georeferenciada", { required: true })}
                />
              </div>
            </div>
            <div className="col-md-8 col-12">
              <div className="mt-3">
                <label className="ms-2">Dirección de notificación:</label>
                <input
                  className="form-control border rounded-pill px-3"
                  type="text"
                  disabled
                  readOnly
                  {...register("direccion_notificaciones")}
                />
                <button
                  type="button"
                  className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                  onClick={() => setIsOpenDireccionNotificacion(true)}
                >
                  Generar
                </button>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="mt-3">
                <label className="ms-2">Celular notificación:</label>
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
                <label className="ms-2">Teléfono empresa:</label>
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
                <label className="ms-2">Teléfono alterno:</label>
                <input
                  className="form-control border rounded-pill px-3"
                  type="tel"
                  placeholder="telefono_empresa_2"
                  {...register("telefono_empresa_2")}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 col-12 mt-3">
              <button
                type="button"
                className="btn bg-gradient-light text-capitalize"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn bg-gradient-primary text-capitalize"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
      <GeneradorDeDirecciones
        isOpenGenerator={isOpenDireccionEmpresa}
        setIsOpenGenerator={setIsOpenDireccionEmpresa}
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
  );
};
export default ActualizarDatosEmpresaScreen;
