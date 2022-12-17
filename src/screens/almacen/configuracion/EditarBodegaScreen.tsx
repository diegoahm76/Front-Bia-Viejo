import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import { Navigate, useNavigate } from "react-router-dom";

import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import clienteAxios from "../../../config/clienteAxios";
import {
  crearNuevaBodegaAction,
  editarBodegaAction,
} from "../../../actions/bodegaActions";
import { useDispatch, useSelector } from "react-redux";
import BusquedaAvanzadaModal from "../../../components/BusquedaAvanzadaModal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { IGeneric } from "../../../Interfaces/Generic";
import { editarBodega } from "../../../store/slices/bodega/indexBodega";

const busquedaAvanzadaModel = {
  tipoDocumento: { value: "", label: "" },
  cedula: "",
  nombreCompleto: "",
  idResponsable: 0
}

const infoBodegaModel = {
  id_bodega: 0,
  nombreBodega: "",
  departamento: { value: "", label: "" },
  municipio: { value: "", label: "" },
  direccionBodega: "",
  principal: false
}
const EditarBodegaScreen = () => {

  const [busquedaAvanzadaIsOpen, setBusquedaAvanzadaIsOpen] = useState(false);
  const [busquedaModel, setBusquedaModel] = useState(busquedaAvanzadaModel);
  const [infoBodega, setInfoBodegaModel] = useState(infoBodegaModel);
  const [formValuesSearch, setFormValuesSearch] = useState({
    index_tipo_documento: "",
    id_persona: "",
  });

  const dispatch = useAppDispatch();

  const bodegaEditar = useAppSelector(
    (state) => state.bodegaSlice.bodegaEditar
  );

  const {
    reset: resetBuscar,
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    control: controlBuscar,
    setValue,
    register,
    formState: { errors: errorsBuscar },
  } = useForm();

  const {
    reset: resetBodega,
    watch: watchBodega,
    register: registerBodega,
    handleSubmit: handleSubmitBodega,
    control: controlBodega,
    formState: { errors: errorsBodega },
  } = useForm();

  const initialOptions: IGeneric[] = [{
    label: "",
    value: ""
  }]

  const [departamentosOptions, setDepartamentosOptions] = useState(initialOptions);
  const [municipiosOptions, setMunicipiosOptions] = useState(initialOptions);
  const [municipioFiltered, setMunicipioFiltered] = useState(initialOptions)
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState(initialOptions);
  const [es_principal, setEs_principal] = useState(false);
  const [formValues, setFormValues] = useState({
    municipio: "",
    departamento: "",
  });

  const navigate = useNavigate();
  const Regresar = () => {
    navigate("/dashboard/almacen/configuracion/creacionbodega");
  };

  useEffect(() => {
    getSelectsOptions();
  }, [bodegaEditar]);

  const getSelectsOptions = async () => {
    try {
      const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
        "choices/tipo-documento/"
      );
      const { data: departamentosNoFormat } = await clienteAxios.get(
        "choices/departamentos/"
      );
      const { data: municipiosNoFormat } = await clienteAxios.get(
        "choices/municipios/"
      );
      const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
      const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
      const municipiosFormat = textChoiseAdapter(municipiosNoFormat);
      setTipoDocumentoOptions(documentosFormat);
      setDepartamentosOptions(departamentosFormat);
      setMunicipiosOptions(municipiosFormat);
      let coddep = bodegaEditar.cod_municipio.slice(0, 2);

      departamentosFormat.forEach((dep) => {
        if (dep.value === coddep) {
          coddep = dep.value;
        }
      });
      crearModeloBuscar();
      crearModeloInformacion(municipiosFormat, departamentosFormat);

    } catch (err) {
      console.log(err);
    }
  };

  const crearModeloBuscar = () => {
    const fullName = createFullName();
    let busqueda = { ...busquedaModel }
    busqueda.nombreCompleto = fullName;
    busqueda.tipoDocumento = {
      value: bodegaEditar.id_responsable.tipo_documento.cod_tipo_documento,
      label: bodegaEditar.id_responsable.tipo_documento.nombre
    }
    busqueda.idResponsable=bodegaEditar.id_responsable.id_persona;
    busqueda.cedula = bodegaEditar.id_responsable.numero_documento
    setBusquedaModel(busqueda);
  }

  const crearModeloInformacion = (municipiosFormat, departamentosFormat) => {
    let bodega = { ...infoBodega }
    bodega.nombreBodega = bodegaEditar.nombre;
    bodega.direccionBodega = bodegaEditar.direccion
    const indicator = bodegaEditar.cod_municipio.slice(0, 2);
    let depa = departamentosFormat.filter((res) => res.value === indicator);
    bodega.departamento = {
      label: depa[0].label,
      value: depa[0].value
    }
    let muni = municipiosFormat.filter((res) => res.value === bodegaEditar.cod_municipio)
    bodega.municipio = {
      label: muni[0].label,
      value: muni[0].value
    }
    setValue("cod_municipio", bodega.municipio);
    setValue("departamento", bodega.departamento);
    setInfoBodegaModel(bodega);
  }
  const createFullName = () => {
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
    } = bodegaEditar.id_responsable;
    const fullName = `${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`;
    const regex = /null/g;
    fullName.replace(regex, '');
    return fullName;
  }
  // useEffect(() => {
  //   if (watchBodega("departamento")?.value) {
  //     setMunicipioFiltered([]);
  //     resetBodega({ ...watchBodega(), cod_municipio: "" })
  //   } else {
  //     const municipioIndicadores = watchBodega("departamento")?.value;
  //     console.log("prueba", municipiosOptions, municipioIndicadores, watchBodega())
  //     const municipiosCoincidentes = municipiosOptions.filter((municipio) => {
  //       const indicator = municipio.value.slice(0, 2);
  //       return municipioIndicadores === indicator;
  //     }
  //     );
  //     setMunicipioFiltered(municipiosCoincidentes);
  //     resetBodega({ ...watchBodega(), cod_municipio: 0 })
  //   }
  // }, [watchBodega("departamento")]);


  const changeSelect = (e) => {
    let tipoDocumento = { ...busquedaModel }
    tipoDocumento.tipoDocumento = {
      value: e.value,
      label: e.label
    }
    setBusquedaModel(tipoDocumento)
  }
  const changeSelectMuni = (e) => {
    let municipio = { ...infoBodega }
    municipio.municipio = {
      value: e.value,
      label: e.label
    }
    setInfoBodegaModel(municipio)
  }
  const changeSelectDepa = (e) => {
    let departamento = { ...infoBodega }
    departamento.departamento = {
      value: e.value,
      label: e.label
    }
    setInfoBodegaModel(departamento)
  }
  const changeNombre = (e) => {
    let nombre = { ...infoBodega }
    nombre.nombreBodega = e.target.value;
    setInfoBodegaModel(nombre)
  }

  const changeDireccion = (e) => {
    let direccion = { ...infoBodega }
    direccion.direccionBodega = e.target.value;
    setInfoBodegaModel(direccion)
  }

  const changeName = (e) => {
    let nombre = { ...busquedaModel }
    nombre.nombreCompleto = e.target.value;
    setBusquedaModel(nombre)
  }


  const submitEditarBodega = () => {
    const cedula = parseInt(busquedaModel.cedula);
    const bodegaEditada = {
      cod_municipio: infoBodega.municipio.value,
      nombre: busquedaModel.nombreCompleto,
      direccion: infoBodega.direccionBodega,
      id_responsable: busquedaModel.idResponsable,
      es_principal: infoBodega.principal,
      activo: true
    };
    editarBodega(dispatch, bodegaEditar.id_bodega, bodegaEditada);
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmitBuscar(submitEditarBodega)}
          id="configForm"
        >
          <div className="row">
            <h3 className="text-rigth  fw-light mt-4 mb-2"> Editar bodega</h3>
            <Subtitle title={"Datos del responsable"} mb={3} />
            <div className="col-12 col-md-3">
              <label className="ms-3 text-terciary">Tipo de documento<span className="text-danger">*</span></label>
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
                    value={busquedaModel.tipoDocumento}
                    onChange={changeSelect}
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
            <div className="col-12 col-md-3">
              <div>
                <label className="ms-2 text-terciary">Número de documento<span className="text-danger">*</span></label>
                <input
                  className="border border-terciary form-control border rounded-pill px-3"
                  type="text"
                  placeholder="Número de documento"
                  defaultValue={busquedaModel.cedula}
                  required
                />
              </div>
              {errorsBuscar.numeroDocumento && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="col-12 col-md-3">
              <div>
                <label className="ms-2 text-terciary">Nombre completo</label>
                <input
                  className="form-control border border-terciary border rounded-pill px-3"
                  type="text"
                  placeholder="Nombre completo"
                  value={busquedaModel.nombreCompleto}
                  onChange={changeName}
                  required
                  disabled
                />
              </div>
            </div>
            <div className="col-12 col-md-3 mt-2">
              <div className="d-grid gap-2 d-flex">
                <button
                  className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                  type="button"
                  onClick={() => setBusquedaAvanzadaIsOpen(true)}
                >
                  Busqueda avanzada
                </button>
              </div>
            </div>
            <BusquedaAvanzadaModal
              isModalActive={busquedaAvanzadaIsOpen}
              setIsModalActive={setBusquedaAvanzadaIsOpen}
              setFormValues={setFormValuesSearch}
              reset={resetBuscar}
              tipoDocumentoOptions={tipoDocumentoOptions}
            />
          </div>
        </form>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmitBodega(submitEditarBodega)}
          id="configForm"
        >
          <div className="row">
            <Subtitle title="Información de la bodega" mb={3} />
            <div className="col-12 col-sm-3 mt-2">
              <div>
                <label className="ms-3 text-terciary">Nombre de la bodega<span className="text-danger">*</span></label>
                <input
                  className="form-control border border-terciary rounded-pill px-3"
                  type="text"
                  name="nombreBodega"
                  placeholder="Nombre de la bodega"
                  value={infoBodega.nombreBodega}
                  onChange={changeNombre}
                  required={false}
                // {...registerBodega("nombre", { required: true })}
                />
              </div>
            </div>

            <div className="col-12 col-md-3 mt-2">
              <div className=" input-group input-group-dynamic">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  {" "}
                  Departamento <span className="text-danger">*</span>{" "}
                </label>
                <Controller
                  name="departamento"
                  control={controlBodega}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="col-12 mt-2"
                      required={false}
                      options={departamentosOptions}
                      placeholder="Seleccionar"
                      value={infoBodega.departamento}
                      {...register("departamento")}
                      onChange={changeSelectDepa}
                    />
                  )}
                />
              </div>
            </div>

            <div className="col-12 col-md-3 mt-2">
              <div className=" input-group input-group-dynamic">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  {" "}
                  Municipio: <span className="text-danger">*</span>{" "}
                </label>
                <Controller
                  name="cod_municipio"
                  control={controlBodega}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="col-12 mt-2"
                      options={municipiosOptions}
                      placeholder="Seleccionar"
                      value={infoBodega.municipio}
                      {...register("cod_municipio")}
                      onChange={changeSelectMuni}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-12 col-sm-3 mt-2">
              <div>
                <label className="ms-3 text-terciary">
                  Dirección de bodega<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control border border-terciary rounded-pill px-3"
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  required
                  value={infoBodega.direccionBodega}
                  onChange={changeDireccion}
                // {...registerBodega("direccion", { required: true })}
                />
              </div>
            </div>
            <div className="form-check mt-4">
              <label
                className="form-check-label text-terciary me-2"
                htmlFor="flexCheckDefault"
              >
                ¿La bodega es principal?
              </label>
              <input
                className="border border-terciary form-check-input mx-2"
                type="checkbox"
                id="flexCheckDefault"
                defaultChecked={infoBodega.principal}
              />
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button
                type="submit"
                className="btn  mx-2 p-2 w-7 text-capitalize"
                title="Guardar cambios"
              >
                <i className="fa-regular fa-floppy-disk fs-3"></i>
              </button>
              <button
                type="button"
                className="btn  mx-2 text-capitalize"
                title="Descartar"
                onClick={() => Regresar()}
              >
                <i className="fa-solid fa-x fs-3"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditarBodegaScreen;
