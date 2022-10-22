import React from "react";
import { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const optionsDocumentSelection = [
  { label: "Seleccione opción" },
  { label: "Cédula de ciudadanía" },
  { label: "Cédula de extranjería" },
  { label: "Pasaporte" },
  { label: "NIT" },
];

const optionsDniNumbers = [
  { label: "Seleccione opción" },
  { label: "1111111111" },
  { label: "1212121212" },
  { label: "1010101011" },
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

const optionsProfessional = [
  { label: "Cesar Camacho" },
  { label: "Argenis Alarcón" },
  { label: "Mónica Ospina" },
];

const CreacionBodegaScreen = () => {
  const [selectDepartament, setSelectedDepartament] = useState(null);
  const [selectMunicipios, setSelectedMunicipios] = useState(null);
  const [selectedIdDocument, setSelectedIdDocument] = useState(null);
  const [selectProfessional, setSelectedProfessional] = useState(null);
  const [selectNumberId, setSelectedNumberId] = useState(null);
  const { register, handleSubmit, control } = useForm();

  const submit = (data) => {};

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6"> Creación de bodegas</h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="row">
              <div className="col-12 col-md-4 mt-2">
                <div className="input-group input-group-dynamic">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    {" "}
                    Nombre de bodega:{" "}
                    <span className="text-danger" {...register("cellarName")}>
                      *
                    </span>{" "}
                  </label>
                  <input
                    className="multisteps-form__input form-control mt-1"
                    type="text"
                  />
                </div>
              </div>

              <div className="col-12 col-md-4 mt-2">
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

              <div className="col-12 col-md-4 mt-2">
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

              <div className="col-12 col-md-4 mb-2 mt-4">
                <div className="input-group input-group-dynamic">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    {" "}
                    Dirección de bodega: <span className="text-danger">
                      *
                    </span>{" "}
                  </label>
                  <input
                    className="multisteps-form__input form-control"
                    type="text"
                    {...register("cellarAddress")}
                  />
                </div>
              </div>

              <div className="col-12 d-flex justify-content-center mt-7 mb-5">
                <label className="form-floating input-group input-group-dynamic ms-5 my-2">
                  {" "}
                  Notificar a: <span className="text-danger">*</span>{" "}
                </label>
                <Controller
                  name="tipoDocumento"
                  control={control}
                  //rules={{
                  //required: true,
                  //}}
                  render={({ field }) => (
                    <Select
                      {...field}
                      {...register("idDocument")}
                      className="col-3 mx-1"
                      defaultValue={selectedIdDocument}
                      onChange={setSelectedIdDocument}
                      options={optionsDocumentSelection}
                      placeholder="Seleccionar"
                    />
                  )}
                />

                <Controller
                  name="numeroDocumento"
                  control={control}
                  //rules={{
                  //required: true,
                  //}}
                  render={({ field }) => (
                    <Select
                      {...field}
                      {...register("optionDniNumbers")}
                      className="col-3 mx-1"
                      defaultValue={selectNumberId}
                      onChange={setSelectedNumberId}
                      options={optionsDniNumbers}
                      placeholder="Seleccionar"
                    />
                  )}
                />

                <Controller
                  name="Professional"
                  control={control}
                  //rules={{
                  //required: true,
                  //}}
                  render={({ field }) => (
                    <Select
                      {...field}
                      {...register("ProfessionalOptions")}
                      className="col-3 mx-1"
                      defaultValue={selectProfessional}
                      onChange={setSelectedProfessional}
                      options={optionsProfessional}
                      placeholder="Seleccionar"
                    />
                  )}
                />

                <div>
                  <button
                    type="button"
                    className="btn btn-primary mx-2 text-capitalize"
                  >
                    Buscar
                  </button>
                </div>
              </div>

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
