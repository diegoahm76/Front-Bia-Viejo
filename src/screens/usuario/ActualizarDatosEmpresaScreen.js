import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import GeneradorDeDirecciones from "../../components/GeneradorDeDirecciones";
import clienteAxios from "../../config/clienteAxios";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";

const ActualizarDatosEmpresaScreen = () => {
  const [completeAddress, setCompleteAddress] = useState("");
  const [isOpenGenerator, setIsOpenGenerator] = useState(false);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    console.log(data);
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
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Actualizar datos empresa</h3>
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <h5 className="font-weight-bolder mt-2">Datos personales</h5>
          <form className="row" onSubmit={handleSubmit(submit)}>
            <div className="col-12 col-lg-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Tipo de documento"
                  disabled
                  value="C.C."
                />
                <label className="ms-2">Tipo de documento:</label>
              </div>
            </div>
            <div className="col-6 col-lg-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Número de documento"
                  disabled
                  value="1151231231"
                />
                <label className="ms-2">Número de documento:</label>
              </div>
            </div>
            <div className="col-6 col-lg-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre Codigo de verificación"
                  disabled
                  value="423"
                />
                <label className="ms-2">Codigo de verificación:</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre comercial"
                  disabled
                  value="Ferretería El Tornillero"
                />
                <label className="ms-2">Nombre Comercial:</label>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Razon social"
                  disabled
                  value="Pedro Almíbar"
                />
                <label className="ms-2">Razon social:</label>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4">
                <label className="form-label">País:</label>
                <Controller
                  name="pais"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={paisesOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label">Departamento:</label>
                <Controller
                  name="departamento"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={departamentosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label">Municipio:</label>
                <Controller
                  name="municipio"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
            <div className="form-floating input-group input-group-dynamic mt-3">
              <input
                className="form-control"
                type="text"
                disabled
                value="Carrera 28 # 15-53"
                {...register("direccionNotificacion")}
              />
              <label className="ms-2">Dirección empresa:</label>
              <button
                onClick={() => setIsOpenGenerator(true)}
                type="button"
                className="btn bg-gradient-primary"
              >
                Generar
              </button>
            </div>
            <h5 className="font-weight-bolder mt-2">Datos de notificación</h5>
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="email"
                  required
                  placeholder="E-mail"
                  {...register("eMail")}
                />
                <label className="ms-2">E-mail:</label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Confirme su e-mail"
                  {...register("secondaryEmail")}
                />
                <label className="ms-2">Email secundario:</label>
              </div>
            </div>
            <div className="form-floating input-group input-group-dynamic mt-3">
              <input
                className="form-control"
                type="text"
                disabled
                value="Carrera 28 # 15-53"
                {...register("direccionNotificacion")}
              />
              <label className="ms-2">Dirección de notificación:</label>
              <button type="button" className="btn bg-gradient-primary">
                Generar
              </button>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ubicación geográfica"
                  {...register("geoLocation")}
                />
                <label className="ms-2">Ubicación geográfica:</label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Celular notificación"
                  {...register("notiCell")}
                />
                <label className="ms-2">Celular notificación:</label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Teléfono empresa"
                  {...register("businessTel")}
                />
                <label className="ms-2">Teléfono empresa:</label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Teléfono alterno"
                  {...register("alternTel")}
                />
                <label className="ms-2">Teléfono alterno:</label>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 col-12 mt-3">
              <button type="button" className="btn bg-gradient-light">
                Cancelar
              </button>
              <button type="submit" className="btn bg-gradient-primary">
                Actualizar
              </button>
            </div>
            <GeneradorDeDirecciones
              isOpenGenerator={isOpenGenerator}
              setIsOpenGenerator={setIsOpenGenerator}
              completeAddress={completeAddress}
              setCompleteAddress={setCompleteAddress}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ActualizarDatosEmpresaScreen;
