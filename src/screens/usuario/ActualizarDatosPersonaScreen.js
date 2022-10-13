import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";

const ActualizarDatosPersonaScreen = () => {
  const [page, setPage] = useState(1);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [sexoOptions, setSexoOptions] = useState([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [dataUpdate, setdataUpdate] = useState({});

  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
  });

  const {
    reset,
    register,
    control,
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

        const dataLogin = await JSON.parse(localStorage.getItem("userInfo"));
        //Peticion para buscar la persona por email
          console.log(dataLogin.email)
        const { data: dataPersona } = await clienteAxios.get(
          `personas/getpersonabyemail/${dataLogin.email}`
        );
        reset(dataPersona)
        setdataUpdate(dataPersona);
        console.log(dataPersona);

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
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const submit = (data) => {
    if (page === 1) setPage(2);
    if (page === 2) console.log(data);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };
  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Actualizar datos de persona
        </h3>
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form onSubmit={handleSubmit(submit)}>
            <div className={"row"} hidden={page === 2}>
              <h5 className="font-weight-bolder mt-2">Datos personales</h5>
              <div className="col-12 col-lg-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tipo de documento"
                    disabled
                    value={dataUpdate.tipo_documento?.nombre}
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
                    value={dataUpdate.numero_documento}
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
                    value={dataUpdate.digito_verificacion}
                  />
                  <label className="ms-2">Codigo de verificación:</label>
                </div>
              </div>
              <div className="col-8 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre comercial"
                    {...register("nombreComercial", { required: true })}
                  />
                  <label className="ms-2">Nombre Comercial:</label>
                </div>
              </div>
              <div className="col-4 col-md-6">
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <label className="form-check-label">Si/No</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    required
                    disabled
                    placeholder="Primer nombre"
                    {...register("primer_nombre")}
                  />
                  <label className="ms-2">
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
                  <label className="ms-2">Segundo nombre:</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    placeholder="Primer apellido"
                    type="text"
                    disabled
                    value="Pacheco"
                    required
                    {...register("primerApellido")}
                  />
                  <label className="ms-2">
                    Primer apellido: <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Segundo apellido"
                    {...register("segundoApellido")}
                  />
                  <label className="ms-2">Segundo apellido:</label>
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
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Estado civil:</label>
                  <Controller
                    name="estadoCivil"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={estadoCivilOptions}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="input-group input-group-dynamic flex-column col-6 mt-4">
                <label htmlFor="exampleFormControlInput1">
                  Fecha de nacimiento <span className="text-danger">*</span>
                </label>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      locale="es"
                      selected={formValues.fechaNacimiento}
                      onSelect={(e) =>
                        setFormValues({
                          ...formValues,
                          fechaNacimiento: e,
                        })
                      }
                      className="multisteps-form__input form-control p-2"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label">País de nacimiento:</label>
                <Controller
                  name="paisNacimiento"
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
              {/* LUGAR DE RESIDENCIA */}
              <h5 className="font-weight-bolder mt-4">Lugar de residencia</h5>
              <div className="col-12 col-md-4">
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
                <label className="form-label">
                  Municipio: <span className="text-danger">*</span>
                </label>
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
              <div className="form-floating input-group input-group-dynamic mt-2">
                <input
                  className="form-control"
                  type="text"
                  disabled
                  value="Carrera 28 # 15-53"
                  {...register("direccionResidencial")}
                />
                <label className="ms-2">
                  Dirección residencial: <span className="text-danger">*</span>
                </label>
                <button className="btn bg-gradient-primary" type="button">
                  Generar
                </button>
              </div>
              <div className="col-12">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="referenciaAdicionalDireccion"
                    {...register("referenciaAdicionalDireccion")}
                  />
                  <label className="ms-2">
                    Ingrese una referencia adicional para su dirección:
                  </label>
                </div>
              </div>
            </div>

            {/* SIGUIENTE PAGINA */}

            <div className={"row"} hidden={page === 1}>
              {/* DATOS DE CONTACTO */}
              <h5 className="font-weight-bolder mt-4">Datos de contacto</h5>
              <div className="col-12 col-md-4">
                <label className="form-label">Municipio donde labora:</label>
                <Controller
                  name="municipioDondeLabora"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="form-floating input-group input-group-dynamic mt-2">
                <input
                  className="form-control"
                  type="text"
                  disabled
                  value="Carrera 28 # 15-53"
                  {...register("direccionLaboral")}
                />
                <label className="ms-2">
                  Dirección laboral: <span className="text-danger">*</span>
                </label>
                <button
                  type="button"
                  className="btn bg-gradient-primary text-capitalize"
                >
                  Generar
                </button>
              </div>
              {/* DATOS DE NOTIFICACIÓN */}
              <h5 className="font-weight-bolder mt-4">Datos de notificación</h5>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="email"
                    required={page === 2}
                    placeholder="E-mail"
                    {...register("email")}
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
                    {...register("emailSecundario")}
                  />
                  <label className="ms-2">E-mail secundario:</label>
                </div>
              </div>
              <div className="form-floating input-group input-group-dynamic mt-2">
                <input
                  className="form-control"
                  type="text"
                  disabled
                  value="Carrera 28 # 15-53"
                  {...register("direccionNotificacion")}
                />
                <label className="ms-2">
                  Dirección de notificación:{" "}
                  <span className="text-danger">*</span>
                </label>
                <button
                  type="button"
                  className="btn bg-gradient-primary text-capitalize"
                >
                  Generar
                </button>
              </div>
              <div className="col-12 col-md-4">
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
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic mt-3">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Direccion geografica"
                    {...register("direcciongeografica")}
                  />
                  <label className="ms-2">Dirección geográfica:</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic mt-md-3">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Celular notificación"
                    {...register("celularNotificacion")}
                  />
                  <label className="ms-2">Celular notificación:</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Télefono fijo"
                    {...register("telefonoFijo")}
                  />
                  <label className="ms-2">Teléfono fijo:</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Télefono laboral"
                    {...register("telefonoLaboral")}
                  />
                  <label className="ms-2">Teléfono laboral:</label>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                className="btn bg-gradient-primary text-capitalize"
                type="button"
                onClick={handlePreviousPage}
              >
                {"<< Atrás"}
              </button>
              <button
                className="btn bg-gradient-primary text-capitalize"
                type="submit"
              >
                {page === 1 ? "Siguiente >>" : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ActualizarDatosPersonaScreen;
