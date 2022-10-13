import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const paisesOptions = [
  { label: "Colombia", value: "COL" },
  { label: "Mexico", value: "MX" },
  { label: "Venezuela", value: "VEN" },
];

const AdministradosDeUsuario = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Administrador de usuarios
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <h5 className="font-weight-bolder mt-4">Datos de usuario</h5>
          <hr className="dark horizontal my-0" />
          <div className="col-12 col-md-4">
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
            <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex">
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Bloqueado
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </div>
            <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex">
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Activo
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
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
                  {...register("ubicacionGeografica")}
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
            <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex">
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Interno
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
            </div>
            <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex">
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Externo
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
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
                  {...register("ubicacionGeografica")}
                />
                <label className="ms-2">Motivo de la accion:</label>
              </div>
            </div>
            <button className="btn bg-gradient-primary text-capitalize col-12 col-md-2 mb-0 mt-3 ms-3">
              Actualizar
            </button>
          </div>
          <h5 className="font-weight-bolder mt-4">Modulos / Grupos / Roles</h5>
          <hr className="dark horizontal my-0" />
          <div className="col-12 col-md-4">
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
          <div className="col-12 col-md-4">
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
          <div className="form-check mt-5">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
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
            <label className="form-check-label" htmlFor="flexCheckDefault">
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
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Acepta que la corporacion administre sus datos personales.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdministradosDeUsuario;
