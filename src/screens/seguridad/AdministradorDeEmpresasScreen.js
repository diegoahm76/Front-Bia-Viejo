import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const optionsTipoDocumento = [
  { label: "C.C", value: "CC" },
  { label: "T.I", value: "TI" },
];

const estadoCivilOptions = [
  { label: "Soltero", value: "Soltero" },
  { label: "Casado", value: "Casado" },
  { label: "Viudo", value: "Viudo" },
];

const paisesOptions = [
  { label: "Colombia", value: "COL" },
  { label: "Mexico", value: "MX" },
  { label: "Venezuela", value: "VEN" },
];

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

const AdministradorDeEmpresasScreen = () => {
  const { register, handleSubmit, control } = useForm();

  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
  });

  const [page, setPage] = useState(1);

  const submit = (data) => {
    if (page === 1) setPage(2);
    if (page === 2) console.log(data);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-4">
          Administrador de empresas
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="row" hidden={page === 2}>
            <h5 className="font-weight-bolder">Buscar usuario</h5>
            <div className="mt-4 row">
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Tipo de documento: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="tipoDocumento"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsTipoDocumento}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>
            <div className="row col-12 justify-content-center align-items-center">
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    //required
                    placeholder="Numero de documento"
                    {...register("numeroDocumento")}
                  />
                  <label className="ms-2">
                    Número de documento: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <button className="btn bg-gradient-primary mb-0 text-capitalize">
                  Buscar
                </button>
                <button className="ms-3 btn bg-gradient-primary mb-0 text-capitalize">
                  Busqueda avanzada
                </button>
              </div>
            </div>
            <h5 className="font-weight-bolder mt-4">Datos personales</h5>
            <hr className="dark horizontal my-0" />
            <div className="mt-4 row">
              <div className="row col-12 justify-content-center align-items-center">
                <div className="col-12 col-md-6">
                  <label className="form-label">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumento2"
                    control={control}
                    // rules={{
                    //   required: true,
                    // }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsTipoDocumento}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic ms-2">
                    <input
                      className="form-control"
                      type="text"
                      //required
                      placeholder="Numero de documento"
                      {...register("numeroDocumento2")}
                    />
                    <label className="ms-2">
                      Número de documento:{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    //required
                    placeholder="codigo de verificacion"
                    {...register("codVerificacion")}
                  />
                  <label className="ms-2">
                    Cod. verificacion: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre comercial"
                    {...register("nombreComercial")}
                  />
                  <label className="ms-2">Nombre comercial:</label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    placeholder="Razon social"
                    type="text"
                    //required
                    {...register("razonSocial")}
                  />
                  <label className="ms-2">
                    Razon social: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="email"
                    //required
                    placeholder="E-mail"
                    {...register("eMail")}
                  />
                  <label className="ms-2">
                    E-mail: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Celular"
                    {...register("celular")}
                  />
                  <label className="ms-2">
                    Celular: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
            </div>
            <h5 className="font-weight-bolder mt-4">Datos de contacto</h5>
            <hr className="dark horizontal my-0" />
            <div className="mt-4 row">
              <div className="form-floating input-group input-group-dynamic mt-2">
                <input
                  className="form-control"
                  type="text"
                  disabled
                  value="Carrera 28 # 15-53"
                  //{...register("direccionNotificacion")}
                />
                <label className="ms-2">
                  Dirección de empresa: <span className="text-danger">*</span>
                </label>
                <button
                  type="button"
                  className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                >
                  Generar
                </button>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">País:</label>
                <Controller
                  name="paisResidencia"
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
                <label className="form-label">
                  Municipio: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="municipio"
                  control={control}
                  // rules={{
                  //   required: true,
                  // }}
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
          </div>

          <div className="row" hidden={page === 1}>
            <h5 className="font-weight-bolder">Datos de notificacion</h5>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="email"
                  //required
                  placeholder="E-mail"
                  {...register("eMail")}
                />
                <label className="ms-2">
                  E-mail de notificacion: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="email"
                  //required
                  placeholder="E-mail"
                  {...register("eMail")}
                />
                <label className="ms-2">
                  E-mail secundario: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="form-floating input-group input-group-dynamic mt-2">
              <input
                className="form-control"
                type="text"
                disabled
                value="Carrera 28 # 15-53"
                //{...register("direccionNotificacion")}
              />
              <label className="ms-2">
                Dirección de notificacion:{" "}
                <span className="text-danger">*</span>
              </label>
              <button
                type="button"
                className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
              >
                Generar
              </button>
            </div>
            <div className="row col-12 justify-content-center align-items-center">
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Municipio de notificacion:{" "}
                  <span className="text-danger">*</span>
                </label>
                <Controller
                  name="tipoDocumento2"
                  control={control}
                  // rules={{
                  //   required: true,
                  // }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic ms-2">
                  <input
                    className="form-control"
                    type="text"
                    //required
                    placeholder="Ubicacion geografica"
                    {...register("ubicacionGeografica")}
                  />
                  <label className="ms-2">
                    Ubicacion geografica: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic ms-2">
                <input
                  className="form-control"
                  type="text"
                  //required
                  placeholder="Celular de notificacion"
                  {...register("celularDeNotificacion")}
                />
                <label className="ms-2">
                  Celular de notificacion:{" "}
                  <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic ms-2">
                <input
                  className="form-control"
                  type="text"
                  //required
                  placeholder="Telefono alterno"
                  {...register("telefonoAlterno")}
                />
                <label className="ms-2">
                  Telefono alterno: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic ms-2">
                <input
                  className="form-control"
                  type="text"
                  //required
                  placeholder="Telefono empresa"
                  {...register("telefonoEmpresa")}
                />
                <label className="ms-2">
                  Telefono empresa: <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <h5 className="font-weight-bolder mt-4">Datos de usuario</h5>
            <hr className="dark horizontal my-0" />
            <div className="col-12 col-md-6">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="tel"
                  disabled
                  placeholder="Telefono"
                  value="Administrador"
                />
                <label className="ms-2">Nombre de usuario:</label>
              </div>
            </div>
            <div className="row flex-column mt-3">
              <div class="form-check col-md-6 col-12 ps-0 pe-10 ms-3 d-flex">
                <label class="form-check-label" for="flexCheckDefault">
                  Bloqueado
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
              <div class="form-check col-md-6 col-12 ps-0 pe-10 ms-3 d-flex">
                <label class="form-check-label" for="flexCheckDefault">
                  Activo
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </div>
            <div className="row aling-items-center">
              <div className="col-12 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Motivo de la accion"
                    {...register("motivoDeLaAccion")}
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
              <div class="form-check col-md-6 col-12 ps-0 pe-10 ms-3 d-flex">
                <label class="form-check-label" for="flexRadioDefault2">
                  Externo
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
              </div>
            </div>
            <h5 className="font-weight-bolder mt-4">
              Modulos / Grupos / Roles
            </h5>
            <hr className="dark horizontal my-0" />
            <div className="col-12 col-md-6">
              <label className="form-label">Roles:</label>
              <Controller
                name="paisResidencia"
                control={control}
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
            <div className="col-12 col-md-6">
              <label className="form-label">Tipo de tercero:</label>
              <Controller
                name="paisResidencia"
                control={control}
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
            <div class="form-check mt-5">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Acepta envio de mensaje de texto SMS.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Acepta envio de mensaje de correo.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Acepta que la corporacion administre sus datos personales.
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-4 mt-6">
            <button
              className={`btn bg-gradient-danger mb-0 text-capitalize ${
                page === 1 && "d-none"
              }`}
              type="button"
              title="Send"
              onClick={handlePreviousPage}
            >
              {"<< Atrás"}
            </button>
            <button
              className="btn bg-gradient-primary mb-0 text-capitalize"
              type="submit"
              title="Send"
              form="configForm"
            >
              {page === 1 ? "Siguiente >>" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdministradorDeEmpresasScreen;
