import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { textChoiseAdapter } from "../../adapters/textChoices.adapter";
import clienteAxios from "../../config/clienteAxios";
import { formatISO } from "date-fns";

const AdministradorDePersonasScreen = () => {
  const [sexoOptions, setSexoOptions] = useState([]);
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [paisesOptions, setPaisesOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    tipoDocumento: null,
    fechaNacimiento: "",
    estadoCivil: "",
    sexo: "",
    paisNacimiento: "",
    paisResidencia: "",
    departamento: "",
    municipio: "",
    municipioDondeLabora: "",
  });

  const {
    reset: resetPersona,
    register: registerPersona,
    handleSubmit: handleSumbitPersona,
    control: controlPersona,
    formState: { errors: errorsPersona },
  } = useForm();

  const {
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: sexoNoFormat } = await clienteAxios.get("choices/sexo/");
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );
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

        const sexoFormat = textChoiseAdapter(sexoNoFormat);
        const estadoCivilFormat = textChoiseAdapter(estadoCivilNoFormat);
        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
        const paisesFormat = textChoiseAdapter(paisesNoFormat);
        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

        setSexoOptions(sexoFormat);
        setEstadoCivilOptions(estadoCivilFormat);
        setTipoDocumentoOptions(documentosFormat);
        setPaisesOptions(paisesFormat);
        setDepartamentosOptions(departamentosFormat);
        setMunicipiosOptions(municipiosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const onSubmitBuscarPersona = async (data) => {
    console.log(data);
    const { data: dataPersona } = await clienteAxios.get(
      `personas/getpersonabydocument/${data?.numeroDocumento}`
    );

    /**
    {
    "id_persona": 15,
    "tipo_documento": {
        "cod_tipo_documento": "CC",
        "nombre": "Cedula"
    },
    "estado_civil": null,
    "representante_legal": null,
    "tipo_persona": "N",
    "numero_documento": "1115742224",
    "digito_verificacion": null,
    "primer_nombre": "Junior",
    "segundo_nombre": null,
    "primer_apellido": "Pacheco",
    "segundo_apellido": null,
    "nombre_comercial": null,
    "razon_social": null,
    "pais_residencia": null,
    "departamento_residencia": null,
    "municipio_residencia": null,
    "direccion_residencia": null,
    "direccion_residencia_ref": null,
    "ubicacion_georeferenciada": "mi casita",
    "direccion_laboral": null,
    "direccion_notificaciones": null,
    "pais_nacimiento": null,
    "fecha_nacimiento": "2022-11-03",
    "sexo": null,
    "email": "junior.pacheco.356@gmail.com",
    "email_empresarial": null,
    "telefono_fijo_residencial": null,
    "telefono_celular": "3203708792",
    "telefono_empresa": null,
    "cod_municipio_laboral_nal": null,
    "cod_municipio_notificacion_nal": null,
    "telefono_celular_empresa": null, // Quitar este campo porque ya muchos telefonos
    "telefono_empresa_2": null,
    "cod_pais_nacionalidad_empresa": null,
    "acepta_notificacion_sms": true,
    "acepta_notificacion_email": true,
    "acepta_tratamiento_datos": true
}
     */

    const defaultValuesOverrite = {
      tipoDocumento:
        tipoDocumentoOptions[
          getIndexBySelectOptions(
            dataPersona.tipo_documento?.cod_tipo_documento,
            tipoDocumentoOptions
          )
        ],
      numeroDocumento2: dataPersona.numero_documento,
      primerNombre: dataPersona.primer_nombre,
      segundoNombre: dataPersona.segundo_nombre,
      primerApellido: dataPersona.primer_apellido,
      segundoApellido: dataPersona.segundo_apellido,
      eMail: dataPersona.email,
      celular: dataPersona.telefono_celular,
      emailEmpresarial: dataPersona.email_empresarial,
      telefonoFijo: dataPersona.telefono_fijo_residencial,
      telefonoEmpresa: dataPersona.telefono_empresa,
      telefonoEmpresa2: dataPersona.telefono_empresa_2,
      referenciaAdicional: dataPersona.direccion_residencia_ref,
      direccionDeNotificacion: dataPersona.direccion_notificaciones,
      direccionLaboral: dataPersona.direccion_laboral,
      ubicacionGeografica: dataPersona.ubicacion_georeferenciada,
    };
    setFormValues({
      ...formValues,
      tipoDocumento: getIndexBySelectOptions(
        dataPersona.tipo_documento?.cod_tipo_documento,
        tipoDocumentoOptions
      ),
      sexo: getIndexBySelectOptions(dataPersona.sexo, sexoOptions),
      estadoCivil: getIndexBySelectOptions(
        dataPersona.estado_civil?.cod_estado_civil,
        estadoCivilOptions
      ),
      paisNacimiento: getIndexBySelectOptions(
        dataPersona.pais_nacimiento,
        paisesOptions
      ),
      paisResidencia: getIndexBySelectOptions(
        dataPersona.pais_residencia,
        paisesOptions
      ),
      departamento: getIndexBySelectOptions(
        dataPersona.departamento_residencia,
        departamentosOptions
      ),
      municipio: getIndexBySelectOptions(
        dataPersona.municipio_residencia,
        municipiosOptions
      ),
      municipioDondeLabora: getIndexBySelectOptions(
        dataPersona.cod_municipio_laboral_nal,
        municipiosOptions
      ),
      fechaNacimiento: new Date(dataPersona.fecha_nacimiento),
    });
    console.log(
      "Valor estado civil",
      getIndexBySelectOptions(
        dataPersona.estado_civil?.cod_estado_civil,
        estadoCivilOptions
      )
    );
    resetPersona(defaultValuesOverrite);
    console.log("DataPersona", dataPersona);
  };

  const onSubmitPersona = (data) => {
    console.log(data);
  };

  const getIndexBySelectOptions = (valueSelect, selectOptions) => {
    let indexValue = null;
    const valueSelected = selectOptions.filter((selectOption, index) => {
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
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Administrador de personas
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
                <div className="col-12 col-md-4">
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

            <form onSubmit={handleSumbitPersona(onSubmitPersona)}>
              <h5 className="font-weight-bolder mt-4">Datos personales</h5>
              <hr className="dark horizontal my-0" />
              <div className="mt-4 row">
                <div className="row col-12 justify-content-center align-items-center">
                  <div className="col-12 col-md-4">
                    <label className="form-label">
                      Tipo de documento: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="tipoDocumento2"
                      control={controlBuscar}
                      // rules={{
                      //   required: true,
                      // }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          inputValue={
                            tipoDocumentoOptions[formValues.tipoDocumento]
                              ?.label
                          }
                          options={tipoDocumentoOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="text"
                        //required
                        placeholder="Numero de documento"
                        {...registerPersona("numeroDocumento2")}
                      />
                      <label className="ms-2">
                        Número de documento:{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        //required
                        placeholder="Primer nombre"
                        {...registerPersona("primerNombre")}
                      />
                      <label className="ms-2">
                        Primer nombre: <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Segundo nombre"
                      {...registerPersona("segundoNombre")}
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
                      //required
                      {...registerPersona("primerApellido")}
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
                      {...registerPersona("segundoApellido")}
                    />
                    <label className="ms-2">Segundo apellido:</label>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12 col-md-4">
                    <label className="form-label">Sexo:</label>
                    <Controller
                      name="sexo"
                      control={controlBuscar}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={sexoOptions}
                          inputValue={sexoOptions[formValues.sexo]?.label}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">Estado civil:</label>
                    <Controller
                      name="estadoCivil"
                      control={controlBuscar}
                      render={({ field }) => (
                        <Select
                          {...field}
                          inputValue={
                            estadoCivilOptions[formValues.estadoCivil]?.label
                          }
                          options={estadoCivilOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">País de nacimiento:</label>
                    <Controller
                      name="paisNacimiento"
                      control={controlBuscar}
                      render={({ field }) => (
                        <Select
                          {...field}
                          inputValue={
                            paisesOptions[formValues.paisNacimiento]?.label
                          }
                          options={paisesOptions}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="input-group input-group-dynamic flex-column col-12 col-md-4 mt-4">
                  <label htmlFor="exampleFormControlInput1">
                    Fecha de nacimiento <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="fechaNacimiento"
                    control={controlBuscar}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        //required
                        selected={formValues.fechaNacimiento}
                        value={formValues.fechaNacimiento}
                        onSelect={(e) => {
                          console.log(e);
                          setFormValues({ ...formValues, fechaNacimiento: e });
                        }}
                        className="multisteps-form__input form-control p-2"
                        placeholderText="dd/mm/aaaa"
                      />
                    )}
                  />
                </div>
              </div>
              <h5 className="font-weight-bolder mt-4">Datos de contacto</h5>
              <hr className="dark horizontal my-0" />
              <div className="mt-4 row">
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="email"
                      //required
                      placeholder="E-mail"
                      {...registerPersona("eMail")}
                    />
                    <label className="ms-2">
                      E-mail: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Email empresarial"
                      {...registerPersona("emailEmpresarial")}
                    />
                    <label className="ms-2">Email empresarial:</label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Celular"
                      {...registerPersona("celular")}
                    />
                    <label className="ms-2">
                      Celular: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="email"
                      //required
                      placeholder="Telefono"
                      {...registerPersona("telefonoFijo")}
                    />
                    <label className="ms-2">
                      Telefono fijo: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Telefono"
                      {...registerPersona("telefonoEmpresa")}
                    />
                    <label className="ms-2">
                      Telefono empresa: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Telefono"
                      {...registerPersona("telefonoEmpresa2")}
                    />
                    <label className="ms-2">
                      Telefono empresa 2: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
              </div>
              <h5 className="font-weight-bolder mt-4">Lugar de residencia</h5>
              <div className="row mb-3">
                <div className="col-12 col-md-4">
                  <label className="form-label">País de Residencia:</label>
                  <Controller
                    name="paisResidencia"
                    control={controlBuscar}
                    render={({ field }) => (
                      <Select
                        {...field}
                        inputValue={
                          paisesOptions[formValues.paisResidencia]?.label
                        }
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
                    control={controlBuscar}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={departamentosOptions}
                        inputValue={
                          departamentosOptions[formValues.departamento]?.label
                        }
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
                    control={controlBuscar}
                    render={({ field }) => (
                      <Select
                        {...field}
                        inputValue={
                          municipiosOptions[formValues.municipio]?.label
                        }
                        options={municipiosOptions}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-8 col-12">
                  <div className="form-floating input-group input-group-dynamic mt-2">
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      {...registerPersona("direccionDeNotificacion")}
                    />
                    <label className="ms-2">
                      Dirección de notificación:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <button
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
                      placeholder="referencia adicional"
                      {...registerPersona("referenciaAdicional")}
                    />
                    <label className="ms-2">Referencia adicional:</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-12">
                  <div className="form-floating input-group input-group-dynamic mt-2">
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      {...registerPersona("direccionLaboral")}
                    />
                    <label className="ms-2">
                      Dirección laboral: <span className="text-danger">*</span>
                    </label>
                    <button
                      type="button"
                      className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                    >
                      Generar
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Municipio donde labora:</label>
                  <Controller
                    name="municipioDondeLabora"
                    control={controlBuscar}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={paisesOptions}
                        inputValue={
                          municipiosOptions[formValues.municipioDondeLabora]
                            ?.label
                        }
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Ubicacion geografica"
                      {...registerPersona("ubicacionGeografica")}
                    />
                    <label className="ms-2">Ubicacion geografica:</label>
                  </div>
                </div>
              </div>

              <button
                className="btn bg-gradient-primary mb-0 d-block ms-auto mt-4 text-capitalize"
                type="submit"
              >
                Crear/Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdministradorDePersonasScreen;
