//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import React, { useState } from "react";

const StockMaximoMinimoScreen = () => {
  const { register, control, handleSubmit } = useForm();

  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);

  const [selecOpciones, setSelecOpciones] = useState({
    tipoDocumento: "",
    numeroCedula: "",
    dependencia: "",
    grupo: "",
    codigoArticulo: "",
    nombreArticulo: "",
  });


  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      dependencia: data.dependencia?.value,
      tipoDocumento: data.tipoDocumento?.value,
      grupo: data.grupo?.value,
      numeroCedula: data.numeroCedula,
      codigoArticulo: data.codigoArticulo,
      nombreArticulo: data.nombreArticulo,
    });
  };


  const options = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Configuarción de maximos y minimos de consumo
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <h5 className="font-weight-bolder">Stock</h5>
          <div className="multisteps-form__content">
            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Tipo de documento</n>
              </label>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <div className="col-12 ">
                    <Controller
                      name="tipoDocumento"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}

                          placeholder="Seleccionar"
                        />
                      )}
                    /></div>
                </label>

              </div>
              <div className="col-12 col-sm-4">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="numero cedula"
                    {...register("numeroCedula")}
                  />
                  <label className="ms-2">Número de cedula</label>
                </div>
              </div>
              <div className="col-12 col-sm-4 justify-content-md-end">
                <button
                  className="btn bg-gradient-primary text-capitalize my-2"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaArticuloIsActive(true)}
                >
                  Buscar Articulo
                </button>
              </div>

            </div>


            <div className="row ">
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="numero cedula"
                  />
                  <label className="ms-2">Stock mínimo</label>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="numero cedula"
                  />
                  <label className="ms-2">Stock máximo</label>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12 col-sm-12 d-flex justify-content-center">
                <span>
                  Alerta máximo y mínimo
                </span>
              </div>
            </div>

            <div className="row ">
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="numero cedula"
                  />
                  <label className="ms-2">Recibir alertas mínimo</label>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="numero cedula"
                  />
                  <label className="ms-2">Recibir alertas máximo</label>
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-gradient-primary"
                type="submit"
                title="Send"
                form="configForm"
              >
                Buscar
              </button>
              <button
                className="btn bg-gradient-danger "
                type="button"
                title="Send"
              >
                Salir
              </button>
            </div>
          </div>
        </form>
        <BusquedaDePersonalModal
          isModalActive={busquedaPersonalIsActive}
          setIsModalActive={setBusquedaPersonalIsActive}
        />

        <BusquedaArticuloModal
          isModalActive={busquedaArticuloIsActive}
          setIsModalActive={setBusquedaArticuloIsActive}
        />
      </div>
    </div>
    // </div>
  );
};
export default StockMaximoMinimoScreen;
