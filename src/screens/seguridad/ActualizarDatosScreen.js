import { Controller, useForm } from "react-hook-form";
import LogBackground from "../../assets/logos/Macareniaa.jpg";
import Select from "react-select";

const departamentosOptions = [
  { label: "Arauca", value: "Arauca" },
  { label: "Meta", value: "Meta" },
  { label: "Santander", value: "Santander" },
  { label: "Norte de Santander", value: "Norte de Santander" },
];

const municipiosOptions = [
  { label: "Arauca", value: "Arauca" },
  { label: "Villavicencio", value: "Villavicencio" },
  { label: "Bucaramanga", value: "Bucaramanga" },
  { label: "San Jose de Cucuta", value: "San Jose de Cucuta" },
];

const ActualizarDatosScreen = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    console.log(data);
  };

  return (
    <>
      <span className="mask opacity-6"></span>
      <div className="container my-auto p-2 p-2">
        <div className="row">
          <div className="col-12 col-md-7 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom px-4 pb-2 pb-md-4">
              <h3 className="mt-3 mb-0 text-center mb-6">
                Actualizar datos de empresa
              </h3>
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6 mb-4">
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
                <div className="col-12 col-md-6">
                  <label className="form-label">País:</label>
                  <Controller
                    name="pais"
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="form-floating input-group input-group-dynamic mt-3">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    value="Carrera 28 # 15-53"
                    {...register("direccionNotificacion")}
                  />
                  <label className="ms-2">Dirección empresa:</label>
                  <button type="button" className="btn bg-gradient-primary">
                    Generar
                  </button>
                </div>
                <h5 className="font-weight-bolder mt-2">
                  Datos de notificación
                </h5>
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ActualizarDatosScreen;
