//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import React, { useState } from "react";

const StockMaximoMinimoScreen = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
            <div className="row mb-3">
              <div className="col-12 col-sm-4 col-lg-4">
                <label>
                  Código: <span className="text-danger">*</span>
                </label>
                <input
                  name="valorCodigo"
                  type="number"
                  className="form-control border rounded-pill px-3"
                  {...register("valorCodigo", { required: true })}
                />
                {errors.valorCodigo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-sm-4 col-lg-4">
                <label>
                  Nombre: <span className="text-danger">*</span>
                </label>
                <input
                  disabled="true"
                  name="nombre"
                  type="text"
                  className="form-control border rounded-pill px-3"
                />
              </div>
              <div className="col-12 col-sm-4 col-lg-4 mt-2">
                <button
                  className="border rounded-pill px-3 btn bg-gradient-primary mt-4 mb-0 text-capitalize"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaArticuloIsActive(true)}
                >
                  Buscar Articulo
                </button>
              </div>
            </div>
            <div className="multisteps-form__content">
              <div className="row mb-3">
                <label className="form-control border rounded-pill px-3 bg-success mt-3 text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                  <n>Stock</n>
                </label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-lg-4 col-sm-4">
                <label>
                  Stock minimo: <span className="text-danger">*</span>
                </label>
                <input
                  name="stockMinimo"
                  type="number"
                  className="form-control border rounded-pill px-3"
                  {...register("stockMinimo", { required: true })}
                />
                {errors.stockMinimo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-4 col-sm-4">
                <label>
                  Stock maximo: <span className="text-danger">*</span>
                </label>
                <input
                  name="stockMaximo"
                  type="number"
                  className="form-control border rounded-pill px-3"
                  {...register("stockMaximo", { required: true })}
                />
                {errors.stockMaximo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="row mb-3">
                <label className="form-control border rounded-pill px-3 bg-success mt-3 text-white" style={{ backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)" }}>
                  <n>Recibir alertas</n>
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-lg-4 col-sm-4">
                <label>
                  Recibir alertas minimo: <span className="text-danger">*</span>
                </label>
                <input
                  name="alertasMinimo"
                  type="number"
                  className="form-control border rounded-pill px-3"
                  {...register("alertasMinimo", { required: true })}
                />
                {errors.alertasMinimo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-4 col-sm-4">
                <label>
                  Recibir alertas maximo: <span className="text-danger">*</span>
                </label>
                <input
                  name="alertasMaximo"
                  type="number"
                  className="form-control border rounded-pill px-3"
                  {...register("alertasMaximo", { required: true })}
                />
                {errors.alertasMaximo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
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
