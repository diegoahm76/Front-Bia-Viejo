import React from "react";
import { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import Subtitle from "../../../components/Subtitle";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";

const optionsDocumentSelection = [
  { label: "Seleccione opción" },
  { label: "Cédula de ciudadanía" },
  { label: "Cédula de extranjería" },
  { label: "Pasaporte" },
  { label: "NIT" },
];


const optionsDepartamentos = [
  { label: "Seleccione opción" },
  { label: "Meta" },
  { label: "Casanare" },
  { label: "Arauca" },
];

const optionsMunicipios = [
  { label: "Seleccione opción" },
  { label: "Villavicencio" },
  { label: "Granada" },
  { label: "Acacías" },
];

const CreacionBodegaScreen = () => {
  const [selectDepartament, setSelectedDepartament] = useState(null);
  const [selectMunicipios, setSelectedMunicipios] = useState(null);
  const { register, handleSubmit, control } = useForm();

  const submit = (data) => {};

  const [isModalActive, setIsModalActive] = useState(false);
  const handleOpenModal = () => {
    setIsModalActive(true);
  };
  const onSubmit = (data) => {};

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <h3 className="text-rigth  fw-light mt-4 mb-2">
            {" "}
            Creación de bodegas
          </h3>

          <MarcaDeAgua1>
            <div className="row">
              <Subtitle title="Información del articulo" mb="3" />
              <div className="col-12 col-sm-3 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Nombre de bodega</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="nombre"
                    {...register("nombre")}
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
                    name="tipoDocumento"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        {...register("departamento")}
                        className="col-12 mt-2"
                        defaultValue={selectDepartament}
                        onChange={setSelectedDepartament}
                        options={optionsDepartamentos}
                        placeholder="Seleccionar"
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
                    name="municipio"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        {...register("municipio")}
                        className="col-12 mt-2"
                        defaultValue={selectMunicipios}
                        onChange={setSelectedMunicipios}
                        options={optionsMunicipios}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3 mt-2">
                <div>
                  <label className="ms-3 text-terciary">
                    Dirección de bodega
                  </label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="dirección"
                    {...register("direccion")}
                  />
                </div>
              </div>
              <div className="form-check mt-4">
                            <label
                              className="form-check-label text-terciary me-2"
                              htmlFor="flexCheckDefault"
                            >
                              ¿La bodega es principal?</label>
                            <input
                              name="yesOrNo"
                              className="border border-terciary form-check-input mx-2"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                          </div>

              <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <Subtitle title={"Datos del responsable"}
              mb="3" />
              <div className="col-12 col-sm-3">
                <label className="ms-3 text-terciary">Tipo de Documento</label>
                <Controller
                  name="tipoDocumento"
                  control={control}
                  defaultValue={optionsDocumentSelection[0]}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsDocumentSelection}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Número de cedula</label>
                  <input
                    className="form-control border border border-terciary rounded-pill px-3"
                    type="number"
                    placeholder="número cédula"
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre completo</label>
                  <input
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    {...register("nombreCompleto")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-2 mt-2">
                <div className="d-grid gap-2 d-flex">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="submit"
                    title="Send"
                    form="configForm"
                    
                    onClick={handleOpenModal}
                  >
                    Buscar
                  </button>
                </div>
              </div>
              <BusquedaDePersonalModal
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
              />
            </div>
          </form>
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn btn-secondary mx-2 p-2 w-7 text-capitalize"
                >
                  {" "}
                  Guardar{" "}
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2 text-capitalize"
                >
                  Salir{" "}
                </button>
              </div>
            </div>
          </MarcaDeAgua1>
        </form>
      </div>
    </div>
  );
};

export default CreacionBodegaScreen;
