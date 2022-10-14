import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";

const paisesOptions = [
  { label: "Colombia", value: "COL" },
  { label: "Mexico", value: "MX" },
  { label: "Venezuela", value: "VEN" },
];

const AdministradosDeUsuario = () => {
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);

  const {
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const { register, handleSubmit, control } = useForm();

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {

        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4MzA4OTU2LCJpYXQiOjE2NjU3MTY5NTYsImp0aSI6ImZhNTdmYzM1ZjI1MzQyNzk5ZjE1NjU5Yjg5YTRjOGMyIiwidXNlcl9pZCI6MX0.K1aGseNPIlSbOyIZVTOGzb316mt-dZgHy31tIt5o7Dg"
          },
        };

        const { data: getUserById } = await clienteAxios.get("users/get/1192911483/", config)

        console.log("getUserById", getUserById)
        
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );

        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);

        setTipoDocumentoOptions(documentosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const onSubmitBuscarPersona = (data) => {
    console.log(data);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-4">
          Administrador de usuarios
        </h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <div className="row">
            <form
              onSubmit={handleSubmitBuscar(onSubmitBuscarPersona)}
              id="buscarPersonaForm"
            >
              <h5 className="font-weight-bolder">Buscar persona</h5>
              <div className="mt-4 row align-items-center">
                <div className="col-12 col-md-4">
                  <label className="form-label">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumento"
                    control={controlBuscar}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={tipoDocumentoOptions}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errorsBuscar.tipoDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Numero de documento"
                      {...registerBuscar("numeroDocumento", { required: true })}
                    />
                    <label className="ms-2">
                      Número de documento:{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  {errorsBuscar.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0">
                  <button
                    type="submit"
                    form="buscarPersonaForm"
                    className="btn bg-gradient-primary mb-0 text-capitalize"
                  >
                    Buscar
                  </button>
                  <button className="ms-3 btn bg-gradient-primary mb-0 text-capitalize">
                    Busqueda avanzada
                  </button>
                </div>
              </div>
            </form>
            <form>
              <h5 className="font-weight-bolder mt-3">Datos de usuario</h5>
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
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
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
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
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
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
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
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
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
              <h5 className="font-weight-bolder mt-4">
                Modulos / Grupos / Roles
              </h5>
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
      </div>
    </div>
  );
};
export default AdministradosDeUsuario;
